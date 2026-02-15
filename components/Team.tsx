import React, { useState } from 'react';
import { Users, ChevronLeft, ChevronRight, Zap, Monitor, Share2, PenTool, Terminal, Circle } from 'lucide-react';

const TEAM_MEMBERS = [
  { 
    name: 'Sofia Alvarez', 
    role: 'Growth Lead', 
    img: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=1200&q=80&auto=format&fit=crop',
    icon: Users
  },
  { 
    name: 'Jackson Mitchel', 
    role: 'AI Lead', 
    img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=1200&q=80&auto=format&fit=crop',
    icon: Zap
  },
  { 
    name: 'Jenny Doe', 
    role: 'Product Head', 
    img: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=1200&q=80&auto=format&fit=crop',
    icon: Monitor,
    featured: true,
    description: "Leading product vision & strategy"
  },
  { 
    name: 'Armenia Sean', 
    role: 'Social Media Head', 
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80&auto=format&fit=crop',
    icon: Share2
  },
  { 
    name: 'Maya Patel', 
    role: 'Design Lead', 
    img: 'https://images.unsplash.com/photo-1541534401786-2077eed87a2d?w=1200&q=80&auto=format&fit=crop',
    icon: PenTool
  },
  { 
    name: 'Liam Becker', 
    role: 'Platform Engineer', 
    img: 'https://images.unsplash.com/photo-1544005316-04d7f94c1d27?w=1200&q=80&auto=format&fit=crop',
    icon: Terminal
  }
];

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  const getCardStyle = (index: number) => {
    const total = TEAM_MEMBERS.length;
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
      ringClass = 'ring-2 ring-lime-300/40 bg-lime-400/10';
      boxShadow = '0 20px 60px rgba(163,230,53,0.3)';
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
      className: `carousel-card absolute w-80 h-[460px] rounded-2xl overflow-hidden ${ringClass} transition-all duration-500`
    };
  };

  return (
    <section id="team" className="sm:py-24 pt-16 pb-16 relative bg-background overflow-hidden">
      {/* Grid corners decoration simulation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/5 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/5 rounded-br-3xl"></div>
      </div>

      <div className="sm:px-6 lg:px-8 max-w-7xl mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-lime-400/10 px-2 py-1 text-[11px] text-lime-300 ring-1 ring-lime-300/20 uppercase tracking-tight">
            <Users size={14} />
            Team
          </span>
          <h2 className="sm:text-5xl text-4xl font-semibold tracking-tight mt-4 text-white">
            Meet the team that talks to AI like it's a pet
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400 text-sm sm:text-base">
            The humans behind the models—builders, dreamers, and delightful nerds.
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
              {TEAM_MEMBERS.map((member, index) => {
                const { style, className } = getCardStyle(index);
                const Icon = member.icon;
                
                return (
                  <div 
                    key={index}
                    className={className}
                    style={style}
                  >
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="h-full w-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {member.featured && (
                      <div className="absolute top-6 right-6">
                        <div className="inline-flex items-center gap-1 rounded-full bg-lime-400 px-3 py-1.5 text-xs font-medium text-black">
                          <Zap size={12} />
                          Featured
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/20 mb-3 backdrop-blur-md">
                        <Icon size={12} className="text-lime-300" />
                        <span className="text-white font-medium">{member.role}</span>
                      </div>
                      
                      <p className={`font-bold text-white tracking-tight ${member.featured ? 'text-3xl mb-1' : 'text-xl'}`}>
                        {member.name}
                      </p>
                      
                      {member.featured && member.description && (
                         <p className="text-sm text-zinc-300 animate-pulse">
                           {member.description}
                         </p>
                      )}
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
  );
};

export default Team;