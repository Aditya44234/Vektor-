type PostSkeletonProps = {
  showImage?: boolean;
};

export default function PostSkeleton({ showImage = true }: PostSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className="mb-1 min-w-full rounded-md border border-white/10 bg-slate-950/65 py-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
    >
      <div className="animate-pulse">
        <div className="mb-4 flex items-center gap-3 px-3">
          <div className="h-10 w-10 rounded-full border border-white/10 bg-slate-800/90" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 rounded-full bg-slate-700/80" />
            <div className="h-2.5 w-20 rounded-full bg-slate-800/90" />
          </div>
        </div>

        {showImage ? (
          <div className="mb-4 h-72 w-full overflow-hidden border-y border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(96,239,255,0.05),rgba(0,255,135,0.03))]" />
        ) : null}

        <div className="space-y-3 px-3">
          <div className="h-3 w-[92%] rounded-full bg-slate-700/80" />
          <div className="h-3 w-[78%] rounded-full bg-slate-700/70" />
          <div className="h-3 w-[58%] rounded-full bg-slate-800/90" />
        </div>

        <div className="mt-5 flex items-center gap-6 px-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-slate-700/80" />
            <div className="h-3 w-6 rounded-full bg-slate-800/90" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-slate-700/80" />
            <div className="h-3 w-6 rounded-full bg-slate-800/90" />
          </div>
        </div>
      </div>
    </div>
  );
}
