"use client";
import { useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import { Activity, Users, Clock, Percent, AlertCircle, Play, RefreshCcw } from 'lucide-react';

export default function Home() {
  const [model, setModel] = useState("MM1");
  const [inputs, setInputs] = useState({ arrival: "", service: "" });
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch('http://localhost:5066/api/queue/mm1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            InterArrivalTime: parseFloat(inputs.arrival), 
            ServiceTime: parseFloat(inputs.service) 
        }),
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Calculation failed");
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      <Sidebar />
      
      <main className="ml-64 p-8 w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Queue Simulator
            </h2>
            <p className="text-slate-500 mt-2 text-lg">Modeling & Simulation Dashboard</p>
          </div>
          <div className="flex flex-col items-end">
            <label className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-widest">Model Configuration</label>
            <select 
              className="bg-white border-2 border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-medium cursor-pointer"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="MM1">M/M/1 Queue Model</option>
              <option value="GG1">G/G/1 Queue Model</option>
            </select>
          </div>
        </div>

        {/* Input Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 transition-all">
          <div className="flex items-center gap-2 mb-6 text-indigo-600">
            <Activity size={20} strokeWidth={3} />
            <h3 className="font-bold uppercase tracking-wider text-sm">Input Parameters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="group">
              <label className="block text-sm font-bold text-slate-600 group-focus-within:text-indigo-600 transition-colors">
                Mean Inter-Arrival Time (1/λ)
              </label>
              <div className="relative mt-3">
                <input 
                  type="number" 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-lg font-semibold"
                  placeholder="e.g. 2.0"
                  value={inputs.arrival}
                  onChange={(e) => setInputs({...inputs, arrival: e.target.value})}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">min</span>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-slate-600 group-focus-within:text-indigo-600 transition-colors">
                Mean Service Time (1/μ)
              </label>
              <div className="relative mt-3">
                <input 
                  type="number" 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-lg font-semibold"
                  placeholder="e.g. 1.5"
                  value={inputs.service}
                  onChange={(e) => setInputs({...inputs, service: e.target.value})}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">min</span>
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              disabled={isLoading}
              className="col-span-1 md:col-span-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? <RefreshCcw className="animate-spin" /> : <Play fill="currentColor" size={20} />}
              {isLoading ? "CALCULATING..." : "EXECUTE SIMULATION"}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 p-5 rounded-2xl text-red-700 mb-8 animate-in fade-in slide-in-from-top-4">
            <AlertCircle size={24} />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Results Visual Grid */}
        {results && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-2 text-slate-400">
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="text-xs font-black uppercase tracking-widest">Calculated Performance Metrics</span>
                <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ResultBox label="Arrival Rate (λ)" value={results.lambda} sub="cust/min" icon={<Users size={16}/>} />
              <ResultBox label="Service Rate (μ)" value={results.mu} sub="cust/min" icon={<Activity size={16}/>} />
              <ResultBox label="Utilization" value={`${(results.rho * 100).toFixed(1)}%`} sub="Traffic Intensity" icon={<Percent size={16}/>} highlight />
              <ResultBox label="Idle Prob." value={`${(results.p0 * 100).toFixed(1)}%`} sub="Server P0" icon={<Clock size={16}/>} />
              
              <ResultBox label="In Queue (Lq)" value={results.lq} sub="Average Customers" color="text-indigo-600" />
              <ResultBox label="Wait in Queue (Wq)" value={results.wq} sub="Average Minutes" color="text-indigo-600" />
              <ResultBox label="In System (L)" value={results.l} sub="Average Customers" color="text-emerald-600" />
              <ResultBox label="Wait in System (W)" value={results.w} sub="Average Minutes" color="text-emerald-600" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ResultBox({ label, value, sub, color = "text-slate-900", highlight = false, icon }: any) {
  return (
    <div className={`p-6 rounded-3xl border transition-all hover:shadow-lg ${highlight ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-100 shadow-sm'}`}>
      <div className="flex justify-between items-start mb-4">
        <p className={`text-[10px] font-black uppercase tracking-[0.15em] ${highlight ? 'text-indigo-100' : 'text-slate-400'}`}>
            {label}
        </p>
        {icon && <div className={highlight ? 'text-indigo-200' : 'text-slate-300'}>{icon}</div>}
      </div>
      <p className={`text-3xl font-black tracking-tight ${highlight ? 'text-white' : color}`}>
        {value}
      </p>
      <p className={`text-[11px] font-medium mt-1 ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>
        {sub}
      </p>
    </div>
  );
}