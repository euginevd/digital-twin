const outcomes = [
  {
    num: "01",
    title: "Securing a lift-and-shift cloud estate from the ground up",
    challenge: "80+ AWS and Azure accounts, limited security visibility, no landing zone, no guardrails, no posture management baseline.",
    outcome: "Ran a full security assessment and crown jewel threat modelling exercise. Designed and delivered a Landing Zone architecture, automated cloud security guardrails, and continuous CNAPP visibility across the entire estate.",
  },
  {
    num: "02",
    title: "Zero Trust network & edge architecture at scale",
    challenge: "300+ public-facing web apps and APIs had no centralised ingress control, no edge consolidation, and no API gateway enforcement — leaving the core data estate exposed.",
    outcome: "Engineered a Zero Trust hub-and-spoke network topology, consolidated the edge, hardened API gateways, and centralised WAF enforcement — securing 300+ web apps without interrupting active delivery pipelines.",
  },
  {
    num: "03",
    title: "Eradicating configuration drift at pipeline level",
    challenge: "Rapidly expanding cloud footprint required compliance at scale. Manual reviews and late-stage audits were bottlenecking deployment speed and introducing configuration drift.",
    outcome: "Embedded IaC scanning, secrets management, and full-spectrum CNAPP controls directly into CI/CD and GitOps pipelines — engineering teams ship verified, compliant code to production with compliance built in, not bolted on.",
  },
];

export default function Outcomes() {
  return (
    <section
      id="outcomes"
      className="l-alt"
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
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-mono)", color: "var(--fg-faint)" }}>03</span>
          <h2 className="t-h2">Outcomes</h2>
          <span className="t-mono" style={{ color: "var(--fg-muted)" }}>selected</span>
        </div>

        <p style={{ fontStyle: "italic", color: "var(--fg-muted)", fontSize: "var(--fs-base)", lineHeight: 1.6, marginTop: "var(--s-3)", marginBottom: "var(--s-7)", maxWidth: "74ch" }}>
          Delivered across multi-year enterprise cyber transformation programs and government engagements in NSW.
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {outcomes.map((o) => (
            <div
              key={o.num}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr 1fr",
                gap: "clamp(1rem, 3vw, 3rem)",
                alignItems: "start",
                padding: "clamp(1.75rem, 4vh, 2.5rem) 0",
                borderBottom: "1px solid var(--border)",
              }}
              className="outcome-item"
            >
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                fontWeight: 700,
                color: "var(--fg-faint)",
                opacity: 0.55,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                paddingTop: 4,
              }}>
                {o.num}
              </span>
              <div className="outcome-body" style={{ display: "contents" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-lg)", lineHeight: 1.3, letterSpacing: "-0.015em" }}>
                    {o.title}
                  </h3>
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: 4 }}>Challenge</p>
                    <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65 }}>{o.challenge}</p>
                  </div>
                </div>
                <div style={{ paddingTop: 2 }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: 4 }}>Outcome</p>
                  <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", lineHeight: 1.65 }}>{o.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a href="#chat" className="scroll-ind" aria-label="Scroll to Chat" style={{
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
