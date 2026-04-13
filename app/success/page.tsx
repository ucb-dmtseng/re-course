'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const params = useSearchParams()
  const plan = params.get('plan') ?? 'pro'
  const demo = params.get('demo') === '1'
  const email = params.get('email') ?? ''

  const planLabels: Record<string, string> = {
    starter: 'Starter — $97/mo',
    pro: 'Pro — $197/mo',
    vip: 'VIP — $397/mo',
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--navy)',
      padding: '40px 24px',
    }}>
      <div style={{
        maxWidth: 520,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 24 }}>🎉</div>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--offwhite)',
          marginBottom: 16,
        }}>
          You&apos;re in!
        </h1>

        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 32 }}>
          {demo
            ? `Thanks for reserving your spot${email ? ` (${email})` : ''}. We'll reach out before the May cohort starts with your Slack invite and onboarding guide.`
            : `Your ${planLabels[plan] ?? 'enrollment'} subscription is active. Check your email for your Slack invite and onboarding details.`
          }
        </p>

        <div style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: 12,
          padding: '24px 28px',
          marginBottom: 32,
          textAlign: 'left',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: 'var(--gold2)' }}>What happens next</div>
          {[
            '📧 Check your email — onboarding guide incoming',
            '💬 Slack invite arrives 24–48 hours before cohort start',
            '📚 Course access unlocks on May 1st',
            '📅 Kickoff call details in your welcome email',
          ].map((s, i) => (
            <div key={i} style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: 10, display: 'flex', gap: 10 }}>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <a href="/">
          <button className="btn-outline">← Back to re:learn</button>
        </a>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
