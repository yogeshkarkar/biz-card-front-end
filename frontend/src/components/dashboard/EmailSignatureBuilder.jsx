import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  CheckCircle,
  DotsThree,
  EnvelopeSimple,
  Copy,
  Code,
  TextT,
  ShareNetwork,
  ArrowSquareOut,
  Check,
  GoogleLogo,
  MicrosoftOutlookLogo,
  AppleLogo,
  CaretDown,
  Image as ImageIcon,
  QrCode,
  ChatCircleText,
  ShareFat,
  Phone,
  At,
  MapPin,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCard } from "@/contexts/CardContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const TEMPLATES = {
  classic: { label: "Classic", description: "Photo + details + QR" },
  modern:  { label: "Modern",  description: "Side accent bar layout" },
  minimal: { label: "Minimal", description: "Text-only with link" },
  bold:    { label: "Bold",    description: "Full-width banner with CTA" },
};

const TAGLINES = [
  "Sent from my digital business card",
  "Let's connect — scan to save my contact",
  "Building things, one pixel at a time",
];

export const EmailSignatureBuilder = () => {
  const { card } = useCard();
  const [template, setTemplate] = useState("classic");
  const [tagline, setTagline] = useState(TAGLINES[0]);
  const [elements, setElements] = useState({
    photo: true,
    qr: true,
    tagline: true,
    socials: false,
  });
  const previewRef = useRef(null);

  const accent = card.design.accentHex;
  const baseUrl = `https://bitcard.app/${card.handle}`;

  const toggleElement = (key) => setElements((e) => ({ ...e, [key]: !e[key] }));

  const onCopy = (kind) => {
    const node = previewRef.current;
    if (!node) return;
    if (kind === "html") {
      const html = node.outerHTML;
      navigator.clipboard?.writeText(html);
      toast.success("HTML signature copied", { description: "Paste into your email client's signature settings" });
    } else if (kind === "plain") {
      const lines = [
        card.name,
        `${card.jobTitle} · ${card.company}`,
        card.location,
        `${card.email} · ${card.phone}`,
        baseUrl,
      ];
      navigator.clipboard?.writeText(lines.join("\n"));
      toast.success("Plain text signature copied");
    } else {
      // rich (formatted) - try to copy as html via ClipboardItem
      try {
        const blobHtml = new Blob([node.outerHTML], { type: "text/html" });
        const blobText = new Blob([card.name + " — " + card.jobTitle], { type: "text/plain" });
        navigator.clipboard.write([
          new window.ClipboardItem({ "text/html": blobHtml, "text/plain": blobText }),
        ]);
        toast.success("Rich signature copied", { description: "Paste directly into Gmail or Outlook" });
      } catch {
        navigator.clipboard?.writeText(node.outerText);
        toast.success("Signature copied");
      }
    }
  };

  const onUpdate = () =>
    toast.success("Signature saved", {
      description: `${TEMPLATES[template].label} template applied.`,
    });

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-up">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[22px] font-semibold tracking-tight text-foreground">
                Email Signature
              </h1>
              <Badge
                variant="secondary"
                className="h-6 rounded-full border-0 bg-success-soft px-2.5 text-[11px] font-semibold text-success"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
                Ready
              </Badge>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Generate a beautiful HTML signature for every email you send
            </p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <DotsThree size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 px-6 py-6">
          {/* Templates */}
          <section>
            <div className="mb-4 flex items-start gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <EnvelopeSimple size={18} weight="duotone" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">Template</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Choose a signature layout
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(TEMPLATES).map(([key, t]) => {
                const active = template === key;
                return (
                  <button
                    key={key}
                    onClick={() => setTemplate(key)}
                    className={cn(
                      "group relative flex flex-col gap-2 rounded-xl border-2 p-3 text-left transition-all duration-300",
                      active
                        ? "border-primary bg-accent shadow-glow"
                        : "border-border bg-surface hover:border-primary/40 hover:bg-card"
                    )}
                  >
                    {active && (
                      <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                        <Check size={11} weight="bold" />
                      </span>
                    )}
                    {/* Mini diagram */}
                    <div className="h-14 w-full rounded-md bg-card p-2 shadow-sm">
                      <TemplateThumb kind={key} />
                    </div>
                    <div>
                      <p
                        className={cn(
                          "text-[12.5px] font-semibold",
                          active ? "text-foreground" : "text-foreground/80"
                        )}
                      >
                        {t.label}
                      </p>
                      <p className="text-[10.5px] leading-tight text-muted-foreground">
                        {t.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="h-px w-full bg-border" />

          {/* Element toggles */}
          <section>
            <div className="mb-4 flex items-start gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <ShareFat size={18} weight="duotone" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">Include in signature</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Toggle the parts you want visible
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <ToggleTile
                icon={ImageIcon}
                label="Profile photo"
                description="Shown on the left side"
                active={elements.photo}
                onChange={() => toggleElement("photo")}
              />
              <ToggleTile
                icon={QrCode}
                label="QR code"
                description="Scannable card link"
                active={elements.qr}
                onChange={() => toggleElement("qr")}
              />
              <ToggleTile
                icon={ChatCircleText}
                label="Tagline"
                description="Short message under name"
                active={elements.tagline}
                onChange={() => toggleElement("tagline")}
              />
              <ToggleTile
                icon={ShareNetwork}
                label="Social icons"
                description="Compact row of profile links"
                active={elements.socials}
                onChange={() => toggleElement("socials")}
              />
            </div>

            {elements.tagline && (
              <div className="mt-3 flex items-stretch gap-2 rounded-xl border border-border bg-surface p-1.5">
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="h-9 flex-1 rounded-md border-0 bg-transparent px-3 text-[13px] text-foreground shadow-none focus-visible:ring-0"
                  placeholder="Add a short tagline"
                />
                <Button
                  variant="ghost"
                  onClick={() => setTagline(TAGLINES[Math.floor(Math.random() * TAGLINES.length)])}
                  className="h-9 rounded-md border border-border bg-card px-3 text-[12px] font-medium text-foreground hover:bg-secondary"
                >
                  Surprise me
                </Button>
              </div>
            )}
          </section>

          <div className="h-px w-full bg-border" />

          {/* Preview */}
          <section>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-md bg-card text-primary shadow-sm">
                  <EnvelopeSimple size={14} weight="fill" />
                </span>
                <p className="text-[13px] font-semibold text-foreground">Email Signature Preview</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Button
                  onClick={() => onCopy("rich")}
                  className="h-9 rounded-lg bg-gradient-primary px-3 text-[12px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Copy size={13} weight="bold" className="mr-1.5" />
                  Copy Signature
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onCopy("html")}
                  className="h-9 rounded-lg border border-border bg-card px-3 text-[12px] font-medium text-foreground hover:bg-secondary"
                >
                  <Code size={13} weight="bold" className="mr-1.5" />
                  HTML
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onCopy("plain")}
                  className="h-9 rounded-lg border border-border bg-card px-3 text-[12px] font-medium text-foreground hover:bg-secondary"
                >
                  <TextT size={13} weight="bold" className="mr-1.5" />
                  Plain
                </Button>
              </div>
            </div>

            {/* Mock email window */}
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
              <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-muted-foreground">New message · Draft</span>
                <span className="text-[11px] font-mono text-muted-foreground">{card.email}</span>
              </div>

              <div className="bg-card px-5 py-5">
                <div className="mb-4 text-[13px] text-muted-foreground">
                  Hi there,<br />
                  <br />
                  Great connecting with you today! Looking forward to next steps.
                  <br />
                  <br />
                  Best,
                </div>

                {/* Signature itself */}
                <SignaturePreview
                  ref={previewRef}
                  template={template}
                  elements={elements}
                  tagline={tagline}
                  accent={accent}
                  card={card}
                  baseUrl={baseUrl}
                />
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-border" />

          {/* Install instructions */}
          <section>
            <div className="mb-3 flex items-start gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <ArrowSquareOut size={18} weight="duotone" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">Install in your email</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Follow the steps for your provider
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              <InstallStep
                value="gmail"
                icon={GoogleLogo}
                label="Gmail"
                steps={[
                  "Open Gmail → Settings (⚙) → See all settings",
                  "Scroll to “Signature” and click “Create new”",
                  "Paste the copied signature into the editor",
                  "Save changes at the bottom of the page",
                ]}
              />
              <InstallStep
                value="outlook"
                icon={MicrosoftOutlookLogo}
                label="Outlook"
                steps={[
                  "Open Outlook → File → Options → Mail",
                  "Click “Signatures” and create a new entry",
                  "Paste your BitCard signature",
                  "Set as default for new messages",
                ]}
              />
              <InstallStep
                value="apple"
                icon={AppleLogo}
                label="Apple Mail"
                steps={[
                  "Open Mail → Settings → Signatures",
                  "Choose an account and click +",
                  "Paste the rich signature",
                  "Uncheck “Always match my default font”",
                ]}
              />
            </Accordion>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2.5 border-t border-border bg-surface px-6 py-4">
          <div className="hidden items-center gap-2 text-[12px] text-muted-foreground sm:flex">
            <CheckCircle size={14} weight="fill" className="text-success" />
            Auto-syncs with your card every save
          </div>
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

/* ---------------- Sub components ---------------- */

const ToggleTile = ({ icon: Icon, label, description, active, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={cn(
      "flex items-center justify-between gap-3 rounded-xl border bg-surface px-3.5 py-3 text-left transition-colors",
      active
        ? "border-primary/30 bg-accent/40"
        : "border-border hover:border-primary/20 hover:bg-card"
    )}
  >
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-lg transition-colors",
          active ? "bg-gradient-primary text-primary-foreground" : "bg-card text-muted-foreground"
        )}
      >
        <Icon size={15} weight={active ? "fill" : "duotone"} />
      </span>
      <div>
        <p className="text-[12.5px] font-semibold text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
    </div>
    <Switch checked={active} onCheckedChange={onChange} />
  </button>
);

const InstallStep = ({ value, icon: Icon, label, steps }) => (
  <AccordionItem
    value={value}
    className="overflow-hidden rounded-xl border border-border bg-surface data-[state=open]:bg-card"
  >
    <AccordionTrigger className="px-4 py-3 hover:no-underline [&>svg]:hidden">
      <div className="flex w-full items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-card text-foreground">
          <Icon size={16} weight="fill" />
        </span>
        <span className="flex-1 text-left text-[13px] font-semibold text-foreground">{label}</span>
        <CaretDown size={14} className="text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </div>
    </AccordionTrigger>
    <AccordionContent className="px-4 pb-4">
      <ol className="ml-2 list-none space-y-1.5">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-muted-foreground">
            <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-accent text-[10px] font-bold text-primary">
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </AccordionContent>
  </AccordionItem>
);

const TemplateThumb = ({ kind }) => {
  if (kind === "modern") {
    return (
      <div className="flex h-full items-center gap-1.5">
        <div className="h-full w-1 rounded-sm bg-gradient-primary" />
        <div className="flex-1 space-y-1">
          <span className="block h-1.5 w-2/3 rounded-full bg-foreground/70" />
          <span className="block h-1 w-full rounded-full bg-foreground/30" />
          <span className="block h-1 w-3/4 rounded-full bg-foreground/30" />
        </div>
      </div>
    );
  }
  if (kind === "minimal") {
    return (
      <div className="flex h-full flex-col justify-center gap-1">
        <span className="block h-1.5 w-1/2 rounded-full bg-foreground/70" />
        <span className="block h-1 w-2/3 rounded-full bg-foreground/30" />
        <span className="block h-1 w-1/3 rounded-full bg-primary" />
      </div>
    );
  }
  if (kind === "bold") {
    return (
      <div className="flex h-full flex-col gap-1">
        <span className="block h-2 w-full rounded-sm bg-gradient-primary" />
        <span className="block h-1 w-2/3 rounded-full bg-foreground/40" />
        <span className="block h-1 w-1/2 rounded-full bg-foreground/30" />
      </div>
    );
  }
  // classic
  return (
    <div className="flex h-full items-center gap-1.5">
      <span className="h-7 w-7 flex-shrink-0 rounded-full bg-foreground/20" />
      <div className="flex-1 space-y-1">
        <span className="block h-1.5 w-2/3 rounded-full bg-foreground/70" />
        <span className="block h-1 w-full rounded-full bg-foreground/30" />
        <span className="block h-1 w-3/4 rounded-full bg-foreground/30" />
      </div>
      <span className="h-7 w-7 flex-shrink-0 rounded-sm bg-foreground/20" />
    </div>
  );
};

const SignaturePreview = React.forwardRef(function SigPreview(
  { template, elements, tagline, accent, card, baseUrl },
  ref
) {
  const url = `${baseUrl}?source=email`;
  const accentStyle = { color: accent };
  const accentBg = { backgroundColor: accent };

  if (template === "minimal") {
    return (
      <div ref={ref} className="text-[13px] leading-relaxed text-foreground" style={{ fontFamily: "Arial, sans-serif" }}>
        <p className="font-semibold">{card.name}</p>
        <p className="text-muted-foreground">{card.jobTitle} · {card.company}</p>
        {elements.tagline && <p className="mt-1 italic text-muted-foreground">"{tagline}"</p>}
        <p className="mt-2">
          <a href={url} style={accentStyle} className="font-semibold underline-offset-2 hover:underline">
            View my digital card →
          </a>
        </p>
      </div>
    );
  }

  if (template === "modern") {
    return (
      <div ref={ref} className="flex items-stretch gap-4" style={{ fontFamily: "Arial, sans-serif" }}>
        <span className="w-1 flex-shrink-0 rounded-full" style={accentBg} />
        <div className="flex-1 text-[13px] leading-relaxed">
          <p className="text-[15px] font-bold text-foreground">{card.name}</p>
          <p style={accentStyle} className="font-semibold">{card.jobTitle}, {card.company}</p>
          {elements.tagline && (
            <p className="mt-1 text-[11.5px] italic text-muted-foreground">"{tagline}"</p>
          )}
          <div className="mt-2 grid grid-cols-1 gap-0.5 text-[11.5px] text-muted-foreground sm:grid-cols-2">
            <Row icon={EnvelopeSimple} value={card.email} />
            <Row icon={Phone} value={card.phone} />
            <Row icon={MapPin} value={card.location} />
            <Row icon={At} value={`bitcard.app/${card.handle}`} />
          </div>
        </div>
        {elements.qr && (
          <div className="hidden flex-shrink-0 rounded-md border border-border bg-card p-1.5 sm:block">
            <QRCodeCanvas value={url} size={64} bgColor="#ffffff" fgColor={accent} level="M" />
          </div>
        )}
      </div>
    );
  }

  if (template === "bold") {
    return (
      <div ref={ref} className="overflow-hidden rounded-md border border-border" style={{ fontFamily: "Arial, sans-serif" }}>
        <div className="px-4 py-3 text-white" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}>
          <p className="text-[16px] font-bold leading-tight">{card.name}</p>
          <p className="text-[12px] opacity-90">{card.jobTitle} at {card.company}</p>
        </div>
        <div className="flex items-center justify-between gap-4 bg-card px-4 py-3 text-[12px] text-muted-foreground">
          <div className="space-y-0.5">
            <Row icon={EnvelopeSimple} value={card.email} />
            <Row icon={Phone} value={card.phone} />
            {elements.tagline && (
              <p className="pt-1 italic text-foreground/70">"{tagline}"</p>
            )}
            <a href={url} className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold hover:underline" style={accentStyle}>
              View my BitCard <ArrowSquareOut size={11} weight="bold" />
            </a>
          </div>
          {elements.qr && (
            <div className="flex-shrink-0 rounded-md border border-border bg-card p-1.5">
              <QRCodeCanvas value={url} size={64} bgColor="#ffffff" fgColor={accent} level="M" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // CLASSIC (default, matches the screenshot)
  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 sm:flex-row sm:items-center"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {elements.photo && (
        <div className="relative flex-shrink-0">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-border bg-card sm:h-24 sm:w-24">
            <img src={card.profilePicture} alt={card.name} className="h-full w-full object-cover" />
          </div>
          <div
            className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-lg text-[9px] font-bold text-white shadow-md"
            style={accentBg}
          >
            {"{B}"}
          </div>
        </div>
      )}
      <div className="min-w-0 flex-1 text-[13px] leading-relaxed text-foreground">
        <p className="font-display text-[17px] font-bold leading-tight">{card.name}</p>
        <p className="text-[12.5px] text-muted-foreground">{card.jobTitle}</p>
        <p className="text-[12.5px] font-semibold text-foreground">{card.company}</p>
        {elements.tagline && (
          <p className="mt-1 text-[11.5px] italic text-muted-foreground">"{tagline}"</p>
        )}
        <p className="mt-2 text-[12px] text-muted-foreground">{card.location}</p>
        <a
          href={url}
          style={accentStyle}
          className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold hover:underline"
        >
          My Digital Card <ArrowSquareOut size={11} weight="bold" />
        </a>
      </div>
      {elements.qr && (
        <div className="flex-shrink-0 rounded-md border border-border bg-card p-2">
          <QRCodeCanvas value={url} size={84} bgColor="#ffffff" fgColor={accent} level="M" />
        </div>
      )}
    </div>
  );
});

const Row = ({ icon: Icon, value }) => (
  <span className="inline-flex items-center gap-1 truncate">
    <Icon size={11} weight="fill" className="flex-shrink-0" />
    <span className="truncate">{value}</span>
  </span>
);
