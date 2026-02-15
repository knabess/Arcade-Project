import React from 'react';
import { Gamepad, Bot, Target, Gamepad2, Car, Trophy } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onScrollDown: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  const { content } = useContent();
  const { hero } = content;
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex flex-col pt-40 relative overflow-hidden bg-background">
      
      {/* Background Image - Galaxy / Neon Clouds Style */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.bgImage} 
          alt="Neon Galaxy Background" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Overlays for readability and color grading */}
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-neon-blue/10 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 flex-grow flex flex-col justify-center relative z-10">
        
        {/* Content Box */}
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Main Title - Focus on Profit & Effort */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white mb-8 relative drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] leading-[0.9]">
            <span className="font-tech font-black block text-white text-glow">{hero.titleLine1}</span>
            <span className="font-tech font-black block text-neon-blue mt-2 text-glow-blue">{hero.titleLine2}</span>
          </h1>
          
          {/* Subtitle - Tech Font */}
          <p className="text-white font-sans text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto bg-black/60 backdrop-blur-md p-6 border-l-4 border-neon-blue rounded-r-xl shadow-[0_0_30px_rgba(0,243,255,0.1)]">
             {hero.subtitle}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <button 
              onClick={onScrollDown}
              className="group relative bg-transparent border-2 border-neon-blue text-neon-blue px-10 py-4 font-tech font-bold uppercase tracking-wider text-lg overflow-hidden hover:text-black transition-colors duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-neon-blue transform -translate-x-full skew-x-12 group-hover:translate-x-0 transition-transform duration-300 -z-10"></span>
              {t.hero.cta_consult}
            </button>
            
            <button 
              onClick={() => {
                const el = document.getElementById('machines');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-transparent border-2 border-neon-pink text-neon-pink px-10 py-4 font-tech font-bold uppercase tracking-wider text-lg hover:bg-neon-pink hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)]"
            >
              {t.hero.cta_machines}
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Ticker Strip (Machine Types) */}
      <div className="border-t-2 border-b-2 border-neon-pink bg-black py-4 mt-20 relative z-20 overflow-hidden transform -rotate-1 scale-105 origin-left">
        <div className="flex justify-around items-center text-zinc-500 font-tech uppercase text-xs tracking-[0.3em] w-full">
            <div className="flex items-center gap-2 text-white"><Car size={14} className="text-neon-blue"/> Rennsimulatoren</div>
            <div className="flex items-center gap-2 text-white"><Target size={14} className="text-neon-pink"/> Boxautomaten</div>
            <div className="flex items-center gap-2 text-white"><Gamepad2 size={14} className="text-neon-purple"/> Greifautomaten</div>
            <div className="flex items-center gap-2 text-white hidden md:flex"><Bot size={14} className="text-neon-blue"/> VR Simulatoren</div>
            <div className="flex items-center gap-2 text-white hidden md:flex"><Trophy size={14} className="text-neon-pink"/> Air Hockey</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
