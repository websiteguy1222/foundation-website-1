# Let's Skate Foundation — letsskate.org

The public-facing brochure site for **Let's Skate Foundation**, a 501(c)(3)
nonprofit that operates **Elmbrook Speedskating**, the nation's first
school-district speed skating club.

Registration runs on a separate operational site at
[elmbrookspeedskating.org/register](https://www.elmbrookspeedskating.org/register) —
this site links out to it. Donations are handled on this site via Stripe Payment Links.

## Stack

- **Astro** static site generator
- Plain CSS (variables in `src/styles/theme.css`)
- Nunito + Fraunces fonts from Google Fonts
- **Stripe Payment Links** for donations (no backend, no code)
- **Formspree** (or equivalent) for the contact form
- **Cloudflare Pages** or **Vercel** for hosting (free at this traffic level)

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Build for production

```bash
npm run build
# output is in ./dist
npm run preview   # serve the built site locally
```

## Project layout

```
src/
  styles/theme.css            ← brand tokens + base styles
  layouts/BaseLayout.astro    ← <html>, fonts, meta, schema.org, nav + footer
  components/
    Nav.astro                 ← sticky top nav
    Footer.astro              ← legal footer with EIN
    RegisterButton.astro      ← links to elmbrookspeedskating.org/register
    Hero.astro                ← homepage hero
    InfoBand.astro            ← teal value-prop bar
    MissionSection.astro      ← mission + quote card
    ProgramsGrid.astro        ← 4-card programs grid
    PettitSection.astro       ← dark "home ice" section
    SummerCampSection.astro   ← annual camp callout
    CTASection.astro          ← final CTA at the bottom of pages
  pages/
    index.astro               ← /
    about.astro               ← /about
    programs.astro            ← /programs
    gallery.astro             ← /gallery (placeholder grid)
    blog/index.astro          ← /blog
    contact.astro             ← /contact (Formspree)
    donate.astro              ← /donate (Stripe Payment Links)
    donate/thanks.astro       ← /donate/thanks (Stripe success URL)
    privacy.astro             ← /privacy
    404.astro                 ← custom not-found page
```

`astro.config.mjs` adds 301 redirects for `/register`, `/signup`, `/join`
straight to Elmbrook Speedskating, so typo'd guesses still resolve.

## Pre-launch checklist

### 1. Stripe configuration

In your Stripe dashboard (live mode):

- **Settings → Business**
  - Legal business name: `Let's Skate Foundation`
  - EIN: `99-4111339`
  - Statement descriptor: `LETSSKATE FDN` (max 22 chars; avoids Elmbrook brand bleed-through on bank statements)
  - Support email: `admin@letsskate.org`

- **Settings → Emails → Customer emails → Successful payments**
  Customize the receipt template footer:
  ```
  Let's Skate Foundation is a tax-exempt 501(c)(3) public charity.
  EIN: 99-4111339

  This email serves as your official receipt for tax purposes. No goods
  or services were provided in exchange for this contribution. Please
  retain this receipt for your records.

  Thank you for supporting youth speed skating.
  — Let's Skate Foundation
  https://letsskate.org
  ```

- **Create five Payment Links** under Products → Payment Links:
  1. **$25 one-time** — name: "Donation — $25"
  2. **$50 one-time** — name: "Donation — $50"
  3. **$100 one-time** — name: "Donation — $100"
  4. **Custom amount one-time** — toggle "Let customers adjust the quantity" or use "Customer chooses price"; minimum $5
  5. **Monthly recurring** — set up as a subscription with a sensible default ($10/mo) and allow custom amounts

  For each link:
  - **Collect customer's address → Billing address: Required**
  - **Metadata**: `org=lsf`, `kind=donation`, `amount_tier=25` (or the appropriate value)
  - **Success URL**: `https://letsskate.org/donate/thanks`

  Copy each Payment Link URL and paste it into the corresponding
  placeholder in `src/pages/donate.astro` (search for `REPLACE_ME`).

### 2. Contact form

- Sign up at [formspree.io](https://formspree.io) (free tier is fine)
- Create a project pointing at `admin@letsskate.org`
- Copy the form endpoint and paste it into `src/pages/contact.astro`
  (replace `FORMSPREE_ENDPOINT`)

### 3. Hosting

Pick one (both free):

**Cloudflare Pages**
- `npm run build` outputs to `dist/`
- Connect the GitHub repo or upload the `dist/` folder directly
- Custom domain: `letsskate.org` (point GoDaddy DNS at Cloudflare)

**Vercel**
- Import the repo
- Framework preset: Astro (auto-detected)
- Custom domain: `letsskate.org`

### 4. DNS at GoDaddy

In your GoDaddy DNS panel for `letsskate.org`:
- Replace existing A/CNAME for the apex and `www` with the values your
  host (Cloudflare Pages or Vercel) provides
- TTL: 1 hour during cutover, raise after

### 5. SEO + launch

- Submit `letsskate.org/sitemap-index.xml` to Google Search Console
- Verify Open Graph previews with `https://www.opengraph.xyz`
- Make one real test donation end-to-end (you can refund yourself afterwards) to confirm:
  - The amount is correct
  - Billing address is captured
  - The receipt email arrives with the customized EIN footer
  - The customer lands on `/donate/thanks`

## Replacing placeholders

`grep` for `REPLACE_ME` to find every spot that needs a real URL or token
before launch:

```bash
grep -r "REPLACE_ME" src/
```

## What's intentionally minimal

- **No backend.** All "dynamic" behavior is offloaded: registration to
  Elmbrook, donations to Stripe Payment Links, contact form to Formspree.
- **No JavaScript framework.** Astro ships zero JS by default. Adds tiny
  amount of CSS-only interactivity (hover states, nav).
- **No CMS.** Blog posts (when added) live as `.md` files in
  `src/content/blog/`. Switch to Decap or Sanity later if volunteers
  need a UI.
- **No analytics yet.** Add Plausible (`<script defer data-domain="letsskate.org"
  src="https://plausible.io/js/script.js"></script>`) or Cloudflare Web
  Analytics in `BaseLayout.astro` when you want stats.

## License

Site code: MIT (or your preference). All images, text, and brand assets
are © Let's Skate Foundation.
