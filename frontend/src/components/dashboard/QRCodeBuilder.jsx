import React, { useRef, useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import {
  CheckCircle,
  DotsThree,
  QrCode,
  DownloadSimple,
  Copy,
  ShareNetwork,
  WifiHigh,
  Eye,
  Image as ImageIcon,
  PaintBucket,
  ArrowSquareOut,
  ChartLine,
  Sparkle,
  Check,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCard, ACCENT_PRESETS } from "@/contexts/CardContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const QR_PRESETS = {
  brand:    { label: "Brand",    fg: null,      bg: "#ffffff" }, // null = use accent
  classic:  { label: "Classic",  fg: "#0f172a", bg: "#ffffff" },
  inverted: { label: "Inverted", fg: "#ffffff", bg: "#0f172a" },
  ocean:    { label: "Ocean",    fg: "#0ea5e9", bg: "#ecfeff" },
  forest:   { label: "Forest",   fg: "#10b981", bg: "#ecfdf5" },
  sunset:   { label: "Sunset",   fg: "#f43f5e", bg: "#fff1f2" },
};

export const QRCodeBuilder = () => {
  const { card } = useCard();
  const canvasRef = useRef(null);
  const [preset, setPreset] = useState("brand");
  const [errorLevel, setErrorLevel] = useState("M");
  const [withLogo, setWithLogo] = useState(true);
  const [trackScans, setTrackScans] = useState(true);

  const baseUrl = `https://bitcard.app/${card.handle}`;
  const qrUrl = `${baseUrl}?source=qr`;
  const nfcUrl = `${baseUrl}?source=nfc`;

  const accentHex = card.design.accentHex;
  const presetCfg = QR_PRESETS[preset];
  const fg = preset === "brand" ? accentHex : presetCfg.fg;
  const bg = presetCfg.bg;

  const onDownload = (format = "png") => {
    if (format === "png") {
      const canvas = canvasRef.current?.querySelector("canvas");
      if (!canvas) return;
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${card.handle}-qrcode.png`;
      a.click();
      toast.success("QR code downloaded", { description: `${card.handle}-qrcode.png` });
    } else if (format === "svg") {
      toast.success("SVG downloaded", { description: "(demo) SVG export not wired yet" });
    } else {
      toast.success(`${format.toUpperCase()} downloaded`, { description: "(demo) export not wired yet" });
    }
  };

  const onCopyLink = (url, label) => {
    navigator.clipboard?.writeText(url);
    toast.success(`${label} copied`, { description: url });
  };

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${card.name} on BitCard`, url: baseUrl });
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard?.writeText(baseUrl);
      toast.success("Card link copied", { description: baseUrl });
    }
  };

  const onUpdate = () => {
    toast.success("QR settings updated", {
      description: `Preset: ${QR_PRESETS[preset].label}, Error correction: ${errorLevel}`,
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-up">
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-[22px] font-semibold tracking-tight text-foreground">
                QR Code
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
              Share your card with a scannable code or NFC tap
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onShare}
              className="hidden h-9 items-center gap-1.5 rounded-lg bg-gradient-primary px-3 text-[12.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02] sm:inline-flex"
            >
              <ShareNetwork size={14} weight="bold" />
              Share your card
            </button>
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
              <DotsThree size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-8 px-6 py-6">
          {/* QR Display */}
          <section>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/40 via-card to-surface-muted/60 px-6 py-8">
              {/* decorative blobs */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-primary opacity-20 blur-3xl" />
              <div className="pointer-events-none absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-primary/20 opacity-30 blur-3xl" />

              <div className="relative">
                <div className="mb-1 flex items-center justify-center gap-1.5 text-center">
                  <Eye size={14} weight="duotone" className="text-muted-foreground" />
                  <p className="text-[12.5px] font-medium text-muted-foreground">
                    Scan to open profile
                  </p>
                </div>

                {/* QR */}
                <div className="mx-auto mt-4 w-fit" ref={canvasRef}>
                  <div
                    className="relative grid place-items-center rounded-2xl p-5 shadow-card-lg ring-1 ring-border"
                    style={{ background: bg }}
                  >
                    <QRCodeCanvas
                      value={qrUrl}
                      size={220}
                      bgColor={bg}
                      fgColor={fg}
                      level={errorLevel}
                      includeMargin={false}
                      imageSettings={
                        withLogo
                          ? {
                              src: "data:image/svg+xml;utf8," +
                                encodeURIComponent(
                                  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
                                    <defs>
                                      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
                                        <stop offset='0%' stop-color='${accentHex}'/>
                                        <stop offset='100%' stop-color='${accentHex}'/>
                                      </linearGradient>
                                    </defs>
                                    <rect width='64' height='64' rx='14' fill='url(#g)'/>
                                    <text x='32' y='42' text-anchor='middle' font-family='Inter,sans-serif' font-size='28' font-weight='800' fill='white'>B</text>
                                  </svg>`
                                ),
                              height: 44,
                              width: 44,
                              excavate: true,
                            }
                          : undefined
                      }
                    />
                    {/* Hidden SVG for download */}
                    <div className="hidden">
                      <QRCodeSVG value={qrUrl} size={220} bgColor={bg} fgColor={fg} level={errorLevel} />
                    </div>
                  </div>
                </div>

                <p className="mt-4 break-all text-center font-mono text-[12px] text-muted-foreground">
                  {qrUrl}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <Button
                    onClick={() => onDownload("png")}
                    className="h-10 rounded-lg bg-gradient-primary px-4 text-[13px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02]"
                  >
                    <DownloadSimple size={15} weight="bold" className="mr-1.5" />
                    Download PNG
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onDownload("svg")}
                    className="h-10 rounded-lg border border-border bg-card px-4 text-[13px] font-medium text-foreground hover:bg-secondary"
                  >
                    SVG
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onDownload("pdf")}
                    className="h-10 rounded-lg border border-border bg-card px-4 text-[13px] font-medium text-foreground hover:bg-secondary"
                  >
                    PDF
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onCopyLink(qrUrl, "QR link")}
                    className="h-10 rounded-lg border border-border bg-card px-4 text-[13px] font-medium text-foreground hover:bg-secondary"
                  >
                    <Copy size={14} weight="bold" className="mr-1.5" />
                    Copy link
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Customize */}
          <section>
            <div className="mb-4 flex items-start gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <PaintBucket size={18} weight="duotone" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">Style your QR</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Pick a preset or use your brand accent color
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
              {Object.entries(QR_PRESETS).map(([key, cfg]) => {
                const active = preset === key;
                const previewFg = key === "brand" ? accentHex : cfg.fg;
                return (
                  <button
                    key={key}
                    onClick={() => setPreset(key)}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all duration-300",
                      active
                        ? "border-primary bg-accent shadow-glow"
                        : "border-border bg-surface hover:border-primary/40 hover:bg-card"
                    )}
                  >
                    {active && (
                      <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
                        <Check size={11} weight="bold" />
                      </span>
                    )}
                    <div
                      className="grid h-10 w-10 grid-cols-3 grid-rows-3 gap-[2px] rounded-md p-1"
                      style={{ background: cfg.bg }}
                    >
                      {[0, 1, 0, 1, 1, 0, 0, 1, 1].map((v, i) => (
                        <span
                          key={i}
                          className="rounded-[1px]"
                          style={{ background: v ? previewFg : "transparent" }}
                        />
                      ))}
                    </div>
                    <span
                      className={cn(
                        "text-[11.5px] font-semibold",
                        active ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {cfg.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-card text-primary">
                    <ImageIcon size={15} weight="duotone" />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-foreground">Embed logo</p>
                    <p className="text-[11px] text-muted-foreground">Center logo overlay</p>
                  </div>
                </div>
                <Switch checked={withLogo} onCheckedChange={setWithLogo} />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-card text-primary">
                    <Sparkle size={15} weight="duotone" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-foreground">Error correction</p>
                    <p className="text-[11px] text-muted-foreground">Higher = more resilient</p>
                  </div>
                </div>
                <Select value={errorLevel} onValueChange={setErrorLevel}>
                  <SelectTrigger className="ml-2 h-8 w-[80px] rounded-md border border-border bg-card text-[12px] font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">L · 7%</SelectItem>
                    <SelectItem value="M">M · 15%</SelectItem>
                    <SelectItem value="Q">Q · 25%</SelectItem>
                    <SelectItem value="H">H · 30%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-border" />

          {/* NFC */}
          <section>
            <div className="mb-4 flex items-start gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-accent text-primary">
                <WifiHigh size={18} weight="duotone" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13.5px] font-semibold text-foreground">NFC link</p>
                  <Badge
                    variant="secondary"
                    className="h-5 rounded-full border-0 bg-gradient-primary px-2 text-[10px] font-semibold text-primary-foreground"
                  >
                    Pro
                  </Badge>
                </div>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Use when writing to a physical NFC card to track taps separately
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface p-3">
              <div className="flex items-stretch gap-2">
                <div className="flex flex-1 items-center overflow-hidden rounded-lg border border-border bg-card px-3">
                  <ArrowSquareOut size={14} className="mr-2 text-muted-foreground" />
                  <span className="truncate font-mono text-[12.5px] text-foreground">{nfcUrl}</span>
                </div>
                <Button
                  onClick={() => onCopyLink(nfcUrl, "NFC link")}
                  variant="ghost"
                  className="h-auto rounded-lg border border-border bg-card px-3 text-[12.5px] font-medium text-foreground hover:bg-secondary"
                >
                  <Copy size={14} weight="bold" className="mr-1.5" />
                  Copy
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-card text-primary">
                    <ChartLine size={13} weight="duotone" />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-foreground">Track scans separately</p>
                    <p className="text-[10.5px] text-muted-foreground">
                      See QR vs NFC analytics in the dashboard
                    </p>
                  </div>
                </div>
                <Switch checked={trackScans} onCheckedChange={setTrackScans} />
              </div>
            </div>
          </section>

          {/* Stats teaser */}
          <section className="grid grid-cols-3 gap-2.5">
            <StatTile label="Total scans" value="248" trend="+12%" />
            <StatTile label="This week" value="36" trend="+4%" />
            <StatTile label="Unique" value="194" trend="+8%" muted />
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2.5 border-t border-border bg-surface px-6 py-4">
          <div className="hidden items-center gap-2 text-[12px] text-muted-foreground sm:flex">
            <QrCode size={14} weight="duotone" className="text-primary" />
            Tip: print at 2.5cm or larger for reliable scans
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

const StatTile = ({ label, value, trend, muted }) => (
  <div className="rounded-xl border border-border bg-surface px-3 py-3">
    <p className="text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">
      {label}
    </p>
    <div className="mt-1 flex items-end justify-between gap-1">
      <p className="font-display text-[20px] font-bold leading-none text-foreground">{value}</p>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
          muted
            ? "bg-secondary text-muted-foreground"
            : "bg-success-soft text-success"
        )}
      >
        {trend}
      </span>
    </div>
  </div>
);
