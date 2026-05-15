import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkle,
  Lightning,
  Palette,
  QrCode,
  EnvelopeSimple,
  ShieldCheck,
  ChartLineUp,
  LinkSimple,
  CheckCircle,
  Star,
  Plus,
  Minus,
  Quotes,
  IdentificationCard,
  Globe,
  DeviceMobile,
  Cursor,
  Users,
  Buildings,
  Confetti,
} from "@phosphor-icons/react";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { CardMockup } from "@/components/marketing/CardMockup";

const features = [
  {
    icon: IdentificationCard,
    title: "Drag-free card builder",
    desc: "Six guided tabs assemble a beautiful, brand-ready digital card in under 3 minutes.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Palette,
    title: "Theme-aware designer",
    desc: "Pick palettes, layouts and covers. Live preview reflects every change instantly.",
    color: "from-fuchsia-500 to-rose-500",
  },
  {
    icon: LinkSimple,
    title: "Unlimited smart links",
    desc: "Group socials, payments, calendars and PDFs into a single sharable identity.",
    color: "from-sky-500 to-cyan-500",
  },
  {
    icon: QrCode,
    title: "Branded QR codes",
    desc: "Generate matte, glossy or framed QR codes that match your card aesthetic.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: EnvelopeSimple,
    title: "Email signature studio",
    desc: "Auto-builds a clean HTML signature for Gmail, Outlook and Apple Mail.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: ChartLineUp,
    title: "Realtime analytics",
    desc: "Track scans, link clicks, geo & device — without any cookie banner clutter.",
    color: "from-rose-500 to-pink-500",
  },
];

const steps = [
  {
    n: "01",
    title: "Create your identity",
    desc: "Add your photo, role, contact details and the links you want to share.",
  },
  {
    n: "02",
    title: "Design with intent",
    desc: "Choose a palette, cover style and layout. Preview updates in real time.",
  },
  {
    n: "03",
    title: "Share anywhere",
    desc: "One link, one QR, one email signature. Works on every phone, every OS.",
  },
];

