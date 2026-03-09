# SoonFx 演示服务

用于 SoonFx 集成验证的最小 Node.js + TypeScript 演示服务。

## 项目状态

当前仓库已转为归档参考用途，不再继续推进为正式项目。  
原因：本次评估可获得的 SoonFx 代码与资源中，没有可直接使用的完整前端可视化编辑器页面，而你的目标是图形化编辑器工作流。  
详细结论见 `docs/project-conclusion.zh-CN.md`。

## 快速开始

```powershell
npm run bootstrap
npm run build
npm run test
npm start
```

接口：

- `GET /health`
- `POST /calc-demo`

## 一天流程（历史验证用）

1. 环境检查与依赖安装：`npm run bootstrap`
2. 功能与回归测试：`npm run test`
3. 本地性能测试：`npm run test:perf`
4. 作为 Windows 服务部署：`npm run deploy-local`
5. 需要时回滚：`npm run rollback-local`

## 文档索引

- `docs/ADR-soonfx-adoption.md`
- `docs/test-plan.md`
- `docs/runbook-local.md`
- `docs/prod-migration-checklist.md`
- `docs/ADR-soonfx-adoption.zh-CN.md`
- `docs/test-plan.zh-CN.md`
- `docs/runbook-local.zh-CN.md`
- `docs/prod-migration-checklist.zh-CN.md`
- `docs/project-conclusion.zh-CN.md`
