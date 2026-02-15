import React from 'react';
import { X, PlayCircle } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null;
  title?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen || !videoUrl) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-black border-2 border-neon-blue/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.15)] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-zinc-900/50 border-b border-white/5">
          <div className="flex items-center gap-2 text-neon-blue">
            <PlayCircle size={20} />
            <span className="font-tech font-bold uppercase tracking-wider text-sm sm:text-base truncate">
              {title || 'Gameplay Preview'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Video Player (Responsive Aspect Ratio) */}
        <div className="relative aspect-video bg-black">
          <iframe 
            src={`${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&modestbranding=1&rel=0`} 
            title="Gameplay Video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
