import React from "react";
import {
  CheckCircle,
  Sun,
  Moon,
  PaintBrushBroad,
  TextAa,
  Square,
  DotsThree,
  Image as ImageIcon,
  Eye,
  EyeSlash,
  Check,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  useCard,
  ACCENT_PRESETS,
  FONT_OPTIONS,
  LAYOUT_OPTIONS,
} from "@/contexts/CardContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Section = ({ icon: Icon, title, description, children }) => (
  <section>
    <div className="mb-4 flex items-start gap-3">
      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-accent text-primary">
        <Icon size={18} weight="duotone" />
      </span>
      <div>
        <p className="text-[13.5px] font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-[12px] text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </section>
);

const ThemeCard = ({ active, onClick, label, icon: Icon, preview }) => (
  <button
    onClick={onClick}
    className={cn(
      "group relative overflow-hidden rounded-2xl border-2 p-3 text-left transition-all duration-300",
      active
        ? "border-primary bg-accent shadow-glow"
        : "border-border bg-surface hover:border-primary/40 hover:bg-card"
    )}
  >
    {/* Mini preview */}
    <div
      className={cn(
        "relative mb-3 h-24 w-full overflow-hidden rounded-lg",
        preview
      )}
    >
      <div className="absolute left-3 top-3 h-2.5 w-12 rounded-full bg-card/80" />
      <div className="absolute left-3 top-7 h-1.5 w-20 rounded-full bg-card/50" />
      <div className="absolute left-3 bottom-3 h-5 w-16 rounded-md bg-gradient-primary" />
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon
          size={16}
          weight={active ? "fill" : "regular"}
          className={active ? "text-primary" : "text-muted-foreground"}
        />
        <span
          className={cn(
            "text-[13.5px] font-semibold",
            active ? "text-foreground" : "text-foreground/80"
          )}
        >
          {label}
        </span>
      </div>
      {active && (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
          <Check size={11} weight="bold" />
        </span>
      )}
    </div>
  </button>
);

