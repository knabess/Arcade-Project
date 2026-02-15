import React, { useState } from 'react';
import { Gamepad2, ChevronLeft, ChevronRight, Zap, Trophy, Target, Banknote, Sparkles, Crosshair, PlayCircle } from 'lucide-react';
import VideoModal from './VideoModal';
import { useLanguage } from '../context/LanguageContext';

const MACHINES_SHOWCASE = [
  { 
    name: 'Cosmic Claw XL', 
    category: 'Claw Machine', 
    revenue: '€3.200',
    img: 'https://images.unsplash.com/photo-1579309401389-a240d7236d30?auto=format&fit=crop&w=800&q=80',
    icon: Gamepad2,
    videoUrl: "https://www.youtube.com/embed/5D2z5Zt8y9k?si=demo"
  },
  { 
    name: 'VR Moto Blitz', 
    category: 'VR Simulator', 
    revenue: '€4.500',
    img: 'https://images.unsplash.com/photo-1626387346567-2cd2dc03e079?auto=format&fit=crop&w=800&q=80',
    icon: Zap,
    featured: true,
    description: "Höchste Anziehungskraft durch Immersion",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?si=demo"
  },
  { 
    name: 'Hoop Shot Pro', 
    category: 'Skill Game', 
    revenue: '€2.100',
    img: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80',
    icon: Trophy,
    videoUrl: "https://www.youtube.com/embed/K81Fj8i_p4c?si=demo"
  },
  { 
    name: 'Zombie Sniper VR', 
    category: 'Shooter', 
    revenue: '€3.800',
    img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80',
    icon: Crosshair,
    videoUrl: "https://www.youtube.com/embed/H374n5y0m4Q?si=demo"
  },
  { 
    name: 'Retro Cade 4000', 
    category: 'Redemption', 
    revenue: '€2.800',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    icon: Target,
    videoUrl: "https://www.youtube.com/embed/XqWJ38qG9wU?si=demo"
  },
  { 
    name: 'Dance Revolution', 
    category: 'Rhythm Game', 
    revenue: '€3.100',
    img: 'https://images.unsplash.com/photo-1625624996944-77dc939f8804?auto=format&fit=crop&w=800&q=80',
    icon: Sparkles,
    videoUrl: "https://www.youtube.com/embed/yJg-Y5byMMw?si=demo"
  }
];

const MachineShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [playingVideo, setPlayingVideo] = useState<{url: string, title: string} | null>(null);
  const { t } = useLanguage();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MACHINES_SHOWCASE.length) % MACHINES_SHOWCASE.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MACHINES_SHOWCASE.length);
  };

  const getCardStyle = (index: number) => {
    const total = MACHINES_SHOWCASE.length;
    // Calculate circular difference
    let diff = (index - activeIndex + total) % total;
    if (diff > total / 2) diff -= total;

    let transform = '';
    let opacity = 1;
    let filter = 'brightness(1)';
    let zIndex = 1;
    let ringClass = 'ring-1 ring-white/10';
    let boxShadow = '';

    if (diff === 0) {
      transform = 'translateX(0) scale(1) rotateY(0deg)';
      zIndex = 10;
      ringClass = 'ring-2 ring-neon-blue/40 bg-neon-blue/10';
      boxShadow = '0 20px 60px rgba(0, 243, 255, 0.2)';
    } else if (diff === -1) {
      transform = 'translateX(-180px) scale(0.9) rotateY(10deg)';
      opacity = 0.6;
      filter = 'brightness(0.75)';
      zIndex = 5;
    } else if (diff === 1) {
      transform = 'translateX(180px) scale(0.9) rotateY(-10deg)';
      opacity = 0.6;
      filter = 'brightness(0.75)';
      zIndex = 5;
    } else if (diff === -2) {
      transform = 'translateX(-360px) scale(0.85) rotateY(20deg)';
      opacity = 0.4;
      filter = 'brightness(0.6)';
      zIndex = 2;
    } else if (diff === 2) {
      transform = 'translateX(360px) scale(0.85) rotateY(-20deg)';
      opacity = 0.4;
      filter = 'brightness(0.6)';
      zIndex = 2;
    } else {
      // Hide others
      transform = `translateX(${diff * 180}px) scale(0.75) rotateY(${-diff * 15}deg)`;
      opacity = 0;
      filter = 'brightness(0.5)';
      zIndex = 1;
    }

    return {
      style: {
        transform,
        opacity,
        filter,
        zIndex,
        boxShadow,
      },
      className: `carousel-card absolute w-80 h-[460px] rounded-2xl overflow-hidden ${ringClass} transition-all duration-500 bg-[#0a0a0a]`
    };
  };

  return (
    <>
      <section id="machines" className="sm:py-24 pt-16 pb-16 relative bg-background overflow-hidden">
        {/* Grid corners decoration simulation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/5 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/5 rounded-br-3xl"></div>
        </div>

        <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-neon-blue/10 px-2 py-1 text-[11px] text-neon-blue ring-1 ring-neon-blue/20 uppercase tracking-tight">
              <Trophy size={14} />
              {t.showcase.badge}
            </span>
            <h2 className="sm:text-5xl text-4xl font-semibold tracking-tight mt-4 text-white">
              {t.showcase.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-400 text-sm sm:text-base">
              {t.showcase.subtitle}
            </p>
          </div>

          <div className="flex mt-16 relative items-center justify-center min-h-[500px]" style={{ perspective: '1200px' }}>
            
            <button 
              onClick={handlePrev}
              className="absolute left-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/10 hover:bg-white/5 transition hover:scale-105 text-white"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative w-full max-w-md h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {MACHINES_SHOWCASE.map((machine, index) => {
                  const { style, className } = getCardStyle(index);
                  const Icon = machine.icon;
                  
                  return (
                    <div 
                      key={index}
                      className={className}
                      style={style}
                    >
                      <img 
                        src={machine.img} 
                        alt={machine.name} 
                        className="h-full w-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
                      
                      {/* Featured Badge */}
                      {machine.featured && (
                        <div className="absolute top-6 right-6">
                          <div className="inline-flex items-center gap-1 rounded-full bg-neon-blue px-3 py-1.5 text-xs font-bold text-black uppercase tracking-wider shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                            <Zap size={12} fill="black" />
                            {t.showcase.bestseller}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="absolute bottom-6 left-6 right-6">
                        
                        {/* Category Pill */}
                        <div className="flex justify-between items-start mb-2">
                           <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/20 backdrop-blur-md">
                            <Icon size={12} className="text-neon-blue" />
                            <span className="text-white font-medium uppercase tracking-wide">{machine.category}</span>
                          </div>
                          
                          {/* Video Trigger */}
                          {machine.videoUrl && (
                             <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPlayingVideo({ url: machine.videoUrl!, title: machine.name });
                                }}
                                className="text-zinc-400 hover:text-white transition-colors"
                                title={t.showcase.play_trailer}
                             >
                                <PlayCircle size={24} className="hover:scale-110 transition-transform text-neon-pink" />
                             </button>
                          )}
                        </div>
                        
                        {/* Title */}
                        <p className={`font-bold text-white tracking-tight ${machine.featured ? 'text-3xl mb-2' : 'text-xl mb-2'}`}>
                          {machine.name}
                        </p>
                        
                        {/* Description if featured */}
                        {machine.featured && machine.description && (
                           <p className="text-xs text-zinc-400 mb-3">
                             {machine.description}
                           </p>
                        )}

                        {/* Revenue Estimation */}
                        <div className="flex items-center gap-3 border-t border-white/10 pt-3 mt-1">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neon-blue/10 text-neon-blue">
                               <Banknote size={16} />
                          </div>
                          <div>
                              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{t.showcase.revenue}</p>
                              <p className="text-neon-blue font-bold text-lg drop-shadow-[0_0_5px_rgba(0,243,255,0.3)]">{machine.revenue}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={handleNext}
              className="absolute right-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/10 hover:bg-white/5 transition hover:scale-105 text-white"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={!!playingVideo} 
        onClose={() => setPlayingVideo(null)} 
        videoUrl={playingVideo?.url || null} 
        title={playingVideo?.title}
      />
    </>
  );
};

export default MachineShowcase;
