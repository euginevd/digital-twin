import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic();

let knowledgeCache: string | null = null;
let styleCache: string | null = null;

function loadKnowledge(): string {
  if (!knowledgeCache) knowledgeCache = readFileSync(join(process.cwd(), "context/knowledge.md"), "utf-8");
  return knowledgeCache;
}

function loadStyle(): string {
  if (!styleCache) styleCache = readFileSync(join(process.cwd(), "context/style.md"), "utf-8");
  return styleCache;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: [
      {
        type: "text",
        text: loadKnowledge(),
        cache_control: { type: "ephemeral" },
      },
      {
        type: "text",
        text: loadStyle(),
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
    betas: ["prompt-caching-2024-07-31"],
  } as Parameters<typeof client.messages.stream>[0]);

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
