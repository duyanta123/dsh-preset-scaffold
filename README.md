# dsh-preset-scaffold · 项目初始化脚手架预设

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-preset-4c1d95)](https://github.com/topics/dsh-plugin)
[![dsh-index](https://img.shields.io/badge/dsh--index-dsh--preset--scaffold-blue)](https://dsh-index.xlings.org/packages/dsh-preset-scaffold/)
[![version](https://img.shields.io/badge/version-0.1.1-green)](CHANGELOG.md)

一个面向「从零搭建项目骨架」的 DeepSeek Harness（DSH）Agent 预设：内置架构师人设、严格初始化流程、分技术栈模板资产与工程化规范。

## 功能

- **人设（persona）**：项目架构师——决策规则、工具映射、输出契约、硬性约束
- **工具集**：文件读写、pwsh/bash、后台作业、skills、计划模式、workflow、子代理、goal、todo、ask-user、web 搜索
- **模板资产 `templates/`**：node-ts、react-vite、python(FastAPI)、go、spring-boot、monorepo 六套 starter
- **技能 `skills/`**：scaffold-runbook（严格流程）、scaffold-templates（模板用法）、project-structure-best-practices（目录规范）、engineering-configuration-standard（配置规范）

## 安装（DSH 用户）

### 方式一：作为插件安装（推荐，可入 dsh-index 生态）

四个工程化 skills（runbook / 模板 / 结构 / 配置规范）随包注册，人设与工具沿用宿主 profile（web / standard 已覆盖 runbook 引用的全部工具）：

```powershell
dsh plugin --profile web add github:duyanta123/dsh-preset-scaffold
```

安装后新建会话即可用；模板资产随包分发，`scaffold-templates` 技能可直接读取。

### 方式二：作为完整预设安装（含架构师人设）

预设 = 一个目录，安装即复制，**无需改任何宿主配置**：

```powershell
# 1. 克隆本仓库
git clone https://github.com/duyanta123/dsh-preset-scaffold.git
# 2. 复制到 DSH 的用户预设根目录
Copy-Item -Recurse .\dsh-preset-scaffold "$env:USERPROFILE\.dsh\.agent-presets\scaffold"
# 3. 新建会话，预设选择「项目初始化脚手架」
```

> 卸载 = 删除 `$HOME/.dsh/.agent-presets/scaffold` 目录。

## 使用

1. 新建会话，预设选择「项目初始化脚手架」。
2. 用一句话描述项目（技术栈、类型、依赖）。
3. Agent 会先确认需求 → 出方案（计划模式）→ 经批准后生成 → 安装依赖 → 启动验证 → 汇报命令与目录树。

## 开发与贡献

- 本仓库是**源**；`$HOME/.dsh/.agent-presets/scaffold` 是**已安装副本**。改动仓库后需同步过去才生效：

  ```powershell
  Copy-Item -Recurse .\dsh-preset-scaffold "$env:USERPROFILE\.dsh\.agent-presets\scaffold" -Force
  ```

- 加模板：新建 `templates/<stack>/` 放入完整可运行文件，并在 `skills/scaffold-templates/SKILL.md` 登记一行。
- 加技能：新建 `skills/<name>/SKILL.md`，YAML frontmatter 需含 `name` 与 `description`。
- 加/减能力：编辑 `agent.cordis.yml` 的插件行（参考内置 `standard` 预设）。
- 校验：用 `agentPresets.standingKeyFor('scaffold')` 做挂载校验；改完建议新建会话实跑一遍。

## License

MIT © duyanta123
