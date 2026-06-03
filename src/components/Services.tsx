const services = [
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="5" rx="1.5"/><rect x="2" y="10" width="20" height="5" rx="1.5"/><rect x="2" y="17" width="20" height="5" rx="1.5"/></svg>`,
    title: "Secure-by-design multi-cloud architecture",
    description: "I design and deploy scalable multi-account landing zones with automated policy-as-code guardrails, strict identity boundaries, and continuous CNAPP visibility — catching misconfigurations before they reach production.",
    stack: ["AWS / Azure", "CNAPP", "CSPM", "Landing Zones", "Wiz"],
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: "Zero Trust network & edge architecture",
    description: "I eliminate legacy high-risk network paths by engineering hub-and-spoke topologies, edge consolidation, and granular segmentation. From API gateway hardening and network security uplift to WAF enforcement — isolating threats and preventing lateral movement.",
    stack: ["Zero Trust", "SASE", "Cloudflare WAF", "API Gateway", "Microsegmentation"],
  },
  {
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title: "DevSecOps & pipeline security",
    description: "I shift security left by embedding automated controls directly into CI/CD and GitOps pipelines — from IaC scanning and secrets management to container image hardening and full-spectrum application security testing. Compliance built in, not bolted on.",
    stack: ["DevSecOps", "IaC Scanning", "GitOps", "SAST / SCA / DAST", "Secrets Mgmt"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(5rem, 10vh, 7rem) 0",
      }}
    >
      <div className="ds-gridlines" />
      <div className="l-wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="ds-sec-head">
          <span className="idx" style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-mono)", color: "var(--fg-faint)" }}>02</span>
          <h2 className="t-h2">What I deliver</h2>
          <span className="t-mono" style={{ color: "var(--fg-muted)" }}>services</span>
        </div>

        <p style={{ maxWidth: "66ch", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "var(--s-7)", fontSize: "var(--fs-base)" }}>
          I step in as an independent technical partner — turning complex cloud security risk into automated, code-first protection your teams can operate at scale.
        </p>

        <div className="svc-grid-inner" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          columnGap: "var(--s-4)",
          rowGap: "var(--s-3)",
        }}>
          {services.map((s) => (
            <div
              key={s.title}
              className="ds-card ds-card-hover"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--s-3)",
                padding: "var(--s-5)",
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--r-md)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent)",
                  background: "var(--accent-soft)",
                  border: "1px solid var(--accent-line)",
                  flexShrink: 0,
                  marginBottom: "var(--s-1)",
                }}
                dangerouslySetInnerHTML={{ __html: s.icon }}
                aria-hidden="true"
              />
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-lg)", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.6, flex: 1 }}>
                {s.description}
              </p>
              <div style={{ marginTop: "auto", paddingTop: "var(--s-4)", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-faint)" }}>Stack</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.stack.map((t) => (
                    <span key={t} className="ds-chip" style={{ fontSize: "0.65rem", padding: "0.22rem 0.55rem" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a href="#outcomes" className="scroll-ind" aria-label="Scroll to Outcomes" style={{
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
    </section>
  );
}
