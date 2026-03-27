"use client";

import Link from "next/link";
import CreatePost from "@/src/components/CreatePost";
import Navbar from "@/src/components/Navbar";
import PostCard from "@/src/components/PostCard";
import { useAuth } from "@/src/context/AuthContext";
import { usePosts } from "@/src/hooks/usePosts";
import { useCreatePost } from "@/src/hooks/useCreatePost";

export default function FeedPage() {
  const { posts, loading, refetch } = usePosts();
  const { createPost, loading: creating, error } = useCreatePost(refetch);
  const { isReady, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto mt-8 max-w-2xl px-4 pb-10">
        <div className="mb-6 rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,255,135,0.12),rgba(96,239,255,0.08),rgba(6,13,22,0.95))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">
            PulsePost feed
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            See what the community is talking about right now.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Browse the latest posts, jump into the conversation, and publish your
            own updates when you are signed in.
          </p>
        </div>

        {!isReady ? (
          <div className="mb-6 rounded-[28px] border border-white/10 bg-slate-950/65 p-5 text-sm text-slate-400">
            Checking your session...
          </div>
        ) : isAuthenticated ? (
          <CreatePost onSubmit={createPost} loading={creating} error={error} />
        ) : (
          <div className="mb-6 rounded-[28px] border border-white/10 bg-slate-950/65 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
            <p className="text-lg font-semibold text-white">
              Log in to publish your own posts.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your feed is visible, but posting requires an authenticated account.
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

        <h2 className="mb-4 text-lg font-semibold text-slate-100">
          Latest Posts
        </h2>

        {loading && <p className="text-sm text-slate-400">Loading posts...</p>}

        {!loading && posts.length === 0 && (
          <p className="text-sm text-slate-400">No posts yet.</p>
        )}

        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
