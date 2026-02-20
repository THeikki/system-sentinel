import { useEffect, useState, useCallback } from "react";
import {
  Cpu,
  Database,
  Activity,
  ShieldCheck,
  AlertCircle,
  Server,
} from "lucide-react";
import StatusCard from "./components/StatusCard";
import PerformanceChart from "./components/PerformanceChart";
import type { SystemStatusResponse, ChartDataPoint } from "./types";

const App = () => {
  const [dataHistory, setDataHistory] = useState<ChartDataPoint[]>([]);
  const [current, setCurrent] = useState<SystemStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/api/status`);
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const result: SystemStatusResponse = await response.json();

      setCurrent(result);
      setError(null);
      setIsLoading(false);

      setDataHistory((prev) => [
        ...prev.slice(-19),
        {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          cpu: result.cpu.usage_percent,
          mem: result.memory.used_percent,
        },
      ]);
    } catch {
      setError("Yhteys backendiin katkesi. Tarkista Docker-kontti.");
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const hasTelemetry = dataHistory.length > 0;

  return (
    <div className="h-screen bg-slate-50 p-4 md:p-6 lg:p-8 font-sans text-slate-900 flex flex-col items-center overflow-hidden">
      <header className="w-full max-w-7xl mb-10 flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200 gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-800 flex items-center gap-3">
            <Activity className="text-blue-600" size={32} /> SystemSentinel
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Node Environment:
            </span>
            <span
              className={`text-[10px] px-3 py-1 rounded-full font-mono font-bold uppercase ${
                current?.runtime_environment.includes("Docker")
                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                  : "bg-orange-50 text-orange-700 border border-orange-100"
              }`}
            >
              {current?.runtime_environment || "Initializing..."}
            </span>
          </div>
        </div>

        {error ? (
          <div className="flex items-center gap-3 text-red-600 bg-red-50 px-6 py-3 rounded-xl border border-red-100 animate-pulse shadow-sm">
            <AlertCircle size={20} />
            <span className="text-sm font-black uppercase tracking-tight">
              {error}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-6 py-3 rounded-xl border border-emerald-100 shadow-sm">
            <ShieldCheck size={20} />
            <span className="text-xs font-black uppercase tracking-[0.15em]">
              Infrastructure Secured
            </span>
          </div>
        )}
      </header>
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-8 h-full">
          <StatusCard
            title="Processor Utilization"
            value={current?.cpu.usage_percent || 0}
            percent={current?.cpu.usage_percent || 0}
            icon={Cpu}
            colorClass="text-blue-600"
            footer={`Threads: ${current?.cpu.cores_logical || 0} | Physical: ${current?.cpu.cores_physical || 0}`}
            isLoading={isLoading}
          />

          <StatusCard
            title="Memory Allocation"
            value={current?.memory.used_percent || 0}
            percent={current?.memory.used_percent || 0}
            icon={Database}
            colorClass="text-purple-600"
            footer={`Total Available: ${current?.memory.total_gb || 0} GB`}
            isLoading={isLoading}
          />

          <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-2xl border-l-8 border-blue-500 transform transition-transform hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-6 text-slate-400 uppercase text-[11px] font-black tracking-[0.2em]">
              <Server size={18} /> Node Analytics
            </div>
            <div className="space-y-4 font-mono text-xs">
              <p className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 uppercase font-black">
                  Hostname:
                </span>
                <span className="font-bold text-blue-400">
                  {current?.system_info.node}
                </span>
              </p>
              <p className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 uppercase font-black">
                  Kernel/OS:
                </span>
                <span>{current?.system_info.os}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 w-full h-full">
          {hasTelemetry ? (
            <PerformanceChart data={dataHistory} />
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[600px] w-full">
              <Activity
                className="text-slate-100 mb-6 animate-pulse"
                size={80}
              />
              <p className="text-slate-400 text-xs font-mono uppercase tracking-[0.3em] font-black italic text-center leading-relaxed">
                Awaiting Telemetry Stream
                <br />
                from Secure Node...
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full max-w-7xl mt-16 text-center text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black">
        Heikki Törmänen &bull; @2026
      </footer>
    </div>
  );
};

export default App;