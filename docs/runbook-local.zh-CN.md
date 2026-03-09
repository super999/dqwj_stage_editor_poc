# Runbook：本地 Windows 部署

## 前置条件

- Windows 主机具备管理员权限。
- 已安装 Node.js LTS，且已加入 `PATH`。
- 仓库已在本地完成克隆。

## Bootstrap

```powershell
npm run bootstrap
```

预期结果：
- 输出 Node/npm 版本。
- `.env` 不存在时会自动创建。
- 依赖安装完成。

## 构建与测试

```powershell
npm run build
npm run test
```

## 作为服务部署

```powershell
npm run deploy-local
```

预期结果：
- 默认创建服务 `SoonFxDemoService`。
- `http://127.0.0.1:3000/health` 健康检查通过。

## 验证

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3000/health
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:3000/calc-demo -ContentType "application/json" -Body '{"attack":100,"defense":20,"skillMultiplier":1.5}'
```

## 回滚

```powershell
npm run rollback-local
```

预期结果：
- `dist` 从 `.releases/previous-dist` 恢复。
- 服务重启。
- 健康检查通过。

## 监控（本地基线）

- HTTP 健康状态。
- 服务运行状态：`Get-Service SoonFxDemoService`。
- 应用 stdout/stderr 日志（按主机策略重定向时查看对应位置）。

## 故障处理

1. 服务启动失败：先检查管理员权限和服务可执行路径。  
2. 健康检查失败：先执行回滚。  
3. 回滚后仍失败：临时手工执行 `node dist/server.js`，再排查服务配置。
