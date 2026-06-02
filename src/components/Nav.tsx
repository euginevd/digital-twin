"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.85rem var(--gutter)",
        background: scrolled ? "var(--bg-glass)" : "var(--bg)",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      {/* Brand */}
      <Link
        href="/"
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          display: "grid",
          placeItems: "center",
          background: "var(--accent)",
          color: "var(--accent-fg)",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          fontSize: "0.88rem",
          boxShadow: "var(--shadow)",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        ED
      </Link>

      {/* Center links */}
      <div
        className="hidden md:flex"
        style={{ alignItems: "center", gap: "var(--s-5)" }}
      >
        {["About", "Services", "Projects"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--fg-muted)",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "var(--fg)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "var(--fg-muted)")
            }
          >
            {label}
          </a>
        ))}
        <a href="#chat" className="ds-btn ds-btn-primary ds-btn-sm">
          Chat with my AI
        </a>
      </div>

      {/* Right */}
      <ThemeToggle />
    </nav>
  );
}
