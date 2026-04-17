"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileSearch, 
  Settings, 
  LogOut, 
  User,
  Zap,
  BarChart4
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '../shared/Logo';

const MENU_ITEMS = [
  { icon: LayoutDashboard, name: 'Overview', href: '/dashboard' },
  { icon: Briefcase, name: 'My Applications', href: '/dashboard/applications' },
  { icon: FileSearch, name: 'AI Resume Score', href: '/dashboard/resume' },
  { icon: Zap, name: 'AI Match Engine', href: '/dashboard/matching' },
  { icon: BarChart4, name: 'Analytics', href: '/dashboard/analytics' },
  { icon: User, name: 'Profile', href: '/dashboard/profile' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <Logo />
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
              pathname === item.href 
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn("w-5 h-5", pathname === item.href ? "text-blue-400" : "group-hover:text-white")} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-4 border border-white/5 mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Current Plan</p>
          <p className="text-sm font-bold text-white mb-3">AI Pro Member</p>
          <div className="w-full bg-white/5 rounded-full h-1.5 mb-2">
            <div className="bg-blue-500 h-full w-3/4 rounded-full" />
          </div>
          <p className="text-[10px] text-slate-400">75% of monthly AI credits used</p>
        </div>
        
        <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-white transition-colors text-sm font-medium">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
