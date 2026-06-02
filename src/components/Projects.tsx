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
  gradient: string;
}[] = [
  {
    title: "RAG Pipeline Framework",
    description:
      "Production-ready retrieval-augmented generation pipeline with hybrid search, reranking, and automated evaluation metrics.",
    tags: ["LangChain", "Python", "pgvector"],
    category: "LLM Apps",
    gradient: "from-violet-600 to-indigo-700",
  },
  {
    title: "Multi-Agent Orchestrator",
    description:
      "Orchestration layer for coordinating specialised AI agents with tool use, shared memory, and structured JSON output.",
    tags: ["LangGraph", "Python", "FastAPI", "Redis"],
    category: "Agents",
    gradient: "from-indigo-600 to-blue-700",
  },
  {
    title: "LLM Evaluation Suite",
    description:
      "Automated evaluation framework scoring LLM outputs on factuality, relevance, toxicity, and task-specific custom metrics.",
    tags: ["Python", "TypeScript", "OpenAI API"],
    category: "LLM Apps",
    gradient: "from-fuchsia-600 to-violet-700",
  },
  {
    title: "Vector Search Service",
    description:
      "High-throughput embedding and similarity search microservice with async batching, caching, and REST + gRPC interface.",
    tags: ["Python", "Docker", "Redis", "AWS"],
    category: "Infrastructure",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    title: "Agentic Code Review Bot",
    description:
      "GitHub PR review agent that uses tool-calling to read diffs, run static analysis, and post contextual inline comments.",
    tags: ["Agents", "TypeScript", "GitHub API"],
    category: "Agents",
    gradient: "from-violet-700 to-purple-800",
  },
  {
    title: "LLM Observability Platform",
    description:
      "Lightweight observability layer for tracing LLM calls, tracking latency, cost, and prompt/response diffs across deployments.",
    tags: ["Python", "Docker", "PostgreSQL", "AWS"],
    category: "Infrastructure",
    gradient: "from-indigo-700 to-violet-800",
  },
];

export default function Projects() {
  const [active, setActive] = useState<Tab>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-32 px-6 bg-[#f5f3ff]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold uppercase tracking-widest text-violet-600 mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        {/* Filter tabs */}
        <motion.div
          className="flex gap-2 flex-wrap justify-center mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-1.5 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 ${
                active === tab
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="group bg-white rounded-2xl overflow-hidden border border-violet-100 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Colored header */}
                <div className={`h-36 bg-linear-to-br ${project.gradient} flex items-center justify-center`}>
                  <span className="text-white/20 text-7xl font-black select-none">
                    {project.title[0]}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-gray-900 font-bold text-base mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-violet-50 border border-violet-200 text-violet-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="https://github.com/euginevd"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-colors"
          >
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
