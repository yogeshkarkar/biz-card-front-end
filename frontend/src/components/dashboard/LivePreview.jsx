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
  CaretRight,
  IdentificationCard,
  Globe,
  DeviceMobile,
  ShareNetwork,
  DownloadSimple,
} from "@phosphor-icons/react";
import { useCard } from "@/contexts/CardContext";
import { cn } from "@/lib/utils";

const iconMap = {
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
};

const brandColors = {
  linkedin: "from-[#0a66c2] to-[#0a66c2]",
  github: "from-foreground to-foreground",
  instagram: "from-[#f58529] via-[#dd2a7b] to-[#8134af]",
  tiktok: "from-foreground to-foreground",
  facebook: "from-[#1877f2] to-[#1877f2]",
};

export const LivePreview = () => {
  const { card } = useCard();

  return (
    <div className="sticky top-6 w-full max-w-[340px] animate-fade-up">
      {/* Preview controls */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-card text-primary shadow-sm">
            <DeviceMobile size={14} weight="fill" />
          </span>
          <span className="text-[12.5px] font-semibold text-foreground">Live preview</span>
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

      {/* Phone-frame card */}
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-card-xl">
        {/* Cover */}
        <div className="relative h-44 w-full overflow-hidden">
          {card.coverPhoto ? (
            <img src={card.coverPhoto} alt="cover" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-transparent to-card" />
        </div>

        {/* Avatar */}
        <div className="-mt-14 px-6">
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
          <h2 className="font-display text-[22px] font-bold leading-tight tracking-tight text-foreground">
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
        <div className="mx-5 mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <span className="font-display text-[13px] font-bold">{"{B}"}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-foreground">{card.company}</p>
            <p className="text-[11.5px] text-muted-foreground">Company</p>
          </div>
          <CaretRight size={14} className="text-muted-foreground" />
        </div>

        {/* Contact rows */}
        <div className="mt-3 space-y-2 px-5">
          <PreviewLink icon={EnvelopeSimple} label={card.email} colorClass="text-primary" bg="bg-accent" />
          <PreviewLink icon={Phone} label={card.phone} colorClass="text-success" bg="bg-success-soft" />
          {card.links.map((link) => {
            const Icon = iconMap[link.icon] || Globe;
            return (
              <PreviewLink
                key={link.id}
                icon={Icon}
                label={link.label}
                gradient={brandColors[link.id]}
              />
            );
          })}
        </div>

        {/* CTA */}
        <div className="px-5 pb-5 pt-4">
          <button className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-3 text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]">
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

const PreviewLink = ({ icon: Icon, label, colorClass, bg, gradient }) => (
  <button className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
    <span
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg text-primary-foreground",
        gradient ? `bg-gradient-to-br ${gradient}` : bg
      )}
    >
      <Icon size={15} weight="fill" className={gradient ? "text-card" : colorClass} />
    </span>
    <span className="flex-1 truncate text-[12.5px] font-medium text-foreground">{label}</span>
    <CaretRight size={14} className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
  </button>
);
