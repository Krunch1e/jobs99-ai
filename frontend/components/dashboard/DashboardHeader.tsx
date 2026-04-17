"use client";

import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const DashboardHeader = ({ title }: { title: string }) => {
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
      <h1 className="text-xl font-bold text-white">{title}</h1>

      <div className="flex items-center gap-6">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search jobs, tools..." 
            className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 w-64 transition-all"
          />
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none mb-1">Alex Carter</p>
            <p className="text-[10px] text-slate-500 font-medium">Product Designer</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-slate-950 shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
