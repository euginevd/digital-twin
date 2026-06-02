"use client";

import { motion } from "framer-motion";

const services = [
  {
    ico: "⚡",
    badge: "Build",
    num: "1",
    title: "LLM Application Development",
    description:
      "End-to-end development of production LLM applications — RAG systems, chatbots, document intelligence, and API-first AI products.",
    outcome:
      "A robust, production-ready LLM application — evaluated, monitored, and ready to scale.",
  },
  {
    ico: "🏗️",
    badge: "Design",
    num: "2",
    title: "Agentic Systems Architecture",
    description:
      "Design and implementation of multi-agent systems with tool use, shared memory, structured outputs, and orchestration frameworks.",
    outcome:
      "Reliable agent pipelines that automate complex workflows end-to-end.",
  },
  {
    ico: "☁️",
    badge: "Scale",
    num: "3",
    title: "AI Infrastructure & MLOps",
    description:
      "ML platform engineering — data pipelines, training infrastructure, deployment, CI/CD, and model lifecycle management.",
    outcome:
      "Fully automated, monitored ML systems running reliably in production.",
  },
  {
    ico: "🎯",
    badge: "Optimise",
    num: "4",
    title: "LLM Evaluation & Optimisation",
    description:
      "Performance evaluation, cost reduction, latency optimisation, and observability for LLM systems in production.",
    outcome:
      "Faster, cheaper, more accurate AI — reduced inference cost, improved output quality.",
  },
];

export default function Services() {
  return (
    <section id="services" className="l-section l-alt">
      <div className="l-wrap">
        <div className="ds-sec-head">
          <span className="idx">03</span>
          <h2 className="t-h2">What I deliver</h2>
          <span className="t-mono t-faint">services & outcomes</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="ds-card ds-card-hover"
              style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <span style={{ fontSize: "1.6rem" }}>{s.ico}</span>
                <span className="ds-chip is-accent ds-btn-sm">
                  {s.num}. {s.badge}
                </span>
              </div>

              <h3 className="t-h3">{s.title}</h3>
              <p className="t-muted" style={{ fontSize: "var(--fs-sm)", lineHeight: 1.65 }}>{s.description}</p>

              <div
                style={{
                  borderLeft: "3px solid var(--accent)",
                  paddingLeft: "var(--s-4)",
                  paddingBlock: "var(--s-3)",
                  background: "var(--accent-soft)",
                  borderRadius: "0 var(--r-sm) var(--r-sm) 0",
                  marginTop: "auto",
                }}
              >
                <p style={{ fontSize: "var(--fs-sm)", fontWeight: 600, lineHeight: 1.45, color: "var(--fg)" }}>{s.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
