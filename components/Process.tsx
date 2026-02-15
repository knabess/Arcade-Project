import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Process: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
            {t.process.title}
          </h2>
          <p className="text-zinc-500 text-lg">
            {t.process.subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 hover:border-neon-pink/50 transition-colors duration-300 group">
             <div className="w-12 h-12 bg-neon-pink/10 border border-neon-pink/50 rounded-xl flex items-center justify-center mb-8 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                <span className="text-neon-pink font-bold text-lg">01</span>
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                {t.process.steps[0].s1_title}
             </h3>
             <p className="text-zinc-400 leading-relaxed text-sm mb-8 min-h-[60px]">
                {t.process.steps[0].s1_desc}
             </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 hover:border-neon-pink/50 transition-colors duration-300 group">
             <div className="w-12 h-12 bg-neon-pink/10 border border-neon-pink/50 rounded-xl flex items-center justify-center mb-8 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                <span className="text-neon-pink font-bold text-lg">02</span>
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                {t.process.steps[1].s2_title}
             </h3>
             <p className="text-zinc-400 leading-relaxed text-sm mb-8 min-h-[60px]">
                {t.process.steps[1].s2_desc}
             </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 hover:border-neon-pink/50 transition-colors duration-300 group">
             <div className="w-12 h-12 bg-neon-pink/10 border border-neon-pink/50 rounded-xl flex items-center justify-center mb-8 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
                <span className="text-neon-pink font-bold text-lg">03</span>
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                {t.process.steps[2].s3_title}
             </h3>
             <p className="text-zinc-400 leading-relaxed text-sm mb-8 min-h-[60px]">
                {t.process.steps[2].s3_desc}
             </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Process;
