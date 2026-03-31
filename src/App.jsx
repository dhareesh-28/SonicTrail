import React, { useState, useEffect } from 'react';
import { MetricCard } from './components/MetricCard';
import { ChartSection } from './components/ChartSection';
import { HistoryTable } from './components/HistoryTable';
import { StatusBanner } from './components/StatusBanner';
import { Activity, Clock, AlertTriangle, Zap } from 'lucide-react';

export default function App() {
  const [data, setData] = useState({
    activeTile: "-",
    currentStrategy: "-",
    timeTaken: 0,
    mistakesCount: 0,
    strategyBrightness: [
      { strategy: "Strat 0", brightness: 0 },
      { strategy: "Strat 1", brightness: 0 },
      { strategy: "Strat 2", brightness: 0 },
      { strategy: "Strat 3", brightness: 0 },
    ],
    bestStrategy: 0,
    isComplete: false,
    history: []
  });

  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/data");
        const json = await response.json();

        if (Array.isArray(json) && json.length > 0) {
          const latest = json[json.length - 1] || {};

          // Safe data extraction
          const tileStr = latest?.tile || "";
          const activeTile = tileStr.replace("tile", "") || "-";

          const brightnessArr = Array.isArray(latest?.brightness) && latest.brightness.length === 4
            ? latest.brightness
            : [0, 0, 0, 0];

          const bestStrategy = brightnessArr.indexOf(Math.max(...brightnessArr));

          const formattedData = {
            activeTile: activeTile !== "-" ? parseInt(activeTile, 10) : "-",
            currentStrategy: latest?.strategy ?? "-",
            timeTaken: latest?.time ?? 0,
            mistakesCount: latest?.mistakes ?? 0,

            strategyBrightness: brightnessArr.map((b, i) => ({
              strategy: `Strat ${i}`,
              brightness: Math.floor((b || 0) * 100)
            })),

            bestStrategy,
            isComplete: false,

            history: json.map((item, index) => ({
              attempt: index + 1,
              time: item?.time ?? 0,
              mistakes: item?.mistakes ?? 0,
              strategy: item?.strategy ?? 0
            }))
          };

          setData(formattedData);
          setIsLive(true);
        } else {
          setIsLive(false);
        }
      } catch (err) {
        console.error("Data Fetch Error:", err);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-10 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-8 relative">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 drop-shadow-sm flex items-center gap-3">
              <Zap className="text-blue-500" size={32} />
              BioDP Dashboard
            </h1>
            <p className="text-slate-400 mt-2 font-medium bg-slate-900/40 inline-block px-3 py-1 rounded-full border border-white/5">
              ESP32 Assistive System & Firefly Algorithm Monitoring
            </p>
          </div>

          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-md self-start md:self-auto shadow-lg transition-colors duration-500 ${isLive ? "bg-emerald-900/30 border-emerald-500/30" : "bg-yellow-900/30 border-yellow-500/30"
            }`}>
            <div className="relative flex h-3 w-3">
              {isLive ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                </>
              ) : (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></span>
                </>
              )}
            </div>
            <span className={`text-sm font-bold tracking-wide ${isLive ? "text-emerald-400" : "text-yellow-400"}`}>
              {isLive ? "LIVE DATA" : "NO DATA"}
            </span>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64 glass-panel text-slate-400 font-medium border border-white/5 bg-slate-900/40 rounded-3xl">
            <span className="flex items-center gap-3 animate-pulse">
              <Activity className="animate-spin" size={24} /> Waiting for system data...
            </span>
          </div>
        ) : (
          <>
            <StatusBanner isComplete={data?.isComplete} isLive={isLive} />

            {/* Top Section metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Active Tile"
                value={data.activeTile !== "-" ? `Tile ${data.activeTile}` : "-"}
                icon={Zap}
                active={isLive}
                gradient="from-blue-600/20 to-indigo-600/5"
              />
              <MetricCard
                title="Firefly Strategy"
                value={data.currentStrategy !== "-" ? `Strat ${data.currentStrategy}` : "-"}
                icon={Activity}
                gradient="from-indigo-600/20 to-purple-600/5"
              />
              <MetricCard
                title="Time Taken"
                value={`${data.timeTaken}s`}
                icon={Clock}
                gradient="from-purple-600/20 to-fuchsia-600/5"
              />
              <MetricCard
                title="Mistakes Count"
                value={data.mistakesCount}
                icon={AlertTriangle}
                gradient={data.mistakesCount > 0 ? "from-red-500/20 to-orange-500/5" : "from-emerald-500/20 to-teal-500/5"}
              />
            </div>

            {/* Bottom Section Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 relative drop-shadow-xl flex flex-col min-h-[400px]">
                <ChartSection
                  data={data.strategyBrightness}
                  bestStrategy={data.bestStrategy}
                />
              </div>
              <div className="lg:col-span-1 drop-shadow-xl flex flex-col min-h-[400px]">
                <HistoryTable history={data.history} />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}