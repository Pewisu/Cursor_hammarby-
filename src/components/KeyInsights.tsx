"use client";

import { matchData } from "@/lib/matchData";

type Props = { data: typeof matchData };

const iconMap: Record<string, { icon: string; gradient: string }> = {
  tactical: {
    icon: "🎯",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  possession: {
    icon: "⚽",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  efficiency: {
    icon: "📊",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  passing: {
    icon: "🔄",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
};

export function KeyInsights({ data }: Props) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: "0.3s" }}
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Nyckelinsikter
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.keyInsights.map((insight, i) => {
          const style = iconMap[insight.type] || iconMap.tactical;
          return (
            <div
              key={i}
              className={`rounded-xl bg-gradient-to-br ${style.gradient} border border-slate-700/50 p-5 transition-transform hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{style.icon}</span>
                <h4 className="font-semibold text-white">{insight.title}</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {insight.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
