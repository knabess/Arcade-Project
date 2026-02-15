import React, { useState, useEffect } from 'react';
import { Menu, X, User, Settings, Search, Heart, Globe } from 'lucide-react';
import { NavigationItem } from '../types';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  onNavigate: (section: NavigationItem | 'process' | 'portfolio' | 'machines' | 'home') => void;
  activeSection: NavigationItem | 'process' | 'portfolio' | 'machines';
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, openAuthModal, openDashboard, wishlist } = useStore();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, value: 'home' },
    { label: t.nav.shop, value: 'machines' },
    { label: t.nav.models, value: 'process' },
    { label: t.nav.contact, value: NavigationItem.CONTACT },
  ];

  const handleNavClick = (value: string) => {
    if (value === 'home') {
      onNavigate('home');
    } else if (value === 'process') {
       onNavigate('process');
    } else if (value === 'machines') {
       onNavigate('machines');
    } else {
       onNavigate(value as any);
    }
  };

  const isAdmin = user?.company?.includes('Admin') || user?.name?.includes('Demo');

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        
        {/* Scrolling Ticker */}
        <div className="bg-black border-b border-neon-blue h-8 w-full overflow-hidden flex items-center relative z-50">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-tech font-bold tracking-widest text-white uppercase">
            {[...t.hero.ticker, ...t.hero.ticker].map((item, index) => (
              <React.Fragment key={index}>
                <span className="hover:text-neon-pink transition-colors cursor-default">{item}</span>
                <span className="text-neon-blue">+++</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Nav */}
        <nav 
          className={`transition-all duration-300 w-full ${
            isScrolled 
              ? 'bg-black/90 backdrop-blur-md border-b border-neon-pink py-3' 
              : 'bg-transparent border-b border-white/10 py-5 bg-gradient-to-b from-black/80 to-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            
            {/* LOGO */}
            <div 
              className="relative group cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-2xl lg:text-3xl font-black font-tech tracking-widest leading-none text-transparent drop-shadow-[0_0_2px_rgba(255,0,255,0.8)]" 
                    style={{ 
                      WebkitTextStroke: '1.5px #ff00ff',
                    }}>
                  K&L
                </h1>
                <span className="text-[0.5rem] lg:text-[0.6rem] font-bold text-white tracking-[0.2em] -mt-0.5 uppercase transition-colors duration-300 group-hover:text-neon-pink whitespace-nowrap">
                  Entertainment Systems
                </span>
              </div>
            </div>

            {/* Desktop Menu - Center */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.value)}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-all tracking-wide"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop Icons - Right */}
            <div className="hidden lg:flex items-center gap-6">
              
              {/* Language Switch */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors text-xs font-bold border border-zinc-700 rounded px-2 py-1"
              >
                 <Globe size={14} /> {language.toUpperCase()}
              </button>

              {/* Search Icon */}
              <button className="text-zinc-300 hover:text-white transition-colors">
                <Search size={22} strokeWidth={1.5} />
              </button>

              {/* User Icon */}
              <button 
                onClick={user ? openDashboard : openAuthModal}
                className="text-zinc-300 hover:text-white transition-colors"
                title={user ? (isAdmin ? "Backend" : t.nav.dashboard) : "Login"}
              >
                {user && isAdmin ? <Settings size={22} strokeWidth={1.5} /> : <User size={22} strokeWidth={1.5} />}
              </button>

              {/* Heart (Wishlist) Icon */}
              <button 
                onClick={user ? openDashboard : openAuthModal}
                className="text-zinc-300 hover:text-white transition-colors relative group"
                title={t.nav.wishlist}
              >
                <Heart size={22} strokeWidth={1.5} className={wishlist.length > 0 ? "fill-neon-pink text-neon-pink border-none" : ""} />
                
                {/* Badge */}
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-neon-pink text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlist.length}
                  </span>
                )}
              </button>

            </div>

            {/* Mobile Menu Button - Visible below lg */}
            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className="text-zinc-300 text-xs font-bold border border-zinc-700 rounded px-2 py-1 mr-2"
              >
                 {language.toUpperCase()}
              </button>

              <button 
                onClick={user ? openDashboard : openAuthModal}
                className="text-zinc-300 relative mr-2"
              >
                <Heart size={22} strokeWidth={1.5} className={wishlist.length > 0 ? "fill-neon-pink text-neon-pink" : ""} />
                 {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neon-pink text-black text-[8px] font-bold w-3 h-3 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              <button 
                className="text-neon-pink hover:text-white transition-colors p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-32 px-6 border-l border-neon-pink">
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  handleNavClick(link.value);
                  setIsMobileMenuOpen(false);
                }}
                className="text-3xl font-brush text-left text-white hover:text-neon-pink transition-colors uppercase rotate-1 hover:rotate-0 transform duration-200"
              >
                {link.label}
              </button>
            ))}

            <button 
              onClick={() => {
                 if (user) {
                    openDashboard();
                 } else {
                    openAuthModal();
                 }
                setIsMobileMenuOpen(false);
              }}
              className="text-xl font-brush text-left text-zinc-400 hover:text-white transition-colors uppercase flex items-center gap-2"
            >
              {user ? (
                 <>
                   {isAdmin ? <Settings size={20} /> : <User size={20} />}
                   {isAdmin ? t.nav.backend : t.nav.dashboard}
                 </>
              ) : (
                <>
                  <User size={20} /> {t.nav.login}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
