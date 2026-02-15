import React from 'react';
import { Mail, ArrowUp, Github, Linkedin, Twitter } from 'lucide-react';
import BookingWizard from './BookingWizard';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full sm:px-6 md:px-10 max-w-7xl mx-auto pt-12 pr-4 pb-10 pl-4 bg-background">
      <div className="relative overflow-hidden bg-[#0a0a0a] border border-zinc-800 rounded-3xl">
        <div className="relative z-10 sm:p-12 md:p-16 pt-12 pr-8 pb-8 pl-8">
          
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            <div className="lg:col-span-4">
              {/* Updated Logo to match Navigation Style */}
              <div className="flex flex-col items-start mb-6">
                <h1 className="text-4xl font-black font-tech tracking-widest leading-none text-transparent drop-shadow-[0_0_2px_rgba(255,0,255,0.8)]" 
                    style={{ 
                      WebkitTextStroke: '2px #ff00ff',
                    }}>
                  {t.contact.title_lines[0]}
                </h1>
                <span className="text-[0.6rem] font-bold text-white tracking-[0.2em] mt-1 uppercase transition-colors duration-300 whitespace-nowrap">
                  {t.contact.title_lines[1]}
                </span>
              </div>
              
              <p className="text-zinc-400 max-w-3xl mb-12">
                {t.contact.desc}
              </p>

              {/* BOOKING WIZARD REPLACEMENT */}
              <div id="contact" className="w-full">
                <BookingWizard />
              </div>

            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 pt-12">
            <div className="">
              <h4 className="text-white/80 text-xs uppercase tracking-[0.2em] font-bold">{t.contact.services}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li className=""><a href="#machines" className="text-zinc-400 hover:text-white transition inline-flex items-center gap-2">Arcade Hardware</a></li>
                <li className=""><a href="#process" className="text-zinc-400 hover:text-white transition inline-flex items-center gap-2">Concept & Planning</a></li>
                <li className=""><a href="#services" className="text-zinc-400 hover:text-white transition inline-flex items-center gap-2">Logistics</a></li>
                <li className=""><a href="#" className="hover:text-white transition inline-flex items-center gap-2 text-zinc-400">Support</a></li>
              </ul>
            </div>
            <div className="">
              <h4 className="text-white/80 text-xs uppercase tracking-[0.2em] font-bold">{t.contact.resources}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-zinc-400 hover:text-white transition">Catalog 2025</a></li>
                <li className=""><a href="#testimonials" className="text-zinc-400 hover:text-white transition">Testimonials</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition">Finance</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div className="">
              <h4 className="text-white/80 text-xs uppercase tracking-[0.2em] font-bold">{t.contact.studio}</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#about" className="text-zinc-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition">Career</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition">Partner</a></li>
                <li className=""><a href="#contact" className="text-zinc-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div className="">
              <h4 className="uppercase text-xs text-white/80 tracking-[0.2em] font-bold">{t.contact.newsletter}</h4>
              <form id="subscribe" className="mt-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input type="email" name="subscribeEmail" required placeholder="you@example.com" className="w-full placeholder-white/20 outline-none focus:ring-2 focus:ring-neon-blue/60 focus:border-neon-blue transition text-xs text-white bg-white/5 border-white/10 border rounded-xl pt-2.5 pr-3 pb-2.5 pl-9" />
                </div>
                <button type="submit" className="inline-flex gap-2 hover:bg-neon-blue hover:text-black transition text-xs font-bold text-zinc-900 bg-white rounded-xl pt-2.5 pr-3.5 pb-2.5 pl-3.5 items-center">
                  Join
                </button>
              </form>
              <div className="mt-6 flex items-center gap-3">
                <a href="#" aria-label="GitHub" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">© <span id="year">2025</span> K&L Entertainment Systems. {t.contact.rights}</p>
            <div className="flex items-center gap-6 text-zinc-500 text-sm">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <span className="hidden sm:block text-zinc-800">•</span>
              <a href="#" className="hover:text-white transition">Imprint</a>
              <span className="hidden sm:block text-zinc-800">•</span>
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition inline-flex items-center gap-2">
                <ArrowUp className="w-4 h-4" /> Top
              </button>
            </div>
          </div>
        </div>

        {/* Decorative glows */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-neon-blue/5 blur-3xl"></div>
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-neon-pink/5 blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Contact;
