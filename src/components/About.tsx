"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, suffix = "+", label }: { target: number; suffix?: string; label: string }) {
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
      <p className="text-4xl font-bold text-white tabular-nums">
        {count}
        <span className="text-gray-500">{suffix}</span>
      </p>
      <p className="text-xs uppercase tracking-widest text-gray-600 mt-2">{label}</p>
    </div>
  );
}

const terminalLines = [
  { type: "cmd", prompt: "eugine@au:~$", text: "whoami" },
  { type: "out", text: "AI Engineer · Sydney, Australia" },
  { type: "cmd", prompt: "eugine@au:~$", text: "cat focus.txt" },
  { type: "out", text: "LLMs · Agentic Systems · AI Infrastructure" },
  { type: "cmd", prompt: "eugine@au:~$", text: "cat philosophy.txt" },
  { type: "out", text: "Bridge research to production. Ship reliable AI." },
  { type: "cursor" },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-16 lg:px-32">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — counters + bio */}
          <div>
            <motion.div
              className="flex gap-10 mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Counter target={5} label="Years in AI/ML" />
              <Counter target={20} label="Projects Shipped" />
              <Counter target={8} label="Open Source" />
            </motion.div>

            <motion.p
              className="text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              I&apos;m an AI engineer based in Australia, focused on building
              production-grade LLM applications, agentic workflows, and the
              infrastructure that makes them reliable at scale. I care about
              bridging the gap between cutting-edge research and real-world
              deployment.
            </motion.p>
          </div>

          {/* Right — terminal */}
          <motion.div
            className="rounded-xl overflow-hidden border border-gray-800 font-mono text-sm"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-gray-800">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-gray-600 text-xs">zsh — terminal</span>
            </div>
            <div className="bg-[#0d0d0d] p-5 space-y-1.5">
              {terminalLines.map((line, i) => {
                if (line.type === "cursor") {
                  return (
                    <p key={i} className="flex items-center gap-1.5">
                      <span className="text-green-400">eugine@au:~$</span>
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
                      <span className="text-green-400">{line.prompt}</span>{" "}
                      <span className="text-white">{line.text}</span>
                    </p>
                  );
                }
                return (
                  <p key={i} className="text-gray-500 pl-0">{line.text}</p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
