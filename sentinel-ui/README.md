# 💻 SystemSentinel Frontend (UI)

Moderni React-käyttöliittymä telemeterian visualisointiin ja infrastruktuurin tilan seurantaan.

## 🎨 Tech Stack

- **Framework:** [React 18](https://reactjs.org) (TypeScript)
- **Bundler:** [Vite](https://vitejs.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Charts:** [Recharts](https://recharts.org)
- **Icons:** Lucide-React

## 🔧 Architecture Highlights

- **Component-Driven:** Modular design with `StatusCard` and `PerformanceChart` components.
- **Real-time Updates:** Polls the backend every 2000ms using optimized React Hooks (`useCallback`, `useEffect`).
- **Responsive:** Fluid grid layout supporting mobile to ultra-wide displays.

## 🚀 Quick Start

1. `npm install`
2. `npm run dev`

_Ensure `VITE_API_URL` is set correctly in your environment (defaults to localhost:8000)._
