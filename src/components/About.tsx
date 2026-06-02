"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({
  target,
  suffix = "+",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const duration = 1400;
    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-bold text-gray-900 tabular-nums">
        {count}
        <span className="text-violet-500">{suffix}</span>
      </p>
      <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-2">{label}</p>
    </div>
  );
}

const terminalLines = [
  { type: "cmd", prompt: "eugine@au:~$", text: "whoami" },
  { type: "out", text: "AI Engineer · Sydney, Australia" },
  { type: "cmd", prompt: "eugine@au:~$", text: "mission" },
  { type: "out", text: "Bridge research to production-grade AI" },
  { type: "cmd", prompt: "eugine@au:~$", text: "impact" },
  { type: "out", text: "Scalable, reliable, cost-efficient AI" },
  { type: "cmd", prompt: "eugine@au:~$", text: "mode" },
  { type: "out", text: "Open to Freelance · Remote · Global" },
  { type: "cursor" },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#f5f3ff]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold uppercase tracking-widest text-violet-600 mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — bio + counters */}
          <div>
            <motion.p
              className="text-gray-600 leading-relaxed text-lg mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              I help companies integrate AI into their systems and processes — with deep expertise
              in LLMs, agentic workflows, and production ML infrastructure. I own system design,
              ship production code, and care deeply about reliability at scale.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Counter target={5} label="Years Experience" />
              <Counter target={20} label="Projects Shipped" />
              <Counter target={8} label="Open Source Repos" />
              <Counter target={10} suffix="+" label="Tools Built" />
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            className="rounded-xl overflow-hidden font-mono text-sm shadow-xl"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e2e] border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-gray-500 text-xs">eugine@portfolio:~$</span>
            </div>
            <div className="bg-[#1e1e2e] p-6 space-y-2">
              {terminalLines.map((line, i) => {
                if (line.type === "cursor") {
                  return (
                    <p key={i} className="flex items-center gap-1.5">
                      <span className="text-violet-400">eugine@au:~$</span>
                      <motion.span
                        className="inline-block w-2 h-4 bg-gray-400 rounded-sm"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </p>
                  );
                }
                if (line.type === "cmd") {
                  return (
                    <p key={i}>
                      <span className="text-violet-400">{line.prompt}</span>{" "}
                      <span className="text-white">{line.text}</span>
                    </p>
                  );
                }
                return (
                  <p key={i} className="text-gray-400 pl-0">{line.text}</p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
