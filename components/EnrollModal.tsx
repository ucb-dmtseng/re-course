'use client'

import { useState } from 'react'

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
]

const COHORTS = [
  { value: '2026-05', label: 'May 2026 — Starts May 1st' },
  { value: '2026-06', label: 'June 2026 — Starts June 1st' },
  { value: '2026-07', label: 'July 2026 — Starts July 1st' },
]

const PLANS = [
  {
    key: 'starter',
    name: 'Level 1 — Get Licensed',
    price: '$97/mo',
    features: ['Pre-license course', 'Community access', 'Monthly kickoff call'],
    color: '#6ee7b7',
  },
  {
    key: 'pro',
    name: 'Level 2 — Close Deals',
    price: '$197/mo',
    features: ['Everything in L1', 'AI deal analyzer', 'Weekly live Q&As', 'Deal workshop'],
    featured: true,
    color: '#c9a84c',
  },
  {
    key: 'vip',
    name: 'Level 3 — Build a Team',
    price: '$397/mo',
    features: ['Everything in L2', 'Revenue share training', '1:1 coaching/month', 'Recruit playbook'],
    color: '#a78bfa',
  },
]

interface Props {
  onClose: () => void
  initialPlan?: string
}

export default function EnrollModal({ onClose, initialPlan = 'pro' }: Props) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    state: '',
    licenseStatus: '',
    role: '',
    cohortDate: '2026-05',
    plan: initialPlan,
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function canNext() {
    if (step === 1) return form.firstName && form.lastName && form.email
    if (step === 2) return form.state && form.licenseStatus && form.role
    if (step === 3) return form.cohortDate && form.plan
    return true
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: `${form.firstName} ${form.lastName}`.trim(),
          state: form.state,
          licenseStatus: form.licenseStatus,
          role: form.role,
          cohortDate: form.cohortDate,
          plan: form.plan,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        background: '#111827',
        border: '1px solid rgba(201,168,76,0.25)',
        borderRadius: 16,
        width: '100%', maxWidth: 520,
        padding: '36px 32px',
        position: 'relative',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16,
          background: 'none', border: 'none', color: 'var(--muted)',
          fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1,
        }}>✕</button>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: n <= step ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.2s',
            }} />
          ))}
        </div>

        {/* Step 1 — Contact */}
        {step === 1 && (
          <>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Step 1 of 4</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Let's get started</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>We'll use this to set up your account and send your onboarding details.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <Field label="First Name" value={form.firstName} onChange={v => update('firstName', v)} placeholder="David" />
              <Field label="Last Name" value={form.lastName} onChange={v => update('lastName', v)} placeholder="Smith" />
            </div>
            <Field label="Email Address" value={form.email} onChange={v => update('email', v)} placeholder="you@email.com" type="email" />
          </>
        )}

        {/* Step 2 — Background */}
        {step === 2 && (
          <>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Step 2 of 4</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Your background</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>We use this to match you with the right course content for your state.</p>

            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}>Which state are you in?</div>
              <select value={form.state} onChange={e => update('state', e.target.value)} style={selectStyle}>
                <option value="">Select your state…</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={labelStyle}>Real estate license status</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {[
                  { value: 'none', label: "I don't have a license yet" },
                  { value: 'active', label: 'I have an active license' },
                  { value: 'expired', label: 'My license has expired' },
                ].map(opt => (
                  <RadioOption key={opt.value} value={opt.value} label={opt.label}
                    selected={form.licenseStatus === opt.value}
                    onSelect={() => update('licenseStatus', opt.value)} />
                ))}
              </div>
            </div>

            <div>
              <div style={labelStyle}>I'm primarily interested in…</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {[
                  { value: 'agent', label: 'Becoming a real estate agent' },
                  { value: 'investor', label: 'Real estate investing' },
                  { value: 'both', label: 'Both — agent and investor' },
                  { value: 'exploring', label: 'Just exploring options' },
                ].map(opt => (
                  <RadioOption key={opt.value} value={opt.value} label={opt.label}
                    selected={form.role === opt.value}
                    onSelect={() => update('role', opt.value)} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 3 — Cohort + Plan */}
        {step === 3 && (
          <>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Step 3 of 4</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Choose your cohort & plan</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>All plans include state-approved license content. Cancel anytime.</p>

            <div style={{ marginBottom: 20 }}>
              <div style={labelStyle}>When do you want to start?</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {COHORTS.map(c => (
                  <RadioOption key={c.value} value={c.value} label={c.label}
                    selected={form.cohortDate === c.value}
                    onSelect={() => update('cohortDate', c.value)} />
                ))}
              </div>
            </div>

            <div>
              <div style={labelStyle}>Select your plan</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                {PLANS.map(p => (
                  <div key={p.key} onClick={() => update('plan', p.key)} style={{
                    padding: '14px 16px',
                    borderRadius: 8,
                    border: `1px solid ${form.plan === p.key ? 'var(--gold)' : 'rgba(255,255,255,0.1)'}`,
                    background: form.plan === p.key ? 'rgba(201,168,76,0.08)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: p.color ?? 'var(--offwhite)' }}>
                        {p.name} {p.featured && <span style={{ fontSize: '0.65rem', background: 'var(--gold)', color: 'var(--navy)', padding: '2px 8px', borderRadius: 100, marginLeft: 8, fontWeight: 800 }}>POPULAR</span>}
                      </span>
                      <span style={{ fontWeight: 700, color: 'var(--gold2)' }}>{p.price}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{p.features.join(' · ')}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Step 4 — Review */}
        {step === 4 && (
          <>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Step 4 of 4</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>Review & enroll</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>Confirm your details before checkout.</p>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '20px', marginBottom: 24 }}>
              {[
                { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                { label: 'Email', value: form.email },
                { label: 'State', value: form.state },
                { label: 'License', value: form.licenseStatus === 'none' ? 'Getting first license' : form.licenseStatus === 'active' ? 'Active license' : 'Renewal needed' },
                { label: 'Goal', value: { agent: 'Become an agent', investor: 'Real estate investing', both: 'Agent + investor', exploring: 'Exploring' }[form.role] ?? form.role },
                { label: 'Cohort', value: COHORTS.find(c => c.value === form.cohortDate)?.label ?? form.cohortDate },
                { label: 'Plan', value: `${PLANS.find(p => p.key === form.plan)?.name} — ${PLANS.find(p => p.key === form.plan)?.price}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--muted)' }}>{row.label}</span>
                  <span style={{ fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 16, lineHeight: 1.6 }}>
              You'll be taken to Stripe to complete payment. Your first charge is on your cohort start date. Cancel anytime.
            </p>
          </>
        )}

        {/* Nav buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
          {step > 1 ? (
            <button onClick={() => setStep(s => s - 1)} className="btn-outline" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              ← Back
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className="btn-gold"
              style={{ opacity: canNext() ? 1 : 0.4, cursor: canNext() ? 'pointer' : 'not-allowed' }}
            >
              Continue →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={loading} className="btn-gold">
              {loading ? 'Redirecting…' : 'Complete Enrollment →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6,
  padding: '12px 14px', color: 'var(--offwhite)', fontSize: '0.9rem', outline: 'none',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%239ca3af' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px',
  paddingRight: '36px',
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={labelStyle}>{label}</div>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} style={inputStyle}
      />
    </div>
  )
}

function RadioOption({ value, label, selected, onSelect }: {
  value: string; label: string; selected: boolean; onSelect: () => void
}) {
  return (
    <div onClick={onSelect} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '11px 14px', borderRadius: 7, cursor: 'pointer',
      border: `1px solid ${selected ? 'var(--gold)' : 'rgba(255,255,255,0.08)'}`,
      background: selected ? 'rgba(201,168,76,0.08)' : 'transparent',
      transition: 'all 0.15s',
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${selected ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}`,
        background: selected ? 'var(--gold)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {selected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--navy)' }} />}
      </div>
      <span style={{ fontSize: '0.875rem', color: selected ? 'var(--offwhite)' : 'var(--muted)' }}>{label}</span>
    </div>
  )
}
