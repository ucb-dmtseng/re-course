'use client'

import { useState } from 'react'
import EnrollModal from '@/components/EnrollModal'

const LEVELS = [
  {
    num: '01',
    tag: 'Level 1',
    title: 'Get Licensed',
    subtitle: '0–6 months · Brand new to real estate',
    color: '#6ee7b7',
    modules: [
      { num: '01', title: 'License Foundations', desc: 'National real estate law, agency relationships, contracts, and the framework for all 50 states.' },
      { num: '02', title: 'Property & Ownership', desc: 'Forms of ownership, land descriptions, deeds, title, and encumbrances.' },
      { num: '03', title: 'Financing & Mortgages', desc: 'Loan types, mortgage math, DSCR, underwriting basics, and how lenders think.' },
      { num: '04', title: 'Exam Prep & State Test', desc: 'Practice exams, flashcards, and test-taking strategy. Pass on your first attempt.' },
    ],
  },
  {
    num: '02',
    tag: 'Level 2',
    title: 'Close Deals',
    subtitle: 'Newly licensed · 0–2 years in',
    color: '#c9a84c',
    modules: [
      { num: '05', title: 'Valuation & Deal Analysis', desc: 'CMA, income approach, cap rates, GRM — price any property with confidence.' },
      { num: '06', title: 'Contracts & Closing', desc: 'Purchase agreements, contingencies, escrow, title insurance, and the closing process.' },
      { num: '07', title: 'Investment Fundamentals', desc: 'IRR, cash-on-cash, pro forma modeling, ADU/SB9 analysis using real parcel data.' },
      { num: '08', title: 'Deal Workshop', desc: 'Live deal reviews using the re:invest AI tool. Post your own deals for group feedback.' },
    ],
  },
  {
    num: '03',
    tag: 'Level 3',
    title: 'Build a Team',
    subtitle: '2+ years · Ready to scale',
    color: '#a78bfa',
    modules: [
      { num: '09', title: 'Agent Recruiting & Sponsorship', desc: 'How to attract, onboard, and retain agents. Build a downline that generates passive income.' },
      { num: '10', title: 'Revenue Share Strategy', desc: 'Maximize your eXp revenue share tiers. Model your passive income with real numbers.' },
      { num: '11', title: 'Team Operations & Culture', desc: 'Build systems, accountability, and culture so your team runs without you.' },
      { num: '12', title: 'Scale & Exit', desc: 'From team lead to portfolio owner. How to own the assets your team is selling.' },
    ],
  },
]

