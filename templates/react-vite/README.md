# my-react-app

一句话说明项目用途。

## 技术栈
- React 19 + TypeScript
- Vite 8
- pnpm

## 快速开始
```bash
pnpm install
pnpm dev            # http://localhost:5173
pnpm build          # 构建到 dist/
pnpm preview        # 预览构建产物
```

## 命令
| 命令 | 说明 |
|---|---|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 类型检查 + 生产构建 |
| `pnpm preview` | 预览构建产物 |
| `pnpm typecheck` | 类型检查 |
| `pnpm test` | 运行测试（vitest） |
| `pnpm lint` | 代码检查 |
| `pnpm format` | 格式化 |

## 目录结构
```
src/
  main.tsx    # 入口
  App.tsx     # 根组件
  utils.ts    # 工具函数
  index.css   # 全局样式
test/
  utils.test.ts
```