from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    """Testaa, että juuri-endpoint vastaa oikein."""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "online", "service": "SystemSentinel Core"}

def test_get_system_status_structure():
    """Testaa, että status-rajapinta palauttaa vaaditut kentät."""
    response = client.get("/api/status")
    assert response.status_code == 200
    
    data = response.json()
    # Varmistetaan pakolliset avaimet
    assert "cpu" in data
    assert "memory" in data
    assert "runtime_environment" in data
    assert "system_info" in data
    
    # Varmistetaan datatyypit
    assert isinstance(data["cpu"]["usage_percent"], (int, float))
    assert isinstance(data["memory"]["used_percent"], (int, float))

def test_cors_headers():
    """Varmistaa, että CORS-otsakkeet ovat paikallaan (tärkeää frontendille)."""
    response = client.options("/api/status", headers={
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "GET",
    })
    assert response.status_code == 200
    assert "access-control-allow-origin" in response.headers
