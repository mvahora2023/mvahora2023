# Project Lab Unified

**A separate deployed application built from twelve independently maintained public GitHub repositories.**

- Production URL: https://project-lab-unified.vercel.app/
- Source host (temporary): `mvahora2023/mvahora2023`, folder `unified-app/`
- Original projects: **not overwritten, merged, or made private/public by this integration**
- Deployment account: the existing Vercel team, project `project-lab-unified`
- Release manifest: [site/release.json](site/release.json) with twelve checked source revisions and SHA-256 digests

## What is actually copied in this milestone

The synchronizer creates a fresh, pinned, **standalone browser copy** of each public repository's dashboard or portfolio page, plus its README and public source manifest. These copies are navigated from one separate application.

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

### Automatic Vercel publishing: authorization still required

**The source synchronization currently works, but automatic *live deployment* does not.** Vercel reported that its GitHub integration is not installed or authorized for this account/team, so it could not link the Git repository.

To enable push-to-production after reviewing the process:
1. In the Vercel dashboard, open the existing **project-lab-unified** project.
2. Open **Settings → Git** and connect the GitHub integration, granting the minimum repository access needed.
3. Select the **mvahora2023/mvahora2023** repository. This is the temporary source host until a dedicated `project-lab-unified` repo can be created and migrated.
4. Set **Root Directory** to `unified-app/site`.
5. Select `master` as the production branch.
6. Test one harmless dashboard update, observe the GitHub sync CI, verify the exact source revision in `site/release.json`, and confirm Vercel deploys the tested release.

As an alternative, a protected GitHub Actions production pipeline can deploy with a Vercel token stored **only in GitHub Actions secrets**. Never place credentials in this repository, chat, or module data. Do not add a secret-bearing pipeline until the required authorization is deliberately configured.

## Validation

- `node --test unified-app/tests/unified.test.mjs`: source allowlist, separation, and release integrity.
- `node --test unified-app/tests/live-http.test.mjs`: deployment HTTP status and SHA-256 checks of all twelve production copies.
- `unified-app/tests/live-browser.spec.mjs`: Chromium navigation, category filtering, isolated module iframe and release status. See the separate Playwright workflow.
- Existing public-source privacy workflows remain independent in each original repository.

## Next development phases

- Move the unified source into a **new dedicated GitHub repository** when repository-creation access is available, without modifying the originals.
- Expand each copied module beyond an HTML view to reproducibly package its approved public source files, test fixtures, datasets, and assets. Keep filesystem and database namespaces separated.
- Provide safe browser adapters for non-web projects instead of directly executing administrative code in the public website.
- Define explicit versioned, read-only cross-module reporting interfaces only where a feature requires them.
- Add controlled rollout/rollback and optional GitHub event dispatch for faster updates than scheduled polling.
- Move critical module validations before any production deployment.

**Current release is a tested foundation, not a fully integrated backend platform.**
