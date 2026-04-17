import { PageWrapper } from "@/components/shared/PageWrapper";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <Features />
      
      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Active Jobs', value: '50k+' },
            { label: 'AI Matches', value: '1.2M' },
            { label: 'Hiring Companies', value: '4k+' },
            { label: 'Success Rate', value: '89%' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-500 font-medium text-sm tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white"> Ready to escape the job hunt?</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
            Join thousands of professionals who have already found their dream roles using our AI platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-950 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-colors">
              Get Started for Free
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2" />
      </section>
    </PageWrapper>
  );
}
