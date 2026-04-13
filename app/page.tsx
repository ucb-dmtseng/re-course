'use client'

import { useState } from 'react'

const MODULES = [
  { num: '01', title: 'License Foundations', desc: 'National real estate law, agency relationships, contracts, and the framework for all 50 states.' },
  { num: '02', title: 'Property & Ownership', desc: 'Forms of ownership, land descriptions, deeds, title, and encumbrances.' },
  { num: '03', title: 'Financing & Mortgages', desc: 'Loan types, mortgage math, DSCR, underwriting basics, and how lenders think.' },
  { num: '04', title: 'Valuation & Appraisal', desc: 'CMA, income approach, cap rates, GRM — how to price any property with confidence.' },
  { num: '05', title: 'Investment Analysis', desc: 'IRR, cash-on-cash, pro forma modeling, ADU/SB9 analysis using real parcel data.' },
  { num: '06', title: 'Contracts & Closing', desc: 'Purchase agreements, contingencies, escrow, title insurance, and the closing process.' },
  { num: '07', title: 'California Deep Dive', desc: 'SB 9, AB 1033, ADU rules, permit process, and city-by-city development strategy.' },
  { num: '08', title: 'Deal Analysis Workshop', desc: 'Live deal reviews using the re:invest tool. Post your own deals for group feedback.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '$97',
    period: '/mo',
    desc: 'Get licensed and join the community.',
    features: [
      { text: 'Pre-license course (your state)', active: true },
      { text: 'CE Shop state-approved content', active: true },
      { text: 'Private Slack community', active: true },
      { text: 'Monthly cohort kickoff call', active: true },
      { text: 'AI deal analyzer', active: false },
      { text: '1:1 coaching session', active: false },
    ],
    cta: 'Join Next Cohort',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$197',
    period: '/mo',
    desc: 'For serious investors and agents.',
    features: [
      { text: 'Pre-license course (your state)', active: true },
      { text: 'CE Shop state-approved content', active: true },
      { text: 'Private Slack community', active: true },
      { text: 'Monthly cohort kickoff call', active: true },
      { text: 'AI deal analyzer (re:invest)', active: true },
      { text: 'Live weekly Q&A sessions', active: true },
      { text: '1:1 coaching session', active: false },
    ],
    cta: 'Join Pro Cohort',
    featured: true,
  },
  {
    name: 'VIP',
    price: '$397',
    period: '/mo',
    desc: 'Accelerate with personal mentorship.',
    features: [
      { text: 'Everything in Pro', active: true },
      { text: '1:1 coaching session/month', active: true },
      { text: 'Deal review & feedback', active: true },
      { text: 'Direct Slack access to instructor', active: true },
      { text: 'CE renewal included', active: true },
      { text: 'Investor network introductions', active: true },
    ],
    cta: 'Apply for VIP',
    featured: false,
  },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // TODO: wire to DB/email
    setSubmitted(true)
  }

  return (
    <>
      {/* ── Nav ── */}
      <nav className="nav">
        <div className="container nav-inner">
          <div className="nav-logo">
            <span className="dot" />
            re:learn
          </div>
          <ul className="nav-links">
            <li><a href="#curriculum">Curriculum</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#cohort">Next Cohort</a></li>
            <li><a href="#cohort"><button className="btn-gold" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>Enroll Now</button></a></li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="pulse" />
            May 2026 Cohort — Enrolling Now
          </div>

          <h1 className="display">
            Get licensed.<br />
            <span className="gold">Invest smarter.</span><br />
            In any state.
          </h1>

          <p className="subhead" style={{ marginTop: 24 }}>
            A monthly cohort program that gets you your real estate license 
            <em> and</em> teaches you to analyze investment deals like a pro — 
            across all 50 states.
          </p>

          <div className="hero-cta">
            <a href="#cohort"><button className="btn-gold">Reserve Your Spot →</button></a>
            <a href="#curriculum"><button className="btn-outline">See Curriculum</button></a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="num">50</div>
              <div className="label">States covered</div>
            </div>
            <div className="stat-item">
              <div className="num">8</div>
              <div className="label">Course modules</div>
            </div>
            <div className="stat-item">
              <div className="num">Monthly</div>
              <div className="label">New cohorts</div>
            </div>
            <div className="stat-item">
              <div className="num">Live</div>
              <div className="label">Community + AI tools</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── What you get ── */}
      <section className="section" id="about">
        <div className="container">
          <div className="section-label">What's included</div>
          <h2 className="section-title">More than a license course.</h2>
          <p className="section-sub">
            Most license schools hand you a PDF and wish you luck. 
            We pair state-approved content with real investment training, 
            a live community, and AI tools you'll use every day.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 48 }}>
            {[
              { icon: '🏛️', title: 'State-Approved License Courses', desc: 'Pre-license, exam prep, and CE for all 50 states via CE Shop — the most trusted name in real estate education.' },
              { icon: '📊', title: 'Investment Analysis Training', desc: 'Learn IRR, DSCR, cap rates, and pro forma modeling. Analyze real deals with our AI-powered re:invest tool.' },
              { icon: '💬', title: 'Private Slack Community', desc: 'Connect with agents, investors, architects, and lenders. Post deals, ask questions, build your network.' },
              { icon: '🤖', title: 'AI Deal Analyzer', desc: 'Run parcel lookups, SB9/ADU eligibility checks, and full financial models on any property in seconds.' },
              { icon: '📅', title: 'Monthly Live Sessions', desc: 'Cohort kickoff calls, weekly Q&As, and deal review workshops with your instructor.' },
              { icon: '🎓', title: 'Certificate of Completion', desc: 'Earn your completion certificate alongside your state license — proof you can analyze deals, not just close them.' },
            ].map((item, i) => (
              <div key={i} className="card">
                <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Curriculum ── */}
      <section className="section" id="curriculum">
        <div className="container">
          <div className="section-label">Curriculum</div>
          <h2 className="section-title">8 modules. License + investing.</h2>
          <p className="section-sub">
            State-required content covers the first 5 modules. 
            Modules 6–8 are our proprietary investment training — 
            the part no other license school teaches.
          </p>

          <div className="curriculum-grid">
            {MODULES.map((m) => (
              <div key={m.num} className="module-card">
                <div className="module-num">{m.num}</div>
                <div>
                  <div className="module-title">{m.title}</div>
                  <div className="module-desc">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Pricing ── */}
      <section className="section" id="pricing">
        <div className="container">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Simple monthly pricing.</h2>
          <p className="section-sub">
            Everything month-to-month. Cancel anytime. 
            Course content included — no separate license school fee.
          </p>

          <div className="pricing-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <div className="pricing-badge">Most Popular</div>}

                <div style={{ marginBottom: 8, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: plan.featured ? 'var(--gold)' : 'var(--muted)' }}>
                  {plan.name}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 24 }}>{plan.desc}</p>

                <ul className="price-features">
                  {plan.features.map((f, i) => (
                    <li key={i} className={f.active ? 'active' : ''}>
                      <span className="check">{f.active ? '✓' : '–'}</span>
                      {f.text}
                    </li>
                  ))}
                </ul>

                <a href="#cohort">
                  <button className={plan.featured ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>
                    {plan.cta}
                  </button>
                </a>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: 32, fontSize: '0.82rem', color: 'var(--muted)' }}>
            All plans include state-approved license content via The CE Shop. 
            Cancel or pause anytime. No contracts.
          </p>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Cohort Signup ── */}
      <section className="signup-section" id="cohort">
        <div className="container">
          <div className="signup-box">
            <div className="section-label" style={{ textAlign: 'center' }}>Next Cohort</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              May 2026 cohort<br />starts May 1st.
            </h2>
            <p style={{ color: 'var(--muted)', marginTop: 16, fontSize: '0.95rem', lineHeight: 1.7 }}>
              Reserve your spot now. We&apos;ll send you onboarding details, 
              your Slack invite, and a pre-cohort prep guide before day one.
            </p>

            {submitted ? (
              <div style={{ marginTop: 32, padding: '20px 28px', background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--gold2)', fontWeight: 600 }}>
                ✓ You&apos;re on the list! Check your email for next steps.
              </div>
            ) : (
              <form className="signup-form" onSubmit={handleSignup}>
                <input
                  className="signup-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-gold">Reserve Spot →</button>
              </form>
            )}

            <p style={{ marginTop: 16, fontSize: '0.78rem', color: 'var(--muted)' }}>
              No payment until cohort starts. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="nav-logo">
            <span className="dot" />
            re:learn
          </div>
          <div>© 2026 re:learn. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: 'var(--muted)' }}>Privacy</a>
            <a href="#" style={{ color: 'var(--muted)' }}>Terms</a>
            <a href="mailto:hello@relearn.co" style={{ color: 'var(--muted)' }}>Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
