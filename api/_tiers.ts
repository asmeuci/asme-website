/*
The ticket levels for Network With ASME. Each level has a Stripe Price used to
display its name and amount, plus a limited Payment Link used for checkout.
Both are referenced through environment variables so test and live Stripe
resources can be swapped without changing code.

Every file in api/ is routed as a serverless function on Vercel — the leading
underscore is what keeps this shared module from becoming an endpoint.
*/
 
export type Tier = {
  id: string;
  envVar: string;
  paymentLinkEnvVar: string;
  fallbackLabel: string;
};

export const TIERS: Tier[] = [
  {
    id: 'meal',
    envVar: 'STRIPE_PRICE_ID_NONMEMBER',
    paymentLinkEnvVar: 'STRIPE_PAYMENT_LINK_MEAL_URL',
    fallbackLabel: 'Meal',
  },
  {
    id: 'no_meal',
    envVar: 'STRIPE_PRICE_ID_MEMBER',
    paymentLinkEnvVar: 'STRIPE_PAYMENT_LINK_NO_MEAL_URL',
    fallbackLabel: 'No meal',
  },
];

export const tierById = (id: unknown): Tier | undefined =>
  typeof id === 'string' ? TIERS.find((tier) => tier.id === id) : undefined;

export const priceIdFor = (tier: Tier): string | undefined =>
  process.env[tier.envVar]?.trim() || undefined;

export const paymentLinkUrlFor = (tier: Tier): string | undefined =>
  process.env[tier.paymentLinkEnvVar]?.trim() || undefined;
