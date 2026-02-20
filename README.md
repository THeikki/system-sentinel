# 🛡️ SystemSentinel – Real-time Infrastructure Monitor

SystemSentinel on **Full Stack -valvontatyökalu**, joka on kehitetty osoittamaan osaamista turvallisuuskriittisten järjestelmien resurssien seurannassa, kontitetussa arkkitehtuurissa ja automaattisessa laadunvarmistuksessa.

 **Live Demo:** [https://system-sentinel.vercel.app](https://system-sentinel.vercel.app)
*Huom: Backend on majoitettu Renderin ilmaisella tasolla. Ensimmäinen lataus voi kestää n. 30–60 sekuntia palvelimen "heräämisen" vuoksi.*

---

## 🚀 Teknologiapino

- **Backend:** Python 3.11, FastAPI, psutil (OS-tason integraatio)
- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite
- **Visualisointi:** Recharts (Reaaliaikainen telemeteria)
- **Infrastruktuuri:** Docker & Docker Compose (Container-first approach)
- **CI/CD:** GitHub Actions (Pytest & Vitest)

## 🛠️ Keskeiset ominaisuudet

- **Reaaliaikainen seuranta:** CPU- ja RAM-kuorman visualisointi 2000ms polling-välillä.
- **Docker-Host Awareness:** Älykäs ajoympäristön tunnistus. Sovellus kykenee lukemaan isäntäkoneen `/proc`-tietoja suoraan kontista käsin (`pid: host`).
- **Responsiivinen Dashboard:** Moderni, Tailwindillä toteutettu käyttöliittymä, joka mukautuu mobiilista isoille näytöille.
- **Laadunvarmistus:** Kattavat yksikkötestit sekä backendille (Pytest) että frontendille (Vitest).

## ☁️ Pilvijulkaisu (Deployment)
- **Frontend:** [Vercel](https://vercel.com) (Automated CI/CD from `main` branch)
- **Backend:** [Render](https://render.com) (Docker-pohjainen Blueprint-julkaisu)
- **API Endpoint:** `https://sentinel-api-8l6q.onrender.com`

---

## 📦 Paikallinen käyttöohje

Projekti on jaettu kahteen päämoduuliin: `sentinel-api` ja `sentinel-ui`.

### 1. Backendin käynnistys (Docker)
Backend suositellaan ajettavaksi Dockerilla, jotta se voi hyödyntää isäntäkoneen resurssien seurantaa eristetyssä ympäristössä.

Siirry juurikansioon ja aja:

```bash
docker-compose up --build api
```
Backend vastaa osoitteessa: http://localhost:8000/api/status

### 2. Frontendin käynnistys (Natiivi)
Frontend suositellaan ajettavaksi natiivisti nopean kehityssyklin (HMR) mahdollistamiseksi.

```bash
cd sentinel-ui
npm install
npm run dev
```

Frontend avautuu osoitteeseen: http://localhost:5173

### 3. Testien ajaminen

Projektissa on automaattiset testit molemmille osa-alueille:

Backend:

```bash 
cd sentinel-api
pytest
```

Frontend: 

```bash
cd sentinel-ui
npm test
```

📝 Arkkitehtoniset huomiot
Projektissa on ratkaistu Docker-eristykseen liittyvä haaste: jotta kontti näkee isäntäkoneen resurssit, on hyödynnetty Linuxin /proc-tiedostojärjestelmän mounttausta ja PROCFS_PATH-ympäristömuuttujaa. Frontendissä on käytetty useCallback-optimointia ja asynkronista renderöintiä graafien vakauden varmistamiseksi.

Tekijä: Heikki Törmänen