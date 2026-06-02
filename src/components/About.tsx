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
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2.8rem, 4.5vw, 5.5rem)",
        fontWeight: 700,
        color: "var(--accent)",
        letterSpacing: "-0.04em",
        lineHeight: 1,
      }}>
        {count}{suffix}
      </span>
      <span className="t-mono t-faint" style={{ fontSize: "0.72rem" }}>{label}</span>
    </div>
  );
}

const skills = [
  "Zero Trust", "CNAPP", "CSPM", "Cloudflare WAF", "AWS Network Firewall",
  "DevSecOps", "SAST", "DAST", "SCA", "IaC Security", "Container Security",
  "Entra ID", "Defender XDR", "Intune", "CASB", "DLP",
  "AWS", "Azure", "Kubernetes", "Terraform", "Essential Eight",
];

const certs = [
  { abbr: "CISSP", color: "#00B140" },
  { abbr: "CISA",  color: "#003DA5" },
  { abbr: "AWS SAP", color: "#FF9900" },
  { abbr: "Azure Exp", color: "#0078D4" },
];

const GAP = "clamp(0.5rem, 0.75vw, 0.75rem)";

const cell: React.CSSProperties = {
  background: "var(--bg-2)",
  border: "1px solid var(--border)",
  borderRadius: "var(--r-xl)",
  padding: "clamp(1.5rem, 2.5vw, 2.25rem)",
  overflow: "hidden",
  minHeight: 0,
  minWidth: 0,
};

function FadeCell({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="l-alt"
      style={{
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        padding: GAP,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: GAP,
          maxWidth: "var(--maxw)",
          width: "100%",
          marginInline: "auto",
          minHeight: 0,
        }}
      >

        {/* ── Bio + Certs ── col 1–2, rows 1–2 */}
        <FadeCell
          delay={0}
          style={{
            ...cell,
            gridColumn: "1 / 3",
            gridRow: "1 / 3",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top: kicker + bio */}
          <div>
            <span className="t-kicker" style={{ display: "block", marginBottom: "var(--s-5)" }}>
              About
            </span>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.15rem, 1.75vw, 1.6rem)",
              fontWeight: 400,
              color: "var(--fg-muted)",
              lineHeight: 1.7,
              maxWidth: "34ch",
            }}>
              I help companies secure cloud systems at scale — Zero Trust architecture, CNAPP, and DevSecOps across AWS and Azure. End-to-end design through delivery, focused on reducing real risk in complex environments.
            </p>
          </div>

          {/* Bottom: cert pill badges */}
          <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
            {certs.map((cert) => (
              <span
                key={cert.abbr}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "var(--r-full)",
                  background: cert.color + "18",
                  border: `1px solid ${cert.color}44`,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: cert.color,
                  whiteSpace: "nowrap",
                  letterSpacing: "0.03em",
                }}
              >
                {cert.abbr}
              </span>
            ))}
          </div>
        </FadeCell>

        {/* ── 15+ ── col 3, row 1 */}
        <FadeCell delay={0.07} style={{ ...cell, gridColumn: "3", gridRow: "1", display: "flex", flexDirection: "column" }}>
          <Counter target={15} label="Years in security" />
        </FadeCell>

        {/* ── 20+ ── col 4, row 1 */}
        <FadeCell delay={0.12} style={{ ...cell, gridColumn: "4", gridRow: "1", display: "flex", flexDirection: "column" }}>
          <Counter target={20} label="Engagements" />
        </FadeCell>

        {/* ── 12+ ── col 3, row 2 */}
        <FadeCell delay={0.17} style={{ ...cell, gridColumn: "3", gridRow: "2", display: "flex", flexDirection: "column" }}>
          <Counter target={12} label="Certifications" />
        </FadeCell>

        {/* ── 70% ── col 4, row 2 */}
        <FadeCell delay={0.22} style={{ ...cell, gridColumn: "4", gridRow: "2", display: "flex", flexDirection: "column" }}>
          <Counter target={70} suffix="%" label="Avg risk reduction" />
        </FadeCell>

        {/* ── Skills ── full width, row 3 */}
        <FadeCell
          delay={0.27}
          style={{
            ...cell,
            gridColumn: "1 / 5",
            gridRow: "3",
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--s-2)",
            alignContent: "center",
          }}
        >
          {skills.map((skill) => (
            <span key={skill} className="ds-chip" style={{ fontSize: "0.78rem" }}>
              {skill}
            </span>
          ))}
        </FadeCell>

      </div>
    </section>
  );
}
