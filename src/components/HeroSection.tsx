import React from 'react';
import { Award, Layers, BookOpen, Search } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroSectionProps {
  language: Language;
  onStartExam: (category?: string) => void;
  onNavigateTab: (tab: string) => void;
  onSearchSigns: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onStartExam,
  onNavigateTab,
  onSearchSigns,
}) => {
  const t = TRANSLATIONS[language];
  const [searchInput, setSearchInput] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSigns(searchInput.trim());
      onNavigateTab('signs');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white">
      {/* Background ambient elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 relative z-10">
        <div className="space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight sm:leading-tight">
            {language === 'rw' ? (
              <>
                Iga Amategeko y'Umuhanda, <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent">Utsindire Rimwe</span> Ikizamini cya Provisoire!
              </>
            ) : language === 'fr' ? (
              <>
                Maîtrisez le Code de la Route et <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent">Réussissez Votre Provisoire</span> !
              </>
            ) : (
              <>
                Master Rwanda Traffic Laws & <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300 bg-clip-text text-transparent">Pass Your Provisoire</span> on First Try!
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.searchSignsPlaceholder}
                className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-500 text-white placeholder-slate-400 text-sm rounded-xl py-3 pl-4 pr-28 focus:outline-hidden transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer"
              >
                {language === 'rw' ? 'Shakisha' : language === 'fr' ? 'Chercher' : 'Search'}
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onStartExam()}
              className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all text-base cursor-pointer"
            >
              <Award className="w-5 h-5" />
              <span>{language === 'rw' ? 'Tangira (2 Free Questions)' : t.heroStartExamBtn}</span>
            </button>

            <button
              onClick={() => onNavigateTab('signs')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold px-5 py-3.5 rounded-xl transition-all text-sm cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>{t.heroExploreSignsBtn}</span>
            </button>

            <button
              onClick={() => onNavigateTab('lessons')}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold px-5 py-3.5 rounded-xl transition-all text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>{language === 'rw' ? 'Amasomo' : language === 'fr' ? 'Cours' : 'Lessons'}</span>
            </button>
          </div>

          {/* Real Stats counter row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl font-black text-emerald-400">{t.statPassRate}</div>
              <div className="text-xs text-slate-400 font-medium leading-tight mt-0.5">{t.statPassRateLabel}</div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl font-black text-teal-400">{t.statPassMark}</div>
              <div className="text-xs text-slate-400 font-medium leading-tight mt-0.5">{t.statPassMarkLabel}</div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl font-black text-sky-400">{t.statQuestions}</div>
              <div className="text-xs text-slate-400 font-medium leading-tight mt-0.5">{t.statQuestionsLabel}</div>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl">
              <div className="text-2xl font-black text-amber-400">{t.statTime}</div>
              <div className="text-xs text-slate-400 font-medium leading-tight mt-0.5">{t.statTimeLabel}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
