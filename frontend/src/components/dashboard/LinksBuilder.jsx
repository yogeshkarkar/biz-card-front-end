import React, { useState } from "react";
import {
  CheckCircle,
  Plus,
  Trash,
  DotsThree,
  LinkSimple,
  DotsSixVertical,
  LinkedinLogo,
  GithubLogo,
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
  XLogo,
  YoutubeLogo,
  DribbbleLogo,
  Globe,
  CaretDown,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCard, PLATFORMS, getLinkLabel } from "@/contexts/CardContext";
import { toast } from "sonner";
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

const LinkRow = ({ link, onChange, onRemove }) => {
  const platform = PLATFORMS[link.platform] || PLATFORMS.website;
  const Icon = iconMap[platform.icon] || Globe;
  const filled = link.handle && link.handle.length > 0;

  return (
    <div className="group relative rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-card">
      {/* Drag handle (decorative) */}
      <button
        className="absolute -left-2 top-1/2 hidden h-8 w-5 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 md:flex"
        aria-label="Reorder"
        tabIndex={-1}
      >
        <DotsSixVertical size={16} weight="bold" />
      </button>

      <div className="grid gap-3 md:grid-cols-[200px_1fr_auto] md:items-end">
        {/* Platform select */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
            Platform
          </label>
          <Select
            value={link.platform}
            onValueChange={(v) => onChange({ platform: v })}
          >
            <SelectTrigger className="h-10 w-full rounded-lg border border-border bg-surface px-3 text-[13.5px] font-medium text-foreground transition-colors hover:bg-card focus:ring-2 focus:ring-primary/20 [&>svg]:hidden">
              <div className="flex w-full items-center gap-2.5">
                <span
                  className={cn(
                    "grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br text-card",
                    platform.gradient
                  )}
                >
                  <Icon size={12} weight="fill" />
                </span>
                <span className="flex-1 truncate text-left">{platform.label}</span>
                <CaretDown size={12} weight="bold" className="text-muted-foreground" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PLATFORMS).map(([key, p]) => {
                const PIcon = iconMap[p.icon] || Globe;
                return (
                  <SelectItem key={key} value={key} className="text-[13px]">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid h-5 w-5 place-items-center rounded bg-gradient-to-br text-card",
                          p.gradient
                        )}
                      >
                        <PIcon size={10} weight="fill" />
                      </span>
                      {p.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* URL input */}
        <div className="min-w-0">
          <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">
            URL or handle
          </label>
          <div className="flex items-stretch overflow-hidden rounded-lg border border-border bg-surface transition-colors focus-within:border-primary/50 focus-within:bg-card">
            <div className="hidden items-center bg-surface-muted px-3 text-[12.5px] text-muted-foreground sm:flex">
              {platform.urlPrefix}
            </div>
            <Input
              value={link.handle}
              onChange={(e) => onChange({ handle: e.target.value })}
              placeholder="your-handle"
              className="h-10 min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 text-[13.5px] font-medium text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={onRemove}
          aria-label="Remove link"
          className="grid h-10 w-10 place-items-center self-end justify-self-end rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash size={15} />
        </button>
      </div>

      {/* Preview footer */}
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-3">
        <div className="flex min-w-0 items-center gap-2 text-[12px]">
          <span
            className={cn(
              "grid h-5 w-5 flex-shrink-0 place-items-center rounded bg-gradient-to-br text-card",
              platform.gradient
            )}
          >
            <Icon size={10} weight="fill" />
          </span>
          <span className="truncate text-muted-foreground">
            {filled ? getLinkLabel(link.platform, link.handle) : "Preview will appear here"}
          </span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold",
            filled
              ? "bg-success-soft text-success"
              : "bg-secondary text-muted-foreground"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              filled ? "bg-success animate-pulse-dot" : "bg-muted-foreground/60"
            )}
          />
          {filled ? "Ready" : "Empty"}
        </span>
      </div>
    </div>
  );
};

