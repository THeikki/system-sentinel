# ⚙️ SystemSentinel Backend (API)

Tämä on sovelluksen Python-pohjainen ydin, joka vastaa järjestelmäresurssien matalan tason monitoroinnista.

## 🛠️ Tech Stack

- **Framework:** [FastAPI](https://fastapi.tiangolo.com)
- **Library:** [psutil](https://github.com) (System cross-platform access)
- **Server:** Uvicorn

## 🔍 Key Features

- **OS Integration:** Reads real-time CPU and Memory metrics.
- **Docker Awareness:** Detects if running inside a container and attempts to access host `/proc` via `PROCFS_PATH`.
- **Auto-Documentation:** Interactive Swagger UI available at `/docs` when running.

## 🚀 Quick Start (Native)

1. `python -m venv venv`
2. `source venv/bin/activate` (or `.\venv\Scripts\activate` on Windows)
3. `pip install -r requirements.txt`
4. `python main.py`
