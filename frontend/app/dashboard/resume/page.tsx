import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { FileText, UploadCloud, CheckCircle2 } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 pl-64">
        <DashboardHeader title="Resume Builder" />
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Resume Intelligence</h2>
            <p className="text-slate-500">Upload and tailor your resumes specifically to Job Descriptions.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass p-10 border-dashed border-2 border-slate-700 hover:border-blue-500 transition-colors rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer group">
               <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <UploadCloud className="w-10 h-10 text-blue-500" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Upload New Resume</h3>
               <p className="text-slate-400 max-w-sm">Drag and drop your PDF or DOCX file here to let our AI extract and organize your experiences.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Your Resumes</h3>
              <div className="glass p-6 rounded-2xl flex items-center justify-between border-green-500/30">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl"><FileText className="w-6 h-6 text-white" /></div>
                    <div>
                      <p className="text-white font-bold">Frontend_Engineer_Final.pdf</p>
                      <p className="text-slate-500 text-sm">Updated 2 days ago</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" /> AI Optimized
                 </div>
              </div>
              <div className="glass p-6 rounded-2xl flex items-center justify-between opacity-70">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl"><FileText className="w-6 h-6 text-white" /></div>
                    <div>
                      <p className="text-white font-bold">Generic_Resume_2025.pdf</p>
                      <p className="text-slate-500 text-sm">Updated 1 month ago</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
