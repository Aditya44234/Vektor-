export default function ProfilePageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* <div className="mb-6 flex">
        <div className="h-11 w-11 rounded-full border border-white/10 bg-slate-900/90" />
      </div> */}

      <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)] md:p-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-start">
          <div className="rounded-full bg-[linear-gradient(135deg,rgba(0,255,135,0.38),rgba(96,239,255,0.45))] p-[2px]">
            <div className="h-28 w-28 rounded-full bg-slate-900 md:h-36 md:w-36" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="h-8 w-44 rounded-full bg-slate-700/75" />
            <div className="mt-3 h-4 w-28 rounded-full bg-slate-800/90" />

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="h-20 rounded-3xl border border-white/10 bg-slate-900/85" />
              <div className="h-20 rounded-3xl border border-white/10 bg-slate-900/85" />
              <div className="h-20 rounded-3xl border border-white/10 bg-slate-900/85" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="h-3.5 w-[92%] rounded-full bg-slate-700/80" />
              <div className="h-3.5 w-[80%] rounded-full bg-slate-800/90" />
              <div className="h-3.5 w-[56%] rounded-full bg-slate-800/90" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="h-8 w-20 rounded-full bg-slate-800/90" />
              <div className="h-8 w-24 rounded-full bg-slate-800/90" />
              <div className="h-8 w-16 rounded-full bg-slate-800/90" />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="h-4 w-24 rounded-full bg-slate-700/80" />
        <div className="h-4 w-16 rounded-full bg-slate-800/90" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square rounded-[20px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.04),rgba(96,239,255,0.07),rgba(0,255,135,0.05))]"
          />
        ))}
      </div>
    </div>
  );
}
