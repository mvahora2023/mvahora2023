# TSA Biennial Cybersecurity Audit Readiness Checklist

A portfolio project demonstrating GRC audit-readiness methodology for a regulated natural gas utility subject to TSA Security Directive Pipeline-2021-02, built for a fictional utility, **Keystone Gas & Electric**.

> **Portfolio Disclosure:** This is a self-directed training project. "Keystone Gas & Electric" is fictional. No content reflects the real security posture, controls, or compliance status of any real utility or pipeline operator. The checklist is not evidence of an actual regulatory audit or a substitute for checking the current TSA directives and legal requirements.

## What's in this repo

| Path | Description |
|---|---|
| [`docs/tsa-biennial-audit-readiness-checklist.md`](docs/tsa-biennial-audit-readiness-checklist.md) | Full checklist: 10 control domains, evidence artifact index, audit-day logistics, post-audit actions |
| [`tools/evidence-tracker.xlsx`](tools/evidence-tracker.xlsx) | Working Excel evidence tracker — every checklist item as a trackable row with status dropdowns, owner, due date, and conditional-formatted status coloring |

## Why this project exists

The target role (Cybersecurity Senior GRC Analyst, regulated utility sector) names tracking the **Biennial Cybersecurity Audit** as a specific responsibility. This project builds the actual artifact a GRC analyst would maintain year-round to stay audit-ready, rather than a one-time compliance summary: a live tracker with per-item ownership, status, and evidence linkage, backed by the full checklist methodology mapped to TSA SD Pipeline-2021-02.

## Regulatory Basis

TSA Security Directive Pipeline-2021-02 (and successor directives), 49 CFR Part 1520 (SSI handling).

## Related Projects

- [`architecture-design-review-template`](../architecture-design-review-template) — feeds evidence into the Cybersecurity Architecture Design Review control domain
- [`utility-tabletop-exercise-program`](../utility-tabletop-exercise-program) — feeds evidence into the CIRP annual test requirement
- [`compliance-gap-tracker-v2`](../compliance-gap-tracker-v2) — aggregates this checklist's findings into an executive-facing dashboard

## Resume Bullets

1. *Developed a TSA Security Directive Pipeline-2021-02 Biennial Cybersecurity Audit readiness framework covering 10 control domains, standardizing evidence artifact tracking and reducing audit-response risk through structured ownership assignment.*
2. *Built a working Excel-based evidence tracker operationalizing the audit-readiness checklist, with status tracking, ownership assignment, and conditional-formatted compliance visualization.*
3. *Designed pre-audit, audit-day, and post-audit governance workflows for a regulated utility cybersecurity audit program, including corrective action plan tracking and remediation-to-closure processes consistent with TSA and NIST SP 800-82 practices.*

## License

MIT — see [LICENSE](LICENSE).

## Interactive project dashboard (November 2026)

- **[Open this project's public interactive explorer](https://arsh-project-lab.vercel.app/tsa-biennial-audit-readiness-checklist/index.html)**
- **[Run the standalone HTML locally](dashboard/index.html)** (no account or service required)
- **[Open the complete public Project Lab](https://arsh-project-lab.vercel.app/)**

Review the historical evidence checklist; it is not a current regulatory ruling. Source-linked sample data is embedded for offline inspection. Search, group filters and CSV export work locally; checklist review marks (where available) are browser-local only. The page is not a live backend, and changes in this repository will require a separate Vercel deployment until a Git integration is enabled. [Dashboard validation source](tests/dashboard_ui.test.mjs).

## Data modes and privacy (November 2026)

- **Synthetic demo (default):** Existing fictional records and checklists remain available offline and are labeled as training data.
- **Real public references (opt-in):** Select a verified source in the dashboard and click **Load public references**. Data appears in a separate panel with provenance and retrieval information, never blended into the fictional organization's metrics or assessment.
- **No local-data integration:** The public dashboard does not read local files, personal accounts, device information, or private GitHub repositories. No log upload, private evidence import, or workstation scanning is enabled.
- **Provenance:** See [source-manifest.json](data/source-manifest.json). Public data may be unavailable due to rate limits, provider changes, CORS, or connectivity; the offline demo continues to function.
- **Caution:** Public standards and vulnerability information are reference materials. They do not establish regulatory applicability, actual exploitation of an inventoried asset, or the compliance status of any organization.
- **Privacy hygiene:** Never commit credentials or personal evidence. Editing a current file does not remove its old contents from public Git history.
