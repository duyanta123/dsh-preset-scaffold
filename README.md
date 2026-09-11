# dsh-preset-scaffold · Project Init Scaffold Preset

English | [简体中文](README.zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-preset-4c1d95)](https://github.com/topics/dsh-plugin)
[![CI](https://github.com/duyanta123/dsh-preset-scaffold/actions/workflows/ci.yml/badge.svg)](https://github.com/duyanta123/dsh-preset-scaffold/actions/workflows/ci.yml)
[![dsh-index](https://img.shields.io/badge/dsh--index-dsh--preset--scaffold-blue)](https://dsh-index.xlings.org/packages/dsh-preset-scaffold/)
[![version](https://img.shields.io/badge/version-0.1.4-green)](CHANGELOG.md)

A DeepSeek Harness (DSH) agent preset for "bootstrapping a project skeleton from scratch": ships an architect persona, a strict init runbook, per-stack template assets, and engineering standards.

Two installation shapes are supported: a **DSH plugin** (four engineering skills registered with the package) or a **full preset** (which additionally includes the architect persona and toolset configuration). The npm package name and GitHub repository name are both `dsh-preset-scaffold`.

## Positioning

dsh-preset-scaffold covers the "requirement description → runnable project skeleton" step: confirm requirements first, propose a plan (plan mode), and only generate / install dependencies / launch-verify after approval. It does not handle later feature development, nor does it replace your team's own scaffolding standards — templates and standards are both meant to be extended.

It answers:
- How should a new project start (directory structure, config files, engineering standards)?
- What do the six mainstream-stack starters look like, and how to pick one?
- How is the init flow kept from drifting (strict five phases + hard gates)?

## Installation

### Option 1: as a DSH plugin (recommended, dsh-index ecosystem compatible)

The four engineering skills (runbook / templates / structure / config standards) register with the package; persona and tools come from the host profile (web / standard already cover every tool the runbook references):

```powershell
dsh plugin --profile web add "github:duyanta123/dsh-preset-scaffold#v0.1.4"
```

Or from npm:

```powershell
npm install dsh-preset-scaffold
```

A new session is enough after install; template assets ship with the package and the `scaffold-templates` skill reads them directly.

### Option 2: as a full preset (includes the architect persona)

A preset is just a directory — install by copying, **no host config changes needed**. One-click on Windows:

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1
```

Or manual copy:

```powershell
# 1. Clone this repository
git clone https://github.com/duyanta123/dsh-preset-scaffold.git
# 2. Copy it into DSH's user preset root
Copy-Item -Recurse .\dsh-preset-scaffold "$env:USERPROFILE\.dsh\.agent-presets\scaffold"
# 3. Start a new session and pick the "Project Init Scaffold" preset
```

> Uninstall = delete the `$HOME/.dsh/.agent-presets/scaffold` directory.

### Requirements

- Template generation scripts and standalone tools: verified per each template's own Node / Python / Go / Java requirements.
- DSH 0.1.5-rc.2 host: Node.js >= 22.19 (the compatibility gate pins the installable `@deepseek-ai/dsh@0.1.5-rc.2`; verify with `npm run test:compat`).

## Quick Start

1. Start a new session and pick the "Project Init Scaffold" preset (full preset shape); or just state your requirements in a session with the plugin installed (plugin shape).
2. Describe the project in one sentence (stack, type, dependencies).
3. The agent confirms requirements → proposes a plan (plan mode) → generates after approval → installs dependencies → launch-verifies → reports commands and the directory tree.

## Templates & Skills

**Template assets `templates/` (six runnable starters)**:

| Template | Stack |
| --- | --- |
| `node-ts` | Node.js + TypeScript |
| `react-vite` | React + Vite |
| `python` | Python + FastAPI |
| `go` | Go |
| `spring-boot` | Spring Boot |
| `monorepo` | Monorepo workspace |

**Skills `skills/` (four)**:

| Skill | Responsibility |
| --- | --- |
| `scaffold-runbook` | Strict five-phase init runbook |
| `scaffold-templates` | Template inventory and usage |
| `project-structure-best-practices` | Directory structure standards |
| `engineering-configuration-standard` | Engineering configuration standards |

Under the plugin shape, persona and tools come from the host profile; the full preset shape additionally enables the architect persona and toolset declared in `agent.cordis.yml` (file read/write, pwsh/bash, background jobs, skills, plan mode, workflow, subagents, goal, todo, ask-user, web search).

## Development & Contributing

- This repository is the **source**; `$HOME/.dsh/.agent-presets/scaffold` is an **installed copy**. Changes to the repo must be synced over to take effect (`install.ps1` or manual `Copy-Item -Force`).
- Add a template: create `templates/<stack>/` with a complete runnable project, and register one line in `skills/scaffold-templates/SKILL.md`.
- Add a skill: create `skills/<name>/SKILL.md`; the YAML frontmatter needs `name` and `description`.
- Add/remove capabilities: edit the plugin rows in `agent.cordis.yml` (see the built-in `standard` preset).
- Verify: use `agentPresets.standingKeyFor('scaffold')` for mount verification; run a real session afterwards.

## Documentation

- [skills/scaffold-runbook/SKILL.md](skills/scaffold-runbook/SKILL.md) — the strict five-phase init runbook
- [templates/](templates/) — the six starter templates
- [CHANGELOG.md](CHANGELOG.md) — release notes
- [PLUGIN-MAINTENANCE.md](PLUGIN-MAINTENANCE.md) — repo maintenance runbook

## License

MIT © duyanta123
