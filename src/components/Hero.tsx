import Image from "next/image";

export default function Hero() {
  return (
    <header
      id="hero"
      className="hero"
      style={{ position: "relative", overflow: "hidden", height: "100svh", minHeight: 600, display: "flex", flexDirection: "column", zIndex: 1 }}
    >
      <canvas className="ds-shader" data-shader />
      <div className="ds-gridlines" />

      <div
        className="l-wrap hero-inner"
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: "clamp(2.5rem, 6vw, 5rem)",
          paddingBlock: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Left — text */}
        <div>
          <h1 className="t-display" style={{ marginBottom: "var(--s-4)" }}>Eugine Dsylva</h1>

          <p className="hero-role" style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-xl)",
            color: "var(--accent)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            marginBottom: "var(--s-3)",
          }}>
            Cloud Security Architect
          </p>

          <p className="hero-location" style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.05em",
            color: "var(--fg-faint)",
            marginBottom: "var(--s-5)",
          }}>
            <span className="avail-dot" aria-hidden="true" style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "oklch(0.72 0.18 112)",
              flexShrink: 0,
              animation: "pulse-dot 2.2s ease-in-out infinite",
            }} />
            <span style={{ whiteSpace: "nowrap" }}>Sydney, Australia&nbsp;&nbsp;·&nbsp;&nbsp;Open to remote / global</span>
          </p>

          <p className="t-lead" style={{ marginBottom: "var(--s-6)", maxWidth: "48ch" }}>
            I design and build cloud security programs that hold — hands-on from architecture through engineering, for enterprises moving fast on AWS and Azure.
          </p>

          <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap" }}>
            <a href="#outcomes" className="ds-btn ds-btn-primary">See my work</a>
            <a href="/Eugine-Dsylva-Cloud-Security-Architect-CV.pdf" className="ds-btn ds-btn-ghost" download="Eugine-Dsylva-Cloud-Security-Architect-CV.pdf">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14"/></svg>
              Download CV
            </a>
          </div>
        </div>

        {/* Right — photo */}
        <div className="hero-photo" style={{
          width: "clamp(220px, 26vw, 340px)",
          aspectRatio: "3/4",
          borderRadius: "var(--r-xl)",
          overflow: "hidden",
          border: "1px solid var(--accent-line)",
          boxShadow: "0 2px 4px oklch(0 0 0 / 0.5), 0 20px 60px -12px oklch(0 0 0 / 0.7)",
          background: "oklch(0.20 0.035 42)",
          position: "relative",
          flexShrink: 0,
        }}>
          <Image
            src="/avatar.webp"
            alt="Eugine Dsylva"
            fill
            sizes="(max-width: 768px) 45vw, 340px"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              filter: "sepia(0.18) brightness(0.9) saturate(0.88) contrast(1.05)",
            }}
            priority
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, oklch(0.18 0.04 42 / 0) 40%, oklch(0.18 0.04 42 / 0.55) 100%)",
            pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="scroll-ind" aria-label="Scroll down" style={{
        position: "absolute",
        bottom: "5.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        textDecoration: "none",
      }}>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ animation: "chev 1.6s ease-in-out infinite" }}>
          <polyline points="2,2 10,10 18,2" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </header>
  );
}
