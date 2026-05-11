import React from "react";
import {
  MapPin,
  EnvelopeSimple,
  Phone,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
  XLogo,
  YoutubeLogo,
  DribbbleLogo,
  CaretRight,
  IdentificationCard,
  Globe,
  DeviceMobile,
  ShareNetwork,
  DownloadSimple,
} from "@phosphor-icons/react";
import { useCard, PLATFORMS, getLinkLabel, FONT_OPTIONS, LAYOUT_OPTIONS } from "@/contexts/CardContext";
import { cn } from "@/lib/utils";

const iconMap = {
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
  XLogo,
  YoutubeLogo,
  DribbbleLogo,
  Globe,
};

/* Convert "#rrggbb" -> "H S% L%" string for CSS HSL tokens */
function hexToHslString(hex) {
  if (!hex) return "243 75% 60%";
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return "243 75% 60%";
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hue = 0, sat = 0; const light = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    sat = light > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: hue = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: hue = ((b - r) / d + 2); break;
      default: hue = ((r - g) / d + 4);
    }
    hue *= 60;
  }
  return `${Math.round(hue)} ${Math.round(sat * 100)}% ${Math.round(light * 100)}%`;
}

function lighten(hslStr, delta = 10) {
  const m = hslStr.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!m) return hslStr;
  const [, h, s, l] = m;
  return `${h} ${s}% ${Math.min(95, parseInt(l, 10) + delta)}%`;
}

