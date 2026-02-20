import type { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: number | string;
  percent: number;
  icon: LucideIcon;
  colorClass: string;
  footer?: string;
  isLoading: boolean;
}

const StatusCard = ({
  title,
  value,
  percent,
  icon: Icon,
  colorClass,
  footer,
  isLoading,
}: StatusCardProps) => {
  const barColorClass = colorClass.replace("text", "bg");

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className={`flex justify-between items-center mb-4 ${colorClass}`}>
        <Icon size={24} />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div className="text-5xl font-extralight text-slate-800 mb-2">
        {isLoading ? "--" : `${value}%`}
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className={`${barColorClass} h-full transition-all duration-1000 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {footer && (
        <div className="mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">
          {footer}
        </div>
      )}
    </div>
  );
};

export default StatusCard;
