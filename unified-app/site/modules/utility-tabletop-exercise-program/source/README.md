# Utility Tabletop Exercise (TTX) Program

A tabletop exercise *design package* comprising a charter, scenario, facilitator guide, and after-action report template for fictional utility **Keystone Gas & Electric**. It demonstrates exercise planning and documentation, not evidence that an actual multi-person exercise was conducted.

> **Portfolio Disclosure:** Self-directed training project. "Keystone Gas & Electric" and "IRON CRANE" are fictional.

## What's in this repo

| Path | Description |
|---|---|
| [`docs/ttx-program-charter.md`](docs/ttx-program-charter.md) | Program purpose, governance, regulatory drivers, annual exercise calendar, tracked metrics |
| [`docs/ttx-facilitator-guide.md`](docs/ttx-facilitator-guide.md) | Full "Operation Lockout" ransomware/OT scenario — 15 sequential injects, facilitator notes, closing discussion questions |
| [`docs/after-action-report-template.md`](docs/after-action-report-template.md) | Reusable AAR template pre-populated with 5 findings and a 90/180/365-day improvement plan |
| [`diagrams/operation-lockout-timeline.md`](diagrams/operation-lockout-timeline.md) | Mermaid timeline visualizing the Day 0–3 inject sequence |

## Why this project exists

The target job description names "Tabletop exercises" as a specifically tracked responsibility. This project builds the full program a GRC analyst would own — not a single generic scenario — including governance (who runs it, how often, what gets measured) and a realistic scenario that blends IT and OT elements the way real incidents unfold, including a deliberate "false flag" inject that tests judgment under ambiguity rather than scripted response.

## Regulatory Drivers

TSA Security Directive Pipeline-2021-02 (incident response/exercise requirements), PA PUC oversight, NIST SP 800-82 Rev. 3 Chapter 4.

## Related Projects

- [`tsa-biennial-audit-readiness-checklist`](../tsa-biennial-audit-readiness-checklist) — CIRP annual test requirement is evidenced by this program's exercise records
- [`compliance-gap-tracker-v2`](../compliance-gap-tracker-v2) — aggregates AAR findings into the executive dashboard's remediation tracker

## Resume Bullets

1. *Designed and documented a complete Tabletop Exercise program for a simulated regulated utility, including program charter, governance model, and annual exercise calendar aligned to TSA Security Directive Pipeline-2021-02 requirements.*
2. *Authored a full-scale ransomware tabletop exercise scenario spanning IT and OT/SCADA environments, including 15 sequential injects, facilitator guidance, and evaluation criteria testing cross-functional incident response coordination.*
3. *Built a reusable After-Action Report template with a structured findings log, remediation ownership assignment, and a 90/180/365-day improvement plan, directly supporting gap-to-closure tracking discipline.*
4. *Developed exercise-derived discussion questions targeting regulatory reporting clock accuracy, OT isolation decision authority, and vendor access revocation procedures — surfacing governance gaps before a live incident or regulatory audit would.*

## License

MIT — see [LICENSE](LICENSE).

## Interactive project dashboard (November 2026)

- **[Open this project's public interactive explorer](https://arsh-project-lab.vercel.app/utility-tabletop-exercise-program/index.html)**
- **[Run the standalone HTML locally](dashboard/index.html)** (no account or service required)
- **[Open the complete public Project Lab](https://arsh-project-lab.vercel.app/)**

Walk through the fictional incident-response inject timeline. Source-linked sample data is embedded for offline inspection. Search, group filters and CSV export work locally; checklist review marks (where available) are browser-local only. The page is not a live backend, and changes in this repository will require a separate Vercel deployment until a Git integration is enabled. [Dashboard validation source](tests/dashboard_ui.test.mjs).

## Data modes and privacy (November 2026)

- **Synthetic demo (default):** Existing fictional records and checklists remain available offline and are labeled as training data.
- **Real public references (opt-in):** Select a verified source in the dashboard and click **Load public references**. Data appears in a separate panel with provenance and retrieval information, never blended into the fictional organization's metrics or assessment.
- **No local-data integration:** The public dashboard does not read local files, personal accounts, device information, or private GitHub repositories. No log upload, private evidence import, or workstation scanning is enabled.
- **Provenance:** See [source-manifest.json](data/source-manifest.json). Public data may be unavailable due to rate limits, provider changes, CORS, or connectivity; the offline demo continues to function.
- **Caution:** Public standards and vulnerability information are reference materials. They do not establish regulatory applicability, actual exploitation of an inventoried asset, or the compliance status of any organization.
- **Privacy hygiene:** Never commit credentials or personal evidence. Editing a current file does not remove its old contents from public Git history.
