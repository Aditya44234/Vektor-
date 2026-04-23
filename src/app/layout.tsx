import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loopin",
  description: "Share quick posts and stay in the loop.",
  icons: {
    icon: [{ url: "/BrandLogo.svg", type: "image/svg+xml" }],
    shortcut: "/BrandLogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-[#07111d] bg-fixed bg-no-repeat bg-center bg-cover">
      <body className="min-h-screen text-slate-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
