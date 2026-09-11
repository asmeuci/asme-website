import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { getSupabaseAdmin } from './_supabase';

/*
Backs the /network/success page. The browser only ever gets the session id in
the redirect, so the confirmation is read back from Stripe rather than trusted
from the URL — a visitor can't fake a paid registration by typing the route.
*/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'Payments are not configured yet.' });
  }

  const sessionId = req.query.session_id;
  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    return res.status(400).json({ error: 'Missing or invalid session id.' });
  }

  const stripe = new Stripe(secretKey);

  try {
    // The purchased level is read off the line item rather than metadata, so the
    // confirmation names the product Stripe actually charged for.
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    const product = session.line_items?.data[0]?.price?.product;
    const ticket =
      product && typeof product === 'object' && 'name' in product ? product.name : null;

    const registrationId = session.metadata?.registration_id;
    if (session.payment_status === 'paid' && registrationId) {
      try {
        const paymentIntent =
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id ?? null;
        const { error: updateError } = await getSupabaseAdmin()
          .from('network_registrations')
          .update({
            payment_status: 'paid',
            stripe_checkout_session_id: session.id,
            stripe_payment_intent_id: paymentIntent,
            paid_at: new Date().toISOString(),
          })
          .eq('id', registrationId);

        if (updateError) console.error('Supabase payment confirmation update failed', updateError);
      } catch (error) {
        // Payment confirmation should still render even if the database update
        // has a temporary problem; Stripe remains the source of truth here.
        console.error('Supabase payment confirmation unavailable', error);
      }
    }

    return res.status(200).json({
      paid: session.payment_status === 'paid',
      name: session.metadata?.name ?? null,
      email: session.customer_details?.email ?? session.customer_email ?? null,
      ticket,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error('Stripe session lookup failed', error);
    return res.status(404).json({ error: 'Registration not found.' });
  }
}
