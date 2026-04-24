import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenText, ExternalLink } from "lucide-react";
import Navbar from "@/src/components/Navbar";
import SwaggerUi from "@/src/components/SwaggerUi";

export const metadata: Metadata = {
  title: "Loopin API Docs",
  description: "Swagger UI documentation for the Loopin backend routes.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <main className="mx-auto max-w-7xl px-4 py-8 pb-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100">
              <BookOpenText className="h-3.5 w-3.5" />
              Swagger UI
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Loopin Backend API Docs
            </h1>
            {/* <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              Browse every backend route, inspect request and response shapes,
              and test authenticated endpoints directly from the browser.
            </p> */}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/feed"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to app
            </Link>
            <a
              href="/api/openapi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00ff87] to-[#60efff] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:shadow-[0_0_30px_rgba(96,239,255,0.25)]"
            >
              Open JSON
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <SwaggerUi specUrl="/api/openapi" />
      </main>
    </div>
  );
}

