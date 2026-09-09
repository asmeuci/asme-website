import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { TIERS, priceIdFor } from './_tiers';

/*
Reads each ticket level straight out of Stripe so the registration page never
hardcodes a dollar amount or a level name. If a price or product name changes in
the Dashboard the dropdown follows it.
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

  // A level with no price id set is skipped rather than fatal, so configuring
  // the second product later doesn't take the whole page down in the meantime.
  const configured = TIERS.map((tier) => ({ tier, priceId: priceIdFor(tier) })).filter(
    (entry): entry is { tier: (typeof TIERS)[number]; priceId: string } => Boolean(entry.priceId),
  );

  if (configured.length === 0) {
    console.error('No ticket price ids configured', TIERS.map((tier) => tier.envVar).join(', '));
    return res.status(500).json({ error: 'Payments are not configured yet.' });
  }

  const stripe = new Stripe(secretKey);

  try {
    const tiers = await Promise.all(
      configured.map(async ({ tier, priceId }) => {
        const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
        const product = price.product;
        const productName =
          typeof product === 'object' && 'name' in product ? product.name : null;

        return {
          id: tier.id,
          label: productName || tier.fallbackLabel,
          amount: price.unit_amount,
          currency: price.currency,
        };
      }),
    );

    return res.status(200).json({ tiers });
  } catch (error) {
    console.error('Stripe price lookup failed', error);
    return res.status(500).json({ error: 'Could not load ticket prices.' });
  }
}
