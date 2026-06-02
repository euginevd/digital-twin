"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["All", "LLM Apps", "Agents", "Infrastructure"] as const;
type Tab = (typeof TABS)[number];

const projects: {
  title: string;
  description: string;
  tags: string[];
  category: Tab;
  accent: string;
}[] = [
  {
    title: "RAG Pipeline Framework",
    description:
      "Production-ready retrieval-augmented generation pipeline with hybrid search, reranking, and automated evaluation metrics.",
    tags: ["LangChain", "Python", "pgvector"],
    category: "LLM Apps",
    accent: "oklch(0.72 0.18 47)",
  },
  {
    title: "Multi-Agent Orchestrator",
    description:
      "Orchestration layer for coordinating specialised AI agents with tool use, shared memory, and structured JSON output.",
    tags: ["LangGraph", "Python", "FastAPI", "Redis"],
    category: "Agents",
    accent: "oklch(0.65 0.17 220)",
  },
  {
    title: "LLM Evaluation Suite",
    description:
      "Automated evaluation framework scoring LLM outputs on factuality, relevance, toxicity, and task-specific custom metrics.",
    tags: ["Python", "TypeScript", "OpenAI API"],
    category: "LLM Apps",
    accent: "oklch(0.70 0.15 160)",
  },
  {
    title: "Vector Search Service",
    description:
      "High-throughput embedding and similarity search microservice with async batching, caching, and REST + gRPC interface.",
    tags: ["Python", "Docker", "Redis", "AWS"],
    category: "Infrastructure",
    accent: "oklch(0.60 0.18 280)",
  },
  {
    title: "Agentic Code Review Bot",
    description:
      "GitHub PR review agent using tool-calling to read diffs, run static analysis, and post contextual inline comments.",
    tags: ["Agents", "TypeScript", "GitHub API"],
    category: "Agents",
    accent: "oklch(0.65 0.17 30)",
  },
  {
    title: "LLM Observability Platform",
    description:
      "Lightweight observability layer for tracing LLM calls, tracking latency, cost, and prompt/response diffs across deployments.",
    tags: ["Python", "Docker", "PostgreSQL", "AWS"],
    category: "Infrastructure",
    accent: "oklch(0.68 0.16 330)",
  },
];

export default function Projects() {
  const [active, setActive] = useState<Tab>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="l-section">
      <div className="l-wrap">
        <div className="ds-sec-head">
          <span className="idx">04</span>
          <h2 className="t-h2">Featured projects</h2>
          <span className="t-mono t-faint">selected work</span>
        </div>

        {/* Filter tabs */}
        <motion.div
          style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap", marginBottom: "var(--s-7)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                background: "transparent",
                border: "none",
                padding: "0.4rem 0",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--fs-mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: active === tab ? "var(--accent)" : "var(--fg-faint)",
                borderBottom: active === tab ? "2px solid var(--accent)" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                marginRight: "var(--s-4)",
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <motion.div layout className="grid md:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="ds-card ds-card-hover"
                style={{ overflow: "hidden", padding: 0, display: "flex", flexDirection: "column" }}
              >
                {/* Accent header strip */}
                <div
                  style={{
                    height: 4,
                    background: project.accent,
                    opacity: 0.7,
                  }}
                />
                <div style={{ padding: "var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-4)", flex: 1 }}>
                  <div>
                    <h3 className="t-h3" style={{ marginBottom: "var(--s-2)" }}>{project.title}</h3>
                    <p className="t-muted" style={{ fontSize: "var(--fs-sm)", lineHeight: 1.65 }}>
                      {project.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-2)", marginTop: "auto" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} className="ds-chip">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          style={{ display: "flex", justifyContent: "center", marginTop: "var(--s-8)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="https://github.com/euginevd"
            target="_blank"
            rel="noopener noreferrer"
            className="ds-btn ds-btn-ghost"
          >
            View all on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
