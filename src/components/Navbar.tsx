import React from 'react';
import { 
  ShieldCheck, BookOpen, Layers, Award, Sparkles, FileCheck, 
  Menu, X, Car, Zap, User, Scale, Play, MessageCircle 
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onStartQuickExam: () => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  onOpenContact?: () => void;
  userProfile: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onStartQuickExam,
  onOpenPricing,
  onOpenAuth,
  onOpenContact,
  userProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Car },
    { id: 'series', label: language === 'rw' ? 'Ibizamini' : 'Exam Series', icon: Award },
    { id: 'lessons', label: language === 'rw' ? 'Amasomo' : 'Lessons', icon: BookOpen },
    { id: 'signs', label: t.navRoadSigns, icon: Layers },
    { id: 'laws', label: language === 'rw' ? 'Amategeko' : 'Traffic Code', icon: Scale },
    { id: 'flashcards', label: t.navFlashcards, icon: Sparkles },
    { id: 'irembo', label: 'IremboGov', icon: FileCheck },
    { id: 'stats', label: t.navStats, icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Top micro bar for slogan & contact */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-amber-400 uppercase tracking-wider">Kora rimwe Utsinde! 🇷🇼</span>
          <span className="hidden md:inline text-slate-400">| Urubuga rwizewe rwo kwitegura Ikizamini cya Provisoire</span>
        </div>

        {/* Official Contact Badges */}
        <div className="flex items-center gap-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/250786922843"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            title="Vugana natwe kuri WhatsApp"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>WA: 0786922843</span>
          </a>

          {/* Call */}
          <a
            href="tel:07227118102"
            className="hidden sm:flex items-center gap-1 font-mono font-bold text-sky-400 hover:text-sky-300 transition-colors"
            title="Hamagara ako kanya"
          >
            <span>Tel: 07227118102</span>
          </a>

          {/* Email / Contact Button */}
          {onOpenContact ? (
            <button
              onClick={onOpenContact}
              className="hidden lg:flex items-center gap-1 text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-amber-300 border border-slate-700 cursor-pointer"
            >
              <span>✉️ francoisshyirakumutima@gmail.com</span>
            </button>
          ) : (
            <a
              href="mailto:francoisshyirakumutima@gmail.com"
              className="hidden lg:flex items-center gap-1 text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-amber-300 border border-slate-700"
            >
              <span>✉️ francoisshyirakumutima@gmail.com</span>
            </a>
          )}

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-md border border-slate-700 text-[10px] font-bold">
            {(['rw', 'en', 'fr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded uppercase transition-all ${
                  language === lang
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'rw' ? 'Kiny' : lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand matching Isuzume.rw concept */}
          <div 
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span className="font-black text-2xl tracking-tighter">I</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-slate-900 tracking-tight">
                  IREME <span className="text-emerald-700">COLLEGE</span>
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                  Provisoire
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-bold hidden sm:block">
                Kora rimwe Utsinde! • Isuzume.rw Style
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Auth, Pro Badge & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Pricing / Pro Button */}
            <button
              onClick={onOpenPricing}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                userProfile?.isPro
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-xs'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{userProfile?.isPro ? 'PRO Active' : 'Amapaki (PRO)'}</span>
            </button>

            {/* Contact Support Button */}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-xs font-bold transition-all cursor-pointer"
                title="Twavugishe kuri WhatsApp 0786922843 cyangwa Call 07227118102"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{language === 'rw' ? 'Twandikire' : 'Contact'}</span>
              </button>
            )}

            {/* User Profile / Login */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>{userProfile ? userProfile.name.split(' ')[0] : (language === 'rw' ? 'Injira' : 'Login')}</span>
            </button>

            {/* Quick Test Button */}
            <button
              onClick={onStartQuickExam}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95 text-xs cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{language === 'rw' ? 'Tangira Kwisuzuma' : 'Take Exam'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenPricing}
              className="text-xs font-bold bg-amber-500 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>PRO</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-bold ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-black'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-slate-100 space-y-2">
            {onOpenContact && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold py-2.5 rounded-xl text-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Twandikire (WA: 0786922843 • Tel: 07227118102)</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-bold py-2.5 rounded-xl text-xs"
            >
              <User className="w-4 h-4" />
              <span>{userProfile ? `Konti: ${userProfile.name}` : 'Injira / Konti Yanjye'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartQuickExam();
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl shadow-md text-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{language === 'rw' ? 'Tangira Kwisuzuma (20/20)' : 'Start 20/20 Exam'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
