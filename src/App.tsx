import React, { useState, useEffect } from 'react';
import { 
  Utensils, Wine, Briefcase, Lock, Mail, ShieldCheck, 
  FileText, Code, Settings, LogOut, Check, 
  Copy, Edit3, Plus, Trash2, Search, Sparkles, AlertCircle, Eye, RefreshCw, CheckCircle2,
  ArrowUp, ArrowDown, Star, AlertTriangle, BookOpen, Users, ChevronRight, Menu as MenuIcon, X, GripVertical, PlusCircle, Printer,
  EyeOff, Key, Power, Layers, FolderPlus
} from 'lucide-react';
export default function App() {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isEmbed = urlParams ? (urlParams.get('embed') === '1' || urlParams.get('embed') === 'true') : false;
  const initialMenuKey = urlParams ? (urlParams.get('menu') || 'alla_carta') : 'alla_carta';
  const [activeTab, setActiveTab] = useState<'frontend' | 'admin'>('frontend');
  const [adminSection, setAdminSection] = useState<'menus' | 'users' | 'new_menu' | 'embeds' | 'ai_upload'>('menus');
  const [selectedMenuType, setSelectedMenuType] = useState<string>(initialMenuKey);
  const [menusData, setMenusData] = useState<any>(null);
  const [allergensList, setAllergensList] = useState<any[]>([]);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllergensModal, setShowAllergensModal] = useState(false);
  const [showPdfExportModal, setShowPdfExportModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<{ catIndex: number; itemIndex: number } | null>(null);

  // Admin auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [authStep, setAuthStep] = useState<'login' | '2fa' | 'dashboard'>('login');
  const [loginUsername, setLoginUsername] = useState('assistenza@arimediagroup.it');
  const [loginPassword, setLoginPassword] = useState('?wef#cZJ*hCN^~aY');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [authError, setAuthError] = useState('');

  // AI document parser state
  const [aiDocText, setAiDocText] = useState('');
  const [aiDocLoading, setAiDocLoading] = useState(false);
  const [aiDocSuccess, setAiDocSuccess] = useState('');

  // Admin edit states
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const [copiedEmbed, setCopiedEmbed] = useState<string | null>(null);
  const [phpExportData, setPhpExportData] = useState<any>(null);

  // New menu form state
  const [newMenuKey, setNewMenuKey] = useState('');
  const [newMenuTitle, setNewMenuTitle] = useState('');
  const [newMenuSlug, setNewMenuSlug] = useState('');

  // New user form state with password & auto-generation
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Gestore');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/menus');
      const data = await res.json();
      setMenusData(data.menus);
      setAllergensList(data.allergens);
      setAdminUsers(data.users || []);
      const menuToSelect = (data.menus && data.menus[initialMenuKey]) ? initialMenuKey : (data.menus && Object.keys(data.menus)[0] ? Object.keys(data.menus)[0] : 'alla_carta');
      setSelectedMenuType(menuToSelect);
      if (data.menus && data.menus[menuToSelect]) {
        setEditingMenu(JSON.parse(JSON.stringify(data.menus[menuToSelect])));
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAuthStep('2fa');
      } else {
        setAuthError(data.error || 'Credenziali non valide');
      }
    } catch (err) {
      setAuthError('Errore di connessione al server');
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: twoFactorCode })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminLoggedIn(true);
        setAuthStep('dashboard');
        fetchPhpExport();
      } else {
        setAuthError(data.error || 'Codice 2FA errato');
      }
    } catch (err) {
      setAuthError('Errore durante la verifica');
    }
  };

  const fetchPhpExport = async () => {
    try {
      const res = await fetch('/api/export-php');
      const data = await res.json();
      if (data.success) setPhpExportData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMenuChanges = async () => {
    try {
      const res = await fetch(`/api/menus/${selectedMenuType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMenu)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('Menù aggiornato con successo sul database MySQL!');
        fetchData();
      } else {
        alert('Errore nel salvataggio: ' + (data.error || ''));
      }
    } catch (err) {
      alert('Errore di connessione.');
    }
  };

  const handleCreateNewMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuKey || !newMenuTitle || !newMenuSlug) {
      alert('Tutti i campi sono obbligatori.');
      return;
    }
    try {
      const res = await fetch('/api/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newMenuKey, title: newMenuTitle, slug: newMenuSlug })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('Nuovo menù creato con successo!');
        setMenusData(data.menus);
        setSelectedMenuType(newMenuKey);
        setEditingMenu(data.menus[newMenuKey]);
        setNewMenuKey('');
        setNewMenuTitle('');
        setNewMenuSlug('');
        setAdminSection('menus');
      } else {
        alert('Errore: ' + data.error);
      }
    } catch (err) {
      alert('Errore di connessione.');
    }
  };

  const handleAiParseMenu = async () => {
    if (!aiDocText.trim()) {
      alert('Inserisci il testo estratto o incolla il contenuto del PDF/Word del menù.');
      return;
    }
    setAiDocLoading(true);
    setAiDocSuccess('');
    try {
      const res = await fetch('/api/ai/parse-menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileContent: aiDocText, menuType: selectedMenuType })
      });
      const data = await res.json();
      if (res.ok && data.success && data.menu) {
        setEditingMenu(data.menu);
        setAiDocSuccess('Documento analizzato e strutturato con successo! I piatti sono stati caricati nell\'editor.');
        setAdminSection('menus');
      } else {
        alert('Errore AI: ' + (data.error || 'Impossibile elaborare'));
      }
    } catch (err) {
      alert('Errore di connessione al motore AI.');
    } finally {
      setAiDocLoading(false);
    }
  };

  const handleDeleteMenu = async () => {
    if (!menusData || Object.keys(menusData).length <= 1) {
      alert('Non puoi eliminare l\'unico menù presente nel sistema.');
      return;
    }
    const menuTitle = editingMenu?.title || selectedMenuType;
    if (!confirm(`Sei sicuro di voler eliminare DEFINITIVAMENTE il menù "${menuTitle}"?\n\nQuesta operazione rimuoverà il menù e tutte le sue portate dal database MySQL.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/menus/${selectedMenuType}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(`Menù "${menuTitle}" eliminato con successo!`);
        setMenusData(data.menus);
        const remainingKeys = Object.keys(data.menus);
        if (remainingKeys.length > 0) {
          setSelectedMenuType(remainingKeys[0]);
          setEditingMenu(JSON.parse(JSON.stringify(data.menus[remainingKeys[0]])));
        }
      } else {
        alert('Errore eliminazione: ' + (data.error || 'Impossibile eliminare menù'));
      }
    } catch (err) {
      alert('Errore di connessione durante l\'eliminazione del menù.');
    }
  };

  const handleAddCategory = () => {
    if (!editingMenu) return;
    const newCatId = 'cat_' + Date.now();
    const cats = [...(editingMenu.categories || [])];
    cats.push({
      id: newCatId,
      name: 'Nuova Categoria',
      description: '',
      items: [
        {
          id: 'item_' + Date.now(),
          name: '',
          description: '',
          price: '',
          allergens: [],
          extras: [],
          isFeatured: false
        }
      ]
    });
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const handleDeleteCategory = (catIndex: number) => {
    const catName = editingMenu.categories[catIndex]?.name || 'questa categoria';
    if (!confirm(`Sei sicuro di voler eliminare la categoria "${catName}" e tutti i piatti al suo interno?`)) {
      return;
    }
    const cats = editingMenu.categories.filter((_: any, i: number) => i !== catIndex);
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const moveCategory = (catIndex: number, direction: 'up' | 'down') => {
    const cats = [...editingMenu.categories];
    const targetIndex = direction === 'up' ? catIndex - 1 : catIndex + 1;
    if (targetIndex < 0 || targetIndex >= cats.length) return;
    const temp = cats[catIndex];
    cats[catIndex] = cats[targetIndex];
    cats[targetIndex] = temp;
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const generateRandomPassword = () => {
    const lower = 'abcdefghjkmnpqrstuvwxyz';
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const numbers = '23456789';
    const symbols = '!@#$%&*';
    
    let pwd = 'Pinetina';
    for (let i = 0; i < 2; i++) pwd += upper.charAt(Math.floor(Math.random() * upper.length));
    for (let i = 0; i < 2; i++) pwd += lower.charAt(Math.floor(Math.random() * lower.length));
    pwd += symbols.charAt(Math.floor(Math.random() * symbols.length));
    for (let i = 0; i < 3; i++) pwd += numbers.charAt(Math.floor(Math.random() * numbers.length));
    
    setNewUserPassword(pwd);
    setShowPassword(true);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: newUserName, 
          email: newUserEmail, 
          role: newUserRole,
          password: newUserPassword || undefined
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminUsers(data.users);
        setNewUserName('');
        setNewUserEmail('');
        setNewUserPassword('');
        setCopiedPassword(false);
        alert('Nuovo utente aggiunto con successo con le credenziali impostate!');
      } else {
        alert('Errore: ' + (data.error || 'Impossibile aggiungere utente'));
      }
    } catch (err) {
      alert('Errore aggiunta utente.');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo utente?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminUsers(data.users);
      }
    } catch (err) {
      alert('Errore eliminazione.');
    }
  };

  const moveItem = (catIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    const cats = [...editingMenu.categories];
    const items = [...cats[catIndex].items];
    const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const temp = items[itemIndex];
    items[itemIndex] = items[targetIndex];
    items[targetIndex] = temp;
    cats[catIndex].items = items;
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const handleDragStart = (catIndex: number, itemIndex: number) => {
    setDraggedItem({ catIndex, itemIndex });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetCatIndex: number, targetItemIndex: number) => {
    if (!draggedItem) return;
    const { catIndex: sourceCatIndex, itemIndex: sourceItemIndex } = draggedItem;
    
    const cats = [...editingMenu.categories];
    const sourceItems = [...cats[sourceCatIndex].items];
    const [movedItem] = sourceItems.splice(sourceItemIndex, 1);

    if (sourceCatIndex === targetCatIndex) {
      sourceItems.splice(targetItemIndex, 0, movedItem);
      cats[sourceCatIndex].items = sourceItems;
    } else {
      const targetItems = [...cats[targetCatIndex].items];
      targetItems.splice(targetItemIndex, 0, movedItem);
      cats[sourceCatIndex].items = sourceItems;
      cats[targetCatIndex].items = targetItems;
    }

    setEditingMenu({ ...editingMenu, categories: cats });
    setDraggedItem(null);
  };

  const toggleItemAllergen = (catIndex: number, itemIndex: number, algId: number) => {
    const cats = [...editingMenu.categories];
    const item = cats[catIndex].items[itemIndex];
    if (!item.allergens) item.allergens = [];
    if (item.allergens.includes(algId)) {
      item.allergens = item.allergens.filter((id: number) => id !== algId);
    } else {
      item.allergens = [...item.allergens, algId].sort((a, b) => a - b);
    }
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const addExtraToItem = (catIndex: number, itemIndex: number) => {
    const cats = [...editingMenu.categories];
    const item = cats[catIndex].items[itemIndex];
    if (!item.extras) item.extras = [];
    item.extras.push({ id: 'ex_' + Date.now(), name: '+ Tartufo fresco a consumo', price: '€2,5/g', description: 'in base alla disponibilità del mercato' });
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const updateExtra = (catIndex: number, itemIndex: number, extraIndex: number, field: string, value: string) => {
    const cats = [...editingMenu.categories];
    cats[catIndex].items[itemIndex].extras[extraIndex][field] = value;
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const removeExtra = (catIndex: number, itemIndex: number, extraIndex: number) => {
    const cats = [...editingMenu.categories];
    cats[catIndex].items[itemIndex].extras = cats[catIndex].items[itemIndex].extras.filter((_: any, i: number) => i !== extraIndex);
    setEditingMenu({ ...editingMenu, categories: cats });
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmbed(key);
    setTimeout(() => setCopiedEmbed(null), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="text-center">
          <RefreshCw className="w-10 h-10 animate-spin text-[#27684a] mx-auto mb-4" />
          <h2 className="text-xl font-serif text-[#27684a]">Caricamento Menù Ristorante La Pinetina...</h2>
        </div>
      </div>
    );
  }

  const currentMenu = menusData ? menusData[selectedMenuType] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-[#111827] selection:bg-[#27684a]/20 selection:text-[#27684a]">
      {/* Luxury Header (hidden in embed mode) */}
      {!isEmbed && (
        <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-50 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setActiveTab('frontend')}>
              <img 
                src="https://ristorantelapinetina.it/wp-content/uploads/2026/05/Logo_Green-V.1.svg" 
                alt="Ristorante La Pinetina" 
                className="h-14 w-auto object-contain transition group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#27684a] font-bold block">Ristorante</span>
                <span className="text-2xl font-serif font-bold text-stone-900 tracking-wide">La Pinetina</span>
              </div>
            </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowAllergensModal(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition border border-stone-200/60 shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-[#27684a]" />
              <span>Tabella Allergeni UE</span>
            </button>

            <button
              onClick={() => setActiveTab(activeTab === 'frontend' ? 'admin' : 'frontend')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-semibold transition shadow-md ${
                activeTab === 'admin' 
                  ? 'bg-stone-900 text-white hover:bg-stone-800' 
                  : 'bg-[#27684a] text-white hover:bg-[#1e5239]'
              }`}
            >
              {activeTab === 'frontend' ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Area Riservata Gestore</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Visualizza Menù Pubblico</span>
                </>
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setShowAllergensModal(true)}
              className="p-2.5 rounded-xl bg-stone-100 text-stone-700"
              title="Allergeni"
            >
              <BookOpen className="w-5 h-5 text-[#27684a]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-stone-100 text-stone-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3">
            <button
              onClick={() => { setActiveTab(activeTab === 'frontend' ? 'admin' : 'frontend'); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-[#27684a] text-white rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 shadow-sm"
            >
              {activeTab === 'frontend' ? <Lock className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{activeTab === 'frontend' ? 'Area Riservata Gestore' : 'Visualizza Menù Pubblico'}</span>
            </button>
          </div>
        )}
      </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'frontend' ? (
          <div 
            className="pinetina-menu-frontend-bg min-h-screen"
            style={{
              backgroundImage: 'url(https://ristorantelapinetina.it/wp-content/uploads/2026/05/La-Pinetina_15.jpg)',
              backgroundPosition: 'center center',
              backgroundSize: 'contain',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'repeat',
              position: 'relative',
              paddingTop: '4%',
              paddingBottom: '4%',
            }}
          >
            {!isEmbed && (
              <div className="max-w-4xl mx-auto px-4 mb-8">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200/80 text-center">
                  <span className="text-[#27684a] uppercase tracking-[0.2em] text-xs font-bold block mb-2">Esplora l'Eccellenza Culinaria</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Scegli il Menù Ufficiale</h2>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {menusData && Object.keys(menusData).filter(key => menusData[key].isActive !== false).map((key) => {
                      const m = menusData[key];
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedMenuType(key)}
                          className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center space-x-2.5 shadow-xs cursor-pointer ${
                            selectedMenuType === key 
                              ? 'bg-[#27684a] text-white shadow-md scale-105 ring-2 ring-[#27684a]/30' 
                              : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-300'
                          }`}
                        >
                          <Utensils className="w-4 h-4" />
                          <span>{m.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {currentMenu && currentMenu.isActive === false ? (
              <div className="max-w-2xl mx-auto my-12 px-6 py-12 bg-white/95 backdrop-blur-md rounded-3xl border border-stone-200 text-center shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-xs">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-widest text-[#27684a] font-bold block mb-2">Ristorante La Pinetina</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-3">Menù Temporaneamente Disattivato</h2>
                <p className="text-stone-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Il <strong>{currentMenu.title}</strong> è attualmente disattivato o in fase di revisione da parte della nostra cucina.
                </p>
                {menusData && Object.keys(menusData).some(k => menusData[k].isActive !== false) && (
                  <button
                    onClick={() => {
                      const firstActive = Object.keys(menusData).find(k => menusData[k].isActive !== false);
                      if (firstActive) setSelectedMenuType(firstActive);
                    }}
                    className="px-6 py-3 bg-[#27684a] hover:bg-[#1e5239] text-white rounded-xl font-semibold shadow-md transition cursor-pointer"
                  >
                    Visualizza i Menù Disponibili
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="max-w-4xl mx-auto px-4 sticky top-4 z-40 mb-8">
                  <div className="bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl py-3 px-4 shadow-lg flex items-center space-x-3 overflow-x-auto no-scrollbar">
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-bold shrink-0">Indice Portate:</span>
                    {currentMenu?.categories?.map((cat: any) => (
                      <a
                        key={cat.id}
                        href={`#cat-${cat.id}`}
                        className="text-sm font-medium text-stone-700 hover:text-white hover:bg-[#27684a] whitespace-nowrap px-4 py-2 rounded-xl transition border border-stone-200/80 bg-stone-50 cursor-pointer"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="max-w-4xl mx-auto px-4">
                  <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200/80 text-center mb-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#27684a]"></div>
                    <span className="text-[#27684a] uppercase tracking-[0.25em] text-xs font-bold block mb-3">Ristorante La Pinetina</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-4 tracking-tight">
                      {currentMenu?.title}
                    </h1>
                    {currentMenu?.seoDescription && (
                      <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{currentMenu.seoDescription}</p>
                    )}
                    {currentMenu?.subtitle && (
                      <div className="mt-4 inline-block bg-[#27684a]/10 text-[#27684a] font-semibold px-5 py-2 rounded-full text-sm border border-[#27684a]/20">
                        {currentMenu.subtitle}
                      </div>
                    )}
                    <div className="w-24 h-1 bg-[#27684a] mx-auto mt-6 rounded-full"></div>
                  </div>

                  <div className="space-y-16">
                {currentMenu?.categories?.map((cat: any) => (
                  <div 
                    key={cat.id} 
                    id={`cat-${cat.id}`} 
                    className="bg-white rounded-3xl p-8 md:p-10 shadow-lg shadow-stone-200/50 border border-stone-200/80 relative overflow-hidden scroll-mt-44 transition hover:shadow-xl"
                  >
                    <div className="absolute top-0 left-0 w-2.5 h-full bg-[#27684a]"></div>
                    <div className="border-b border-stone-100 pb-5 mb-8">
                      <h2 className="text-3xl font-serif font-bold text-[#27684a]">
                        {cat.name}
                      </h2>
                      {cat.description && (
                        <p className="text-stone-600 text-sm md:text-base mt-2 leading-relaxed">{cat.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {cat.items?.map((item: any) => (
                        <div 
                          key={item.id} 
                          className={`flex flex-col md:flex-row md:items-baseline justify-between p-5 rounded-2xl transition border ${
                            item.isFeatured 
                              ? 'bg-amber-50/70 border-amber-300/80 shadow-sm' 
                              : 'bg-stone-50/60 border-stone-200/60 hover:bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="pr-4 flex-1 mb-3 md:mb-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-900">
                                {item.name}
                              </h3>
                              {item.isFeatured && (
                                <span className="inline-flex items-center space-x-1 text-[11px] bg-amber-500 text-white font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                                  <Star className="w-3.5 h-3.5 fill-white text-white" />
                                  <span>Consigliato dallo Chef</span>
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-2">
                                {item.description}
                              </p>
                            )}

                            {item.extras && item.extras.length > 0 && (
                              <div className="space-y-1 my-2 bg-white/80 p-3 rounded-xl border border-amber-200">
                                {item.extras.map((ex: any) => (
                                  <div key={ex.id} className="text-xs md:text-sm text-[#27684a] font-medium flex items-center justify-between">
                                    <span>✨ {ex.name} <strong className="text-stone-900">{ex.price}</strong></span>
                                    {ex.description && <span className="text-stone-500 italic text-xs">({ex.description})</span>}
                                  </div>
                                ))}
                              </div>
                            )}

                            {item.allergens && item.allergens.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                <span className="text-xs text-stone-400 font-medium">Allergeni:</span>
                                {item.allergens.map((algId: number) => (
                                  <span key={algId} title={`Allergene ${algId}`} className="text-xs bg-white text-stone-700 font-bold px-2.5 py-0.5 rounded-md border border-stone-300 shadow-2xs">
                                    N. {algId}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-2xl md:text-3xl font-serif font-bold text-[#27684a] shrink-0 text-right">
                            {item.price ? `€${item.price}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 bg-white border border-stone-300/80 rounded-3xl p-8 shadow-sm text-sm text-stone-600 leading-relaxed">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-1">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">Note sulla sicurezza alimentare e allergeni</h4>
                    <p className="text-stone-600 text-sm mb-4">
                      Il regolamento Europeo ha individuato i 14 allergeni alimentari principali. I numeri indicati accanto ai piatti fanno riferimento alla lista ufficiale consultabile in qualsiasi momento tramite il pulsante in alto.
                    </p>
                    <button
                      onClick={() => setShowAllergensModal(true)}
                      className="inline-flex items-center space-x-2 text-sm font-semibold text-[#27684a] hover:underline"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Apri Tabella Completa 14 Allergeni UE</span>
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </>
          )}
        </div>
      ) : (
          /* Admin Backend */
          <div className="max-w-6xl mx-auto px-4 py-12">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-stone-200 p-8 md:p-10">
                {authStep === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#27684a]/10 text-[#27684a] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#27684a]/20">
                        <Lock className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-stone-900">Area Riservata</h2>
                      <p className="text-stone-500 text-sm mt-1">Autenticazione Gestore Ristorante La Pinetina</p>
                    </div>

                    {authError && (
                      <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-center space-x-2 border border-red-200">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">Username Gestore</label>
                      <input 
                        type="text" 
                        value={loginUsername} 
                        onChange={(e) => setLoginUsername(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
                      <input 
                        type="password" 
                        value={loginPassword} 
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#27684a] hover:bg-[#1e5239] text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span>Procedi a Verifica 2FA (Email)</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerify2FA} className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-[#27684a]/10 text-[#27684a] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#27684a]/20">
                        <Mail className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-serif font-bold text-stone-900">Verifica 2FA</h2>
                      <p className="text-stone-500 text-sm mt-1">
                        Codice inviato via e-mail a <strong className="text-stone-800">assistenza@arimediagroup.it</strong>
                      </p>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 text-[#27684a] p-4 rounded-xl text-sm flex items-center space-x-2">
                      <Mail className="w-5 h-5 shrink-0" />
                      <span>Il codice a 6 cifre è stato inviato via e-mail protetta (SMTP). Inseriscilo qui sotto per accedere.</span>
                    </div>

                    {authError && (
                      <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-center space-x-2 border border-red-200">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-1.5">Codice a 6 cifre</label>
                      <input 
                        type="text" 
                        maxLength={6}
                        value={twoFactorCode} 
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                        placeholder="123456"
                        className="w-full text-center tracking-[0.25em] text-3xl font-bold px-4 py-3.5 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#27684a] hover:bg-[#1e5239] text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Verifica Codice e Accedi</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Admin Dashboard */
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#27684a] font-bold block mb-1">Pannello di Controllo Ufficiale</span>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Gestione Ristorante La Pinetina</h1>
                    <p className="text-stone-500 text-sm mt-1">Trascina i prodotti per riordinarli, esporta in PDF con layout ufficiale e gestisci i listini.</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowPdfExportModal(true)}
                      className="px-5 py-3 bg-[#27684a] hover:bg-[#1e5239] text-white font-semibold rounded-xl shadow-md transition flex items-center space-x-2"
                    >
                      <Printer className="w-5 h-5" />
                      <span>Esporta Menù in PDF (Layout Ufficiale)</span>
                    </button>
                    <button 
                      onClick={() => { setIsAdminLoggedIn(false); setAuthStep('login'); }}
                      className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold rounded-xl flex items-center space-x-2 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Esci</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 bg-stone-100 p-2 rounded-2xl">
                  <button
                    onClick={() => setAdminSection('menus')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 ${adminSection === 'menus' ? 'bg-[#27684a] text-white shadow-md' : 'text-stone-700 hover:bg-white/60'}`}
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Modifica Menù</span>
                  </button>
                  <button
                    onClick={() => setAdminSection('new_menu')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 ${adminSection === 'new_menu' ? 'bg-[#27684a] text-white shadow-md' : 'text-stone-700 hover:bg-white/60'}`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Crea Menù</span>
                  </button>
                  <button
                    onClick={() => setAdminSection('embeds')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 ${adminSection === 'embeds' ? 'bg-[#27684a] text-white shadow-md' : 'text-stone-700 hover:bg-white/60'}`}
                  >
                    <Code className="w-4 h-4" />
                    <span>Incorpora & SEO</span>
                  </button>
                  <button
                    onClick={() => setAdminSection('ai_upload')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 ${adminSection === 'ai_upload' ? 'bg-[#27684a] text-white shadow-md' : 'text-stone-700 hover:bg-white/60'}`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Carica con AI</span>
                  </button>
                  <button
                    onClick={() => setAdminSection('users')}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center space-x-1.5 ${adminSection === 'users' ? 'bg-[#27684a] text-white shadow-md' : 'text-stone-700 hover:bg-white/60'}`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Utenti</span>
                  </button>
                </div>

                {adminSection === 'menus' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-200 space-y-6">
                      <h3 className="font-serif text-2xl font-bold text-stone-900">Seleziona Menù</h3>
                      <div className="space-y-3">
                        {menusData && Object.keys(menusData).map((key) => {
                          const m = menusData[key];
                          const isActive = m.isActive !== false;
                          return (
                            <button
                              key={key}
                              onClick={() => { setSelectedMenuType(key); setEditingMenu(JSON.parse(JSON.stringify(m))); }}
                              className={`w-full text-left px-5 py-4 rounded-2xl font-semibold transition flex items-center justify-between ${
                                selectedMenuType === key 
                                  ? 'bg-[#27684a] text-white shadow-md' 
                                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-stone-300'}`}></span>
                                <span className="text-sm font-semibold">{m.title}</span>
                              </div>
                              <span className={`text-[11px] px-2.5 py-0.5 rounded-md font-medium ${
                                selectedMenuType === key 
                                  ? 'bg-white/20 text-white' 
                                  : isActive 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : 'bg-stone-200 text-stone-600'
                              }`}>
                                {isActive ? 'Attivo' : 'Disattivato'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-stone-200 space-y-8">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-6 gap-4">
                        <div>
                          <h3 className="font-serif text-3xl font-bold text-stone-900">Modifica {editingMenu?.title}</h3>
                          <p className="text-stone-500 text-xs mt-1">Gestisci portate, categorie, piatti, allergeni ed extra.</p>
                        </div>
                        <button
                          onClick={handleSaveMenuChanges}
                          className="px-6 py-3 bg-[#27684a] hover:bg-[#1e5239] text-white font-semibold rounded-xl shadow-md transition flex items-center space-x-2 shrink-0"
                        >
                          <Check className="w-4 h-4" />
                          <span>Salva sul Database</span>
                        </button>
                      </div>

                      {/* Menu Status (Active/Inactive) & Actions */}
                      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center space-x-3.5">
                          <div className={`w-4 h-4 rounded-full ${editingMenu?.isActive !== false ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-stone-400'}`} />
                          <div>
                            <span className="font-bold text-stone-900 text-sm block">
                              Stato Menù: {editingMenu?.isActive !== false ? 'ATTIVO (Visibile al pubblico)' : 'DISATTIVATO (Nascosto al pubblico)'}
                            </span>
                            <span className="text-xs text-stone-500 block mt-0.5">
                              {editingMenu?.isActive !== false 
                                ? 'Visibile sulla barra dei menù e accessibile dagli ospiti.' 
                                : 'Nascosto ai visitatori. I clienti vedranno l\'avviso di menù in aggiornamento.'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => setEditingMenu({ ...editingMenu, isActive: editingMenu?.isActive === false ? true : false })}
                            className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition border flex items-center space-x-2 ${
                              editingMenu?.isActive === false
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-xs'
                                : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span>{editingMenu?.isActive === false ? 'Attiva Menù' : 'Disattiva Menù'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleDeleteMenu}
                            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition flex items-center space-x-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Elimina Menù</span>
                          </button>
                        </div>
                      </div>

                      {/* Menu Info & Included Description */}
                      <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                        <div className="flex items-center space-x-2 text-stone-800 font-semibold text-sm">
                          <Settings className="w-4 h-4 text-[#27684a]" />
                          <span>Dettagli e Note Incluse del Menù</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Titolo Menù</label>
                            <input
                              type="text"
                              value={editingMenu?.title || ''}
                              onChange={(e) => setEditingMenu({ ...editingMenu, title: e.target.value })}
                              className="w-full bg-white px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#27684a]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Cosa c'è incluso (es. INCLUSI coperto, acqua e caffè)</label>
                            <input
                              type="text"
                              placeholder="es. INCLUSI coperto, acqua e caffè"
                              value={editingMenu?.subtitle || ''}
                              onChange={(e) => setEditingMenu({ ...editingMenu, subtitle: e.target.value })}
                              className="w-full bg-white px-4 py-2.5 rounded-xl border border-stone-300 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#27684a]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">Descrizione del Menù (SEO)</label>
                          <textarea
                            rows={2}
                            value={editingMenu?.seoDescription || ''}
                            onChange={(e) => setEditingMenu({ ...editingMenu, seoDescription: e.target.value })}
                            className="w-full bg-white px-4 py-2 rounded-xl border border-stone-300 text-sm outline-none focus:ring-2 focus:ring-[#27684a]"
                            placeholder="Descrizione visibile per i clienti e i motori di ricerca..."
                          />
                        </div>
                      </div>

                      {/* Categories Management Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-stone-200">
                        <div>
                          <h4 className="font-serif text-2xl font-bold text-stone-900 flex items-center space-x-2">
                            <Layers className="w-5 h-5 text-[#27684a]" />
                            <span>Portate e Categorie del Menù ({editingMenu?.categories?.length || 0})</span>
                          </h4>
                          <p className="text-xs text-stone-500">Aggiungi nuove portate o categorie (es. Antipasti, Primi, Secondi) e organizza i piatti all'interno.</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          className="px-4 py-2.5 bg-[#27684a] hover:bg-[#1e5239] text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center space-x-2 shrink-0"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>+ Aggiungi Nuova Categoria</span>
                        </button>
                      </div>

                      <div className="space-y-8">
                        {editingMenu?.categories?.map((cat: any, catIndex: number) => (
                          <div key={cat.id || catIndex} className="bg-stone-50/90 p-6 rounded-2xl border border-stone-200 space-y-5">
                            {/* Category Header with Title, Description, Reorder, and Delete */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-stone-200">
                              <div className="flex items-center space-x-2 flex-1 w-full">
                                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#27684a] px-2.5 py-1 rounded-md shrink-0">
                                  Portata {catIndex + 1}
                                </span>
                                <input
                                  type="text"
                                  placeholder="Nome Categoria (es. Antipasti, Primi Piatti)"
                                  value={cat.name}
                                  onChange={(e) => {
                                    const cats = [...editingMenu.categories];
                                    cats[catIndex].name = e.target.value;
                                    setEditingMenu({ ...editingMenu, categories: cats });
                                  }}
                                  className="font-serif font-bold text-xl text-[#27684a] bg-white px-4 py-2 rounded-xl border border-stone-300 w-full outline-none shadow-2xs focus:ring-2 focus:ring-[#27684a]"
                                />
                              </div>

                              <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                                <button
                                  type="button"
                                  title="Sposta Categoria Su"
                                  onClick={() => moveCategory(catIndex, 'up')}
                                  disabled={catIndex === 0}
                                  className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 disabled:opacity-30 text-stone-700 transition"
                                >
                                  <ArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  title="Sposta Categoria Giù"
                                  onClick={() => moveCategory(catIndex, 'down')}
                                  disabled={catIndex === editingMenu.categories.length - 1}
                                  className="p-2 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 disabled:opacity-30 text-stone-700 transition"
                                >
                                  <ArrowDown className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  title="Elimina questa Categoria"
                                  onClick={() => handleDeleteCategory(catIndex)}
                                  className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 transition flex items-center space-x-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span className="text-xs font-semibold hidden sm:inline">Elimina Categoria</span>
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                                Descrizione o nota della portata (opzionale)
                              </label>
                              <input
                                type="text"
                                placeholder="es. Serviti con contorno di stagione e pane fatto in casa"
                                value={cat.description || ''}
                                onChange={(e) => {
                                  const cats = [...editingMenu.categories];
                                  cats[catIndex].description = e.target.value;
                                  setEditingMenu({ ...editingMenu, categories: cats });
                                }}
                                className="text-xs text-stone-700 bg-white px-4 py-2 rounded-xl border border-stone-200 w-full outline-none"
                              />
                            </div>

                            <div className="space-y-4">
                              {cat.items?.map((item: any, itemIndex: number) => (
                                <div 
                                  key={item.id || itemIndex} 
                                  draggable
                                  onDragStart={() => handleDragStart(catIndex, itemIndex)}
                                  onDragOver={handleDragOver}
                                  onDrop={() => handleDrop(catIndex, itemIndex)}
                                  className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4 shadow-2xs cursor-move hover:border-[#27684a]/50 transition group"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="text-stone-400 group-hover:text-[#27684a] cursor-grab active:cursor-grabbing">
                                      <GripVertical className="w-5 h-5" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 flex-1">
                                      <div className="sm:col-span-3">
                                        <input
                                          type="text"
                                          placeholder="Nome piatto / bevanda"
                                          value={item.name}
                                          onChange={(e) => {
                                            const cats = [...editingMenu.categories];
                                            cats[catIndex].items[itemIndex].name = e.target.value;
                                            setEditingMenu({ ...editingMenu, categories: cats });
                                          }}
                                          className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl border border-stone-300 outline-none"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Prezzo (€)"
                                          value={item.price}
                                          onChange={(e) => {
                                            const cats = [...editingMenu.categories];
                                            cats[catIndex].items[itemIndex].price = e.target.value;
                                            setEditingMenu({ ...editingMenu, categories: cats });
                                          }}
                                          className="w-full px-4 py-2.5 text-sm font-bold text-[#27684a] rounded-xl border border-stone-300 outline-none"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pl-8">
                                    <input
                                      type="text"
                                      placeholder="Descrizione / Ingredienti"
                                      value={item.description}
                                      onChange={(e) => {
                                        const cats = [...editingMenu.categories];
                                        cats[catIndex].items[itemIndex].description = e.target.value;
                                        setEditingMenu({ ...editingMenu, categories: cats });
                                      }}
                                      className="w-full px-4 py-2.5 text-xs text-stone-600 rounded-xl border border-stone-200 outline-none"
                                    />
                                  </div>

                                  <div className="pl-8 space-y-2 bg-amber-50/50 p-4 rounded-xl border border-amber-200/80">
                                    <div className="flex justify-between items-center">
                                      <span className="text-xs font-bold text-amber-900 flex items-center space-x-1">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                        <span>Extra Collegati (es. Tartufo fresco a consumo €2,5/g)</span>
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => addExtraToItem(catIndex, itemIndex)}
                                        className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-lg font-semibold flex items-center space-x-1"
                                      >
                                        <PlusCircle className="w-3.5 h-3.5" />
                                        <span>Aggiungi Extra</span>
                                      </button>
                                    </div>

                                    {item.extras && item.extras.map((ex: any, exIndex: number) => (
                                      <div key={ex.id || exIndex} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white p-3 rounded-lg border border-amber-300 shadow-2xs">
                                        <input
                                          type="text"
                                          placeholder="Nome Extra"
                                          value={ex.name}
                                          onChange={(e) => updateExtra(catIndex, itemIndex, exIndex, 'name', e.target.value)}
                                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 outline-none"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Prezzo"
                                          value={ex.price}
                                          onChange={(e) => updateExtra(catIndex, itemIndex, exIndex, 'price', e.target.value)}
                                          className="px-3 py-1.5 text-xs font-bold text-[#27684a] rounded-lg border border-stone-300 outline-none"
                                        />
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="text"
                                            placeholder="Nota"
                                            value={ex.description}
                                            onChange={(e) => updateExtra(catIndex, itemIndex, exIndex, 'description', e.target.value)}
                                            className="px-3 py-1.5 text-xs text-stone-600 rounded-lg border border-stone-300 outline-none flex-1"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => removeExtra(catIndex, itemIndex, exIndex)}
                                            className="text-red-600 hover:text-red-800 p-1 rounded"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="pl-8 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                                    <span className="text-xs font-bold text-stone-700 block mb-2">Seleziona Allergeni UE (1-14) per questo prodotto:</span>
                                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                                      {allergensList.map((alg) => {
                                        const isSelected = item.allergens && item.allergens.includes(alg.id);
                                        return (
                                          <button
                                            key={alg.id}
                                            type="button"
                                            onClick={() => toggleItemAllergen(catIndex, itemIndex, alg.id)}
                                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition border ${
                                              isSelected 
                                                ? 'bg-[#27684a] text-white border-[#27684a] shadow-2xs' 
                                                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                                            }`}
                                          >
                                            {alg.id}. {alg.name.replace(/^\d+\.\s*/, '').split(' ')[0]} {alg.name.replace(/^\d+\.\s*/, '').split(' ')[1] || ''}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="pl-8 flex flex-wrap items-center justify-between pt-2 border-t border-stone-100 gap-3">
                                    <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                                      <input
                                        type="checkbox"
                                        checked={!!item.isFeatured}
                                        onChange={(e) => {
                                          const cats = [...editingMenu.categories];
                                          cats[catIndex].items[itemIndex].isFeatured = e.target.checked;
                                          setEditingMenu({ ...editingMenu, categories: cats });
                                        }}
                                        className="w-4 h-4 text-[#27684a] rounded focus:ring-[#27684a]"
                                      />
                                      <span className="text-xs font-bold text-stone-700 flex items-center space-x-1">
                                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                        <span>Metti in Evidenza</span>
                                      </span>
                                    </label>

                                    <div className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        onClick={() => moveItem(catIndex, itemIndex, 'up')}
                                        disabled={itemIndex === 0}
                                        className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 transition"
                                      >
                                        <ArrowUp className="w-4 h-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => moveItem(catIndex, itemIndex, 'down')}
                                        disabled={itemIndex === cat.items.length - 1}
                                        className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-700 transition"
                                      >
                                        <ArrowDown className="w-4 h-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const cats = [...editingMenu.categories];
                                          cats[catIndex].items = cats[catIndex].items.filter((_: any, i: number) => i !== itemIndex);
                                          setEditingMenu({ ...editingMenu, categories: cats });
                                        }}
                                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition ml-2"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              <button
                                onClick={() => {
                                  const cats = [...editingMenu.categories];
                                  if (!cats[catIndex].items) cats[catIndex].items = [];
                                  cats[catIndex].items.push({ id: 'item_' + Date.now(), name: '', description: '', price: '', allergens: [], extras: [], isFeatured: false });
                                  setEditingMenu({ ...editingMenu, categories: cats });
                                }}
                                className="w-full py-3 bg-white hover:bg-stone-100 border border-stone-300 text-[#27684a] font-semibold rounded-xl text-sm transition flex items-center justify-center space-x-2"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Aggiungi Piatto in questa Categoria</span>
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Button to add another category at the bottom of the editor */}
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          className="w-full py-4 bg-white hover:bg-stone-50 border-2 border-dashed border-[#27684a]/40 text-[#27684a] font-bold rounded-2xl text-sm transition flex items-center justify-center space-x-2 shadow-2xs"
                        >
                          <FolderPlus className="w-5 h-5" />
                          <span>+ Aggiungi un'altra Categoria a questo Menù</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {adminSection === 'new_menu' && (
                  <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-stone-200">
                    <h3 className="font-serif text-3xl font-bold text-stone-900 mb-3">Crea un Nuovo Menù Personalizzato</h3>
                    <p className="text-stone-500 text-sm mb-8">Crea un nuovo menù (es. Menù Degustazione, Eventi, ecc.) che sarà disponibile sul sito e genererà automaticamente il codice d'incorporamento.</p>

                    <form onSubmit={handleCreateNewMenu} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Chiave Unica (ID interno)</label>
                        <input
                          type="text"
                          value={newMenuKey}
                          onChange={(e) => setNewMenuKey(e.target.value)}
                          placeholder="menu_degustazione"
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Titolo del Menù</label>
                        <input
                          type="text"
                          value={newMenuTitle}
                          onChange={(e) => setNewMenuTitle(e.target.value)}
                          placeholder="Menù Degustazione Primavera"
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">Slug URL</label>
                        <input
                          type="text"
                          value={newMenuSlug}
                          onChange={(e) => setNewMenuSlug(e.target.value)}
                          placeholder="menu-degustazione"
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#27684a] text-white font-semibold rounded-xl hover:bg-[#1e5239] transition shadow-lg text-base"
                      >
                        Crea e Inizia a Modificare Menù
                      </button>
                    </form>
                  </div>
                )}

                {adminSection === 'users' && (
                  <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-stone-200 space-y-8">
                    <div>
                      <h3 className="font-serif text-3xl font-bold text-stone-900 mb-2 flex items-center space-x-3">
                        <Users className="w-7 h-7 text-[#27684a]" />
                        <span>Gestione Utenti Amministratori</span>
                      </h3>
                      <p className="text-stone-500 text-sm">Aggiungi nuovi utenti e imposta o genera una password sicura in automatico.</p>
                    </div>

                    <form onSubmit={handleAddUser} className="space-y-5 bg-stone-50 p-6 rounded-2xl border border-stone-200">
                      <h4 className="font-semibold text-stone-900 text-sm">Aggiungi Nuovo Utente</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Username</label>
                          <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="mario_rossi"
                            className="w-full px-4 py-2.5 text-sm bg-white rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Email (per invio 2FA)</label>
                          <input
                            type="email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            placeholder="mario@ristorantelapinetina.it"
                            className="w-full px-4 py-2.5 text-sm bg-white rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-600 mb-1">Ruolo</label>
                          <select
                            value={newUserRole}
                            onChange={(e) => setNewUserRole(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-white rounded-xl border border-stone-300 outline-none focus:ring-2 focus:ring-[#27684a]"
                          >
                            <option value="Gestore">Gestore</option>
                            <option value="Amministratore">Amministratore</option>
                            <option value="Sommelier">Sommelier</option>
                            <option value="Chef di Cucina">Chef di Cucina</option>
                          </select>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-stone-600">Password di Accesso</label>
                            <button
                              type="button"
                              onClick={generateRandomPassword}
                              className="text-xs text-[#27684a] font-bold hover:underline flex items-center space-x-1"
                            >
                              <Key className="w-3 h-3" />
                              <span>⚡ Genera in automatico</span>
                            </button>
                          </div>
                          <div className="relative flex items-center">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={newUserPassword}
                              onChange={(e) => setNewUserPassword(e.target.value)}
                              placeholder="Inserisci o genera password"
                              className="w-full px-4 py-2.5 pr-20 text-sm bg-white rounded-xl border border-stone-300 outline-none font-mono focus:ring-2 focus:ring-[#27684a]"
                            />
                            <div className="absolute right-2 flex items-center space-x-1">
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition"
                                title={showPassword ? 'Nascondi password' : 'Mostra password'}
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              {newUserPassword && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(newUserPassword);
                                    setCopiedPassword(true);
                                    setTimeout(() => setCopiedPassword(false), 2000);
                                  }}
                                  className="p-1.5 text-[#27684a] hover:bg-[#27684a]/10 rounded transition"
                                  title="Copia password"
                                >
                                  {copiedPassword ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                </button>
                              )}
                            </div>
                          </div>
                          <span className="text-[11px] text-stone-500 block mt-1">
                            {copiedPassword ? '✅ Password copiata negli appunti!' : 'Puoi inserire una password o cliccare su Genera.'}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="py-3 px-6 bg-[#27684a] text-white text-sm font-semibold rounded-xl hover:bg-[#1e5239] transition shadow-md flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Aggiungi Utente con Password</span>
                        </button>
                      </div>
                    </form>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-stone-900 text-sm">Utenti Registrati con Accesso</h4>
                      {adminUsers.map((u: any) => (
                        <div key={u.id} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-stone-900 block text-base">{u.username}</span>
                              <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium border border-stone-200">
                                {u.role || 'Gestore'}
                              </span>
                            </div>
                            <span className="text-xs text-stone-500 block mt-0.5">{u.email}</span>
                          </div>
                          {u.username !== 'assistenza@arimediagroup.it' && u.username !== 'risto114_gestore' ? (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-2 rounded-xl font-semibold transition flex items-center space-x-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Elimina</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-stone-400 font-semibold px-2.5 py-1 bg-stone-50 rounded-lg border border-stone-200">
                              Admin Principale
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {adminSection === 'embeds' && (
                  <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-stone-200 space-y-8">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#27684a] font-bold block mb-1">SEO & Integrazione WordPress</span>
                      <h3 className="font-serif text-3xl font-bold text-stone-900">Codici d'Incorporamento per il Sito Ufficiale</h3>
                      <p className="text-stone-500 text-sm mt-1">
                        Incorpora ogni singolo menù direttamente nelle pagine dedicate del sito ufficiale con layout trasparente, responsive e Schema.org SEO integrato.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { key: 'alla_carta', title: 'Menù Alla Carta', targetUrl: 'https://ristorantelapinetina.it/menu/' },
                        { key: 'business_lunch', title: 'Menù Business Lunch', targetUrl: 'https://ristorantelapinetina.it/menu-business-lunch/' },
                        { key: 'vini', title: 'Carta dei Vini', targetUrl: 'https://ristorantelapinetina.it/menu-vini/' }
                      ].map((item) => {
                        const iframeCode = `<iframe src="https://menu.ristorantelapinetina.it/?menu=${item.key}&embed=1" style="width:100%; min-height:850px; border:none; background:transparent;" title="${item.title} - Ristorante La Pinetina" loading="lazy"></iframe>`;
                        const schemaCode = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Ristorante La Pinetina",
  "url": "https://ristorantelapinetina.it",
  "hasMenu": {
    "@type": "Menu",
    "name": "${item.title}",
    "url": "${item.targetUrl}"
  }
}
</script>`;
                        return (
                          <div key={item.key} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <div>
                                <h4 className="font-serif text-xl font-bold text-[#27684a]">{item.title}</h4>
                                <span className="text-xs text-stone-500">Pagina di destinazione: <code className="text-stone-800 font-semibold">{item.targetUrl}</code></span>
                              </div>
                              <a
                                href={`https://menu.ristorantelapinetina.it/?menu=${item.key}&embed=1`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs px-3.5 py-1.5 bg-white border border-stone-300 rounded-lg text-stone-700 hover:text-[#27684a] font-medium"
                              >
                                Apri Anteprima Embed ↗
                              </a>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-bold text-stone-700">1. Codice Iframe (da incollare nel blocco HTML di WordPress)</label>
                                <button
                                  onClick={() => copyToClipboard(iframeCode, 'iframe_' + item.key)}
                                  className="text-xs font-semibold text-[#27684a] hover:underline flex items-center space-x-1"
                                >
                                  {copiedEmbed === 'iframe_' + item.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedEmbed === 'iframe_' + item.key ? 'Copiato!' : 'Copia Iframe'}</span>
                                </button>
                              </div>
                              <pre className="p-3 bg-stone-900 text-stone-200 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap font-mono select-all">
                                {iframeCode}
                              </pre>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <label className="text-xs font-bold text-stone-700">2. Dati Strutturati SEO Schema.org (Google Rich Snippets)</label>
                                <button
                                  onClick={() => copyToClipboard(schemaCode, 'schema_' + item.key)}
                                  className="text-xs font-semibold text-[#27684a] hover:underline flex items-center space-x-1"
                                >
                                  {copiedEmbed === 'schema_' + item.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedEmbed === 'schema_' + item.key ? 'Copiato!' : 'Copia Schema JSON-LD'}</span>
                                </button>
                              </div>
                              <pre className="p-3 bg-stone-900 text-emerald-400 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap font-mono select-all">
                                {schemaCode}
                              </pre>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {adminSection === 'ai_upload' && (
                  <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-stone-200 space-y-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#27684a] font-bold block mb-1">Intelligenza Artificiale Gemini</span>
                      <h3 className="font-serif text-3xl font-bold text-stone-900 flex items-center space-x-2">
                        <Sparkles className="w-7 h-7 text-[#27684a]" />
                        <span>Caricamento ed Estrazione Automatica Documenti</span>
                      </h3>
                      <p className="text-stone-500 text-sm mt-1">
                        Incolla o carica il testo estratto dal tuo PDF o file Word del menù: l'AI identificherà automaticamente categorie, nomi dei piatti, descrizioni, prezzi, extra e allergeni UE aggiornando la struttura in tempo reale.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Menù di Destinazione per il caricamento
                        </label>
                        <select
                          value={selectedMenuType}
                          onChange={(e) => {
                            setSelectedMenuType(e.target.value);
                            if (menusData && menusData[e.target.value]) {
                              setEditingMenu(JSON.parse(JSON.stringify(menusData[e.target.value])));
                            }
                          }}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#27684a]"
                        >
                          {menusData && Object.keys(menusData).map((k) => (
                            <option key={k} value={k}>{menusData[k]?.title || k}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Contenuto Documento (PDF / Word / Testo Menù)
                        </label>
                        <textarea
                          rows={8}
                          value={aiDocText}
                          onChange={(e) => setAiDocText(e.target.value)}
                          placeholder="Incolla qui il testo del tuo menù PDF o Word (es. Antipasti, Primi, Secondi con ingredienti e prezzi)..."
                          className="w-full bg-stone-50 border border-stone-300 rounded-2xl p-4 text-sm font-mono outline-none focus:ring-2 focus:ring-[#27684a]"
                        />
                      </div>

                      {aiDocSuccess && (
                        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-sm flex items-center space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>{aiDocSuccess}</span>
                        </div>
                      )}

                      <button
                        onClick={handleAiParseMenu}
                        disabled={aiDocLoading}
                        className="w-full py-4 bg-[#27684a] hover:bg-[#1e5239] disabled:opacity-60 text-white font-semibold rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-base"
                      >
                        {aiDocLoading ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Analisi ed Estrazione AI in corso...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>Elabora e Inserisci nel Menù con AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* PDF Export Layout Modal */}
      {showPdfExportModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fcfbf9] rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto p-8 md:p-12 shadow-2xl relative border border-stone-300">
            <button 
              onClick={() => setShowPdfExportModal(false)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold z-10"
            >
              ✕
            </button>

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-300 print:hidden">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Anteprima Stampa / Esportazione PDF</h3>
                <p className="text-stone-600 text-xs">Layout ufficiale di Ristorante La Pinetina per il menù: <strong className="text-[#27684a]">{currentMenu?.title}</strong></p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-[#27684a] text-white font-semibold rounded-xl hover:bg-[#1e5239] shadow-md flex items-center space-x-2"
              >
                <Printer className="w-5 h-5" />
                <span>Stampa / Salva in PDF</span>
              </button>
            </div>

            {/* Printable Menu Paper Sheet */}
            <div className="bg-white p-10 md:p-14 rounded-2xl shadow-xl border border-stone-200 max-w-3xl mx-auto space-y-12">
              <div className="text-center border-b-2 border-[#27684a] pb-8">
                <span className="text-xs uppercase tracking-[0.3em] text-[#27684a] font-bold block mb-2">Ristorante La Pinetina</span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-2">
                  {currentMenu?.title}
                </h1>
                {currentMenu?.subtitle && (
                  <p className="text-stone-600 text-sm italic">{currentMenu.subtitle}</p>
                )}
              </div>

              <div className="space-y-10">
                {currentMenu?.categories?.map((cat: any) => (
                  <div key={cat.id} className="space-y-6">
                    <div className="border-b border-[#27684a]/30 pb-2">
                      <h2 className="text-2xl font-serif font-bold text-[#27684a] uppercase tracking-wide">
                        {cat.name}
                      </h2>
                      {cat.description && (
                        <p className="text-stone-500 text-xs mt-1">{cat.description}</p>
                      )}
                    </div>

                    <div className="space-y-5">
                      {cat.items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-baseline border-b border-dotted border-stone-200 pb-3">
                          <div className="pr-4 flex-1">
                            <h3 className="font-serif font-semibold text-lg text-stone-900">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-stone-600 text-xs italic mt-0.5">
                                {item.description}
                              </p>
                            )}
                            {item.extras && item.extras.length > 0 && (
                              <div className="mt-1 space-y-0.5">
                                {item.extras.map((ex: any) => (
                                  <p key={ex.id} className="text-xs text-[#27684a] font-medium">
                                    {ex.name} <strong className="text-stone-900">{ex.price}</strong> {ex.description && `(${ex.description})`}
                                  </p>
                                ))}
                              </div>
                            )}
                            {item.allergens && item.allergens.length > 0 && (
                              <p className="text-[10px] text-stone-400 mt-0.5">
                                All. {item.allergens.join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="font-serif font-bold text-lg text-[#27684a] shrink-0">
                            {item.price ? `€${item.price}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-8 border-t border-stone-200 text-[10px] text-stone-500 space-y-1">
                <p>Ristorante La Pinetina - www.ristorantelapinetina.it</p>
                <p>Il foglio allergeni e intolleranze è consultabile presso la cassa e sul nostro sito ufficiale.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allergens Modal */}
      {showAllergensModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10 shadow-2xl relative">
            <button 
              onClick={() => setShowAllergensModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
            >
              ✕
            </button>
            <div className="text-center mb-8">
              <BookOpen className="w-12 h-12 text-[#27684a] mx-auto mb-3" />
              <h2 className="text-3xl font-serif font-bold text-stone-900">Tabella Ufficiale 14 Allergeni UE</h2>
              <p className="text-stone-500 text-xs mt-1">Ristorante La Pinetina - Regolamento UE n. 1169/2011</p>
            </div>

            <div className="space-y-3 bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-8">
              {allergensList.map((alg) => (
                <div key={alg.id} className="text-sm text-stone-700 flex items-start space-x-3">
                  <span className="font-bold text-[#27684a] shrink-0 w-6 text-base">{alg.id}.</span>
                  <span className="leading-relaxed">{alg.name.replace(/^\d+\.\s*/, '')}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllergensModal(false)}
              className="w-full py-4 bg-[#27684a] text-white font-semibold rounded-2xl hover:bg-[#1e5239] shadow-lg text-base transition"
            >
              Chiudi Tabella
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
