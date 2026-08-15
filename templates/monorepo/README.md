# my-monorepo

pnpm workspace 结构骨架。把子项目放进 apps/ 或 packages/ 后即可复用。

## 结构
```
apps/
  api/      # 放 node-ts 模板，改 name 为 @my/api
  web/      # 放 react-vite 模板，改 name 为 @my/web
packages/   # 共享库
pnpm-workspace.yaml
```

## 快速开始
```bash
pnpm install
pnpm dev:api
pnpm dev:web
```

## 组合方式
- `apps/api`：使用 templates/node-ts，package.json 的 name 改为 `@my/api`
- `apps/web`：使用 templates/react-vite，package.json 的 name 改为 `@my/web`
```