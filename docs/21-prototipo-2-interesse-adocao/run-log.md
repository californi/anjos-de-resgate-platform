# Run Log - Prototipo 2.1

## 2026-08-20

### Objective

Prepare the adoption-interest increment for repeatable Docker-based validation.

### Inputs inspected

- Docker Compose configuration.
- API and Web Dockerfiles.
- Root workspace scripts.
- Prototype Docker execution guide.
- Prototipo 2.1 scope and evidence dossier.

### Changes produced

- Added a compact public animal feed for dozens of animals.
- Added a compact administrative inventory for many animal records.
- Separated animal administration into inventory, creation, editing and
  interest-request views.
- Added animal-level interest counts in the administrative interest view.
- Added animal-level interest counts to each administrative inventory summary.
- Changed the interest-eligibility rule to block only
  `IN_ADOPTION_PROCESS`.
- Expanded the shared demo animal dataset and Prisma seed.
- Standardized root workspace commands on `pnpm`.
- Pinned the Docker build to the project package manager version declared in
  `package.json`.
- Added API and Web healthchecks to `docker-compose.yml`.
- Made the Web service wait for a healthy API before starting.
- Added `scripts/docker-prototype.sh` with `up`, `down`, `reset`, `status` and
  `logs` commands.
- Updated README and the Docker execution guide for Prototipo 2.1.

### Architectural and operational rationale

- The Docker setup remains a prototype execution environment, not a production
  deployment architecture.
- The startup path applies the current Prisma schema and seed data so validators
  can exercise the same baseline.
- ADR-006 records the decision to support many animals visually now while
  postponing real video handling, pagination, search and advanced filters.
- ADR-007 records the interest-eligibility change and the split of
  administrative responsibilities across dedicated screens.
- ADR-008 records that interest counts are shown in the administrative
  inventory as a Web-layer aggregation over existing interest data.
- The script uses a stable Compose project name while avoiding fixed
  per-container names, reducing conflicts between local copies of the project.

### Validation to perform

- Run `sh scripts/docker-prototype.sh up`.
- Open `http://localhost:3333/health`.
- Open `http://localhost:3000`.
- Register a fictitious adoption interest for an available animal.
- Confirm the interest appears in
  `http://localhost:3000/admin/animais/interesses`.
