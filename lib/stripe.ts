import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2026-03-25.dahlia' as any,
})

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 97,
    priceId: process.env.STRIPE_PRICE_STARTER ?? '',
    description: 'License course + community',
  },
  pro: {
    name: 'Pro',
    price: 197,
    priceId: process.env.STRIPE_PRICE_PRO ?? '',
    description: 'License + AI tools + live sessions',
  },
  vip: {
    name: 'VIP',
    price: 397,
    priceId: process.env.STRIPE_PRICE_VIP ?? '',
    description: 'Everything + 1:1 coaching',
  },
} as const

export type PlanKey = keyof typeof PLANS
