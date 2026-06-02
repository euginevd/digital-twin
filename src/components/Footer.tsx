const socials = [
  { label: "Email",    href: "mailto:euginevd@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/euginevd" },
  { label: "GitHub",   href: "https://github.com/euginevd" },
];

export default function Footer() {
  return (
    <>
      {/* Contact CTA with shader */}
      <section
        id="contact"
        className="l-section"
        style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--border)" }}
      >
        <canvas className="ds-shader" data-shader />
        <div className="ds-gridlines" />
        <div
          className="l-wrap"
          style={{ position: "relative", zIndex: 2, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <span className="t-kicker">Let&apos;s talk</span>
          <h2
            className="t-h1"
            style={{ maxWidth: "18ch", marginBlock: "var(--s-5)" }}
          >
            Building something that needs AI done right?
          </h2>
          <p className="t-lead" style={{ maxWidth: "50ch" }}>
            Open to select LLM engineering engagements and the right full-time role.
            Reach out directly.
          </p>
          <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap", justifyContent: "center", marginTop: "var(--s-6)" }}>
            <a href="mailto:euginevd@gmail.com" className="ds-btn ds-btn-primary">
              euginevd@gmail.com
            </a>
            {socials.slice(1).map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn-ghost">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--s-3)",
          padding: "var(--s-6) var(--gutter)",
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-mono)",
          color: "var(--fg-faint)",
        }}
      >
        <span>EUGINE DSYLVA · AI ENGINEER</span>
        <span>SYDNEY, AUSTRALIA · UTC+10</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
