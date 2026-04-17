import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { User, Mail, Shield, Settings2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 pl-64">
        <DashboardHeader title="Profile Settings" />
        <div className="p-8 max-w-4xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Account Management</h2>
            <p className="text-slate-500">Update your details and adjust AI preferences.</p>
          </div>
          
          <div className="glass p-8 rounded-3xl space-y-8">
             <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-900 shadow-xl overflow-hidden relative group cursor-pointer">
                  <User className="w-10 h-10 text-slate-500" />
                  <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                     <span className="text-xs font-bold text-white uppercase">Edit</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Alex Carter</h3>
                  <p className="text-slate-400">Senior Frontend Engineer</p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                     <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                       <input type="text" defaultValue="Alex Carter" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                     <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                       <input type="email" defaultValue="alex@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm" />
                     </div>
                   </div>
                </div>

                <div className="space-y-2 pt-4">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Customization</label>
                   <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-500/10 rounded-lg"><Settings2 className="w-5 h-5 text-blue-500" /></div>
                         <div>
                           <p className="text-white font-bold text-sm">Automated Job Application</p>
                           <p className="text-slate-500 text-xs">Allow AI agents to submit applications on your behalf</p>
                         </div>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                         <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                      </div>
                   </div>
                </div>

                <div className="pt-6 flex justify-end">
                   <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                     Save Changes
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
