import React from 'react';
import { X, User, Building2, Mail, Heart, LogOut, FileText, Settings, Clock, CheckCircle2, Edit3 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MACHINES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const UserDashboard: React.FC = () => {
  const { isDashboardOpen, closeDashboard, user, logout, wishlist, wishlistNotes, toggleWishlist, updateWishlistNote } = useStore();
  const { t } = useLanguage();

  if (!isDashboardOpen || !user) return null;

  const savedMachines = MACHINES.filter(m => wishlist.includes(m.id));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={closeDashboard}></div>

      {/* Modal Content - Fullscreen-ish on mobile, large modal on desktop */}
      <div className="relative bg-zinc-950 w-full max-w-6xl h-[90vh] rounded-2xl border border-zinc-800 flex overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-64 bg-black border-r border-zinc-800 p-6 flex flex-col shrink-0">
          <div className="mb-8">
            <h2 className="text-xl font-tech font-bold text-white mb-1">{t.dashboard.title}</h2>
            <p className="text-xs text-neon-blue tracking-wider uppercase">{t.dashboard.subtitle}</p>
          </div>

          <div className="space-y-2 flex-grow">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-zinc-900 text-white font-bold flex items-center gap-3 border-l-2 border-neon-pink">
              <User size={18} />
              {t.dashboard.menu_overview}
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition flex items-center gap-3">
              <FileText size={18} />
              {t.dashboard.menu_requests}
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition flex items-center gap-3">
              <Settings size={18} />
              {t.dashboard.menu_settings}
            </button>
          </div>

          <button 
            onClick={logout}
            className="mt-auto w-full text-left px-4 py-3 rounded-lg text-red-400 hover:bg-red-950/20 hover:text-red-300 transition flex items-center gap-3"
          >
            <LogOut size={18} />
            {t.dashboard.logout}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <button 
            onClick={closeDashboard}
            className="absolute top-6 right-6 p-2 rounded-full bg-black/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <X size={24} />
          </button>

          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <header className="mb-12 flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{t.dashboard.welcome}, {user.name}</h1>
                <p className="text-zinc-400">{t.dashboard.welcome_sub}</p>
              </div>
              <div className="bg-neon-blue/10 border border-neon-blue/30 px-4 py-2 rounded-full">
                <span className="text-neon-blue text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                   <Building2 size={14} />
                   {user.company || 'Gewerbekunde'}
                </span>
              </div>
            </header>

            {/* Profile & Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               
               {/* Profile Card */}
               <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">{t.dashboard.card_company}</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400">
                          <Building2 size={20} />
                       </div>
                       <div>
                          <p className="text-xs text-zinc-500">{t.dashboard.label_company}</p>
                          <p className="text-white font-medium">{user.company}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400">
                          <Mail size={20} />
                       </div>
                       <div>
                          <p className="text-xs text-zinc-500">{t.dashboard.label_email}</p>
                          <p className="text-white font-medium">{user.email}</p>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Active Project Status (Mock) */}
               <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-neon-pink/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                 <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">{t.dashboard.card_active}</h3>
                 
                 <div className="bg-zinc-900/50 rounded-lg p-4 border-l-4 border-neon-blue">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-white font-bold text-sm">Arcade Setup: Sportsbar</span>
                       <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{t.dashboard.status_processing}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs mb-3">
                       <Clock size={12} />
                       <span>{t.dashboard.submitted}: 25. Feb 2025</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-neon-blue h-full w-[60%]"></div>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-2 text-right">{t.dashboard.step_info}</p>
                 </div>
               </div>
            </div>

            {/* Wishlist Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold text-white flex items-center gap-3">
                   <Heart className="text-neon-pink fill-neon-pink" size={24} />
                   {t.dashboard.wishlist_title}
                 </h2>
                 <span className="text-zinc-500 text-sm">{savedMachines.length} {t.dashboard.wishlist_count}</span>
              </div>

              {savedMachines.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {savedMachines.map(machine => (
                      <div key={machine.id} className="group bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden hover:border-neon-blue/50 transition-colors flex flex-col">
                         <div className="relative aspect-video shrink-0">
                            <img src={machine.image} alt={machine.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <button 
                                onClick={() => toggleWishlist(machine.id)}
                                className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-zinc-400 hover:text-red-500 hover:bg-black transition-colors"
                                title={t.dashboard.remove}
                            >
                               <X size={14} />
                            </button>
                         </div>
                         <div className="p-4 flex flex-col flex-1">
                            <h4 className="text-white font-bold text-sm mb-1 truncate">{machine.title}</h4>
                            <p className="text-zinc-500 text-xs mb-3">{machine.category}</p>
                            <div className="flex items-center justify-between mb-3">
                               <span className={`text-[10px] px-2 py-0.5 rounded border ${machine.available ? 'border-neon-blue/30 text-neon-blue bg-neon-blue/5' : 'border-red-500/30 text-red-500'}`}>
                                  {machine.available ? t.dashboard.available : t.dashboard.sold_out}
                               </span>
                               <span className="text-[10px] text-zinc-400">{machine.players} Pl.</span>
                            </div>

                            {/* NOTE INPUT SECTION */}
                            <div className="mt-auto pt-3 border-t border-zinc-800">
                                <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase font-bold mb-1.5">
                                    <Edit3 size={10} /> {t.dashboard.note_label}
                                </label>
                                <textarea 
                                    className="w-full bg-black border border-zinc-800 rounded p-2 text-xs text-zinc-300 focus:border-neon-pink focus:outline-none resize-none transition-colors"
                                    placeholder={t.dashboard.note_placeholder}
                                    rows={2}
                                    value={wishlistNotes[machine.id] || ''}
                                    onChange={(e) => updateWishlistNote(machine.id, e.target.value)}
                                />
                            </div>
                         </div>
                      </div>
                   ))}
                   
                   {/* Add More Card */}
                   <button 
                      onClick={() => {
                        closeDashboard();
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="border-2 border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center gap-3 text-zinc-500 hover:text-white hover:border-zinc-600 hover:bg-zinc-900/30 transition-all min-h-[200px]"
                   >
                      <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
                         <span className="text-2xl font-light">+</span>
                      </div>
                      <span className="text-sm font-medium">{t.dashboard.add_more}</span>
                   </button>
                </div>
              ) : (
                <div className="bg-zinc-900/30 border border-zinc-800 border-dashed rounded-xl p-12 text-center">
                   <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-600">
                      <Heart size={32} />
                   </div>
                   <h3 className="text-white font-bold mb-2">{t.dashboard.empty_title}</h3>
                   <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
                      {t.dashboard.empty_text}
                   </p>
                   <button 
                      onClick={() => {
                        closeDashboard();
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-neon-pink text-black font-bold uppercase text-xs px-6 py-3 rounded hover:bg-white transition-colors"
                   >
                      {t.dashboard.to_catalog}
                   </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
