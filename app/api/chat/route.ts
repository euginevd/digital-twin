import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic();

function loadContext(): string {
  const knowledge = readFileSync(join(process.cwd(), "context/knowledge.md"), "utf-8");
  const style = readFileSync(join(process.cwd(), "context/style.md"), "utf-8");
  return `${knowledge}\n\n---\n\n${style}`;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const systemPrompt = loadContext();

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    system: systemPrompt,
    messages,
  });

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
