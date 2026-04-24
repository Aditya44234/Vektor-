"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    SwaggerUIBundle?: {
      (config: Record<string, unknown>): void;
      presets?: {
        apis?: unknown;
      };
    };
    SwaggerUIStandalonePreset?: unknown;
  }
}

type SwaggerUiProps = {
  specUrl: string;
};

export default function SwaggerUi({ specUrl }: SwaggerUiProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [bundleReady, setBundleReady] = useState(false);
  const [standaloneReady, setStandaloneReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const existingLink = document.getElementById("swagger-ui-styles");

    if (existingLink) {
      return;
    }

    const link = document.createElement("link");
    link.id = "swagger-ui-styles";
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (!bundleReady || !standaloneReady || !rootRef.current) {
      return;
    }

    if (!window.SwaggerUIBundle) {
      rootRef.current.innerHTML =
        '<div class="p-6 text-sm text-rose-600">Swagger UI bundle did not load.</div>';
      return;
    }

    rootRef.current.innerHTML = "";

    window.SwaggerUIBundle({
      url: specUrl,
      domNode: rootRef.current,
      deepLinking: true,
      docExpansion: "list",
      filter: true,
      persistAuthorization: true,
      displayRequestDuration: true,
      presets: [
        window.SwaggerUIBundle.presets?.apis,
        window.SwaggerUIStandalonePreset,
      ].filter(Boolean),
      layout: "BaseLayout",
    });
  }, [bundleReady, standaloneReady, specUrl]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"
        strategy="afterInteractive"
        onReady={() => setBundleReady(true)}
        onError={() => setLoadError("Failed to load Swagger UI bundle.")}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js"
        strategy="afterInteractive"
        onReady={() => setStandaloneReady(true)}
        onError={() => setLoadError("Failed to load Swagger UI preset.")}
      />

      {loadError ? (
        <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6 text-sm text-rose-100">
          {loadError}
        </div>
      ) : null}

      <div
        className="min-h-[70vh] overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
      >
        <div ref={rootRef} />
      </div>
    </>
  );
}
