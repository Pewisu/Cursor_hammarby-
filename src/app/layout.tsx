import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirius vs Hammarby | Matchstatistik",
  description: "Matchstatistik från Sirius - Hammarby 2-0, Allsvenskan Omgång 2, 13 april 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chunkRecoveryScript = `
    (() => {
      const RETRY_KEY = "__hammarby_chunk_retry__";
      const CHUNK_PATH = "/_next/static/chunks/";
      const reloadWithCacheBust = () => {
        try {
          if (sessionStorage.getItem(RETRY_KEY) === "1") return;
          sessionStorage.setItem(RETRY_KEY, "1");
        } catch {}
        const url = new URL(window.location.href);
        url.searchParams.set("refresh", String(Date.now()));
        window.location.replace(url.toString());
      };

      window.addEventListener(
        "error",
        (event) => {
          const target = event.target;
          if (!(target instanceof HTMLScriptElement)) return;
          if (!target.src || !target.src.includes(CHUNK_PATH)) return;
          reloadWithCacheBust();
        },
        true
      );

      window.addEventListener("unhandledrejection", (event) => {
        const reason = String(event.reason?.message ?? event.reason ?? "");
        if (!reason || !/chunkloaderror|loading chunk/i.test(reason)) return;
        reloadWithCacheBust();
      });

      window.addEventListener("load", () => {
        try {
          sessionStorage.removeItem(RETRY_KEY);
        } catch {}
      });
    })();
  `;

  return (
    <html
      lang="sv"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: chunkRecoveryScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
