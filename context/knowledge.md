# Who I Am

I'm Eugine Dsylva — a Cloud Security Architect based in Sydney, Australia. Open to remote / global engagements.

**By the numbers:** 18+ years in IT, 80+ cloud accounts secured, 300+ web apps and APIs protected, 20 industry certifications.

**Headline positioning:** I design and build cloud security programs that hold — hands-on from architecture through delivery, for enterprises moving fast on AWS and Azure. I've spent close to two decades in IT, with the last six years focused on cloud-native security at enterprise scale. Before Australia, I worked in regulated environments in the UAE and Qatar, which gave me a strong foundation in compliance-driven, high-stakes security delivery.

I'm hands-on from design through to delivery. I don't just produce architecture diagrams — I work with engineering teams to make security real in the code, the pipeline, and the platform.

**Languages:** English and Tamil.

**Personal:** Originally from South India. I've lived in the UAE (5 years), Qatar (5 years), and Australia (6+ years, primarily Sydney). Happily married with a toddler. I'm into fitness — exercise and staying active is a regular part of my routine.

**Focus for 2025:** Building my personal brand and deepening my focus on AI security — combining architecture, engineering, and AI governance as organisations move from experimentation to production AI deployment.

---

# Major Engagements

## University of Sydney — Multi-Year Cloud Security Transformation
A multi-year cyber transformation program covering network redesign, cloud security uplift, and container workload security across 80+ AWS accounts.

When I arrived, the environment was a basic lift-and-shift cloud estate with limited security visibility. Post-COVID digital transformation had accelerated cloud adoption significantly, and the security posture hadn't kept pace.

**What I built:**
- Full hub-and-spoke network architecture on AWS — Transit Gateway setup, Direct Connect Gateway, multi-account multi-region design
- Ingress, egress, and east-west traffic inspection using AWS Network Firewall and AWS Firewall Manager
- AWS WAF and Cloudflare for edge and application layer protection — securing 300+ web applications and APIs
- Macro and micro segmentation across the estate to reduce lateral movement risk
- Kubernetes and container workload security for research and clinical systems
- CNAPP visibility across the full estate

**Sensitive workloads:** Clinical trial centre and research technology systems handling protected data — required strict access controls, workload isolation, and continuous posture monitoring.

**Outcome:** Complete network redesign delivered over 2+ years. Significant reduction in attack surface and full visibility across 80+ cloud accounts and 300+ protected web apps and APIs.

---

## Australian Red Cross — Microsoft 365 Security Assessment & Remediation
Security assessment and full remediation of the Microsoft 365, Intune, and Entra ID environment.

**What I found:**
- Significant Conditional Access gaps — missing policies for high-risk sign-ins, no device compliance enforcement
- Over-privileged identities — excessive admin roles, no PIM in use, stale accounts with standing access
- Unmanaged devices accessing corporate data with no endpoint compliance baseline

**What I delivered:**
- Conditional Access policies covering all access scenarios — risk-based, device compliance, MFA enforcement
- Privileged Identity Management (PIM) rollout — just-in-time access, approval workflows, access reviews
- Intune device compliance baseline — endpoint health checks, encryption enforcement, unmanaged device blocking
- Identity governance uplift — role cleanup, stale account remediation, access certification

**Outcome:** Approximately 70% reduction in high-risk findings. Delivered in 3 months.

---

## Ausgrid — Critical Infrastructure Security (OT/IT)
Preventive security hardening for Ausgrid, an energy sector operator regulated under SOCI (Security of Critical Infrastructure Act).

The engagement was pre-emptive — threat intelligence indicated ransomware groups actively targeting energy sector endpoints. The goal was to reduce the attack surface before an incident occurred.

**What I delivered:**
- Essential Eight maturity uplift across the environment
- Privileged Access Workstation (PAW) implementation — hardened, air-gapped workstations for admin functions
- Windows Defender configuration and endpoint hardening across OT-adjacent systems
- Attack surface reduction — removed unnecessary services, enforced application control, tightened network paths between IT and OT zones
- Bridged the gap between IT security requirements and OT operational constraints where availability takes priority over confidentiality

---

# What I Deliver (Services)

## Secure-by-Design Multi-Cloud Architecture
I design and deploy scalable multi-account landing zones with automated policy-as-code guardrails, strict identity boundaries, and continuous CNAPP visibility — catching misconfigurations before they reach production.
Stack: AWS / Azure, CNAPP, CSPM, Landing Zones, Wiz.

## Zero Trust Network & Edge Architecture
I eliminate legacy high-risk network paths by engineering hub-and-spoke topologies, edge consolidation, and granular segmentation. From API gateway hardening and network security uplift to WAF enforcement — isolating threats and preventing lateral movement.
Stack: Zero Trust, SASE, Cloudflare WAF, API Gateway, Microsegmentation.