const LayoutCard = ({ active, onClick, label, sample }) => (
  <button
    onClick={onClick}
    className={cn(
      "group flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-300",
      active
        ? "border-primary bg-accent shadow-glow"
        : "border-border bg-surface hover:border-primary/40 hover:bg-card"
    )}
  >
    <div className="flex h-12 w-full items-center justify-center">
      <span
        className={cn(
          "h-7 w-20 bg-gradient-primary",
          sample === "rounded" && "rounded-xl",
          sample === "pill" && "rounded-full",
          sample === "sharp" && "rounded-md"
        )}
      />
    </div>
    <span
      className={cn(
        "text-[12.5px] font-semibold",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
    </span>
  </button>
);

const FontCard = ({ active, onClick, label, family, sample }) => (
  <button
    onClick={onClick}
    className={cn(
      "group flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300",
      active
        ? "border-primary bg-accent shadow-glow"
        : "border-border bg-surface hover:border-primary/40 hover:bg-card"
    )}
  >
    <span
      style={{ fontFamily: family }}
      className={cn(
        "grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl text-[22px] font-bold",
        active
          ? "bg-gradient-primary text-primary-foreground"
          : "bg-card text-foreground"
      )}
    >
      {sample}
    </span>
    <div className="min-w-0 flex-1">
      <p
        className={cn(
          "text-[13.5px] font-semibold",
          active ? "text-foreground" : "text-foreground/80"
        )}
      >
        {label}
      </p>
      <p
        style={{ fontFamily: family }}
        className="truncate text-[11.5px] text-muted-foreground"
      >
        The quick brown fox
      </p>
    </div>
    {active && (
      <span className="grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
        <Check size={11} weight="bold" />
      </span>
    )}
  </button>
);

export const DesignBuilder = () => {
  const { card, updateDesign } = useCard();
  const d = card.design;

  const onUpdate = () => {
    toast.success("Design updated", {
      description: `Theme ${d.theme}, accent ${ACCENT_PRESETS[d.accent]?.label || d.accentHex}, ${LAYOUT_OPTIONS[d.layout]?.label} layout.`,
    });
  };

  const onReset = () => {
    updateDesign({
      theme: "light",
      accent: "indigo",
      accentHex: "#5b5bf5",
      layout: "rounded",
      font: "modern",
      showCover: true,
    });
    toast("Design reset to defaults");
  };

  const setAccent = (key) => {
    updateDesign({ accent: key, accentHex: ACCENT_PRESETS[key].hex });
  };

  const setCustomHex = (hex) => {
    updateDesign({ accent: "custom", accentHex: hex });
  };

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-up">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[22px] font-semibold tracking-tight text-foreground">
                Design Studio
              </h1>
              <Badge
                variant="secondary"
                className="h-6 rounded-full border-0 bg-accent px-2.5 text-[11px] font-semibold text-accent-foreground"
              >
                <PaintBrushBroad size={11} weight="bold" className="mr-1" />
                Editor
              </Badge>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Style how your public card looks to the world
            </p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <DotsThree size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 px-6 py-6">
          {/* Theme */}
          <Section
            icon={Sun}
            title="Theme"
            description="Choose how your public card appears in the live preview."
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ThemeCard
                active={d.theme === "light"}
                onClick={() => updateDesign({ theme: "light" })}
                label="Light"
                icon={Sun}
                preview="bg-gradient-to-br from-slate-50 to-slate-100"
              />
              <ThemeCard
                active={d.theme === "dark"}
                onClick={() => updateDesign({ theme: "dark" })}
                label="Dark"
                icon={Moon}
                preview="bg-gradient-to-br from-slate-800 to-slate-900"
              />
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Accent Color */}
          <Section
            icon={PaintBrushBroad}
            title="Accent Color"
            description="Sets the gradient and highlight color used across your card."
          >
            <div className="flex flex-wrap items-center gap-2.5">
              {Object.entries(ACCENT_PRESETS).map(([key, p]) => {
                const active = d.accent === key;
                return (
                  <button
                    key={key}
                    onClick={() => setAccent(key)}
                    className={cn(
                      "group relative grid h-11 w-11 place-items-center rounded-full transition-all duration-300",
                      active && "scale-110"
                    )}
                    style={{ backgroundColor: p.hex }}
                    aria-label={p.label}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full ring-2 ring-offset-2 ring-offset-card transition-all",
                        active ? "ring-foreground" : "ring-transparent group-hover:ring-border"
                      )}
                    />
                    {active && (
                      <Check size={16} weight="bold" className="text-white drop-shadow" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-stretch gap-2">
              <div className="relative">
                <input
                  type="color"
                  value={d.accentHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Custom color picker"
                />
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl border border-border shadow-sm"
                  style={{ backgroundColor: d.accentHex }}
                >
                  <span className="text-[10px] font-bold text-white mix-blend-difference">
                    HEX
                  </span>
                </div>
              </div>
              <div className="flex flex-1 items-stretch overflow-hidden rounded-xl border border-border bg-surface transition-colors focus-within:border-primary/50 focus-within:bg-card">
                <div className="flex items-center px-3 text-[12.5px] text-muted-foreground">
                  #
                </div>
                <Input
                  value={d.accentHex.replace("#", "")}
                  onChange={(e) => setCustomHex("#" + e.target.value.replace("#", ""))}
                  className="h-11 flex-1 border-0 bg-transparent p-0 font-mono text-[13.5px] uppercase text-foreground shadow-none focus-visible:ring-0"
                  maxLength={7}
                  placeholder="5b5bf5"
                />
                <button
                  onClick={() => navigator.clipboard?.writeText(d.accentHex)}
                  className="px-3 text-[11.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Copy
                </button>
              </div>
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Layout */}
          <Section
            icon={Square}
            title="Card Style"
            description="The shape used for link buttons and CTAs on your card."
          >
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(LAYOUT_OPTIONS).map(([key, opt]) => (
                <LayoutCard
                  key={key}
                  active={d.layout === key}
                  onClick={() => updateDesign({ layout: key })}
                  label={opt.label}
                  sample={key}
                />
              ))}
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Typography */}
          <Section
            icon={TextAa}
            title="Typography"
            description="Headline font used for your name and section titles."
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {Object.entries(FONT_OPTIONS).map(([key, f]) => (
                <FontCard
                  key={key}
                  active={d.font === key}
                  onClick={() => updateDesign({ font: key })}
                  label={f.label}
                  family={f.family}
                  sample={f.sample}
                />
              ))}
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Cover toggle */}
          <Section
            icon={ImageIcon}
            title="Display Options"
            description="Toggle visual elements on your card."
          >
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-card text-primary">
                  {d.showCover ? <Eye size={15} weight="duotone" /> : <EyeSlash size={15} weight="duotone" />}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Show cover photo</p>
                  <p className="text-[11.5px] text-muted-foreground">
                    Display a header image above your profile picture
                  </p>
                </div>
              </div>
              <Switch
                checked={d.showCover}
                onCheckedChange={(v) => updateDesign({ showCover: v })}
              />
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2.5 border-t border-border bg-surface px-6 py-4">
          <button
            onClick={onReset}
            className="hidden text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Reset to defaults
          </button>
          <div className="ml-auto flex items-center gap-2.5">
            <Button
              variant="ghost"
              onClick={() => toast("Changes discarded")}
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
