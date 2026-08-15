from fastapi import FastAPI

app = FastAPI(title="my-fastapi-app")


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}