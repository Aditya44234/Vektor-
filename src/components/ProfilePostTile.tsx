"use client";

import type { Post } from "@/src/types/post.types";
import { ImageIcon, ThumbsDown, ThumbsUp } from "lucide-react";

type ProfilePostTileProps = {
  post: Post;
};

export default function ProfilePostTile({ post }: ProfilePostTileProps) {
  const hasImage = Boolean(post.imageUrl);
  const publishedLabel = post.createdAt
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
      }).format(new Date(post.createdAt))
    : "Recent";

  return (
    <article className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
      {hasImage ? (
        <>
          <img
            src={post.imageUrl}
            alt="Profile post"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/15 to-transparent" />
        </>
      ) : (
        <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(155deg,rgba(96,239,255,0.14),rgba(8,16,25,0.92),rgba(0,255,135,0.1))] p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-100/80">
            <ImageIcon className="h-3.5 w-3.5" />
            Text update
          </div>
          <p className="line-clamp-6 text-sm leading-6 text-slate-100">
            {post.content}
          </p>
        </div>
      )}

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-3">
        {/* <span className="rounded-full border border-white/10 bg-slate-950/55 px-2.5 py-1 text-[11px] font-medium text-slate-100 backdrop-blur-md">
          {hasImage ? "Visual post" : "Text post"}
        </span> */}
        <span className="rounded-full border border-white/10 bg-slate-950/55 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-md">
          {publishedLabel}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="line-clamp-3 text-sm font-medium leading-5 text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)]">
          {post.content}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs font-medium text-slate-200/95">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/45 px-2.5 py-1 backdrop-blur-md">
            <ThumbsUp className="h-3.5 w-3.5" />
            {post.likes.length}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/45 px-2.5 py-1 backdrop-blur-md">
            <ThumbsDown className="h-3.5 w-3.5" />
            {post.piss.length}
          </span>
        </div>
      </div>
    </article>
  );
}
