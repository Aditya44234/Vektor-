"use client";

import { Laugh, ThumbsUp } from "lucide-react";
import type { Post } from "@/src/types/post.types";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const author = typeof post.userId === "string" ? null : post.userId;

  return (
    <div className="mb-4 rounded-[28px] border border-white/10 bg-slate-950/65 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
      <div className="mb-2 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00ff87]/25 to-[#60efff]/25" />
        <p className="font-semibold text-slate-100">
          {author?.username ?? "Unknown user"}
        </p>
      </div>

      <p className="mb-3 text-slate-200">{post.content}</p>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="post"
          className="mb-3 rounded-2xl border border-white/10"
        />
      )}

      <div className="flex gap-4 text-sm text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <ThumbsUp className="h-4 w-4" />
          {post.likes?.length ?? 0}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Laugh className="h-4 w-4" />
          {post.piss?.length ?? 0}
        </span>
      </div>
    </div>
  );
}
