# Runbook: Local Windows Deployment

## Preconditions

- Windows host with admin privileges.
- Node.js LTS installed and available in `PATH`.
- Repository cloned locally.

## Bootstrap

```powershell
npm run bootstrap
```

Expected:
- Node/npm versions printed.
- `.env` created if absent.
- Dependencies installed.

## Build and Test

```powershell
npm run build
npm run test
```

## Deploy as Service

```powershell
npm run deploy-local
```

Expected:
- Service created as `SoonFxDemoService` by default.
- Health check passes at `http://127.0.0.1:3000/health`.

## Verify

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3000/health
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:3000/calc-demo -ContentType "application/json" -Body '{"attack":100,"defense":20,"skillMultiplier":1.5}'
```

## Rollback

```powershell
npm run rollback-local
```

Expected:
- `dist` restored from `.releases/previous-dist`.
- Service restarted.
- Health check passes.

## Monitoring (local baseline)

- HTTP health status.
- service running state: `Get-Service SoonFxDemoService`.
- application logs from process stdout/stderr (if redirected by host policy).

## Incident Handling

1. If service fails to start: check admin permissions and service path.
2. If health fails: run rollback.
3. If rollback fails: run manual start `node dist/server.js` and investigate service config.
