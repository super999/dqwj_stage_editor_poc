# Test Plan

## Goal

Validate deterministic combat calculation behavior, input handling, and local deploy readiness.

## Scope

- Unit and regression tests for formula calculation.
- API contract tests for `/health` and `/calc-demo`.
- Local performance baseline run for `/calc-demo`.
- Deploy verification and rollback verification once each.

## Test Items

1. Functional
   - Fixed input returns fixed result.
   - Invalid payload returns HTTP 400 with error details.
2. Regression
   - 20 local golden cases with exact expected values.
3. Performance
   - Run `npm run test:perf` with 500 requests and concurrency 25.
   - Record p50, p95, error count.
4. Deployment
   - Fresh deploy success.
   - Redeploy success.
   - Service restart success.
   - Rollback success and health check pass.

## Pass Criteria

- `npm run test` passes with no failed cases.
- Performance run returns `errorCount = 0`.
- Health endpoint returns `status = ok` after deploy and rollback.

## Failure Injection

- Send invalid JSON schema fields to `/calc-demo`.
- Simulate missing dependency by removing `node_modules` and rerunning bootstrap.
