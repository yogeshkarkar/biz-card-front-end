import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Envelope, Lock, Eye, EyeSlash, ArrowRight, GoogleLogo, AppleLogo } from "@phosphor-icons/react";
import { AuthShell } from "@/components/auth/AuthShell";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Signed in. Welcome back.");
      navigate("/dashboard");
    }, 600);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue building your card."
      footer={
        <>
          New to BitCard?{" "}
          <Link
            to="/signup"
            data-testid="link-to-signup"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <div className="grid gap-2.5 sm:grid-cols-2">
        <SocialBtn icon={GoogleLogo} label="Continue with Google" testid="oauth-google" />
        <SocialBtn icon={AppleLogo} label="Continue with Apple" testid="oauth-apple" />
      </div>

      <div className="relative my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          or with email
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} data-testid="login-form">
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
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[12.5px] font-semibold text-foreground">Password</label>
            <Link
              to="#"
              className="text-[12px] font-semibold text-primary hover:underline"
              data-testid="link-forgot"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock size={15} weight="bold" />
            </span>
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
        </div>

        <label className="flex items-center gap-2.5 text-[13px] text-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-border accent-[hsl(var(--primary))]"
            data-testid="input-remember"
          />
          Keep me signed in for 30 days
        </label>

        <button
          type="submit"
          disabled={loading}
          data-testid="submit-login"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary text-[13.5px] font-semibold text-primary-foreground shadow-glow transition-transform duration-200 hover:scale-[1.01] disabled:opacity-70"
        >
          {loading ? "Signing in…" : (<>Sign in <ArrowRight size={14} weight="bold" /></>)}
        </button>
      </form>

      <p className="mt-5 text-center text-[11.5px] text-muted-foreground">
        Protected by reCAPTCHA · Terms · Privacy
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
