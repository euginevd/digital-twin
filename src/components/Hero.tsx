"use client";

import { motion } from "framer-motion";

function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <header
      id="hero"
      style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}
    >
      {/* WebGL shader backdrop */}
      <canvas className="ds-shader" data-shader />
      <div className="ds-gridlines" />

      <div className="l-wrap" style={{ position: "relative", zIndex: 2, paddingBlock: "clamp(4.5rem, 12vw, 8.5rem) clamp(3rem, 7vw, 5rem)" }}>

        <FadeUp delay={0}>
          <span className="t-kicker">AI Engineer · Sydney, Australia</span>
        </FadeUp>

        <FadeUp delay={0.07}>
          <h1
            className="t-display"
            style={{ maxWidth: "16ch", marginBlock: "var(--s-5)" }}
          >
            Building intelligent systems —{" "}
            <span className="t-accent">by design.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.14}>
          <p className="t-lead" style={{ maxWidth: "56ch" }}>
            Hands-on from architecture through delivery — production LLMs, agentic
            workflows, and scalable AI infrastructure at enterprise scale.
          </p>
        </FadeUp>

        <FadeUp delay={0.21}>
          <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap", marginTop: "var(--s-6)" }}>
            <a href="#projects" className="ds-btn ds-btn-primary">
              Explore projects →
            </a>
            <a href="#about" className="ds-btn ds-btn-ghost">
              About me
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.29}>
          <div
            style={{
              display: "flex",
              gap: "var(--s-5)",
              flexWrap: "wrap",
              marginTop: "var(--s-7)",
              color: "var(--fg-faint)",
            }}
          >
            {[
              { n: "5+",  l: "Years in AI/ML" },
              { n: "20+", l: "Projects shipped" },
              { n: "8+",  l: "Open source repos" },
              { n: "4",   l: "Core domains" },
            ].map(({ n, l }) => (
              <div key={l} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--fs-xl)",
                    color: "var(--fg)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>
    </header>
  );
}
