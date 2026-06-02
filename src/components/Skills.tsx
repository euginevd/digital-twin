"use client";

import { motion } from "framer-motion";

const categories = [
  {
    ico: "⬡",
    title: "Agentic AI & LLM Systems",
    items: [
      "Multi-agent orchestration (LangGraph, LangChain, CrewAI)",
      "RAG pipelines, vector databases, tool use, MCP",
      "LLM evaluation, fine-tuning, prompt engineering",
    ],
    tags: ["LLMs", "RAG", "AGENTS"],
  },
  {
    ico: "◈",
    title: "AI / ML Engineering",
    items: [
      "Python (FastAPI), PyTorch, Hugging Face Transformers",
      "NLP, forecasting, classification, deep learning",
      "Real-time inference APIs and model deployment",
    ],
    tags: ["PYTORCH", "FASTAPI", "HF"],
  },
  {
    ico: "▣",
    title: "ML Platforms & MLOps",
    items: [
      "End-to-end ML pipelines — ingestion, training, deployment",
      "CI/CD, Docker, Kubernetes, Terraform",
      "AWS, GCP, Azure — scalable AI infrastructure",
    ],
    tags: ["DOCKER", "K8S", "AWS"],
  },
  {
    ico: "✦",
    title: "Data & Infrastructure",
    items: [
      "PostgreSQL, Redis, pgvector, BigQuery",
      "Data pipelines, ETL, multi-source integration",
      "Observability, cost tracking, latency optimisation",
    ],
    tags: ["POSTGRES", "REDIS", "ETL"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="l-section">
      <div className="l-wrap">
        <div className="ds-sec-head">
          <span className="idx">02</span>
          <h2 className="t-h2">Where I go deep</h2>
          <span className="t-mono t-faint">architecture through delivery</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="ds-card ds-card-hover"
              style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)", minHeight: 200 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  border: "1px solid var(--accent-line)",
                  background: "var(--accent-soft)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                }}
              >
                {cat.ico}
              </span>

              <h3 className="t-h3">{cat.title}</h3>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {cat.items.map((item) => (
                  <li key={item} className="t-muted" style={{ fontSize: "var(--fs-sm)", lineHeight: 1.5, display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "auto", display: "flex", gap: "var(--s-2)", flexWrap: "wrap" }}>
                {cat.tags.map((tag) => (
                  <span key={tag} className="t-mono t-faint" style={{ lineHeight: 1.7 }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
