import React from "react";
import {
  UserCircle,
  LinkSimple,
  PaintBrushBroad,
  QrCode,
  EnvelopeSimple,
  Gear,
  CreditCard,
  SignOut,
  CaretRight,
  Sparkle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useCard } from "@/contexts/CardContext";
import { Badge } from "@/components/ui/badge";

const groupsFor = (linkCount) => [
  {
    label: "Content",
    items: [
      { id: "about", label: "About", icon: UserCircle },
      { id: "links", label: "Links", icon: LinkSimple, badge: String(linkCount) },
    ],
  },
  {
    label: "Design",
    items: [{ id: "design", label: "Design", icon: PaintBrushBroad }],
  },
  {
    label: "Sharing",
    items: [
      { id: "qr", label: "QR Code", icon: QrCode },
      { id: "signature", label: "Email Signature", icon: EnvelopeSimple },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "settings", label: "Settings", icon: Gear },
      { id: "subscription", label: "Subscription", icon: CreditCard, badge: "Pro" },
    ],
  },
];

export const Sidebar = ({ onItemClick }) => {
  const { activeSection, setActiveSection, card } = useCard();
  const groups = groupsFor(card.links.length);

  const handleClick = (id) => {
    setActiveSection(id);
    onItemClick?.();
  };

  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-5">
        <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
          <span className="font-display text-lg font-bold tracking-tight">BI</span>
          <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-card shadow-sm">
            <Sparkle size={9} weight="fill" className="text-primary" />
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-semibold leading-tight text-foreground">
            {card.company}
          </p>
          <p className="truncate text-xs text-muted-foreground">Dashboard Workspace</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleClick(item.id)}
                      className={cn(
                        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors duration-200",
                        active
                          ? "bg-card text-foreground shadow-sm"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-primary" />
                      )}
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                          active ? "bg-accent text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        <Icon size={18} weight={active ? "fill" : "regular"} />
                      </span>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "h-5 rounded-full px-2 text-[10px] font-semibold",
                            item.badge === "Pro"
                              ? "bg-gradient-primary text-primary-foreground border-0"
                              : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {active && <CaretRight size={14} className="text-muted-foreground" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Upgrade card */}
      <div className="px-4 pb-3">
        <div className="relative overflow-hidden rounded-2xl border border-sidebar-border bg-card p-4 shadow-sm">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-primary opacity-20 blur-xl" />
          <div className="relative">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Sparkle size={16} weight="fill" />
            </div>
            <p className="font-display text-sm font-semibold text-foreground">Upgrade to Pro</p>
            <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
              Unlock analytics, teams & custom domains.
            </p>
            <button className="mt-3 w-full rounded-lg bg-gradient-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]">
              Upgrade plan
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-sidebar-border px-3 py-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg">
            <SignOut size={18} />
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
};
