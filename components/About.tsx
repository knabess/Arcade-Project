import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const { about } = t;

  return (
    <section id="about" className="py-24 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image Composition */}
          <div className="relative">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden relative z-0 border border-white/10 group">
              <img 
                src={about.mainImage} 
                alt="Arcade Hall" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Neon Overlay - Subtle gradient to integrate with dark theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/10 to-neon-pink/10 mix-blend-overlay pointer-events-none"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 right-4 md:-right-6 md:bottom-6 bg-[#0a0a0a]/90 border border-neon-blue/30 p-5 rounded-xl max-w-[280px] shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-neon-pink/10 flex items-center justify-center border border-neon-pink/30">
                    <span className="text-neon-pink font-bold">K&L</span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm font-tech">{about.badge}</h4>
                  <p className="text-neon-blue text-[10px] uppercase tracking-wider">{about.badge_sub}</p>
                </div>
              </div>
              <p className="text-zinc-400 text-xs italic leading-relaxed border-t border-zinc-800 pt-3 mt-1">
                {about.quote}
              </p>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div>
            <span className="text-neon-blue font-bold uppercase tracking-widest text-xs mb-4 block font-tech">{about.title_pre}</span>
            
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {about.title}
            </h2>
            
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              {about.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-2 border-neon-blue/30 pl-6">
                <h3 className="text-white font-bold text-base mb-2 font-tech">{about.feat1_title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {about.feat1_text}
                </p>
              </div>
              <div className="border-l-2 border-neon-pink/30 pl-6">
                <h3 className="text-white font-bold text-base mb-2 font-tech">{about.feat2_title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {about.feat2_text}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
