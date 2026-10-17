import React, { useState, useMemo } from 'react';
import { 
  X, Search, Filter, BookOpen, ShieldCheck, CheckCircle2, 
  Lock, Zap, Sparkles, Award, ArrowRight, Eye, EyeOff, Check
} from 'lucide-react';
import { Language, Question, QuestionCategory } from '../types';
import { QUESTIONS_BANK } from '../data/questions';
import { TRANSLATIONS } from '../data/translations';
import { RoadSignGraphic } from './RoadSignGraphic';

interface AllQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isUserPro: boolean;
  onOpenPricingWithPlan: (plan: 'daily' | 'weekly' | 'monthly' | 'single_exam') => void;
  onStartExam: (category?: string) => void;
}

export const AllQuestionsModal: React.FC<AllQuestionsModalProps> = ({
  isOpen,
  onClose,
  language,
  isUserPro,
  onOpenPricingWithPlan,
  onStartExam,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: language === 'rw' ? 'Ibibazo Byose' : 'All Questions' },
    { id: 'amategeko', label: language === 'rw' ? 'Amategeko yo Gutambuka' : 'Priority Rules' },
    { id: 'umutekano', label: language === 'rw' ? 'Umutekano wo mu Muhanda' : 'Road Safety' },
    { id: 'ubutabazi', label: language === 'rw' ? 'Ubutabazi n\'Impanuka' : 'First Aid' },
    { id: 'ibinyabiziga', label: language === 'rw' ? 'Umuvuduko & Ibinyabiziga' : 'Vehicles & Speed' },
    { id: 'ibisabwa', label: language === 'rw' ? 'Ibisabwa & Amande 2026' : 'Fines & Rules' },
  ];

  // Strictly traffic law & code questions without road signs (whout ibyapa as requested)
  const questionsWithoutSigns = useMemo(() => {
    return QUESTIONS_BANK.filter((q) => q.category !== 'ibyapa' && !q.signCode && !q.signSvgType);
  }, []);

  const filteredQuestions = useMemo(() => {
    return questionsWithoutSigns.filter((q) => {
      if (selectedCategory !== 'all' && q.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const qText = (q.question[language] || q.question.rw).toLowerCase();
        const query = searchQuery.toLowerCase();
        const optionsText = q.options.map((o) => (o.text[language] || o.text.rw).toLowerCase()).join(' ');
        return qText.includes(query) || optionsText.includes(query);
      }
      return true;
    });
  }, [questionsWithoutSigns, selectedCategory, searchQuery, language]);

  const toggleRevealAnswer = (qId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectOption = (qId: string, optId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  // First 5 questions preview for non-pro
  const FREE_PREVIEW_COUNT = 5;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-scaleUp overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Ububiko bw'Ibibazo Bitarimo Ibyapa (Without Signs)
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {questionsWithoutSigns.length} Questions
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'rw' 
                ? 'Ibibazo Byose by\'Amategeko y\'Umuhanda (Bitarimo Ibyapa)' 
                : 'All Traffic Regulations Bank (Without Road Signs)'}
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              {language === 'rw'
                ? 'Ububiko bwuzuye bw\'ibibazo by\'amategeko y\'umuhanda bibazwa na Polisi y\'u Rwanda (amategeko, umuvuduko, ibinyabiziga, amande, ubutabazi). Hitamo ipaki ya 1,000 FRW (Daily), 2,500 FRW (Weekly), cyangwa 5,000 FRW (Monthly) ngo ubifungure byose.'
                : 'Complete bank of traffic regulations, right-of-way, speeds, vehicle mechanics, safety, first aid and fines without road signs. Subscribe Daily (1k), Weekly (2.5k) or Monthly (5k) to unlock.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 SEPARATED SUBSCRIPTION TIERS BANNER */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                {language === 'rw' ? 'Amashami yo Kwishyura Ibibazo Byose' : 'Payment Plans for All Questions'}
              </span>
            </div>
            {isUserPro && (
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                PRO Yafunguwe ✓
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Daily: 1,000 FRW */}
            <div className="bg-slate-800/90 border border-amber-500/40 rounded-2xl p-3.5 flex flex-col justify-between hover:border-amber-400 transition-all">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Ku Munsi (Daily)
                  </span>
                  <span className="text-xs font-bold text-slate-300">24h Access</span>
                </div>
                <div className="text-xl font-black text-white mt-1">1,000 FRW</div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {language === 'rw' ? 'Ibibazo byose n\'ibizamini mu masaha 24' : 'All questions & mock tests for 24 hours'}
                </p>
              </div>

              <button
                onClick={() => onOpenPricingWithPlan('daily')}
                className="mt-3 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
              >
                {language === 'rw' ? 'Ishyura 1,000 FRW (Daily)' : 'Pay 1,000 FRW Daily'}
              </button>
            </div>

            {/* Weekly: 2,500 FRW */}
            <div className="bg-slate-800/90 border-2 border-emerald-500 rounded-2xl p-3.5 flex flex-col justify-between relative shadow-md ring-2 ring-emerald-500/30">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                {language === 'rw' ? 'Ikunzwe Cyane' : 'Most Popular'}
              </span>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    Mu Cyumweru (Weekly)
                  </span>
                  <span className="text-xs font-bold text-slate-300">Iminsi 7</span>
                </div>
                <div className="text-xl font-black text-emerald-400 mt-1">2,500 FRW</div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {language === 'rw' ? 'Kora ibizamini bitagira umupaka mu cyumweru cyose' : 'Unlimited tests & answers for 7 days'}
                </p>
              </div>

              <button
                onClick={() => onOpenPricingWithPlan('weekly')}
                className="mt-3 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
              >
                {language === 'rw' ? 'Ishyura 2,500 FRW (Weekly)' : 'Pay 2,500 FRW Weekly'}
              </button>
            </div>

            {/* Monthly: 5,000 FRW */}
            <div className="bg-slate-800/90 border border-purple-500/40 rounded-2xl p-3.5 flex flex-col justify-between hover:border-purple-400 transition-all">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-400/20 text-purple-300 border border-purple-400/30">
                    Ku Kwezi (Monthly)
                  </span>
                  <span className="text-xs font-bold text-slate-300">Ukwezi (30d)</span>
                </div>
                <div className="text-xl font-black text-purple-300 mt-1">5,000 FRW</div>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                  {language === 'rw' ? 'Uburenganzira bwuzuye bw\'ukwezi + Icyemezo cy\'ubwitegure' : 'Full 30-day VIP pass + Readiness Certificate'}
                </p>
              </div>

              <button
                onClick={() => onOpenPricingWithPlan('monthly')}
                className="mt-3 w-full bg-purple-500 hover:bg-purple-400 text-white font-black py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
              >
                {language === 'rw' ? 'Ishyura 5,000 FRW (Monthly)' : 'Pay 5,000 FRW Monthly'}
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-200 bg-white space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'rw' ? 'Shakisha mu bibazo byose (urugero: rond-point, umuvuduko, ibyapa, feri)...' : 'Search questions...'}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-2 pl-9 pr-4 text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Scrollable List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50">
          {filteredQuestions.map((q, idx) => {
            const isLocked = !isUserPro && idx >= FREE_PREVIEW_COUNT;
            const isAnswerRevealed = revealedAnswers[q.id];
            const userSelectedOpt = selectedAnswers[q.id];

            if (isLocked) {
              return (
                <div
                  key={q.id}
                  className="bg-white border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      Ikibazo cya #{idx + 1} ({q.category.toUpperCase()}) kirafunze
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Kugira ngo ubone ibisubizo by'ukuri, ibisobanuro n'ingingo z'amategeko z'iki kibazo, hitamo ipaki yo kwishyura:
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenPricingWithPlan('daily')}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      Daily (1,000 FRW)
                    </button>
                    <button
                      onClick={() => onOpenPricingWithPlan('weekly')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs"
                    >
                      Weekly (2,500 FRW)
                    </button>
                    <button
                      onClick={() => onOpenPricingWithPlan('monthly')}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                    >
                      Monthly (5,000 FRW)
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                      #{idx + 1}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {q.category}
                    </span>
                    {!isUserPro && idx < FREE_PREVIEW_COUNT && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Free Preview
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleRevealAnswer(q.id)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    {isAnswerRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isAnswerRevealed ? 'Hisha Igisubizo' : 'Erekana Igisubizo'}</span>
                  </button>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {q.question[language] || q.question.rw}
                </h3>

                {q.signSvgType && (
                  <div className="flex justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-xs mx-auto">
                    <RoadSignGraphic type={q.signSvgType} size={70} />
                  </div>
                )}

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isSelected = userSelectedOpt === opt.id;
                    const isCorrect = opt.id === q.correctAnswerId;

                    let optStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
                    if (isAnswerRevealed) {
                      if (isCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isSelected) {
                        optStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                      }
                    } else if (isSelected) {
                      optStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-3 rounded-xl border flex items-start gap-3 text-xs sm:text-sm cursor-pointer transition-all ${optStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                          isAnswerRevealed && isCorrect 
                            ? 'bg-emerald-600 text-white' 
                            : isSelected 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {letter}
                        </span>
                        <span className="flex-1 pt-0.5">{opt.text[language] || opt.text.rw}</span>
                        {isAnswerRevealed && isCorrect && (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 shrink-0">
                            <Check className="w-3.5 h-3.5" />
                            <span>Igisubizo Nyacyo</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isAnswerRevealed && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-1 animate-fadeIn">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Ibisobanuro & Ingingo y'Amategeko</span>
                    </div>
                    <p className="leading-relaxed">
                      {q.explanation[language] || q.explanation.rw}
                    </p>
                    {q.legalReference && (
                      <div className="font-semibold text-emerald-800 pt-1 text-[11px]">
                        Ingingo: {q.legalReference}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Ukeneye kwimenyereza mu kizamini cy'isaha? Kanda kuri "Tangira Ikizamini".
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onStartExam(selectedCategory !== 'all' ? selectedCategory : undefined);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Tangira Ikizamini cya 20/20</span>
            </button>
            <button
              onClick={onClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
            >
              Funga
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