export const LinksBuilder = () => {
  const { card, addLink, updateLink, removeLink } = useCard();
  const [pendingPlatform, setPendingPlatform] = useState("website");

  const linkCount = card.links.length;
  const readyCount = card.links.filter((l) => l.handle && l.handle.length > 0).length;

  const onAdd = () => {
    addLink(pendingPlatform);
    toast.success(`${PLATFORMS[pendingPlatform]?.label || "Link"} added`);
  };

  const onUpdate = () => {
    toast.success("Links updated", {
      description: `${readyCount} of ${linkCount} links are live on your card.`,
    });
  };

  const onCancel = () => toast("Changes discarded");

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-up">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[22px] font-semibold tracking-tight text-foreground">
                Social Links
              </h1>
              <Badge
                variant="secondary"
                className="h-6 rounded-full border-0 bg-accent px-2.5 text-[11px] font-semibold text-accent-foreground"
              >
                <LinkSimple size={11} weight="bold" className="mr-1" />
                {readyCount} / {linkCount} ready
              </Badge>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Add and organize the social profiles shown on your card
            </p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <DotsThree size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-6">
          {card.links.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary">
                <LinkSimple size={20} weight="duotone" />
              </div>
              <p className="font-display text-[15px] font-semibold text-foreground">
                No links yet
              </p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                Add your first social profile to see it appear on your card.
              </p>
            </div>
          )}

          {card.links.map((link) => (
            <LinkRow
              key={link.id}
              link={link}
              onChange={(patch) => updateLink(link.id, patch)}
              onRemove={() => {
                removeLink(link.id);
                toast(`${PLATFORMS[link.platform]?.label || "Link"} removed`);
              }}
            />
          ))}

          {/* Add new link */}
          <div className="rounded-2xl border-2 border-dashed border-border bg-surface/40 p-3 transition-colors hover:border-primary/40 hover:bg-accent/30">
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              <Select value={pendingPlatform} onValueChange={setPendingPlatform}>
                <SelectTrigger className="h-11 w-full rounded-lg border border-border bg-card px-3 text-[13.5px] font-medium text-foreground sm:w-[200px] [&>svg]:hidden">
                  <div className="flex w-full items-center gap-2.5">
                    {(() => {
                      const p = PLATFORMS[pendingPlatform] || PLATFORMS.website;
                      const PIcon = iconMap[p.icon] || Globe;
                      return (
                        <>
                          <span
                            className={cn(
                              "grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br text-card",
                              p.gradient
                            )}
                          >
                            <PIcon size={12} weight="fill" />
                          </span>
                          <span className="flex-1 truncate text-left">{p.label}</span>
                          <CaretDown size={12} weight="bold" className="text-muted-foreground" />
                        </>
                      );
                    })()}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PLATFORMS).map(([key, p]) => {
                    const PIcon = iconMap[p.icon] || Globe;
                    return (
                      <SelectItem key={key} value={key} className="text-[13px]">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "grid h-5 w-5 place-items-center rounded bg-gradient-to-br text-card",
                              p.gradient
                            )}
                          >
                            <PIcon size={10} weight="fill" />
                          </span>
                          {p.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Button
                onClick={onAdd}
                className="h-11 flex-1 rounded-lg bg-gradient-primary text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.01] hover:opacity-95"
              >
                <Plus size={16} weight="bold" className="mr-1.5" />
                Add social link
              </Button>
            </div>
            <p className="mt-2 px-1 text-center text-[11.5px] text-muted-foreground sm:text-left">
              Choose a platform, then paste your handle. Drag rows to reorder (coming soon).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2.5 border-t border-border bg-surface px-6 py-4">
          <div className="hidden items-center gap-2 text-[12px] text-muted-foreground sm:flex">
            <CheckCircle size={14} weight="fill" className="text-success" />
            Changes auto-sync to live preview
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <Button
              variant="ghost"
              onClick={onCancel}
              className="h-10 rounded-lg border border-border bg-card px-4 text-[13.5px] font-medium text-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={onUpdate}
              className="h-10 rounded-lg bg-gradient-primary px-5 text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02] hover:opacity-95"
            >
              <CheckCircle size={16} weight="fill" className="mr-1.5" />
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
