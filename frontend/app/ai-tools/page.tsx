"use client";

import React, { useState } from 'react';
import { PageWrapper } from "@/components/shared/PageWrapper";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  FileCheck, 
  Zap,
  RefreshCw,
  Search,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AIToolsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setProgress(10);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const resp = await fetch(`${API_URL}/parse-resume/`, {
        method: 'POST',
        body: formData,
      });
      
      if (!resp.ok) throw new Error("Backend parse failed. Is Ollama running?");
      
      setProgress(60);
      const data = await resp.json();
      setResult(data);
      setProgress(100);
      
      setTimeout(() => setIsProcessing(false), 800);
    } catch (err: any) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <PageWrapper>
      <div className="relative pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>AI Command Center</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Engineered for <br/> <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Career Victory</span></h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Our suite of advanced AI modules analyzes, optimizes, and matches you with career-defining roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Tool Selection */}
            <div className="space-y-4">
              {[
                { label: 'Resume Analyzer', icon: FileSearch, desc: 'Deep-scan for gaps and optimization points.' },
                { label: 'JD Tailoring', icon: Zap, desc: 'Automatically adapt experience for specific roles.' },
                { label: 'Cover Letter Gen', icon: FileText, desc: 'Generate high-conversion cover letters.' },
                { label: 'AI Match Engine', icon: Sparkles, desc: 'Find hidden roles based on your neural profile.' },
              ].map((tool, i) => (
                <div key={i} className="group glass p-6 rounded-3xl cursor-pointer hover:border-blue-500/40 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                      <tool.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{tool.label}</h3>
                      <p className="text-xs text-slate-500">{tool.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-blue-500 transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>

            {/* Upload & Results Area */}
            <div className="relative">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              {!isProcessing && !result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] border-2 border-dashed border-white/10 rounded-[3rem] bg-slate-900/40 flex flex-col items-center justify-center p-12 text-center group hover:border-blue-500/30 transition-all"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Deploy Your Resume</h3>
                  <p className="text-slate-500 text-sm mb-8">PDF, DOCX supported. Max file size 5MB.</p>
                  
                  <input 
                    type="file" 
                    id="resume-upload" 
                    className="hidden" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <label 
                    htmlFor="resume-upload"
                    className="cursor-pointer bg-white text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors mb-4"
                  >
                    {file ? file.name : 'Select File'}
                  </label>
                  
                  {file && (
                    <button 
                      onClick={handleUpload}
                      className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      Start AI Analysis <Sparkles className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ) : isProcessing ? (
                <div className="h-full min-h-[400px] glass rounded-[3rem] p-12 flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-24 h-24 rounded-full border-4 border-blue-500/10 border-t-blue-500 mb-8"
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">Processing Neural Data...</h3>
                  <p className="text-slate-500 text-sm mb-8">Analyzing semantic structures and key performance indicators.</p>
                  
                  <div className="w-full max-w-xs bg-white/5 rounded-full h-2 mb-4">
                    <motion.div 
                      className="bg-blue-600 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold text-blue-500 tracking-widest">{progress}% ANALYZED</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] glass rounded-[3rem] p-8"
                >
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <FileCheck className="w-5 h-5 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Analysis Complete</h3>
                      </div>
                      <button onClick={() => {setResult(null); setFile(null);}} className="text-xs text-slate-500 hover:text-white transition-colors">Reset</button>
                   </div>

                   <div className="space-y-6">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Extracted Text Preview</p>
                        <p className="text-sm text-slate-300 line-clamp-4 leading-relaxed italic">
                          "{result.parsed_text?.substring(0, 500)}..."
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <button className="bg-blue-600 text-white py-3 rounded-xl font-bold text-xs hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" /> AI Match
                         </button>
                         <button className="bg-white/5 border border-white/10 text-white py-3 rounded-xl font-bold text-xs hover:bg-white/10 transition-colors">
                            Optimize
                         </button>
                      </div>
                   </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
    </PageWrapper>
  );
}

// Dummy Icon since FileSearch isn't in default lucide in this list
const FileSearch = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="15.5" r="2.5"/><path d="M16 20l-2-2"/>
  </svg>
);
