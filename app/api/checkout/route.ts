import { NextRequest, NextResponse } from 'next/server'
import { stripe, PLANS, PlanKey } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, state, licenseStatus, role, cohortDate, plan } = body

    if (!email || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const planData = PLANS[plan as PlanKey]
    if (!planData) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Save/update waitlist entry first
    await prisma.waitlistEntry.upsert({
      where: { email },
      update: { name, state, plan, cohort: cohortDate },
      create: { email, name, state, plan, cohort: cohortDate },
    })

    // If no real Stripe price IDs yet, return success for demo mode
    if (!planData.priceId || planData.priceId.includes('placeholder')) {
      return NextResponse.json({ 
        url: `/success?demo=1&plan=${plan}&email=${encodeURIComponent(email)}`,
        demo: true 
      })
    }

    // Create or retrieve Stripe customer
    let customerId: string | undefined
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing?.stripeCustomerId) {
      customerId = existing.stripeCustomerId
    } else {
      const customer = await stripe.customers.create({ email, name })
      customerId = customer.id
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: planData.priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/?canceled=1`,
      metadata: { email, name, state, licenseStatus, role, cohortDate, plan },
      subscription_data: {
        metadata: { email, state, plan, cohortDate },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
