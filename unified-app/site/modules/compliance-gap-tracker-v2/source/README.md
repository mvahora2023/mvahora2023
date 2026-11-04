# Compliance Gap Tracker v2

A working compliance operations dashboard — built as both a self-contained interactive HTML dashboard and an Excel workbook with live charts — upgrading a Phase 1 Excel tracker into a metrics-driven governance reporting tool for a fictional utility, **Keystone Gas & Electric**.

> **Portfolio Disclosure:** All data is synthetic. "Keystone Gas & Electric" is fictional.

## Interactive dashboard

**Hosted demo:** https://compliance-gap-tracker-v2.vercel.app/ (Vercel production deployment, independently managed from the GitHub repository). The dashboard also runs locally as a standalone file.

**Technical status:** This static demo uses fabricated data, not live utility systems. A dependency-free Node consistency test and GitHub Actions validation workflow are included. The Vercel project currently deploys from an explicitly uploaded HTML snapshot, so new GitHub commits do not automatically update the hosted copy until Git integration is enabled or another deployment is made.

Open [`dashboard/index.html`](dashboard/index.html) directly in any browser — no server, build step, or internet connection required. It implements the full 5-page design spec with real, interactive charts and filters:

1. **Executive Summary** — KPI cards (Overall Compliance %, Open/Overdue Exceptions, Audit-Readiness Score), 6-month trend line, status donut
2. **TSA Requirements Detail** — filterable table of 18 requirements by control domain and status
3. **PUC Requirements Detail** — same structure for 12 PA PUC requirements
4. **Exception & Gap Tracker** — open exceptions by domain (bar), age distribution (histogram), owner workload, detail table
5. **Trend & Metrics** — rolling 6-month compliance trend, monthly closure rate, audit-readiness score over time

Built with vanilla HTML/CSS/JS and hand-rolled canvas charts — no external chart library dependency, so it works fully offline and renders correctly in light and dark mode.

## What's in this repo

| Path | Description |
|---|---|
| [`dashboard/index.html`](dashboard/index.html) | Working interactive dashboard (open directly in a browser) |
| [`dashboard/compliance-dashboard.xlsx`](dashboard/compliance-dashboard.xlsx) | Excel workbook equivalent with live native charts (line, pie, bar) across 5 sheets |
| [`docs/gap-tracker-v2-design-spec.md`](docs/gap-tracker-v2-design-spec.md) | Full functional spec: data model, 20 DAX measures (plain English), 5 report pages, visual design guidance |
| [`docs/sample-data-schema.md`](docs/sample-data-schema.md) | Column-level schema for all 5 data model tables |
| [`docs/executive-report-template.md`](docs/executive-report-template.md) | Monthly executive memo template derived from the dashboard |

## Why this project exists

The target job description names two specific responsibilities this project answers directly: "establish and track metrics for cybersecurity regulatory governance programs" and "deliver regular risk and compliance metrics to IT senior leadership." Rather than stopping at a design spec, this project ships a working dashboard a hiring manager can actually open and click through, plus the Power BI-equivalent Excel version demonstrating the same DAX-measure thinking (compliance %, overdue exceptions, average days to remediate) in a tool most reviewers can open without any additional software.

## Related Projects

This dashboard's sample data models findings from every other project in this portfolio:
- [`utility-tabletop-exercise-program`](../utility-tabletop-exercise-program) — AAR findings feed the Incident Response Plan exception (EXC-0084)
- [`architecture-design-review-template`](../architecture-design-review-template) — the worked example's 4 conditions feed the Architecture Design Review exception (EXC-0082)
- [`ics-ot-risk-assessment-lab`](../ics-ot-risk-assessment-lab) — RISK-005/RISK-009 remediation feeds the Network Segmentation exceptions (EXC-0071, EXC-0087)
- [`tsa-biennial-audit-readiness-checklist`](../tsa-biennial-audit-readiness-checklist) — the checklist's evidence index is the source for the TSA/PUC Requirements Detail pages

## Resume Bullets

1. *Built a working compliance operations dashboard (interactive HTML + Excel) tracking TSA and PUC regulatory requirements, open exceptions, and remediation status for a simulated regulated utility.*
2. *Designed a Power BI-equivalent data model spanning Requirements, Evidence, Exceptions, and Remediations tables, defining 20 DAX measures supporting executive and operational reporting views.*
3. *Built a 5-page dashboard (Executive Summary, TSA/PUC Requirement Detail, Exception and Gap Tracker, Trend and Metrics) with conditional-formatting-driven status visualization for regulatory compliance monitoring.*
4. *Authored a monthly executive compliance reporting template translating dashboard metrics into a structured leadership memo, covering compliance posture, top-risk exceptions, remediation progress, and recommended actions.*

## License

MIT — see [LICENSE](LICENSE).

## Data modes and privacy (November 2026)

- **Synthetic demo (default):** Existing fictional records and checklists remain available offline and are labeled as training data.
- **Real public references (opt-in):** Select a verified source in the dashboard and click **Load public references**. Data appears in a separate panel with provenance and retrieval information, never blended into the fictional organization's metrics or assessment.
- **No local-data integration:** The public dashboard does not read local files, personal accounts, device information, or private GitHub repositories. No log upload, private evidence import, or workstation scanning is enabled.
- **Provenance:** See [source-manifest.json](data/source-manifest.json). Public data may be unavailable due to rate limits, provider changes, CORS, or connectivity; the offline demo continues to function.
- **Caution:** Public standards and vulnerability information are reference materials. They do not establish regulatory applicability, actual exploitation of an inventoried asset, or the compliance status of any organization.
- **Privacy hygiene:** Never commit credentials or personal evidence. Editing a current file does not remove its old contents from public Git history.
