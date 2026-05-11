import React, { useState } from "react";
import {
  CheckCircle,
  DotsThree,
  EnvelopeSimple,
  Lock,
  Eye,
  EyeSlash,
  ShieldCheck,
  Bell,
  GlobeHemisphereWest,
  ClockCounterClockwise,
  Trash,
  DownloadSimple,
  Warning,
  Check,
  Monitor,
  DeviceMobile,
  Sparkle,
  Key,
  Question,
  CaretRight,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCard } from "@/contexts/CardContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Section = ({ icon: Icon, title, description, action, children }) => (
  <section>
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-accent text-primary">
          <Icon size={18} weight="duotone" />
        </span>
        <div>
          <p className="text-[13.5px] font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-[12px] text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
    {children}
  </section>
);

export const SettingsBuilder = () => {
  const { card, updateField } = useCard();
  const [pw, setPw] = useState({ new: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [prefs, setPrefs] = useState({
    digest: true,
    scans: true,
    product: false,
    discoverable: true,
    indexable: false,
  });
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const togglePref = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  const onUpdatePassword = () => {
    if (!pw.new || pw.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (pw.new !== pw.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setPw({ new: "", confirm: "" });
    toast.success("Password updated", { description: "Your account is now more secure." });
  };

  const onExport = () => {
    const blob = new Blob([JSON.stringify(card, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${card.handle}-bitcard-export.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported", { description: "Your BitCard data has been downloaded." });
  };

  const onDelete = () => {
    toast.error("Account deletion requested", {
      description: "We'll send a confirmation email in 24h. This is reversible.",
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
                Settings
              </h1>
              <Badge
                variant="secondary"
                className="h-6 rounded-full border-0 bg-success-soft px-2.5 text-[11px] font-semibold text-success"
              >
                <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
                Synced
              </Badge>
            </div>
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              Manage your account, security and preferences
            </p>
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <DotsThree size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 px-6 py-6">
          {/* Account */}
          <Section
            icon={EnvelopeSimple}
            title="Account"
            description="Your registered email and identity"
            action={
              <Badge
                variant="secondary"
                className="h-6 gap-1 rounded-full border-0 bg-success-soft px-2 text-[10.5px] font-semibold text-success"
              >
                <ShieldCheck size={12} weight="fill" />
                Verified
              </Badge>
            }
          >
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="flex items-stretch overflow-hidden rounded-xl border border-border bg-surface transition-colors focus-within:border-primary/50 focus-within:bg-card">
                <div className="grid w-11 flex-shrink-0 place-items-center text-muted-foreground">
                  <EnvelopeSimple size={16} />
                </div>
                <Input
                  value={card.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="h-11 flex-1 border-0 bg-transparent px-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <Button
                onClick={() => toast.success("Verification email resent")}
                variant="ghost"
                className="h-11 rounded-xl border border-border bg-card px-4 text-[12.5px] font-medium text-foreground hover:bg-secondary"
              >
                Resend verification
              </Button>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-border bg-surface/60 px-3.5 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-card text-primary">
                <Key size={15} weight="duotone" />
              </span>
              <div className="flex-1">
                <p className="text-[12.5px] font-semibold text-foreground">Account ID</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  usr_{card.handle}_4f2a91c
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard?.writeText(`usr_${card.handle}_4f2a91c`);
                  toast.success("Account ID copied");
                }}
                className="h-8 rounded-md border border-border bg-card px-2.5 text-[11px] font-medium text-foreground hover:bg-secondary"
              >
                Copy
              </Button>
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Security */}
          <Section
            icon={Lock}
            title="Security"
            description="Change your password to protect your account"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <PasswordField
                label="New password"
                placeholder="Minimum 6 characters"
                value={pw.new}
                show={showPw}
                onToggle={() => setShowPw((s) => !s)}
                onChange={(v) => setPw((p) => ({ ...p, new: v }))}
                strength={pw.new.length}
              />
              <PasswordField
                label="Confirm password"
                placeholder="Re-enter new password"
                value={pw.confirm}
                show={showPw}
                onToggle={() => setShowPw((s) => !s)}
                onChange={(v) => setPw((p) => ({ ...p, confirm: v }))}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button
                onClick={onUpdatePassword}
                disabled={!pw.new || !pw.confirm}
                className="h-10 rounded-lg bg-gradient-primary px-4 text-[13px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                <CheckCircle size={15} weight="fill" className="mr-1.5" />
                Update Password
              </Button>
            </div>

            {/* 2FA */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-lg transition-colors",
                    twoFA ? "bg-gradient-primary text-primary-foreground" : "bg-card text-muted-foreground"
                  )}
                >
                  <ShieldCheck size={16} weight={twoFA ? "fill" : "duotone"} />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">
                    Two-factor authentication
                  </p>
                  <p className="text-[11.5px] text-muted-foreground">
                    {twoFA ? "Active — codes sent via authenticator app" : "Add an extra security layer at sign-in"}
                  </p>
                </div>
              </div>
              <Switch
                checked={twoFA}
                onCheckedChange={(v) => {
                  setTwoFA(v);
                  toast.success(v ? "2FA enabled" : "2FA disabled");
                }}
              />
            </div>

            {/* Sessions */}
            <div className="mt-3 overflow-hidden rounded-xl border border-border bg-surface">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <p className="text-[12px] font-semibold text-foreground">Active sessions</p>
                <button
                  onClick={() => toast.success("All other sessions signed out")}
                  className="text-[11.5px] font-medium text-primary hover:underline"
                >
                  Sign out all
                </button>
              </div>
              <SessionRow
                icon={Monitor}
                device="MacBook Pro · Chrome"
                location="Navsari, IN"
                time="Active now"
                current
              />
              <SessionRow
                icon={DeviceMobile}
                device="iPhone 15 · Safari"
                location="Surat, IN"
                time="2 hours ago"
              />
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Notifications */}
          <Section
            icon={Bell}
            title="Notifications"
            description="Choose what to hear about — sent to your email"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <PrefRow
                label="Weekly digest"
                description="Top scans, taps and conversions"
                active={prefs.digest}
                onChange={() => togglePref("digest")}
              />
              <PrefRow
                label="Scan alerts"
                description="Get notified when someone scans your QR"
                active={prefs.scans}
                onChange={() => togglePref("scans")}
              />
              <PrefRow
                label="Product updates"
                description="New features and tips, monthly"
                active={prefs.product}
                onChange={() => togglePref("product")}
              />
              <PrefRow
                label="Card discoverable"
                description="Allow others to find you on BitCard"
                active={prefs.discoverable}
                onChange={() => togglePref("discoverable")}
              />
            </div>

            <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-card text-primary">
                  <GlobeHemisphereWest size={16} weight="duotone" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Search engine indexing</p>
                  <p className="text-[11.5px] text-muted-foreground">
                    Let Google show your public card in results
                  </p>
                </div>
              </div>
              <Switch
                checked={prefs.indexable}
                onCheckedChange={() => togglePref("indexable")}
              />
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Preferences */}
          <Section
            icon={ClockCounterClockwise}
            title="Preferences"
            description="Locale, timezone and regional settings"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <PreferenceSelect
                label="Language"
                icon={GlobeHemisphereWest}
                value={language}
                onChange={setLanguage}
                options={[
                  { value: "en", label: "English" },
                  { value: "hi", label: "हिन्दी (Hindi)" },
                  { value: "gu", label: "ગુજરાતી (Gujarati)" },
                  { value: "es", label: "Español" },
                  { value: "fr", label: "Français" },
                  { value: "de", label: "Deutsch" },
                  { value: "ja", label: "日本語" },
                ]}
              />
              <PreferenceSelect
                label="Timezone"
                icon={ClockCounterClockwise}
                value={timezone}
                onChange={setTimezone}
                options={[
                  { value: "Asia/Kolkata", label: "Asia/Kolkata (GMT+5:30)" },
                  { value: "America/New_York", label: "America/New York (GMT-5)" },
                  { value: "Europe/London", label: "Europe/London (GMT+0)" },
                  { value: "Asia/Singapore", label: "Asia/Singapore (GMT+8)" },
                  { value: "Australia/Sydney", label: "Australia/Sydney (GMT+10)" },
                ]}
              />
            </div>
          </Section>

          <div className="h-px w-full bg-border" />

          {/* Danger zone */}
          <section>
            <div className="mb-4 flex items-start gap-3">
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive">
                <Warning size={18} weight="duotone" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-foreground">Danger zone</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  Irreversible actions — please proceed with caution
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-destructive/30 bg-destructive/5">
              <div className="flex flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-card text-foreground">
                    <DownloadSimple size={15} weight="bold" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Export your data</p>
                    <p className="text-[11.5px] text-muted-foreground">
                      Download a JSON copy of your card, links and design tokens
                    </p>
                  </div>
                </div>
                <Button
                  onClick={onExport}
                  variant="ghost"
                  className="h-9 rounded-md border border-border bg-card px-3 text-[12px] font-medium text-foreground hover:bg-secondary"
                >
                  Export data
                </Button>
              </div>

              <div className="h-px w-full bg-destructive/20" />

              <div className="flex flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive">
                    <Trash size={15} weight="bold" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Delete account</p>
                    <p className="text-[11.5px] text-muted-foreground">
                      Permanently delete your BitCard and all associated data
                    </p>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 rounded-md border border-destructive/40 bg-card px-3 text-[12px] font-semibold text-destructive hover:bg-destructive/10"
                    >
                      Delete account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl border border-border bg-card">
                    <AlertDialogHeader>
                      <div className="mb-2 grid h-12 w-12 place-items-center rounded-2xl bg-destructive/10 text-destructive">
                        <Warning size={22} weight="duotone" />
                      </div>
                      <AlertDialogTitle className="font-display text-[18px] text-foreground">
                        Delete your BitCard account?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-[13px] text-muted-foreground">
                        This will permanently delete your card at <span className="font-semibold text-foreground">bitcard.app/{card.handle}</span>, all your links, analytics history and design preferences.
                        <br /><br />
                        You can recover within 30 days by emailing support.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="h-10 rounded-lg border border-border bg-card text-[13px] text-foreground hover:bg-secondary">
                        Keep my account
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={onDelete}
                        className="h-10 rounded-lg bg-destructive text-[13px] font-semibold text-destructive-foreground hover:opacity-90"
                      >
                        Yes, delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2.5 border-t border-border bg-surface px-6 py-4">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Question size={13} weight="bold" />
            Need help? Visit support
            <CaretRight size={11} className="opacity-60" />
          </a>
          <Button
            onClick={() => toast.success("All settings saved")}
            className="h-10 rounded-lg bg-gradient-primary px-5 text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.02] hover:opacity-95"
          >
            <CheckCircle size={16} weight="fill" className="mr-1.5" />
            Save all changes
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Sub components ---------------- */

const PasswordField = ({ label, placeholder, value, onChange, show, onToggle, strength }) => {
  const lvl = strength === undefined ? -1 : strength < 6 ? 0 : strength < 10 ? 1 : strength < 14 ? 2 : 3;
  const bars = ["bg-destructive", "bg-amber-500", "bg-amber-400", "bg-success"];
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{label}</label>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-border bg-surface transition-colors focus-within:border-primary/50 focus-within:bg-card">
        <div className="grid w-11 flex-shrink-0 place-items-center text-muted-foreground">
          <Lock size={15} />
        </div>
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 flex-1 border-0 bg-transparent px-0 text-[13.5px] font-medium text-foreground shadow-none focus-visible:ring-0"
        />
        <button
          onClick={onToggle}
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
          className="grid w-11 flex-shrink-0 place-items-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {show ? <EyeSlash size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {strength !== undefined && (
        <div className="mt-1.5 flex items-center gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= lvl ? bars[lvl] : "bg-border"
              )}
            />
          ))}
          <span className="ml-1.5 text-[10.5px] font-medium text-muted-foreground">
            {lvl < 0 ? "" : ["Weak", "Fair", "Good", "Strong"][lvl]}
          </span>
        </div>
      )}
    </div>
  );
};

