import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Message {
  role: "user" | "bot";
  text: string;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as { messages: Message[] };
  if (!messages?.length) return new Response("ok");

  const lines = messages.map((m) =>
    m.role === "user"
      ? `<p><strong>Visitor:</strong> ${escHtml(m.text)}</p>`
      : `<p><strong>Digital Twin:</strong> ${escHtml(m.text)}</p>`
  );

  const timestamp = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  await resend.emails.send({
    from: "Digital Twin <digitaltwin@euginevd.com>",
    to: "euginevd@gmail.com",
    subject: `Digital Twin conversation — ${timestamp}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2 style="font-size:1rem;color:#666;font-weight:400;margin-bottom:1.5rem">
          Someone chatted with your Digital Twin · ${timestamp}
        </h2>
        ${lines.join("\n")}
      </div>
    `,
  });

  return new Response("ok");
}

function escHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
