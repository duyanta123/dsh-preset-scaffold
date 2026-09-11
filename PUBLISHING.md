# Publishing

> 本文是 dsh-preset-scaffold 的发布手册，结构遵循工作区顶层 docs/PUBLISHING-TEMPLATE.md 模板（该文件位于插件仓库之外，不在本仓库内）；其他插件仓库的 PUBLISHING.md 同构。

## 1. 命名与分发身份

- npm 包名：`dsh-preset-scaffold`（与 GitHub 仓库名一致）。
- GitHub 仓库名：`duyanta123/dsh-preset-scaffold`。
- exports 仅根路径（`./plugin/index.js`），无 bin 命令、无子路径导出。
- 双形态分发：`dsh.bundle.patch`（`cordis.patch.yml`，插件形态）+ `preset.yml` / `agent.cordis.yml` / `install.ps1`（完整预设形态，随包分发但不经 npm 安装——直接复制目录）。
- README 双语：`README.md` 为英文、`README.zh-CN.md` 为中文，顶部互链；两者章节结构必须一致，改动描述时同步更新。

## 2. 发布前检查清单

1. 运行 `npm test`（`node --test test/manifest-template.test.mjs`，包级 manifest/template smoke test）。
2. 运行 `npm run test:compat`（DSH 宿主兼容门禁）。
3. **模板真机验证**：改动过的模板逐一真机生成项目、装依赖、跑通最小测试（`node-ts` 与 `spring-boot` 是既有真机基准，其余以自带 CI 为验收线）。
4. 运行 `npm pack --dry-run`，确认包含 `plugin/index.js`、`cordis.patch.yml`、`skills/`、`templates/`、`preset.yml`、`agent.cordis.yml`、`install.ps1`、双语 `README.md`/`README.zh-CN.md`、`CHANGELOG.md`、`LICENSE`。
5. 版本一致性核对：`package.json` version、`CHANGELOG.md` 发布段、git tag 三处一致。
6. 版本徽章同步：双语 README 的 version 徽章与安装示例 tag 指向最新发布版本。
7. runbook、`preset.yml`、`agent.cordis.yml`、`cordis.patch.yml` 四处描述一致（双形态行为不漂移）。

## 3. DSH bundle 契约（对齐 2026-09 现行契约）

- `package.json` 声明 `dsh.bundle.patch: ./cordis.patch.yml`——harness 只激活声明该字段的包。
- `cordis.patch.yml` 为 config-tree `- insert:` 补丁格式；harness 加载 `main`（`plugin/index.js`）。
- `plugin/index.js` 经官方 `@deepseek-ai/dsh-skill-filesystem` 的 `FileSystemSkillProvider` 注册 `skills/` 为技能根（includeDefaultRoots: false）。
- 四个技能（`scaffold-runbook` / `scaffold-templates` / `engineering-configuration-standard` / `project-structure-best-practices`）frontmatter 必填 `name`（kebab-case）+ `description`。
- 完整预设形态：目录复制到 `$HOME/.dsh/.agent-presets/scaffold`，由 `preset.yml` + `agent.cordis.yml` 声明人设与工具集。
- 安装契约：`dsh plugin --profile <profile> add "github:owner/repo#ref"`；兼容基线 `@deepseek-ai/dsh@0.1.5-rc.2`（Node >= 22.19）。

## 4. 发布渠道

### GitHub

1. push `main`，确认 CI 全绿（包级 manifest/template smoke test + DSH compat job）。
2. 打 tag `v0.x.y`（与 `package.json` version 一致，如当前 `v0.1.4`）并推送。
3. 给仓库添加 GitHub topic `dsh-plugin`（awesome 收录门槛之一）。

### npm

1. `npm login`（需要 npm 账号 + 2FA）。
2. `npm publish`。
3. 发布后核对 `npm view dsh-preset-scaffold version` 与 dist-tags。

### awesome 列表收录（已收录，改描述时同步）

- awesome-dsh-plugin：同步 `data/plugins/duyanta123__dsh-preset-scaffold.yml` 的描述与分类。
- awesome-deepseek-harness：同步 README 条目（真实仓库 + 一句话 + 链接，en/zh 同 PR）。
- dsh-index：已收录（`https://dsh-index.xlings.org/packages/dsh-preset-scaffold/`）。

## 5. 安装验证（发布后）

1. 插件形态：`dsh plugin --profile web add ...` 后重启 profile，技能列表应出现四个 scaffold 技能。
2. 完整预设形态：`install.ps1` 或手动复制后新建会话，预设选择「项目初始化脚手架」。
3. 用一句话需求（如「用 node-ts 起一个todo 服务」）走完五阶段：确认需求 → 方案 → 生成 → 装依赖 → 启动验证。
