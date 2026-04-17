import React from 'react';
import { Bot } from 'lucide-react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center justify-center p-2 bg-slate-950 rounded-lg border border-white/10">
          <Bot className="w-6 h-6 text-blue-500 group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>
      <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
        Jobs99<span className="text-blue-500">.ai</span>
      </span>
    </div>
  );
};
