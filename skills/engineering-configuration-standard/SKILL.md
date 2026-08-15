---
name: engineering-configuration-standard
description: 工程化配置标准：package.json、tsconfig、lint/format、gitignore、CI、环境变量、README 等基础配置的业界标准约定。生成或校验项目的工程化配置文件时使用。
---

# 工程化配置标准

生成脚手架配置文件时按下列标准执行，保证开箱即用与团队一致性。

## package.json
- `name`：npm 风格短横线命名；`private: true`（非发布包）。
- 必含 `scripts`：`dev` / `build` / `start` / `test` / `lint` / `typecheck`（TS 项目）。
- 指定 `engines`（Node 版本范围）与 `packageManager` 字段（pnpm 推荐）。
- 依赖归位：运行时依赖进 `dependencies`，构建/测试/工具进 `devDependencies`。

## TypeScript（tsconfig.json）
- `strict: true` 必须开启；`target: ES2022+`（或按运行时）。
- `moduleResolution: "bundler"`（现代打包器）或 `"node16"`（纯 Node）。
- 显式指定 `outDir` 与 `rootDir`；开启 `sourceMap`。
- 多配置用继承管理：`tsconfig.base.json` + `tsconfig.build.json` 等。

## Lint / Format
- ESLint：`@typescript-eslint` 推荐集 + `eslint-config-prettier` 关闭冲突规则。
- Prettier：`printWidth: 100`（或团队约定）、单引号、尾逗号 `all`、`endOfLine: auto`。
- lint 脚本必须能被 CI 无交互执行（`--max-warnings 0` 按需）。

## .gitignore
- 必忽略：`node_modules/`、`dist/`、`build/`、`coverage/`、`.env*`（保留 `.env.example`）、`.DS_Store`、编辑器目录（除共享设置外）。
- 语言特定：Python 的 `__pycache__/`、`.venv/`；Go 的二进制产物。

## 环境变量
- 提供 `.env.example` 模板，注释每个变量的用途。
- 所有 env 在代码入口处校验，缺失即启动失败并给出明确报错。
- 密钥绝不提交仓库；本地覆盖走 `.env.local`（已 gitignore）。

## CI（GitHub Actions 为例）
- 至少三个 step/job：lint → test → build（TS 项目加 typecheck）。
- 缓存依赖目录（`actions/setup-node` + `cache: pnpm`）。
- 按需固定 Node 版本矩阵（`20.x` / `22.x` LTS）。

## README.md 标准结构
1. 项目简介（一句话 + 可选徽章）
2. 技术栈与版本要求
3. 快速开始：安装 → 配置 → 运行 → 测试
4. 命令清单表
5. 目录结构说明
6. 部署与运维要点（如适用）
7. License

## 验证清单（初始化完成后逐项过）
- [ ] `npm install`（或对应包管理器）无报错
- [ ] `npm run build`（或 typecheck）通过
- [ ] `npm run dev` 能启动并返回可访问地址
- [ ] lint 通过
- [ ] 测试（如配置）通过
- [ ] `.env.example` 与代码读取的变量一致
- [ ] README 中的命令与实际 scripts 一致
