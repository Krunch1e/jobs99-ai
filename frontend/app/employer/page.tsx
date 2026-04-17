"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { cn } from '@/lib/utils';
import { 
  Users, 
  UserPlus, 
  BarChart3, 
  Search, 
  Sparkles, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Loader2
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EmployerDashboard() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/candidates`)
      .then(res => res.json())
      .then(data => {
        setCandidates(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 pl-64">
        <DashboardHeader title="Hiring Terminal" />

        <div className="p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Company Overview</h2>
              <p className="text-slate-500">Your AI talent agent has processed 142 new applicants today.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
              <UserPlus className="w-5 h-5" /> Post New Role
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { label: 'Active Roles', value: '12', icon: BrainCircuit, color: 'text-blue-500' },
              { label: 'Total Applicants', value: '1,420', icon: Users, color: 'text-purple-500' },
              { label: 'Avg AI Fit Score', value: '84%', icon: TrendingUp, color: 'text-cyan-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2.5rem]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Candidate Pipeline */}
             <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Top Talent Pipeline</h3>
                  <div className="flex gap-2">
                    <button className="bg-white/5 p-2 rounded-lg text-slate-400 hover:text-white transition-colors"><Search className="w-4 h-4" /></button>
                    <button className="bg-white/5 p-2 rounded-lg text-slate-400 hover:text-white transition-colors"><BarChart3 className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="glass overflow-hidden rounded-[2.5rem]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <th className="px-8 py-6">Candidate</th>
                        <th className="px-8 py-6">Role</th>
                        <th className="px-8 py-6">AI Score</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="py-20 text-center">
                            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
                            <p className="text-slate-500 font-bold tracking-widest text-[10px] uppercase">Retrieving Talent Nodes...</p>
                          </td>
                        </tr>
                      ) : candidates.map((c, i) => (
                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center font-bold text-xs text-blue-400">{c.name[0]}</div>
                              <span className="text-sm font-bold text-white">{c.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-400">{c.role}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-3 h-3 text-blue-500" />
                              <span className="text-sm font-bold text-white">{c.score}%</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                              c.status === 'Interviewing' ? "bg-blue-500/10 text-blue-500" :
                              c.status === 'Offer sent' ? "bg-green-500/10 text-green-500" :
                              "bg-white/5 text-slate-400"
                            )}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <button className="text-slate-500 group-hover:text-blue-500 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>

             {/* Smart Insights */}
             <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Hiring Intelligence</h3>
                <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-purple-600/5 to-blue-600/5">
                   <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg mb-6">
                      <Sparkles className="w-6 h-6 text-white" />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-4">Market Insight</h4>
                   <p className="text-slate-400 text-sm leading-relaxed mb-8">
                     Demand for <span className="text-white font-bold">Rust Developers</span> in your region is up 40%. Hiring now could save 15% in acquisition costs versus next quarter.
                   </p>
                   <button className="w-full flex items-center justify-between group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all font-bold text-sm text-white">
                      View Market Report <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>

                <div className="glass p-8 rounded-[2.5rem]">
                   <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest text-slate-500">Subscription Status</h4>
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-white">Enterprise Elite</span>
                      <span className="text-xs font-bold text-blue-500">Renews in 12 days</span>
                   </div>
                   <div className="w-full bg-white/5 rounded-full h-2 mb-6">
                      <div className="bg-blue-600 h-full w-full rounded-full" />
                   </div>
                   <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors underline">Manage Billing</button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
