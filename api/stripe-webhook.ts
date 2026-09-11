import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { getSupabaseAdmin } from './_supabase';

// Preserve Stripe's exact request bytes so its signature can be verified.
export const config = {
  api: { bodyParser: false },
};

async function rawRequestBody(req: VercelRequest): Promise<string> {
  if (Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  if (typeof req.body === 'string') return req.body;

  const chunks: string[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk.toString('utf8') : Buffer.from(chunk).toString('utf8'));
  }
  return chunks.join('');
}

const paymentIntentId = (session: Stripe.Checkout.Session): string | null =>
  typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id ?? null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers['stripe-signature'];

  if (!stripeSecretKey || !webhookSecret || typeof signature !== 'string') {
    return res.status(400).json({ error: 'Webhook is not configured correctly.' });
  }

  const stripe = new Stripe(stripeSecretKey);
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      await rawRequestBody(req),
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error('Stripe webhook signature verification failed', error);
    return res.status(400).json({ error: 'Invalid webhook signature.' });
  }

  const supabase = getSupabaseAdmin();
  const { error: eventInsertError } = await supabase
    .from('stripe_webhook_events')
    .insert({ stripe_event_id: event.id, event_type: event.type });

  if (eventInsertError?.code === '23505') {
    return res.status(200).json({ received: true, duplicate: true });
  }
  if (eventInsertError) {
    console.error('Could not reserve Stripe webhook event', eventInsertError);
    return res.status(500).json({ error: 'Could not process webhook.' });
  }

  try {
    if (
      event.type === 'checkout.session.completed'
      || event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object;
      const registrationId = session.metadata?.registration_id;

      if (registrationId && session.payment_status === 'paid') {
        const { error } = await supabase
          .from('network_registrations')
          .update({
            payment_status: 'paid',
            stripe_checkout_session_id: session.id,
            stripe_payment_intent_id: paymentIntentId(session),
            paid_at: new Date(event.created * 1000).toISOString(),
          })
          .eq('id', registrationId);
        if (error) throw error;
      }
    } else if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object;
      const registrationId = session.metadata?.registration_id;
      if (registrationId) {
        const { error } = await supabase
          .from('network_registrations')
          .update({ payment_status: 'failed' })
          .eq('id', registrationId)
          .eq('payment_status', 'pending');
        if (error) throw error;
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object;
      const registrationId = session.metadata?.registration_id;
      if (registrationId) {
        const { error } = await supabase
          .from('network_registrations')
          .update({ payment_status: 'expired' })
          .eq('id', registrationId)
          .eq('payment_status', 'pending');
        if (error) throw error;
      }
    } else if (event.type === 'charge.refunded') {
      const charge = event.data.object;
      const paymentIntent =
        typeof charge.payment_intent === 'string'
          ? charge.payment_intent
          : charge.payment_intent?.id;
      if (paymentIntent) {
        const { error } = await supabase
          .from('network_registrations')
          .update({ payment_status: 'refunded' })
          .eq('stripe_payment_intent_id', paymentIntent);
        if (error) throw error;
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    await supabase.from('stripe_webhook_events').delete().eq('stripe_event_id', event.id);
    console.error('Stripe webhook processing failed', error);
    return res.status(500).json({ error: 'Could not process webhook.' });
  }
}
