import React, { useState } from 'react';
import { X, Lock, Mail, User, Building2, AlertCircle, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useStore();
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(false); // Toggle between Login and Signup
  const [formData, setFormData] = useState({ name: '', email: '', password: '', company: '' });
  const [isB2BConfirmed, setIsB2BConfirmed] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !isB2BConfirmed) return; // Prevent submission if not confirmed B2B
    
    // Simulate auth
    login(formData.name || 'Gewerbekunde', formData.email, formData.company);
  };

  const handleDemoLogin = () => {
    login("Alex Demo", "einkauf@spielhalle-demo.de", "Spielhalle Demo GmbH");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeAuthModal}></div>

      {/* Modal Content */}
      <div className="relative bg-zinc-900 border-2 border-neon-pink rounded-2xl p-8 w-full max-w-md shadow-[0_0_30px_rgba(255,0,255,0.2)] animate-in fade-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
        <button 
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white font-tech uppercase tracking-wider mb-2">
            {isLogin ? t.auth.login_title : t.auth.register_title}
          </h2>
          <p className="text-zinc-400 text-sm">
            {isLogin ? t.auth.login_desc : t.auth.register_desc}
          </p>
        </div>

        <button 
            onClick={handleDemoLogin}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 border-dashed mb-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-mono"
        >
            <Sparkles size={16} className="text-neon-blue" />
            {t.auth.demo_btn}
        </button>

        <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">{t.auth.or_manual}</span>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-zinc-500">{t.auth.company_label}</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-black border border-zinc-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-pink focus:outline-none transition-colors"
                    placeholder="Muster GmbH"
                  />
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-zinc-500">{t.auth.contact_label}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                  <input 
                    type="text" 
                    required={!isLogin}
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black border border-zinc-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-pink focus:outline-none transition-colors"
                    placeholder="Max Mustermann"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-zinc-500">{t.auth.email_label}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black border border-zinc-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="info@firma.de"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-zinc-500">{t.auth.password_label}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-black border border-zinc-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-neon-pink focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="bg-neon-blue/10 border border-neon-blue/30 rounded-lg p-3 mt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-1">
                    <input 
                        type="checkbox" 
                        required
                        checked={isB2BConfirmed}
                        onChange={e => setIsB2BConfirmed(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-500 checked:bg-neon-blue checked:border-neon-blue transition-all"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div className="text-xs text-zinc-300">
                    <span className="font-bold text-neon-blue block mb-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {t.auth.b2b_note}
                    </span>
                    {t.auth.b2b_check}
                </div>
              </label>
            </div>
          )}

          <button 
            type="submit"
            disabled={!isLogin && !isB2BConfirmed}
            className="w-full bg-neon-pink text-black font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-neon-pink"
          >
            {isLogin ? t.auth.login_btn : t.auth.register_btn}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-zinc-500 text-sm hover:text-neon-blue underline decoration-neon-blue/30 underline-offset-4 transition-colors"
          >
            {isLogin ? t.auth.switch_login : t.auth.switch_register}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
