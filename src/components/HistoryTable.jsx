import React from 'react';

export function HistoryTable({ history }) {
    const safeHistory = Array.isArray(history) ? history : [];

    return (
        <div className="glass-panel p-6 w-full h-full min-h-[400px] flex flex-col relative overflow-hidden rounded-2xl">
            <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full inline-block shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
                Performance History
            </h3>

            <div className="flex-1 overflow-auto pr-2">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-xl z-20 shadow-sm shadow-black/20">
                        <tr>
                            <th className="py-4 items-center text-slate-400 font-semibold text-xs tracking-wider uppercase border-b border-white/10">Attempt</th>
                            <th className="py-4 text-slate-400 font-semibold text-xs tracking-wider uppercase border-b border-white/10">Time</th>
                            <th className="py-4 text-slate-400 font-semibold text-xs tracking-wider uppercase border-b border-white/10">Mistakes</th>
                            <th className="py-4 text-slate-400 font-semibold text-xs tracking-wider uppercase border-b border-white/10 text-right">Strategy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {safeHistory.map((row, idx) => (
                            <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                                <td className="py-4 text-slate-300 font-medium">#{row?.attempt ?? "?"}</td>
                                <td className="py-4 text-slate-300">
                                    <span className="bg-slate-800/80 px-2.5 py-1.5 rounded-lg text-slate-200 text-sm font-medium border border-white/5 shadow-sm">
                                        {row?.time ?? 0}s
                                    </span>
                                </td>
                                <td className="py-4 text-slate-300">
                                    {row?.mistakes > 0 ? (
                                        <span className="text-red-400 font-semibold px-2 py-1 bg-red-500/10 rounded-md">{row.mistakes}</span>
                                    ) : (
                                        <span className="text-emerald-400 font-semibold px-2 py-1 bg-emerald-500/10 rounded-md">0</span>
                                    )}
                                </td>
                                <td className="py-4 text-blue-400 font-semibold text-right group-hover:text-blue-300 transition-colors">
                                    Strat {row?.strategy ?? "-"}
                                </td>
                            </tr>
                        ))}
                        {safeHistory.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-16 text-center text-slate-500 font-medium tracking-wide">
                                    No history available yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
