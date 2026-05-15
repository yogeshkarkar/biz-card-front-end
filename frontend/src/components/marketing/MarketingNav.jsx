import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { List, X, Sparkle, ArrowRight } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const MarketingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuth = pathname === "/login" || pathname === "/signup";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <span className="font-display text-[14px] font-bold tracking-tight">BI</span>
            <span className="absolute -top-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-card">
              <Sparkle size={8} weight="fill" className="text-primary" />
            </span>
          </span>
          <span className="font-display text-[16px] font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            BitCard
          </span>
        </Link>

        {!isAuth && (
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            to="/login"
            className="hidden h-9 items-center rounded-lg px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-accent sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-primary px-3.5 text-[13px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]"
          >
            Start free
            <ArrowRight size={13} weight="bold" />
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && !isAuth && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border pt-3">
              <ThemeToggle />
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 flex-1 items-center justify-center rounded-lg border border-border bg-card px-3 text-[13px] font-medium text-foreground hover:bg-secondary"
              >
                Sign in
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
