"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "var(--s-5)",
        padding: "0.85rem var(--gutter)",
        background: scrolled ? "var(--bg-glass)" : "var(--bg)",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
        transition: "background 0.3s var(--ease), backdrop-filter 0.3s var(--ease), border-color 0.3s var(--ease)",
      }}
    >
      {/* Logo — col 1 */}
      <Link
        href="#hero"
        aria-label="Home — Eugine Dsylva"
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          display: "grid",
          placeItems: "center",
          color: "var(--accent)",
          background: "var(--accent-soft)",
          border: "1px solid var(--accent-line)",
          boxShadow: "var(--shadow)",
          flexShrink: 0,
          padding: 6,
          transition: "background 0.25s var(--ease), color 0.25s var(--ease), transform 0.2s var(--ease-out)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "var(--accent)";
          el.style.color = "var(--accent-fg)";
          el.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = "var(--accent-soft)";
          el.style.color = "var(--accent)";
          el.style.transform = "translateY(0)";
        }}
      >
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
          <path d="M6,7 H26 V19 Q26,28 16,30 Q6,28 6,19 Z" fill="currentColor"/>
          <path d="M9.5,12 H14.5 V22 H9.5 M14.5,17 H11 M14.5,12 C18,12 21,14 21,17 S18,22 14.5,22"
            stroke="var(--accent-fg)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </Link>

      {/* Center links — col 2 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--s-5)",
          gridColumn: 2,
        }}
        className="nav-center-links"
      >
        {[
          { label: "About", href: "#about" },
          { label: "What I deliver", href: "#services" },
          { label: "Outcomes", href: "#outcomes" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{ fontSize: "var(--fs-sm)", color: "var(--fg-muted)", transition: "color 0.2s", whiteSpace: "nowrap", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--fg)")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--fg-muted)")}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right — col 3 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "var(--s-3)", gridColumn: 3 }}>
        <a href="#chat" className="ds-btn ds-btn-primary ds-btn-sm">Digital Twin</a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
