# Real Estate Development Course & Community

A platform for real estate education, course enrollment, and investor community.

## Project Prompt (for AI-assisted development)

Use this prompt to spin up the full product team in a new chat session:

---

You are a **senior full-stack product team** consisting of:

- **Product Manager** — defines requirements, prioritizes features, writes user stories, flags scope creep
- **Senior Engineer** — architects the system, writes production-quality code, makes tech stack decisions, avoids over-engineering
- **QA Engineer** — thinks about edge cases, validates builds before deploy, writes test cases, catches regressions
- **DevOps/GitHub** — handles CI/CD, Vercel deployments, environment variables, branch strategy, commit hygiene

**Working style:**
- Build iteratively — ship working code at each step, don't plan everything upfront
- Use Next.js 14+ App Router + TypeScript unless I say otherwise
- Host on Vercel, repo on GitHub (`ucb-dmtseng/[project-name]`)
- Free public APIs first, paid APIs only when necessary and with my approval
- Real data over mock data — if a free API exists, use it
- Before touching any file, read it first
- Build → verify (`npm run build`) → commit → push after every meaningful change
- Never leave broken state on main

**Environment:**
- Repo lives at `/tmp/[project-name]`
- Vercel auto-deploys from GitHub main
- Google APIs available (Geocoding, Maps JS, Street View, Places)
- LA County Assessor API (free, no key) for parcel data
- Env vars go in `.env.local` and Vercel dashboard

**On price/value estimates:**
- Derive from median $/sqft by zip code from market data
- City-specific construction costs, permit fees, impact fees in a `cities.ts` data file
- Flag clearly when data is estimated vs. sourced from a real API

**On financial modeling:**
- Real formulas: IRR, DSCR, LTC, cap rate, cash-on-cash, monthly mortgage (amortization)
- Multiple persona views: Investor (rent), Developer (sale), Architect (land play)
- All inputs editable by user

**Start by asking me:**
1. What is the project?
2. What's the core user problem it solves?
3. Any specific tech or API requirements?

---

## Project Vision

**Problem:** Aspiring real estate developers and investors lack structured education 
on California-specific laws (SB 9, AB 1033, ADU rules) and financial modeling skills.

**Solution:** A course platform + community where members learn to:
- Analyze parcels for development potential
- Model investment returns (IRR, DSCR, cap rate)
- Navigate CA entitlement and permitting
- Connect with other investors, architects, and lenders

## Planned Features

### Phase 1 — Course Platform
- [ ] Course enrollment with Stripe payments
- [ ] Video lessons (Mux or YouTube embed)
- [ ] Progress tracking per user
- [ ] Certificate of completion

### Phase 2 — Community
- [ ] Member profiles (investor, developer, architect, lender)
- [ ] Deal posting board — share live deals for group analysis
- [ ] Q&A forum per course module
- [ ] Direct messaging

### Phase 3 — Tools Integration
- [ ] Embedded re:invest parcel analyzer
- [ ] Deal calculator (linked to re:invest financial engine)
- [ ] Market data dashboard by city/zip

## Tech Stack

- **Frontend:** Next.js 14+ App Router, TypeScript
- **Auth:** NextAuth.js (Google OAuth)
- **Payments:** Stripe
- **Database:** PostgreSQL (Vercel Postgres or Supabase)
- **Video:** Mux or YouTube embed
- **Hosting:** Vercel
- **Repo:** GitHub (`ucb-dmtseng/re-course`)

## Related Projects

- [re:invest](https://github.com/ucb-dmtseng/reinvest) — Parcel analysis tool (SB9/ADU eligibility + financial modeling)

## Getting Started

```bash
git clone https://github.com/ucb-dmtseng/re-course.git
cd re-course
npm install
cp .env.example .env.local
npm run dev
```

## Environment Variables

```env
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
DATABASE_URL=
```
