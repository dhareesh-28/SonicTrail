import React from 'react';
import { cn } from '../lib/utils';

export function MetricCard({ title, value, icon: Icon, active = false, gradient = 'from-blue-500/20 to-cyan-500/5' }) {
    return (
        <div
            className={cn(
                "glass-card p-6 relative overflow-hidden group flex flex-col justify-between h-40 rounded-2xl",
                active ? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)]" : "border-white/5 opacity-80"
            )}
        >
            {/* Background Gradient */}
            <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-500", active ? "opacity-50 group-hover:opacity-70" : "opacity-10", gradient)} />

            {/* Top row */}
            <div className="flex justify-between items-start relative z-10">
                <h3 className="text-slate-400 font-semibold text-sm tracking-widest uppercase">{title ?? "Metric"}</h3>
                {Icon && (
                    <div className={cn("p-2.5 rounded-xl bg-slate-800/80 border transition-colors duration-500", active ? "border-blue-500/30 shadow-inner shadow-blue-500/20 text-blue-400" : "border-white/5 text-slate-500")}>
                        <Icon size={22} className={active && title === "Active Tile" ? "animate-[pulse_2s_ease-in-out_infinite]" : ""} />
                    </div>
                )}
            </div>

            {/* Bottom value */}
            <div className="relative z-10 mt-auto">
                <span className={cn("text-4xl font-extrabold tracking-tight transition-colors duration-500", active ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-slate-400")}>
                    {value ?? "-"}
                </span>
            </div>
        </div>
    );
}
