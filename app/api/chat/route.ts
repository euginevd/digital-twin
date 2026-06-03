import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { retrieveContext } from "@/lib/rag";

const client = new Anthropic();

function loadStyle(): string {
  return readFileSync(join(process.cwd(), "context/style.md"), "utf-8");
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // Use the last user message as the retrieval query
  const lastUser = [...messages].reverse().find((m: { role: string }) => m.role === "user");
  const query = lastUser?.content ?? "";

  const [context, style] = await Promise.all([
    retrieveContext(query),
    Promise.resolve(loadStyle()),
  ]);

  const systemPrompt = `${context}\n\n---\n\n${style}`;

  const stream = await client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
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
