import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldCheck, Award, Zap, HelpCircle } from 'lucide-react';
import { Language, QuestionCategory } from '../types';
import { QUESTIONS_BANK } from '../data/questions';
import { TRANSLATIONS } from '../data/translations';
import { RoadSignGraphic } from './RoadSignGraphic';

interface PracticeModeProps {
  language: Language;
  onExitPractice: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  language,
  onExitPractice,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const categoryList: { id: QuestionCategory | 'all'; label: string }[] = [
    { id: 'all', label: language === 'rw' ? 'Ibibazo Byose' : 'All Categories' },
    { id: 'ibyapa', label: language === 'rw' ? 'Ibyapa by\'Umuhanda' : 'Road Signs' },
    { id: 'amategeko', label: language === 'rw' ? 'Amategeko yo Gutambuka' : 'Priority & Traffic Rules' },
    { id: 'umutekano', label: language === 'rw' ? 'Umutekano n\'Ibyago' : 'Road Safety' },
    { id: 'ubutabazi', label: language === 'rw' ? 'Ubutabazi bw\'Ibanze' : 'First Aid' },
    { id: 'ibinyabiziga', label: language === 'rw' ? 'Ibinyabiziga n\'Amatara' : 'Vehicles & Lights' },
  ];

  const filteredQuestions = QUESTIONS_BANK.filter((q) => {
    if (selectedCategory === 'all') return true;
    return q.category === selectedCategory;
  });

  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleSelectOption = (optId: string) => {
    if (hasAnswered) return;
    setSelectedOption(optId);
    setHasAnswered(true);

    if (optId === currentQ.correctAnswerId) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < filteredQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    }
  };

  const handleReset = (newCat?: QuestionCategory | 'all') => {
    if (newCat) setSelectedCategory(newCat);
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setCorrectCount(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      
      {/* Category selector pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold mb-1 border border-teal-200">
            <Zap className="w-3.5 h-3.5" />
            <span>Kwimenyereza ku Byiciro (Instant Feedback)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {language === 'rw' ? 'Witoze Ibibazo Uhite Ubona Ibisobanuro' : 'Category Practice with Instant Solutions'}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>{correctCount} / {filteredQuestions.length} {language === 'rw' ? 'byo watsinze' : 'passed'}</span>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {categoryList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleReset(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="font-bold text-emerald-700">
              {language === 'rw' ? 'Ikibazo' : 'Question'} {currentIdx + 1} {t.of} {filteredQuestions.length}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded uppercase font-semibold">
              {currentQ.category}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question[language] || currentQ.question.rw}
          </h3>

          {/* Road sign if present */}
          {currentQ.signSvgType && (
            <div className="flex justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto">
              <RoadSignGraphic type={currentQ.signSvgType} size={84} />
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === opt.id;
              const isCorrect = opt.id === currentQ.correctAnswerId;

              let style = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
              if (hasAnswered) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  style = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-400';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 cursor-pointer ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      hasAnswered && isCorrect 
                        ? 'bg-emerald-600 text-white' 
                        : hasAnswered && isSelected && !isCorrect 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm font-medium leading-relaxed pt-0.5">
                      {opt.text[language] || opt.text.rw}
                    </span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant feedback explanation */}
          {hasAnswered && (
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs sm:text-sm text-slate-700 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{t.explanationTitle}</span>
              </div>
              <p className="leading-relaxed">
                {currentQ.explanation[language] || currentQ.explanation.rw}
              </p>
              {currentQ.legalReference && (
                <div className="font-semibold text-emerald-800 text-xs">
                  {t.legalBasis} {currentQ.legalReference}
                </div>
              )}
            </div>
          )}

          {/* Action bottom row */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => handleReset()}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'rw' ? 'Tangira bushya' : 'Restart category'}</span>
            </button>

            {hasAnswered && currentIdx < filteredQuestions.length - 1 && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm cursor-pointer"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
