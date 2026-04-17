"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from '../three/HeroScene';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <HeroScene />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>The Future of Career Intelligence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8"
        >
          Navigate Your Career with <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-gradient">
            AI Precision
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stop searching, start matching. Jobs99.ai utilizes advanced neural networks to connect elite talent with high-impact opportunities in real-time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/jobs"
            className="group relative px-8 py-4 bg-blue-600 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2 text-white">
              Launch Career Search <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/ai-tools"
            className="px-8 py-4 rounded-full font-bold text-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm text-white"
          >
            Explore AI Tools
          </Link>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
        >
          {[
            { icon: Zap, text: "Instant Matching" },
            { icon: ShieldCheck, text: "Verified Employers" },
            { icon: Sparkles, text: "AI Resume Tailoring" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-slate-500 font-medium whitespace-nowrap">
              <item.icon className="w-5 h-5 text-blue-500" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
