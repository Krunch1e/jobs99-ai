"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from './FeatureCard';
import { Brain, FileText, Target, BarChart3, Globe2, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: "Neural Job Matching",
    description: "Our proprietary AI doesn't just look for keywords. It understands context, seniority, and cultural fit to find your perfect role."
  },
  {
    icon: FileText,
    title: "Resume Intelligence",
    description: "Scan your resume against thousands of data points to get actionable insights and industry-level optimization scores."
  },
  {
    icon: Target,
    title: "Smart Personalization",
    description: "Tailor your application for every job automatically while maintaining your unique voice and professional integrity."
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track your application lifecycle with granular detail. Know exactly when your resume is viewed and ranked."
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "Access a curated network of elite companies worldwide, from high-growth startups to Fortune 500 tech leaders."
  },
  {
    icon: ShieldCheck,
    title: "Verified Ecosystem",
    description: "Every employer and job posting is verified by our AI safety layer to ensure a secure and legitimate search experience."
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Empowering the Next-Gen Workforce
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            We've combined deep learning with career expertise to build a platform that actually works for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={i}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};
