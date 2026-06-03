"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FAQS } from "@/lib/faq";


interface Message {
  role: "user" | "bot";
  text: string;
  typing?: boolean;
}

interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}


export default function Chat() {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const apiHistoryRef = useRef<ApiMessage[]>([]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  function autoGrow() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }

  async function ask(q: string) {
    if (busy || !q.trim()) return;
    setBusy(true);
    setActive(true);
    const userMsg: Message = { role: "user", text: q };
    apiHistoryRef.current.push({ role: "user", content: q });
    setMessages((prev) => [...prev, userMsg, { role: "bot", text: "thinking…", typing: true }]);

    const faqMatch = FAQS.find((f) => f.label === q || f.short === q);
    if (faqMatch) {
      apiHistoryRef.current.push({ role: "assistant", content: faqMatch.answer });
      setMessages((prev) =>
        prev.map((m, i) => i === prev.length - 1 ? { role: "bot", text: faqMatch.answer } : m)
      );
      setBusy(false);
      textareaRef.current?.focus();
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiHistoryRef.current }),
      });

      if (!res.ok) throw new Error("api_error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        const snapshot = text;
        setMessages((prev) =>
          prev.map((m, i) => i === prev.length - 1 ? { role: "bot", text: snapshot } : m)
        );
      }

      const finalText = text.trim() || "Good question — let's discuss the specifics directly.";
      apiHistoryRef.current.push({ role: "assistant", content: finalText });
      setMessages((prev) =>
        prev.map((m, i) => i === prev.length - 1 ? { role: "bot", text: finalText } : m)
      );
    } catch {
      setMessages((prev) => prev.map((m, i) =>
        i === prev.length - 1
          ? { role: "bot", text: "I can't reach my live brain right now — reach me on LinkedIn or at euginevd@gmail.com." }
          : m
      ));
    } finally {
      setBusy(false);
      textareaRef.current?.focus();
    }
  }

  function submit() {
    const q = input.trim();
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    ask(q);
  }

  return (
    <section
      id="chat"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "clamp(4rem, 9vw, 6rem) var(--gutter) clamp(3rem, 6vh, 5rem)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <canvas className="ds-shader" data-shader />
      <div className="ds-gridlines" />

      {/* Stage */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: active ? "flex-start" : "center",
          minHeight: 0,
        }}
      >
        {/* Intro state */}
        {!active && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--s-4)" }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid var(--accent-line)",
              boxShadow: "0 0 0 5px var(--accent-soft), var(--shadow)",
              position: "relative",
              flexShrink: 0,
            }}>
              <Image src="/avatar.webp" alt="Eugine Dsylva" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", letterSpacing: "0.18em", fontSize: "var(--fs-mono)", textTransform: "uppercase" }}>
              Digital Twin — Live Demo
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-3xl)", lineHeight: 1.04 }}>
              Meet my <span style={{ color: "var(--accent)" }}>Digital Twin</span>.
            </h2>
            <p style={{ color: "var(--fg-muted)", maxWidth: "48ch", fontSize: "var(--fs-lg)", lineHeight: 1.55 }}>
              A live demo of the project — an AI built to represent me across chat, voice, and scheduling. Ask it anything about my work, book time, or reach me directly.
            </p>
            <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap", justifyContent: "center", marginTop: "var(--s-4)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--accent-line)", background: "var(--bg-1)", color: "var(--fg)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.72 0.18 112)", flexShrink: 0, animation: "pulse-dot 2.2s ease-in-out infinite" }} aria-hidden="true" />
                AI Chat
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--border)", background: "var(--bg-1)", color: "var(--fg-muted)", opacity: 0.4 }}>
                Voice Agent · soon
              </span>
              <a href="https://calendly.com/euginevd" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--border)", background: "var(--bg-1)", color: "var(--fg-muted)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s, background 0.2s" }}>
                Book a meeting →
              </a>
              <a href="https://linkedin.com/in/euginevd/" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--border)", background: "var(--bg-1)", color: "var(--fg-muted)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s, background 0.2s" }}>
                Talk to Eugine →
              </a>
            </div>
            <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap", justifyContent: "center", marginTop: "var(--s-3)" }}>
              {FAQS.map((s) => (
                <button
                  key={s.label}
                  className="ds-chip"
                  onClick={() => ask(s.label)}
                  style={{ cursor: "pointer", padding: "0.5rem 0.95rem", fontSize: "0.8rem", transition: "border-color 0.2s, color 0.2s, background 0.2s" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--accent-line)";
                    el.style.color = "var(--accent)";
                    el.style.background = "var(--accent-soft)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--fg-muted)";
                    el.style.background = "var(--bg-1)";
                  }}
                >
                  {s.short}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversation log */}
        {active && (
          <div
            ref={logRef}
            style={{
              width: "100%",
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "var(--s-4)",
              padding: "var(--s-2) var(--s-1) var(--s-5)",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "82%",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--r-lg)",
                  fontSize: "0.95rem",
                  lineHeight: 1.55,
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? "var(--accent)" : "var(--bg-1)",
                  color: m.role === "user" ? "var(--accent-fg)" : m.typing ? "var(--fg-faint)" : "var(--fg)",
                  border: m.role === "bot" ? "1px solid var(--border)" : "none",
                  borderBottomRightRadius: m.role === "user" ? 5 : undefined,
                  borderBottomLeftRadius: m.role === "bot" ? 5 : undefined,
                  fontFamily: m.typing ? "var(--font-mono)" : undefined,
                  ...(m.typing ? { fontSize: "0.8rem" } : {}),
                }}
              >
                {m.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input dock */}
      <form
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--s-3)" }}
      >
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "var(--s-2)",
          background: "var(--bg-1)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          padding: "0.55rem 0.55rem 0.55rem 1.1rem",
        }}
          onFocus={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = "var(--accent-line)";
            el.style.boxShadow = "0 0 0 4px var(--accent-soft)";
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "var(--border)";
              el.style.boxShadow = "none";
            }
          }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Message my AI…"
            autoComplete="off"
            aria-label="Message"
            value={input}
            onChange={(e) => { setInput(e.target.value); autoGrow(); }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
            }}
            style={{
              flex: 1,
              resize: "none",
              border: 0,
              background: "transparent",
              outline: "none",
              color: "var(--fg)",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.5,
              padding: "0.45rem 0",
              maxHeight: 160,
              overflowY: "auto",
            }}
          />
          <button
            type="submit"
            aria-label="Send"
            style={{
              flexShrink: 0,
              border: 0,
              background: "var(--accent)",
              color: "var(--accent-fg)",
              width: 42,
              height: 42,
              borderRadius: "var(--r-lg)",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              transition: "background 0.2s var(--ease), transform 0.15s var(--ease-out)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-strong)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
        <div style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--fg-faint)", letterSpacing: "0.03em", display: "flex", gap: "var(--s-2)", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ opacity: 0.5 }}>Press</span>
          <kbd style={{ fontFamily: "var(--font-mono)", fontSize: "0.64rem", background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 4, padding: "0.1rem 0.35rem", color: "var(--fg-muted)" }}>Enter</kbd>
          <span style={{ opacity: 0.5 }}>to send &nbsp;·&nbsp; Shift+Enter for new line</span>
        </div>
      </form>
    </section>
  );
}
