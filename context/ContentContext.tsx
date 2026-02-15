import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, Machine } from '../types';
import { MACHINES } from '../constants';

// Default Initial Content
const defaultContent: SiteContent = {
  hero: {
    titleLine1: "MEHR UMSATZ.",
    titleLine2: "WENIG AUFWAND.",
    subtitle: "Verwandle ungenutzte Fläche in pures Geld. Wir bieten hoch-profitable Automatenlösungen für Kioske, Tankstellen, Gastronomie, Freizeitparks und viele mehr.",
    bgImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop"
  },
  about: {
    titleLine1: "Entertainment",
    titleLine2: "Next Level.",
    description: "Bei K&L Entertainment Systems verstehen wir Gaming nicht nur als Zeitvertreib, sondern als Business. Wir sind dein Partner für High-End Arcade-Lösungen – von der einzelnen \"Cash-Cow\" Maschine bis zum kompletten Entertainment-Center.",
    mainImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    badgeTitle: "K&L Entertainment Systems",
    badgeSubtitle: "Seit 2015",
    feature1Title: "Premium Hardware",
    feature1Text: "Nur Top-Marken und bewährte Systeme. Keine billigen Kopien, sondern langlebige Assets.",
    feature2Title: "Full Service",
    feature2Text: "Import, Aufbau, Wartung und Ersatzteile. Wir kümmern uns um die Technik, du dich um die Gäste."
  },
  machines: MACHINES
};

interface ContentContextType {
  content: SiteContent;
  updateHero: (data: Partial<SiteContent['hero']>) => void;
  updateAbout: (data: Partial<SiteContent['about']>) => void;
  updateMachine: (id: number, data: Partial<Machine>) => void;
  addMachine: (machine: Machine) => void;
  deleteMachine: (id: number) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('site_content_v3'); // Version incremented to force update
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('site_content_v3', JSON.stringify(content));
  }, [content]);

  const updateHero = (data: Partial<SiteContent['hero']>) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, ...data } }));
  };

  const updateAbout = (data: Partial<SiteContent['about']>) => {
    setContent(prev => ({ ...prev, about: { ...prev.about, ...data } }));
  };

  const updateMachine = (id: number, data: Partial<Machine>) => {
    setContent(prev => ({
      ...prev,
      machines: prev.machines.map(m => m.id === id ? { ...m, ...data } : m)
    }));
  };

  const addMachine = (machine: Machine) => {
    setContent(prev => ({
      ...prev,
      machines: [...prev.machines, machine]
    }));
  };

  const deleteMachine = (id: number) => {
    setContent(prev => ({
      ...prev,
      machines: prev.machines.filter(m => m.id !== id)
    }));
  };

  const resetContent = () => {
    if (window.confirm("Sind Sie sicher? Alle Änderungen werden auf Standard zurückgesetzt.")) {
      setContent(defaultContent);
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateHero, 
      updateAbout, 
      updateMachine, 
      addMachine, 
      deleteMachine,
      resetContent 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
