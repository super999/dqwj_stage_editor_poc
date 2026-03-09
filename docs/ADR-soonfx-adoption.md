# ADR: Introduce SoonFx for Demo Combat Calculation

- Status: Accepted (demo scope)
- Date: 2026-03-09

## Context

We need a one-day deliverable to prove a reproducible combat calculation pipeline, with automated bootstrap, tests, local deployment, and rollback on Windows.

## Decision

- Use Node.js + TypeScript as runtime host.
- Integrate `@soonfx/engine` via adapter, with deterministic fallback math path when runtime API is unavailable.
- Expose minimal HTTP APIs: `GET /health`, `POST /calc-demo`.
- Provide PowerShell automation for bootstrap/deploy/rollback.

## Alternatives Considered

1. Python-only implementation:
   - Pros: existing ecosystem familiarity
   - Cons: SoonFx alignment weaker, integration complexity higher
2. Full game-engine coupling:
   - Pros: closer to production shape
   - Cons: cannot finish safely in one day

## Risks

- SoonFx runtime API mismatch across versions.
- Windows service management requires admin permissions.
- Local-only deploy path lacks production-grade observability.

## Mitigations

- Keep adapter boundary and fallback mode.
- Add golden regression set (20 cases).
- Add explicit runbook and production migration checklist.
