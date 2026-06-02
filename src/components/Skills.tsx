"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "SQL", "Bash"],
  },
  {
    title: "AI / ML",
    skills: ["LLMs", "RAG", "Agents", "Fine-tuning", "Embeddings", "RLHF"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["LangChain", "LlamaIndex", "PyTorch", "FastAPI", "Next.js", "Hugging Face"],
  },
  {
    title: "Infrastructure",
    skills: ["Docker", "AWS", "GCP", "Kubernetes", "PostgreSQL", "Redis"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-4">
                {cat.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-[#111] border border-gray-800 text-gray-300 text-sm rounded-lg hover:border-gray-600 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
