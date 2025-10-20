from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import sqlite3
import os
from typing import List, Dict

ROOT = os.path.dirname(__file__)
DB_PATH = os.path.join(ROOT, "mock_weather.db")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # geliştirme için, prod'da kısıtlayın
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# statik dosyaları /static altında servis et
app.mount("/static", StaticFiles(directory=ROOT), name="static")

# kök istek için index.html döndür
@app.get("/")
def read_index():
    index_path = os.path.join(ROOT, "index.html")
    return FileResponse(index_path)

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