const showcase = [
  {
    name: "Yogesh Karkar",
    title: "Owner",
    company: "Bitcode Infotech",
    accent: "#5b5bf5",
    avatar:
      "https://images.unsplash.com/photo-1752738372136-2602aaafdcb7?w=200&h=200&fit=crop&crop=faces",
    cover:
      "https://images.unsplash.com/photo-1456300633423-f52385ce7bfd?w=600&h=300&fit=crop",
  },
  {
    name: "Amelia Chen",
    title: "Product Designer",
    company: "Northwave",
    accent: "#ec4899",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces",
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600&h=300&fit=crop",
  },
  {
    name: "Marcus Holloway",
    title: "Founder",
    company: "Atlas & Co.",
    accent: "#10b981",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop&crop=faces",
    cover:
      "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=600&h=300&fit=crop",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    suffix: "/forever",
    desc: "For solo creators who just need a beautiful card.",
    cta: "Start free",
    features: [
      "1 digital business card",
      "Up to 5 smart links",
      "Standard QR code",
      "Basic analytics",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "9",
    suffix: "/month",
    desc: "Power features for founders, freelancers and creators.",
    cta: "Start 14-day trial",
    features: [
      "Unlimited cards & links",
      "Branded QR + email signature",
      "Full analytics & UTM",
      "Custom domain",
      "Remove BitCard branding",
    ],
    highlight: true,
  },
  {
    name: "Team",
    price: "29",
    suffix: "/seat/mo",
    desc: "For teams who care deeply about their first impression.",
    cta: "Talk to sales",
    features: [
      "Everything in Pro",
      "Shared brand kit",
      "Role-based access",
      "SSO & SCIM",
      "Priority support",
    ],
    highlight: false,
  },
];

const faqs = [
  {
    q: "Do I need to install an app?",
    a: "Nope. BitCard works fully in the browser, on both desktop and mobile. Your audience never needs to install anything either.",
  },
  {
    q: "Can I keep my own domain?",
    a: "Yes. Pro and Team plans let you connect a custom domain or subdomain — your card will live at card.yourname.com.",
  },
  {
    q: "Is BitCard GDPR-friendly?",
    a: "Absolutely. We track scans and clicks without cookies, never sell data, and offer a full data export at any time.",
  },
  {
    q: "Can I switch designs after publishing?",
    a: "Yes — your URL stays the same forever. Update your card, links, palette or photo anytime, and changes go live instantly.",
  },
  {
    q: "What happens if I cancel?",
    a: "Your card stays live on the free Starter plan. You just lose Pro-only features like branded QR and analytics.",
  },
];

const testimonials = [
  {
    quote:
      "We rolled out BitCard to all 40 sales reps in a single afternoon. Conversations now lead to scans, not lost paper.",
    name: "Sara Ibanez",
    role: "VP Sales · Northwave",
  },
  {
    quote:
      "The design system is genuinely beautiful — my card finally looks like my portfolio site.",
    name: "Marcus Holloway",
    role: "Founder · Atlas & Co.",
  },
  {
    quote:
      "Best $9 I spend a month. The QR + email signature combo alone is worth it.",
    name: "Priya Raghavan",
    role: "Freelance designer",
  },
];

export default function Landing() {
  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" aria-hidden />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[1100px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-[1280px] gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-28 lg:pt-20">
          {/* Copy */}
          <div className="relative">
            <div
              data-testid="hero-badge"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11.5px] font-semibold text-foreground shadow-sm"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                <Sparkle size={10} weight="fill" />
              </span>
              v2.4 · QR studio + Email signature builder are live
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The business card,
              <br />
              <span className="text-gradient">reimagined for 2026.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              One link, one QR, one signature. BitCard turns your contact details into a
              beautiful, trackable digital identity — share it in seconds, update it forever.
            </p>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                to="/signup"
                data-testid="hero-cta-signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 text-[14px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]"
              >
                Get started free
                <ArrowRight size={15} weight="bold" />
              </Link>
              <Link
                to="/login"
                data-testid="hero-cta-login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-[14px] font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[12.5px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={14} weight="fill" className="text-success" /> No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={14} weight="fill" className="text-success" /> 14-day Pro trial
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle size={14} weight="fill" className="text-success" /> Cancel anytime
              </span>
            </div>

            {/* Avatar trust row */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-3 py-2 shadow-sm backdrop-blur">
              <div className="flex -space-x-2">
                {showcase.map((s) => (
                  <img
                    key={s.name}
                    src={s.avatar}
                    alt={s.name}
                    className="h-7 w-7 rounded-full border-2 border-card object-cover"
                  />
                ))}
                <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-gradient-primary text-[10px] font-bold text-primary-foreground">
                  +9k
                </span>
              </div>
              <div className="flex items-center gap-0.5 text-[12px] font-semibold text-foreground">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} weight="fill" className="text-amber-500" />
                ))}
                <span className="ml-1.5 text-muted-foreground">
                  4.9 · loved by 9,000+ founders
                </span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-primary opacity-15 blur-2xl" />
            <div className="absolute left-0 top-10 hidden animate-float lg:block">
              <FloatingChip
                icon={QrCode}
                title="QR scanned"
                value="+128 today"
                tone="primary"
              />
            </div>
            <div className="absolute -right-2 bottom-16 hidden animate-float lg:block" style={{ animationDelay: "1.2s" }}>
              <FloatingChip
                icon={Cursor}
                title="Link CTR"
                value="32.4%"
                tone="success"
              />
            </div>
            <div className="absolute right-10 top-0 hidden animate-float lg:block" style={{ animationDelay: "0.6s" }}>
              <FloatingChip
                icon={Globe}
                title="Profile views"
                value="2.1k / wk"
                tone="violet"
              />
            </div>

            <div className="relative flex items-center justify-center gap-4">
              <CardMockup
                size="md"
                className="rotate-[-6deg] transition-transform duration-500 hover:rotate-0"
                name={showcase[0].name}
                title={showcase[0].title}
                company={showcase[0].company}
                accent={showcase[0].accent}
                avatar={showcase[0].avatar}
                cover={showcase[0].cover}
              />
              <CardMockup
                size="md"
                className="hidden rotate-[5deg] transition-transform duration-500 hover:rotate-0 sm:block"
                name={showcase[1].name}
                title={showcase[1].title}
                company={showcase[1].company}
                accent={showcase[1].accent}
                avatar={showcase[1].avatar}
                cover={showcase[1].cover}
                theme="dark"
              />
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="relative border-y border-border bg-card/40 backdrop-blur">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-10 gap-y-4 px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Trusted by teams at
            </p>
            {["Northwave", "Atlas & Co.", "Lumen Labs", "Pebble", "Cardinal", "Vivid"].map(
              (l) => (
                <span
                  key={l}
                  className="font-display text-[15px] font-semibold tracking-tight text-foreground/60 transition-colors hover:text-foreground"
                >
                  {l}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <Lightning size={11} weight="fill" /> Why BitCard
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Everything you need to make a first impression that lasts.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              A polished builder, real analytics and design controls that respect your
              brand — without the gimmicks.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                data-testid={`feature-card-${i}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg"
              >
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.color} opacity-10 transition-opacity duration-300 group-hover:opacity-20`} />
                <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <f.icon size={18} weight="fill" />
                </div>
                <h3 className="mt-5 font-display text-[17px] font-semibold tracking-tight text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative overflow-hidden border-y border-border bg-surface py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                <DeviceMobile size={11} weight="fill" /> How it works
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Three steps. About three minutes.
              </h2>
              <p className="mt-3 max-w-lg text-base text-muted-foreground">
                BitCard removes every awkward step between meeting someone and being
                remembered.
              </p>

              <div className="mt-8 space-y-4">
                {steps.map((s) => (
                  <div
                    key={s.n}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
                  >
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-primary font-display text-[13px] font-bold text-primary-foreground shadow-glow">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-display text-[15px] font-semibold text-foreground">
                        {s.title}
                      </p>
                      <p className="mt-1 text-[13px] text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-primary opacity-10 blur-3xl" />
              <div className="relative flex items-center justify-center gap-4 lg:gap-6">
                <CardMockup
                  size="sm"
                  className="rotate-[-8deg]"
                  name={showcase[2].name}
                  title={showcase[2].title}
                  company={showcase[2].company}
                  accent={showcase[2].accent}
                  avatar={showcase[2].avatar}
                  cover={showcase[2].cover}
                />
                <CardMockup
                  size="md"
                  className="rotate-[2deg]"
                  name={showcase[0].name}
                  title={showcase[0].title}
                  company={showcase[0].company}
                  accent={showcase[0].accent}
                  avatar={showcase[0].avatar}
                  cover={showcase[0].cover}
                />
                <CardMockup
                  size="sm"
                  className="hidden rotate-[8deg] sm:block"
                  name={showcase[1].name}
                  title={showcase[1].title}
                  company={showcase[1].company}
                  accent={showcase[1].accent}
                  avatar={showcase[1].avatar}
                  cover={showcase[1].cover}
                  theme="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="showcase" className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                <Confetti size={11} weight="fill" /> Showcase
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Loved by designers, founders and operators.
              </h2>
            </div>
            <p className="max-w-md text-[14px] text-muted-foreground">
              A handful of the 9,000+ professionals who&apos;ve already replaced their paper
              cards with BitCard.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg"
              >
                <Quotes
                  size={28}
                  weight="fill"
                  className="absolute right-5 top-5 text-primary/15"
                />
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={12} weight="fill" className="text-amber-500" />
                  ))}
                </div>
                <p className="mt-4 text-[14px] leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <img
                    src={showcase[i % showcase.length].avatar}
                    alt={t.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                    <p className="text-[11.5px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative overflow-hidden border-t border-border bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <ShieldCheck size={11} weight="fill" /> Pricing
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Simple plans. No hidden fees.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Start free. Upgrade when you want more polish, more data and more control.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((p, i) => (
              <div
                key={p.name}
                data-testid={`pricing-plan-${p.name.toLowerCase()}`}
                className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
                  p.highlight
                    ? "border-primary/40 bg-card shadow-card-lg lg:-translate-y-2 lg:scale-[1.02]"
                    : "border-border bg-card shadow-sm hover:-translate-y-1 hover:shadow-card-lg"
                }`}
              >
                {p.highlight && (
                  <>
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-primary opacity-20 blur-2xl" />
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2.5 py-1 text-[10.5px] font-bold text-primary-foreground shadow-glow">
                      <Sparkle size={9} weight="fill" /> Most popular
                    </span>
                  </>
                )}
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {p.name}
                </p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                    ${p.price}
                  </span>
                  <span className="mb-1 text-[12.5px] text-muted-foreground">{p.suffix}</span>
                </div>
                <p className="mt-2 text-[13px] text-muted-foreground">{p.desc}</p>

                <Link
                  to="/signup"
                  className={`mt-6 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                    p.highlight
                      ? "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
                      : "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {p.cta}
                  <ArrowRight size={13} weight="bold" />
                </Link>

                <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] text-foreground/80">
                      <CheckCircle
                        size={14}
                        weight="fill"
                        className={`mt-0.5 flex-shrink-0 ${
                          p.highlight ? "text-primary" : "text-success"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <Users size={11} weight="fill" /> FAQ
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Questions, answered.
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-2xl border bg-card transition-all duration-200 ${
                    open ? "border-primary/30 shadow-sm" : "border-border"
                  }`}
                >
                  <button
                    data-testid={`faq-toggle-${i}`}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                      {f.q}
                    </span>
                    <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border border-border bg-card text-foreground">
                      {open ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
                    </span>
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[32px] border border-border bg-gradient-primary p-10 text-center shadow-glow sm:p-14">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <Buildings
            size={36}
            weight="fill"
            className="relative mx-auto text-primary-foreground/90"
          />
          <h2 className="relative mt-4 font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            Your card. Reborn.
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-[14px] text-primary-foreground/85 sm:text-base">
            Stop printing what you&apos;ll change next quarter. Start with BitCard today —
            free, forever.
          </p>
          <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/signup"
              data-testid="footer-cta-signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-card px-6 text-[14px] font-semibold text-foreground shadow-card-lg transition-transform duration-200 hover:scale-[1.02]"
            >
              Get started free
              <ArrowRight size={15} weight="bold" />
            </Link>
            <Link
              to="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 bg-transparent px-6 text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

const FloatingChip = ({ icon: Icon, title, value, tone = "primary" }) => {
  const map = {
    primary: "bg-gradient-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    violet: "bg-[hsl(262_83%_65%)] text-white",
  };
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-3 py-2.5 shadow-card-lg backdrop-blur">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${map[tone]} shadow-glow`}>
        <Icon size={15} weight="fill" />
      </span>
      <div className="min-w-0">
        <p className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <p className="text-[13px] font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};
