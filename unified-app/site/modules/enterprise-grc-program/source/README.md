# Enterprise Cybersecurity GRC Program — NimbusHR Technologies

![NIST CSF](https://img.shields.io/badge/Framework-NIST%20CSF%201.1-blue?style=flat-square)
![SOC 2](https://img.shields.io/badge/Standard-SOC%202%20Type%20II-green?style=flat-square)
![NIST 800-53](https://img.shields.io/badge/Controls-NIST%20SP%20800--53-orange?style=flat-square)
![CIS v8](https://img.shields.io/badge/Benchmark-CIS%20Controls%20v8-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Synthetic%20Portfolio%20Case%20Study-blue?style=flat-square)

> **Accuracy note (Nov 2026):** All interviews, audit evidence, financial exposure figures and company personnel in this repository are **fabricated portfolio examples**, not actual audit procedures or services performed for a real employer. The scorecard uses **NIST CSF 1.1 identifiers** for historical training; [NIST CSF 2.0](https://www.nist.gov/cyberframework) has a different six-function structure and reorganized categories.

**A full-cycle, board-to-workpaper Governance, Risk & Compliance program** — governance framework, an 18-item enterprise risk register, a NIST CSF gap assessment, an ITGC audit, an eight-vendor third-party risk register, an IAM + SOC 2 Type II readiness audit, a network/cloud/DevOps security audit, and a complete incident response program with a ransomware tabletop exercise — all built around a single fictional company so every finding, risk, and control is internally consistent, the way a real enterprise GRC program actually works.

Built by **Mahmadarsh Vahora** as a portfolio demonstration for GRC / cybersecurity compliance roles — **UGI, Vanguard, Citadel, Penn Medicine, Eliassen Group**, and similar enterprise GRC / IT audit / risk analyst positions.

---

## Why This Exists

Most entry-level GRC candidates can describe frameworks. Almost none can produce the actual work product — a risk register with real scoring logic, an audit workpaper with sampling methodology, a SOC 2 readiness gap analysis, or a tabletop exercise that's designed to actually find gaps rather than just check a compliance box. This repository is that work product: 34 files, dense governance, audit, and risk documentation, and structured CSV data tables ready to drop into Excel, all cross-referencing the same fictional company (**NimbusHR Technologies** — see [`00-company-profile/`](00-company-profile/)) the way a real GRC program's risk register and audit findings describe the same organization.

*Executive reporting and the control library (the board-facing rollup and the 20-control framework-mapping matrix) are part of this program but kept out of the public repository; happy to walk through them directly.*

## Repository Structure

```
enterprise-grc-program/
├── README.md
├── 00-company-profile/
│   └── Company-Profile.md                     ← NimbusHR profile, data inventory, governance hierarchy
├── 01-governance-framework/
│   ├── GRC-Program-Charter.md
│   ├── Information-Security-Policy.md
│   ├── Risk-Appetite-Statement.md
│   ├── RACI-Matrix.md
│   └── Policy-Register.csv
├── 02-risk-register/
│   ├── Enterprise-Risk-Register.csv            ← 18 risks, full inherent/residual scoring
│   └── Risk-Register-Report.md                 ← methodology, heat map, top-5 treatment plans
├── 03-nist-csf-gap-assessment/
│   ├── NIST-CSF-Gap-Scorecard.csv              ← 20 subcategories, all 5 functions
│   └── NIST-CSF-Gap-Assessment-Report.md
├── 04-itgc-audit/
│   ├── ITGC-Audit-Report.md
│   ├── Access-Control-Review-Workpaper.csv
│   ├── Change-Management-Findings.csv
│   ├── Segregation-of-Duties-Matrix.csv
│   └── Corrective-Action-Plan-Tracker.csv
├── 05-vendor-risk-management/
│   ├── Vendor-Risk-Management-Policy.md
│   ├── Vendor-Assessment-Questionnaire.md
│   ├── Vendor-Risk-Assessments.md              ← Okta, Stripe, ADP, GitHub (full detail)
│   └── Vendor-Risk-Register.csv                ← all 8 assessed vendors
├── 06-iam-soc2-assessment/
│   ├── IAM-Audit-Report.md
│   ├── IAM-Findings.csv                        ← 7 findings, Critical → Low
│   ├── SOC2-Readiness-Assessment.md
│   └── SOC2-Readiness-Scorecard.csv            ← all 5 AICPA Trust Services Criteria
├── 07-network-cloud-devops-audit/
│   ├── Network-Security-Audit-Report.md
│   ├── Cloud-Security-Audit-Report.md
│   ├── DevOps-SDLC-Governance-Audit.md
│   └── Consolidated-Findings-Matrix.csv        ← 15 findings, NET/CLD/DEV
├── 08-incident-response-program/
│   ├── Incident-Response-Policy.md
│   ├── Incident-Response-Plan.md
│   ├── Tabletop-Exercise-Operation-Frozen-Payroll.md
│   ├── IR-Metrics.csv
│   └── Templates/
│       ├── Post-Incident-Review-Template.md
│       └── Tabletop-Exercise-Template.md
└── docs/
    ├── AI-Build-Prompt.md                      ← how this was built, transparently
    └── Interview-Talking-Points.md
```

## Module Index

| # | Module | Headline Finding |
|---|---|---|
| 1 | [Governance Framework](01-governance-framework/) | Charter, InfoSec Policy, Risk Appetite Statement, RACI, 12-policy register |
| 2 | [Enterprise Risk Register](02-risk-register/) | 18 risks scored on a 5×5 matrix; 1 Critical item overdue |
| 3 | [NIST CSF Gap Assessment](03-nist-csf-gap-assessment/) | Overall maturity 2.6/4.0; Data Loss Prevention scores 1/4 |
| 4 | [ITGC Audit](04-itgc-audit/) | 9 findings incl. a DevOps engineer who could approve their own production deploys |
| 5 | [Vendor Risk Management](05-vendor-risk-management/) | GitHub — 14 repos with hardcoded production secrets (Critical, same-day remediation) |
| 6 | [IAM & SOC 2 Readiness](06-iam-soc2-assessment/) | SOC 2 readiness: 62% — 2 audit-disqualifying failures identified |
| 7 | [Network/Cloud/DevOps Audit](07-network-cloud-devops-audit/) | Public S3 bucket exposing 847 payroll files — active data exposure, not theoretical |
| 8 | [Incident Response Program](08-incident-response-program/) | Ransomware tabletop — 5 of 8 injects surfaced a real, previously undocumented gap |

## Frameworks Applied

NIST CSF 1.1 · NIST SP 800-53 · SOC 2 Type II (AICPA Trust Services Criteria) · CIS Controls v8 · ISO 27001 (referenced) · GDPR · CCPA · SOX-style ITGC methodology

## A Note on Format

The blueprint this program follows calls for real `.xlsx` and `.pbix` files. I built the equivalent of those honestly instead of faking binary files an AI can't actually produce: every register and tracker is a real, data-complete `.csv` (open directly in Excel or Google Sheets — GitHub also renders them as tables). The executive Power BI dashboard is built from a full specification (page layouts, visuals, exact DAX measures) and is available on request rather than in this public repository.

## How This Was Built

Drafted with AI assistance (Claude) and directed, reviewed, and owned by the author — risk scoring, finding severity, and remediation prioritization are analyst judgment calls, not AI output. Full transparency on the workflow: [`docs/AI-Build-Prompt.md`](docs/AI-Build-Prompt.md).

## Skills Demonstrated

Governance framework design · Enterprise risk assessment & risk register management · NIST CSF maturity assessment · IT General Controls (ITGC) auditing · Third-party/vendor risk management · IAM auditing · SOC 2 Type II readiness assessment · Cloud security auditing (AWS) · DevOps/SDLC governance auditing · Incident response design & tabletop facilitation · Executive and board-level reporting · Corrective Action Plan (CAP) management · Regulatory compliance (GDPR, CCPA, SOC 2)

## About

**Mahmadarsh Vahora** | [github.com/mvahora2023](https://github.com/mvahora2023)

*Classification: Portfolio simulation — public. All company names, data, and personnel referenced (NimbusHR Technologies and its vendors) are fictional, constructed solely for this simulation.*

## Interactive project dashboard (November 2026)

- **[Open this project's public interactive explorer](https://arsh-project-lab.vercel.app/enterprise-grc-program/index.html)**
- **[Run the standalone HTML locally](dashboard/index.html)** (no account or service required)
- **[Open the complete public Project Lab](https://arsh-project-lab.vercel.app/)**

Explore the fictional enterprise risk register; not an actual audit. Source-linked sample data is embedded for offline inspection. Search, group filters and CSV export work locally; checklist review marks (where available) are browser-local only. The page is not a live backend, and changes in this repository will require a separate Vercel deployment until a Git integration is enabled. [Dashboard validation source](tests/dashboard_ui.test.mjs).

## Data modes and privacy (November 2026)

- **Synthetic demo (default):** Existing fictional records and checklists remain available offline and are labeled as training data.
- **Real public references (opt-in):** Select a verified source in the dashboard and click **Load public references**. Data appears in a separate panel with provenance and retrieval information, never blended into the fictional organization's metrics or assessment.
- **No local-data integration:** The public dashboard does not read local files, personal accounts, device information, or private GitHub repositories. No log upload, private evidence import, or workstation scanning is enabled.
- **Provenance:** See [source-manifest.json](data/source-manifest.json). Public data may be unavailable due to rate limits, provider changes, CORS, or connectivity; the offline demo continues to function.
- **Caution:** Public standards and vulnerability information are reference materials. They do not establish regulatory applicability, actual exploitation of an inventoried asset, or the compliance status of any organization.
- **Privacy hygiene:** Never commit credentials or personal evidence. Editing a current file does not remove its old contents from public Git history.
