// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { AppShell } from "@/components/layout/AppShell";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lanka Explorer",
    template: "%s | Lanka Explorer",
  },
  description:
    "Discover the best attractions, nature spots, and heritage sites across Sri Lanka.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface-container-low text-ink">
        <AppProviders>
          <div className="mx-auto w-full max-w-md bg-surface min-h-screen shadow-2xl flex flex-col relative">
            <AppShell>{children}</AppShell>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
