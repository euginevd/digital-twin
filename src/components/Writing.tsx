"use client";

const posts = [
  {
    date: "DRAFT",
    title: "Building production RAG pipelines that don't hallucinate",
  },
  {
    date: "DRAFT",
    title: "Agentic systems in 2026 — what actually works in production",
  },
  {
    date: "DRAFT",
    title: "LLM observability: the metrics that matter when costs scale",
  },
];

export default function Writing() {
  return (
    <section id="writing" className="l-section l-alt">
      <div className="l-wrap">
        <div className="ds-sec-head">
          <span className="idx">05</span>
          <h2 className="t-h2">Writing</h2>
          <span className="t-mono t-faint">notes from the field</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map(({ date, title }) => (
            <a
              key={title}
              href="#"
              style={{
                display: "grid",
                gridTemplateColumns: "7rem 1fr auto",
                gap: "var(--s-5)",
                padding: "var(--s-5) 0",
                borderTop: "1px solid var(--border)",
                alignItems: "center",
                transition: "padding-left 0.25s",
                color: "inherit",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = "var(--s-3)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.paddingLeft = "0")}
            >
              <span className="t-mono t-faint">{date}</span>
              <h3 className="t-h3" style={{ fontSize: "var(--fs-lg)" }}>{title}</h3>
              <span style={{ color: "var(--accent)", fontSize: "1.1rem" }}>→</span>
            </a>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </div>
      </div>
    </section>
  );
}
