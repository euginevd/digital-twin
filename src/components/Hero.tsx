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

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-3xl">
        <FadeUp delay={0} className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
          Hello, I&apos;m
        </FadeUp>

        <FadeUp delay={0.12} className="text-5xl md:text-7xl font-bold text-white leading-tight mb-3">
          Eugine Dsylva
        </FadeUp>

        <FadeUp delay={0.24} className="text-2xl md:text-3xl font-light text-gray-400 mb-6">
          AI Engineer
        </FadeUp>

        <FadeUp
          delay={0.36}
          className="text-base md:text-lg text-gray-500 max-w-xl leading-relaxed mb-10"
        >
          Building intelligent systems that bridge the gap between research and
          production. Focused on LLMs, agentic workflows, and scalable AI infrastructure.
        </FadeUp>

        <FadeUp delay={0.48} className="flex gap-4 flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-700 text-gray-300 text-sm font-medium rounded-full hover:border-gray-400 hover:text-white transition-colors"
          >
            Get in Touch
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
