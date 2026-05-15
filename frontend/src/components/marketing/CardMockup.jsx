import React from "react";
import {
  MapPin,
  EnvelopeSimple,
  Phone,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  CaretRight,
  IdentificationCard,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

function hexToHsl(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
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
function lighten(hsl, d = 10) {
  const m = hsl.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!m) return hsl;
  return `${m[1]} ${m[2]}% ${Math.min(95, parseInt(m[3], 10) + d)}%`;
}

export const CardMockup = ({
  name = "Yogesh Karkar",
  title = "Owner",
  company = "Bitcode Infotech",
  location = "Navsari, Gujarat",
  email = "hi@bitcard.app",
  phone = "+91 90999 99775",
  avatar = "https://images.unsplash.com/photo-1752738372136-2602aaafdcb7?w=200&h=200&fit=crop&crop=faces",
  cover = "https://images.unsplash.com/photo-1456300633423-f52385ce7bfd?w=600&h=300&fit=crop",
  accent = "#5b5bf5",
  size = "md", // sm | md | lg
  theme = "light",
  className,
  links = [
    { id: "li", icon: LinkedinLogo, label: "linkedin.com/in/yogesh" },
    { id: "gh", icon: GithubLogo, label: "github.com/yogesh-k" },
    { id: "ig", icon: InstagramLogo, label: "instagram.com/yogesh" },
  ],
}) => {
  const accentHsl = hexToHsl(accent);
  const glowHsl = lighten(accentHsl, 10);
  const isDark = theme === "dark";
  const style = {
    "--primary": accentHsl,
    "--primary-glow": glowHsl,
    "--accent": isDark ? `${accentHsl.split(" ")[0]} 50% 18%` : `${accentHsl.split(" ")[0]} 80% 96%`,
    "--accent-foreground": isDark ? `${accentHsl.split(" ")[0]} 90% 85%` : accentHsl,
    "--gradient-primary": `linear-gradient(135deg, hsl(${accentHsl}) 0%, hsl(${glowHsl}) 100%)`,
    "--card": isDark ? "224 40% 9%" : "0 0% 100%",
    "--card-foreground": isDark ? "220 25% 96%" : "224 47% 11%",
    "--foreground": isDark ? "220 25% 96%" : "224 47% 11%",
    "--muted-foreground": isDark ? "220 15% 65%" : "220 12% 46%",
    "--border": isDark ? "224 25% 16%" : "220 18% 90%",
    "--surface": isDark ? "224 40% 8%" : "220 30% 99%",
    "--shadow-glow": `0 8px 32px hsl(${accentHsl} / 0.30)`,
  };

  const widths = { sm: "w-[260px]", md: "w-[320px]", lg: "w-[360px]" };
  const coverH = { sm: "h-32", md: "h-40", lg: "h-44" };
  const avatarSize = { sm: "h-20 w-20", md: "h-24 w-24", lg: "h-28 w-28" };

  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-border bg-card text-card-foreground shadow-card-xl",
        widths[size],
        className
      )}
    >
      {/* Cover */}
      <div className={cn("relative w-full overflow-hidden", coverH[size])}>
        {cover ? (
          <img src={cover} alt="cover" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-card" />
      </div>

      {/* Avatar */}
      <div className="-mt-12 px-5">
        <div className={cn("overflow-hidden rounded-full border-4 border-card bg-card shadow-card-lg", avatarSize[size])}>
          {avatar ? (
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-primary text-primary-foreground">
              <IdentificationCard size={24} weight="fill" />
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pt-2">
        <h3 className="font-display text-[18px] font-bold leading-tight tracking-tight text-foreground">{name}</h3>
        <p className="mt-0.5 text-[12px] font-medium text-primary">
          {title} @ {company}
        </p>
        <div className="mt-1 inline-flex items-center gap-1 text-[11.5px] text-muted-foreground">
          <MapPin size={11} weight="fill" />
          {location}
        </div>
      </div>

      <div className="mt-3 space-y-1.5 px-4 pb-4">
        <Row icon={EnvelopeSimple} label={email} useAccent />
        <Row icon={Phone} label={phone} useSuccess />
        {links.slice(0, size === "sm" ? 1 : 2).map((l) => (
          <Row key={l.id} icon={l.icon} label={l.label} />
        ))}
      </div>

      <div className="px-4 pb-4">
        <button className="flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-primary px-3 py-2.5 text-[12px] font-semibold text-primary-foreground shadow-glow">
          <IdentificationCard size={13} weight="fill" />
          Save Contact
        </button>
      </div>
    </div>
  );
};

const Row = ({ icon: Icon, label, useAccent, useSuccess }) => (
  <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-2">
    <span
      className={cn(
        "grid h-6 w-6 place-items-center rounded-md",
        useAccent ? "bg-accent text-primary" : useSuccess ? "bg-success-soft text-success" : "bg-secondary text-foreground/70"
      )}
    >
      <Icon size={12} weight="fill" />
    </span>
    <span className="flex-1 truncate text-[11px] font-medium text-foreground">{label}</span>
    <CaretRight size={10} className="text-muted-foreground" />
  </div>
);
