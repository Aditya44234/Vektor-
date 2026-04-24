"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import {
  ArrowRight,
  Plus,
} from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import { loginAPI, signUpAPI } from "@/src/services/auth.api";
import { uploadImageAPI } from "../services/upload.api";

type AuthMode = "login" | "signup";

type AuthScreenProps = {
  mode: AuthMode;
};

const screenCopy = {
  login: {
    eyebrow: "Welcome back",
    title: "Pick up the conversation where you left it.",
    description:
      "Log in to publish updates, upload visuals, and keep your Loopin feed moving.",
    submitLabel: "Log in",
    loadingLabel: "Logging in...",
    footerText: "Need an account?",
    footerLinkLabel: "Create one",
    footerHref: "/signup",
  },
  signup: {
    eyebrow: "Join Loopin",
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

export default function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const { isReady, login, token } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
    let imageUrl = "";
    if (file) {
      const uploadRes = await uploadImageAPI(file);
      imageUrl = uploadRes.url;
    }

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
          profilePic: imageUrl,
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
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,135,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(96,239,255,0.16),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-8 lg:flex-row lg:items-center">
        <section className="w-full max-w-xl rounded-[16px] border border-white/10 bg-[#08111d]/92 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-10">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_34px_rgba(96,239,255,0.14)]">
              <Image
                src="/BrandLogo.svg"
                alt="Loopin logo"
                width={44}
                height={44}
                unoptimized
                className="h-11 w-11 object-contain"
              />
            </div>
            <div>
              <p className="bg-gradient-to-r from-[#00ff87] via-[#9dffcb] to-[#60efff] bg-clip-text text-2xl font-semibold tracking-tight text-transparent">
                Loopin
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Stay in the loop
              </p>
            </div>
          </div>

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
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                  {file ? `Selected: ${file.name}` : <Plus />}
                </label>
              ) : null}
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

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-slate-400">{copy.footerText}</span>
            <Link
              href={copy.footerHref}
              className="font-medium text-cyan-200 underline  transition hover:text-cyan-100"
            >
              {copy.footerLinkLabel}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
