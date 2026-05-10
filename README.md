# Defined — The Internet's Favorite Fake Dictionary

> "Too accurate to be legal." — everyone who's ever used this app

An AI-powered personalized fake dictionary definition generator that turns custom definitions into purchasable products. Built for TikTok virality, Etsy-energy personalization, and impulse gifting.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS |
| Components | shadcn/ui + Radix UI |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (magic links) |
| AI | OpenAI GPT-4o |
| Payments | Stripe Checkout |
| Print-on-demand | Printify API |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-org/defined.git
cd defined
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the following in `.env.local`:

| Variable | Where to get it |
|---|---|
| `OPENAI_API_KEY` | [platform.openai.com](https://platform.openai.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project settings |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings → API |
| `STRIPE_SECRET_KEY` | [dashboard.stripe.com](https://dashboard.stripe.com) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks → your endpoint |
| `PRINTIFY_API_KEY` | [printify.com](https://printify.com) → My Profile → Connections |
| `PRINTIFY_SHOP_ID` | Printify dashboard → your shop ID |
| `ADMIN_SECRET` | Any secret string you choose |

### 3. Set up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase/schema.sql`
3. Copy the project URL and API keys to your `.env.local`

### 4. Set up Stripe

1. Create a Stripe account and get your API keys
2. For local webhook testing, install the Stripe CLI:
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

Stripe events handled:
- `checkout.session.completed` → creates order, triggers Printify

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
defined/
├── app/
│   ├── (auth)/           # Login/signup pages
│   ├── admin/            # Admin dashboard (?key=ADMIN_SECRET)
│   ├── api/
│   │   ├── generate/     # POST: AI definition generation
│   │   │   └── remix/   # POST: Remix a definition
│   │   ├── stripe/
│   │   │   ├── checkout/ # POST: Create Stripe session
│   │   │   └── webhook/  # POST: Handle Stripe events
│   │   └── printify/     # Printify integration
│   ├── auth/callback/    # Supabase auth callback
│   ├── chaotic-definitions/ # Trending definitions page
│   ├── checkout/success/    # Post-purchase success
│   ├── define/[name]/       # SEO pages per name
│   ├── generate/            # Main generator flow
│   ├── layout.tsx
│   └── page.tsx             # Landing page
├── components/
│   ├── generator/       # Form, results, remix buttons
│   ├── landing/         # Hero, features, testimonials
│   ├── layout/          # Header, footer
│   ├── products/        # Product preview, theme selector
│   └── share/           # Social share card
├── hooks/               # useDefinition, useAuth
├── lib/
│   ├── openai.ts        # AI generation + prompt engineering
│   ├── printify.ts      # Print-on-demand integration
│   ├── stripe.ts        # Payment processing
│   ├── supabase.ts      # Database helpers
│   └── utils.ts         # Shared utilities
├── supabase/
│   └── schema.sql       # Full database schema
├── types/
│   └── index.ts         # All TypeScript types
└── middleware.ts         # Auth session refresh
```

---

## Key Features

### AI Generation (`lib/openai.ts`)
- Uses GPT-4o with carefully tuned system prompts
- Generates 3 unique definition variations per request
- 10 tone options: Chaotic, Savage, Wholesome, Romantic, Pet Goblin, etc.
- 13 relationship types including all pets and family
- Remix modes: Roast, Sweeter, More Chaotic, Devastating, Pet Edition
- `response_format: { type: "json_object" }` for structured output

### Product Preview
- CSS-based mockups for 6 product types (no external dependencies)
- 8 aesthetic themes: Minimal, Retro, Y2K, Grunge, Soft Life, etc.
- Live preview updates instantly on theme/product switch
- Uses Framer Motion AnimatePresence for smooth transitions

### Share Cards (`components/share/ShareCard.tsx`)
- Generates downloadable PNG via html2canvas
- Square (1:1) and Story (9:16) formats
- Theme-matched styling
- Copies shareable link to clipboard

### Checkout Flow
1. User selects definition + product + theme
2. Items added to local cart
3. POST `/api/stripe/checkout` creates Stripe session
4. User redirected to Stripe Checkout
5. On success: `/checkout/success`
6. Stripe webhook fires: order created in Supabase + Printify order submitted

---

## Admin Dashboard

Access at `/admin?key=YOUR_ADMIN_SECRET`

Shows:
- Total definitions generated
- Recent orders
- Trending tones (last 7 days)
- Top names (most generated)

---

## SEO Pages

- `/define/[name]` — shareable definition pages with OG metadata
- `/pets/[name]` — pet-specific pages
- `/chaotic-definitions` — trending definitions (revalidates every 5 min)

---

## Deployment (Vercel)

```bash
npm run build   # Verify build locally first
```

1. Push to GitHub
2. Import to Vercel
3. Add all environment variables in Vercel dashboard
4. Set up Stripe webhook endpoint: `https://your-domain.com/api/stripe/webhook`
5. Deploy

Recommended Vercel config:
- Region: `iad1` (US East) for lowest latency to OpenAI
- Function timeout: 60s (for `/api/generate`)

---

## Growth & Virality Strategy

- **Free share cards** — every definition generates a downloadable image
- **SEO pages** — `/define/[name]` creates indexable content at scale
- **Trending page** — community-driven social proof
- **Remix modes** — increases time-on-site and shares
- **Watermark** — "defined.app" on every share card

---

## Contributing

PRs welcome. Please:
1. Keep the chaotic energy
2. Don't add corporate SaaS vibes
3. Test mobile first
4. Add types for everything

---

## License

MIT. Emotionally devastating but legally harmless.
