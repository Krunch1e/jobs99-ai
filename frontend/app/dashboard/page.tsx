"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
  TrendingUp,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const STATS = [
  { label: 'Profile Views', value: '842', trend: '+12%', icon: Users, color: 'text-blue-500' },
  { label: 'AI Match Score', value: '94%', trend: 'Top 5%', icon: Sparkles, color: 'text-purple-500' },
  { label: 'Applications', value: '24', trend: '4 Active', icon: TrendingUp, color: 'text-cyan-500' },
  { label: 'Interviews', value: '3', trend: 'Next: Fri', icon: Clock, color: 'text-indigo-500' },
];

const RECENT_JOBS = [
  { title: 'Senior Product Designer', company: 'Linear', location: 'Remote', salary: '$160k - $220k', match: '98%', status: 'Applied' },
  { title: 'Lead AI Engineer', company: 'OpenAI', location: 'San Francisco', salary: '$200k - $300k', match: '95%', status: 'Interviewing' },
  { title: 'Full Stack Developer', company: 'Vercel', location: 'Remote', salary: '$150k - $190k', match: '92%', status: 'Recommended' },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 pl-64">
        <DashboardHeader title="Career Overview" />

        <div className="p-8">
          {/* Welcome Section */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Alex! 👋</h2>
            <p className="text-slate-500">Your AI career agent found 3 new matches since yesterday.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white/5`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Job Matches */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Top AI Matches</h3>
                <button className="text-sm text-blue-500 font-bold hover:underline">View All</button>
              </div>

              {RECENT_JOBS.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="group glass p-6 rounded-3xl hover:border-blue-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-400">
                        {job.company[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{job.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.company}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-bold text-blue-500">{job.match} Match</span>
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                        job.status === 'Applied' ? "bg-green-500/10 text-green-500" :
                          job.status === 'Interviewing' ? "bg-purple-500/10 text-purple-500" :
                            "bg-white/5 text-slate-400"
                      )}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Insights Panel */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">AI Career Insights</h3>
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg mb-6">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">Optimization Alert</h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    Your resume matches <span className="text-white font-bold">98%</span> of requirements for the "Lead AI Designer" role, but adding <span className="text-white font-bold">"R3F"</span> could boost your ranking in the top 1%.
                  </p>
                  <button className="w-full bg-white text-slate-950 py-3 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-colors">
                    Optimize Now
                  </button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Activity Timeline */}
              <div className="glass p-6 rounded-3xl">
                <h4 className="text-sm font-bold text-white mb-6">Recent Activity</h4>
                <div className="space-y-6">
                  {[
                    { icon: CheckCircle2, text: 'Resume optimized successfully', time: '2h ago', color: 'text-green-500' },
                    { icon: Briefcase, text: 'Applied to Linear', time: '5h ago', color: 'text-blue-500' },
                    { icon: AlertCircle, text: 'New match from OpenAI', time: '1d ago', color: 'text-purple-500' },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <activity.icon className={`w-5 h-5 ${activity.color} shrink-0`} />
                      <div>
                        <p className="text-sm text-slate-300 font-medium">{activity.text}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
