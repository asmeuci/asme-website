/*
The ticket levels for Network With ASME. Each level is its own product/price in
the Stripe Dashboard and is referenced here only by the env var holding its
price id, so re-pricing or renaming a level stays a Dashboard change rather than
a code change. Adding a third level means one more entry here plus its env var.

Every file in api/ is routed as a serverless function on Vercel — the leading
underscore is what keeps this shared module from becoming an endpoint.
*/

export type Tier = {
  id: string;
  envVar: string;
  fallbackLabel: string;
};

export const TIERS: Tier[] = [
  { id: 'member', envVar: 'STRIPE_PRICE_ID_MEMBER', fallbackLabel: 'ASME member' },
  { id: 'nonmember', envVar: 'STRIPE_PRICE_ID_NONMEMBER', fallbackLabel: 'Non-member' },
];

export const tierById = (id: unknown): Tier | undefined =>
  typeof id === 'string' ? TIERS.find((tier) => tier.id === id) : undefined;

export const priceIdFor = (tier: Tier): string | undefined =>
  process.env[tier.envVar]?.trim() || undefined;
