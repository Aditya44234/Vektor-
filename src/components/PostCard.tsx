"use client";

import Link from "next/link";
import type { Post } from "@/src/types/post.types";
import { useAuth } from "../context/AuthContext";
import ReactionButtons from "./ReactionButtons";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const author = typeof post.userId === "string" ? null : post.userId;

  const likeIds = (post.likes || []).map((id) =>
    typeof id === "string" ? id : String(id),
  );
  const pissIds = (post.piss || []).map((id) =>
    typeof id === "string" ? id : String(id),
  );

  const profileHref = author ? `/profile/${author.username}` : "#";

  return (
    <div className="mb-1 min-w-full rounded-md border border-white/10 bg-slate-950/65 py-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
      <div className="mb-2 flex items-center gap-3 px-3">
        {author ? (
          <Link href={profileHref} className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-slate-800">
              {author.profilePic ? (
                <img
                  src={author.profilePic}
                  alt={`${author.username}'s profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#00ff87]/25 to-[#60efff]/25 text-xs text-white">
                  {author.username[0]?.toUpperCase() || "?"}
                </div>
              )}
            </div>

            <p className="font-semibold text-slate-100 transition hover:text-cyan-200">
              {author.username}
            </p>
          </Link>
        ) : (
          <>
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-slate-800">
              <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#00ff87]/25 to-[#60efff]/25 text-xs text-white">
                ?
              </div>
            </div>
            <p className="font-semibold text-slate-100">Unknown user</p>
          </>
        )}
      </div>

      {post.imageUrl && (
        <div className="mb-3 max-h-120 w-full overflow-hidden border border-white/10 bg-slate-900">
          <img
            src={post.imageUrl}
            alt="post"
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <p className="mb-3 line-clamp-3 px-3 text-slate-200">{post.content}</p>

      <ReactionButtons
        postId={post._id}
        currentUserId={user?._id || null}
        likes={likeIds}
        piss={pissIds}
      />
    </div>
  );
}
