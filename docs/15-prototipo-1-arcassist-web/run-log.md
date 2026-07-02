# Run Log - Prototipo 1

## 2026-06-30

### Objective

Continue the animal-rescue prototype toward the 01/07/2026 Prototipo 1 milestone while recording ArcAssist-Web evidence.

### Inputs inspected

- Project README.
- Functional scope.
- Architecture document.
- Incremental backlog.
- Prototype and validation documents.
- ADRs.
- Mermaid diagrams.
- Current implementation of the `Animals` module.
- 2026 schedule PDF.

### Changes produced

- Added institutional and contact pages.
- Added simulated administrative access.
- Added animal edit support in the Web UI.
- Added Dockerfiles and Docker Compose services for Web, API and PostgreSQL.
- Added Docker execution guide.
- Updated project documentation and ArcAssist-Web evidence records.

### Validation performed

- Static inspection of current architecture, source files and documentation.
- Validated JSON syntax for `package.json`, workspace package files and the ArcAssist-Web evidence manifest.
- Added `pnpm-workspace.yaml` and confirmed that `pnpm list --depth -1` recognizes the six workspace projects.
- Installed dependencies after explicitly approving required pnpm build scripts for Prisma, esbuild and sharp.
- Generated Prisma Client from `apps/api/prisma/schema.prisma`.
- Ran TypeScript checks for `packages/domain`, `packages/shared`, `packages/ui`, `apps/api` and `apps/web`.
- Ran unit tests for `packages/domain`, `packages/ui` and `apps/api`.
- Built the Next.js Web application.
- Built the NestJS API.
- Validated Docker Compose syntax with `docker compose config`.
- Built Docker images for `web` and `api`.
- Started the Docker Compose environment with PostgreSQL, API and Web.
- Checked API health inside the container: `{"status":"ok","service":"anjos-de-resgate-api"}`.
- Checked seeded animals inside the API container: 3 animals (`Luna`, `Bento`, `Mel`).
- Checked Web response inside the Web container: HTTP 200 with `text/html`.

### Pending validation

- Validate the admin edit flow manually in the browser.
- Capture screenshots for the 01/07/2026 validation.

## 2026-07-02

### Objective

Prepare the prototype repository for collaborative validation while preserving
ArcAssist-Web traceability evidence for later analysis.

### Inputs inspected

- Current source tree.
- GitHub collaboration documentation.
- Docker execution guide.
- Content-management documentation.
- Prototype screenshots and validation guide.
- Existing ADRs and run log.

### Changes produced

- Standardized the official project name as `Anjos de Resgate` across active
  source and documentation files.
- Centralized editable public-page content in
  `packages/shared/src/site-content.ts`.
- Updated public pages, manifest and simulated admin access to consume the
  shared content contract.
- Added ADR-004 for centralized content and future CMS-style administration.
- Added `docs/20-gestao-de-conteudo.md` describing how texts and images are
  changed now and how the future admin content module may evolve.
- Added a GitHub Issue template for content adjustments.
- Added `scripts/capture-prototype-screenshots.mjs` to regenerate validation
  screenshots with Chrome headless.
- Regenerated validation screenshots for the current prototype.
- Tightened ignore rules so generated outputs, article artifacts, local caches
  and duplicate screenshot formats do not enter the lean GitHub repository.
- Prepared `github-ready/anjos-de-resgate-platform` as a lean folder for GitHub
  Desktop, containing project source, operational documentation, ADRs,
  validation evidence, diagrams, prompts and collaboration templates.

### Architectural decisions and traceability

- ADR-004 records the decision to centralize content in a shared package for
  Prototype 1 and postpone a CMS-like admin interface until authentication,
  permissions, persistence and audit support are available.
- The GitHub collaboration structure records how validators can open Issues for
  functional validation, bugs, improvements and content adjustments.
- The screenshot script provides repeatable evidence capture for validation
  meetings.
- The exported GitHub-ready folder separates collaborative project material
  from local research outputs and generated build artifacts.

### Validation performed

- Ran TypeScript validation for the Web application.
- Checked syntax of the screenshot capture script.
- Rebuilt the Web Docker image after the responsive layout adjustment.
- Recreated the Web container with the updated image.
- Confirmed Docker Compose reports Web, API and PostgreSQL containers running
  with published ports.
- Searched active source and documentation files for residual occurrences of
  the previous project name.

### Pending validation

- Initialize the Git repository or copy the lean tree to the target GitHub
  repository.
- Confirm the final GitHub file set with `git status` after initialization.
- Use Issues during the next validation meeting to record content, interface
  and workflow feedback.
