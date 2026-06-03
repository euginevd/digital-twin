import { readFileSync } from "fs";
import { join } from "path";
import { VoyageAIClient } from "voyageai";

const client = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY! });

interface EmbeddingRecord {
  text: string;
  embedding: number[];
}

let cache: EmbeddingRecord[] | null = null;

function loadEmbeddings(): EmbeddingRecord[] {
  if (cache) return cache;
  const raw = readFileSync(join(process.cwd(), "context/embeddings.json"), "utf-8");
  cache = JSON.parse(raw);
  return cache!;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function retrieveContext(query: string, topK = 3): Promise<string> {
  const records = loadEmbeddings();

  const res = await client.embed({
    input: [query],
    model: "voyage-3-lite",
  });
  const queryVec = res.data![0].embedding!;

  const scored = records
    .map((r) => ({ text: r.text, score: cosine(queryVec, r.embedding) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map((r) => r.text).join("\n\n---\n\n");
}
