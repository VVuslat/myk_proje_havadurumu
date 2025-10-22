import os
import sqlite3
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from typing import List, Dict

ROOT = os.path.dirname(__file__)
DB_PATH = os.path.join(ROOT, "mock_weather.db")
INDEX_PATH = os.path.join(ROOT, "index.html")
STATIC_DIR = os.path.join(ROOT, "static")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # geliştirme için, prod'da kısıtlayın
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# statik dosyaları /static altında servis et (STATIC_DIR var ise)
if os.path.isdir(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# kök istek için index.html döndür
@app.get("/", include_in_schema=False)
def read_index():
    if not os.path.exists(INDEX_PATH):
        raise HTTPException(status_code=404, detail="index.html bulunamadı")
    return FileResponse(INDEX_PATH)

def fetch_all() -> List[Dict]:
    if not os.path.exists(DB_PATH):
        return []
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT id, city, temperature, description FROM weather ORDER BY id")
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return rows

@app.get("/weather")
def get_weather():
    return fetch_all()