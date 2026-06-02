const items = [
  "LangChain", "LangGraph", "LlamaIndex", "PyTorch",
  "FastAPI", "OpenAI", "Hugging Face", "Docker",
  "Kubernetes", "AWS", "GCP", "Python",
  "TypeScript", "pgvector", "RAG Pipelines", "RLHF",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="ds-marquee" aria-hidden="true">
      <div className="track">
        {doubled.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
