export interface Faq {
  short: string;
  label: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    short: "Walk me through a Zero Trust architecture",
    label: "Walk me through a Zero Trust architecture you've designed.",
    answer:
      "The most substantial one I've delivered was a hub-and-spoke Zero Trust network on AWS Landing Zone Accelerator across 70+ accounts for a large enterprise. The core principle was: no implicit trust based on network location — every request is authenticated, authorised, and encrypted regardless of where it originates. Practically, that meant centralised egress inspection via AWS Network Firewall, east-west traffic control between workload accounts, Cloudflare WAF in front of 300+ web apps and APIs for north-south, and identity-aware access layered on top via Entra ID Conditional Access. The hard part isn't the technology — it's getting the network and identity teams aligned on a shared trust model and then operationalising it so the security controls don't become a bottleneck for delivery teams.",
  },
  {
    short: "Security in a DevSecOps pipeline",
    label: "How do you embed security into a DevSecOps pipeline?",
    answer:
      "I treat it as shifting controls left rather than bolting on gates at the end. In practice that means SAST and SCA running in the IDE and on every PR — developers get feedback before code merges, not after it's in production. IaC scanning (Checkov, tfsec) catches misconfigured infrastructure before it's deployed. DAST runs against staging environments as part of the release pipeline. Container images are scanned on build and again at runtime via the CNAPP layer. The cultural side matters as much as the tooling — security findings need to be actionable and low-noise, otherwise developers learn to ignore them. I tune policies to surface high-signal findings first and route them to the right owner so the pipeline stays fast.",
  },
  {
    short: "Cloud security outcomes you've delivered",
    label: "What cloud security outcomes have you delivered for enterprise clients?",
    answer:
      "A few that stand out: the Zero Trust network across 70+ AWS accounts I mentioned — that moved an enterprise from flat network trust to full micro-segmentation with centralised inspection. A Microsoft security uplift across M365, Entra ID, Defender XDR and Intune that reduced high-risk findings by around 70% — the big wins were Conditional Access policy redesign and privileged identity governance. And a critical infrastructure engagement where I remediated active ransomware risk and privilege-escalation paths across IT/OT, aligned to the Australian Essential Eight. Across all of them the common thread is translating security requirements into engineering outcomes — not just producing a report, but working with the teams until the controls are actually in place and working.",
  },
];