## DevSecOps & Pipeline Security
I shift security left by embedding automated controls directly into CI/CD and GitOps pipelines — from IaC scanning and secrets management to container image hardening and full-spectrum application security testing. Compliance built in, not bolted on.
Stack: DevSecOps, IaC Scanning, GitOps, SAST / SCA / DAST, Secrets Management.

My positioning: independent technical partner — turning complex cloud security risk into automated, code-first protection that enterprise teams can operate at scale.

---

# Featured Projects

## Cloud & Network Edge Security
- **Zero Trust Hub-and-Spoke**: Designed and built Zero Trust network architecture on AWS Landing Zone Accelerator across 70+ accounts, securing 300+ web apps and APIs via Cloudflare WAF and AWS Network Firewall.
- **Edge WAF & API Protection**: Consolidated ingress security across enterprise applications using Cloudflare WAF, TLS hardening, ADC/WAF policy-as-code, and API gateway controls at scale.
- **Cloud Ingress Migration**: Led migration of on-premises perimeter controls to cloud-native ingress, including MFA enforcement, cloud firewall policy standardisation, and network segmentation uplift.

## Cloud Native Application Protection
- **CNAPP Guardrails Deployment**: Built policy-as-code guardrails aligned to CNAPP frameworks across Kubernetes, multi-cloud AWS/Azure, and serverless — driving measurable reduction in cloud security risk.
- **DevSecOps Pipeline Integration**: Embedded full-spectrum AppSec controls into CI/CD and GitOps pipelines — SAST, SCA, DAST, IaC security, secrets management, and container image/runtime scanning.
- **Cloud Security Posture Assessments**: Led posture assessments across AWS, Azure, and SaaS environments, implementing CNAPP-aligned controls across compute, containers, and serverless workloads.

## Identity & Endpoint
- **M365 Security Remediation**: Delivered enterprise-wide Microsoft 365 security uplift across Entra ID, Identity Protection, Intune, Defender XDR, DLP, and CASB — reducing high-risk findings by ~70%.
- **Zero Trust Identity Rollout**: Implemented Zero Trust access principles for a globally distributed workforce — VDI hardening, MDM, MFA, and remote access security across 30+ enterprise applications.
- **Essential Eight Uplift**: Remediated ransomware and privilege-escalation risk across SOCI critical-infrastructure IT/OT environments, aligned to Essential Eight maturity model requirements.

---

# Key Outcomes (from enterprise engagements)

**Securing a lift-and-shift cloud estate from the ground up**
Challenge: 80+ AWS and Azure accounts, limited security visibility, no landing zone, no guardrails, no posture management baseline.
Outcome: Ran full security assessment and crown jewel threat modelling. Designed and delivered a Landing Zone architecture, automated cloud security guardrails, and continuous CNAPP visibility across the entire estate.

**Zero Trust network & edge architecture at scale**
Challenge: 300+ public-facing web apps and APIs had no centralised ingress control, no edge consolidation, and no API gateway enforcement — leaving the core data estate exposed.
Outcome: Engineered a Zero Trust hub-and-spoke network topology, consolidated the edge, hardened API gateways, and centralised WAF enforcement — securing 300+ web apps without interrupting active delivery pipelines.

**Eradicating configuration drift at pipeline level**
Challenge: Rapidly expanding cloud footprint required compliance at scale. Manual reviews and late-stage audits were bottlenecking deployment speed and introducing configuration drift.
Outcome: Embedded IaC scanning, secrets management, and full-spectrum CNAPP controls directly into CI/CD and GitOps pipelines — engineering teams ship verified, compliant code with compliance built in, not bolted on.

---

# What I Do

## Cloud & Infrastructure Security
- Designed and delivered Zero Trust hub-and-spoke architecture on AWS Landing Zone Accelerator (LZA) across 70+ accounts for large enterprises
- Secured 300+ web applications and APIs using Cloudflare WAF and AWS Network Firewall — DDoS mitigation, bot management, OWASP Top 10, and API threat protection
- Multi-cloud security posture management across AWS and Azure, including Kubernetes workload security and serverless function hardening

## DevSecOps & AppSec
- Embedded AppSec tooling into CI/CD pipelines and GitOps workflows — tools include Snyk, Trivy, and Checkov for SAST, SCA, container scanning, and IaC scanning
- Shift-left security as a default — security gates in the pipeline, not an afterthought at audit time
- Built CNAPP-aligned guardrails for containerised workloads — policy-as-code, runtime protection, and supply chain integrity
- Worked across regulated industries where audit trails, evidence packs, and compliance mapping are as important as the technical controls

## Microsoft Security Stack
- Led Microsoft 365 / Entra ID / Defender XDR / Intune security uplift — Conditional Access, PIM, identity governance, and endpoint compliance at scale
- Achieved approximately 70% reduction in high-risk findings at Australian Red Cross through structured assessment and remediation

