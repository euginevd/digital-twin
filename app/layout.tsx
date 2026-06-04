import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Eugine Dsylva — Cloud Security Architect",
  description: "Personal site of Eugine Dsylva, a Cloud Security Architect securing cloud infrastructure and applications at enterprise scale.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Nav />
        {children}
        <Script src="/shader.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
