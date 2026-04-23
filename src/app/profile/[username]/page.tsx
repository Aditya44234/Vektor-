"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import Navbar from "@/src/components/Navbar";
import PostCard from "@/src/components/PostCard";
import {
  getProfileByUsernameAPI,
  type ProfileResponse,
} from "@/src/services/profile.api";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);

  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProfileByUsernameAPI(username);

        if (!ignore) {
          setProfileData(data);
        }
      } catch (error) {
        if (!ignore) {
          setProfileData(null);
          setError(
            error instanceof Error ? error.message : "Unable to load profile."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [username]);

  const joinedLabel = profileData?.user.createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        month: "short",
        year: "numeric",
      }).format(new Date(profileData.user.createdAt))
    : null;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto mt-8 max-w-2xl px-4 pb-24">
        <Link
          href="/feed"
          className="mb-5 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Back to feed
        </Link>

        {loading ? (
          <div className="rounded-[28px] border border-white/10 bg-slate-950/65 p-6 text-sm text-slate-400 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
            Loading profile...
          </div>
        ) : null}

        {!loading && error ? (
          <div className="rounded-[28px] border border-rose-400/20 bg-rose-500/10 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
            <h1 className="text-xl font-semibold text-rose-100">
              Profile unavailable
            </h1>
            <p className="mt-2 text-sm leading-6 text-rose-200/85">{error}</p>
          </div>
        ) : null}

        {!loading && !error && profileData ? (
          <>
            <section className="mb-6 rounded-[28px] border border-white/10 bg-slate-950/65 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-900 text-2xl font-semibold text-white">
                  {profileData.user.profilePic ? (
                    <img
                      src={profileData.user.profilePic}
                      alt={`${profileData.user.username}'s profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profileData.user.username[0]?.toUpperCase() || "?"
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                      @{profileData.user.username}
                    </h1>

                    <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                      {profileData.posts.length}{" "}
                      {profileData.posts.length === 1 ? "post" : "posts"}
                    </span>

                    {joinedLabel ? (
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                        Joined {joinedLabel}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    {profileData.user.bio?.trim() ||
                      "This profile has not added a bio yet."}
                  </p>

                  {profileData.user.interests &&
                  profileData.user.interests.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profileData.user.interests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">
                      No interests added yet.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-slate-100">
                  {profileData.user.username}&apos;s posts
                </h2>
              </div>

              {profileData.posts.length === 0 ? (
                <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
                  No posts yet.
                </div>
              ) : (
                profileData.posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              )}
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
