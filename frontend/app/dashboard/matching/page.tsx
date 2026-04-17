import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Sparkles, Briefcase } from 'lucide-react';

export default function MatchingPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 pl-64">
        <DashboardHeader title="AI Matches" />
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Curated Job Matches</h2>
            <p className="text-slate-500">Jobs ranked precisely for your skills using AI.</p>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
            {/* Dummy Card 1 */}
            <div className="glass p-6 rounded-3xl group hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex items-center gap-1 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-bold text-blue-500">98% Match</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">Senior React Developer</h3>
              <p className="text-slate-400 font-medium mb-4">Vercel • Full-time</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300">Next.js</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300">TypeScript</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300">React</span>
              </div>
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white font-bold transition-all">
                Quick Apply
              </button>
            </div>
            
            {/* Dummy Card 2 */}
            <div className="glass p-6 rounded-3xl group hover:border-purple-500/30 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Briefcase className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex items-center gap-1 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-bold text-purple-500">95% Match</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Lead AI Engineer</h3>
              <p className="text-slate-400 font-medium mb-4">OpenAI • Remote</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300">Python</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300">PyTorch</span>
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300">LLMs</span>
              </div>
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-white font-bold transition-all">
                Quick Apply
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
