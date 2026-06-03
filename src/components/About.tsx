"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix = "+", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let startTime: number;
        const tick = (ts: number) => {
          if (!startTime) startTime = ts;
          const p = Math.min((ts - startTime) / 1200, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        ref={ref}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.1rem, 1.3rem + 2vw, 3rem)",
          fontWeight: 700,
          color: "var(--accent)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
        }}
      >
        {count}{suffix}
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--fg-faint)" }}>
        {label}
      </span>
    </div>
  );
}

const CERT_ROW_1 = [
  { src: "/certs/cissp.png", alt: "CISSP" },
  { src: "/certs/cisa.png", alt: "CISA" },
  { src: "/certs/aws-security.png", alt: "AWS Security Specialty" },
  { src: "/certs/azure-security.png", alt: "Azure Security Engineer Associate" },
  { src: "/certs/aws-sa-pro.png", alt: "AWS Solutions Architect Professional" },
  { src: "/certs/azure-sa-expert.png", alt: "Azure Solutions Architect Expert" },
  { src: "/certs/m365-security.png", alt: "M365 Security Administrator Associate" },
  { src: "/certs/togaf.png", alt: "TOGAF 9 Certified" },
];

const CERT_ROW_2 = [
  { src: "/certs/aws-devops.png", alt: "AWS DevOps Engineer Professional" },
  { src: "/certs/aws-networking.png", alt: "AWS Advanced Networking Specialty" },
  { src: "/certs/m365-enterprise.png", alt: "M365 Enterprise Administrator Expert" },
  { src: "/certs/pmp.png", alt: "PMP" },
  { src: "/certs/citrix.png", alt: "Citrix CCE-AppDS" },
  { src: "/certs/vmware.png", alt: "VMware IE6" },
  { src: "/certs/ccie.png", alt: "CCIE Security" },
  { src: "/certs/ccnp-dc.png", alt: "CCNP Data Center" },
];

function CertBand({ certs, rtl }: { certs: typeof CERT_ROW_1; rtl?: boolean }) {
  const doubled = [...certs, ...certs];
  return (
    <div style={{
      overflow: "hidden",
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      paddingBlock: "var(--s-2)",
    }}>
      <div style={{
        display: "flex",
        gap: "clamp(1.75rem, 3.5vw, 3rem)",
        width: "max-content",
        animation: rtl ? "cert-scroll-r 44s linear infinite" : "cert-scroll-l 55s linear infinite",
      }}
        className="cert-band-track"
      >
        {doubled.map((cert, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-md)",
              padding: "0.55rem 0.9rem",
              flexShrink: 0,
              transition: "border-color 0.2s, transform 0.22s var(--ease-out), box-shadow 0.2s",
            }}
          >
            <img
              src={cert.src}
              alt={i < certs.length ? cert.alt : ""}
              aria-hidden={i >= certs.length ? true : undefined}
              style={{ height: 64, width: "auto", objectFit: "contain", display: "block", opacity: 0.85 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="l-alt"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(4rem, 8vh, 5.5rem) 0 clamp(4.5rem, 8vh, 6rem)",
      }}
    >
      <div className="ds-gridlines" />
      <div className="l-wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.25rem, 2.6vh, 2rem)" }}>

          {/* ROW 1 — Intro + stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
            className="about-intro-row"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
              <span className="t-kicker">About</span>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.15rem, 0.95rem + 0.8vw, 1.55rem)",
                fontWeight: 400,
                color: "var(--fg)",
                lineHeight: 1.4,
                letterSpacing: "-0.015em",
              }}>
                Cloud Security Architect across <span style={{ color: "var(--accent)", fontWeight: 600 }}>AWS, Azure,</span> and hybrid environments — hands-on from architecture through engineering. Experience across enterprise infrastructure, network, and cloud security.
              </p>
              <p style={{ fontSize: "var(--fs-base)", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: "52ch" }}>
                Six years focused entirely on cloud-native security at enterprise scale in Australia, with earlier work across regulated environments in the UAE and Qatar.
              </p>
              <p style={{ fontSize: "var(--fs-base)", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: "52ch" }}>
                <span style={{ color: "var(--accent)", fontWeight: 600 }}>Current focus —</span> CNAPP operationalisation and AI Security Posture Management.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-5) var(--s-6)" }}>
              <Counter target={18} label="Years experience" />
              <Counter target={80} label="Cloud accounts secured" />
              <Counter target={300} label="Web apps &amp; APIs protected" />
              <Counter target={20} label="Industry certifications" />
            </div>
          </div>

          {/* ROW 2 — Education */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
            <span className="t-kicker">Education</span>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(1.25rem, 3vw, 2.5rem)",
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-lg)",
              padding: "clamp(1rem, 2.5vh, 1.5rem) clamp(1.25rem, 3vw, 2rem)",
              flexWrap: "wrap",
            }}>
              <div style={{
                flexShrink: 0,
                width: 56,
                height: 56,
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}>
                <img src="/csu-icon.png" alt="Charles Sturt University" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ flexShrink: 0, width: 1, alignSelf: "stretch", background: "var(--border)" }} aria-hidden="true" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.64rem", letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--accent)" }}>Charles Sturt University</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: 4 }}>NSW, Australia</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(0.9rem, 0.8rem + 0.4vw, 1.05rem)", letterSpacing: "-0.01em", color: "var(--fg)" }}>Master of Information Systems Security</span>
                <span style={{ fontSize: "0.82rem", color: "var(--fg-muted)", lineHeight: 1.55, maxWidth: "60ch" }}>Cybersecurity architecture, cloud security, and enterprise risk — applied across every engagement since.</span>
              </div>
              <span style={{
                flexShrink: 0,
                alignSelf: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                color: "var(--fg-muted)",
                background: "var(--bg-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-full)",
                padding: "0.28rem 0.75rem",
                whiteSpace: "nowrap",
              }}>2016–2017</span>
            </div>
          </div>

          {/* ROW 3 — Certifications */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
            <span className="t-kicker">Certifications</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
              <CertBand certs={CERT_ROW_1} />
              <CertBand certs={CERT_ROW_2} rtl />
            </div>
          </div>

        </div>
      </div>

      <a href="#services" className="scroll-ind" aria-label="Scroll to Services" style={{
        position: "absolute",
        bottom: "5.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        textDecoration: "none",
      }}>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ animation: "chev 1.6s ease-in-out infinite" }}>
          <polyline points="2,2 10,10 18,2" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </section>
  );
}
