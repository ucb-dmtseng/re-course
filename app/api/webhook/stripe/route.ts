import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: any

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ''
    )
  } catch (err: any) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const { email, name, state, plan, cohortDate } = session.metadata ?? {}
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (email) {
          await prisma.user.upsert({
            where: { email },
            update: {
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              subscriptionStatus: 'active',
              plan,
              state,
              cohortDate,
            },
            create: {
              email,
              name,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              subscriptionStatus: 'active',
              plan,
              state,
              cohortDate,
            },
          })

          // Send welcome email
          await sendWelcomeEmail({ email, name, plan, cohortDate })
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { subscriptionStatus: sub.status },
        })
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { subscriptionStatus: 'canceled' },
        })
        break
      }
    }
  } catch (err: any) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function sendWelcomeEmail({
  email, name, plan, cohortDate,
}: {
  email: string
  name?: string
  plan?: string
  cohortDate?: string
}) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.log('No RESEND_API_KEY — skipping welcome email for', email)
    return
  }

  const slackUrl = process.env.SLACK_INVITE_URL ?? 'https://re-course.vercel.app'
  const planLabels: Record<string, string> = {
    starter: 'Starter ($97/mo)',
    pro: 'Pro ($197/mo)',
    vip: 'VIP ($397/mo)',
  }
  const cohortLabels: Record<string, string> = {
    '2026-05': 'May 1, 2026',
    '2026-06': 'June 1, 2026',
    '2026-07': 'July 1, 2026',
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; background: #0a0f1e; color: #f5f1eb; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
  <div style="margin-bottom: 32px;">
    <span style="font-size: 1.2rem; font-weight: 700;">re:learn</span>
    <span style="display: inline-block; width: 8px; height: 8px; background: #c9a84c; border-radius: 50%; margin-left: 8px; vertical-align: middle;"></span>
  </div>

  <h1 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px; color: #f5f1eb;">
    You're enrolled. Welcome.
  </h1>

  <p style="color: #9ca3af; line-height: 1.7; margin-bottom: 24px;">
    Hi ${name ?? 'there'},<br><br>
    Your enrollment is confirmed. Here's everything you need to get started.
  </p>

  <div style="background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.25); border-radius: 10px; padding: 24px; margin-bottom: 28px;">
    <div style="margin-bottom: 12px;"><strong>Plan:</strong> <span style="color: #c9a84c;">${planLabels[plan ?? ''] ?? plan}</span></div>
    <div style="margin-bottom: 12px;"><strong>Cohort starts:</strong> ${cohortLabels[cohortDate ?? ''] ?? cohortDate}</div>
    <div><strong>Your email:</strong> ${email}</div>
  </div>

  <h2 style="font-size: 1.1rem; margin-bottom: 16px;">What to do now</h2>

  <div style="margin-bottom: 16px; padding: 16px; background: rgba(255,255,255,0.04); border-radius: 8px; border-left: 3px solid #c9a84c;">
    <strong>1. Join the Slack community</strong><br>
    <span style="color: #9ca3af; font-size: 0.9rem;">Your community is already live. Introduce yourself in #welcome.</span><br>
    <a href="${slackUrl}" style="color: #c9a84c; display: inline-block; margin-top: 8px;">→ Join Slack workspace</a>
  </div>

  <div style="margin-bottom: 16px; padding: 16px; background: rgba(255,255,255,0.04); border-radius: 8px; border-left: 3px solid rgba(201,168,76,0.3);">
    <strong>2. Course access unlocks on cohort start date</strong><br>
    <span style="color: #9ca3af; font-size: 0.9rem;">You'll get a separate email with your CE Shop login link before ${cohortLabels[cohortDate ?? ''] ?? 'your start date'}.</span>
  </div>

  <div style="margin-bottom: 28px; padding: 16px; background: rgba(255,255,255,0.04); border-radius: 8px; border-left: 3px solid rgba(201,168,76,0.3);">
    <strong>3. Kickoff call details coming soon</strong><br>
    <span style="color: #9ca3af; font-size: 0.9rem;">Calendar invite for the cohort kickoff call will be in your inbox 1 week before start.</span>
  </div>

  <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px;">
    Questions? Reply to this email or DM us in Slack.<br>
    re:learn · <a href="https://re-course.vercel.app" style="color: #c9a84c;">re-course.vercel.app</a>
  </p>
</body>
</html>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 're:learn <hello@relearn.co>',
      to: [email],
      subject: "You're enrolled — welcome to re:learn",
      html,
    }),
  })
}
