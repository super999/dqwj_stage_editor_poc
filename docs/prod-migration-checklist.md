# Production Migration Checklist

Use this checklist before connecting demo service to real game traffic.

## Architecture

- [ ] Confirm integration mode (in-process vs sidecar service).
- [ ] Define API versioning policy for combat payload.
- [ ] Confirm deterministic arithmetic rules and precision strategy.

## Security and Compliance

- [ ] Move all secrets to secure secret manager.
- [ ] Enforce authn/authz for `/calc-demo`.
- [ ] Enable audit logging with retention policy.

## Reliability

- [ ] Add SLOs for latency and error rate.
- [ ] Add readiness/liveness probes.
- [ ] Add release gates with canary percentage and rollback thresholds.

## Data and Validation

- [ ] Validate full payload schema against real battle data.
- [ ] Build replay framework from historical battles.
- [ ] Define acceptable deviation threshold for old vs new engine.

## Delivery

- [ ] CI pipeline for build/test/package.
- [ ] CD pipeline with staged rollout.
- [ ] Disaster recovery and on-call playbook approved.
