// Run once (or whenever knowledge.md changes):
//   npx tsx scripts/embed.ts
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { VoyageAIClient } from "voyageai";

const client = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY! });

function chunkMarkdown(text: string): string[] {
  // Split on H1/H2 headings and double newlines, keep non-empty chunks
  return text
    .split(/\n(?=#{1,2} |\n)/)
    .map((c) => c.trim())
    .filter((c) => c.length > 40);
}

async function main() {
  const knowledge = readFileSync(join(process.cwd(), "context/knowledge.md"), "utf-8");
  const chunks = chunkMarkdown(knowledge);

  console.log(`Embedding ${chunks.length} chunks…`);

  const res = await client.embed({
    input: chunks,
    model: "voyage-3-lite",
  });

  const records = chunks.map((text, i) => ({
    text,
    embedding: res.data![i].embedding!,
  }));

  writeFileSync(
    join(process.cwd(), "context/embeddings.json"),
    JSON.stringify(records, null, 2)
  );

  console.log(`Done — wrote ${records.length} chunks to context/embeddings.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
