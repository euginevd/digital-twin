"use client";

import { motion } from "framer-motion";

const categories = [
  {
    icon: "🤖",
    title: "Agentic AI & LLM Systems",
    skills: [
      "Multi-agent orchestration (LangGraph, LangChain, CrewAI)",
      "RAG pipelines, vector databases, tool use, MCP",
      "LLM evaluation, fine-tuning, prompt engineering",
    ],
  },
  {
    icon: "🧠",
    title: "AI / ML Engineering",
    skills: [
      "Python (FastAPI), PyTorch, Hugging Face Transformers",
      "NLP, forecasting, classification, deep learning",
      "Real-time inference APIs and model deployment",
    ],
  },
  {
    icon: "⚙️",
    title: "ML Platforms & MLOps",
    skills: [
      "End-to-end ML pipelines — ingestion, training, deployment",
      "CI/CD, Docker, Kubernetes, Terraform",
      "AWS, GCP, Azure — scalable AI infrastructure",
    ],
  },
  {
    icon: "📊",
    title: "Data & Infrastructure",
    skills: [
      "PostgreSQL, Redis, pgvector, BigQuery",
      "Data pipelines, ETL, multi-source integration",
      "Observability, cost tracking, latency optimisation",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-[#f5f3ff]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold uppercase tracking-widest text-violet-600 mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-violet-100 hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-4 block">{cat.icon}</span>
              <h3 className="text-gray-900 font-bold text-lg mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
                    <span className="text-violet-400 mt-0.5 shrink-0">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
