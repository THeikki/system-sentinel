import os
import platform
import psutil
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="SystemSentinel Core API", version="1.1.0")

# CORS-asetukset frontend-yhteyttä varten
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://system-sentinel.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_runtime_env():
    """
    Tarkistaa onko ajoympäristö Docker-kontti vai natiivi isäntäkone.
    Hyödyntää /proc-liitoksen tarkistusta.
    """
    if os.path.exists('/host/proc'):
        # Kertoo psutil-kirjastolle, että se lukee isäntäkoneen statseja
        os.environ['PROCFS_PATH'] = '/host/proc'
        return "Docker (Host-Aware Mode)"
    
    # Tarkistetaan yleinen .dockerenv tiedosto
    if os.path.exists('/.dockerenv'):
        return "Docker (Isolated Mode)"
    
    return f"Native ({platform.system()})"

@app.get("/")
async def root():
    """Tarkistuspiste, joka kertoo API:n olevan toiminnassa."""
    return {"status": "online", "service": "SystemSentinel Core"}


@app.get("/api/status")
async def get_system_status():
    try:
        env = get_runtime_env()
        
        # Haetaan resurssitiedot (psutil lukee nyt oikeasta polusta PROCFS_PATH:n ansiosta)
        cpu_usage = psutil.cpu_percent(interval=0.1)
        memory = psutil.virtual_memory()

        return {
            "timestamp": datetime.now().isoformat(),
            "runtime_environment": env,
            "system_info": {
                "os": platform.system(),
                "node": platform.node(),
                "release": platform.release(),
                "machine": platform.machine()
            },
            "cpu": {
                "usage_percent": cpu_usage,
                "cores_logical": psutil.cpu_count(),
                "cores_physical": psutil.cpu_count(logical=False)
            },
            "memory": {
                "total_gb": round(memory.total / (1024**3), 2),
                "used_percent": memory.percent,
                "available_gb": round(memory.available / (1024**3), 2)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Järjestelmävirhe: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
