const services = [
  {
    num: "01",
    title: "Zero Trust Architecture",
    description: "End-to-end Zero Trust design and delivery across cloud edge, network, and enterprise environments — AWS LZA, Cloudflare WAF, Network Firewall.",
  },
  {
    num: "02",
    title: "Cloud Security Posture",
    description: "CNAPP-aligned guardrails, CSPM, and policy-as-code across multi-cloud, Kubernetes, containers, and serverless workloads.",
  },
  {
    num: "03",
    title: "DevSecOps & AppSec",
    description: "Security embedded into CI/CD and GitOps pipelines — SAST, SCA, DAST, IaC security, secrets management, and container scanning.",
  },
  {
    num: "04",
    title: "Identity & Endpoint",
    description: "Microsoft 365, Entra ID, Defender XDR, and Intune — remediating identity, endpoint, and access risk at enterprise scale.",
  },
];

export default function Services() {
  return (
    <section id="services" style={{ paddingBlock: "clamp(1.5rem, 3vw, 2.5rem)", borderTop: "1px solid var(--border)" }}>
      <div className="l-wrap">
        <div className="ds-sec-head" style={{ marginBottom: "var(--s-4)" }}>
          <span className="idx" style={{ fontSize: "0.65rem" }}>03</span>
          <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>What I deliver</h2>
          <span className="t-mono t-faint">services & outcomes</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-4)" }}>
          {services.map((s) => (
            <div
              key={s.title}
              className="ds-card"
              style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)", padding: "var(--s-4)" }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.08em" }}>
                {s.num}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-sm)", letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
