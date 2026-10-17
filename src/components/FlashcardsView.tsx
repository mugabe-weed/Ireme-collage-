import React, { useState } from 'react';
import { Sparkles, Check, RotateCw, ArrowLeft, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { Language } from '../types';
import { ROAD_SIGNS } from '../data/roadSigns';
import { TRANSLATIONS } from '../data/translations';
import { RoadSignGraphic } from './RoadSignGraphic';

interface FlashcardsViewProps {
  language: Language;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const currentSign = ROAD_SIGNS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % ROAD_SIGNS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + ROAD_SIGNS.length) % ROAD_SIGNS.length);
  };

  const handleMarkMastered = () => {
    if (!masteredIds.includes(currentSign.id)) {
      setMasteredIds((prev) => [...prev, currentSign.id]);
    }
    handleNext();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2 border border-amber-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Spaced Repetition Flashcards</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {language === 'rw' ? 'Flashcards z\'Ibyapa by\'Umuhanda' : 'Interactive Road Signs Flashcards'}
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          {language === 'rw' 
            ? 'Kanda ku ikarita kugira ngo uyihindure ubone igisobanuro n\'itegeko riyigenga.'
            : 'Click or tap card to flip and reveal the official meaning and action required.'}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 max-w-xs mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
            <span>{language === 'rw' ? 'Ikarita' : 'Card'} {currentIndex + 1} / {ROAD_SIGNS.length}</span>
            <span className="text-emerald-700">{masteredIds.length} {language === 'rw' ? 'wamenye' : 'mastered'}</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / ROAD_SIGNS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-96 perspective-1000 cursor-pointer select-none group"
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          
          {/* FRONT */}
          <div className="absolute inset-0 w-full h-full bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-between shadow-md backface-hidden group-hover:border-emerald-400 transition-colors">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 font-mono font-bold">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                Code: {currentSign.code}
              </span>
              <span className="capitalize">{currentSign.category}</span>
            </div>

            <div className="py-4 flex flex-col items-center">
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl mb-3 shadow-inner">
                <RoadSignGraphic type={currentSign.svgType} size={110} />
              </div>
              <h3 className="text-xl font-black text-slate-900 text-center mt-2">
                {currentSign.name[language] || currentSign.name.rw}
              </h3>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{language === 'rw' ? 'Kanda hano uhindure ikarita' : 'Tap anywhere to flip card'}</span>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 flex flex-col items-center justify-between shadow-xl rotate-y-180 backface-hidden border-2 border-slate-800">
            <div className="w-full flex items-center justify-between text-xs text-slate-400">
              <span className="text-emerald-400 font-bold">{currentSign.name[language] || currentSign.name.rw}</span>
              <span className="font-mono text-xs">Code: {currentSign.code}</span>
            </div>

            <div className="text-center space-y-4 my-auto">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  {language === 'rw' ? 'Igisobanuro cy\'Itegeko' : 'Official Legal Meaning'}
                </span>
                <p className="text-sm font-medium text-slate-200 mt-1 leading-relaxed">
                  {currentSign.meaning[language] || currentSign.meaning.rw}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                  {language === 'rw' ? 'Icyo umushoferi asabwa' : 'Action Required'}
                </span>
                <p className="text-sm font-semibold text-emerald-200 mt-1 leading-relaxed">
                  {currentSign.actionRequired[language] || currentSign.actionRequired.rw}
                </p>
              </div>

              {currentSign.legalArticle && (
                <div className="text-[11px] text-slate-400 pt-1">
                  {currentSign.legalArticle}
                </div>
              )}
            </div>

            <div className="text-xs text-slate-400 font-semibold">
              <span>{language === 'rw' ? 'Kanda hano usubire ku byapa' : 'Tap to flip back'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Flashcard Bottom Controls */}
      <div className="flex items-center justify-between mt-8 gap-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.previous}</span>
        </button>

        <button
          onClick={handleMarkMastered}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>{language === 'rw' ? 'Iki Ndi Kugifata Neza' : 'I Know This Sign'}</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer shadow-xs"
        >
          <span>{t.next}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
