# dsh-preset-scaffold · 项目初始化脚手架预设

[English](README.md) | 简体中文

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-preset-4c1d95)](https://github.com/topics/dsh-plugin)
[![CI](https://github.com/duyanta123/dsh-preset-scaffold/actions/workflows/ci.yml/badge.svg)](https://github.com/duyanta123/dsh-preset-scaffold/actions/workflows/ci.yml)
[![dsh-index](https://img.shields.io/badge/dsh--index-dsh--preset--scaffold-blue)](https://dsh-index.xlings.org/packages/dsh-preset-scaffold/)
[![version](https://img.shields.io/badge/version-0.1.4-green)](CHANGELOG.md)

一个面向「从零搭建项目骨架」的 DeepSeek Harness（DSH）Agent 预设：内置架构师人设、严格初始化流程、分技术栈模板资产与工程化规范。

支持两种安装形态：**DSH 插件**（四个工程化技能随包注册）或**完整预设**（额外含架构师人设与工具集配置）。npm 包名与 GitHub 仓库名一致，均为 `dsh-preset-scaffold`。

## 定位

dsh-preset-scaffold 处理「需求描述 → 可运行项目骨架」这一步：先确认需求、出方案（计划模式），经批准后才生成、安装依赖、启动验证。它不负责后续业务功能开发，也不替代团队自己的脚手架规范——模板与规范都可以按需增改。

它回答：
- 新项目怎么起步（目录结构、配置文件、工程规范）？
- 六套主流技术栈的 starter 长什么样，怎么按需选用？
- 初始化流程怎么保证不走样（严格五阶段 + 硬门槛）？

## 安装

### 方式一：作为 DSH 插件（推荐，可入 dsh-index 生态）

四个工程化 skills（runbook / 模板 / 结构 / 配置规范）随包注册，人设与工具沿用宿主 profile（web / standard 已覆盖 runbook 引用的全部工具）：

```powershell
dsh plugin --profile web add "github:duyanta123/dsh-preset-scaffold#v0.1.4"
```

或从 npm 安装：

```powershell
npm install dsh-preset-scaffold
```

安装后新建会话即可用；模板资产随包分发，`scaffold-templates` 技能可直接读取。

### 方式二：作为完整预设安装（含架构师人设）

预设 = 一个目录，安装即复制，**无需改任何宿主配置**。Windows 一键安装：

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

或手动复制：

```powershell
# 1. 克隆本仓库
git clone https://github.com/duyanta123/dsh-preset-scaffold.git
# 2. 复制到 DSH 的用户预设根目录
Copy-Item -Recurse .\dsh-preset-scaffold "$env:USERPROFILE\.dsh\.agent-presets\scaffold"
# 3. 新建会话，预设选择「项目初始化脚手架」
```

> 卸载 = 删除 `$HOME/.dsh/.agent-presets/scaffold` 目录。

### 环境要求

- 模板生成脚本和独立工具：按各模板自身的 Node / Python / Go / Java 要求验证。
- DSH 0.1.5-rc.2 宿主：Node.js >= 22.19（兼容性门禁固定使用可安装的 `@deepseek-ai/dsh@0.1.5-rc.2`，运行 `npm run test:compat` 验证）。

## 快速开始

1. 新建会话，预设选择「项目初始化脚手架」（完整预设形态）；或直接在已装插件的会话中说明需求（插件形态）。
2. 用一句话描述项目（技术栈、类型、依赖）。
3. Agent 会先确认需求 → 出方案（计划模式）→ 经批准后生成 → 安装依赖 → 启动验证 → 汇报命令与目录树。

## 模板与技能

**模板资产 `templates/`（六套 starter，均可运行）**：

| 模板 | 技术栈 |
| --- | --- |
| `node-ts` | Node.js + TypeScript |
| `react-vite` | React + Vite |
| `python` | Python + FastAPI |
| `go` | Go |
| `spring-boot` | Spring Boot |
| `monorepo` | Monorepo 工作区 |

**技能 `skills/`（四个）**：

| 技能 | 职责 |
| --- | --- |
| `scaffold-runbook` | 严格五阶段初始化流程 |
| `scaffold-templates` | 模板清单与用法 |
| `project-structure-best-practices` | 目录结构规范 |
| `engineering-configuration-standard` | 工程配置规范 |

插件形态下人设与工具沿用宿主 profile；完整预设形态额外启用 `agent.cordis.yml` 声明的架构师人设与工具集（文件读写、pwsh/bash、后台作业、skills、计划模式、workflow、子代理、goal、todo、ask-user、web 搜索）。

## 开发与贡献

- 本仓库是**源**；`$HOME/.dsh/.agent-presets/scaffold` 是**已安装副本**。改动仓库后需同步过去才生效（`install.ps1` 或手动 `Copy-Item -Force`）。
- 加模板：新建 `templates/<stack>/` 放入完整可运行文件，并在 `skills/scaffold-templates/SKILL.md` 登记一行。
- 加技能：新建 `skills/<name>/SKILL.md`，YAML frontmatter 需含 `name` 与 `description`。
- 加/减能力：编辑 `agent.cordis.yml` 的插件行（参考内置 `standard` 预设）。
- 校验：用 `agentPresets.standingKeyFor('scaffold')` 做挂载校验；改完建议新建会话实跑一遍。

## 文档

- [skills/scaffold-runbook/SKILL.md](skills/scaffold-runbook/SKILL.md) — 严格五阶段初始化流程
- [templates/](templates/) — 六套 starter 模板
- [CHANGELOG.md](CHANGELOG.md) — 版本变更记录
- [PLUGIN-MAINTENANCE.md](PLUGIN-MAINTENANCE.md) — 本仓维护规则

## License

MIT © duyanta123
