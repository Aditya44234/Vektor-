import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

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
    <html
      lang="en"
      className={`${exo2.variable} h-full antialiased bg-[#07111d] bg-fixed bg-no-repeat bg-center bg-cover`}
    >
      <body className="min-h-screen text-slate-50">
        <AuthProvider>{children}</AuthProvider>

      </body>
    </html>
  );
}
