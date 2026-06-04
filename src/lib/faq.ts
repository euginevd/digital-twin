export interface Faq {
  short: string;
  label: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    short: "Which sectors have you worked in?",
    label: "Which sectors and regions have you worked with?",
    answer:
      "Most of my recent work has been across higher education, energy, and NSW government here in Australia, with earlier roles in Qatar, the UAE, and the US spanning media, telecoms, banking, and healthcare. Four countries, but the security fundamentals travel well.",
  },
  {
    short: "How did you get into cybersecurity?",
    label: "How did you get into cybersecurity?",
    answer:
      "I started in computer networks straight out of a commerce degree, and security became the natural layer as I moved through infrastructure, systems engineering, and architecture. I never made a deliberate pivot — I just stayed in a lane I enjoyed and it kept evolving.",
  },
  {
    short: "What are you working on right now?",
    label: "What are you currently working on?",
    answer:
      "Most of my focus right now is cloud security guardrails across AWS and Azure using Wiz — covering the full CNAPP stack and increasingly AI security posture. Cloud security and cloud cost are more connected than most teams realise, so FinOps sits alongside that work too.",
  },
  {
    short: "Where are you taking your career?",
    label: "Where are you taking your career in the next year?",
    answer:
      "My focus is on helping enterprises secure AI — most organisations are adopting it faster than they can assess the risk, and there's a real gap between what security teams know and what's actually being deployed. I want to be hands-on in that space, building and securing AI systems rather than just writing policies about them.",
  },
  {
    short: "What sets you apart from others?",
    label: "What sets you apart from other security architects?",
    answer:
      "I come from a networks and systems background, so I understand how things are built before I think about securing them — and I stay hands-on through delivery, not just the design phase. I'm pragmatic, I coach teams rather than just deliver and move on, and I take ownership of outcomes.",
  },
  {
    short: "What are you like to work with?",
    label: "What are you like to work with?",
    answer:
      "Direct and low on politics — I'll flag problems early and I'd rather have an uncomfortable conversation upfront than a bigger one later. I work across technical and business stakeholders without needing much hand-holding once the objective is clear.",
  },
];
