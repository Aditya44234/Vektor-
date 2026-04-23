"use client";

import type { Post } from "@/src/types/post.types";
import { useAuth } from "../context/AuthContext";
import ReactionButtons from "./ReactionButtons";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const author = typeof post.userId === "string" ? null : post.userId;

  // Convert likes/piss ObjectIds to strings for comparison
  const likeIds = (post.likes || []).map((id) =>
    typeof id === "string" ? id : String(id),
  );
  const pissIds = (post.piss || []).map((id) =>
    typeof id === "string" ? id : String(id),
  );

  // console.log("URL link :", author);

  return (
    <div className="mb-4 rounded-md border border-white/10 bg-slate-950/65 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
      <div className="mb-2 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-slate-800">
          {author?.profilePic ? (
            <img
              src={author.profilePic}
              alt={`${author.username}'s profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#00ff87]/25 to-[#60efff]/25 text-xs text-white">
              {author?.username?.[0]?.toUpperCase() || "?"}
            </div>
          )}
        </div>
        <p className="font-semibold text-slate-100">
          {author?.username ?? "Unknown user"}
        </p>
      </div>

      <p className="mb-3 text-slate-200 line-clamp-3">{post.content}</p>

      {post.imageUrl && (
        <div className="mb-3 max-h-100 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <img
            src={post.imageUrl}
            alt="post"
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <ReactionButtons
        postId={post._id}
        currentUserId={user?._id || null}
        likes={likeIds}
        piss={pissIds}
      />
    </div>
  );
}