const PLANS = [
  {
    name: 'Level 1',
    label: 'Get Licensed',
    price: '$97',
    period: '/mo',
    desc: 'Get your license. Join the community. Start from zero.',
    color: '#6ee7b7',
    features: [
      { text: 'Pre-license course (your state)', active: true },
      { text: 'CE Shop state-approved content', active: true },
      { text: 'Private community access', active: true },
      { text: 'Monthly cohort kickoff call', active: true },
      { text: 'AI deal analyzer (re:invest)', active: false },
      { text: 'Weekly live Q&A sessions', active: false },
      { text: '1:1 coaching session', active: false },
      { text: 'Revenue share training', active: false },
    ],
    cta: 'Start Level 1 →',
    featured: false,
    planKey: 'starter',
  },
  {
    name: 'Level 2',
    label: 'Close Deals',
    price: '$197',
    period: '/mo',
    desc: 'Licensed and ready to close deals and analyze investments.',
    color: '#c9a84c',
    features: [
      { text: 'Everything in Level 1', active: true },
      { text: 'Investment analysis training', active: true },
      { text: 'AI deal analyzer (re:invest)', active: true },
      { text: 'Weekly live Q&A sessions', active: true },
      { text: 'Deal posting & group review', active: true },
      { text: 'CE renewal included', active: true },
      { text: '1:1 coaching session', active: false },
      { text: 'Revenue share training', active: false },
    ],
    cta: 'Start Level 2 →',
    featured: true,
    planKey: 'pro',
  },
  {
    name: 'Level 3',
    label: 'Build a Team',
    price: '$397',
    period: '/mo',
    desc: 'Scale your business. Build passive income through your team.',
    color: '#a78bfa',
    features: [
      { text: 'Everything in Level 2', active: true },
      { text: 'Agent recruiting masterclass', active: true },
      { text: 'Revenue share strategy (eXp)', active: true },
      { text: '1:1 coaching session/month', active: true },
      { text: 'Direct instructor access', active: true },
      { text: 'Investor network introductions', active: true },
      { text: 'Team ops & culture playbook', active: true },
      { text: 'Scale & exit strategy', active: true },
    ],
    cta: 'Apply for Level 3 →',
    featured: false,
    planKey: 'vip',
  },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalPlan, setModalPlan] = useState('pro')

  function openEnroll(plan = 'pro') {
    setModalPlan(plan)
    setShowModal(true)
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    openEnroll('pro')
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
            <li><button className="btn-gold" style={{ padding: '10px 22px', fontSize: '0.85rem' }} onClick={() => openEnroll('pro')}>Enroll Now</button></li>
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
            License. Deals.<br />
            <span className="gold">Team. Passive income.</span>
          </h1>

          <p className="subhead" style={{ marginTop: 24 }}>
            A 3-level program that takes you from zero license to running a 
            team with passive revenue share income — across all 50 states.
          </p>

          <div className="hero-cta">
            <button className="btn-gold" onClick={() => openEnroll('pro')}>Reserve Your Spot →</button>
            <a href="#curriculum"><button className="btn-outline">See Curriculum</button></a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="num">3</div>
              <div className="label">Learning levels</div>
            </div>
            <div className="stat-item">
              <div className="num">50</div>
              <div className="label">States covered</div>
            </div>
            <div className="stat-item">
              <div className="num">12</div>
              <div className="label">Course modules</div>
            </div>
            <div className="stat-item">
              <div className="num">Monthly</div>
              <div className="label">New cohorts</div>
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

      {/* ── How it works ── */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-label">The Path</div>
          <h2 className="section-title">Three levels. One flywheel.</h2>
          <p className="section-sub">Each level unlocks the next income stream. Most programs stop at Level 1.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, marginTop: 48, position: 'relative' }}>
            {[
              { color: '#6ee7b7', level: 'Level 1', title: 'Get Licensed', icon: '🎓', desc: 'Pass your state exam. Start earning commission. Join eXp under your sponsor.', income: 'Commission income begins' },
              { color: '#c9a84c', level: 'Level 2', title: 'Close Deals', icon: '🏠', desc: 'Analyze and close investment deals. Build your client base. Earn CE credits.', income: 'Deal income + renewals' },
              { color: '#a78bfa', level: 'Level 3', title: 'Build a Team', icon: '♾️', desc: 'Recruit agents under you. Earn eXp revenue share on their production — forever.', income: 'Passive revenue share' },
            ].map((step, i) => (
              <div key={i} style={{ padding: '32px 28px', borderTop: `3px solid ${step.color}`, background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{step.icon}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: step.color, marginBottom: 6 }}>{step.level}</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>{step.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: 16 }}>{step.desc}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: step.color, background: `${step.color}18`, padding: '6px 12px', borderRadius: 100, display: 'inline-block' }}>
                  {step.income}
                </div>
                {i < 2 && <div style={{ position: 'absolute', right: -16, top: '50%', fontSize: '1.2rem', color: 'var(--muted)', zIndex: 1, display: 'none' }}>→</div>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, padding: '20px 28px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            💡 <strong style={{ color: 'var(--gold2)' }}>The compounding effect:</strong> A Level 3 student who recruits 10 agents each closing 6 deals/year earns <strong style={{ color: 'var(--offwhite)' }}>~$5,250/year in passive revenue share</strong> — on top of their own commission income. That number grows every time one of their agents recruits someone new.
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ── Curriculum ── */}
      <section className="section" id="curriculum">
        <div className="container">
          <div className="section-label">Curriculum</div>
          <h2 className="section-title">3 levels. 12 modules.</h2>
          <p className="section-sub">
            Each level builds on the last. Start wherever you are.
            Most students begin at Level 1 and move up as they grow.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 48 }}>
            {LEVELS.map((level) => (
              <div key={level.num} style={{ borderLeft: `3px solid ${level.color}`, paddingLeft: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: level.color }}>{level.tag}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{level.subtitle}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20 }}>{level.title}</h3>
                <div className="curriculum-grid">
                  {level.modules.map((m) => (
                    <div key={m.num} className="module-card">
                      <div className="module-num" style={{ color: level.color }}>{m.num}</div>
                      <div>
                        <div className="module-title">{m.title}</div>
                        <div className="module-desc">{m.desc}</div>
                      </div>
                    </div>
                  ))}
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
          <h2 className="section-title">One price per level.</h2>
          <p className="section-sub">
            Start at Level 1 and move up when you’re ready. 
            Month-to-month, cancel anytime. License course included.
          </p>

          <div className="pricing-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <div className="pricing-badge">Most Popular</div>}

                <div style={{ marginBottom: 4, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: plan.color }}>
                  {plan.name}
                </div>
                <div style={{ marginBottom: 8, fontSize: '0.78rem', fontWeight: 700, color: plan.featured ? 'var(--offwhite)' : 'var(--muted)' }}>
                  {plan.label}
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

                <button
                  className={plan.featured ? 'btn-gold' : 'btn-outline'}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => openEnroll(plan.planKey)}
                >
                  {plan.cta}
                </button>
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

            <div style={{ marginTop: 32 }}>
              <button className="btn-gold" style={{ fontSize: '1rem', padding: '16px 40px' }} onClick={() => openEnroll('pro')}>
                Reserve Your Spot →
              </button>
              <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--muted)' }}>Takes 2 minutes · No payment until cohort starts</p>
            </div>

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
      {showModal && <EnrollModal onClose={() => setShowModal(false)} initialPlan={modalPlan} />}
    </>
  )
}
