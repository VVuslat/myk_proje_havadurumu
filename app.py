from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os
from typing import List, Dict
from fastapi.staticfiles import StaticFiles

DB_PATH = os.path.join(os.path.dirname(__file__), "mock_weather.db")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # geliştirme: prod'da daraltın
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/", StaticFiles(directory=os.path.dirname(__file__), html=True), name="static")

def fetch_all() -> List[Dict]:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT id, city, temperature, description FROM weather ORDER BY id")
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return rows

@app.get("/weather")
def get_weather():
    return fetch_all()    # ...existing code...
    @app.get("/")
    def root():
        return {"detail": "Uygulama çalışıyor. /weather endpoint'i mevcut."}
    # ...existing code...    # ...existing code...
    @app.get("/")
    def root():
        return {"detail": "Uygulama çalışıyor. /weather endpoint'i mevcut."}
    # ...existing code...    # ...existing code...
    @app.get("/")
    def root():
        return {"detail": "Uygulama çalışıyor. /weather endpoint'i mevcut."}
    # ...existing code...