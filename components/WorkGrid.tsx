import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const WorkGrid: React.FC = () => {
  return (
    <section id="work" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">SELECTED WORKS</h2>
            <p className="text-zinc-400">Curated digital experiences 2023-2024</p>
          </div>
          <a href="#" className="text-white border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors">View Archive</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative ${index === 1 || index === 4 ? 'md:translate-y-24' : ''}`}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-surface border border-white/5">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {/* Hover Overlay Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end">
                    <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                      <ArrowUpRight size={24} />
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-zinc-300 transition-colors">{project.title}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded border border-white/10 text-xs text-zinc-400 uppercase tracking-wide">{project.category}</span>
                  </div>
                </div>
                <span className="text-zinc-600 font-mono text-sm">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;