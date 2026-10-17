import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  BookOpen, Search, CheckCircle2, XCircle, Eye, EyeOff, 
  Volume2, VolumeX, ArrowLeft, ShieldCheck, Award, Zap, HelpCircle, 
  ChevronRight, Sparkles, Filter, Hash, Check
} from 'lucide-react';
import { Language } from '../types';
import { RNP_ARCHIVE_QUESTIONS, RNPArchiveQuestion } from '../data/rnpArchiveQuestions';
import { RoadSignGraphic } from './RoadSignGraphic';

interface RnpPdfQuestionsArchiveProps {
  language: Language;
  onBackToLessons: () => void;
  onStartExam?: () => void;
}

export const RnpPdfQuestionsArchive: React.FC<RnpPdfQuestionsArchiveProps> = ({
  language,
  onBackToLessons,
  onStartExam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'study' | 'quiz'>('study');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: language === 'rw' ? 'Ibibazo Byose' : 'All Questions' },
    { id: 'amategeko', label: language === 'rw' ? 'Amategeko Shingiro' : 'General Rules' },
    { id: 'ibinyabiziga', label: language === 'rw' ? 'Ibinyabiziga & Romoruki' : 'Vehicles & Mechanics' },
    { id: 'amatara', label: language === 'rw' ? 'Amatara & Utugarurarumuri' : 'Lights & Signals' },
    { id: 'umuvuduko', label: language === 'rw' ? 'Umuvuduko & Amahoni' : 'Speed & Horns' },
    { id: 'ibyapa', label: language === 'rw' ? 'Ibyapa by\'Umuhanda' : 'Road Signs' },
    { id: 'umutekano', label: language === 'rw' ? 'Umutekano & Impanuka' : 'Safety & First Aid' },
  ];

  const filteredQuestions = useMemo(() => {
    return RNP_ARCHIVE_QUESTIONS.filter((q) => {
      // Category filter
      if (selectedCategory !== 'all' && q.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const numMatch = q.number.toString().includes(query);
        const qMatch = q.question.toLowerCase().includes(query);
        const optMatch = q.options.some((o) => o.text.toLowerCase().includes(query));
        return numMatch || qMatch || optMatch;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectOption = (qId: string, optId: string, correctId: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optId }));
    if (optId === correctId) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  };

  const toggleExplanation = (qId: string) => {
    setRevealedExplanations((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSpeak = (q: RNPArchiveQuestion) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingId === q.id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const fullText = `${q.question}. ${q.options.map((o) => `${o.id.toUpperCase()}: ${o.text}`).join('. ')}`;
    const utter = new SpeechSynthesisUtterance(fullText);
    utter.lang = 'rw';
    utter.onend = () => setIsSpeakingId(null);
    utter.onerror = () => setIsSpeakingId(null);
    setIsSpeakingId(q.id);
    window.speechSynthesis.speak(utter);
  };

  // Quick statistics
  const answeredTotal = Object.keys(userAnswers).length;
  const correctTotal = Object.entries(userAnswers).filter(
    ([qId, optId]) => {
      const target = RNP_ARCHIVE_QUESTIONS.find((q) => q.id === qId);
      return target && target.correctAnswerId === optId;
    }
  ).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner & Navigation */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBackToLessons}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'rw' ? 'Subira ku Masomo Yuzuye' : 'Back to Lessons'}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-500/40">
                {RNP_ARCHIVE_QUESTIONS.length} Questions (Official Document)
              </span>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Polisi y'u Rwanda • Official PDF Questions Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              {language === 'rw' 
                ? '🔗 Ibibazo Nyabyo by\'Ikizamini cya Polisi y\'u Rwanda' 
                : 'Official Rwanda National Police Theory Exam Questions Archive'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              {language === 'rw'
                ? 'Ibi ni byo bibazo byose byo mu kizamini cy\'amategeko y\'umuhanda cya Polisi y\'u Rwanda (RESTRICTED Document) byashyizwe hano hamwe n\'ibisubizo by\'ukuri byemejwe (Ibisubizo byanditswe mu mutuku). Wige buri kibazo, kora imyitozo, kandi witegure neza.'
                : 'Complete verified bank of official Rwanda National Police (RNP) driving theory examination questions with the authentic red-marked correct answers. Study, practice, and test your knowledge.'}
            </p>
          </div>

          {/* Mode Switcher: Study vs Self-Quiz */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2 bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
              <button
                type="button"
                onClick={() => setStudyMode('study')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  studyMode === 'study'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                📖 Kwiga (Ibisubizo by'Ukuri Byerekanwe)
              </button>

              <button
                type="button"
                onClick={() => setStudyMode('quiz')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  studyMode === 'quiz'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🎯 Kwisuzuma (Self-Quiz Mode)
              </button>
            </div>

            {studyMode === 'quiz' && answeredTotal > 0 && (
              <div className="flex items-center gap-3 text-xs font-mono font-bold">
                <span className="text-emerald-400">Amanota: {correctTotal} / {answeredTotal}</span>
                <span className="text-slate-400">({Math.round((correctTotal / answeredTotal) * 100)}%)</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'rw' ? 'Shakisha ikibazo cyangwa numero (urugero: 1, 25, 220, feri, STOP...)' : 'Search question or number...'}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-slate-900 focus:outline-hidden"
            />
          </div>

          <span className="text-xs font-mono font-bold text-slate-500 shrink-0 self-center">
            {filteredQuestions.length} Ibibazo bibonetse
          </span>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Nta kibazo kigiye n'ibyo ushakishije</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Ongera ugenzure amagambo wanditse cyangwa uhitemo icyiciro cya 'Byose' kugira ngo ubone ibibazo byose.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const isAnswered = !!userAnswer;
            const isUserCorrect = userAnswer === q.correctAnswerId;
            const isExplanationOpen = revealedExplanations[q.id];
            const isPlayingAudio = isSpeakingId === q.id;

            return (
              <div
                key={q.id}
                id={`q-${q.number}`}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-5"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-mono font-black text-sm flex items-center justify-center shadow-xs">
                      #{q.number}
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {q.category}
                    </span>
                    {q.signCode && (
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        Code: {q.signCode}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Audio speech button */}
                    <button
                      type="button"
                      onClick={() => handleSpeak(q)}
                      title="Soma iki kibazo mu jwi"
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Quick Explanation button */}
                    {q.explanation && (
                      <button
                        type="button"
                        onClick={() => toggleExplanation(q.id)}
                        className="text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        {isExplanationOpen ? 'Hisha Ubusobanuro' : 'Ubusobanuro'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {q.question}
                </h3>

                {/* Road Sign Graphic if applicable */}
                {q.signSvgType && (
                  <div className="flex justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto">
                    <RoadSignGraphic type={q.signSvgType} size={84} />
                  </div>
                )}

                {/* Options list */}
                <div className="space-y-2.5">
                  {q.options.map((opt) => {
                    const isOptionCorrect = opt.id === q.correctAnswerId;
                    const isSelected = userAnswer === opt.id;

                    let optContainerStyle = 'border-slate-200 bg-white text-slate-800 hover:border-slate-300';
                    let letterBadgeStyle = 'bg-slate-100 text-slate-700';

                    if (studyMode === 'study') {
                      // In study mode, show the official red verified answer as highlighted in the PDF!
                      if (isOptionCorrect) {
                        optContainerStyle = 'border-rose-400 bg-rose-50/80 text-rose-950 font-bold ring-1 ring-rose-400';
                        letterBadgeStyle = 'bg-rose-600 text-white font-black';
                      }
                    } else {
                      // In quiz mode: show user feedback
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          optContainerStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold';
                          letterBadgeStyle = 'bg-emerald-600 text-white font-black';
                        } else if (isSelected && !isOptionCorrect) {
                          optContainerStyle = 'border-rose-400 bg-rose-50/90 text-rose-950 font-bold';
                          letterBadgeStyle = 'bg-rose-600 text-white font-black';
                        }
                      } else {
                        optContainerStyle = 'border-slate-200 hover:border-emerald-400 bg-white text-slate-800';
                      }
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => studyMode === 'quiz' && handleSelectOption(q.id, opt.id, q.correctAnswerId)}
                        className={`p-3.5 rounded-2xl border-2 flex items-start justify-between gap-3 text-xs sm:text-sm transition-all ${optContainerStyle} ${
                          studyMode === 'quiz' && !isAnswered ? 'cursor-pointer hover:scale-[1.01]' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${letterBadgeStyle}`}>
                            {opt.id.toUpperCase()}
                          </span>
                          <span className="leading-relaxed pt-0.5">{opt.text}</span>
                        </div>

                        {/* Verified badge */}
                        {studyMode === 'study' && isOptionCorrect && (
                          <span className="text-[11px] font-black text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1 border border-rose-300">
                            <Check className="w-3.5 h-3.5 text-rose-700" />
                            <span>Igisubizo cy'Ukuri (PDF)</span>
                          </span>
                        )}

                        {studyMode === 'quiz' && isAnswered && isOptionCorrect && (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Ibyo (+1)</span>
                          </span>
                        )}

                        {studyMode === 'quiz' && isAnswered && isSelected && !isOptionCorrect && (
                          <span className="text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-rose-700" />
                            <span>Wakosheje</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation accordion */}
                {(isExplanationOpen || (studyMode === 'quiz' && isAnswered)) && q.explanation && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5 animate-fadeIn">
                    <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Ubusobanuro bw'Amategeko:</span>
                    </div>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
