import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, Monitor, Building2, Check, Clock, ChevronRight, ChevronLeft, Store, Fuel, Utensils, Beer, FerrisWheel, Tent, PartyPopper, HelpCircle, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MACHINES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

type Step = 1 | 2 | 3 | 4;

const BookingWizard: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const { wishlist, wishlistNotes, user } = useStore();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    projectType: '',
    industry: '',
    machineCount: 1, // Default value
    date: '',
    time: '',
    name: user?.name || '',
    email: user?.email || ''
  });

  // Update name/email if user logs in during process
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const updateData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep((prev) => (prev + 1) as Step);
  };

  const handleSubmit = () => {
    // Collect wishlisted machine names with notes
    const wishlistedItems = MACHINES.filter(m => wishlist.includes(m.id)).map(m => {
        const note = wishlistNotes[m.id];
        return note ? `- ${m.title} (Notiz: ${note})` : `- ${m.title}`;
    }).join('\n');
    
    // Construct Email Body
    const subject = `Projektanfrage: ${formData.projectType} - ${formData.industry}`;
    const body = `
Hallo K&L Entertainment Systems,

Ich möchte gerne ein neues Projekt starten. Hier sind meine Daten:

PROJEKT DETAILS:
----------------
Projekt Art: ${formData.projectType}
Branche: ${formData.industry}
Geschätzte Maschinen: ${formData.machineCount}

TERMINWUNSCH:
-------------
Datum: ${formData.date}
Zeit: ${formData.time}

WUNSCHLISTE (AUS SHOP):
-----------------------
${wishlistedItems || 'Keine spezifischen Maschinen ausgewählt'}

KONTAKT:
--------
Name: ${formData.name}
Email: ${formData.email}

Bitte bestätigen Sie den Termin.
    `;

    // Trigger Mailto
    window.location.href = `mailto:kundl.automatenhandel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show visual feedback (in a real app, this would be the success state of an async API call)
    alert("Email-Client wurde geöffnet! Bitte senden Sie die Email ab, um die Anfrage abzuschließen.");
  };

  const getProgressWidth = () => {
    return `${(step / 4) * 100}%`;
  };

  // MOCK CALENDAR DATA
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const INDUSTRIES = [
    { id: 'kiosk', label: 'Kiosk', icon: Store },
    { id: 'tankstelle', label: 'Gas Station', icon: Fuel },
    { id: 'gastro', label: 'Restaurant', icon: Utensils },
    { id: 'sportsbar', label: 'Bar', icon: Beer },
    { id: 'indoors', label: 'Indoor Playground', icon: FerrisWheel },
    { id: 'freizeit', label: 'Theme Park', icon: Tent },
    { id: 'event', label: 'Event', icon: PartyPopper },
    { id: 'sonstiges', label: 'Other', icon: HelpCircle },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto font-tech">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* LEFT MAIN PANEL */}
        <div className="flex-1 border-2 border-neon-pink rounded-xl bg-black p-6 md:p-8 relative shadow-[0_0_20px_rgba(255,0,255,0.15)] min-h-[600px]">
          <h2 className="text-3xl text-white mb-8 font-bold tracking-widest uppercase border-b border-white/10 pb-4">
            {t.booking.title}
          </h2>

          {/* STEP 1: SELECT VENUE / TYPE */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex items-center gap-3 mb-6 text-neon-pink">
                <Monitor size={20} />
                <span className="text-lg font-bold uppercase">{t.booking.step1}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option 1: Einzelne Maschinen */}
                <button
                  onClick={() => {
                    updateData('projectType', t.booking.type_single);
                    handleNext();
                  }}
                  className={`p-8 rounded-xl border text-left transition-all hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] flex flex-col gap-4 group h-full ${
                    formData.projectType === t.booking.type_single 
                      ? 'border-neon-pink bg-neon-pink/10 text-white' 
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-neon-pink hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Monitor size={32} className={formData.projectType === t.booking.type_single ? 'text-neon-pink' : 'text-zinc-500 group-hover:text-neon-pink'} />
                    {formData.projectType === t.booking.type_single && <Check className="text-neon-pink" />}
                  </div>
                  <div>
                    <span className="text-xl font-bold block mb-2">{t.booking.type_single}</span>
                    <p className="text-sm opacity-70 font-sans leading-relaxed">
                      {t.booking.type_single_desc}
                    </p>
                  </div>
                </button>

                {/* Option 2: FEC Eröffnen */}
                <button
                  onClick={() => {
                    updateData('projectType', t.booking.type_fec);
                    handleNext();
                  }}
                  className={`p-8 rounded-xl border text-left transition-all hover:shadow-[0_0_15px_rgba(255,0,255,0.4)] flex flex-col gap-4 group h-full ${
                    formData.projectType === t.booking.type_fec 
                      ? 'border-neon-pink bg-neon-pink/10 text-white' 
                      : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-neon-pink hover:text-white'
                  }`}
                >
                   <div className="flex items-center justify-between w-full">
                    <Building2 size={32} className={formData.projectType === t.booking.type_fec ? 'text-neon-pink' : 'text-zinc-500 group-hover:text-neon-pink'} />
                    {formData.projectType === t.booking.type_fec && <Check className="text-neon-pink" />}
                  </div>
                  <div>
                    <span className="text-xl font-bold block mb-2">{t.booking.type_fec}</span>
                    <p className="text-sm opacity-70 font-sans leading-relaxed">
                      {t.booking.type_fec_desc}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS (Industry & Count) */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6 text-neon-pink">
                <Store size={20} />
                <span className="text-lg font-bold uppercase">{t.booking.step2}</span>
              </div>

              {/* Section A: Industry Selection */}
              <div className="mb-10">
                <label className="block text-white text-sm uppercase font-bold mb-4 tracking-wider border-l-2 border-neon-blue pl-3">
                  {t.booking.industry_label}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => updateData('industry', ind.label)}
                      className={`p-3 rounded-lg border text-xs sm:text-sm font-bold uppercase transition-all flex flex-col items-center justify-center gap-2 h-24 ${
                        formData.industry === ind.label
                          ? 'border-neon-blue bg-neon-blue/20 text-white shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-neon-blue hover:text-white'
                      }`}
                    >
                      <ind.icon size={20} />
                      <span className="text-center">{ind.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section B: Quantity Counter */}
              <div>
                <label className="block text-white text-sm uppercase font-bold mb-4 tracking-wider border-l-2 border-neon-pink pl-3">
                  {t.booking.count_label}
                </label>
                
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-6 mb-4">
                     <button 
                        onClick={() => updateData('machineCount', Math.max(1, formData.machineCount - 1))}
                        className="w-14 h-14 flex items-center justify-center border-2 border-neon-pink bg-black text-neon-pink hover:bg-neon-pink hover:text-black transition-colors font-bold text-2xl rounded-full"
                     >
                       -
                     </button>
                     
                     <div className="h-20 w-32 flex items-center justify-center border-2 border-white/20 bg-black rounded-lg">
                        <span className="text-5xl font-bold text-white font-tech drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                          {formData.machineCount}
                        </span>
                     </div>
                     
                     <button 
                        onClick={() => updateData('machineCount', formData.machineCount + 1)}
                        className="w-14 h-14 flex items-center justify-center border-2 border-neon-blue bg-black text-neon-blue hover:bg-neon-blue hover:text-black transition-colors font-bold text-2xl rounded-full"
                     >
                       +
                     </button>
                  </div>
                  
                  {/* Dynamic Tip Text based on count */}
                  <p className="text-zinc-400 text-sm text-center max-w-md font-sans bg-black/40 px-4 py-2 rounded-full border border-white/5">
                    {formData.machineCount <= 2 && t.booking.tip_start}
                    {formData.machineCount > 2 && formData.machineCount <= 5 && t.booking.tip_upgrade}
                    {formData.machineCount > 5 && t.booking.tip_pro}
                  </p>
                  
                  <p className="text-zinc-600 text-xs mt-3 italic">
                    {t.booking.tip_note}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={handleNext} 
                  disabled={!formData.industry}
                  className="bg-white text-black font-bold uppercase px-8 py-3 rounded hover:bg-neon-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.booking.next_date}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DATE */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6 text-neon-pink">
                <CalendarIcon size={20} />
                <span className="text-lg font-bold uppercase">{t.booking.step3}</span>
              </div>

              <div className="flex gap-4 mb-6">
                <button className="flex-1 py-3 border border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">{t.booking.today}</button>
                <button className="flex-1 py-3 border border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider hover:border-white hover:text-white transition-colors">{t.booking.tomorrow}</button>
              </div>

              {/* Calendar Grid Mockup */}
              <div className="border-t border-b border-zinc-800 py-4 mb-6">
                 <div className="flex justify-between items-center mb-4 px-2">
                    <button><ChevronLeft size={20} className="text-zinc-500 hover:text-white"/></button>
                    <span className="text-white font-bold uppercase tracking-widest">Feb 2025</span>
                    <button><ChevronRight size={20} className="text-zinc-500 hover:text-white"/></button>
                 </div>
                 
                 <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-zinc-600 font-bold">
                    {weekDays.map(d => <div key={d}>{d}</div>)}
                 </div>
                 <div className="grid grid-cols-7 gap-2 text-center">
                    {days.map(d => (
                        <button 
                            key={d} 
                            onClick={() => updateData('date', `Feb ${d}, 2025`)}
                            className={`h-10 w-10 mx-auto flex items-center justify-center rounded transition-all hover:bg-neon-pink/20 hover:text-neon-pink ${
                                formData.date === `Feb ${d}, 2025` 
                                ? 'border border-neon-pink text-neon-pink font-bold shadow-[0_0_10px_rgba(255,0,255,0.5)]' 
                                : 'text-zinc-400'
                            }`}
                        >
                            {d}
                        </button>
                    ))}
                 </div>
              </div>

              {/* Time Selection if date selected */}
              {formData.date && (
                  <div className="animate-in slide-in-from-bottom-2 fade-in">
                      <h4 className="text-white text-sm uppercase mb-3 font-bold">{t.booking.available_times}</h4>
                      <div className="flex flex-wrap gap-3">
                          {['10:00', '11:30', '14:00', '16:30'].map(time => (
                              <button
                                key={time}
                                onClick={() => {
                                    updateData('time', time);
                                    handleNext();
                                }}
                                className={`px-4 py-2 border rounded text-sm font-bold hover:border-neon-pink hover:text-white transition-colors ${
                                    formData.time === time ? 'border-neon-pink text-neon-pink bg-neon-pink/10' : 'border-zinc-800 text-zinc-500'
                                }`}
                              >
                                  {time}
                              </button>
                          ))}
                      </div>
                  </div>
              )}
            </div>
          )}

           {/* STEP 4: CONTACT INFO */}
           {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 mb-6 text-neon-pink">
                <Check size={20} />
                <span className="text-lg font-bold uppercase">{t.booking.step4}</span>
              </div>

              <div className="space-y-4 max-w-md">
                 <div>
                    <label className="block text-zinc-500 text-xs uppercase font-bold mb-2">{t.booking.name_label}</label>
                    <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateData('name', e.target.value)}
                        className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all"
                        placeholder="Name"
                    />
                 </div>
                 <div>
                    <label className="block text-zinc-500 text-xs uppercase font-bold mb-2">{t.booking.email_label}</label>
                    <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => updateData('email', e.target.value)}
                        className="w-full bg-black border border-zinc-700 p-3 text-white focus:border-neon-pink focus:outline-none focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all"
                        placeholder="email@example.com"
                    />
                 </div>
                 
                 <div className="pt-4">
                     <button 
                       onClick={handleSubmit}
                       className="w-full bg-neon-pink text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                     >
                        {t.booking.submit_btn}
                     </button>
                 </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR - SUMMARY */}
        <div className="w-full lg:w-[350px] border-2 border-neon-pink rounded-xl bg-black p-6 relative shadow-[0_0_20px_rgba(255,0,255,0.15)] flex flex-col">
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)] transition-all duration-500 ease-out"
                    style={{ width: getProgressWidth() }}
                ></div>
            </div>
            <p className="text-right text-xs text-zinc-500 mt-2 font-mono uppercase">Step {step} of 4</p>
          </div>

          <h3 className="text-white text-xl font-bold uppercase tracking-wider mb-6 pb-4 border-b border-white/10">
            {t.booking.summary_title}
          </h3>

          <div className="space-y-6 flex-1">
            <div className="group">
                <div className="flex items-center gap-3 text-zinc-500 mb-1">
                    <Monitor size={16} />
                    <span className="text-xs font-bold uppercase">{t.booking.project_label}</span>
                </div>
                <div className={`text-lg font-medium ${formData.projectType ? 'text-white' : 'text-zinc-700'}`}>
                    {formData.projectType || '---'}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 text-zinc-500 mb-1">
                    <Store size={16} />
                    <span className="text-xs font-bold uppercase">{t.booking.industry_sum_label}</span>
                </div>
                <div className={`text-lg font-medium ${formData.industry ? 'text-neon-blue' : 'text-zinc-700'}`}>
                    {formData.industry || '---'}
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 text-zinc-500 mb-1">
                    <Users size={16} />
                    <span className="text-xs font-bold uppercase">{t.booking.count_sum_label}</span>
                </div>
                <div className={`text-2xl font-bold font-tech ${formData.machineCount > 0 ? 'text-neon-pink' : 'text-zinc-700'}`}>
                    {formData.machineCount}
                </div>
            </div>

            {wishlist.length > 0 && (
              <div className="bg-zinc-900/50 p-3 rounded border border-zinc-800">
                <div className="flex items-center gap-2 text-neon-pink mb-1">
                    <Heart size={14} className="fill-current" />
                    <span className="text-xs font-bold uppercase">{t.booking.wishlist_label}</span>
                </div>
                <div className="text-white text-sm">
                   {wishlist.length} {t.booking.machines_selected}
                </div>
              </div>
            )}

            <div className="border-t border-zinc-800 pt-4 mt-2">
                <div className="flex items-center gap-3 text-zinc-500 mb-1">
                    <CalendarIcon size={16} />
                    <span className="text-xs font-bold uppercase">{t.booking.date_sum_label}</span>
                </div>
                <div className={`text-sm ${formData.date ? 'text-white' : 'text-zinc-700'}`}>
                    {formData.date ? `${formData.date}, ${formData.time}` : '---'}
                </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex justify-between items-end">
                <span className="text-zinc-500 text-xs font-bold uppercase">{t.booking.free}</span>
                <span className="text-neon-pink text-xl font-bold drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">€0.00</span>
            </div>
            
            {step < 4 && (
                <button 
                    onClick={handleNext}
                    disabled={step === 2 && !formData.industry}
                    className="w-full mt-6 bg-zinc-800 text-white font-bold uppercase py-3 border border-zinc-700 hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t.booking.next_btn}
                </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingWizard;
