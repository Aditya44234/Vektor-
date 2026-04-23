"use client";

import BottomActions from "@/src/components/BottomActions";
import Navbar from "@/src/components/Navbar";
import PostCard from "@/src/components/PostCard";
import { useAuth } from "@/src/context/AuthContext";
import { usePosts } from "@/src/hooks/usePosts";
import { useCreatePost } from "@/src/hooks/useCreatePost";

export default function FeedPage() {
  const { posts, loading, refetch } = usePosts();
  const { createPost, loading: creating, error } = useCreatePost(refetch);
  const { isReady, isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto mt-8 max-w-2xl px-4 pb-32">
        {/* <div className="mb-6 rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,255,135,0.12),rgba(96,239,255,0.08),rgba(6,13,22,0.95))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            See what the community is talking about right now.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Browse the latest posts, jump into the conversation, and publish your
            own updates when you are signed in.
          </p>
        </div> */}

        <h2 className="mb-4 text-lg font-semibold text-slate-100">
          {/* Latest Posts */}
        </h2>

        {loading && <p className="text-sm text-slate-400">Loading posts...</p>}

        {!loading && posts.length === 0 && (
          <p className="text-sm text-slate-400">No posts yet.</p>
        )}

        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <BottomActions
        onSubmit={createPost}
        loading={creating}
        error={error}
        isReady={isReady}
        isAuthenticated={isAuthenticated}
        user={user}
      />
    </div>
  );
}
