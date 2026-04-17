import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BarChart3, TrendingUp, Eye } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 pl-64">
        <DashboardHeader title="Analytics" />
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Your Performance</h2>
            <p className="text-slate-500">Track how employers interact with your profile in real-time.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass p-6 rounded-3xl">
               <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10"><Eye className="w-6 h-6 text-blue-500" /></div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+24%</span>
               </div>
               <p className="text-slate-400 font-medium mb-1">Profile Views</p>
               <p className="text-3xl font-bold text-white">1,248</p>
            </div>
            <div className="glass p-6 rounded-3xl">
               <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10"><BarChart3 className="w-6 h-6 text-purple-500" /></div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+12%</span>
               </div>
               <p className="text-slate-400 font-medium mb-1">Search Appearances</p>
               <p className="text-3xl font-bold text-white">892</p>
            </div>
            <div className="glass p-6 rounded-3xl">
               <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-orange-500/10"><TrendingUp className="w-6 h-6 text-orange-500" /></div>
                  <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">Top 5%</span>
               </div>
               <p className="text-slate-400 font-medium mb-1">Market Rank</p>
               <p className="text-3xl font-bold text-white">#42</p>
            </div>
          </div>

          <div className="glass h-96 rounded-3xl flex items-center justify-center border border-white/5">
             <p className="text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
               <BarChart3 className="w-5 h-5" /> Chart Visualization Loading...
             </p>
          </div>
        </div>
      </main>
    </div>
  );
}
