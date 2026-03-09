# SoonFx Demo Service

Minimal Node.js + TypeScript demo service for SoonFx integration.

## Project status

This repository is now archived for reference only.
Reason: the available SoonFx artifacts in this evaluation did not provide a complete frontend visual editor page, while the target requirement is a graphical editor workflow.
See `docs/project-conclusion.zh-CN.md` for the detailed Chinese conclusion.

## Quick start

```powershell
npm run bootstrap
npm run build
npm run test
npm start
```

Endpoints:

- `GET /health`
- `POST /calc-demo`

## One-day workflow

1. Bootstrap and environment check: `npm run bootstrap`
2. Functional + regression tests: `npm run test`
3. Local performance test: `npm run test:perf`
4. Deploy as Windows service: `npm run deploy-local`
5. Rollback if needed: `npm run rollback-local`

## Docs

- `docs/ADR-soonfx-adoption.md`
- `docs/test-plan.md`
- `docs/runbook-local.md`
- `docs/prod-migration-checklist.md`
- `README.zh-CN.md`
- `docs/ADR-soonfx-adoption.zh-CN.md`
- `docs/test-plan.zh-CN.md`
- `docs/runbook-local.zh-CN.md`
- `docs/prod-migration-checklist.zh-CN.md`
- `docs/project-conclusion.zh-CN.md`
