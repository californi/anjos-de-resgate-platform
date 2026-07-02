# Decision Package - Prototipo 1

## Decision

Implement Prototipo 1 as a small extension of the existing `Animals` baseline, adding institutional pages, contact information, administrative editing, simulated admin access and Docker execution.

## Rationale

The project schedule defines the 01/07/2026 milestone as validation of Prototipo 1 and transition toward the adoption-style flow. The current baseline already supports public animal listing, animal detail, basic administrative registration, status updates and an initial API. Therefore, the next increment should complete the institutional and administrative surface before introducing adoption concepts.

## Accepted Scope

- `/sobre` page.
- `/contato` page.
- Administrative access gate for prototype validation.
- Animal edit flow in the admin page.
- Docker Compose environment with PostgreSQL, API and Web.
- Documentation for execution and validation.
- ArcAssist-Web evidence records for future research use.

## Rejected Alternatives

### Implement real authentication now

Rejected because the milestone asks for a basic administrative login and the project guidelines require simplicity. Real authentication will introduce user, permission and security decisions that deserve a later ADR.

### Start adoption-interest persistence now

Rejected because the July transition should be informed by the Prototipo 1 validation. Adding adoption entities now would mix the portal/admin milestone with the next prototype.

### Keep Docker limited to PostgreSQL

Rejected because the current validation benefits from a reproducible environment that starts Web, API and database together.

## Risks

- The simulated admin access may be misunderstood as production security.
- Without automated tests running in this environment, the changes require local validation after installing dependencies.
- The Docker build depends on downloading npm packages unless a cache exists.
- `db push` is acceptable for the prototype but should be replaced or complemented by migrations before production use.

## Follow-up Decisions

- Decide when to introduce real authentication and authorization.
- Decide the boundary between `AdoptionInterest` and the complete adoption process.
- Decide whether image upload should be local, external storage or deferred.
- Decide the testing baseline for HTTP/e2e validation.
