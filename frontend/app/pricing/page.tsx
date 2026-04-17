"use client";

import React from 'react';
import { PageWrapper } from "@/components/shared/PageWrapper";
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    name: "Starter",
    price: "0",
    desc: "Perfect for exploring the platform.",
    features: ["10 AI Job Matches / month", "Basic Resume Analysis", "Standard Job Search", "Community Support"],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: "29",
    desc: "For serious job seekers aiming high.",
    features: ["Unlimited AI Job Matches", "Advanced Resume Tailoring", "Priority Application Status", "Cover Letter Generator", "Interview Intelligence"],
    cta: "Join Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored for elite executive searches.",
    features: ["Dedicated Career Agent", "Executive Branding", "Direct Access to Recruiters", "Fraud Protection", "24/7 Concierge Support"],
    cta: "Contact Us",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <PageWrapper>
      <div className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Invest in Your <br/> <span className="text-blue-500">Future Alpha</span></h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Choose the plan that fits your career velocity. Unlock AI potential and land your dream role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PLANS.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative p-8 rounded-[3rem] flex flex-col",
                  plan.popular 
                    ? "bg-slate-900 border-2 border-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.1)]" 
                    : "bg-slate-950 border border-white/5"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-slate-500 text-sm font-medium ml-2">/ month</span>}
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-400">
                      <Check className="w-5 h-5 text-blue-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className={cn(
                  "w-full py-4 rounded-2xl font-bold text-sm transition-all",
                  plan.popular 
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20" 
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                )}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-24 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-2 text-white font-bold text-xl"><ShieldCheck className="text-blue-500" /> SECURE</div>
             <div className="text-white font-bold text-xl tracking-tighter italic uppercase">stripe</div>
             <div className="text-white font-bold text-xl tracking-tighter">AICERTIFIED</div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
      </div>
    </PageWrapper>
  );
}
