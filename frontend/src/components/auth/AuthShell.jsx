import React from "react";
import { Link } from "react-router-dom";
import { Sparkle, ShieldCheck, Lightning, ArrowLeft } from "@phosphor-icons/react";
import { CardMockup } from "@/components/marketing/CardMockup";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

const quotes = [
  {
    text: "BitCard replaced our entire stack of paper cards. Onboarding new hires is now one link.",
    name: "Riya Mehta",
    role: "Head of People · Lumen Labs",
  },
];

export const AuthShell = ({ title, subtitle, children, footer, side = "right" }) => (
  <div className="relative min-h-screen overflow-hidden bg-background">
    {/* Decorative mesh */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-mesh" aria-hidden />

    <div className="relative grid min-h-screen lg:grid-cols-2">
      {/* Visual side */}
      <div className={`relative hidden overflow-hidden bg-gradient-to-br from-accent/40 via-surface to-card lg:flex lg:flex-col ${side === "left" ? "order-1" : "order-2"}`}>
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="relative flex flex-1 flex-col p-10">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <span className="font-display text-[15px] font-bold tracking-tight">BI</span>
              <span className="absolute -top-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-card">
                <Sparkle size={8} weight="fill" className="text-primary" />
              </span>
            </span>
            <span className="font-display text-[17px] font-bold text-foreground">BitCard</span>
          </Link>

          <div className="mt-auto">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-primary opacity-20 blur-2xl" />
              <div className="relative flex justify-center">
                <CardMockup size="md" className="rotate-[-3deg] transition-transform duration-500 hover:rotate-0" />
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-md">
            <p className="font-display text-[18px] font-semibold leading-snug text-foreground">
              &ldquo;{quotes[0].text}&rdquo;
            </p>
            <p className="mt-3 text-[12.5px] text-muted-foreground">
              — <span className="font-semibold text-foreground">{quotes[0].name}</span> · {quotes[0].role}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Pill icon={ShieldCheck} label="SOC 2 Type II" />
            <Pill icon={Lightning} label="99.99% uptime" />
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className={`relative flex flex-col ${side === "left" ? "order-2" : "order-1"}`}>
        <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6 lg:hidden">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <span className="font-display text-[13px] font-bold">BI</span>
            </span>
            <span className="font-display text-[15px] font-bold text-foreground">BitCard</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="absolute right-5 top-5 hidden lg:block">
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-[420px] animate-fade-up">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1 text-[12.5px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={12} weight="bold" /> Back to home
            </Link>
            <h1 className="font-display text-[28px] font-bold tracking-tight text-foreground sm:text-[32px]">
              {title}
            </h1>
            <p className="mt-2 text-[14px] text-muted-foreground">{subtitle}</p>

            <div className="mt-8">{children}</div>

            {footer && <div className="mt-6 text-center text-[13px] text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Pill = ({ icon: Icon, label }) => (
  <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 backdrop-blur">
    <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-primary">
      <Icon size={13} weight="fill" />
    </span>
    <span className="text-[12px] font-semibold text-foreground">{label}</span>
  </div>
);
