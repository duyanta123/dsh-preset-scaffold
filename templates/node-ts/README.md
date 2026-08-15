# my-node-ts-app

一句话说明项目用途。

## 技术栈
- Node.js >= 20
- TypeScript
- pnpm

## 快速开始
```bash
pnpm install
cp .env.example .env   # 按需修改
pnpm dev               # 开发（tsx watch）
pnpm build && pnpm start   # 构建并运行
```

## 命令
| 命令 | 说明 |
|---|---|
| `pnpm dev` | 开发模式（热重载） |
| `pnpm build` | 编译到 dist/ |
| `pnpm start` | 运行编译产物 |
| `pnpm typecheck` | 类型检查 |

## 目录结构
```
src/
  index.ts   # 入口：HTTP 服务
```