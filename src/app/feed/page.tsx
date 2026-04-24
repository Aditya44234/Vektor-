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

      <div className="mx-auto  max-w-2xl  pb-32">
        {loading && <p className="text-sm text-slate-400 mx-4">Loading posts...</p>}

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
