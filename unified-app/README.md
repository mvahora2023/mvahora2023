# Project Lab Unified

**A separate deployed application with eleven visible technical modules backed by twelve independently maintained public GitHub sources.**

- Production URL: https://project-lab-unified.vercel.app/
- Source host (temporary): `mvahora2023/mvahora2023`, folder `unified-app/`
- Original projects: **not overwritten, merged, or made private/public by this integration**
- Deployment account: the existing Vercel team, project `project-lab-unified`
- Release manifest: [site/release.json](site/release.json) with twelve checked source revisions and SHA-256 digests

## What is actually copied in this milestone

The synchronizer creates a fresh, pinned, **standalone browser copy** of each public repository's dashboard or portfolio page, plus its README and public source manifest. Eleven technical modules are visible in the unified application. The twelfth source, the GitHub portfolio/index repository, stays tracked for source integrity but is deliberately excluded from the module gallery to avoid nesting Project Lab inside itself.

This is **not yet a production deployment of all underlying services**. PowerShell, Python, databases, and other non-web programs remain original repository software, not functionality served by Vercel. They will require appropriate runtimes, integration interfaces, and additional tests to become fully embedded interactive features.

## Source ownership and version rules

1. Each source repository retains its own branch, files, data, and Git history.
2. [manifest/sources.json](manifest/sources.json) is a strict allowlist of exactly twelve repositories, and each module has a permanent ID.
3. [scripts/sync.mjs](scripts/sync.mjs) clones each *public* source with a depth-one checkout and verifies the standalone HTML before writing copies into `site/modules/{id}/index.html`.
4. Every copied module is pinned to its source revision, SHA-256 digest, and specific source path in `site/release.json`.
5. The profile repository is the host for this temporary unified source. Its own portfolio page is tracked by **blob revision** to prevent a perpetual self-update loop.
6. The site validates the released copy checksum before opening a module.
7. The copy is displayed in a sandboxed iframe **without `allow-same-origin`** to prevent shared cookies, origin storage, or JavaScript access between module copies and the parent application.
8. No combined datasets, shared live database, private local logs, device access, file upload, or bidirectional code writeback is enabled.

## Automatic source synchronization

GitHub Actions workflow [`unified-sync.yml`](../.github/workflows/unified-sync.yml) runs twice per hour (at minute 11 and 41, subject to GitHub schedule delays), can be invoked manually, and also responds to updates to its own source and configuration.

On each run it:
- Verifies the source allowlist.
- Clones all twelve public repositories.
- Validates each browser copy.
- Produces an atomic twelve-module release and checksums.
- Runs the tests in `tests/unified.test.mjs`.
- Commits updated browser copies and `site/release.json` only when approved source contents change.

An invalid module **blocks publication of the new release**. It must never silently fall back to invented source data.

### Automatic Vercel publishing: connected and verified

**GitHub → Vercel auto-deployment is operational.** The existing `project-lab-unified` Vercel project is linked to `mvahora2023/mvahora2023`, with `unified-app/site` as its root directory and `master` as its production branch. A controlled commit successfully triggered a READY production deployment. When the sync workflow commits updated verified browser copies to `master`, Vercel can publish them without a separate manual upload.

This is still a best-effort scheduled source poll rather than instantaneous change notification for every upstream repository. GitHub Actions scheduling and Vercel builds can be delayed. Only the copied browser interfaces are deployed, not the complete backend or Windows tools.

## Validation

- `node --test unified-app/tests/unified.test.mjs`: source allowlist, separation, and release integrity.
- `node --test unified-app/tests/live-http.test.mjs`: deployment HTTP status and SHA-256 checks of all twelve tracked production source copies.
- `unified-app/tests/live-browser.spec.mjs`: Chromium navigation, eleven visible technical cards, category filtering, isolated module iframe and twelve-source release status. See the separate Playwright workflow.
- Existing public-source privacy workflows remain independent in each original repository.

## Next development phases

- Move the unified source into a **new dedicated GitHub repository** when repository-creation access is available, without modifying the originals.
- Expand each copied module beyond an HTML view to reproducibly package its approved public source files, test fixtures, datasets, and assets. Keep filesystem and database namespaces separated.
- Provide safe browser adapters for non-web projects instead of directly executing administrative code in the public website.
- Define explicit versioned, read-only cross-module reporting interfaces only where a feature requires them.
- Add controlled rollout/rollback and optional GitHub event dispatch for faster updates than scheduled polling.
- Move critical module validations before any production deployment.

**Current release is a tested foundation, not a fully integrated backend platform.**

## Version labels

- **Compliance Gap Tracker v2** is the current working source. Its existing synthetic dashboard is not a completed v3.
- **Compliance Gap Tracker v3** is the planned major upgrade featuring editable findings, evidence references, assignments, data persistence, history, and tested workflows. The name changes only when its features are implemented and validated.
- The profile repository is source-only in Unified, not an eleventh-versus-twelfth runnable application.
