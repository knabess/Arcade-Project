import React, { useState } from 'react';
import { Filter, ChevronDown, CheckCircle2, X, Play, Heart, ShoppingBag } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import VideoModal from './VideoModal';

const Services: React.FC = () => {
  const { wishlist, toggleWishlist, user, openAuthModal } = useStore();
  const { content } = useContent();
  const { t } = useLanguage();
  const [playingVideo, setPlayingVideo] = useState<{url: string, title: string} | null>(null);

  const handleAction = (e: React.MouseEvent, machineId: number) => {
    e.stopPropagation();
    if (user) {
        toggleWishlist(machineId);
    } else {
        openAuthModal();
    }
  };

  return (
    <>
      <section id="services" className="py-24 px-6 bg-background border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          
          {/* Layout Container */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT SIDEBAR FILTERS */}
            <aside className="w-full lg:w-[280px] shrink-0 space-y-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-neon-blue" />
                <h3 className="font-bold text-lg text-white">{t.shop.filter_header}</h3>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t.shop.filter_cat}</label>
                <div className="relative">
                  <select className="w-full bg-[#0a0a0a] border border-zinc-800 text-white rounded-lg px-4 py-3 appearance-none focus:border-neon-blue focus:outline-none transition-colors cursor-pointer text-sm">
                    <option>{t.shop.all_types}</option>
                    <option>Unterhaltung</option>
                    <option>VR & AR</option>
                    <option>Skill Games</option>
                    <option>Claw Machines</option>
                    <option>Retro</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Players Filter */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t.shop.filter_players}</label>
                <div className="flex bg-[#0a0a0a] rounded-lg border border-zinc-800 p-1">
                  {['Alle', '1', '2', '4+'].map((opt, i) => (
                    <button key={i} className={`flex-1 py-1.5 text-sm rounded ${i === 0 ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-neon-blue text-black font-bold py-3 rounded-lg hover:bg-white transition-colors shadow-[0_0_10px_rgba(0,243,255,0.4)]">
                {t.shop.filter_apply}
              </button>
            </aside>

            {/* RIGHT CONTENT GRID */}
            <div className="flex-1">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{t.showcase.title}</h2>
                  <p className="text-zinc-400 text-sm">{t.showcase.subtitle}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-sm">{t.shop.sort_label}</span>
                  <div className="relative">
                    <select className="bg-[#0a0a0a] border border-zinc-800 text-white pl-4 pr-10 py-2 rounded-lg appearance-none text-sm focus:border-neon-blue outline-none cursor-pointer">
                      <option>{t.shop.sort_new}</option>
                      <option>{t.shop.sort_popular}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {content.machines.map((machine) => {
                  const isWishlisted = wishlist.includes(machine.id);
                  
                  return (
                    <div key={machine.id} className="group bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-neon-blue/50 transition-all duration-500 flex flex-col relative shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                      
                      {/* Image Area */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                        <img 
                          src={machine.image} 
                          alt={machine.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                        
                        {/* Improved Availability Badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 z-20 shadow-md backdrop-blur-md ${
                          machine.available 
                            ? 'bg-emerald-500 text-black shadow-emerald-500/20' 
                            : 'bg-red-500 text-white shadow-red-500/20'
                        }`}>
                          {machine.available ? <CheckCircle2 size={14} /> : <X size={14} />}
                          {machine.available ? t.shop.available : t.shop.sold_out}
                        </div>

                        {/* Top Right Badges (Tags) */}
                        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                          {machine.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide bg-black/70 backdrop-blur-md text-white border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Play Video Overlay Button */}
                        {machine.videoUrl && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingVideo({ url: machine.videoUrl!, title: machine.title });
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[1px]"
                          >
                            <div className="w-16 h-16 rounded-full bg-neon-blue/90 text-black flex items-center justify-center pl-1 hover:scale-110 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                              <Play size={28} fill="currentColor" />
                            </div>
                          </button>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
                        
                        {/* Header: Title & Price */}
                        <div className="mb-4">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-neon-blue/80 text-[10px] font-bold uppercase tracking-widest bg-neon-blue/5 px-2 py-1 rounded border border-neon-blue/10">
                                    {machine.category}
                                </span>
                                {machine.price && (
                                    <span className="text-neon-pink font-bold font-tech text-lg drop-shadow-[0_0_8px_rgba(255,0,255,0.3)]">
                                        {machine.price.toLocaleString('de-DE')} €
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors leading-tight">
                                {machine.title}
                            </h3>
                        </div>

                        {/* Hover Reveal Section */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mb-4">
                            <div className="overflow-hidden">
                                <div className="pt-4 border-t border-zinc-800/50 space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                    <p className="text-zinc-300 text-sm leading-relaxed">
                                        {machine.description || "Professionelles Arcade-System für hohe Auslastung."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Button: Always at bottom */}
                        <button 
                          onClick={(e) => handleAction(e, machine.id)}
                          className={`w-full mt-auto border py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 group-hover:translate-y-0 shadow-lg ${
                              isWishlisted
                                ? 'bg-neon-pink text-white border-neon-pink hover:bg-white hover:text-black hover:border-white'
                                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-neon-blue hover:text-black hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                          }`}
                        >
                          {isWishlisted ? (
                              <>
                                <Heart size={16} className="fill-current" /> {t.shop.saved}
                              </>
                          ) : (
                              <>
                                <ShoppingBag size={16} /> {t.shop.add_list}
                              </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
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

export default Services;
