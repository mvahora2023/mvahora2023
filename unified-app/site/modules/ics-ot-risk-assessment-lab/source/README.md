# ICS/OT Risk Assessment Lab

A documented ICS/OT cybersecurity risk-assessment portfolio using a modeled SCADA environment and GRFICS-based scenario. It illustrates asset inventory, threat modeling, risk scoring, and remediation planning; the repository's scan and packet-capture examples are explicitly simulated, not evidence of an independently verified live test.

> **Portfolio Disclosure:** All assets, network addresses, and findings are generated within an isolated lab environment. "Keystone Gas & Electric" is fictional. No production OT system or real utility infrastructure is represented.

## What's in this repo

| Path | Description |
|---|---|
| [`docs/lab-setup.md`](docs/lab-setup.md) | GRFICS platform overview, Purdue Model network description, tools, methodology, scope |
| [`docs/asset-inventory.md`](docs/asset-inventory.md) | 14-asset inventory across PLCs, HMI, historian, EWS, firewall, switch, RTUs, OPC server |
| [`docs/threat-vuln-assessment.md`](docs/threat-vuln-assessment.md) | Sector-relevant threat actors and 10 scored OT vulnerabilities with CVSS estimates |
| [`docs/risk-assessment-report.md`](docs/risk-assessment-report.md) | Executive-facing risk report: 5x5 scoring matrix, 10 scored risks, findings narrative, remediation priorities |
| [`diagrams/network-architecture.md`](diagrams/network-architecture.md) | Purdue Model zone diagram (Mermaid) of the lab network topology |
| [`evidence/sample-nmap-scan.txt`](evidence/sample-nmap-scan.txt) | Simulated Nmap asset-discovery output against the lab OT network segment |
| [`evidence/sample-wireshark-modbus-capture-summary.txt`](evidence/sample-wireshark-modbus-capture-summary.txt) | Packet capture summary showing unauthenticated Modbus-TCP read/write traffic |

## Methodology

- **NIST SP 800-82 Rev. 3, Chapter 3** — risk management lifecycle (asset ID → threat ID → vulnerability ID → risk determination → control recommendation)
- **IEC 62443-3-2** — zones-and-conduits structuring and Security Level (SL) justification

## Tools Used

GRFICS (ICS/SCADA simulation), Wireshark (protocol capture/analysis), Nmap (asset discovery), Kali Linux (assessment platform).

## What This Demonstrates (For Hiring Managers)

This project directly answers the single most commonly cited gap for candidates entering utility-sector OT security roles: no hands-on exposure. It demonstrates standing up and assessing a real ICS/SCADA simulation environment (not just reading about one), applying the exact standards named in utility GRC job descriptions (NIST SP 800-82, IEC 62443), and translating technical findings into executive-ready, scored risk reporting.

## Related Projects

- [`architecture-design-review-template`](../architecture-design-review-template) — the segmentation gap (RISK-005) found here is the subject of the worked ADR example
- [`compliance-gap-tracker-v2`](../compliance-gap-tracker-v2) — aggregates this assessment's findings for executive tracking

## Resume Bullets

1. *Conducted a hands-on ICS/OT cybersecurity risk assessment using the GRFICS simulation platform, applying NIST SP 800-82 Rev. 3 and IEC 62443-3-2 methodology to identify and score 10 vulnerabilities across a simulated compressor station environment.*
2. *Authored a 14-asset OT inventory and threat/vulnerability assessment spanning PLCs, HMI, engineering workstation, and historian components, mapping findings to sector-relevant nation-state and ransomware threat actor categories.*
3. *Produced an executive-facing risk assessment report using a 5x5 likelihood/impact scoring matrix, translating technical OT findings (unauthenticated Modbus-TCP, flat network segmentation) into prioritized, cost-scoped remediation recommendations for IT senior leadership.*
4. *Applied IEC 62443 zones-and-conduits methodology to identify and remediate a critical Level 1/Level 2 network segmentation gap, demonstrating applied understanding of the Purdue Model in an OT risk context.*

## License

MIT — see [LICENSE](LICENSE).

## Interactive project dashboard (November 2026)

- **[Open this project's public interactive explorer](https://arsh-project-lab.vercel.app/ics-ot-risk-assessment-lab/index.html)**
- **[Run the standalone HTML locally](dashboard/index.html)** (no account or service required)
- **[Open the complete public Project Lab](https://arsh-project-lab.vercel.app/)**

Inspect simulated industrial-control assets; no operational network access. Source-linked sample data is embedded for offline inspection. Search, group filters and CSV export work locally; checklist review marks (where available) are browser-local only. The page is not a live backend, and changes in this repository will require a separate Vercel deployment until a Git integration is enabled. [Dashboard validation source](tests/dashboard_ui.test.mjs).

## Data modes and privacy (November 2026)

- **Synthetic demo (default):** Existing fictional records and checklists remain available offline and are labeled as training data.
- **Real public references (opt-in):** Select a verified source in the dashboard and click **Load public references**. Data appears in a separate panel with provenance and retrieval information, never blended into the fictional organization's metrics or assessment.
- **No local-data integration:** The public dashboard does not read local files, personal accounts, device information, or private GitHub repositories. No log upload, private evidence import, or workstation scanning is enabled.
- **Provenance:** See [source-manifest.json](data/source-manifest.json). Public data may be unavailable due to rate limits, provider changes, CORS, or connectivity; the offline demo continues to function.
- **Caution:** Public standards and vulnerability information are reference materials. They do not establish regulatory applicability, actual exploitation of an inventoried asset, or the compliance status of any organization.
- **Privacy hygiene:** Never commit credentials or personal evidence. Editing a current file does not remove its old contents from public Git history.
