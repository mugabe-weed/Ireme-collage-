import React, { useState, useMemo } from 'react';
import { 
  Award, Clock, Play, ShieldCheck, CheckCircle2, Zap, Lock, Sparkles, 
  ArrowRight, BookOpen, Layers, Volume2, HelpCircle, ChevronDown, ChevronUp,
  Eye, EyeOff, Check, XCircle
} from 'lucide-react';
import { Language, Question } from '../types';
import { RoadSignGraphic } from './RoadSignGraphic';
import { ROAD_SIGNS } from '../data/roadSigns';
import { QUESTIONS_BANK } from '../data/questions';

interface ExamSeriesViewProps {
  language: Language;
  onLaunchExam: (category?: string) => void;
  onOpenPricing: () => void;
  isUserPro: boolean;
  onNavigateTab?: (tab: string) => void;
  onOpenPricingWithPlan?: (plan: 'daily' | 'weekly' | 'monthly' | 'single_exam') => void;
  onOpenAllQuestions?: () => void;
}

export const ExamSeriesView: React.FC<ExamSeriesViewProps> = ({
  language,
  onLaunchExam,
  onOpenPricing,
  isUserPro,
  onNavigateTab,
  onOpenPricingWithPlan,
  onOpenAllQuestions,
}) => {
  const [isInlineQuestionsOpen, setIsInlineQuestionsOpen] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleOpenPlan = (plan: 'daily' | 'weekly' | 'monthly' | 'single_exam') => {
    if (onOpenPricingWithPlan) {
      onOpenPricingWithPlan(plan);
    } else {
      onOpenPricing();
    }
  };

  const handleOpenAllQuestionsBank = () => {
    if (onOpenAllQuestions) {
      onOpenAllQuestions();
    }
    // Also toggle inline view for immediate certainty
    setIsInlineQuestionsOpen(true);
  };

  // Filter questions strictly without road signs (whout ibyapa as requested)
  const questionsWithoutSigns = useMemo(() => {
    return QUESTIONS_BANK.filter((q) => q.category !== 'ibyapa' && !q.signCode && !q.signSvgType);
  }, []);

  const filteredInlineQuestions = useMemo(() => {
    if (selectedCategory === 'all') return questionsWithoutSigns;
    return questionsWithoutSigns.filter((q) => q.category === selectedCategory);
  }, [questionsWithoutSigns, selectedCategory]);

  const toggleRevealAnswer = (qId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSelectOption = (qId: string, optId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  // Top high-yield road signs frequently tested in the RNP Provisional Exam
  const highYieldSigns = ROAD_SIGNS.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-10">
      
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black mb-2 border border-emerald-200">
          <Award className="w-3.5 h-3.5" />
          <span>Polisi y'u Rwanda • RNP Provisional Exam Simulator 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'rw' ? 'Ibizamini bya Provisoire & Ibibazo Byose' : 'Provisional Driving Exam & Questions Bank'}
        </h1>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl leading-relaxed">
          {language === 'rw'
            ? 'Kanda kuri link y\'ikizamini cya provisoire (kigira ibibazo 2 by\'ubuntu mbere yo kwishyura) cyangwa ufungure ububiko bw\'ibibazo byose bitarimo ibyapa byiciyemo amapaki ya buri munsi (1,000 Frw), buri cyumweru (2,500 Frw), na buri kwezi (5,000 Frw).'
            : 'Click the single official provisional mock exam link (openable before payment with 2 free basic questions) or access all traffic questions without road signs with daily, weekly, and monthly payment plans.'}
        </p>
      </div>

      {/* =========================================================================
          1. ONE LINK FOR IKIZAMINI CYA PROVISOIRE (CAN BE OPENED BEFORE PAYMENT!)
         ========================================================================= */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-500/50 relative overflow-hidden transition-all hover:border-emerald-400">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onLaunchExam()}
              className="flex items-center gap-2 cursor-pointer group text-left"
            >
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-900/90 text-emerald-300 border border-emerald-500/50 group-hover:bg-emerald-800 transition-colors">
                {language === 'rw' ? '🔓 Gufungura ni Ubuntu (Can be opened before payment)' : '🔓 Free to Open Before Payment'}
              </span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full">
                2 Free Trial Questions • 500 FRW PRO
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              
              {/* CLICKABLE TITLE LINK */}
              <button
                type="button"
                onClick={() => onLaunchExam()}
                className="text-left group cursor-pointer block w-full focus:outline-hidden"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight group-hover:text-emerald-300 transition-colors flex items-center gap-3">
                  <span className="text-emerald-400">🔗 Fungura Ikizamini cya Provisoire</span>
                  <span className="text-slate-400 text-lg font-bold group-hover:text-white hidden sm:inline">(RNP Simulator 2026)</span>
                </h2>
                <div className="h-0.5 w-24 bg-emerald-500 group-hover:w-48 transition-all duration-300 mt-2" />
              </button>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {language === 'rw' ? (
                  <>
                    Ibizamini bya provisoire byose byashyizwe muri <strong>iyi link imwe rukumbi</strong>. <strong className="text-emerald-300 underline cursor-pointer" onClick={() => onLaunchExam()}>Ushobora kugifungura mbere yo kwishyura</strong>! Uhabwa <strong>ibibazo 2 bya mbere by'ubuntu (2 Free Basic Questions)</strong> byo kwisuzuma, kumva amajwi, no kugerageza uburyo ikizamini gikorwa. Nushaka gukomeza ku bindi bibazo 18 bisigaye (kora 20/20), wishyura <strong>500 FRW</strong> gusa kuri MTN Mobile Money cyangwa Airtel Money.
                  </>
                ) : (
                  <>
                    All provisional exam sets are unified into <strong>this single link</strong>. <strong className="text-emerald-300 underline cursor-pointer" onClick={() => onLaunchExam()}>It can be opened before payment</strong>! You get <strong>2 Free Basic Questions</strong> to test your readiness, hear audio narration, and explore the interface. To unlock the remaining 18 questions (full 20/20 simulation), pay just <strong>500 FRW</strong> via MTN MoMo or Airtel Money.
                  </>
                )}
              </p>

              {/* Feature specs pills */}
              <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>20 Iminota (Timer)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold">
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>20 Ibibazo Rusange</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold">
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Amajwi mu Kinyarwanda</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Gutsinda: 12/20</span>
                </span>
              </div>
            </div>

            {/* Actions Column */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              
              {/* PRIMARY LINK BUTTON: Can be opened before payment! */}
              <button
                type="button"
                onClick={() => onLaunchExam()}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black py-4 px-6 rounded-2xl text-sm shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer ring-2 ring-emerald-400/40"
              >
                <Play className="w-5 h-5 fill-slate-950 shrink-0" />
                <span className="text-left font-black tracking-tight">
                  {language === 'rw' 
                    ? '🔗 Fungura Ikizamini (Kora Ibibazo 2 by\'Ubuntu)' 
                    : '🔗 Open Exam (Try 2 Free Questions)'}
                </span>
              </button>

              {/* Direct 500 FRW PRO Button */}
              <button
                type="button"
                onClick={() => handleOpenPlan('single_exam')}
                className="w-full bg-slate-800/90 hover:bg-slate-800 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>
                  {language === 'rw' ? 'Ishyura 500 FRW (Fungura Ibibazo Byose 20)' : 'Pay 500 FRW (Unlock Full 20/20 Test)'}
                </span>
              </button>

              <div className="text-[11px] text-center text-slate-400">
                {language === 'rw'
                  ? '⚡ Ubwishyu bwemezwa ako kanya na MTN Mobile Money cyangwa Airtel Money API'
                  : '⚡ Instant activation via MTN MoMo and Airtel Money API'}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          2. ALL QUESTIONS BANK WITHOUT ROAD SIGNS (WHOUT IBYAPA)
             SEPARATED BY: MONTHLY 5K, WEEKLY 2500, DAILY 1000
         ========================================================================= */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === 'rw' ? 'Ububiko bw\'Ibibazo Byose (Bitarimo Ibyapa)' : 'All Questions Bank (Without Road Signs)'}
              </span>
            </div>

            {/* CLICKABLE ALL QUESTIONS TITLE LINK */}
            <button
              type="button"
              onClick={handleOpenAllQuestionsBank}
              className="text-left group cursor-pointer block focus:outline-hidden"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>🔗 Fungura Ibibazo Byose by'Amategeko y'Umuhanda (Bitarimo Ibyapa)</span>
              </h2>
              <div className="h-0.5 w-20 bg-amber-400 group-hover:w-44 transition-all duration-300 mt-2" />
            </button>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === 'rw'
                ? 'Kanda kuri iyi link urebe ibibazo byose by\'amategeko y\'umuhanda bibazwa na Polisi y\'u Rwanda bikuramo ibyapa (amategeko yo gutambuka, ubutwererane, umuvuduko, ibinyabiziga, umutekano, amande 2026, n\'ubutabazi). Hitamo uburyo bwo kwishyura: Ku Munsi (1,000 FRW), Mu Cyumweru (2,500 FRW), cyangwa Ku Kwezi (5,000 FRW).'
                : 'Open the full bank of Rwanda traffic code questions without road signs (priority rules, right of way, speeds, vehicle regulations, 2026 fines, safety, and first aid). Choose your subscription: Daily (1,000 FRW), Weekly (2,500 FRW), or Monthly (5,000 FRW).'}
            </p>
          </div>

          {/* Direct Link Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenAllQuestionsBank}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-4 rounded-2xl text-xs sm:text-sm shadow-lg shadow-amber-950/50 cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span>{language === 'rw' ? '🔗 Fungura Ibibazo Byose' : '🔗 Open All Questions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsInlineQuestionsOpen(!isInlineQuestionsOpen)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-4 rounded-2xl text-xs border border-slate-700 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              <span>{isInlineQuestionsOpen ? 'Hisha Ibibazo' : 'Reba Hano (Inline)'}</span>
              {isInlineQuestionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Separated 3 Subscription Tiers: Monthly 5k, Weekly 2500, Daily 1000 */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'rw' ? 'Amashami yo Kwishyura Ibibazo Byose (Hitamo Ipaki):' : 'Choose Your Subscription Access:'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. Daily: 1,000 FRW */}
            <div className="bg-slate-800/80 hover:bg-slate-800 border border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Ku Munsi (Daily)
                  </span>
                  <span className="text-xs font-bold text-slate-400">24h Pass</span>
                </div>
                <div className="text-2xl font-black text-white mt-1">1,000 FRW</div>
                <p className="text-xs text-slate-300 mt-1.5 leading-snug">
                  {language === 'rw' 
                    ? 'Ubwishyu bw\'umunsi 1: Kora ibibazo byose by\'amategeko y\'umuhanda n\'ibizamini byose bitarimo ibyapa mu masaha 24.' 
                    : '1-day pass: access all traffic questions and simulations without road signs for 24 hours.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPlan('daily')}
                className="mt-5 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Ishyura 1,000 FRW (Daily)</span>
              </button>
            </div>

            {/* 2. Weekly: 2,500 FRW */}
            <div className="bg-slate-800/80 hover:bg-slate-800 border-2 border-emerald-500 rounded-2xl p-5 flex flex-col justify-between relative shadow-md ring-2 ring-emerald-500/20 transition-all">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                {language === 'rw' ? 'Ikunzwe Cyane' : 'Recommended'}
              </span>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    Mu Cyumweru (Weekly)
                  </span>
                  <span className="text-xs font-bold text-slate-400">Iminsi 7</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 mt-1">2,500 FRW</div>
                <p className="text-xs text-slate-300 mt-1.5 leading-snug">
                  {language === 'rw' 
                    ? 'Ubwishyu bw\'icyumweru: Ibizamini bitagira umupaka n\'ubusobanuro bw\'ibibazo byose mu minsi 7 yose.' 
                    : '7-day unlimited pass: practice all test series and verified answers without limits for a week.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPlan('weekly')}
                className="mt-5 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Ishyura 2,500 FRW (Weekly)</span>
              </button>
            </div>

            {/* 3. Monthly: 5,000 FRW */}
            <div className="bg-slate-800/80 hover:bg-slate-800 border border-purple-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-purple-400/20 text-purple-300 border border-purple-400/30">
                    Ku Kwezi (Monthly)
                  </span>
                  <span className="text-xs font-bold text-slate-400">Ukwezi (30d)</span>
                </div>
                <div className="text-2xl font-black text-purple-300 mt-1">5,000 FRW</div>
                <p className="text-xs text-slate-300 mt-1.5 leading-snug">
                  {language === 'rw' 
                    ? 'Ubwishyu bw\'ukwezi kwose (30d): Uburenganzira bwuzuye VIP + Icyemezo cy\'Ubwitegure cyo gutsinda kuri Polisi.' 
                    : 'Full 30-day VIP pass: all question banks + readiness certificate to pass on first try.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPlan('monthly')}
                className="mt-5 w-full bg-purple-500 hover:bg-purple-400 text-white font-black py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Ishyura 5,000 FRW (Monthly)</span>
              </button>
            </div>

          </div>
        </div>

        {/* =========================================================================
            INLINE ACCORDION: QUESTIONS BANK DIRECT VIEW (NO POPUP BARRIER)
           ========================================================================= */}
        {isInlineQuestionsOpen && (
          <div className="pt-6 border-t border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
                  {questionsWithoutSigns.length} Ibibazo Byose Bitarimo Ibyapa
                </span>
                <span className="text-xs text-slate-400">
                  (Amategeko, Umuvuduko, Ibinyabiziga, Umutekano, Amande)
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[
                  { id: 'all', label: 'Byose' },
                  { id: 'amategeko', label: 'Gutambuka' },
                  { id: 'umutekano', label: 'Umutekano' },
                  { id: 'ibinyabiziga', label: 'Ibinyabiziga' },
                  { id: 'ibisabwa', label: 'Amande' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.id 
                        ? 'bg-amber-400 text-slate-950' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
              {filteredInlineQuestions.map((q, idx) => {
                const isLocked = !isUserPro && idx >= 3;
                const isAnswerRevealed = revealedAnswers[q.id];
                const userSelectedOpt = selectedAnswers[q.id];

                if (isLocked) {
                  return (
                    <div
                      key={q.id}
                      className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 text-center space-y-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                        <Lock className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        Ikibazo cya #{idx + 1} ({q.category.toUpperCase()}) kirafunze
                      </h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Kugira ngo ubone ibisubizo by'ukuri n'ingingo z'amategeko z'iki kibazo, koresha ipaki:
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenPlan('daily')}
                          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                        >
                          Daily (1,000 FRW)
                        </button>
                        <button
                          onClick={() => handleOpenPlan('weekly')}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 py-1.5 rounded-lg text-xs cursor-pointer"
                        >
                          Weekly (2,500 FRW)
                        </button>
                        <button
                          onClick={() => handleOpenPlan('monthly')}
                          className="bg-purple-500 hover:bg-purple-400 text-white font-black px-3 py-1.5 rounded-lg text-xs cursor-pointer"
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
                    className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 text-slate-100 space-y-3.5"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs">
                          #{idx + 1}
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                          {q.category}
                        </span>
                        {!isUserPro && idx < 3 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                            Free Preview
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleRevealAnswer(q.id)}
                        className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                      >
                        {isAnswerRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{isAnswerRevealed ? 'Hisha Igisubizo' : 'Erekana Igisubizo'}</span>
                      </button>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {q.question[language] || q.question.rw}
                    </h3>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isSelected = userSelectedOpt === opt.id;
                        const isCorrect = opt.id === q.correctAnswerId;

                        let optStyle = 'border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-600';
                        if (isAnswerRevealed) {
                          if (isCorrect) {
                            optStyle = 'border-emerald-500 bg-emerald-950/80 text-emerald-200 font-semibold';
                          } else if (isSelected) {
                            optStyle = 'border-rose-500 bg-rose-950/80 text-rose-200';
                          }
                        } else if (isSelected) {
                          optStyle = 'border-amber-400 bg-amber-950/60 text-amber-200 font-semibold';
                        }

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`p-3 rounded-xl border flex items-start gap-3 text-xs sm:text-sm cursor-pointer transition-all ${optStyle}`}
                          >
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                              isAnswerRevealed && isCorrect 
                                ? 'bg-emerald-500 text-slate-950' 
                                : isSelected 
                                ? 'bg-amber-400 text-slate-950' 
                                : 'bg-slate-700 text-slate-300'
                            }`}>
                              {letter}
                            </span>
                            <span className="flex-1">{opt.text[language] || opt.text.rw}</span>
                            {isAnswerRevealed && isCorrect && (
                              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>Igisubizo cy'Ukuri</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {isAnswerRevealed && (
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 space-y-1 animate-fadeIn">
                        <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Ibisobanuro & Itegeko:</span>
                        </div>
                        <p className="leading-relaxed">
                          {q.explanation[language] || q.explanation.rw}
                        </p>
                        {q.legalReference && (
                          <div className="text-[11px] font-mono text-emerald-300 pt-1">
                            Ingingo: {q.legalReference}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </section>

      {/* =========================================================================
          3. IBYAPA BIKUNZE KUBAZWA MU BIZAMINI (HIGH-YIELD EXAM ROAD SIGNS)
         ========================================================================= */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-800 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Ibyapa Byo mu Kizamini cya Polisi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {language === 'rw' ? 'Ibyapa Bikunze Kubazwa mu Bizamini' : 'High-Yield Exam Road Signs'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
              {language === 'rw'
                ? 'Ibi ni bimwe mu byapa bikunze kubazwa kenshi mu bizamini bya provisoire kuri Polisi y\'u Rwanda.'
                : 'Road signs most frequently tested during the provisional driving theory examination.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onLaunchExam('ibyapa')}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs cursor-pointer transition-all"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'rw' ? 'Kora Ikizamini cy\'Ibyapa' : 'Road Signs Test'}</span>
            </button>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('signs')}
                className="flex items-center gap-1 text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                <span>{language === 'rw' ? 'Ibyapa Byose' : 'All Signs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* High-Yield Road Signs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {highYieldSigns.map((sign) => {
            const signName = sign.name[language] || sign.name.rw;
            return (
              <div
                key={sign.id}
                className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col items-center text-center transition-all group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <RoadSignGraphic type={sign.svgType} className="w-full h-full" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 mb-1">
                  {sign.code}
                </span>
                <span className="text-xs font-bold text-slate-800 line-clamp-2 leading-tight">
                  {signName}
                </span>
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};
