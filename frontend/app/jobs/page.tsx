"use client";

import React, { useEffect, useState } from 'react';
import { PageWrapper } from "@/components/shared/PageWrapper";
import { motion } from 'framer-motion';
import { Search, MapPin, Briefcase, DollarSign, Filter, Sparkles, SlidersHorizontal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Job {
  id: number;
  roles: string;
  companies: string;
  locations: string;
  experience: string;
  salaries: string;
  skills: string;
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/jobs?search=${search}`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchJobs, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <PageWrapper>
      <div className="pt-32 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-white mb-4">Discover Your <span className="text-blue-500">Next Peak</span></h2>
              <p className="text-slate-400">Our AI agents are constantly scanning the global market to find roles that align with your neural signature.</p>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by role, company, or stack..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="space-y-8">
              <div className="glass p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h3>
                  <button className="text-xs text-blue-500 font-bold hover:underline">Reset</button>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Experience Level</p>
                    {['Entry', 'Mid', 'Senior', 'Lead', 'Executive'].map(l => (
                      <label key={l} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                          <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{l}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Work Style</p>
                    {['Remote', 'Hybrid', 'On-site'].map(l => (
                      <label key={l} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors" />
                        <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{l}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promo Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-6 rounded-3xl text-white">
                <Sparkles className="w-8 h-8 mb-4" />
                <h4 className="font-bold text-lg mb-2">Unlock Hidden Jobs</h4>
                <p className="text-blue-100 text-sm mb-4 leading-relaxed">Pro members get access to 40% more roles not listed on public boards.</p>
                <button className="w-full bg-white text-blue-600 py-2 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">Upgrade to Pro</button>
              </div>
            </div>

            {/* Jobs List */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between px-2 mb-4">
                <p className="text-sm text-slate-500 font-medium font-mono text-xs uppercase tracking-widest">
                  {loading ? 'Analyzing Nodes...' : `Showing ${jobs.length} results`}
                </p>
                <button className="text-sm text-slate-400 flex items-center gap-2 hover:text-white"><SlidersHorizontal className="w-4 h-4" /> Recommended First</button>
              </div>

              {loading ? (
                <div className="h-64 flex flex-col items-center justify-center glass rounded-[2rem]">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-slate-500 font-bold tracking-widest text-xs">SYNCHRONIZING WITH MARKET...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center glass rounded-[2rem]">
                   <p className="text-slate-500 font-bold mb-2">No matches found in this sector.</p>
                   <button onClick={() => setSearch("")} className="text-blue-500 text-xs font-bold hover:underline">Clear Search</button>
                </div>
              ) : (
                jobs.map((job, i) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative glass p-6 md:p-8 rounded-[2rem] hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-400 uppercase">
                            {job.companies?.[0] || 'J'}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">{job.roles}</h3>
                            <p className="text-slate-400 font-medium">{job.companies}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                          <span className="flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="w-4 h-4 text-blue-500/50" /> {job.locations}</span>
                          <span className="flex items-center gap-1.5 text-sm text-slate-500"><Briefcase className="w-4 h-4 text-blue-500/50" /> {job.experience}</span>
                          <span className="flex items-center gap-1.5 text-sm text-slate-500"><DollarSign className="w-4 h-4 text-blue-500/50" /> {job.salaries || 'Competitive'}</span>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                         <div className="text-right">
                            <div className="flex items-center gap-2 mb-1 justify-end">
                              <Sparkles className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-bold text-blue-500">95% Match</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{job.experience}</span>
                         </div>
                         <button className="bg-white text-slate-950 px-6 py-2 rounded-full text-sm font-bold hover:bg-slate-100 transition-colors">
                            Apply Now
                         </button>
                      </div>
                    </div>
                    
                    {/* Subtle hover background glow */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))
              )}

              <div className="pt-10 flex justify-center">
                <button className="px-8 py-3 rounded-full border border-white/10 text-slate-400 font-bold hover:text-white hover:border-white/20 transition-all font-mono text-xs tracking-widest">
                  LOAD MORE NODES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
