"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { 
  BarChart3, 
  Users, 
  ShieldAlert, 
  DollarSign, 
  Activity,
  Globe2,
  Lock,
  MessageSquareWarning,
  Server
} from 'lucide-react';

const SYSTEM_METRICS = [
  { label: 'Platform Revenue', value: '$84,200', trend: '+15.2%', icon: DollarSign, color: 'text-green-500' },
  { label: 'Total Users', value: '12,504', trend: '+842', icon: Users, color: 'text-blue-500' },
  { label: 'Active Sessions', value: '1,204', trend: 'Peak', icon: Activity, color: 'text-cyan-500' },
  { label: 'Server Load', value: '24%', trend: 'Healthy', icon: Server, color: 'text-indigo-500' },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 pl-64">
        <DashboardHeader title="Nexus Control Center" />

        <div className="p-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">System Overview</h2>
            <p className="text-slate-500">Platform stability is at 99.98% over the last 24 hours.</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SYSTEM_METRICS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-[2rem] border-white/5"
              >
                <div className="flex items-center justify-between mb-4">
                   <div className="p-3 rounded-2xl bg-white/5">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                   </div>
                   <span className="text-[10px] font-bold text-white bg-white/5 px-2 py-1 rounded-full uppercase tracking-widest">{stat.trend}</span>
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Security & Moderation */}
             <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white">Security & Moderation</h3>
                <div className="glass rounded-[2.5rem] p-8">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                            <ShieldAlert className="w-6 h-6 text-red-500" />
                         </div>
                         <div>
                            <p className="text-white font-bold">Threat Detection Active</p>
                            <p className="text-slate-500 text-sm">3 candidates flagged for profile manipulation</p>
                         </div>
                      </div>
                      <button className="text-sm font-bold text-blue-500 hover:underline">Review All</button>
                   </div>
                   
                   <div className="space-y-4">
                      {[
                        { user: 'bot_prime_01', type: 'Spam Pattern', severity: 'Critical', time: '12m ago' },
                        { user: 'unverified_company', type: 'Fake Listing', severity: 'High', time: '1h ago' },
                        { user: 'user_9c82', type: 'IP Mismatch', severity: 'Low', time: '3h ago' },
                      ].map((flag, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                           <div className="flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <div>
                                 <p className="text-sm font-bold text-white">{flag.user}</p>
                                 <p className="text-[10px] text-slate-500 uppercase tracking-widest">{flag.type}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-bold text-white mb-1">{flag.severity}</p>
                              <p className="text-[10px] text-slate-500">{flag.time}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Platform Insights */}
             <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Global Nodes</h3>
                <div className="glass p-8 rounded-[2.5rem] relative overflow-hidden h-[300px]">
                   <div className="relative z-10">
                      <Globe2 className="w-12 h-12 text-blue-500 mb-6" />
                      <h4 className="text-white font-bold text-lg mb-2">Traffic Analysis</h4>
                      <p className="text-slate-500 text-sm mb-6">Real-time connection mapping from 124 countries.</p>
                      
                      <div className="space-y-3">
                         {['USA', 'India', 'Germany', 'UK'].map((c, i) => (
                           <div key={c} className="flex items-center justify-between">
                              <span className="text-sm text-slate-400 font-medium">{c}</span>
                              <div className="flex-1 mx-4 bg-white/5 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-blue-500 h-full" style={{ width: `${80 - i * 15}%` }} />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   {/* Background Glow */}
                   <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="glass p-8 rounded-[2.5rem]">
                   <div className="flex items-center gap-4 mb-6">
                      <Lock className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-white font-bold text-sm">Role Management</h4>
                   </div>
                   <p className="text-slate-500 text-xs leading-relaxed mb-6">Define permissions for regional moderators and system technicians.</p>
                   <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all uppercase tracking-widest">Configure IAM</button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
