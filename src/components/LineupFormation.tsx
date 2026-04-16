"use client";

import { matchData, Player } from "@/lib/matchData";
import { useState } from "react";

type Props = { data: typeof matchData };

function PlayerDot({ player, teamColor }: { player: Player; teamColor: string }) {
  const hasEvent = player.goals || player.assists || player.yellowCard;

  return (
    <div className="group relative flex flex-col items-center gap-1">
      <div
        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 transition-transform hover:scale-110 cursor-pointer"
        style={{
          backgroundColor: teamColor,
          borderColor: hasEvent ? "#fbbf24" : "rgba(255,255,255,0.3)",
        }}
      >
        {player.number}
        {player.goals ? (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-black font-bold">
            ⚽
          </div>
        ) : null}
        {player.assists ? (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
            A
          </div>
        ) : null}
        {player.yellowCard ? (
          <div className="absolute -top-1 -left-1 w-3 h-4 bg-yellow-400 rounded-sm" />
        ) : null}
        {player.isCaptain && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] text-black font-bold">
            C
          </div>
        )}
      </div>
      <span className="text-[10px] sm:text-xs text-slate-300 text-center leading-tight max-w-[60px] truncate">
        {player.name.split(" ").pop()}
      </span>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-700 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-white shadow-xl">
        <div className="font-semibold">{player.name}</div>
        <div className="text-slate-400">{player.position} &middot; #{player.number}</div>
        <div className="text-slate-400">{player.minutesPlayed} min</div>
        {player.goals ? <div className="text-yellow-400">⚽ {player.goals} mål</div> : null}
        {player.assists ? <div className="text-blue-400">🅰️ {player.assists} assist</div> : null}
        {player.subbedOff && (
          <div className="text-orange-400">↩ Ut {player.subbedOff.minute}&apos; ({player.subbedOff.replacedBy})</div>
        )}
      </div>
    </div>
  );
}

function FormationPitch({
  lineup,
  formation,
  teamColor,
  teamName,
  isReversed,
}: {
  lineup: Player[];
  formation: string;
  teamColor: string;
  teamName: string;
  isReversed: boolean;
}) {
  const rows = formation.split("-").map(Number);
  const gk = lineup[0];
  const outfield = lineup.slice(1);

  let idx = 0;
  const lines: Player[][] = rows.map((count) => {
    const line = outfield.slice(idx, idx + count);
    idx += count;
    return line;
  });

  const allRows = [[gk], ...lines];
  if (isReversed) allRows.reverse();

  return (
    <div className="flex-1">
      <div className="text-center mb-3">
        <span className="text-sm font-semibold text-white">{teamName}</span>
        <span className="text-xs text-slate-400 ml-2">{formation}</span>
      </div>
      <div className="relative bg-gradient-to-b from-green-900/30 to-green-800/20 rounded-xl border border-green-700/30 p-3 sm:p-4">
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-green-700/30" />
        <div className="space-y-4 sm:space-y-6">
          {allRows.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-3 sm:gap-6">
              {row.map((player) => (
                <PlayerDot key={player.number} player={player} teamColor={teamColor} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SubsList({ subs, teamColor }: { subs: Player[]; teamColor: string }) {
  const usedSubs = subs.filter((s) => s.minutesPlayed > 0);
  const unusedSubs = subs.filter((s) => s.minutesPlayed === 0);

  return (
    <div className="mt-3">
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Avbytare</div>
      <div className="space-y-1.5">
        {usedSubs.map((s) => (
          <div key={s.number} className="flex items-center gap-2 text-xs">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: teamColor }}
            >
              {s.number}
            </div>
            <span className="text-slate-300">{s.name}</span>
            <span className="text-green-400 ml-auto">↑ {s.subbedOn?.minute}&apos;</span>
          </div>
        ))}
        {unusedSubs.length > 0 && (
          <div className="text-[11px] text-slate-600 mt-1">
            Ej inbytta: {unusedSubs.map((s) => s.name.split(" ").pop()).join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

export function LineupFormation({ data }: Props) {
  const [activeTab, setActiveTab] = useState<"formation" | "list">("formation");

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-slate-800/80 border border-slate-700/50 p-6"
      style={{ animationDelay: "0.08s" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Uppställningar
        </h3>
        <div className="flex gap-1 bg-slate-700/50 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab("formation")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeTab === "formation" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Formation
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeTab === "list" ? "bg-slate-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Lista
          </button>
        </div>
      </div>

      {activeTab === "formation" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormationPitch
            lineup={data.homeLineup.starters}
            formation={data.home.formation}
            teamColor={data.home.color}
            teamName={data.home.shortName}
            isReversed={false}
          />
          <FormationPitch
            lineup={data.awayLineup.starters}
            formation={data.away.formation}
            teamColor={data.away.color}
            teamName={data.away.shortName}
            isReversed={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { lineup: data.homeLineup, team: data.home },
            { lineup: data.awayLineup, team: data.away },
          ].map(({ lineup, team }) => (
            <div key={team.shortName}>
              <div className="text-sm font-semibold text-white mb-2">
                {team.shortName} <span className="text-slate-400 font-normal">({team.formation})</span>
              </div>
              <div className="space-y-1">
                {lineup.starters.map((p) => (
                  <div key={p.number} className="flex items-center gap-2 text-xs py-1 border-b border-slate-700/30">
                    <span className="w-6 text-center font-mono text-slate-500">{p.number}</span>
                    <span className={`flex-1 ${p.goals ? "text-yellow-300 font-semibold" : p.assists ? "text-blue-300" : "text-slate-300"}`}>
                      {p.name}
                      {p.isCaptain && <span className="text-slate-500 ml-1">(K)</span>}
                    </span>
                    <span className="text-slate-500">{p.position}</span>
                    <span className="text-slate-500 w-10 text-right">{p.minutesPlayed}&apos;</span>
                    {p.goals ? <span className="text-yellow-400">⚽</span> : null}
                    {p.assists ? <span className="text-blue-400 text-[10px]">🅰️</span> : null}
                    {p.yellowCard ? <span className="inline-block w-2 h-3 bg-yellow-400 rounded-sm" /> : null}
                    {p.subbedOff ? <span className="text-red-400">↓</span> : null}
                  </div>
                ))}
              </div>
              <SubsList subs={lineup.subs} teamColor={team.color} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 border-t border-slate-700/30 pt-3">
        <span>{data.home.shortName}: {data.home.manager}</span>
        <span>{data.away.shortName}: {data.away.manager}</span>
        <span className="ml-auto">Publik: {data.attendance.toLocaleString("sv-SE")}</span>
      </div>
    </div>
  );
}
