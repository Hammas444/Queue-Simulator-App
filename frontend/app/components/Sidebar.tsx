"use client";
import { Layers, Database, Cpu, Activity, BarChart3, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f172a] text-slate-300 h-screen fixed left-0 top-0 border-r border-slate-800/50 shadow-2xl flex flex-col">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
          <Cpu className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-black text-white tracking-tight">
          Simulate<span className="text-indigo-500">X</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-8">
        <div>
          <p className="text-[10px] uppercase text-slate-500 font-black tracking-[0.2em] px-4 mb-4">
            Queueing Models
          </p>
          <ul className="space-y-1">
            <SidebarLink 
              icon={<Layers size={18} />} 
              label="M/M/1 Model" 
              active 
            />
            <SidebarLink 
              icon={<Database size={18} />} 
              label="M/M/c Model" 
              disabled 
            />
            <SidebarLink 
              icon={<Activity size={18} />} 
              label="G/G/1 Model" 
              disabled 
            />
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase text-slate-500 font-black tracking-[0.2em] px-4 mb-4">
            Analytics
          </p>
          <ul className="space-y-1">
            <SidebarLink 
              icon={<BarChart3 size={18} />} 
              label="Live Charts" 
              disabled 
            />
          </ul>
        </div>
      </nav>

      {/* Footer info */}
      <div className="p-6 border-t border-slate-800/50 bg-[#1e293b]/30">
        <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-2xl">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            U
          </div>
          <div>
            <p className="text-xs font-bold text-white">Uni Project</p>
            <p className="text-[10px] text-slate-500">v1.0.4 - Stable</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ icon, label, active = false, disabled = false }: any) {
  return (
    <li className={`
      group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
      ${active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'hover:bg-slate-800/50 text-slate-400'}
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
    `}>
      <div className="flex items-center gap-3">
        <span className={active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}>
          {icon}
        </span>
        <span className="text-sm font-semibold tracking-wide">{label}</span>
      </div>
      {!disabled && <ChevronRight size={14} className={active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'} />}
      {disabled && <span className="text-[9px] font-black bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 tracking-tighter">SOON</span>}
    </li>
  );
}