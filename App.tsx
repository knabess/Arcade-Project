import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import MachineShowcase from './components/MachineShowcase';
import Process from './components/Process';
import BusinessSelection from './components/BusinessSelection';
import Testimonials from './components/Testimonials';
import Services from './components/Services'; 
import Shop from './components/Shop'; 
import ProductDetail from './components/ProductDetail'; 
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { NavigationItem, Machine } from './types';
import { StoreProvider } from './context/StoreContext';
import { ContentProvider } from './context/ContentContext';
import { LanguageProvider } from './context/LanguageContext';

type View = 'home' | 'shop' | 'product-detail';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavigationItem>(NavigationItem.ABOUT);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  const handleNavigation = (target: NavigationItem | 'process' | 'portfolio' | 'machines' | 'shop' | 'home') => {
    
    // Check if target is 'machines' (from nav) -> Go to Shop Page
    if (target === 'machines') {
      setCurrentView('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If currently on Shop or Detail page and clicking Home/About/Contact
    if (currentView !== 'home') {
       if (target === 'home' || target === NavigationItem.ABOUT || target === NavigationItem.CONTACT || target === 'process') {
         setCurrentView('home');
         // Small timeout to allow render before scrolling
         setTimeout(() => {
            scrollToElement(target);
         }, 100);
         return;
       }
    }

    // Default Home Page Scrolling behavior
    if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToElement(target);
    }
  };

  const scrollToElement = (target: string) => {
    let elementId = target;
    if (target === NavigationItem.WORK) elementId = 'work';
    if (target === NavigationItem.TEAM) elementId = 'team';
    
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductClick = (machine: Machine) => {
    setSelectedMachine(machine);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setCurrentView('shop');
  };

  return (
    <StoreProvider>
      <ContentProvider>
        <LanguageProvider>
          <div className="bg-background min-h-screen text-white font-sans selection:bg-indigo-500 selection:text-white">
            <Navigation onNavigate={handleNavigation} activeSection={activeSection} />
            
            <main>
              {currentView === 'home' && (
                <>
                  <Hero onScrollDown={() => handleNavigation(NavigationItem.CONTACT)} />
                  <About />
                  <MachineShowcase />
                  
                  <div className="py-12 flex justify-center bg-background border-t border-zinc-900">
                      <button 
                        onClick={() => handleNavigation('machines')}
                        className="text-neon-blue border border-neon-blue px-8 py-4 rounded-lg font-bold uppercase hover:bg-neon-blue hover:text-black transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                      >
                        Alle Maschinen anzeigen (Shop)
                      </button>
                  </div>

                  <div id="process">
                     <BusinessSelection />
                     <Process />
                  </div>
                  
                  <Testimonials />
                  <Contact />
                </>
              )}

              {currentView === 'shop' && (
                <Shop onProductClick={handleProductClick} />
              )}

              {currentView === 'product-detail' && selectedMachine && (
                <ProductDetail machine={selectedMachine} onBack={handleBackToShop} />
              )}
            </main>

            <ChatWidget />
            <AuthModal />
            <UserDashboard />
            <AdminDashboard />
          </div>
        </LanguageProvider>
      </ContentProvider>
    </StoreProvider>
  );
};

export default App;
