# BitCard — Product Requirements Document

## Original problem statement
Build a digital business card web app dashboard using Tailwind CSS, perfectly responsive, with Phosphor icons and a dark/light mode toggle. Update Login, Sign-up and Landing page content to match the dashboard design, with the Landing page as the default entry point.

## Tech stack
- React 18 + React Router 6
- Tailwind CSS (strict HSL CSS variables in `/app/frontend/src/index.css`)
- Phosphor Icons (`@phosphor-icons/react`)
- Shadcn UI primitives + `sonner` for toasts
- `qrcode.react` for QR generation
- Context API (`CardContext`) for state across builder tabs ↔ live preview
- Frontend prototype (no backend, mocked auth)

## Architecture
```
/app/frontend/src/
├── App.js                 # Routes: / /login /signup /dashboard
├── index.css              # HSL design tokens (light + dark)
├── contexts/CardContext.jsx
├── pages/
│   ├── Landing.jsx        # Hero, features, how-it-works, showcase, pricing, FAQ, CTA
│   ├── Login.jsx          # Uses AuthShell; mock submit → /dashboard
│   ├── Signup.jsx         # Uses AuthShell; mock submit → /dashboard
│   └── Dashboard.jsx      # Sidebar + tab content + live preview
├── components/
│   ├── marketing/         # MarketingNav, MarketingFooter, CardMockup
│   ├── auth/              # AuthShell
│   └── dashboard/         # Sidebar, CardBuilder, LinksBuilder, DesignBuilder,
│                          # QRCodeBuilder, EmailSignatureBuilder, SettingsBuilder,
│                          # SubscriptionBuilder, LivePreview, ThemeToggle
```

## Completed (Feb 2026)
- **2026-02-14** Landing page (hero w/ floating chips + two card mockups, features grid, how-it-works, showcase testimonials, pricing 3-tier, FAQ accordion, CTA, MarketingFooter).
- **2026-02-14** Login page (AuthShell, social buttons, email/password w/ show-toggle, mock auth → /dashboard).
- **2026-02-14** Signup page (AuthShell, name/email/password, live password requirements checklist, mock auth → /dashboard).
- **2026-02-14** Routing in `App.js`: `/` → Landing (default entry), `/login`, `/signup`, `/dashboard`, `*` → `/`.
- **2026-02-14** Global `<Toaster />` mounted in `App.js` so toasts render on every page.
- **2026-02-14** Subscription tab — current-plan banner, usage tiles, plan cards w/ monthly/yearly toggle, add-on toggles, payment method, invoice history, cancel/help cards.
- Earlier: About/Links/Design/QR/Email Signature/Settings tabs + theme toggle + responsive layout.

## P0/P1/P2 — Roadmap
### P0 (none)
All committed user requests are complete.

### P1
- (Optional) Persist mock auth in `localStorage` so `/dashboard` redirects to `/login` when not logged in.
- (Optional) Wire mock signup → seed first card with the user's name.

### P2 / Future
- Real backend (FastAPI + MongoDB) for auth (JWT or Emergent Google OAuth) and card persistence.
- Stripe integration for the Subscription tab (real plan switching + invoices).
- Public card page route (`/c/:handle`) using the same CardMockup component.
- Analytics tab (scan/click history charts).
- Split `Landing.jsx` (731 lines) into smaller section components when adding more variants.

## Testing
- Frontend testing agent (iteration_1): 25/27 → fixed both flagged issues (global Toaster + mobile overflow). Mobile scrollWidth at 390px now == 390.
- Auth credentials: none — auth is mocked (any non-empty values redirect to /dashboard).

## Notes for next agent
- **CSS variables must remain HSL format** (e.g. `--primary: 243 75% 60%;`). Breaking this breaks Tailwind's `hsl(var(...))` wrappers.
- `CardContext` is the source of truth for builder ↔ preview sync.
- Toaster is mounted globally in `App.js`; do not double-mount it inside pages.
- All sections on `Landing.jsx` use `overflow-hidden` to contain decorative blur halos.
