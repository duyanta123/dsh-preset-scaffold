---
name: project-structure-best-practices
description: 项目目录结构最佳实践：按技术栈给出业界主流的目录组织、分层与命名约定。规划脚手架目录树、判断文件归属、审查既有项目结构时使用。
---

# 项目目录结构最佳实践

初始化或审查项目骨架时，按下列约定组织目录。原则：按"职责"而非"类型"分层；入口收敛；配置外置；预留扩展位。

## 通用约定
- 源码与配置分离：源码放 `src/`，配置文件放根目录（`package.json`、`tsconfig.json` 等），本地环境文件进 `.gitignore`。
- 目录名小写连字符（kebab-case），组件/模块内部文件名可用驼峰。
- 分层单向依赖：每一层只依赖其下层，禁止循环引用。
- 测试与源码同目录（`*.spec.ts` / `*.test.ts`）或镜像目录（`tests/`），二选一保持一致。
- 文档：`README.md`（必选）、`docs/`（多文档时）、`CHANGELOG.md`（发布型项目）。

## Node.js / TypeScript（服务端）
```
src/
  main.ts              # 入口：装配与启动
  app/                 # 应用装配（路由、中间件、依赖注入）
  modules/             # 按业务模块聚合：controller/service/repository 同处一模块
  common/              # 跨模块共享：guards、filters、decorators、utils
  config/              # 配置读取与校验（env → typed config）
  types/               # 共享类型定义
test/ 或 src/**/*.spec.ts
```

## 前端（React / Vue）
```
src/
  main.tsx / main.ts
  app/                 # 应用壳：路由、布局、全局状态
  pages/ 或 views/     # 路由级页面
  components/          # 通用组件（按 feature 再分子目录）
  hooks/               # 自定义 hooks
  stores/ 或 state/    # 全局状态
  api/ 或 services/    # 接口请求层
  assets/              # 静态资源
  styles/              # 全局样式与主题
```

## Python
```
project/
  src/                 # src 布局（推荐）
    package_name/
      __init__.py
      cli.py           # 命令行入口
      core/  models/  services/  api/
  tests/
  pyproject.toml
```

## Go
```
cmd/                   # 每个可执行文件一个子目录
internal/              # 私有包（Go 编译期隔离）
pkg/                   # 可对外复用
api/                   # 协议定义（proto / openapi）
configs/  deployments/  scripts/
```

## Java / Spring Boot
```
src/main/java/com/example/project/
  config/  controller/  service/  repository/  entity/  dto/  common/
src/main/resources/     # application.yml、mapper 等
src/test/
```

## Monorepo（pnpm workspaces / turborepo）
```
packages/              # 可发布的独立包
apps/                  # 可运行应用（web、api、cli）
tools/ 或 scripts/     # 内部工具与脚本
pnpm-workspace.yaml
```

## 各技术栈通用必含文件
- `README.md`：项目说明、快速开始、命令清单
- `.gitignore`：语言/工具标准忽略规则
- `LICENSE`（开源项目）
- CI 配置（`.github/workflows/` 或 `.gitlab-ci.yml`）——至少 lint + test + build
