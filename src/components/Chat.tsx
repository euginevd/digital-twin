"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
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


const STORAGE_KEY = "chat_history";
const KEEP_KEY = "chat_keep";

type ModelId = "claude" | "openai" | "gemini";

const MODELS: { id: ModelId; label: string; icon: string; soon?: boolean }[] = [
  { id: "claude", label: "Claude", icon: "⬡" },
  { id: "openai", label: "ChatGPT", icon: "◎" },
  { id: "gemini", label: "Gemini", icon: "✦", soon: true },
];

export default function Chat() {
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [keepChat, setKeepChat] = useState(false);
  const [model, setModel] = useState<ModelId>("claude");
  const logRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const apiHistoryRef = useRef<ApiMessage[]>([]);

  // Restore saved session on mount
  useEffect(() => {
    const keep = localStorage.getItem(KEEP_KEY) === "1";
    setKeepChat(keep);
    if (keep) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const { messages: msgs, apiHistory } = JSON.parse(saved);
          if (msgs?.length) {
            setMessages(msgs);
            apiHistoryRef.current = apiHistory ?? [];
            setActive(true);
          }
        }
      } catch {
        // ignore corrupt storage
      }
    }
  }, []);

  // Persist history whenever messages change and keep-chat is on
  useEffect(() => {
    if (keepChat && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, apiHistory: apiHistoryRef.current }));
    }
  }, [messages, keepChat]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  // Send transcript when tab is closed (best-effort)
  useEffect(() => {
    const handle = () => {
      const msgs = messages.filter((m) => !m.typing && m.text !== "thinking…");
      if (msgs.length < 2) return;
      navigator.sendBeacon("/api/notify", JSON.stringify({ messages: msgs }));
    };
    window.addEventListener("beforeunload", handle);
    return () => window.removeEventListener("beforeunload", handle);
  }, [messages]);

  function toggleKeep() {
    const next = !keepChat;
    setKeepChat(next);
    localStorage.setItem(KEEP_KEY, next ? "1" : "0");
    if (!next) localStorage.removeItem(STORAGE_KEY);
  }

  async function sendTranscript(msgs: Message[]) {
    const meaningful = msgs.filter((m) => !m.typing && m.text !== "thinking…");
    if (meaningful.length < 2) return;
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: meaningful }),
      });
    } catch {
      // best-effort
    }
  }

  function reset() {
    sendTranscript(messages);
    setMessages([]);
    setActive(false);
    apiHistoryRef.current = [];
    localStorage.removeItem(STORAGE_KEY);
  }

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
      const full = faqMatch.answer;
      let i = 0;
      const step = () => {
        i += 3;
        const chunk = full.slice(0, i);
        setMessages((prev) =>
          prev.map((m, idx) => idx === prev.length - 1 ? { role: "bot", text: chunk } : m)
        );
        if (i < full.length) requestAnimationFrame(step);
        else {
          apiHistoryRef.current.push({ role: "assistant", content: full });
          setBusy(false);
          textareaRef.current?.focus();
        }
      };
      requestAnimationFrame(step);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiHistoryRef.current, model }),
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
              <Image src="/avatar-circle.webp" alt="Eugine Dsylva" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--fs-3xl)", lineHeight: 1.04 }}>
              Meet my <span style={{ color: "var(--accent)" }}>Digital Twin</span>.
            </h2>
            <p style={{ color: "var(--fg-muted)", maxWidth: "48ch", fontSize: "var(--fs-lg)", lineHeight: 1.55 }}>
              This is an AI built and trained to represent me. Ask it about my background and work, book a meeting, or send me a direct message — I'd like to hear from you.
            </p>


            <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap", justifyContent: "center", marginTop: "var(--s-4)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--accent-line)", background: "var(--bg-1)", color: "var(--fg)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "oklch(0.72 0.18 112)", flexShrink: 0, animation: "pulse-dot 2.2s ease-in-out infinite" }} aria-hidden="true" />
                AI Chat
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--border)", background: "var(--bg-1)", color: "var(--fg-muted)", opacity: 0.4 }}>
                Voice Agent · soon
              </span>
              <a href="https://cal.com/euginevd/30min" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--border)", background: "var(--bg-1)", color: "var(--fg-muted)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s, background 0.2s" }}>
                Book a meeting →
              </a>
              <a href="https://linkedin.com/in/euginevd/" target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: 6, padding: "0.35rem 0.85rem", borderRadius: "var(--r-full)", fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", border: "1px solid var(--border)", background: "var(--bg-1)", color: "var(--fg-muted)", textDecoration: "none", transition: "border-color 0.2s, color 0.2s, background 0.2s" }}>
                Message Eugine →
              </a>
            </div>

            <div style={{ width: "100%", maxWidth: 400, display: "flex", alignItems: "center", gap: "var(--s-3)", marginTop: "var(--s-6)" }}>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-faint)", whiteSpace: "nowrap" }}>Ask me anything</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>

            <div style={{ display: "flex", gap: "var(--s-2)", flexWrap: "wrap", justifyContent: "center", marginTop: "var(--s-4)" }}>
              {FAQS.slice(0, 3).map((s) => (
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
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button
                onClick={() => setActive(false)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.04em",
                  color: "var(--fg-faint)",
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-full)",
                  padding: "0.2rem 0.65rem",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg-faint)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-faint)"; e.currentTarget.style.borderColor = "var(--border)"; }}
              >
                ← Back
              </button>
            </div>
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
                {m.role === "bot" && !m.typing ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children, ...props }) => <p {...props} style={{ margin: "0 0 0.75em", lineHeight: "inherit" }} className="chat-p">{children}</p>,
                    }}
                  >{m.text}</ReactMarkdown>
                ) : (
                  m.text
                )}
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
        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "var(--s-3)", paddingInline: "0.25rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", userSelect: "none" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.04em", color: "var(--fg-faint)" }}>Keep chat</span>
            <span
              onClick={toggleKeep}
              role="switch"
              aria-checked={keepChat}
              tabIndex={0}
              onKeyDown={(e) => e.key === " " && toggleKeep()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                width: 36,
                height: 20,
                borderRadius: 999,
                background: keepChat ? "var(--accent)" : "var(--bg-2)",
                border: "1px solid",
                borderColor: keepChat ? "var(--accent)" : "var(--border)",
                padding: 2,
                cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
                flexShrink: 0,
              }}
            >
              <span style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: keepChat ? "var(--accent-fg)" : "var(--fg-faint)",
                transform: keepChat ? "translateX(16px)" : "translateX(0)",
                transition: "transform 0.2s, background 0.2s",
                flexShrink: 0,
              }} />
            </span>
          </label>
          <button
            type="button"
            onClick={reset}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.04em",
              color: "var(--fg-faint)",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--r-full)",
              padding: "0.2rem 0.65rem",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--fg-faint)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--fg-faint)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            Reset
          </button>
        </div>
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
        {/* Model switcher */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--s-2)", flexWrap: "wrap" }}>
          {MODELS.map((m) => {
            const isSelected = model === m.id;
            if (m.soon) {
              return (
                <span
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--r-full)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.04em",
                    border: "1px solid var(--border)",
                    background: "var(--bg-1)",
                    color: "var(--fg-faint)",
                    opacity: 0.4,
                    cursor: "default",
                    userSelect: "none",
                  }}
                >
                  <span aria-hidden="true">{m.icon}</span>
                  {m.label} · soon
                </span>
              );
            }
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setModel(m.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "var(--r-full)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: isSelected ? "var(--accent-line)" : "var(--border)",
                  background: isSelected ? "var(--accent-soft)" : "var(--bg-1)",
                  color: isSelected ? "var(--accent)" : "var(--fg-faint)",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "var(--fg-faint)";
                    e.currentTarget.style.color = "var(--fg-muted)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (model !== m.id) {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--fg-faint)";
                  }
                }}
              >
                <span aria-hidden="true">{m.icon}</span>
                {m.label}
              </button>
            );
          })}
        </div>
      </form>
    </section>
  );
}
