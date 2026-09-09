import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { priceIdFor, tierById } from './_tiers';

/*
Creates the Stripe Checkout Session for a Network With ASME registration.

The browser picks a ticket level by id and never sends an amount — each level's
price lives in the Stripe Dashboard behind an env var (see _tiers.ts), so the
only thing a caller can influence is *which* of our two known prices to charge,
not what it costs.
*/

type Field = {
  key: string;
  label: string;
  required: boolean;
  maxLength: number;
};

const FIELDS: Field[] = [
  { key: 'name', label: 'Full name', required: true, maxLength: 100 },
  { key: 'email', label: 'Email', required: true, maxLength: 200 },
  { key: 'phone', label: 'Phone number', required: true, maxLength: 30 },
  { key: 'major', label: 'Major', required: true, maxLength: 100 },
  { key: 'gradYear', label: 'Graduation year', required: true, maxLength: 10 },
  { key: 'dietary', label: 'Dietary restrictions', required: false, maxLength: 300 },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    console.error('Missing STRIPE_SECRET_KEY');
    return res.status(500).json({ error: 'Payments are not configured yet.' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  const tier = tierById(body.tier);
  if (!tier) {
    return res.status(400).json({ error: 'Please choose a ticket type.' });
  }

  const priceId = priceIdFor(tier);
  if (!priceId) {
    console.error(`Missing ${tier.envVar} for ticket level "${tier.id}"`);
    return res.status(500).json({ error: 'That ticket type is not available right now.' });
  }

  const values: Record<string, string> = {};

  for (const field of FIELDS) {
    const raw = typeof body[field.key] === 'string' ? (body[field.key] as string).trim() : '';

    if (!raw) {
      if (field.required) {
        return res.status(400).json({ error: `${field.label} is required.` });
      }
      continue;
    }

    if (raw.length > field.maxLength) {
      return res.status(400).json({ error: `${field.label} is too long.` });
    }

    values[field.key] = raw;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Deliberately NOT req.headers.origin — a caller can set that to anything, which
  // would let them mint a session on our account that redirects to their own site
  // after payment. Host is set by the platform from the domain that actually routed
  // the request, and PUBLIC_SITE_URL pins it outright when set.
  const host = req.headers.host ?? '';
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  const origin = process.env.PUBLIC_SITE_URL || `${isLocal ? 'http' : 'https'}://${host}`;

  const stripe = new Stripe(secretKey);

  // everything except the email rides along as metadata, which is what turns the
  // Stripe payment record into the attendee roster
  const metadata = {
    name: values.name,
    tier: tier.id,
    phone: values.phone,
    major: values.major,
    grad_year: values.gradYear,
    dietary: values.dietary || 'None',
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: values.email,
      metadata,
      payment_intent_data: { metadata },
      success_url: `${origin}/network/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/network/register?canceled=1`,
    });

    if (!session.url) {
      return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
    }

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session failed', error);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
