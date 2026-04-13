# Business Model — Real Estate Course & Community

## Concept

Monthly cohort-based real estate licensing education platform.
Resell accredited pre-license and CE courses across all 50 states,
layered with a private community, AI tools, and live coaching.

---

## Course Content Partner (Reseller)

We do NOT build the state-approved content — we resell it.

### Best Options

| Provider | Coverage | Model | Est. Wholesale Cost |
|----------|----------|-------|---------------------|
| **The CE Shop** ⭐ | All 50 states | Wholesale partner — buy at discount, resell at markup | ~$40–80/student (pre-license), ~$15–30/student (CE) |
| **Colibri Real Estate** | All 50 states | Affiliate or wholesale | ~$50–100/student |
| **AceableAgent** | 14 states | Affiliate | 20–30% commission |
| **OnlineEd** | All 50 states | Wholesale | ~$30–60/student |

### Recommended: The CE Shop Wholesale Program
- Largest state coverage (50 states, pre-license + CE + exam prep)
- Dedicated account manager
- White-label not available, but you sell their courses under your brand with a coupon/link
- Apply at: theceshop.com/affiliate-programs-partners
- Typical wholesale discount: **30–50% off retail**
- Retail pre-license price: ~$100–300/student depending on state
- **Your cost: ~$50–150/student**

---

## Operating Cost Stack (Per Student / Per Month)

| Item | Cost | Notes |
|------|------|-------|
| Course content (CE Shop wholesale) | $50–150 | One-time per enrollment |
| Slack (Pro) | ~$1.50/mo | $7.25/user/mo, shared across cohort |
| AI helper (OpenAI API) | ~$2–5/mo | GPT-4o at ~$5/1M tokens |
| Community moderation | ~$5–10/mo | Part-time moderator, shared cost |
| Platform hosting (Vercel) | ~$0.50/mo | Pro plan amortized |
| Stripe fees | 2.9% + $0.30 | Per transaction |
| **Total per student/mo** | **~$65–175 first month**, **~$10–18/mo ongoing** | |

---

## Pricing Model

### Option A — Monthly Subscription (Recommended for community)

| Tier | Price/mo | Includes |
|------|----------|----------|
| **Starter** | $97/mo | Course access + community (Slack) |
| **Pro** | $197/mo | Course + community + AI deal analyzer + live Q&A calls |
| **Cohort VIP** | $397/mo | Everything + 1:1 coaching session/mo |

**Monthly cohort rhythm:**
- New cohort starts 1st of each month
- Students enroll 2 weeks before start
- 8–12 week curriculum
- Community stays active after graduation (ongoing subscription)

### Option B — One-Time Course Bundle

| Package | Price | Includes |
|---------|-------|----------|
| **License Bundle** | $297 | Pre-license course (1 state) + 3 months community |
| **Investor Bundle** | $497 | License course + re:invest tool access + community (6 mo) |
| **All-Access** | $997 | License + CE + tools + community (12 mo) |

---

## Unit Economics (Per Student)

### Scenario: 20 students/cohort at $197/mo

| | Monthly |
|--|---------|
| Gross Revenue | $3,940 |
| Course content (avg $100 x 20, one-time) | -$2,000 (first month only) |
| Slack Pro (20 users) | -$145 |
| AI helper | -$60 |
| Moderation (part-time) | -$200 |
| Stripe fees (~3%) | -$118 |
| Hosting | -$20 |
| **Month 1 Net** | **$1,397** |
| **Month 2+ Net** (no course cost) | **$3,397** |

### Break-even: ~6 students at $197/mo covers all ongoing costs

---

## Growth Path

| Stage | Students | Monthly Revenue | Action |
|-------|----------|----------------|--------|
| **MVP** | 10 | ~$1,970 | Validate content, community, onboarding |
| **Traction** | 50 | ~$9,850 | Hire part-time moderator, add live calls |
| **Scale** | 200 | ~$39,400 | Dedicated staff, multi-state cohorts, referral program |
| **Expansion** | 500+ | ~$98,500 | Broker upgrade track, corporate training deals |

---

## Platform Stack

| Function | Tool | Cost |
|----------|------|------|
| Course delivery | Custom Next.js platform (this repo) | Dev cost only |
| Community | Slack (Pro) or Discord (free to start) | $0–7.25/user |
| Video hosting | Mux or YouTube unlisted | $0–~$20/mo |
| Payments | Stripe | 2.9% + $0.30 |
| Auth | NextAuth (Google) | Free |
| Database | Supabase or Vercel Postgres | Free tier → $25/mo |
| AI helper | OpenAI GPT-4o API | ~$5/1M tokens |
| Hosting | Vercel Pro | $20/mo |
| Course content | The CE Shop wholesale | ~$50–150/student |

**Total platform cost (excluding content): ~$50–100/mo fixed**

---

## Immediate Next Steps

1. **Apply for CE Shop Wholesale Partner Program** → theceshop.com/affiliate-programs-partners
2. **Decide: Slack vs Discord** (Discord is free, Slack is more professional)
3. **Set pricing tier** — recommend starting at $197/mo Pro
4. **Build MVP platform** — enrollment → payment → Slack invite → course link
5. **Set first cohort date** — target 4–6 weeks from now for first enrollments

---

## AI Helper Scope

Built on top of re:invest tools + GPT-4o:
- Answer questions about state licensing requirements
- Run deal analysis (parcel lookup + financial model)
- Explain SB9/AB1033/ADU rules in plain English
- Quiz students on course material

---

## Questions to Decide

- [ ] Discord (free, younger demographic) vs Slack (professional, $7.25/user)?
- [ ] Monthly subscription vs one-time course bundle?
- [ ] Which state to launch first? (CA recommended — largest RE market)
- [ ] Live Zoom sessions included, or async only for v1?
- [ ] Will you be the instructor on camera, or hire one?
