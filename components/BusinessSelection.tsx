import React from 'react';
import { Gamepad2, Building2, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BusinessSelection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      
      {/* Background Image & Overlay - UPDATED to Dark Neon Style */}
      <div className="absolute inset-0 w-full h-[800px] z-0 pointer-events-none">
        {/* New darker, more vibrant cyberpunk/arcade abstract image */}
        <img 
          src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop" 
          alt="Neon Arcade Background" 
          className="w-full h-full object-cover opacity-50 blur-[1px]"
        />
        
        {/* Gradients to fade image into black background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background/80 to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header with Cursive Effect */}
        <div className="text-center mb-16 relative">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
            {t.business.title_prefix} <span className="font-serif italic text-neon-blue relative inline-block drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]">
              {t.business.title_suffix}
              <svg className="absolute -bottom-2 w-full h-3 text-neon-blue" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-zinc-300 mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
            {t.business.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT CARD: Single Machines (Active/Neon Blue Style) */}
          <div className="group relative bg-[#0a0a0a]/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-neon-blue/30 overflow-hidden flex flex-col justify-between min-h-[500px] hover:border-neon-blue transition-colors duration-500 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" 
                 alt="Arcade Gaming" 
                 className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-screen mask-image-b-fade"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-8 border border-white/10">
                <Gamepad2 className="text-neon-blue" size={24} />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.business.card_single_title}</h3>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                {t.business.card_single_desc}
              </p>

              <ul className="space-y-4 mb-8">
                {t.business.points_single.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <Sparkles size={16} className="text-neon-blue shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="relative z-10 w-full bg-neon-blue text-black font-bold py-4 rounded-lg hover:bg-white hover:text-neon-blue transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              {t.business.card_single_btn}
            </button>
          </div>

          {/* RIGHT CARD: FEC (Pink/Purple Style) */}
          <div className="relative bg-[#0d0d0d]/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-zinc-800 flex flex-col justify-between min-h-[500px] hover:border-neon-pink/50 transition-colors duration-300 shadow-2xl">
            
            <div>
              <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-8 border border-zinc-700">
                <Building2 className="text-white" size={24} />
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.business.card_fec_title}</h3>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                {t.business.card_fec_desc}
              </p>

              <ul className="space-y-4 mb-8">
                {t.business.points_fec.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <Sparkles size={16} className="text-neon-pink shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-transparent border border-neon-pink text-neon-pink font-bold py-4 rounded-lg hover:bg-neon-pink hover:text-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(255,0,255,0.1)] hover:shadow-[0_0_20px_rgba(255,0,255,0.4)]">
              {t.business.card_fec_btn}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusinessSelection;
