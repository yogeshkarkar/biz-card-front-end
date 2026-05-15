import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowRight,
  GoogleLogo,
  AppleLogo,
  CheckCircle,
} from "@phosphor-icons/react";
import { AuthShell } from "@/components/auth/AuthShell";
import { toast } from "sonner";

const requirements = [
  { test: (p) => p.length >= 8, label: "At least 8 characters" },
  { test: (p) => /[A-Z]/.test(p), label: "One uppercase letter" },
  { test: (p) => /[0-9]/.test(p), label: "One number" },
];

export default function Signup() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!requirements.every((r) => r.test(password))) {
      toast.error("Please meet the password requirements");
      return;
    }
    if (!agree) {
      toast.error("Please accept the terms to continue");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success(`Welcome, ${name.split(" ")[0]}! Let's build your card.`);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <AuthShell
      side="left"
      title="Create your free card"
      subtitle="Start with the free plan. No credit card required."
      footer={
        <>
          Already on BitCard?{" "}
          <Link
            to="/login"
            data-testid="link-to-login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <div className="grid gap-2.5 sm:grid-cols-2">
        <SocialBtn icon={GoogleLogo} label="Sign up with Google" testid="oauth-google" />
        <SocialBtn icon={AppleLogo} label="Sign up with Apple" testid="oauth-apple" />
      </div>

      <div className="relative my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          or with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} data-testid="signup-form">
        <Field
          label="Full name"
          icon={User}
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          testid="input-name"
          autoComplete="name"
        />

        <Field
          label="Work email"
          icon={Envelope}
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          testid="input-email"
          autoComplete="email"
        />

        <div>
          <label className="mb-1.5 block text-[12.5px] font-semibold text-foreground">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock size={15} weight="bold" />
            </span>
            <input
              type={showPw ? "text" : "password"}
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              data-testid="input-password"
              className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-11 text-[13.5px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid h-6 w-6 place-items-center rounded text-muted-foreground hover:text-foreground"
              aria-label="Toggle password visibility"
            >
              {showPw ? <EyeSlash size={15} weight="bold" /> : <Eye size={15} weight="bold" />}
            </button>
          </div>

          <ul className="mt-3 grid gap-1.5 sm:grid-cols-3">
            {requirements.map((r) => {
              const passed = password ? r.test(password) : false;
              return (
                <li
                  key={r.label}
                  className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium transition-colors ${
                    passed ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  <CheckCircle
                    size={12}
                    weight={passed ? "fill" : "regular"}
                    className={passed ? "text-success" : "text-muted-foreground/50"}
                  />
                  {r.label}
                </li>
              );
            })}
          </ul>
        </div>

        <label className="flex items-start gap-2.5 text-[12.5px] text-foreground">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-border accent-[hsl(var(--primary))]"
            data-testid="input-agree"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-semibold text-primary hover:underline">Terms</a> and{" "}
            <a href="#" className="font-semibold text-primary hover:underline">Privacy Policy</a>.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          data-testid="submit-signup"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.01] disabled:opacity-70"
        >
          {loading ? "Creating account…" : (<>Create my free card <ArrowRight size={14} weight="bold" /></>)}
        </button>
      </form>

      <p className="mt-5 text-center text-[11.5px] text-muted-foreground">
        14-day Pro trial · cancel anytime · no credit card
      </p>
    </AuthShell>
  );
}

const Field = ({ label, icon: Icon, testid, ...props }) => (
  <div>
    <label className="mb-1.5 block text-[12.5px] font-semibold text-foreground">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Icon size={15} weight="bold" />
      </span>
      <input
        {...props}
        data-testid={testid}
        className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-3 text-[13.5px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
      />
    </div>
  </div>
);

const SocialBtn = ({ icon: Icon, label, testid }) => (
  <button
    type="button"
    data-testid={testid}
    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card text-[12.5px] font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
  >
    <Icon size={15} weight="bold" /> {label}
  </button>
);
