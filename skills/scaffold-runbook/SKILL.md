---
name: scaffold-runbook
description: 项目脚手架严格初始化流程：需求确认 → 方案 → 执行 → 验证 → 交付，含每阶段验收门槛与工具映射。开始任何项目初始化前先加载本技能。
---

# 脚手架初始化 Runbook

按阶段执行，每阶段有硬性门槛；未过门槛不得进入下一阶段。

## 阶段 0：需求确认
- 必须确认：技术栈、项目类型（web 服务 / CLI / 库 / 前端应用 / 全栈）、核心依赖与包管理器。
- 用 ask_user_question 一次性问清；用户说"随便/你定"时采用默认：Node.js + TypeScript + pnpm + ESM + 严格 tsconfig，前端默认 React + Vite。
- 门槛：三项信息齐备且用户已确认，才进入方案阶段。

## 阶段 1：方案（计划模式）
- 进入计划模式，用 exit_plan_mode 提交方案，内容必须包含：
  1. 技术栈与版本清单（版本优先用 web_search 查证）
  2. 目录树
  3. 配置文件清单（含依赖列表）
  4. 验证方式（install / build / 启动命令）
- 门槛：方案获批后才开始写文件；未获批一律不写。

## 阶段 2：执行（按序）
1. 用 todo_write 拆分步骤并持续更新
2. 创建目录
3. 生成配置文件（优先从 templates/ 模板裁剪，见 scaffold-templates）
4. 安装依赖
5. 生成示例代码
- 门槛：目录与配置齐全、依赖安装成功，才进入验证。

## 阶段 3：验证
- 依次执行：install → build（或 typecheck）→ dev/start
- 任何一步失败必须修复到通过，禁止"应该没问题"式收尾。
- 门槛：三条命令全部通过，服务可访问。

## 阶段 4：交付
- 汇报：技术栈与版本清单、目录树、启动命令、验证结果、下一步建议。
- 确认 README 与实际 scripts 一致；.gitignore 覆盖产物与本地文件；密钥不进仓库。

## 沙箱与依赖安装（环境约束）
- 包缓存放进工作区：npm 用 `--cache .npm-cache`，pnpm 用 `--store-dir .pnpm-store`，避免缓存目录在工作区外被沙箱拦截（否则 npm 写缓存/日志失败）。
- 生命周期脚本（esbuild postinstall、node-gyp 等）在 workspace-write 下会因沙箱限制子进程管道报 `EPERM / spawn` 失败：把安装命令以 sandbox_permissions（danger-full-access）升级重试（会向用户弹审批），并说明原因。
- 模板的 build/typecheck/start 等运行期命令不受此限制。
- pnpm 11 默认阻止生命周期脚本：在 pnpm-workspace.yaml 加 `allowBuilds: { esbuild: true }`（或按需列出其他包）放行。
- 本机没有 pnpm 时：`corepack enable` 后 `corepack prepare pnpm@latest --activate`，或 `npm install -g pnpm`。
- workdir 必须指向已存在的目录：先创建目标目录再将其作为 workdir，或省略 workdir、在命令内先建目录再 `Set-Location`/`cd`；否则 spawn 阶段即失败，报误导性的 `ENOENT`（错误消息显示 powershell.exe，实际是 cwd 不存在），且命令体不会执行。

## 例外与裁剪
- 极简脚本/单文件工具可跳过模板与计划模式，但验证门槛不豁免。
- 用户明确要求"不用计划/直接干"时，跳过阶段 1，但阶段 0 与阶段 3 不豁免。