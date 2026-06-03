"use client";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M8 11v5M8 8v.01M12 16v-5M12 13a2 2 0 0 1 4 0v3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/euginevd/", icon: <LinkedInIcon /> },
  { label: "GitHub",   href: "https://github.com/euginevd",           icon: <GitHubIcon /> },
  { label: "Email",    href: "mailto:euginevd@gmail.com",             icon: <EmailIcon /> },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "clamp(1.5rem, 3vw, 2.25rem) var(--gutter)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--s-5)", flexWrap: "wrap", maxWidth: "var(--maxw)", marginInline: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "-0.02em", color: "var(--fg)" }}>
            Eugine Dsylva
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.06em", color: "var(--fg-faint)", textTransform: "uppercase" }}>
            Cloud Security Architect &nbsp;·&nbsp; Sydney, AU &nbsp;·&nbsp; Open to select engagements
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--s-3)" }}>
          {links.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--r-md)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--fg-muted)",
                transition: "border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s var(--ease-out)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--accent)";
                el.style.borderColor = "var(--accent-line)";
                el.style.background = "var(--accent-soft)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--fg-muted)";
                el.style.borderColor = "var(--border)";
                el.style.background = "transparent";
                el.style.transform = "translateY(0)";
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--fg-faint)", letterSpacing: "0.04em" }}>
          &copy; 2026 Eugine Dsylva
        </p>
      </div>
    </footer>
  );
}
