import React, { useState } from 'react';
import { ChevronLeft, Check, Share2, ShieldCheck, Truck, Zap, Scale, Ruler, Heart, PlayCircle, ShoppingBag } from 'lucide-react';
import { Machine } from '../types';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import VideoModal from './VideoModal';

interface ProductDetailProps {
  machine: Machine;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ machine, onBack }) => {
  const { wishlist, toggleWishlist, user, openAuthModal, wishlistNotes, updateWishlistNote } = useStore();
  const { t } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const isWishlisted = wishlist.includes(machine.id);

  const handleAction = () => {
    if (user) {
        toggleWishlist(machine.id);
    } else {
        openAuthModal();
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-6">
      
      {/* Breadcrumb / Back Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft size={16} /> {t.product.back}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* LEFT: Media Section (Sticky) */}
        <div className="relative h-fit lg:sticky lg:top-24">
           <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 relative group">
              <img 
                src={machine.image} 
                alt={machine.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Availability Badge */}
              <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-2 shadow-lg ${
                  machine.available 
                    ? 'bg-emerald-500/90 text-black shadow-emerald-500/20' 
                    : 'bg-red-500/90 text-white shadow-red-500/20'
              }`}>
                 <div className={`w-2 h-2 rounded-full ${machine.available ? 'bg-black animate-pulse' : 'bg-white'}`}></div>
                 {machine.available ? t.product.available : t.product.sold_out}
              </div>

              {/* Video Button Overlay */}
              {machine.videoUrl && (
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute bottom-6 right-6 flex items-center gap-3 bg-black/60 backdrop-blur-md pl-4 pr-5 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all group/btn"
                >
                   <PlayCircle size={20} className="text-neon-pink group-hover/btn:text-black transition-colors" />
                   <span className="text-xs font-bold uppercase tracking-wide">{t.product.video_btn}</span>
                </button>
              )}
           </div>

           {/* Thumbnails / Extra Views (Mock) */}
           <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="aspect-square rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer hover:border-neon-blue transition-colors opacity-60 hover:opacity-100">
                    <img src={machine.image} className="w-full h-full object-cover grayscale hover:grayscale-0" />
                 </div>
              ))}
           </div>
        </div>

        {/* RIGHT: Info Section */}
        <div className="flex flex-col">
          
          <div className="mb-2 flex items-center gap-3">
             <span className="text-neon-blue text-xs font-bold uppercase tracking-widest border border-neon-blue/20 bg-neon-blue/5 px-2 py-1 rounded">
                {machine.category}
             </span>
             {machine.condition && (
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest border border-zinc-800 bg-zinc-900 px-2 py-1 rounded">
                   {machine.condition}
                </span>
             )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {machine.title}
          </h1>

          <div className="flex items-end gap-4 mb-8 pb-8 border-b border-zinc-800">
            {machine.price ? (
                <div>
                   <span className="text-3xl font-tech font-bold text-neon-pink drop-shadow-[0_0_10px_rgba(255,0,255,0.4)]">
                      {machine.price.toLocaleString('de-DE')} €
                   </span>
                   <span className="block text-zinc-500 text-xs mt-1">{t.product.vat_shipping}</span>
                </div>
            ) : (
                <span className="text-2xl font-bold text-white">{t.product.price_request}</span>
            )}
            
            {machine.revenue && (
               <div className="ml-auto flex flex-col items-end">
                  <span className="text-xs text-zinc-500 font-bold uppercase">{t.product.roi_est}</span>
                  <span className="text-emerald-400 font-mono font-bold text-lg">{machine.revenue} / Monat</span>
               </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-10">
             <h3 className="text-white font-bold text-lg mb-3">{t.product.desc_title}</h3>
             <p className="text-zinc-400 leading-relaxed">
                {machine.description || "Hochwertiges Arcade-System für den professionellen Einsatz. Robuste Bauweise, einfache Wartung und hohe Anziehungskraft für Kunden jeder Altersgruppe."}
             </p>
          </div>

          {/* Action Area */}
          <div className="bg-[#0f0f0f] border border-zinc-800 rounded-2xl p-6 mb-10 shadow-xl">
             <div className="flex flex-col gap-4">
                <button 
                  onClick={handleAction}
                  className={`w-full py-4 rounded-xl text-base font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-3 shadow-lg ${
                    isWishlisted
                      ? 'bg-neon-pink text-white border border-neon-pink hover:bg-white hover:text-black hover:border-white'
                      : 'bg-neon-blue text-black border border-neon-blue hover:bg-white hover:text-neon-blue hover:border-white hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                  }`}
                >
                   {isWishlisted ? <Check size={20} /> : <ShoppingBag size={20} />}
                   {isWishlisted ? t.product.on_wishlist : t.product.add_request}
                </button>
                
                {/* Quick Note Input */}
                {isWishlisted && (
                   <div className="animate-in fade-in slide-in-from-top-2">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold mb-1 block">{t.product.note_label}</label>
                      <input 
                         type="text" 
                         className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm text-white focus:border-neon-pink focus:outline-none"
                         placeholder={t.product.note_placeholder}
                         value={wishlistNotes[machine.id] || ''}
                         onChange={(e) => updateWishlistNote(machine.id, e.target.value)}
                      />
                   </div>
                )}
             </div>

             <div className="mt-6 pt-6 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-neon-blue"/> {t.product.guarantee}</span>
                <span className="flex items-center gap-1.5"><Truck size={14} className="text-neon-blue"/> {t.product.shipping}</span>
                <span className="flex items-center gap-1.5"><Zap size={14} className="text-neon-blue"/> {t.product.service}</span>
             </div>
          </div>

          {/* Technical Specs */}
          <div>
             <h3 className="text-white font-bold text-lg mb-4">{t.product.specs_title}</h3>
             <div className="grid grid-cols-2 gap-4">
                <SpecItem icon={Ruler} label={t.product.dimensions} value={machine.dimensions || "N/A"} />
                <SpecItem icon={Scale} label={t.product.weight} value={machine.weight || "N/A"} />
                <SpecItem icon={Zap} label={t.product.power} value={machine.power || "N/A"} />
                <SpecItem icon={ShieldCheck} label={t.product.manufacturer} value={machine.manufacturer} />
             </div>
          </div>

        </div>
      </div>

      <VideoModal 
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={machine.videoUrl || null}
        title={machine.title}
      />
    </div>
  );
};

const SpecItem: React.FC<{ icon: any, label: string, value: string }> = ({ icon: Icon, label, value }) => (
  <div className="bg-[#0a0a0a] border border-zinc-800 p-4 rounded-lg flex items-start gap-3">
     <div className="mt-0.5 text-zinc-500">
        <Icon size={16} />
     </div>
     <div>
        <p className="text-xs text-zinc-500 font-bold uppercase mb-1">{label}</p>
        <p className="text-zinc-200 text-sm font-medium">{value}</p>
     </div>
  </div>
);

export default ProductDetail;
