export interface Faq {
  short: string;
  label: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    short: "What does hands-on mean at architect level?",
    label: "What does hands-on mean to you at architect level?",
    answer:
      "It means I'm in the Terraform, reviewing the pipeline config, and sitting with the engineering team when something breaks — not handing off a design doc and disappearing. Architecture that no one can implement isn't architecture, it's just slides.",
  },
  {
    short: "How do you approach a new client environment?",
    label: "How do you approach a new client's cloud environment?",
    answer:
      "First two weeks are always listen and observe — I map what's actually running, not what the diagrams say, and find the gaps between assumed and real security posture. Then I prioritise by blast radius: what would hurt most if it failed, and fix that first.",
  },
  {
    short: "Hardest security problem you've solved?",
    label: "What's the hardest security problem you've solved?",
    answer:
      "Redesigning the network architecture for 80+ AWS accounts at University of Sydney while clinical research systems stayed live — zero downtime, protected data, teams still shipping. The hard part was sequencing the cutover so nothing broke and no one noticed.",
  },
  {
    short: "Where are you headed next?",
    label: "Where are you headed next in your career?",
    answer:
      "Deeper into AI security — as organisations move LLMs into production, the security controls aren't keeping pace, and that's where I want to be. The right role is somewhere security is genuinely valued, not treated as a compliance checkbox.",
  },
  {
    short: "Sectors & regions?",
    label: "What sectors and regions have you worked across?",
    answer:
      "Telecommunications, media, government, financial services, higher education, and critical infrastructure — across Australia, UAE, Qatar, and the US. That breadth means I've seen how security scales (and fails) across very different regulatory and operational environments.",
  },
  {
    short: "What sets you apart?",
    label: "What makes you different from other security architects?",
    answer:
      "I'm hands-on from design through to engineering — I don't disappear after the architecture review. I see my role as an enabler: I work with engineering teams, not around them, so security actually lands rather than sitting in a backlog.",
  },
];
