"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Grid3X3, Sparkles } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import ProfilePageSkeleton from "@/src/components/ProfilePageSkeleton";
import ProfilePostTile from "@/src/components/ProfilePostTile";
import {
  getProfileByUsernameAPI,
  type ProfileResponse,
} from "@/src/services/profile.api";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const router = useRouter();
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

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/feed");
  };

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <main className="mx-auto  max-w-6xl px-4 pb-24">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back"
          className="mb-5 cursor-pointer  mt-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/55 text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {loading ? <ProfilePageSkeleton /> : null}

        {!loading && error ? (
          <div className="rounded-[12px] border border-rose-400/20 bg-rose-500/10 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
            <h1 className="text-xl font-semibold text-rose-100">
              Profile unavailable
            </h1>
            <p className="mt-2 text-sm leading-6 text-rose-200/85">{error}</p>
          </div>
        ) : null}

        {!loading && !error && profileData ? (
          <>
            <section className=" border border-white/10 bg-[linear-gradient(180deg,rgba(8,17,29,0.92),rgba(2,6,23,0.96))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] md:p-8">
              <div className="flex flex-col gap-7 md:flex-row md:items-start md:gap-10">
                <div className="mx-auto md:mx-0">
                  <div className="rounded-full bg-[linear-gradient(135deg,#00ff87,#60efff,#9dffcb)] p-[2px] shadow-[0_0_40px_rgba(96,239,255,0.16)]">
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#0a1220] text-3xl font-semibold text-white md:h-36 md:w-36">
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
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <h1 className="truncate text-center text-3xl font-semibold tracking-tight text-white md:text-left md:text-4xl">
                        {profileData.user.username}
                      </h1>
                      <p className="mt-2 text-center text-sm font-medium text-cyan-100/85 md:text-left">
                        @{profileData.user.username}
                      </p>
                    </div>

                    <div className="flex justify-center md:justify-end">
                      {joinedLabel ? (
                        <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                          <CalendarDays className="h-4 w-4 text-cyan-200" />
                          Joined {joinedLabel}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        Posts
                      </p>
                      <p className="mt-3 text-2xl font-semibold text-white">
                        {profileData.posts.length}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                        Topics
                      </p>
                      <p className="mt-3 text-2xl font-semibold text-white">
                        {profileData.user.interests?.length ?? 0}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-3xl text-center text-sm leading-7 text-slate-300 md:text-left">
                    {profileData.user.bio?.trim() ||
                      "This profile has not added a bio yet."}
                  </p>

                  {profileData.user.interests &&
                  profileData.user.interests.length > 0 ? (
                    <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                      {profileData.user.interests.map((interest) => (
                        <span
                          key={interest}
                          className="rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-6 text-center text-sm text-slate-500 md:text-left">
                      No interests added yet.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
                  <Grid3X3 className="h-4 w-4 text-cyan-200" />
                  Posts
                </div>
                {/* <span className="text-sm text-slate-400">
                  {profileData.posts.length} total
                </span> */}
              </div>

              {profileData.posts.length === 0 ? (
                <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
                  No posts yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {profileData.posts.map((post) => (
                    <ProfilePostTile key={post._id} post={post} />
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
