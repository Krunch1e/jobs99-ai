"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronRight,
  Loader2,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/user/applications`)
      .then(res => res.json())
      .then(data => {
        setApps(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 pl-64">
        <DashboardHeader title="My Applications" />

        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Application Tracking</h2>
              <p className="text-slate-500 font-medium">Monitoring {apps.length} active career transitions.</p>
            </div>
            <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
              <Filter className="w-4 h-4" /> Filter Status
            </button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center glass rounded-[2.5rem]">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Connecting to Application Node...</p>
              </div>
            ) : apps.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center glass rounded-[2.5rem]">
                 <p className="text-slate-500 font-bold">No active applications found.</p>
              </div>
            ) : apps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative glass p-6 md:p-8 rounded-[2rem] hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center font-bold text-sm text-blue-500 uppercase">
                        {app.company[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">{app.title}</h3>
                        <p className="text-slate-400 font-medium italic">{app.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                      <span className="flex items-center gap-1.5 text-sm text-slate-500"><Clock className="w-4 h-4 text-slate-600" /> Applied on {new Date(app.applied_date).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-blue-500/80"><Sparkles className="w-4 h-4" /> AI Match: {app.match}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                       <span className={cn(
                         "text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full",
                         app.status === 'Interviewing' ? "bg-blue-500/10 text-blue-500" :
                         app.status === 'Technical Task' ? "bg-purple-500/10 text-purple-500" :
                         "bg-white/5 text-slate-500"
                       )}>
                         {app.status}
                       </span>
                    </div>
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-500 group-hover:text-white group-hover:border-white/20 transition-all">
                       <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Status Indicator Glow */}
                <div className={cn(
                   "absolute bottom-0 left-0 w-full h-[1px] opacity-20",
                   app.status === 'Interviewing' ? "bg-blue-500" :
                   app.status === 'Technical Task' ? "bg-purple-500" :
                   "bg-slate-500"
                )} />
              </motion.div>
            ))}
          </div>

          {/* Quick Insights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="glass p-8 rounded-[2rem] border-blue-500/10">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Application Health</h4>
                <div className="flex items-end gap-2">
                   <p className="text-4xl font-bold text-white">84%</p>
                   <p className="text-green-500 text-sm font-bold mb-1">+5% vs last week</p>
                </div>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed">Your application-to-interview ratio is higher than <span className="text-white">92% of colleagues</span> in your sector.</p>
             </div>
             <div className="glass p-8 rounded-[2rem] border-blue-500/10">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">AI Recommendation</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                   Nodes suggest focusing on <span className="text-blue-400 font-bold">Vercel</span> protocol. Your neural signature matches their Frontend Architect requirements precisely.
                </p>
                <button className="mt-6 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest">Connect with hiring node →</button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
