import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="testimonials" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-16 tracking-tight">
          {t.testimonials.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((testimonial, index) => (
            <div key={index} className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-8 flex flex-col h-full hover:border-neon-blue/40 transition-colors duration-300 relative group">
              
              {/* Header: Avatar + Info + Quote Icon */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder with Initials */}
                  <div className="w-12 h-12 rounded-full bg-zinc-800 shrink-0 flex items-center justify-center text-neon-blue font-bold border border-white/5 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">{testimonial.name}</h4>
                    <p className="text-zinc-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                {/* Neon Quote Icon */}
                <Quote size={24} className="text-neon-blue rotate-180 fill-neon-blue/10" />
              </div>
              
              {/* Testimonial Text */}
              <div className="flex-grow">
                <p className="text-zinc-300 text-base leading-relaxed mb-8 group-hover:text-white transition-colors">
                  "{testimonial.text}"
                </p>
              </div>

              {/* 5 Stars */}
              <div className="flex gap-1.5 mt-auto">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} className="text-neon-pink fill-neon-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.4)]" />
                ))}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
