# Setup Guide — re:learn

Everything you need to go from deployed to taking real payments.

---

## 1. Stripe Setup (15 min)

### Create Products

Go to https://dashboard.stripe.com/test/products → **+ Add Product** (repeat 3x):

| Product Name | Price | Billing |
|---|---|---|
| re:learn Starter | $97.00 | Monthly recurring |
| re:learn Pro | $197.00 | Monthly recurring |
| re:learn VIP | $397.00 | Monthly recurring |

After creating each, copy the **Price ID** (starts with `price_`).

### Get API Keys

Go to https://dashboard.stripe.com/test/apikeys and copy:
- **Publishable key** → `pk_test_...`
- **Secret key** → `sk_test_...`

---

## 2. Google OAuth Setup (10 min)

1. Go to https://console.cloud.google.com
2. Create a new project (or use existing)
3. **APIs & Services → OAuth consent screen** → External → fill in app name
4. **APIs & Services → Credentials → + Create Credentials → OAuth Client ID**
   - Application type: **Web application**
   - Authorized redirect URIs — add both:
     ```
     http://localhost:3000/api/auth/callback/google
     https://re-course.vercel.app/api/auth/callback/google
     ```
5. Copy **Client ID** and **Client Secret**

---

## 3. Vercel Environment Variables

Go to https://vercel.com → re-course → **Settings → Environment Variables**

Add each one:

```
NEXTAUTH_URL
https://re-course.vercel.app

NEXTAUTH_SECRET
(generate: run `openssl rand -base64 32` in terminal)

GOOGLE_CLIENT_ID
(from Google Cloud Console)

GOOGLE_CLIENT_SECRET
(from Google Cloud Console)

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
pk_test_...

STRIPE_SECRET_KEY
sk_test_...

STRIPE_PRICE_STARTER
price_... (Starter $97)

STRIPE_PRICE_PRO
price_... (Pro $197)

STRIPE_PRICE_VIP
price_... (VIP $397)

DATABASE_URL
file:./dev.db
```

After adding all variables → **Redeploy** (Deployments tab → ⋯ → Redeploy).

---

## 4. Stripe Webhook (for subscription events)

1. Go to https://dashboard.stripe.com/test/webhooks → **+ Add endpoint**
2. Endpoint URL: `https://re-course.vercel.app/api/webhook/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Webhook signing secret** → `whsec_...`
5. Add to Vercel env vars:
   ```
   STRIPE_WEBHOOK_SECRET
   whsec_...
   ```

---

## 5. Slack Workspace Setup (10 min)

### Create the workspace

1. Go to https://slack.com/create → create a new workspace
2. Name it: **re:learn Community**
3. Create channels:
   - `#welcome` — auto-post welcome message
   - `#general` — main chat
   - `#deals` — post deals for group review
   - `#may-2026-cohort` — cohort-specific channel
   - `#ai-tools` — re:invest tool discussion
   - `#q-and-a` — questions for instructor

### Get an invite link

1. In Slack: **Settings → Invitations → Create invite link**
2. Set expiry: **Never** (or regenerate monthly)
3. Add the link to your Vercel env:
   ```
   SLACK_INVITE_URL
   https://join.slack.com/t/relearn/shared_invite/xxx
   ```
4. This link gets sent automatically in the welcome email after enrollment

### Optional: Slack API for auto-invites

For automatic Slack invites on enrollment (more reliable than a link):
1. Go to https://api.slack.com/apps → **Create New App**
2. Add OAuth scope: `users:write`, `admin.users:invite`
3. Install to workspace → copy **Bot Token** (`xoxb-...`)
4. Add to Vercel:
   ```
   SLACK_BOT_TOKEN
   xoxb-...
   SLACK_WORKSPACE_ID
   T... (from Slack workspace URL)
   ```

---

## 6. Email (Transactional)

Students need a welcome email with:
- Slack invite link
- Course access instructions
- Cohort start date reminder

### Recommended: Resend (free up to 3,000/mo)

1. Sign up at https://resend.com
2. Add your domain (or use their sandbox for testing)
3. Copy API key
4. Add to Vercel:
   ```
   RESEND_API_KEY
   re_...
   ```

> **Note:** The welcome email is triggered automatically after successful Stripe checkout via the `/api/webhook/stripe` endpoint (see next steps in ROADMAP.md).

---

## 7. Test the Full Flow

1. Open https://re-course.vercel.app
2. Click **Enroll Now** → complete all 4 steps
3. Use Stripe test card: `4242 4242 4242 4242` / any future date / any CVC
4. Should land on `/success` page
5. Check Stripe dashboard → new subscription should appear
6. Check your DB → new user + waitlist entry

---

## 8. Go Live Checklist

- [ ] Stripe products created (Starter / Pro / VIP)
- [ ] All Vercel env vars added
- [ ] Google OAuth redirect URIs updated
- [ ] Stripe webhook endpoint configured
- [ ] Slack workspace created with channels
- [ ] Welcome email template written
- [ ] Test checkout completed end-to-end
- [ ] Switch Stripe from **test** to **live** keys
- [ ] Redeploy with live keys
- [ ] Post cohort announcement 🎉

---

## Architecture Overview

```
User clicks Enroll
      ↓
4-step modal (name, state, license status, plan)
      ↓
POST /api/checkout
      ↓
Stripe Checkout Session created
      ↓
User pays on Stripe
      ↓
Stripe webhook → POST /api/webhook/stripe
      ↓
  ├── Save user to DB
  ├── Send welcome email (Resend)
  │     └── Slack invite link
  └── Redirect to /success
```
