# Changelog

本文件记录 dsh-preset-scaffold 的重要变更。

## [Unreleased]
- 移除 `package.json` 的 `private: true`，开放 npm 发布（无测试套件，发布前按清单真机验证）

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