export const LivePreview = () => {
  const { card } = useCard();
  const d = card.design;

  const accentHsl = hexToHslString(d.accentHex);
  const glowHsl = lighten(accentHsl, 10);
  const isDark = d.theme === "dark";
  const radiusClass = LAYOUT_OPTIONS[d.layout]?.radius || "rounded-xl";
  const fontFamily = FONT_OPTIONS[d.font]?.family;

  // Scoped CSS variables for accent override + preview theme tokens
  const previewStyle = {
    "--primary": accentHsl,
    "--primary-glow": glowHsl,
    "--accent": isDark ? `${accentHsl.split(" ")[0]} 50% 18%` : `${accentHsl.split(" ")[0]} 80% 96%`,
    "--accent-foreground": isDark ? `${accentHsl.split(" ")[0]} 90% 85%` : accentHsl,
    "--ring": accentHsl,
    "--gradient-primary": `linear-gradient(135deg, hsl(${accentHsl}) 0%, hsl(${glowHsl}) 100%)`,
    "--gradient-cover": `linear-gradient(135deg, hsl(${accentHsl}) 0%, hsl(${glowHsl}) 50%, hsl(${accentHsl.split(" ")[0]} 85% 60%) 100%)`,
    // Theme tokens scoped to preview
    "--card": isDark ? "224 40% 9%" : "0 0% 100%",
    "--card-foreground": isDark ? "220 25% 96%" : "224 47% 11%",
    "--foreground": isDark ? "220 25% 96%" : "224 47% 11%",
    "--muted-foreground": isDark ? "220 15% 65%" : "220 12% 46%",
    "--border": isDark ? "224 25% 16%" : "220 18% 90%",
    "--surface": isDark ? "224 40% 8%" : "220 30% 99%",
    "--surface-muted": isDark ? "224 35% 12%" : "220 25% 94%",
    "--shadow-glow": `0 8px 32px hsl(${accentHsl} / 0.30)`,
  };

  return (
    <div className="sticky top-6 w-full max-w-[340px] animate-fade-up">
      {/* Preview controls */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-card text-primary shadow-sm">
            <DeviceMobile size={14} weight="fill" />
          </span>
          <span className="text-[12.5px] font-semibold text-foreground">Live preview</span>
          <span className="ml-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
            {isDark ? "Dark" : "Light"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
            <ShareNetwork size={14} weight="bold" />
          </button>
          <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
            <DownloadSimple size={14} weight="bold" />
          </button>
        </div>
      </div>

      {/* Phone-frame card (themed via scoped css vars) */}
      <div
        style={previewStyle}
        className="relative overflow-hidden rounded-[28px] border border-border bg-card text-card-foreground shadow-card-xl"
      >
        {/* Cover */}
        {d.showCover && (
          <div className="relative h-44 w-full overflow-hidden">
            {card.coverPhoto ? (
              <img src={card.coverPhoto} alt="cover" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-card" />
          </div>
        )}

        {/* Avatar */}
        <div className={cn("px-6", d.showCover ? "-mt-14" : "pt-6")}>
          <div className="relative inline-block">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-card bg-card shadow-card-lg">
              {card.profilePicture ? (
                <img src={card.profilePicture} alt={card.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-primary text-primary-foreground">
                  <IdentificationCard size={28} weight="fill" />
                </div>
              )}
            </div>
            <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-card bg-success">
              <span className="sr-only">online</span>
            </span>
          </div>
        </div>

        {/* Name & title */}
        <div className="px-6 pt-3">
          <h2
            style={{ fontFamily }}
            className="text-[22px] font-bold leading-tight tracking-tight text-foreground"
          >
            {card.name}
          </h2>
          <p className="mt-1 text-[13.5px] font-medium text-primary">
            {card.jobTitle} @ {card.company}
          </p>
          <div className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] text-muted-foreground">
            <MapPin size={13} weight="fill" className="text-muted-foreground" />
            {card.location}
          </div>
        </div>

        {/* Company chip */}
        <div className={cn("mx-5 mt-4 flex items-center gap-3 border border-border bg-surface px-3 py-2.5", radiusClass)}>
          <div className={cn("grid h-9 w-9 place-items-center bg-gradient-primary text-primary-foreground", radiusClass === "rounded-full" ? "rounded-full" : "rounded-lg")}>
            <span style={{ fontFamily }} className="text-[13px] font-bold">{"{B}"}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-foreground">{card.company}</p>
            <p className="text-[11.5px] text-muted-foreground">Company</p>
          </div>
          <CaretRight size={14} className="text-muted-foreground" />
        </div>

        {/* Contact rows */}
        <div className="mt-3 space-y-2 px-5">
          <PreviewLink icon={EnvelopeSimple} label={card.email} radiusClass={radiusClass} useAccent />
          <PreviewLink icon={Phone} label={card.phone} radiusClass={radiusClass} useSuccess />
          {card.links.map((link) => {
            const platform = PLATFORMS[link.platform] || PLATFORMS.website;
            const Icon = iconMap[platform.icon] || Globe;
            if (!link.handle) return null;
            return (
              <PreviewLink
                key={link.id}
                icon={Icon}
                label={getLinkLabel(link.platform, link.handle)}
                gradient={platform.gradient}
                radiusClass={radiusClass}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="px-5 pb-5 pt-4">
          <button
            className={cn(
              "group flex w-full items-center justify-center gap-2 bg-gradient-primary px-4 py-3 text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]",
              radiusClass === "rounded-md" ? "rounded-md" : "rounded-full"
            )}
          >
            <IdentificationCard size={16} weight="fill" />
            Save Contact
          </button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Powered by <span className="font-semibold text-foreground">BitCard</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const PreviewLink = ({ icon: Icon, label, gradient, useAccent, useSuccess, radiusClass = "rounded-xl" }) => (
  <button
    className={cn(
      "group flex w-full items-center gap-3 border border-border bg-card px-3 py-2.5 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-sm",
      radiusClass
    )}
  >
    <span
      className={cn(
        "grid h-8 w-8 place-items-center text-primary-foreground",
        radiusClass === "rounded-full" ? "rounded-full" : "rounded-lg",
        gradient && `bg-gradient-to-br ${gradient}`,
        !gradient && useAccent && "bg-accent",
        !gradient && useSuccess && "bg-success-soft"
      )}
    >
      <Icon
        size={15}
        weight="fill"
        className={cn(
          gradient && "text-card",
          !gradient && useAccent && "text-primary",
          !gradient && useSuccess && "text-success"
        )}
      />
    </span>
    <span className="flex-1 truncate text-[12.5px] font-medium text-foreground">{label}</span>
    <CaretRight size={14} className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
  </button>
);
