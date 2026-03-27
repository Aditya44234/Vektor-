import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14] px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#00ff87]/4 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00ff87]/20 to-[#60efff]/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
          <Zap size={28} className="text-[#00ff87]" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-3 font-heading">404</h1>
        <p className="text-gray-400 text-lg mb-2">Page not found</p>
        <p className="text-gray-600 text-sm mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link
          href="/feed"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#00ff87] to-[#60efff] text-[#0b0f14] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg shadow-[#00ff87]/20"
        >
          <ArrowLeft size={16} />
          Back to Feed
        </Link>
      </div>
    </div>
  );
}
