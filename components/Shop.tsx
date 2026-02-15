import React, { useState } from 'react';
import { Filter, ChevronDown, CheckCircle2, X, Play, Heart, ShoppingBag, Search } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import VideoModal from './VideoModal';
import { Machine } from '../types';

interface ShopProps {
  onProductClick: (machine: Machine) => void;
}

const Shop: React.FC<ShopProps> = ({ onProductClick }) => {
  const { wishlist, toggleWishlist, user, openAuthModal } = useStore();
  const { content } = useContent();
  const { t } = useLanguage();
  const [playingVideo, setPlayingVideo] = useState<{url: string, title: string} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Alle');

  const handleAction = (e: React.MouseEvent, machineId: number) => {
    e.stopPropagation();
    if (user) {
        toggleWishlist(machineId);
    } else {
        openAuthModal();
    }
  };

  const filteredMachines = content.machines.filter(m => {
     const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           m.category.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesCategory = categoryFilter === 'Alle' || m.category === categoryFilter;
     return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
           <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
              {t.shop.title} <span className="text-neon-pink">SHOP</span>
           </h1>
           <p className="text-zinc-400 text-lg max-w-2xl">
              {t.shop.subtitle}
           </p>
        </div>

        {/* Toolbar (Search & Filter) */}
        <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md py-4 mb-8 border-b border-zinc-800 flex flex-col md:flex-row gap-4 justify-between items-center">
           
           {/* Search */}
           <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input 
                 type="text" 
                 placeholder={t.shop.search}
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-blue focus:outline-none transition-colors"
              />
           </div>

           {/* Filter Tabs */}
           <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['Alle', 'VR Simulator', 'Claw Machine', 'Racing', 'Sports'].map(cat => (
                 <button 
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold uppercase whitespace-nowrap transition-colors border ${
                       categoryFilter === cat 
                         ? 'bg-white text-black border-white' 
                         : 'bg-transparent text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-600'
                    }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMachines.map((machine) => {
            const isWishlisted = wishlist.includes(machine.id);
            
            return (
              <div 
                key={machine.id} 
                onClick={() => onProductClick(machine)}
                className="group bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-neon-blue/50 transition-all duration-500 flex flex-col relative shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] cursor-pointer"
              >
                
                {/* Image Area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img 
                    src={machine.image} 
                    alt={machine.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Availability Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 z-20 shadow-md backdrop-blur-md ${
                    machine.available 
                      ? 'bg-emerald-500 text-black shadow-emerald-500/20' 
                      : 'bg-red-500 text-white shadow-red-500/20'
                  }`}>
                    {machine.available ? <CheckCircle2 size={14} /> : <X size={14} />}
                    {machine.available ? t.shop.available : t.shop.sold_out}
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
                      <div className="w-14 h-14 rounded-full bg-neon-blue/90 text-black flex items-center justify-center pl-1 hover:scale-110 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </button>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
                  
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
                      <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors leading-tight">
                          {machine.title}
                      </h3>
                  </div>

                  <p className="text-zinc-500 text-sm mb-6 line-clamp-2">
                      {machine.description || "Professionelles Arcade-System für hohe Auslastung."}
                  </p>

                  {/* Action Button */}
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

      <VideoModal 
        isOpen={!!playingVideo} 
        onClose={() => setPlayingVideo(null)} 
        videoUrl={playingVideo?.url || null} 
        title={playingVideo?.title}
      />
    </div>
  );
};

export default Shop;
