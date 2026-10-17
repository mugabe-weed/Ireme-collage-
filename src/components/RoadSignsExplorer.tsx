import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, BookOpen, AlertCircle, X, ChevronRight, Award, Clock, CheckCircle2, Zap } from 'lucide-react';
import { RoadSign, Language } from '../types';
import { ROAD_SIGNS } from '../data/roadSigns';
import { TRANSLATIONS } from '../data/translations';
import { RoadSignGraphic } from './RoadSignGraphic';

interface RoadSignsExplorerProps {
  language: Language;
  initialSearch?: string;
  onStartSignPractice?: () => void;
}

export const RoadSignsExplorer: React.FC<RoadSignsExplorerProps> = ({
  language,
  initialSearch = '',
  onStartSignPractice,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [activeSignModal, setActiveSignModal] = useState<RoadSign | null>(null);
  const [selectedDemoOption, setSelectedDemoOption] = useState<string | null>('B');

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'priority', label: t.filterPriority },
    { id: 'warning', label: t.filterWarning },
    { id: 'prohibitory', label: t.filterProhibitory },
    { id: 'mandatory', label: t.filterMandatory },
    { id: 'informative', label: t.filterInformative },
    { id: 'marking', label: t.filterMarkings },
  ];

  const filteredSigns = useMemo(() => {
    return ROAD_SIGNS.filter((sign) => {
      // Category filter
      if (selectedCategory !== 'all' && sign.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameRw = sign.name.rw.toLowerCase();
        const nameEn = sign.name.en.toLowerCase();
        const nameFr = sign.name.fr.toLowerCase();
        const code = sign.code.toLowerCase();
        const meaning = (sign.meaning[language] || sign.meaning.rw).toLowerCase();

        return (
          nameRw.includes(query) ||
          nameEn.includes(query) ||
          nameFr.includes(query) ||
          code.includes(query) ||
          meaning.includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery, language]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Igitabo Cyuzuye cy'Ibyapa mu Rwanda</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'rw' ? 'Ibyapa by\'Umuhanda n\'Ibisobanuro Byabyo' : 'Rwanda Road Signs Catalog'}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            {language === 'rw' 
              ? 'Wige ibyapa byose biburira, ibitegeka, ibibuza, iby\'ubutwererane, n\'imirongo yo mu muhanda ibazwa mu kizamini cya Polisi.'
              : 'Complete illustrated guide to warning, priority, prohibitory, mandatory and road marking signs under Rwandan traffic law.'}
          </p>
        </div>

        {onStartSignPractice && (
          <button
            onClick={onStartSignPractice}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-xs text-xs self-start md:self-auto cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>{language === 'rw' ? 'Kora Ikizamini cy\'Ibyapa' : 'Practice Road Signs Test'}</span>
          </button>
        )}
      </div>

      {/* RNP Exam Simulator 2026 - Road Signs Spotlight */}
      <div className="mb-10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl text-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
                RNP Exam Simulator 2026
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'rw' 
                ? 'Isuzume ku Byapa by\'Umuhanda mu Kizamini cya Polisi' 
                : 'Test Your Road Signs on RNP Exam Simulator'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {language === 'rw'
                ? 'Iki ni ikitegererezo cy\'ikibazo cy\'icyapa cyo mu kizamini cy\'amategeko y\'umuhanda cya Polisi y\'u Rwanda. Gerageza gusubiza iki kibazo cyangwa utangire ikizamini cyuzuye cy\'ibyapa by\'umuhanda.'
                : 'Interactive RNP road signs question simulation. Answer this sign scenario or start the full road signs mock exam.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onStartSignPractice && (
                <button
                  onClick={onStartSignPractice}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black px-6 py-3 rounded-xl text-xs shadow-md cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Award className="w-4 h-4" />
                  <span>{language === 'rw' ? 'Tangira Ikizamini cy\'Ibyapa (20/20)' : 'Start Road Signs Exam (20/20)'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* The interactive RNP simulator card */}
            <div className="bg-slate-950/90 border border-slate-700/90 rounded-2xl p-5 shadow-2xl text-slate-100 space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {language === 'rw' ? 'Ikibazo cya 07 kuri 20' : 'Question 07 of 20'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5" />
                  <span>19:45</span>
                </div>
              </div>

              <div className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 inline-block">
                {language === 'rw' ? 'Ibyapa byo gutambuka mbere (Priority Signs)' : 'Priority Signs'}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                {language === 'rw' 
                  ? 'Iyo ugeze ku masangano azengurutswe (Rond-point), ni nde ufite uburenganzira bwo gutambuka mbere mu Rwanda?'
                  : language === 'fr'
                  ? 'Dans un carrefour à sens giratoire (rond-point) au Rwanda, qui a la priorité?'
                  : 'At a roundabout in Rwanda, who has the right-of-way?'}
              </p>

              {/* Sign preview */}
              <div className="flex justify-center py-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <RoadSignGraphic type="roundabout_mandatory" size={68} />
              </div>

              {/* Interactive mock options */}
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedDemoOption('A')}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    selectedDemoOption === 'A' 
                      ? 'bg-rose-950/70 border-rose-500 text-rose-300 font-medium' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>A. {language === 'rw' ? 'Ikinyabiziga gituruka iburyo' : 'Vehicle entering from right'}</span>
                  {selectedDemoOption === 'A' && <span className="text-[10px] text-rose-400 font-bold">Oya</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDemoOption('B')}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    selectedDemoOption === 'B' 
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold ring-1 ring-emerald-500/50' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>B. {language === 'rw' ? 'Ikinyabiziga kiri muri rond-point (ibumoso)' : 'Vehicle already inside roundabout'}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDemoOption('C')}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    selectedDemoOption === 'C' 
                      ? 'bg-rose-950/70 border-rose-500 text-rose-300 font-medium' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>C. {language === 'rw' ? 'Ikinyabiziga gifite umuvuduko munini' : 'Vehicle with highest speed'}</span>
                  {selectedDemoOption === 'C' && <span className="text-[10px] text-rose-400 font-bold">Oya</span>}
                </button>
              </div>

              {selectedDemoOption === 'B' ? (
                <div className="p-2.5 rounded-lg bg-emerald-900/40 border border-emerald-500/40 text-[11px] text-emerald-300 font-medium leading-relaxed">
                  ✓ Wagize neza! Ikinyabiziga kigeze mbere muri rond-point kiba gifite uburenganzira bwo gutambuka (Iteka rya Perezida No 85/01).
                </div>
              ) : selectedDemoOption ? (
                <div className="p-2.5 rounded-lg bg-rose-900/40 border border-rose-500/40 text-[11px] text-rose-300 font-medium leading-relaxed">
                  ✗ Igisubizo cy'ukuri ni B: Ikinyabiziga kiri muri rond-point (ibumoso) nicyo gifite uburenganzira bwo gutambuka.
                </div>
              ) : null}
            </div>
          </div>

        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs mb-8 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchSignsPlaceholder}
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Signs */}
      {filteredSigns.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-800">
            {language === 'rw' ? 'Nta cyapa kibonetse' : 'No signs matched your search'}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'rw' ? 'Gerageza gukoresha andi magambo cyangwa uhindure icyiciro.' : 'Try adjusting your search terms or selecting another category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSigns.map((sign) => {
            return (
              <div
                key={sign.id}
                onClick={() => setActiveSignModal(sign)}
                className="bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-4 flex flex-col items-center justify-between shadow-2xs hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1 select-none"
              >
                {/* Code badge */}
                <div className="w-full flex items-center justify-between text-[11px] mb-2 font-mono text-slate-400">
                  <span className="font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {sign.code}
                  </span>
                  <span className="capitalize text-[10px] text-slate-400">
                    {sign.category}
                  </span>
                </div>

                {/* SVG Sign Graphic */}
                <div className="py-3 group-hover:scale-105 transition-transform">
                  <RoadSignGraphic type={sign.svgType} size={84} />
                </div>

                {/* Name */}
                <div className="w-full text-center mt-2">
                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {sign.name[language] || sign.name.rw}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Modal on Click */}
      {activeSignModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-scaleUp relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveSignModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Graphic */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4">
                <RoadSignGraphic type={activeSignModal.svgType} size={110} />
              </div>
              <div className="inline-block bg-slate-100 text-slate-700 text-xs font-mono font-bold px-2.5 py-1 rounded-md mb-1">
                Code: {activeSignModal.code} ({activeSignModal.category})
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {activeSignModal.name[language] || activeSignModal.name.rw}
              </h3>
            </div>

            {/* Meaning & Actions */}
            <div className="space-y-4 pt-6 text-sm">
              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'rw' ? 'Icyo iki cyapa gisobanura' : 'Meaning & Regulation'}
                </h5>
                <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-150">
                  {activeSignModal.meaning[language] || activeSignModal.meaning.rw}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">
                  {language === 'rw' ? 'Icyo umushoferi asabwa gukora' : 'Action Required by Driver'}
                </h5>
                <p className="text-emerald-900 font-medium leading-relaxed bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                  {activeSignModal.actionRequired[language] || activeSignModal.actionRequired.rw}
                </p>
              </div>

              {activeSignModal.legalArticle && (
                <div className="pt-2 text-xs font-medium text-slate-500">
                  <span className="font-bold text-slate-700">{t.legalBasis} </span>
                  {activeSignModal.legalArticle}
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ireme College Rwanda
              </span>
              <button
                onClick={() => setActiveSignModal(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                {language === 'rw' ? 'Funga' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
