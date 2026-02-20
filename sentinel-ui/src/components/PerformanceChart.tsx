import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint } from "../types";

interface PerformanceChartProps {
  data: ChartDataPoint[];
}

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px] w-full transition-shadow hover:shadow-md">
      <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">
            Performance History
          </h2>
          <p className="text-[10px] text-slate-500 font-mono italic uppercase tracking-widest mt-1">
            Real-time Stream &bull; Buffer: 20 Nodes
          </p>
        </div>
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-tighter italic">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></span>{" "}
            CPU Usage
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500 shadow-sm shadow-purple-200"></span>{" "}
            RAM Usage
          </div>
        </div>
      </div>

      <div className="flex-grow w-full min-h-[400px]">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f8fafc"
            />
            <XAxis
              dataKey="time"
              fontSize={10}
              tickMargin={15}
              stroke="#cbd5e1"
              fontFamily="monospace"
            />
            <YAxis
              domain={[0, 100]}
              fontSize={10}
              stroke="#cbd5e1"
              orientation="right"
              fontFamily="monospace"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                border: "none",
                borderRadius: "16px",
                fontSize: "12px",
                boxShadow:
                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                padding: "12px",
              }}
            />
            <Line
              type="stepAfter"
              dataKey="cpu"
              stroke="#3b82f6"
              strokeWidth={4}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="stepAfter"
              dataKey="mem"
              stroke="#a855f7"
              strokeWidth={4}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
