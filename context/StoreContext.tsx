import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';

interface StoreContextType {
  user: UserProfile | null;
  wishlist: number[];
  wishlistNotes: Record<number, string>;
  isAuthModalOpen: boolean;
  isDashboardOpen: boolean;
  login: (name: string, email: string, company?: string) => void;
  logout: () => void;
  toggleWishlist: (machineId: number) => void;
  updateWishlistNote: (machineId: number, note: string) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openDashboard: () => void;
  closeDashboard: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistNotes, setWishlistNotes] = useState<Record<number, string>>({});
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const login = (name: string, email: string, company?: string) => {
    setUser({ name, email, company });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setWishlist([]);
    setWishlistNotes({});
    setIsDashboardOpen(false);
  };

  const toggleWishlist = (machineId: number) => {
    // If user is not logged in, trigger auth flow
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    setWishlist(prev => {
      if (prev.includes(machineId)) {
        // Optional: Clean up note if item is removed
        const newNotes = { ...wishlistNotes };
        delete newNotes[machineId];
        setWishlistNotes(newNotes);
        
        return prev.filter(id => id !== machineId);
      } else {
        return [...prev, machineId];
      }
    });
  };

  const updateWishlistNote = (machineId: number, note: string) => {
    setWishlistNotes(prev => ({
        ...prev,
        [machineId]: note
    }));
  };

  return (
    <StoreContext.Provider 
      value={{ 
        user, 
        wishlist, 
        wishlistNotes,
        isAuthModalOpen,
        isDashboardOpen,
        login, 
        logout, 
        toggleWishlist,
        updateWishlistNote,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        openDashboard: () => setIsDashboardOpen(true),
        closeDashboard: () => setIsDashboardOpen(false)
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
