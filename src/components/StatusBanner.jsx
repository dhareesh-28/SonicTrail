import React from 'react';
import { Activity, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export function StatusBanner({ isComplete, isLive }) {
    if (!isLive) {
        return (
            <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between transition-all duration-700 relative overflow-hidden border-yellow-500/40 bg-yellow-950/20 shadow-[0_0_30px_rgba(234,179,8,0.15)] rounded-2xl">
                <div className="absolute -inset-[100%] opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.4),transparent_50%)] animate-[spin_12s_linear_infinite]" />

                <div className="flex items-center gap-4 relative z-10">
                    <AlertCircle size={32} className="text-yellow-500/90" />
                    <div>
                        <h2 className="font-bold text-xl tracking-wide text-yellow-400 drop-shadow-md">
                            System Idle
                        </h2>
                        <p className="text-sm text-yellow-500/80 mt-1 font-medium tracking-wide">
                            Waiting for active data stream from ESP32 on port 5000...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between transition-all duration-700 relative overflow-hidden group rounded-2xl",
            isComplete
                ? "border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                : "border-blue-500/40 bg-blue-950/20 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
        )}>
            {/* Background moving glow */}
            <div className={cn(
                "absolute -inset-[100%] opacity-25 transition-colors duration-1000",
                isComplete ? "bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.5),transparent_50%)]" : "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.5),transparent_50%)]",
                "animate-[spin_10s_linear_infinite]"
            )} />

            <div className="flex items-center gap-4 relative z-10 mb-4 md:mb-0">
                <div className="relative flex h-4 w-4">
                    {!isComplete && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>}
                    <span className={cn("relative inline-flex rounded-full h-4 w-4 shadow-lg", isComplete ? "bg-emerald-500 shadow-emerald-500/50" : "bg-blue-500 shadow-blue-500/50")}></span>
                </div>
                <div>
                    <h2 className="font-bold text-xl tracking-wide text-slate-100 drop-shadow-md">
                        {isComplete ? "Game Completed 🎉" : "System Active"}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1 font-medium tracking-wide">
                        {isComplete ? "Firefly Algorithm has converged onto the optimal solution." : "Optimizing brightness parameters via Firefly Algorithm."}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400 relative z-10 bg-slate-900/80 px-5 py-2.5 rounded-full border border-white/5 shadow-inner backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {isComplete ? "Status: Complete" : "Status: Running"}
                </span>
                {isComplete ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                    <Activity size={18} className="text-blue-500 animate-[pulse_2s_ease-in-out_infinite]" />
                )}
            </div>
        </div>
    );
}
