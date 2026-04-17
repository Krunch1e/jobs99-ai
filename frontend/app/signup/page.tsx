"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from '@/components/shared/Logo';
import { Mail, Lock, ArrowRight, User, Briefcase } from 'lucide-react';
import { HeroScene } from '@/components/three/HeroScene';
import { GithubIcon, GoogleIcon } from '@/components/shared/BrandIcons';

export default function SignUpPage() {
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
          <h1 className="text-4xl font-bold text-white mb-3">Create Your Profile</h1>
          <p className="text-slate-500 mb-10 text-lg">Join the elite network of AI-powered professionals.</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Alex"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Carter"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                  />
                </div>
             </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="alex@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                 <button type="button" className="py-3 rounded-xl bg-blue-600/10 border border-blue-500/50 text-blue-500 font-bold text-xs">Job Seeker</button>
                 <button type="button" className="py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold text-xs hover:bg-white/10 transition-colors">Employer</button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group mt-4">
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-slate-950 px-4 text-slate-500 font-bold tracking-widest">Or sign up with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-3 rounded-2xl hover:bg-white/10 transition-colors font-bold text-sm">
              <GoogleIcon className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-3 rounded-2xl hover:bg-white/10 transition-colors font-bold text-sm">
              <GithubIcon className="w-5 h-5" /> Github
            </button>
          </div>

          <p className="mt-8 text-center text-slate-500 font-medium">
            Already have an account? <Link href="/signin" className="text-blue-500 font-bold hover:underline">Sign in</Link>
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
            <h2 className="text-4xl font-bold text-white mb-6">"Start your journey into the autonomous career era today."</h2>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                 <Briefcase className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-none">AI Career Guide</p>
                <p className="text-slate-400 text-sm mt-1">Available to help 24/7</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
