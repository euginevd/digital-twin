"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
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
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <canvas className="ds-shader" data-shader />
      <div className="ds-gridlines" />

      <div
        className="l-wrap"
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: "clamp(2.5rem, 6vw, 5rem)",
          paddingBlock: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        {/* Left — text */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FadeUp delay={0}>
            <h1
              className="t-display"
              style={{ marginBottom: "var(--s-4)", whiteSpace: "nowrap" }}
            >
              Eugine Dsylva
            </h1>
          </FadeUp>

          <FadeUp delay={0.08}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--fs-xl)",
                color: "var(--accent)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                marginBottom: "var(--s-5)",
              }}
            >
              Cloud Security Architect
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="t-lead" style={{ marginBottom: "var(--s-6)" }}>
              Securing cloud infrastructure and applications at scale — from architecture to execution.
            </p>
          </FadeUp>

          <FadeUp delay={0.22}>
            <div style={{ display: "flex", gap: "var(--s-3)", flexWrap: "wrap" }}>
              <a href="#projects" className="ds-btn ds-btn-primary">
                Explore Projects
              </a>
              <a href="/cv.pdf" className="ds-btn ds-btn-ghost" download>
                Download CV
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Right — photo */}
        <FadeUp delay={0.1} style={{ flexShrink: 0 }}>
          <div
            style={{
              width: "clamp(240px, 28vw, 380px)",
              aspectRatio: "3 / 4",
              borderRadius: "var(--r-xl)",
              overflow: "hidden",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow)",
              position: "relative",
            }}
          >
            <Image
              src="/avatar.webp"
              alt="Eugine Dsylva"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          textDecoration: "none",
        }}
      >
        {[0, 0.18, 0.36].map((delay, i) => (
          <motion.svg
            key={i}
            width="20"
            height="12"
            viewBox="0 0 20 12"
            fill="none"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.6, repeat: Infinity, delay, ease: "easeInOut" }}
          >
            <polyline
              points="2,2 10,10 18,2"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ))}
      </motion.a>
    </header>
  );
}
