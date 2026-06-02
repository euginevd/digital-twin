"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "1",
    badge: "Build",
    icon: "⚡",
    title: "LLM Application Development",
    description:
      "End-to-end development of production LLM applications — RAG systems, chatbots, document intelligence, and API-first AI products.",
    outcome:
      "A robust, production-ready LLM application — evaluated, monitored, and ready to scale.",
  },
  {
    number: "2",
    badge: "Design",
    icon: "🏗️",
    title: "Agentic Systems Architecture",
    description:
      "Design and implementation of multi-agent systems with tool use, shared memory, structured outputs, and orchestration frameworks.",
    outcome:
      "Reliable agent pipelines that automate complex workflows end-to-end.",
  },
  {
    number: "3",
    badge: "Scale",
    icon: "☁️",
    title: "AI Infrastructure & MLOps",
    description:
      "ML platform engineering — data pipelines, training infrastructure, deployment, CI/CD, and model lifecycle management.",
    outcome:
      "Fully automated, monitored ML systems running reliably in production.",
  },
  {
    number: "4",
    badge: "Optimise",
    icon: "🎯",
    title: "LLM Evaluation & Optimisation",
    description:
      "Performance evaluation, cost reduction, latency optimisation, and observability for LLM systems already in production.",
    outcome:
      "Faster, cheaper, more accurate AI — reduced inference cost and improved output quality.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-[#f5f3ff]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold uppercase tracking-widest text-violet-600 mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What I Deliver
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-violet-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{s.icon}</span>
                <span className="px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">
                  {s.number}. {s.badge}
                </span>
              </div>

              <h3 className="text-gray-900 font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>

              <div className="border-l-4 border-violet-500 bg-violet-50 pl-4 py-3 rounded-r-lg">
                <p className="text-gray-700 text-sm font-medium leading-snug">{s.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
