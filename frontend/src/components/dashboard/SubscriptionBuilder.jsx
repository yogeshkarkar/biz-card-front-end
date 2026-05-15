import React, { useState } from "react";
import {
  Sparkle,
  Lightning,
  CheckCircle,
  CreditCard,
  Receipt,
  Download,
  ArrowRight,
  ShieldCheck,
  Users,
  Cube,
  Crown,
  ArrowUpRight,
  Plus,
  TrendUp,
  Calendar,
  Star,
  Confetti,
  CurrencyDollar,
  Question,
  XCircle,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For solo creators",
    icon: Cube,
    monthly: 0,
    yearly: 0,
    features: [
      "1 digital card",
      "Up to 5 smart links",
      "Standard QR code",
      "Basic analytics",
      "BitCard subdomain",
    ],
    limits: { cards: 1, links: 5, scans: "1k / mo" },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Most loved by founders",
    icon: Crown,
    monthly: 9,
    yearly: 84,
    popular: true,
    features: [
      "Unlimited cards & links",
      "Branded QR + email signature",
      "Full analytics & UTM tracking",
      "Custom domain",
      "Remove BitCard branding",
      "Priority email support",
    ],
    limits: { cards: "Unlimited", links: "Unlimited", scans: "50k / mo" },
  },
  {
    id: "team",
    name: "Team",
    tagline: "For modern teams",
    icon: Users,
    monthly: 29,
    yearly: 276,
    perSeat: true,
    features: [
      "Everything in Pro",
      "Shared brand kit & templates",
      "Role-based access control",
      "SSO & SCIM provisioning",
      "Audit logs",
      "Dedicated success manager",
    ],
    limits: { cards: "Unlimited", links: "Unlimited", scans: "Unlimited" },
  },
];

const ADDONS = [
  { id: "domain", icon: ShieldCheck, label: "Custom domain", price: 4, desc: "Connect card.yourname.com" },
  { id: "ai", icon: Sparkle, label: "AI copy assistant", price: 6, desc: "Auto-write bios & taglines" },
  { id: "seats", icon: Users, label: "Extra seat", price: 9, desc: "Add a teammate to your workspace" },
];

const INVOICES = [
  { id: "INV-2026-008", date: "Feb 01, 2026", amount: 9.0, status: "paid", plan: "Pro · Monthly" },
  { id: "INV-2026-007", date: "Jan 01, 2026", amount: 9.0, status: "paid", plan: "Pro · Monthly" },
  { id: "INV-2025-012", date: "Dec 01, 2025", amount: 9.0, status: "paid", plan: "Pro · Monthly" },
  { id: "INV-2025-011", date: "Nov 01, 2025", amount: 9.0, status: "paid", plan: "Pro · Monthly" },
  { id: "INV-2025-010", date: "Oct 01, 2025", amount: 9.0, status: "paid", plan: "Pro · Monthly" },
];

const USAGE = [
  { label: "Card views", used: 2148, limit: 50000, icon: TrendUp, tone: "primary" },
  { label: "QR scans", used: 412, limit: 50000, icon: Lightning, tone: "success" },
  { label: "Link clicks", used: 1023, limit: 50000, icon: ArrowUpRight, tone: "violet" },
];

