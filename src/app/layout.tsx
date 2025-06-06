import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono,Noto_Sans_Thai } from "next/font/google";

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
  title: "Create Next App",
  description: "Generated by create next app",
};
const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin", "thai"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.omise.co/omise.js" defer></script>
      </head>
      <body
        className={`${notoSansThai.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
