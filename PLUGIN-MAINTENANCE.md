# dsh-preset-scaffold 维护规则（Maintenance Runbook）

> 本文档是 dsh-preset-scaffold 仓库的专属维护基准，与工作区顶层 docs/PLUGIN-MAINTENANCE.md 通用规则配套使用（该文件位于本仓库之外）。本文件聚焦本仓库的细节。
> 原则：**不改不动，要改就一步到位**——代码/技能、测试、CHANGELOG、版本号、tag 一起改，不留下半成品版本。

## 1. 仓库概况

| 项 | 值 |
|---|---|
| 类型 | 模板型（项目初始化脚手架预设） |
| 当前版本 | 0.1.4 |
| 分发状态 | dsh-index / awesome-dsh-plugin / awesome-deepseek-harness 已收录 |
| 运行时 | 零构建 ESM，`plugin/index.js` 由 harness 加载 |
| 验收方式 | **包级自动化 + 真机验证**——`npm test` 检查 manifest/template，模板生成项目后再跑通最小测试 |

## 2. 目录结构与职责

```text
dsh-preset-scaffold/
├── package.json            # npm 包 + dsh.bundle.patch + files 白名单
├── cordis.patch.yml        # DSH bundle patch（安装形态）
├── agent.cordis.yml        # 完整独立预设形态
├── install.ps1             # 预设安装脚本
├── plugin/index.js         # 注册技能根
├── preset.yml              # 预设描述
├── skills/                 # 4 个技能：scaffold-runbook / scaffold-templates / engineering-configuration-standard / project-structure-best-practices
├── templates/              # 六套可运行模板（见第 5 节）
├── test/
│   ├── manifest-template.test.mjs # 包级 manifest/template smoke test
│   └── dsh-compat.test.mjs        # DSH 0.1.5-rc.2 宿主兼容性门禁
└── CHANGELOG.md / README.md / LICENSE / .editorconfig / .gitattributes
```

## 3. CI 与测试门禁

- **包级结构门禁**：`npm test` 检查 manifest、patch、技能 frontmatter、六套模板入口/config 和 `files` 白名单；不强制在包级测试安装模板生态依赖。
- **DSH 宿主兼容**：`npm run test:compat` 固定 `@deepseek-ai/dsh@0.1.5-rc.2`，要求 Node >=22.19，执行临时 profile 的 add、dump-config 和有限时长启动。
- **GitHub Actions**：仓库级 CI 执行 `npm test`、`npm run test:compat` 和 `npm pack --dry-run`。
- **硬门槛**：任何模板改动后，必须用该模板真机生成项目并跑通最小测试，方可提交/发布。

## 4. 一次完整变更的动作序列

1. 改模板 / 技能 / 文档
2. **真机验证**：用改动模板生成项目 → 装依赖 → 跑通最小测试
3. 更新 `CHANGELOG.md`（先写 `Unreleased`）
4. 有行为变更时改 `package.json` 的 `version`（semver）
5. 推送 `main`，确认各模板 CI 全绿
6. 打 tag `v0.x.y` 并推送

## 5. 六套模板与升级触点

| 模板 | 语言/框架 | 关键验收 | 生态升级触点 |
|---|---|---|---|
| `node-ts` | Node + TypeScript | `pnpm test` / `tsc` | pnpm、Node 版本 |
| `react-vite` | React + Vite | `vitest` | Vite 大版本、React 大版本 |
| `python` | Python + FastAPI | `pytest` | Python 版本、FastAPI/uvicorn |
| `go` | Go | `go test ./...` | Go 版本 |
| `spring-boot` | Java + Spring Boot | `mvn test` | **Spring Boot 4 / Java 版本** |
| `monorepo` | pnpm workspace | 各包可安装 | pnpm workspace 语法 |

### 升级规则
- 模板语言生态大版本升级（如 Spring Boot 4、Node 主版本、Python 主版本）→ 升 **minor**。
- 升级某模板后，**必须用该模板真机生成并跑通最小测试**（`node-ts` 与 `spring-boot` 是既有真机基准，其余以自带 CI 为验收线）。
- 同一轮升级多个模板时，逐个验证，避免一次性大面积改动掩盖回归。

## 6. 技能与预设维护

- `skills/*/SKILL.md` 与 `preset.yml` / `agent.cordis.yml` / `cordis.patch.yml` 描述需保持一致。
- 若改动对外描述，同步：`README.md` / `README.zh-CN.md` 首段（双语，结构一致）、`package.json` 的 `description`/`keywords`、awesome-dsh-plugin 的 `data/plugins/duyanta123__dsh-preset-scaffold.yml`；发版时同步双语 README 的 version 徽章与安装示例 tag。
- `packages` 安装形态与 `agent.cordis.yml` 独立预设形态并存——改动 runbook 时两处人设/工具声明都要核对，避免宿主 profile 与独立预设行为漂移。

## 7. 版本与发布节奏

- 模板生态大版本升级、新模板加入 → **minor**；单模板小修 / 文档 → **patch**。
- 发布动作：归并 `Unreleased` → 明确版本号 → 确认 `version` 与 tag 一致 → 打 `v0.x.y`。

## 8. 发布前清单

- [ ] 涉及模板的改动已真机生成并跑通最小测试
- [ ] 涉及模板的改动已推送，各模板自带 CI 全绿
- [ ] `CHANGELOG.md` 已归并 `Unreleased`
- [ ] `package.json` `version` 与 tag 一致
- [ ] 双语 README 的 version 徽章与安装示例 tag 已同步
- [ ] `files` 字段包含所有应发布文件（`templates/`、`skills/`、`preset.yml`、`agent.cordis.yml`、`install.ps1` 等）
- [ ] 包级 manifest/template smoke test 与 DSH compat smoke test 通过
- [ ] 对外描述若变，列表条目已同步（或已提交 PR）
- [ ] 打并推送 tag `v0.x.y`
