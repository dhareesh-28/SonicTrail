import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function ChartSection({ data, bestStrategy }) {
    // 100% crash proof checks
    const safeData = Array.isArray(data) ? data : [];

    return (
        <div className="glass-panel p-6 w-full h-full min-h-[400px] flex flex-col relative overflow-hidden group rounded-2xl">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2 z-10">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                Firefly Algorithm Brightness
            </h3>

            <div className="flex-1 w-full relative z-10">
                {safeData.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center text-slate-500 text-sm">
                        No chart data available
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={safeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="strategy"
                                stroke="#64748b"
                                tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                stroke="#64748b"
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    color: '#f8fafc',
                                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
                                    padding: '12px 16px'
                                }}
                                itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                            />
                            <Bar
                                dataKey="brightness"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                                animationEasing="ease-out"
                            >
                                {safeData.map((entry, index) => {
                                    const isBest = bestStrategy === index;
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={isBest ? '#3b82f6' : 'rgba(59,130,246,0.2)'}
                                            stroke={isBest ? '#60a5fa' : 'rgba(59, 130, 246, 0.3)'}
                                            strokeWidth={isBest ? 2 : 1}
                                            className={isBest ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'transition-colors hover:fill-blue-500/40'}
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}