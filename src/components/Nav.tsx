"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
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
        background: "var(--bg-glass)",
        backdropFilter: "blur(16px) saturate(1.3)",
        WebkitBackdropFilter: "blur(16px) saturate(1.3)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)" }}>
        <Link
          href="/"
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            display: "grid",
            placeItems: "center",
            background: "var(--accent)",
            color: "var(--accent-fg)",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: "0.85rem",
            boxShadow: "var(--shadow)",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          ED
        </Link>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            fontSize: "1.02rem",
            whiteSpace: "nowrap",
          }}
        >
          Eugine Dsylva
        </span>
      </div>

      {/* Center links */}
      <div
        className="hidden md:flex"
        style={{ alignItems: "center", gap: "var(--s-5)" }}
      >
        {["About", "Services", "Projects", "Writing"].map((label) => (
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
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)" }}>
        <ThemeToggle />
        <a href="#contact" className="ds-btn ds-btn-primary ds-btn-sm">
          Get in Touch
        </a>
      </div>
    </nav>
  );
}
