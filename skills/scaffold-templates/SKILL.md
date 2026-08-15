---
name: scaffold-templates
description: 本预设自带的分技术栈 starter 模板目录与用法。生成项目骨架时，先加载本技能并从 templates/ 选取对应技术栈模板作为基底，而非从零手写。
---

# 模板资产与用法

本预设内置可运行的 starter 模板，位于预设根目录 `templates/`。本技能基目录为 `<preset>/skills/scaffold-templates`，因此模板根目录 = 相对本基目录的 `../../templates`。

## 现有模板
| 目录 | 技术栈 | 入口 | 验证命令 |
|---|---|---|---|
| `templates/node-ts` | TypeScript + Node HTTP 服务 | `src/index.ts` | `pnpm dev` / `pnpm build && pnpm start` |
| `templates/react-vite` | React 18 + TypeScript + Vite | `src/main.tsx` | `pnpm dev` / `pnpm build` |
| `templates/python` | Python 3.11+ FastAPI | `src/app/main.py` | `pip install -e . && uvicorn app.main:app --reload` |
| `templates/go` | Go 1.22+ net/http | `cmd/server/main.go` | `go run ./cmd/server` |
| `templates/spring-boot` | Java 21 + Spring Boot 3.4（Maven） | `Application.java` | `mvn spring-boot:run` |
| `templates/monorepo` | pnpm workspace 结构 | `pnpm-workspace.yaml` | 与 node-ts / react-vite 组合使用 |

## 使用步骤
1. 用 read/glob 读取对应模板目录下的全部文件（含 dotfile：`.gitignore`、`.env.example`）。
2. 按需求改写：项目名、端口、依赖、业务代码；保留结构与脚本约定。
3. 用 write 写入目标项目目录，然后进入安装与验证。
4. 模板内版本号是起点，用 web_search 核验当前稳定版本后按需更新。

## monorepo 特例
`templates/monorepo` 只提供 workspace 结构；把 `node-ts` 放入 `apps/api`、`react-vite` 放入 `apps/web`，并将各自 package.json 的 `name` 改为 `@my/api`、`@my/web`。

## 无匹配模板时
- 就近套用最接近的模板骨架，替换语言/框架相关文件。
- 遵循 project-structure-best-practices 与 engineering-configuration-standard 的规范，不凭记忆乱写。

## 扩展模板
在 `templates/` 下新增 `<stack>/` 目录，放入完整可运行文件，并在此技能登记一行。