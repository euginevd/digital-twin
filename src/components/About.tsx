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
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);
  return (
    <div ref={ref}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div className="t-mono t-faint" style={{ fontSize: "0.65rem", marginTop: 4 }}>{label}</div>
    </div>
  );
}

const jobs = [
  {
    company: "experteq",
    role: "Principal Consultant — Cloud & Security",
    period: "2020 – 2026 · Sydney",
    bullets: [
      "Zero Trust on AWS LZA across 70+ accounts, 300+ apps via Cloudflare WAF & Network Firewall.",
      "CNAPP guardrails, DevSecOps pipeline integration (SAST, SCA, DAST, IaC), M365 remediation — ~70% risk reduction.",
    ],
  },
  {
    company: "beIN MEDIA GROUP",
    role: "System Specialist — Security Engineering",
    period: "2015 – 2019 · Doha",
    bullets: [
      "Vuln management & pen testing across IT/OT — 70% reduction in critical findings. Sovereign private cloud security design.",
    ],
  },
  {
    company: "Global Eagle",
    role: "Early Career — Network & Infrastructure",
    period: "2008 – 2015 · UAE",
    bullets: [
      "Infrastructure & virtualisation consulting across 20+ UAE government engagements.",
    ],
  },
];

const certs = [
  "CISSP", "CISA", "CCIE Security", "TOGAF 9",
  "AWS SAP", "AWS Security", "AWS Networking", "AWS DevOps",
  "Azure Architect Expert", "Azure Security Engineer",
];

const skills = [
  "Zero Trust", "CNAPP", "CSPM", "Cloudflare WAF", "AWS Network Firewall",
  "SAST", "DAST", "SCA", "IaC Security", "DevSecOps",
  "Entra ID", "Defender XDR", "Intune", "CASB", "DLP",
  "AWS", "Azure", "Kubernetes", "Terraform", "Essential Eight",
];

export default function About() {
  return (
    <section
      id="about"
      className="l-alt"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "clamp(2rem, 4vw, 3rem)" }}
    >
      <div className="l-wrap" style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>

        {/* ── Top: Bio + Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-6)", alignItems: "start" }}>
          <div>
            <div className="ds-sec-head" style={{ marginBottom: "var(--s-3)" }}>
              <span className="idx" style={{ fontSize: "0.65rem" }}>01</span>
              <h2 className="t-h2">About me</h2>
            </div>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--fg-muted)", lineHeight: 1.65, maxWidth: "48ch" }}>
              I help companies secure cloud systems at scale — Zero Trust architecture, CNAPP, and DevSecOps across AWS and Azure. End-to-end design through delivery, focused on reducing real risk in complex environments.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-4)", paddingTop: "var(--s-6)" }}>
            <Counter target={15} label="Years in security" />
            <Counter target={20} label="Engagements" />
            <Counter target={12} label="Certifications" />
            <Counter target={70} suffix="%" label="Avg risk reduction" />
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Middle: Experience | Education + Certs ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-6)", alignItems: "start" }}>

          {/* Experience */}
          <div>
            <div className="ds-sec-head" style={{ marginBottom: "var(--s-4)" }}>
              <span className="idx" style={{ fontSize: "0.65rem" }}>02</span>
              <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>Experience</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
              {jobs.map((job, i) => (
                <div key={job.company} style={{ paddingBottom: "var(--s-4)", borderBottom: i < jobs.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--s-1)" }}>
                    <span style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>{job.company}</span>
                    <span className="t-mono t-faint" style={{ fontSize: "0.65rem" }}>{job.period}</span>
                  </div>
                  <p style={{ fontSize: "0.72rem", color: "var(--accent)", marginBottom: "var(--s-2)", fontFamily: "var(--font-mono)" }}>{job.role}</p>
                  {job.bullets.map((b) => (
                    <p key={b} style={{ fontSize: "0.75rem", color: "var(--fg-muted)", lineHeight: 1.55, display: "flex", gap: "var(--s-2)" }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>•</span>{b}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Education + Certs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
            <div>
              <div className="ds-sec-head" style={{ marginBottom: "var(--s-3)" }}>
                <span className="idx" style={{ fontSize: "0.65rem" }}>03</span>
                <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>Education & Certs</h2>
              </div>
              <p style={{ fontSize: "var(--fs-sm)", fontWeight: 600 }}>Charles Sturt University</p>
              <p style={{ fontSize: "0.75rem", color: "var(--fg-muted)", marginTop: 2 }}>Master of Information Systems Security · 2016–2017</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-2)" }}>
              {certs.map((c) => (
                <span key={c} className="ds-chip is-accent" style={{ fontSize: "0.65rem", padding: "0.22rem 0.55rem" }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Bottom: Skills ── */}
        <div>
          <div className="ds-sec-head" style={{ marginBottom: "var(--s-3)" }}>
            <span className="idx" style={{ fontSize: "0.65rem" }}>04</span>
            <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>Skills</h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-2)" }}>
            {skills.map((s) => (
              <span key={s} className="ds-chip" style={{ fontSize: "0.72rem" }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#services" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: "var(--s-4)", textDecoration: "none" }}>
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
