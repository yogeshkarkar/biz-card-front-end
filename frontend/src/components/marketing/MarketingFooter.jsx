import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkle,
  TwitterLogo,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  Heart,
} from "@phosphor-icons/react";

const groups = [
  {
    label: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Showcase", href: "#showcase" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Help center", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Brand kit", href: "#" },
      { label: "API docs", href: "#" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
];

export const MarketingFooter = () => (
  <footer className="relative mt-24 border-t border-border bg-surface">
    <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <span className="font-display text-[15px] font-bold tracking-tight">BI</span>
              <span className="absolute -top-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-card">
                <Sparkle size={8} weight="fill" className="text-primary" />
              </span>
            </span>
            <span className="font-display text-[17px] font-bold text-foreground">BitCard</span>
          </Link>
          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
            The premium digital business card platform for founders, designers and modern teams.
            Built for the post-paper world.
          </p>

          <div className="mt-6 flex items-center gap-2">
            {[TwitterLogo, GithubLogo, LinkedinLogo, InstagramLogo].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Icon size={15} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {g.label}
              </p>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[13px] font-medium text-foreground/80 transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
        <p className="text-[12px] text-muted-foreground">
          © {new Date().getFullYear()} BitCard. All rights reserved.
        </p>
        <p className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
          Crafted with <Heart size={12} weight="fill" className="text-destructive" /> in Navsari · Status:
          <span className="inline-flex items-center gap-1 font-semibold text-success">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
            All systems operational
          </span>
        </p>
      </div>
    </div>
  </footer>
);
