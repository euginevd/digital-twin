# Eugine Dsylva — Digital Twin

Personal portfolio site for Eugine Dsylva, Cloud Security Architect. Built with Next.js App Router, deployed on Vercel behind Cloudflare.

The site includes a live AI chat agent ("Digital Twin") powered by Claude, trained on Eugine's real engagements, certifications, and career history.

**Live site:** [euginevd.com](https://euginevd.com)

---

## Project Structure

```
digital-twin/
│
├── app/
│   ├── globals.css                                     # Global styles and CSS reset
│   ├── layout.tsx                                      # Root layout — Nav, metadata, shader script
│   ├── page.tsx                                        # Home page — assembles all sections
│   └── api/chat/route.ts                               # Chat API — streams Claude responses
│
├── src/
│   ├── components/
│   │   ├── About.tsx                                   # Stats, education, scrolling cert bands
│   │   ├── Chat.tsx                                    # Digital Twin chat interface
│   │   ├── Footer.tsx                                  # Footer — LinkedIn, GitHub, email
│   │   ├── Hero.tsx                                    # Landing — name, role, CV download
│   │   ├── Nav.tsx                                     # Top navigation bar
│   │   ├── Outcomes.tsx                                # Enterprise case studies
│   │   ├── Services.tsx                                # What I deliver — three service cards
│   │   └── ThemeToggle.tsx                             # Dark / light mode toggle
│   ├── lib/
│   │   └── faq.ts                                      # FAQ chips and answers for chat intro
│   └── styles/
│       └── theme.css                                   # Design tokens — colours, spacing, type
│
├── context/
│   ├── knowledge.md                                    # Engagements, skills, career — feeds the AI
│   ├── style.md                                        # AI persona — tone, length, guardrails
│   └── embeddings.json                                 # Voyage AI embeddings (RAG, dormant)
│
├── scripts/
│   └── embed.ts                                        # Regenerates embeddings.json — npm run embed
│
├── public/
│   ├── avatar.webp                                     # Profile photo
│   ├── shader.js                                       # Animated canvas background
│   ├── favicon.svg                                     # Site favicon
│   ├── csu-icon.png                                    # Charles Sturt University logo
│   ├── robots.txt                                      # Blocks AI scrapers
│   ├── Eugine-Dsylva-Cloud-Security-Architect-CV.pdf   # Downloadable CV
│   └── certs/                                          # Cert badge images for About section
│
├── AGENTS.md                                           # Instructions for AI coding agents
├── package.json                                        # Dependencies and scripts
└── tsconfig.json                                       # TypeScript config
```

---

## AI Chat Agent

The chat section is an AI agent that represents Eugine in conversation. It uses:

- **Model:** `claude-haiku-4-5-20251001` via the Anthropic API
- **Method:** Prompt stuffing — `context/knowledge.md` and `context/style.md` are loaded into the system prompt on every request
- **Streaming:** Responses stream token by token via the Web Streams API
- **FAQs:** Six pre-written questions in `src/lib/faq.ts` render as chips and stream their answers client-side (no API call)
- **Persistence:** Optional "Keep chat" toggle saves conversation to localStorage

To update what the agent knows, edit `context/knowledge.md`. To change its tone or guardrails, edit `context/style.md`.

### RAG (dormant)

`scripts/embed.ts` and `context/embeddings.json` are in place for Voyage AI RAG but currently disabled — prompt stuffing is fast enough for the current knowledge base size. To re-enable, add `VOYAGE_API_KEY` to Vercel environment variables and wire `src/lib/rag.ts` into the chat route.

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Powers the AI chat agent |
| `VOYAGE_API_KEY` | No (RAG dormant) | Voyage AI embeddings for RAG |

Store in `.env.local` locally. Add to Vercel project settings for production.

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Auto-deploys to Vercel on push to `main`. DNS and WAF run through Cloudflare — the site proxies through Cloudflare before hitting Vercel, providing DDoS protection, bot filtering, and edge caching.
