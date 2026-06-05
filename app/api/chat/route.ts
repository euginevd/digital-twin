import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const anthropic = new Anthropic();
const openai = new OpenAI();
const googleAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? "" });

function loadContext(): string {
  const knowledge = readFileSync(join(process.cwd(), "context/knowledge.md"), "utf-8");
  const style = readFileSync(join(process.cwd(), "context/style.md"), "utf-8");
  return `${knowledge}\n\n---\n\n${style}`;
}

type ApiMessage = { role: "user" | "assistant"; content: string };

async function streamClaude(messages: ApiMessage[], systemPrompt: string): Promise<ReadableStream> {
  const stream = await anthropic.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    system: systemPrompt,
    messages,
  });
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });
}

async function streamOpenAI(messages: ApiMessage[], systemPrompt: string): Promise<ReadableStream> {
  const stream = await openai.chat.completions.create({
    model: "gpt-5.4-mini",
    max_completion_tokens: 200,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
  });
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });
}

async function streamGemini(messages: ApiMessage[], systemPrompt: string): Promise<ReadableStream> {
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const stream = await googleAI.models.generateContentStream({
    model: "gemini-3.5-flash",
    config: { systemInstruction: systemPrompt, maxOutputTokens: 200, thinkingConfig: { thinkingBudget: 0 } },
    contents,
  });

  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.text ?? "";
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });
}

export async function POST(req: NextRequest) {
  const { messages, model = "claude" } = await req.json();
  const systemPrompt = loadContext();

  let readable: ReadableStream;

  if (model === "openai") {
    readable = await streamOpenAI(messages, systemPrompt);
  } else if (model === "gemini") {
    readable = await streamGemini(messages, systemPrompt);
  } else {
    readable = await streamClaude(messages, systemPrompt);
  }

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
