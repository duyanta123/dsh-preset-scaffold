# my-fastapi-app

一句话说明项目用途。

## 技术栈
- Python >= 3.11
- FastAPI + Uvicorn

## 快速开始
```bash
python -m venv .venv
# Windows: .venv\Scripts\activate      Linux/macOS: source .venv/bin/activate
pip install -e .
dev                       # 等价于 uvicorn app.main:app --reload
```

## 命令
| 命令 | 说明 |
|---|---|
| `dev` | 开发模式（热重载） |
| `uvicorn app.main:app` | 启动服务 |

## 目录结构
```
src/app/
  main.py   # FastAPI 应用与路由
```