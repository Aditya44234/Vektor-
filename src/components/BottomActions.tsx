"use client";

import Link from "next/link";
import { Plus, Search, UserCircle } from "lucide-react";
import { useState } from "react";
import type { AuthUser } from "@/src/context/AuthContext";
import CreatePost from "./CreatePost";
import SearchBar from "./SearchBar";

type BottomActionsProps = {
  onSubmit: (content: string, file?: File) => Promise<boolean>;
  loading: boolean;
  error?: string | null;
  isReady: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
};

type ActivePanel = "search" | "post" | null;

export default function BottomActions({
  onSubmit,
  loading,
  error,
  isReady,
  isAuthenticated,
  user,
}: BottomActionsProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  const togglePanel = (panel: Exclude<ActivePanel, null>) => {
    setActivePanel((currentPanel) => (currentPanel === panel ? null : panel));
  };

  return (
    <>
      {activePanel ? (
        <button
          type="button"
          aria-label="Close bottom panel"
          className="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-[1px]"
          onClick={() => setActivePanel(null)}
        />
      ) : null}

      {activePanel === "search" ? (
        <div className="fixed inset-x-0 bottom-28 z-40 px-4">
          <div className="mx-auto max-w-md rounded-md border border-white/10 bg-[#081019]/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <SearchBar className="max-w-none" dropdownPlacement="top" />
          </div>
        </div>
      ) : null}

      {activePanel === "post" ? (
        <div className="fixed inset-x-0 bottom-28 z-40 px-4">
          <div className="mx-auto max-w-2xl">
            {!isReady ? (
              <div className="rounded-md border border-white/10 bg-slate-950/90 p-5 text-sm text-slate-400 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                Checking your session...
              </div>
            ) : isAuthenticated ? (
              <CreatePost onSubmit={onSubmit} loading={loading} error={error} />
            ) : (
              <div className="rounded-md border border-white/10 bg-slate-950/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <p className="text-base font-semibold text-white">
                  Log in to publish your own posts.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Your feed is visible, but posting needs an authenticated
                  account.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/login"
                    className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-400/15"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-gradient-to-r from-[#00ff87] to-[#60efff] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(96,239,255,0.25)]"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex w-[min(88vw,19rem)] items-center justify-between rounded-[2rem] border border-white/15 bg-[#081019]/55 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => togglePanel("search")}
            aria-label="Search users"
            className={`flex h-11 w-11 items-center cursor-pointer justify-center rounded-full border text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/10 ${
              activePanel === "search"
                ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-100"
                : "border-white/10 bg-slate-950/45"
            }`}
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => togglePanel("post")}
            aria-label="Create post"
            className={`flex h-12 w-12 items-center cursor-pointer  justify-center rounded-full text-slate-950 transition hover:shadow-[0_0_30px_rgba(96,239,255,0.25)] ${
              activePanel === "post"
                ? "bg-white shadow-[0_0_30px_rgba(96,239,255,0.25)]"
                : "bg-gradient-to-r from-[#00ff87] via-[#32f4c8] to-[#60efff]"
            }`}
          >
            <Plus className="h-6 w-6" />
          </button>

          <div
            className="flex h-11 w-11 cursor-pointer  items-center justify-center overflow-hidden rounded-full border border-white/15 bg-slate-950/45 text-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            aria-label="Profile"
          >
            {isAuthenticated && user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={`${user.username}'s profile`}
                className="h-full w-full object-cover"
              />
            ) : isAuthenticated && user?.username ? (
              <span className="text-sm font-semibold">
                {user.username[0]?.toUpperCase()}
              </span>
            ) : (
              <UserCircle className="h-6 w-6 text-slate-400" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
