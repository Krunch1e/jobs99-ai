import React from 'react';
import { Logo } from './Logo';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './BrandIcons';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-20">
        <div className="max-w-xs">
          <Logo className="mb-6" />
          <p className="text-slate-400 leading-relaxed mb-6">
            Revolutionizing the job market with artificial intelligence and human-centric design.
          </p>
          <div className="flex gap-4">
            {[TwitterIcon, GithubIcon, LinkedinIcon, Mail].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4">
              {['Find Jobs', 'AI Tools', 'Resume Score', 'Pricing'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden sm:block">
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'API Docs', 'Community', 'Contact'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Jobs99.ai. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};
