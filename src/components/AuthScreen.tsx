"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import { loginAPI, signUpAPI } from "@/src/services/auth.api";

type AuthMode = "login" | "signup";

type AuthScreenProps = {
  mode: AuthMode;
};

const screenCopy = {
  login: {
    eyebrow: "Welcome back",
    title: "Pick up the conversation where you left it.",
    description:
      "Log in to publish updates, upload visuals, and keep your PulsePost feed moving.",
    submitLabel: "Log in",
    loadingLabel: "Logging in...",
    footerText: "Need an account?",
    footerLinkLabel: "Create one",
    footerHref: "/signup",
  },
  signup: {
    eyebrow: "Join PulsePost",
    title: "Create your account and start posting today.",
    description:
      "Set up your profile, jump into the feed, and share your first update in a few seconds.",
    submitLabel: "Create account",
    loadingLabel: "Creating account...",
    footerText: "Already have an account?",
    footerLinkLabel: "Log in",
    footerHref: "/login",
  },
} as const;

const featureCards = [
  {
    icon: Sparkles,
    title: "Fast publishing",
    text: "Write short updates, attach images, and post instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Protected actions",
    text: "Your session is stored once and reused across the app.",
  },
  {
    icon: BadgeCheck,
    title: "Unified flow",
    text: "Signup, login, feed access, and posting now use the same auth state.",
  },
];

export default function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const { isReady, login, token } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const copy = screenCopy[mode];

  useEffect(() => {
    if (isReady && token) {
      router.replace("/feed");
    }
  }, [isReady, router, token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (mode === "signup" && trimmedUsername.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (!trimmedEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (mode === "signup") {
        await signUpAPI({
          username: trimmedUsername,
          email: trimmedEmail,
          password,
        });
      }

      const authPayload = await loginAPI({
        email: trimmedEmail,
        password,
      });

      login({
        user: authPayload.user,
        token: authPayload.token,
      });

      startTransition(() => {
        router.replace("/feed");
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,135,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(96,239,255,0.16),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row lg:items-center">
        <section className="flex-1 rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:p-10">
          <Link
            href="/feed"
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
          >
            PulsePost
          </Link>

          <div className="mt-10 max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              {copy.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[24px] border border-white/10 bg-slate-950/45 p-5"
              >
                <Icon className="h-5 w-5 text-cyan-200" />
                <p className="mt-4 text-base font-medium text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-xl rounded-[36px] border border-white/10 bg-[#08111d]/92 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
            {mode === "login" ? "Access your account" : "Start your profile"}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
            {copy.submitLabel}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Use your email and password to continue to the feed.
          </p>

          {!isReady ? (
            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              Checking your saved session...
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {mode === "signup" ? (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">
                    Username
                  </span>
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
                    placeholder="yourname"
                    autoComplete="username"
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
                  placeholder="Enter your password"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00ff87] via-[#32f4c8] to-[#60efff] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(96,239,255,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? copy.loadingLabel : copy.submitLabel}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="text-slate-400">{copy.footerText}</span>
            <Link
              href={copy.footerHref}
              className="font-medium text-cyan-200 transition hover:text-cyan-100"
            >
              {copy.footerLinkLabel}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
