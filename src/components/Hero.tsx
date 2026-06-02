"use client";

import { motion } from "framer-motion";

function FadeUp({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const techStack = [
  { label: "LLMs", color: "bg-violet-900/60 text-violet-300 border-violet-700/50" },
  { label: "RAG", color: "bg-indigo-900/60 text-indigo-300 border-indigo-700/50" },
  { label: "LangChain", color: "bg-violet-900/60 text-violet-300 border-violet-700/50" },
  { label: "Agents", color: "bg-fuchsia-900/60 text-fuchsia-300 border-fuchsia-700/50" },
  { label: "PyTorch", color: "bg-indigo-900/60 text-indigo-300 border-indigo-700/50" },
  { label: "FastAPI", color: "bg-violet-900/60 text-violet-300 border-violet-700/50" },
  { label: "Python", color: "bg-blue-900/60 text-blue-300 border-blue-700/50" },
  { label: "Kubernetes", color: "bg-indigo-900/60 text-indigo-300 border-indigo-700/50" },
  { label: "AWS", color: "bg-violet-900/60 text-violet-300 border-violet-700/50" },
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#0d0e1a] flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center py-24">

        {/* Left — text */}
        <div>
          <FadeUp delay={0}>
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-violet-400 mb-6">
              AI Engineer · Sydney, Australia
            </span>
          </FadeUp>

          <FadeUp delay={0.12}>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-3">
              Eugine<br />Dsylva
            </h1>
          </FadeUp>

          <FadeUp delay={0.24}>
            <p className="text-xl md:text-2xl font-light text-violet-400 mb-6">
              AI Engineer
            </p>
          </FadeUp>

          <FadeUp delay={0.36}>
            <p className="text-gray-400 leading-relaxed max-w-md mb-10">
              Building intelligent systems that bridge the gap between research
              and production. Focused on LLMs, agentic workflows, and scalable
              AI infrastructure.
            </p>
          </FadeUp>

          <FadeUp delay={0.48}>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#projects"
                className="px-7 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-colors"
              >
                Explore Projects
              </a>
              <a
                href="#contact"
                className="px-7 py-3 border border-violet-600 text-violet-400 hover:bg-violet-900/30 text-sm font-semibold rounded-full transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Right — tech card */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="relative"
        >
          <div className="rounded-2xl border border-violet-800/40 bg-[#13142a] p-8 shadow-2xl shadow-violet-950/50">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-gray-500 text-xs font-mono">tech-stack.json</span>
            </div>

            <p className="text-gray-500 text-xs uppercase tracking-widest mb-5 font-mono">
              // core competencies
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((t, i) => (
                <motion.span
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-mono ${t.color}`}
                >
                  {t.label}
                </motion.span>
              ))}
            </div>

            <div className="border-t border-white/5 pt-6 grid grid-cols-3 gap-4 text-center">
              {[
                { value: "5+", label: "Years" },
                { value: "20+", label: "Projects" },
                { value: "8+", label: "Open Source" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-gray-600 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -inset-1 rounded-2xl bg-violet-600/10 blur-xl -z-10" />
        </motion.div>

      </div>
    </section>
  );
}
