"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = ["All", "LLM Apps", "Agents", "Infrastructure"] as const;
type Tab = (typeof TABS)[number];

const projects: { title: string; description: string; tags: string[]; category: Tab }[] = [
  {
    title: "RAG Pipeline Framework",
    description:
      "Production-ready retrieval-augmented generation pipeline with hybrid search, reranking, and automated evaluation metrics.",
    tags: ["LangChain", "Python", "PostgreSQL", "pgvector"],
    category: "LLM Apps",
  },
  {
    title: "Multi-Agent Orchestrator",
    description:
      "Orchestration layer for coordinating specialised AI agents with tool use, shared memory, and structured JSON output.",
    tags: ["LangGraph", "Python", "FastAPI", "Redis"],
    category: "Agents",
  },
  {
    title: "LLM Evaluation Suite",
    description:
      "Automated evaluation framework scoring LLM outputs on factuality, relevance, toxicity, and task-specific custom metrics.",
    tags: ["Python", "TypeScript", "OpenAI API"],
    category: "LLM Apps",
  },
  {
    title: "Vector Search Service",
    description:
      "High-throughput embedding and similarity search microservice with async batching, caching, and a REST + gRPC interface.",
    tags: ["Python", "Docker", "Redis", "AWS"],
    category: "Infrastructure",
  },
  {
    title: "Agentic Code Review Bot",
    description:
      "GitHub PR review agent that uses tool-calling to read diffs, run static analysis, and post contextual inline comments.",
    tags: ["Agents", "TypeScript", "GitHub API"],
    category: "Agents",
  },
  {
    title: "LLM Observability Platform",
    description:
      "Lightweight observability layer for tracing LLM calls, tracking latency, cost, and prompt/response diffs across deployments.",
    tags: ["Python", "Docker", "PostgreSQL", "AWS"],
    category: "Infrastructure",
  },
];

export default function Projects() {
  const [active, setActive] = useState<Tab>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-32 px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.p>

        {/* Filter tabs */}
        <motion.div
          className="flex gap-2 flex-wrap mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                active === tab
                  ? "bg-white text-black font-medium"
                  : "border border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="group bg-[#0f0f0f] border border-gray-800 rounded-xl p-6 flex flex-col gap-4 hover:border-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2 group-hover:text-gray-100 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#161616] border border-gray-800 text-gray-500 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
