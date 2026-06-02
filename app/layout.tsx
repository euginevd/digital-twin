import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Eugine Dsylva — AI Engineer",
  description: "Personal site of Eugine Dsylva, an AI engineer building intelligent systems.",
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
