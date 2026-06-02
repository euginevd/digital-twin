"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "Cloud & Network Edge Security",
  "Cloud Native Application Protection",
  "Identity & Endpoint",
] as const;
type Category = (typeof CATEGORIES)[number];

const projects: {
  title: string;
  description: string;
  tags: string[];
  category: Category;
}[] = [
  // Cloud & Network Edge Security
  {
    title: "Zero Trust Hub-and-Spoke",
    description: "Designed and built Zero Trust network architecture on AWS Landing Zone Accelerator across 70+ accounts, securing 300+ web apps and APIs via Cloudflare WAF and AWS Network Firewall.",
    tags: ["AWS LZA", "Cloudflare WAF", "Network Firewall", "Zero Trust"],
    category: "Cloud & Network Edge Security",
  },
  {
    title: "Edge WAF & API Protection",
    description: "Consolidated ingress security across enterprise applications using Cloudflare WAF, TLS hardening, ADC/WAF policy-as-code, and API gateway controls at scale.",
    tags: ["Cloudflare", "API Security", "TLS", "Policy-as-Code"],
    category: "Cloud & Network Edge Security",
  },
  {
    title: "Cloud Ingress Migration",
    description: "Led migration of on-premises perimeter controls to cloud-native ingress, including MFA enforcement, cloud firewall policy standardisation, and network segmentation uplift.",
    tags: ["AWS", "Azure", "Network Segmentation", "MFA"],
    category: "Cloud & Network Edge Security",
  },

  // Cloud Native Application Protection
  {
    title: "CNAPP Guardrails Deployment",
    description: "Built policy-as-code guardrails aligned to CNAPP frameworks across Kubernetes, multi-cloud AWS/Azure, and serverless — driving measurable reduction in cloud security risk.",
    tags: ["CNAPP", "Kubernetes", "AWS", "Azure", "Terraform"],
    category: "Cloud Native Application Protection",
  },
  {
    title: "DevSecOps Pipeline Integration",
    description: "Embedded full-spectrum AppSec controls into CI/CD and GitOps pipelines — SAST, SCA, DAST, IaC security, secrets management, and container image/runtime scanning.",
    tags: ["DevSecOps", "SAST", "DAST", "SCA", "GitOps"],
    category: "Cloud Native Application Protection",
  },
  {
    title: "Cloud Security Posture Assessments",
    description: "Led posture assessments across AWS, Azure, and SaaS environments, implementing CNAPP-aligned controls across compute, containers, and serverless workloads.",
    tags: ["CSPM", "AWS", "Azure", "SaaS Security"],
    category: "Cloud Native Application Protection",
  },

  // Identity & Endpoint
  {
    title: "M365 Security Remediation",
    description: "Delivered enterprise-wide Microsoft 365 security uplift across Entra ID, Identity Protection, Intune, Defender XDR, DLP, and CASB — reducing high-risk findings by ~70%.",
    tags: ["Entra ID", "Defender XDR", "Intune", "CASB", "DLP"],
    category: "Identity & Endpoint",
  },
  {
    title: "Zero Trust Identity Rollout",
    description: "Implemented Zero Trust access principles for a globally distributed workforce — VDI hardening, MDM, MFA, and remote access security across 30+ enterprise applications.",
    tags: ["Zero Trust", "VDI", "MDM", "MFA"],
    category: "Identity & Endpoint",
  },
  {
    title: "Essential Eight Uplift",
    description: "Remediated ransomware and privilege-escalation risk across SOCI critical-infrastructure IT/OT environments, aligned to Essential Eight maturity model requirements.",
    tags: ["Essential Eight", "IT/OT", "SOCI", "Ransomware"],
    category: "Identity & Endpoint",
  },
];

export default function Projects() {
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const filtered = projects.filter((p) => p.category === active);

  return (
    <section id="projects" style={{ paddingBlock: "clamp(1.5rem, 3vw, 2.5rem)", borderTop: "1px solid var(--border)" }}>
      <div className="l-wrap">
        <div className="ds-sec-head" style={{ marginBottom: "var(--s-3)" }}>
          <span className="idx" style={{ fontSize: "0.65rem" }}>04</span>
          <h2 className="t-h2" style={{ fontSize: "var(--fs-xl)" }}>Featured projects</h2>
          <span className="t-mono t-faint">selected work</span>
        </div>

        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            flexWrap: "wrap",
            marginBottom: "var(--s-4)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: active === cat ? "2px solid var(--accent)" : "2px solid transparent",
                marginBottom: -1,
                padding: "0.6rem var(--s-5)",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-mono)",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: active === cat ? "var(--accent)" : "var(--fg-faint)",
                transition: "color 0.2s, border-color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards — one row of 3 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "var(--s-5)",
            }}
          >
            {filtered.map((project) => (
              <article
                key={project.title}
                className="ds-card ds-card-hover"
                style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)", padding: "var(--s-4)" }}
              >
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-sm)", letterSpacing: "-0.01em" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.75rem", color: "var(--fg-muted)", lineHeight: 1.6, flex: 1 }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-1)" }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="ds-chip" style={{ fontSize: "0.65rem", padding: "0.18rem 0.5rem" }}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all */}
        <motion.div
          style={{ display: "flex", justifyContent: "center", marginTop: "var(--s-4)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="https://github.com/euginevd" target="_blank" rel="noopener noreferrer" className="ds-btn ds-btn-ghost">
            View all projects →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
