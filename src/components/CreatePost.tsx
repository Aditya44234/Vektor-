"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

type CreatePostProps = {
  onSubmit: (content: string, file?: File) => Promise<boolean>;
  loading: boolean;
  error?: string | null;
};

export default function CreatePost({
  onSubmit,
  loading,
  error,
}: CreatePostProps) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const created = await onSubmit(content, file || undefined);

    if (created) {
      setContent("");
      setFile(null);
    }
  };

  return (
    <div className="mb-6 rounded-md border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="mb-3">
        <p className="text-sm font-medium text-cyan-200">Create a post</p>
        <p className="text-sm text-slate-400">
          Share a quick update with your followers.
        </p>
      </div>

      <textarea
        placeholder="What's happening?"
        className="mb-3 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-[#060d16] p-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100">
          <input
            type="file"
            accept="image/*, video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const selectedFile = e.target.files[0];

                // Validate file size (100MB max)
                if (selectedFile.size > 100 * 1024 * 1024) {
                  alert("File size must be less than 100MB");
                  return;
                }

                setFile(selectedFile);
              }
            }}
          />
          {file ? `Selected: ${file.name}` : <Plus />}
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          className="rounded-md bg-gradient-to-r from-[#00ff87] via-[#32f4c8] to-[#60efff] px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(96,239,255,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post now"}
        </button>
      </div>

      {error ? (
        <p className="mt-3 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}
