import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claude Marketplace — Claude Code 스킬 & 플러그인",
  description:
    "Claude Code를 위한 스킬과 플러그인을 발견하고 설치하세요. 개발, 생산성, 보안 등 다양한 카테고리의 스킬을 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-neutral-50 min-h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="mt-20 border-t border-neutral-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="text-sm text-neutral-500">Claude Marketplace</span>
            </div>
            <p className="text-xs text-neutral-400">
              © 2025 Claude Marketplace. Claude Code 커뮤니티를 위해 만들었습니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
