# Cybersecurity Architecture Design Review (ADR) Template

A reusable, IEC 62443-based Architecture Design Review template for OT/IT integration projects at a regulated utility, plus a complete worked example, built for a fictional utility, **Keystone Gas & Electric**.

> **Portfolio Disclosure:** Self-directed training project. "Keystone Gas & Electric" is fictional. The remote-access review is a worked example, not a record of approval or assessment of a real deployed system.

## What's in this repo

| Path | Description |
|---|---|
| [`docs/architecture-design-review-template.md`](docs/architecture-design-review-template.md) | Full reusable template — 7 sections, ~60 checklist items, regulatory compliance mapping table |
| [`docs/architecture-design-review-worked-example.md`](docs/architecture-design-review-worked-example.md) | Complete worked review of a "Remote HMI Access Project," surfacing 4 findings and producing a Conditional Approval disposition |
| [`diagrams/remote-hmi-access-conduit-diagram.md`](diagrams/remote-hmi-access-conduit-diagram.md) | Mermaid zone/conduit diagram for the worked example, with findings annotated on the diagram itself |

## Why this project exists

The target job description names "Cybersecurity Architecture Design Reviews" as a specific tracked responsibility. This project builds an actual, usable review instrument — not just a checklist for its own sake — and proves it works by applying it end-to-end to a realistic remote-access project, showing how findings are scored and translated into a defensible governance decision.

## Frameworks Applied

IEC 62443-3-2 (Security Risk Assessment for System Design), IEC 62443-3-3 (System Security Requirements), NIST SP 800-82 Rev. 3 Chapter 5, TSA Security Directive Pipeline-2021-02 §3.5.

## Related Projects

- [`ics-ot-risk-assessment-lab`](../ics-ot-risk-assessment-lab) — RISK-005 (flat network segmentation) is the architectural pattern this review process is designed to catch before deployment
- [`tsa-biennial-audit-readiness-checklist`](../tsa-biennial-audit-readiness-checklist) — completed reviews feed the Architecture Design Review control domain's evidence index
- [`compliance-gap-tracker-v2`](../compliance-gap-tracker-v2) — the worked example's 4 conditions are tracked as ADR-2026-014 in the gap tracker

## Resume Bullets

1. *Built a reusable Cybersecurity Architecture Design Review template based on the IEC 62443 zones-and-conduits model, covering zone/conduit analysis, access control, data protection, patch management, and regulatory compliance mapping.*
2. *Applied the design review template to a worked remote-access project example, identifying 4 control gaps (MFA enforcement, session logging, SIEM integration, security level definition) and producing a Conditional Approval disposition with remediation conditions.*
3. *Mapped architecture review requirements to TSA Security Directive Pipeline-2021-02, IEC 62443-3-2/3-3, and NIST SP 800-82 Rev. 3, demonstrating applied translation of regulatory and technical standards into a usable governance instrument.*
4. *Designed a residual risk scoring and disposition framework for architecture reviews, directly supporting a utility's audit-readiness evidence trail for the Cybersecurity Architecture Design Review requirement.*

## License

MIT — see [LICENSE](LICENSE).

## Interactive project dashboard (November 2026)

- **[Open this project's public interactive explorer](https://arsh-project-lab.vercel.app/architecture-design-review-template/index.html)**
- **[Run the standalone HTML locally](dashboard/index.html)** (no account or service required)
- **[Open the complete public Project Lab](https://arsh-project-lab.vercel.app/)**

Use the offline design-review question checklist; no automatic approval. Source-linked sample data is embedded for offline inspection. Search, group filters and CSV export work locally; checklist review marks (where available) are browser-local only. The page is not a live backend, and changes in this repository will require a separate Vercel deployment until a Git integration is enabled. [Dashboard validation source](tests/dashboard_ui.test.mjs).

## Data modes and privacy (November 2026)

- **Synthetic demo (default):** Existing fictional records and checklists remain available offline and are labeled as training data.
- **Real public references (opt-in):** Select a verified source in the dashboard and click **Load public references**. Data appears in a separate panel with provenance and retrieval information, never blended into the fictional organization's metrics or assessment.
- **No local-data integration:** The public dashboard does not read local files, personal accounts, device information, or private GitHub repositories. No log upload, private evidence import, or workstation scanning is enabled.
- **Provenance:** See [source-manifest.json](data/source-manifest.json). Public data may be unavailable due to rate limits, provider changes, CORS, or connectivity; the offline demo continues to function.
- **Caution:** Public standards and vulnerability information are reference materials. They do not establish regulatory applicability, actual exploitation of an inventoried asset, or the compliance status of any organization.
- **Privacy hygiene:** Never commit credentials or personal evidence. Editing a current file does not remove its old contents from public Git history.
