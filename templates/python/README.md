# my-fastapi-app

一句话说明项目用途。

## 技术栈
- Python >= 3.11
- FastAPI + Uvicorn

## 快速开始
```bash
python -m venv .venv
# Windows: .venv\Scripts\activate      Linux/macOS: source .venv/bin/activate
pip install -e .                    # 运行依赖
pip install -e ".[dev]"             # 含测试依赖
uvicorn app.main:app --reload       # 开发（热重载）
```

## 命令
| 命令 | 说明 |
|---|---|
| `uvicorn app.main:app --reload` | 开发模式（热重载） |
| `uvicorn app.main:app` | 启动服务 |
| `pytest` | 运行测试 |

## 目录结构
```
src/app/
  main.py   # FastAPI 应用与路由
tests/
  test_main.py
```