export const SubscriptionBuilder = () => {
  const [billing, setBilling] = useState("yearly");
  const [currentPlan, setCurrentPlan] = useState("pro");

  const yearlyDiscount = (m, y) => (m === 0 ? 0 : Math.round(((m * 12 - y) / (m * 12)) * 100));

  const handlePlanChange = (planId) => {
    if (planId === currentPlan) return;
    setCurrentPlan(planId);
    const plan = PLANS.find((p) => p.id === planId);
    toast.success(`Switched to ${plan.name} plan. Welcome aboard.`);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 animate-fade-up">
      {/* Current plan banner */}
      <CurrentPlanCard
        plan={PLANS.find((p) => p.id === currentPlan)}
        billing={billing}
      />

      {/* Usage */}
      <SectionCard
        title="Usage this cycle"
        subtitle="Resets on Feb 28, 2026 · 23 days remaining"
        icon={Calendar}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {USAGE.map((u) => (
            <UsageTile key={u.label} {...u} />
          ))}
        </div>
      </SectionCard>

      {/* Plans */}
      <SectionCard
        title="Choose your plan"
        subtitle="Switch any time. Pay only for what you use."
        icon={Sparkle}
        right={<BillingToggle value={billing} onChange={setBilling} />}
      >
        <div className="grid gap-3 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billing={billing}
              isCurrent={plan.id === currentPlan}
              discount={yearlyDiscount(plan.monthly, plan.yearly)}
              onSelect={() => handlePlanChange(plan.id)}
            />
          ))}
        </div>
      </SectionCard>

      {/* Add-ons */}
      <SectionCard title="Power-ups" subtitle="Bolt-on extras you can enable any time" icon={Plus}>
        <div className="grid gap-3 sm:grid-cols-3">
          {ADDONS.map((a) => (
            <AddonCard key={a.id} addon={a} />
          ))}
        </div>
      </SectionCard>

      {/* Payment method */}
      <SectionCard
        title="Payment method"
        subtitle="Cards are encrypted and processed via Stripe"
        icon={CreditCard}
      >
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-16 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-glow">
              <span className="font-display text-[11px] font-bold tracking-wider">VISA</span>
            </div>
            <div>
              <p className="font-display text-[14px] font-semibold text-foreground">
                Visa ending in 4242
              </p>
              <p className="text-[12px] text-muted-foreground">
                Expires 09 / 2028 · Yogesh Karkar
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              data-testid="btn-update-card"
              onClick={() => toast.info("Stripe portal opens here.")}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-[12.5px] font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <CreditCard size={13} weight="bold" /> Update card
            </button>
            <button
              data-testid="btn-add-card"
              onClick={() => toast.info("Add new payment method")}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-primary px-3 text-[12.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]"
            >
              <Plus size={13} weight="bold" /> Add new
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Billing history */}
      <SectionCard
        title="Billing history"
        subtitle="Receipts are auto-emailed to billing@bitcodeinfotech.com"
        icon={Receipt}
      >
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="hidden grid-cols-[1fr_1fr_120px_100px_40px] gap-3 border-b border-border bg-surface px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:grid">
            <span>Invoice</span>
            <span>Date</span>
            <span>Plan</span>
            <span className="text-right">Amount</span>
            <span />
          </div>
          {INVOICES.map((inv, i) => (
            <div
              key={inv.id}
              data-testid={`invoice-row-${i}`}
              className={cn(
                "grid grid-cols-2 gap-3 px-4 py-3.5 transition-colors hover:bg-accent/40 sm:grid-cols-[1fr_1fr_120px_100px_40px]",
                i !== INVOICES.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 items-center gap-1 rounded-md bg-success-soft px-1.5 text-[10.5px] font-semibold text-success">
                  <CheckCircle size={10} weight="fill" /> Paid
                </span>
                <span className="truncate text-[12.5px] font-semibold text-foreground">{inv.id}</span>
              </div>
              <span className="hidden text-[12.5px] text-muted-foreground sm:inline-flex sm:items-center">
                {inv.date}
              </span>
              <span className="hidden text-[12.5px] text-foreground sm:inline-flex sm:items-center">
                {inv.plan}
              </span>
              <span className="text-right text-[13px] font-bold text-foreground sm:flex sm:items-center sm:justify-end">
                ${inv.amount.toFixed(2)}
              </span>
              <button
                onClick={() => toast.success(`Downloading ${inv.id}.pdf`)}
                className="inline-flex h-7 w-7 items-center justify-center justify-self-end rounded-md border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Download invoice"
              >
                <Download size={12} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Cancel / Help */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-accent text-primary">
            <Question size={18} weight="fill" />
          </span>
          <div className="flex-1">
            <p className="font-display text-[14px] font-semibold text-foreground">
              Need help with billing?
            </p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              Our team replies in under 4 hours, every weekday.
            </p>
            <button
              onClick={() => toast.info("Opening support inbox…")}
              className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:underline"
            >
              Contact billing support <ArrowRight size={11} weight="bold" />
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-card p-5 shadow-sm">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive">
            <XCircle size={18} weight="fill" />
          </span>
          <div className="flex-1">
            <p className="font-display text-[14px] font-semibold text-foreground">
              Cancel subscription
            </p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              You&apos;ll keep Pro features until your next renewal date.
            </p>
            <button
              data-testid="btn-cancel-subscription"
              onClick={() =>
                toast.error("Cancellation flow opens here (mocked).", {
                  description: "Pro stays active until Feb 28, 2026.",
                })
              }
              className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-destructive hover:underline"
            >
              Cancel anyway <ArrowRight size={11} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- subcomponents ---------- */

const SectionCard = ({ icon: Icon, title, subtitle, right, children }) => (
  <section className="rounded-3xl border border-border bg-card shadow-sm">
    <header className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
          <Icon size={15} weight="fill" />
        </span>
        <div>
          <p className="font-display text-[15px] font-semibold tracking-tight text-foreground">
            {title}
          </p>
          {subtitle && <p className="text-[12px] text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {right}
    </header>
    <div className="p-5">{children}</div>
  </section>
);

const CurrentPlanCard = ({ plan, billing }) => {
  const Icon = plan.icon;
  const price = billing === "yearly" ? plan.yearly : plan.monthly;
  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-primary p-6 text-primary-foreground shadow-glow sm:p-7">
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
            <Icon size={22} weight="fill" />
          </span>
          <div>
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/80">
              Current plan
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight">
              {plan.name}{" "}
              <span className="text-[13px] font-medium text-primary-foreground/80">
                · ${price}
                {plan.monthly === 0 ? "" : billing === "yearly" ? "/yr" : "/mo"}
                {plan.perSeat && " · per seat"}
              </span>
            </h2>
            <p className="mt-1 max-w-md text-[13px] text-primary-foreground/85">
              {plan.tagline}. Next renewal on{" "}
              <span className="font-semibold text-primary-foreground">Feb 28, 2026</span>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">
            <CheckCircle size={11} weight="fill" /> Active
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold backdrop-blur">
            <Confetti size={11} weight="fill" /> Saving $24/yr
          </span>
        </div>
      </div>
    </div>
  );
};

const UsageTile = ({ label, used, limit, icon: Icon, tone }) => {
  const pct = typeof limit === "number" ? Math.min(100, (used / limit) * 100) : 4;
  const toneMap = {
    primary: "from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))]",
    success: "from-success to-[hsl(152_70%_55%)]",
    violet: "from-[hsl(262_83%_60%)] to-[hsl(272_90%_70%)]",
  };
  const iconBg = {
    primary: "bg-accent text-primary",
    success: "bg-success-soft text-success",
    violet: "bg-[hsl(262_83%_96%)] text-[hsl(262_83%_45%)] dark:bg-[hsl(262_50%_20%)] dark:text-[hsl(262_90%_85%)]",
  };
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className={cn("grid h-9 w-9 place-items-center rounded-xl", iconBg[tone])}>
          <Icon size={14} weight="fill" />
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">
          {typeof limit === "number" ? `${used.toLocaleString()} / ${limit.toLocaleString()}` : used.toLocaleString()}
        </span>
      </div>
      <p className="mt-3 font-display text-[13.5px] font-semibold text-foreground">{label}</p>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all", toneMap[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        {pct.toFixed(1)}% of plan used
      </p>
    </div>
  );
};

const BillingToggle = ({ value, onChange }) => (
  <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
    {[
      { id: "monthly", label: "Monthly" },
      { id: "yearly", label: "Yearly", badge: "−22%" },
    ].map((b) => (
      <button
        key={b.id}
        data-testid={`billing-toggle-${b.id}`}
        onClick={() => onChange(b.id)}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-semibold transition-all",
          value === b.id
            ? "bg-gradient-primary text-primary-foreground shadow-glow"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {b.label}
        {b.badge && (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[9.5px] font-bold",
              value === b.id ? "bg-white/25 text-primary-foreground" : "bg-success-soft text-success"
            )}
          >
            {b.badge}
          </span>
        )}
      </button>
    ))}
  </div>
);

const PlanCard = ({ plan, billing, isCurrent, discount, onSelect }) => {
  const Icon = plan.icon;
  const price = billing === "yearly" ? Math.round(plan.yearly / 12) : plan.monthly;
  return (
    <div
      data-testid={`plan-card-${plan.id}`}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 transition-all duration-300",
        plan.popular
          ? "border-primary/40 bg-surface shadow-card-lg"
          : "border-border bg-surface hover:-translate-y-0.5 hover:shadow-card",
        isCurrent && "ring-2 ring-primary"
      )}
    >
      {plan.popular && !isCurrent && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-glow">
          <Star size={9} weight="fill" /> Popular
        </span>
      )}
      {isCurrent && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold text-success">
          <CheckCircle size={9} weight="fill" /> Current
        </span>
      )}

      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
        <Icon size={16} weight="fill" />
      </span>
      <p className="mt-4 font-display text-[16px] font-bold text-foreground">{plan.name}</p>
      <p className="text-[12px] text-muted-foreground">{plan.tagline}</p>

      <div className="mt-4 flex items-end gap-1.5">
        <span className="font-display text-3xl font-bold tracking-tight text-foreground">
          ${price}
        </span>
        <span className="mb-1 text-[11.5px] text-muted-foreground">
          {plan.monthly === 0 ? "/forever" : plan.perSeat ? "/seat/mo" : "/mo"}
        </span>
        {billing === "yearly" && discount > 0 && (
          <span className="mb-1 ml-auto rounded-md bg-success-soft px-1.5 py-0.5 text-[10px] font-bold text-success">
            Save {discount}%
          </span>
        )}
      </div>
      {billing === "yearly" && plan.monthly !== 0 && (
        <p className="mt-1 text-[11px] text-muted-foreground">
          Billed ${plan.yearly}/yr
        </p>
      )}

      <button
        onClick={onSelect}
        disabled={isCurrent}
        data-testid={`btn-select-${plan.id}`}
        className={cn(
          "mt-5 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-xl text-[12.5px] font-semibold transition-all duration-200",
          isCurrent
            ? "cursor-not-allowed border border-border bg-card text-muted-foreground"
            : plan.popular
              ? "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
              : "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {isCurrent ? (
          <>Current plan</>
        ) : (
          <>
            {plan.id === "starter" ? "Downgrade" : "Switch to " + plan.name}
            <ArrowRight size={12} weight="bold" />
          </>
        )}
      </button>

      <ul className="mt-5 space-y-2 border-t border-border pt-4">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[12.5px] text-foreground/85">
            <CheckCircle
              size={13}
              weight="fill"
              className={cn(
                "mt-0.5 flex-shrink-0",
                plan.popular ? "text-primary" : "text-success"
              )}
            />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddonCard = ({ addon }) => {
  const [on, setOn] = useState(false);
  const Icon = addon.icon;
  return (
    <div
      data-testid={`addon-${addon.id}`}
      className={cn(
        "rounded-2xl border bg-surface p-4 transition-all",
        on ? "border-primary/40 shadow-sm" : "border-border"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary">
          <Icon size={15} weight="fill" />
        </span>
        <Toggle on={on} onChange={() => {
          setOn((s) => !s);
          toast.success(`${addon.label} ${on ? "disabled" : "enabled"}`);
        }} />
      </div>
      <p className="mt-3 font-display text-[13.5px] font-semibold text-foreground">{addon.label}</p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">{addon.desc}</p>
      <p className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-foreground">
        <CurrencyDollar size={11} weight="bold" className="text-muted-foreground" />
        {addon.price}
        <span className="font-medium text-muted-foreground">/mo</span>
      </p>
    </div>
  );
};

const Toggle = ({ on, onChange }) => (
  <button
    onClick={onChange}
    className={cn(
      "relative h-6 w-11 rounded-full transition-colors",
      on ? "bg-gradient-primary" : "bg-secondary"
    )}
    aria-pressed={on}
  >
    <span
      className={cn(
        "absolute top-0.5 grid h-5 w-5 place-items-center rounded-full bg-card shadow transition-all",
        on ? "left-[22px]" : "left-0.5"
      )}
    >
      <CheckCircle
        size={9}
        weight="fill"
        className={cn("transition-opacity", on ? "text-primary opacity-100" : "opacity-0")}
      />
    </span>
  </button>
);
