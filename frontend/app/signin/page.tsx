"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from '@/components/shared/Logo';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { HeroScene } from '@/components/three/HeroScene';
import { GithubIcon, GoogleIcon } from '@/components/shared/BrandIcons';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 relative z-10">
        <div className="mb-10">
          <Link href="/"><Logo /></Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <h1 className="text-4xl font-bold text-white mb-3">Welcome Back</h1>
          <p className="text-slate-500 mb-10 text-lg">Enter your credentials to access your AI career terminal.</p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-sm text-blue-500 font-bold hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group">
              Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-950 px-4 text-slate-500 font-bold tracking-widest">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-3 rounded-2xl hover:bg-white/10 transition-colors font-bold">
              <GoogleIcon className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-3 rounded-2xl hover:bg-white/10 transition-colors font-bold">
              <GithubIcon className="w-5 h-5" /> Github
            </button>
          </div>

          <p className="mt-10 text-center text-slate-500 font-medium">
            Don't have an account? <Link href="/signup" className="text-blue-500 font-bold hover:underline">Sign up for free</Link>
          </p>
        </motion.div>
      </div>

      {/* Right side: 3D Visual */}
      <div className="hidden lg:block w-1/2 bg-slate-900 overflow-hidden relative">
        <HeroScene />
        <div className="absolute inset-x-0 bottom-0 p-24 bg-gradient-to-t from-slate-950 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">"Landing my role at Vercel was only possible with Jobs99 AI matching."</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 bg-[url('https://i.pravatar.cc/100')] bg-cover" />
              <div>
                <p className="text-white font-bold text-lg leading-none">Sarah Jenkins</p>
                <p className="text-slate-400 text-sm mt-1">Lead Architect, Vercel</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
