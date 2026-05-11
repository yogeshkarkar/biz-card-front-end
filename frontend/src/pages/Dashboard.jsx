import React, { useState } from "react";
import {
  MagnifyingGlass,
  BellSimple,
  ListBullets,
  Question,
  Lightning,
} from "@phosphor-icons/react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { CardBuilder } from "@/components/dashboard/CardBuilder";
import { LivePreview } from "@/components/dashboard/LivePreview";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Decorative gradient mesh */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-mesh" aria-hidden />

      <div className="relative flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-[272px] lg:flex-shrink-0 lg:border-r lg:border-sidebar-border">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
              {/* mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden">
                    <ListBullets size={18} weight="bold" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] border-r border-sidebar-border bg-sidebar p-0">
                  <Sidebar onItemClick={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="font-display text-[15px] font-semibold text-foreground">About</span>
                <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-accent-foreground">
                  v2.4
                </span>
              </div>

              <div className="relative ml-auto hidden w-72 md:block">
                <MagnifyingGlass
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search cards, links, settings…"
                  className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-12 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card"
                />
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </div>

              <div className="ml-auto flex items-center gap-2 md:ml-0">
                <button className="hidden h-9 items-center gap-1.5 rounded-lg bg-gradient-primary px-3 text-[12.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02] sm:inline-flex">
                  <Lightning size={14} weight="fill" />
                  Publish
                </button>
                <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  <BellSimple size={16} weight="bold" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
                </button>
                <button className="hidden h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:grid">
                  <Question size={16} weight="bold" />
                </button>
                <ThemeToggle />
                <div className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-card pl-1 pr-2 sm:flex">
                  <img
                    src="https://images.unsplash.com/photo-1752738372136-2602aaafdcb7?w=80&h=80&fit=crop&crop=faces"
                    className="h-7 w-7 rounded-md object-cover"
                    alt="avatar"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold leading-tight text-foreground">Yogesh K.</p>
                    <p className="truncate text-[10.5px] leading-tight text-muted-foreground">Pro plan</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:px-8 lg:py-8">
              <div className="min-w-0 flex-1">
                <CardBuilder />
              </div>
              <div className="flex justify-center lg:block lg:w-[340px] lg:flex-shrink-0">
                <LivePreview />
              </div>
            </div>
          </main>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
