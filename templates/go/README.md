# my-go-app

一句话说明项目用途。

## 技术栈
- Go 1.26+

## 快速开始
```bash
go run ./cmd/server
```

## 命令
| 命令 | 说明 |
|---|---|
| `go run ./cmd/server` | 启动服务 |
| `go build ./...` | 构建 |
| `go test ./...` | 运行测试 |
| `go vet ./...` | 静态检查 |

## 目录结构
```
cmd/server/
  main.go      # 入口：HTTP 服务
  main_test.go # 测试
```