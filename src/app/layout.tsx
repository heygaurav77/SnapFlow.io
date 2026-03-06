import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SnapFlow — All-in-One Social Media Downloader",
  description:
    "Download videos, reels, stories & images from YouTube, TikTok, Instagram, Pinterest, Twitter & Facebook. Fast, free, and secure.",
  keywords:
    "video downloader, social media downloader, youtube downloader, tiktok downloader, instagram downloader, instagram reels downloader, reels downloader, tiktok video downloader without watermark",
  openGraph: {
    title: "SnapFlow — Download Anything From Anywhere",
    description:
      "The fastest free social media downloader. YouTube, TikTok, Instagram, Pinterest & more.",
    type: "website",
    siteName: "SnapFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapFlow — All-in-One Social Media Downloader",
    description:
      "Download videos, reels, stories & images from YouTube, TikTok, Instagram & more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
