"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, suffix = "+", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / 1200, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-2xl)", fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {count}{suffix}
      </span>
      <span className="t-mono t-faint" style={{ fontSize: "0.65rem" }}>{label}</span>
    </div>
  );
}

const jobs = [
  {
    company: "experteq",
    role: "Principal Consultant — Cloud & Security Architecture",
    period: "2020 – 2026 · Sydney",
    bullets: [
      "Zero Trust on AWS LZA across 70+ accounts — 300+ web apps via Cloudflare WAF & Network Firewall.",
      "CNAPP guardrails & DevSecOps pipeline integration (SAST, SCA, DAST, IaC) — ~70% risk reduction.",
      "M365 remediation across Entra ID, Defender XDR, Intune, DLP, CASB.",
    ],
  },
  {
    company: "beIN MEDIA GROUP",
    role: "System Specialist — Security Engineering",
    period: "2015 – 2019 · Doha",
    bullets: [
      "Vuln management & pen testing across IT/OT — 70% reduction in critical findings.",
      "Sovereign private cloud and greenfield data centre security design.",
    ],
  },
  {
    company: "Global Eagle",
    role: "Early Career — Network & Infrastructure",
    period: "2008 – 2015 · UAE",
    bullets: [
      "Infrastructure consulting across 20+ UAE government engagements — Cisco, Citrix VDI, multi-region.",
    ],
  },
];

const skillGroups = [
  { label: "Cloud & Edge", items: ["Zero Trust", "CNAPP", "CSPM", "Cloudflare WAF", "AWS Network Firewall", "API Security"] },
  { label: "DevSecOps", items: ["SAST", "DAST", "SCA", "IaC Security", "Secrets Mgmt", "Container Security"] },
  { label: "Identity & Endpoint", items: ["Entra ID", "Defender XDR", "Intune", "MFA", "CASB", "DLP"] },
  { label: "Platforms", items: ["AWS", "Azure", "Kubernetes", "Terraform", "Docker", "Essential Eight"] },
];

const featuredCerts = [
  { abbr: "CISSP", name: "Certified Information Systems\nSecurity Professional", issuer: "ISC2", color: "#00B140" },
  { abbr: "CISA", name: "Certified Information\nSystems Auditor", issuer: "ISACA", color: "#003DA5" },
  { abbr: "AWS\nSAP", name: "AWS Solutions Architect\nProfessional", issuer: "Amazon Web Services", color: "#FF9900" },
  { abbr: "Azure\nExp", name: "Azure Solutions Architect\nExpert", issuer: "Microsoft", color: "#0078D4" },
];

export default function About() {
  return (
    <section
      id="about"
      className="l-alt"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "clamp(2rem, 3.5vw, 3rem)" }}
    >
      <div className="l-wrap" style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>

        {/* ── Row 1: About + Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-8)", alignItems: "center" }}>
          <div>
            <div className="ds-sec-head" style={{ marginBottom: "var(--s-3)" }}>
              <span className="idx" style={{ fontSize: "0.65rem" }}>01</span>
              <h2 className="t-h2">About me</h2>
            </div>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.7 }}>
              I help companies secure cloud systems at scale — Zero Trust architecture, CNAPP, and DevSecOps across AWS and Azure. End-to-end design through delivery, focused on reducing real risk in complex environments.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-4)" }}>
            <Counter target={15} label="Years in security" />
            <Counter target={20} label="Engagements" />
            <Counter target={12} label="Certifications" />
            <Counter target={70} suffix="%" label="Avg risk reduction" />
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Row 2: Experience ── */}
        <div>
          <div className="ds-sec-head" style={{ marginBottom: "var(--s-4)" }}>
            <span className="idx" style={{ fontSize: "0.65rem" }}>02</span>
            <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>Experience</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--s-4)" }}>
            {jobs.map((job) => (
              <div key={job.company} className="ds-card" style={{ padding: "var(--s-4)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: "var(--fs-sm)" }}>{job.company}</span>
                  <span className="t-mono t-faint" style={{ fontSize: "0.6rem" }}>{job.period}</span>
                </div>
                <p style={{ fontSize: "0.7rem", color: "var(--accent)", fontFamily: "var(--font-mono)", marginBottom: "var(--s-2)" }}>{job.role}</p>
                {job.bullets.map((b) => (
                  <p key={b} style={{ fontSize: "0.72rem", color: "var(--fg-muted)", lineHeight: 1.55, display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>•</span>{b}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Row 3: Skills ── */}
        <div>
          <div className="ds-sec-head" style={{ marginBottom: "var(--s-4)" }}>
            <span className="idx" style={{ fontSize: "0.65rem" }}>03</span>
            <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>Skills</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-4)" }}>
            {skillGroups.map((group) => (
              <div key={group.label} style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "var(--s-1)" }}>
                  {group.label}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-1)" }}>
                  {group.items.map((item) => (
                    <span key={item} className="ds-chip" style={{ fontSize: "0.68rem", padding: "0.2rem 0.55rem" }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Row 4: Education & Certs ── */}
        <div>
          <div className="ds-sec-head" style={{ marginBottom: "var(--s-4)" }}>
            <span className="idx" style={{ fontSize: "0.65rem" }}>04</span>
            <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>Education & Certifications</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "var(--s-6)", alignItems: "start" }}>
            {/* Education */}
            <div className="ds-card" style={{ padding: "var(--s-4)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
              {/* Placeholder for university logo */}
              <div style={{ width: 40, height: 40, borderRadius: "var(--r-md)", background: "var(--bg-2)", border: "1px solid var(--border)", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-faint)", marginBottom: "var(--s-1)" }}>
                CSU
              </div>
              <span style={{ fontWeight: 700, fontSize: "var(--fs-sm)" }}>Charles Sturt University</span>
              <span style={{ fontSize: "0.72rem", color: "var(--fg-muted)", lineHeight: 1.5 }}>Master of Information Systems Security</span>
              <span className="t-mono t-faint" style={{ fontSize: "0.6rem" }}>2016 – 2017</span>
            </div>

            {/* Featured cert cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-3)" }}>
              {featuredCerts.map((cert) => (
                <div key={cert.abbr} className="ds-card" style={{ padding: "var(--s-4)", display: "flex", flexDirection: "column", gap: "var(--s-3)", alignItems: "flex-start" }}>
                  {/* Placeholder logo */}
                  <div style={{ width: 44, height: 44, borderRadius: "var(--r-md)", background: cert.color + "22", border: `1px solid ${cert.color}44`, display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 700, color: cert.color, textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.3 }}>
                    {cert.abbr}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, lineHeight: 1.4, whiteSpace: "pre-line" }}>{cert.name}</p>
                    <p style={{ fontSize: "0.65rem", color: "var(--fg-faint)", marginTop: 4 }}>{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#services" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: "var(--s-2)", textDecoration: "none" }}>
          {[0, 0.18, 0.36].map((delay, i) => (
            <motion.svg key={i} width="20" height="12" viewBox="0 0 20 12" fill="none"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}>
              <polyline points="2,2 10,10 18,2" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ))}
        </a>

      </div>
    </section>
  );
}
