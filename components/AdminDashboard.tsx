import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useStore } from '../context/StoreContext';
import { 
  LayoutDashboard, 
  Package, 
  Store, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Save, 
  ChevronLeft, 
  ExternalLink,
  Trash2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Machine } from '../types';

type ViewState = 'dashboard' | 'products' | 'content' | 'settings';
type ProductViewState = 'list' | 'edit' | 'create';

const AdminDashboard: React.FC = () => {
  const { isDashboardOpen, closeDashboard, user, logout } = useStore();
  const { content, updateHero, updateAbout, updateMachine, deleteMachine, addMachine, resetContent } = useContent();
  
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [productView, setProductView] = useState<ProductViewState>('list');
  const [selectedMachineId, setSelectedMachineId] = useState<number | null>(null);
  
  // Temporary state for the machine being edited
  const [editingMachine, setEditingMachine] = useState<Partial<Machine>>({});

  // Auth Check
  const isAdmin = user?.company?.includes('Admin') || user?.name?.includes('Demo');
  if (!isDashboardOpen || !isAdmin) return null;

  // Handlers
  const handleEditMachine = (machine: Machine) => {
    setEditingMachine({ ...machine });
    setSelectedMachineId(machine.id);
    setProductView('edit');
  };

  const handleCreateMachine = () => {
    setEditingMachine({
      id: Date.now(),
      title: '',
      category: 'Arcade',
      manufacturer: '',
      available: true,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      players: 1,
      tags: [],
      videoUrl: '',
      price: 0,
      description: '',
      revenue: ''
    });
    setProductView('create');
  };

  const saveMachine = () => {
    if (productView === 'create' && editingMachine.title) {
      addMachine(editingMachine as Machine);
    } else if (productView === 'edit' && selectedMachineId) {
      updateMachine(selectedMachineId, editingMachine);
    }
    setProductView('list');
  };

  const handleDeleteMachine = () => {
      if (selectedMachineId && window.confirm("Möchtest du dieses Produkt wirklich löschen?")) {
          deleteMachine(selectedMachineId);
          setProductView('list');
      }
  };

  // Tag helper
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t !== '');
      setEditingMachine({...editingMachine, tags});
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f1f1f1] flex font-sans text-zinc-900">
      
      {/* SIDEBAR (Shopify Style) */}
      <aside className="w-64 bg-[#1a1a1a] text-[#e3e3e3] flex flex-col border-r border-zinc-800 shrink-0">
        <div className="h-14 flex items-center px-4 border-b border-zinc-800 bg-[#1a1a1a]">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neon-pink flex items-center justify-center font-bold text-black text-xs">K</div>
              <span className="font-bold text-sm tracking-wide">K&L Admin</span>
           </div>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          <NavItem 
            active={activeView === 'dashboard'} 
            onClick={() => setActiveView('dashboard')} 
            icon={LayoutDashboard} 
            label="Home" 
          />
          <NavItem 
            active={activeView === 'products'} 
            onClick={() => { setActiveView('products'); setProductView('list'); }} 
            icon={Package} 
            label="Produkte" 
          />
          <NavItem 
            active={activeView === 'content'} 
            onClick={() => setActiveView('content')} 
            icon={Store} 
            label="Online Store" 
          />
          <NavItem 
            active={activeView === 'settings'} 
            onClick={() => setActiveView('settings')} 
            icon={Settings} 
            label="Einstellungen" 
          />
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button 
             onClick={closeDashboard}
             className="flex items-center gap-3 text-zinc-400 hover:text-white transition w-full px-2 py-2 rounded mb-2"
          >
             <ExternalLink size={16} />
             <span className="text-sm">Store ansehen</span>
          </button>
          <button 
            onClick={() => { closeDashboard(); logout(); }}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition w-full px-2 py-2 rounded"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f6f7]">
        
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-6 shrink-0">
           <div className="flex items-center bg-[#f1f2f3] rounded px-3 py-1.5 w-96 border border-zinc-300">
              <Search size={16} className="text-zinc-500 mr-2" />
              <input type="text" placeholder="Suche" className="bg-transparent border-none outline-none text-sm w-full placeholder-zinc-500" />
           </div>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                 {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
           </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 max-w-6xl mx-auto w-full">
            
            {/* --- DASHBOARD VIEW --- */}
            {activeView === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                 <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DashboardCard title="Aktive Maschinen" value={content.machines.filter(m => m.available).length.toString()} />
                    <DashboardCard title="Gesamtwert Inventar" value={`€${content.machines.reduce((acc, m) => acc + (m.price || 0), 0).toLocaleString()}`} />
                    <DashboardCard title="Anzahl Produkte" value={content.machines.length.toString()} />
                 </div>

                 <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-6">
                    <h3 className="font-bold text-sm uppercase text-zinc-500 mb-4">Schnellzugriff</h3>
                    <div className="flex gap-4">
                        <button onClick={() => { setActiveView('products'); handleCreateMachine(); }} className="bg-zinc-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-zinc-800">
                           Produkt hinzufügen
                        </button>
                        <button onClick={() => setActiveView('content')} className="bg-white border border-zinc-300 text-zinc-700 px-4 py-2 rounded text-sm font-medium hover:bg-zinc-50">
                           Startseite bearbeiten
                        </button>
                    </div>
                 </div>
              </div>
            )}

            {/* --- PRODUCTS VIEW --- */}
            {activeView === 'products' && (
               <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Product List */}
                  {productView === 'list' && (
                    <>
                      <div className="flex justify-between items-center">
                         <h1 className="text-2xl font-bold text-zinc-900">Produkte</h1>
                         <button 
                            onClick={handleCreateMachine}
                            className="bg-zinc-900 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 hover:bg-zinc-800"
                         >
                            <Plus size={16} /> Produkt hinzufügen
                         </button>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
                          <table className="w-full text-left border-collapse">
                             <thead className="bg-zinc-50 border-b border-zinc-200">
                                <tr>
                                   <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider w-16">Bild</th>
                                   <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Titel</th>
                                   <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                                   <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Preis</th>
                                   <th className="px-6 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">Kategorie</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-zinc-200">
                                {content.machines.map(machine => (
                                   <tr 
                                      key={machine.id} 
                                      onClick={() => handleEditMachine(machine)}
                                      className="hover:bg-zinc-50 cursor-pointer transition-colors"
                                   >
                                      <td className="px-6 py-3">
                                         <div className="w-10 h-10 rounded bg-zinc-100 border border-zinc-200 overflow-hidden">
                                            <img src={machine.image} alt="" className="w-full h-full object-cover" />
                                         </div>
                                      </td>
                                      <td className="px-6 py-3 font-medium text-sm text-zinc-900">{machine.title}</td>
                                      <td className="px-6 py-3">
                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            machine.available 
                                              ? 'bg-green-100 text-green-800' 
                                              : 'bg-zinc-100 text-zinc-800'
                                         }`}>
                                            {machine.available ? 'Active' : 'Draft'}
                                         </span>
                                      </td>
                                      <td className="px-6 py-3 text-sm text-zinc-600">
                                        €{(machine.price || 0).toLocaleString()}
                                      </td>
                                      <td className="px-6 py-3 text-sm text-zinc-500">{machine.category}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                      </div>
                    </>
                  )}

                  {/* Product Edit / Create */}
                  {(productView === 'edit' || productView === 'create') && (
                     <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                           <button onClick={() => setProductView('list')} className="p-2 hover:bg-zinc-200 rounded text-zinc-500">
                              <ChevronLeft size={20} />
                           </button>
                           <h1 className="text-xl font-bold text-zinc-900">
                              {productView === 'create' ? 'Neues Produkt' : editingMachine.title}
                           </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                           
                           {/* Left Column (Main Info) */}
                           <div className="lg:col-span-2 space-y-6">
                              <Card>
                                 <FormItem label="Titel">
                                    <input 
                                       type="text" 
                                       value={editingMachine.title} 
                                       onChange={(e) => setEditingMachine({...editingMachine, title: e.target.value})}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                    />
                                 </FormItem>
                                 <FormItem label="Beschreibung">
                                    <textarea 
                                       value={editingMachine.description || ''} 
                                       onChange={(e) => setEditingMachine({...editingMachine, description: e.target.value})}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none h-32 resize-none"
                                       placeholder="Detaillierte Produktbeschreibung..."
                                    />
                                 </FormItem>
                              </Card>

                              <Card title="Medien">
                                 <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                                     <div className="w-32 h-32 bg-zinc-100 rounded mb-4 overflow-hidden relative">
                                        {editingMachine.image ? (
                                           <img src={editingMachine.image} className="w-full h-full object-cover" />
                                        ) : (
                                           <ImageIcon className="text-zinc-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                     </div>
                                     <FormItem label="Bild URL">
                                       <input 
                                          type="text" 
                                          value={editingMachine.image} 
                                          onChange={(e) => setEditingMachine({...editingMachine, image: e.target.value})}
                                          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                          placeholder="https://..."
                                       />
                                     </FormItem>
                                 </div>
                              </Card>

                              <Card title="Video">
                                  <FormItem label="YouTube Embed URL">
                                       <input 
                                          type="text" 
                                          value={editingMachine.videoUrl} 
                                          onChange={(e) => setEditingMachine({...editingMachine, videoUrl: e.target.value})}
                                          className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                          placeholder="https://www.youtube.com/embed/..."
                                       />
                                       <p className="text-xs text-zinc-500 mt-1">Muss ein Embed-Link sein.</p>
                                     </FormItem>
                              </Card>
                           </div>

                           {/* Right Column (Status & Organization) */}
                           <div className="space-y-6">
                              <Card title="Status">
                                 <select 
                                    value={editingMachine.available ? 'active' : 'draft'}
                                    onChange={(e) => setEditingMachine({...editingMachine, available: e.target.value === 'active'})}
                                    className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                 >
                                    <option value="active">Aktiv</option>
                                    <option value="draft">Entwurf</option>
                                 </select>
                              </Card>

                              <Card title="Preisgestaltung & Umsatz">
                                 <FormItem label="Preis (€)">
                                    <input 
                                       type="number" 
                                       value={editingMachine.price} 
                                       onChange={(e) => setEditingMachine({...editingMachine, price: parseFloat(e.target.value)})}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                    />
                                 </FormItem>
                                 <FormItem label="Geschätzter Umsatz (Text)">
                                    <input 
                                       type="text" 
                                       value={editingMachine.revenue || ''} 
                                       onChange={(e) => setEditingMachine({...editingMachine, revenue: e.target.value})}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                       placeholder="z.B. €3.200 / Monat"
                                    />
                                 </FormItem>
                              </Card>

                              <Card title="Organisation">
                                 <FormItem label="Kategorie">
                                    <input 
                                       type="text" 
                                       value={editingMachine.category} 
                                       onChange={(e) => setEditingMachine({...editingMachine, category: e.target.value})}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                    />
                                 </FormItem>
                                 <FormItem label="Hersteller">
                                    <input 
                                       type="text" 
                                       value={editingMachine.manufacturer} 
                                       onChange={(e) => setEditingMachine({...editingMachine, manufacturer: e.target.value})}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                    />
                                 </FormItem>
                                 <FormItem label="Spieler Anzahl">
                                    <input 
                                       type="number" 
                                       value={editingMachine.players} 
                                       onChange={(e) => setEditingMachine({...editingMachine, players: parseInt(e.target.value)})}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                    />
                                 </FormItem>
                                 <FormItem label="Tags (Kommagetrennt)">
                                    <input 
                                       type="text" 
                                       value={editingMachine.tags?.join(', ') || ''} 
                                       onChange={handleTagsChange}
                                       className="w-full border border-zinc-300 rounded px-3 py-2 text-sm focus:border-zinc-500 focus:ring-0 outline-none"
                                       placeholder="Bestseller, Neu, VR..."
                                    />
                                 </FormItem>
                              </Card>
                           </div>

                        </div>

                        {/* Footer Actions */}
                        <div className="border-t border-zinc-200 pt-4 flex justify-between items-center">
                           {productView === 'edit' && (
                              <button 
                                 onClick={handleDeleteMachine}
                                 className="text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 rounded text-sm font-medium flex items-center gap-2"
                              >
                                 <Trash2 size={16} /> Produkt löschen
                              </button>
                           )}
                           <div className="flex gap-4 ml-auto">
                              <button onClick={() => setProductView('list')} className="px-4 py-2 text-sm text-zinc-600 font-medium hover:bg-zinc-100 rounded">Abbrechen</button>
                              <button onClick={saveMachine} className="bg-zinc-900 text-white px-6 py-2 rounded text-sm font-medium hover:bg-zinc-800 flex items-center gap-2">
                                 <Save size={16} /> Speichern
                              </button>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* --- ONLINE STORE CONTENT VIEW --- */}
            {activeView === 'content' && (
               <div className="space-y-6 animate-in fade-in duration-300">
                  <h1 className="text-2xl font-bold text-zinc-900">Online Store Preferences</h1>
                  <p className="text-zinc-500">Bearbeite hier die Texte und Bilder der Startseite.</p>

                  <div className="border-b border-zinc-200 pb-8">
                     <h2 className="text-lg font-bold text-zinc-900 mb-4">Hero Section</h2>
                     <Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <FormItem label="Titel Zeile 1">
                              <input 
                                 value={content.hero.titleLine1}
                                 onChange={(e) => updateHero({ titleLine1: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
                              />
                           </FormItem>
                           <FormItem label="Titel Zeile 2">
                              <input 
                                 value={content.hero.titleLine2}
                                 onChange={(e) => updateHero({ titleLine2: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
                              />
                           </FormItem>
                        </div>
                        <FormItem label="Untertitel">
                           <textarea 
                                 value={content.hero.subtitle}
                                 onChange={(e) => updateHero({ subtitle: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm h-24"
                              />
                        </FormItem>
                        <FormItem label="Hintergrundbild URL">
                           <input 
                                 value={content.hero.bgImage}
                                 onChange={(e) => updateHero({ bgImage: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
                              />
                        </FormItem>
                     </Card>
                  </div>

                  <div className="pb-8">
                     <h2 className="text-lg font-bold text-zinc-900 mb-4">Über Uns Section</h2>
                     <Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <FormItem label="Titel Zeile 1">
                              <input 
                                 value={content.about.titleLine1}
                                 onChange={(e) => updateAbout({ titleLine1: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
                              />
                           </FormItem>
                           <FormItem label="Titel Zeile 2">
                              <input 
                                 value={content.about.titleLine2}
                                 onChange={(e) => updateAbout({ titleLine2: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
                              />
                           </FormItem>
                        </div>
                        <FormItem label="Beschreibung">
                           <textarea 
                                 value={content.about.description}
                                 onChange={(e) => updateAbout({ description: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm h-32"
                              />
                        </FormItem>
                        <FormItem label="Hauptbild URL">
                           <input 
                                 value={content.about.mainImage}
                                 onChange={(e) => updateAbout({ mainImage: e.target.value })}
                                 className="w-full border border-zinc-300 rounded px-3 py-2 text-sm"
                              />
                        </FormItem>
                     </Card>
                  </div>
               </div>
            )}

            {/* --- SETTINGS VIEW --- */}
            {activeView === 'settings' && (
               <div className="space-y-6 animate-in fade-in duration-300">
                  <h1 className="text-2xl font-bold text-zinc-900">Einstellungen</h1>
                  <Card>
                     <div className="flex items-center justify-between">
                        <div>
                           <h3 className="font-bold text-sm text-zinc-900">Inhalte zurücksetzen</h3>
                           <p className="text-sm text-zinc-500">Setzt alle Texte und Produkte auf den Auslieferungszustand zurück.</p>
                        </div>
                        <button onClick={resetContent} className="border border-zinc-300 bg-white px-4 py-2 rounded text-sm hover:bg-zinc-50 font-medium">
                           Auf Standard zurücksetzen
                        </button>
                     </div>
                  </Card>
               </div>
            )}

        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.FC<any>; label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${
      active 
        ? 'bg-[#303030] text-white' 
        : 'text-[#a1a1a1] hover:bg-[#252525] hover:text-white'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-5">
    {title && <h3 className="font-bold text-sm text-zinc-900 mb-4">{title}</h3>}
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const FormItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-zinc-700">{label}</label>
    {children}
  </div>
);

const DashboardCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
     <h3 className="text-sm font-medium text-zinc-500">{title}</h3>
     <p className="text-2xl font-bold text-zinc-900 mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