const SessionRow = ({ icon: Icon, device, location, time, current }) => (
  <div className="flex items-center justify-between gap-3 px-4 py-3">
    <div className="flex min-w-0 items-center gap-3">
      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-card text-primary">
        <Icon size={16} weight="duotone" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-[12.5px] font-semibold text-foreground">{device}</p>
          {current && (
            <span className="rounded-full bg-success-soft px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-success">
              This device
            </span>
          )}
        </div>
        <p className="truncate text-[11px] text-muted-foreground">
          {location} · {time}
        </p>
      </div>
    </div>
    {!current && (
      <button
        onClick={() => toast.success("Session ended")}
        className="text-[11.5px] font-medium text-muted-foreground transition-colors hover:text-destructive"
      >
        Sign out
      </button>
    )}
  </div>
);

const PrefRow = ({ label, description, active, onChange }) => (
  <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 transition-colors hover:border-primary/20">
    <div className="min-w-0">
      <p className="text-[12.5px] font-semibold text-foreground">{label}</p>
      <p className="truncate text-[11px] text-muted-foreground">{description}</p>
    </div>
    <Switch checked={active} onCheckedChange={onChange} />
  </div>
);

const PreferenceSelect = ({ label, icon: Icon, value, onChange, options }) => (
  <div>
    <label className="mb-1.5 block text-[12px] font-medium text-muted-foreground">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-[13px] font-medium text-foreground hover:bg-card [&>svg]:opacity-60">
        <div className="flex items-center gap-2.5">
          <Icon size={15} weight="duotone" className="text-primary" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value} className="text-[13px]">
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
