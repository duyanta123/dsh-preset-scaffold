# Changelog

本文件记录 dsh-preset-scaffold 的重要变更。

## [Unreleased]

## [0.1.4] - 2026-09-11

- DSH 宿主兼容基线从 `0.1.2-rc.1` 迁移到 `0.1.5-rc.2`：`npm run test:compat` 与 CI compat job 固定安装 `@deepseek-ai/dsh@0.1.5-rc.2` + 同版本 `@deepseek-ai/dsh-skill-filesystem`。上游 0.1.3~0.1.5 的破坏性变更（`SessionHandle`、异步 `agentLoop.create()`、Session format v2/v3、`ctx.agent` 移除、Inbox API 变更）均不涉及本插件使用的技能 provider 路径，插件代码零改动。
- 提示：DSH 宿主升级到 0.1.5 系后 Session format 迁移为 V3，不可逆；最终用户升级宿主前请备份会话日志。

## [0.1.3] - 2026-09-06

- 新增包级 manifest/template smoke test，覆盖 bundle 声明、技能 frontmatter、六套模板关键文件、版本元数据及 `files` 白名单。
- 新增固定 `@deepseek-ai/dsh@0.1.2-rc.1` 的 `npm run test:compat` 门禁及 Windows/Ubuntu Node 22.19 CI。
- 技能说明对齐实际模板：React 19 + Vite 8、Java 25 + Spring Boot 4.0。
- 移除 `package.json` 的 `private: true`，开放 npm 发布；包级测试之外仍保留模板生成与最小运行真机验证。

## [0.1.2] - 2026-09-02
- `package.json` 补充 `repository` / `bugs` / `homepage` 元数据
- README 徽章统一（license / DSH / dsh-index / version）

## [0.1.1] - 2026-08-15
- 新增插件 bundle 形态：`dsh plugin --profile web add github:duyanta123/dsh-preset-scaffold` 一键安装（package.json + cordis.patch.yml + plugin/index.js），skills 经官方 `FileSystemSkillProvider` 注册，可入 dsh-index 生态
- preset.yml 描述对齐实际六套模板，补充英文描述；README 安装节补充插件安装方式

## [0.1.0] - 2026-08-15
- 初始版本：项目架构师人设 + 严格初始化流程（scaffold-runbook）
- 六套模板资产：node-ts、react-vite、python(FastAPI)、go、spring-boot、monorepo
- 工具集：文件读写、pwsh/bash、后台作业、skills、计划模式、workflow、子代理、goal、todo、ask-user、web 搜索
- node-ts 模板真机实测通过；其余模板补齐 CI 与最小测试；spring-boot 升级 4.0.0 + Java 25