## Critical Infrastructure & OT
- Remediated ransomware and privilege-escalation risk across SOCI-regulated critical infrastructure at Ausgrid, aligning IT/OT security to the Australian Essential Eight maturity model
- Experience bridging IT security teams and OT/ICS environments where availability constraints require a different approach to control implementation

## CNAPP Operationalisation
- Tool of choice: Wiz — using Wiz Code, Wiz Cloud, and Wiz Defend across the full lifecycle
- The biggest failure mode in CNAPP adoption is ownership — organisations buy the tool, generate findings, and no one is accountable for remediating them. Security teams see the alerts, engineering teams don't feel responsible, and the backlog grows
- Good operationalisation means embedding Wiz into existing workflows — triage processes, SLA definitions, integration with ticketing systems, and engineering team enablement so they own their findings
- Policy tuning matters as much as deployment — out-of-the-box rules generate noise; good operationalisation means calibrating signal-to-noise so teams act on what matters

## AI Security Posture Management (AI-SPM)
- Securing AI/ML pipelines, model registries, and agentic workflows as enterprises adopt LLMs
- Current focus area as organisations move from AI experimentation to production deployment without adequate security controls in place

## FinOps
- I have a practical interest in cloud financial operations — understanding spend visibility, tagging hygiene, reserved capacity planning, and waste reduction
- My commerce and business management background means I can engage with finance and engineering teams on cloud spend without needing a translator
- Not my primary offering, but I bring it into engagements where security architecture decisions have direct cost implications — e.g. traffic inspection architecture, logging volumes, data residency choices

---

# Certifications

- CISSP — Certified Information Systems Security Professional
- CISA — Certified Information Systems Auditor
- AWS Solutions Architect – Professional
- AWS Security Specialty
- AWS DevOps Engineer – Professional
- AWS Advanced Networking Specialty
- Azure Solutions Architect Expert
- Azure Security Engineer Associate
- M365 Security Administrator Associate
- M365 Enterprise Administrator Expert
- TOGAF 9 Certified (Enterprise Architecture)
- CCIE Security (Cisco Certified Internetwork Expert)
- CCNP Data Center
- PMP (Project Management Professional)
- Citrix CCE-AppDS
- VMware IE6
- MSc Information Systems Security

Total: 20 industry certifications.

---

# Background & Education

- MSc in Information Systems Security — Charles Sturt University, NSW, Australia (2016–2017)
- Undergraduate background in Commerce and Business Management (India) — gives me a grounding in business and finance that most security architects don't have. I understand risk in commercial terms, not just technical ones.
- Started career in network and application operations, progressed through infrastructure and systems integration, then transitioned fully into cybersecurity, architecture, and engineering
- Worked across financial services, government, universities, energy, and critical infrastructure sectors
- Based in Sydney; previously worked in the UAE and Qatar in regulated and government-adjacent environments

## Career History

**Principal Consultant / Cloud Security Architect | Various (Australia, 2019–present)**
Current focus: cloud security architecture, Zero Trust, CNAPP, DevSecOps, and AI security posture management for enterprise clients across financial services, government, education, and critical infrastructure.

**Systems Integration & Infrastructure Consultant | UAE (2010–2015)**
Advanced from network and application operations into systems integration consulting, architecting infrastructure and virtualisation for UAE government entities across 20+ projects. Developed deep expertise in Cisco enterprise routing/switching, large-scale secure Citrix VDI deployments, and multi-site infrastructure orchestration.

**Computer Network Engineer | Global Eagle (UAE, 2013–2015)**
Configured Cisco routing, switching, and firewalls for 24×7 VSAT services, maintaining 99.9% service availability.

**Senior Citrix Administrator | Etisalat (UAE, 2012–2013)**
Designed and administered secure Citrix VDI infrastructure for 5,000+ users across multi-region contact-centre environments.

**Systems Engineer | Solutions Middle East (UAE, 2010–2012)**
Delivered virtualisation and infrastructure security solutions for UAE government clients across 20+ engagements.

**Application Engineer | CSS Corp (India, 2008–2010)**
Provided L2/L3 network and application support, improving resolution quality and operational stability. This was the start of the career — network and application operations before moving into infrastructure and security.

---

# What I'm Open To

- Select architecture engagements — particularly CNAPP operationalisation, Zero Trust programs, and AI/ML security
- The right full-time role — Head of Security Architecture, Principal Security Architect, or similar at an organisation where security is genuinely valued
- Open to roles or engagements where security and FinOps intersect — cloud governance, cost-aware architecture, or platforms teams where spend and security posture are managed together
- Not interested in pure advisory or slide-deck roles — I want to build things and drive outcomes

---

# How to Reach Me

- LinkedIn: linkedin.com/in/euginevd/
- Email: euginevd@gmail.com
- Book a meeting: cal.com/euginevd/30min
