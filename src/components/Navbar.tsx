"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, isReady, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#081019]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/feed"
          className="flex items-center gap-2"
        >
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl ">
            <Image
              src="/BrandLogo.svg"
              alt="Loopin logo"
              width={72}
              height={72}
              unoptimized
              className="h-full  w-full  object-contain"
            />
          </span>
          <span className="bg-gradient-to-r from-[#00ff87] via-[#9dffcb] to-[#60efff] bg-clip-text text-xl font-semibold tracking-tight text-transparent">
            Loopin
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
          {/* <Link
            href="/feed"
            className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Feed
          </Link> */}

          {!isReady ? (
            <span className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-400">
              Checking session
            </span>
          ) : isAuthenticated ? (
            <>
              <span className="hidden rounded-md border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100 sm:inline-flex">
                @{user?.username}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-md cursor-pointer border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-rose-300/30 hover:bg-rose-500/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                {/* Log out */}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-[#00ff87] to-[#60efff] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(96,239,255,0.25)]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
