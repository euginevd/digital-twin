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
    const duration = 1400;
    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <div ref={ref}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-2xl)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--accent)", lineHeight: 1 }}>
        {count}<span style={{ color: "var(--accent)" }}>{suffix}</span>
      </p>
      <p className="t-mono t-faint" style={{ marginTop: "var(--s-2)" }}>{label}</p>
    </div>
  );
}

const terminalLines = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "AI Engineer · Sydney, Australia" },
  { type: "cmd", text: "mission" },
  { type: "out", text: "Bridge research to production-grade AI" },
  { type: "cmd", text: "impact" },
  { type: "out", text: "Scalable, reliable, cost-efficient systems" },
  { type: "cmd", text: "mode" },
  { type: "out", text: "Open to Freelance · Remote · Global" },
  { type: "cursor" },
];

export default function About() {
  return (
    <section id="about" className="l-section l-alt">
      <div className="l-wrap">
        <div className="ds-sec-head">
          <span className="idx">01</span>
          <h2 className="t-h2">About me</h2>
          <span className="t-mono t-faint">background & focus</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              className="t-lead"
              style={{ maxWidth: "52ch", marginBottom: "var(--s-7)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              I help companies integrate AI into their systems — with deep expertise in
              LLMs, agentic workflows, and production ML infrastructure. I own system
              design, ship production code, and care deeply about reliability at scale.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Counter target={5}  label="Years in AI/ML" />
              <Counter target={20} label="Projects shipped" />
              <Counter target={8}  label="Open source repos" />
              <Counter target={10} label="Tools built" />
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--s-2)",
                padding: "0.75rem var(--s-4)",
                background: "var(--bg-2)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
              <span className="t-mono t-faint" style={{ marginLeft: "var(--s-3)" }}>eugine@portfolio:~</span>
            </div>
            <div style={{ background: "var(--bg-2)", padding: "var(--s-5)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
              {terminalLines.map((line, i) => {
                if (line.type === "cursor") {
                  return (
                    <p key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "var(--accent)" }}>eugine@au:~$</span>
                      <motion.span
                        style={{ display: "inline-block", width: 8, height: 14, background: "var(--fg-faint)", borderRadius: 2 }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </p>
                  );
                }
                if (line.type === "cmd") {
                  return (
                    <p key={i}>
                      <span style={{ color: "var(--accent)" }}>eugine@au:~$</span>{" "}
                      <span style={{ color: "var(--fg)" }}>{line.text}</span>
                    </p>
                  );
                }
                return (
                  <p key={i} style={{ color: "var(--fg-muted)", paddingLeft: 0 }}>{line.text}</p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
