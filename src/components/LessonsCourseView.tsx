import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle, Clock, Volume2, VolumeX, ArrowRight, 
  ShieldCheck, Award, Zap, Sparkles, FileText, Check 
} from 'lucide-react';
import { Language } from '../types';
import { LESSON_MODULES } from '../data/lessonsData';
import { RoadSignGraphic } from './RoadSignGraphic';
import { RnpPdfQuestionsArchive } from './RnpPdfQuestionsArchive';

interface LessonsCourseViewProps {
  language: Language;
  onStartExam: () => void;
}

export const LessonsCourseView: React.FC<LessonsCourseViewProps> = ({
  language,
  onStartExam,
}) => {
  const [activeView, setActiveView] = useState<'chapters' | 'pdf_archive'>('chapters');
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Check URL hash for direct navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#ibibazo-bya-polisi' || hash === '#pdf-questions' || hash === '#archive') {
        setActiveView('pdf_archive');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const activeModule = LESSON_MODULES[activeModuleIndex] || LESSON_MODULES[0];

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'rw';
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const handleQuizAnswer = (moduleId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [moduleId]: optionId,
    }));
  };

  const currentAnswer = selectedAnswers[activeModule.id];
  const isQuizCorrect = currentAnswer === activeModule.quickCheck.correctId;

  // IF USER IS IN THE OFFICIAL RNP PDF QUESTIONS ARCHIVE VIEW
  if (activeView === 'pdf_archive') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <RnpPdfQuestionsArchive
          language={language}
          onBackToLessons={() => {
            setActiveView('chapters');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onStartExam={onStartExam}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Amasomo y'Amategeko y'Umuhanda mu Rwanda</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'rw' ? 'Amasomo Yuzuye yo Kwiga Amategeko' : 'Interactive Traffic Code Course'}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {language === 'rw' 
              ? 'Wige intambwe ku yindi amategeko n\'ibyapa byose bikunze kubazwa mu bizamini bya Polisi.'
              : 'Master Rwandan road rules step by step with clear chapters, illustrations, and self-checks.'}
          </p>
        </div>

        <button
          onClick={onStartExam}
          className="self-start sm:self-auto flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>{language === 'rw' ? 'Kora Ikizamini cy\'Amasomo' : 'Take Lesson Exam'}</span>
        </button>
      </div>

      {/* =========================================================================
          PROMINENT LINK TO UPLOADED PDF QUESTIONS ARCHIVE INSIDE AMASOMO
         ========================================================================= */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-emerald-500/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ibibazo byatanzwe bya Polisi (Official PDF Collection)</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            {language === 'rw' 
              ? '🔗 Fungura Ibibazo Nyabyo bya Polisi y\'u Rwanda & Upload Questions' 
              : '🔗 Access Official Police Questions Archive & Upload Questions'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {language === 'rw'
              ? 'Kanda kuri iyi link urebe ibibazo byose nyabyo byo mu gitabo cy\'ikizamini cya Polisi y\'u Rwanda (bifite ibisubizo by\'ukuri byemejwe mu mutuku nk\'uko biri muri PDF). Ushobora no gushyiramo ibindi bibazo bishya (Upload Questions)!'
              : 'Click this link to browse all verified Rwanda National Police theory questions with authentic red-marked answers, plus an integrated tool to upload or import your own questions.'}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11px] font-bold text-emerald-300">
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">✓ Ibibazo 230+ Byatanzwe</span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">✓ Ibisubizo by'Ukuri mu Mutuku</span>
            <span className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">✓ Shyiramo Ibibazo (Upload)</span>
          </div>
        </div>

        {/* Big Link Action Button */}
        <button
          type="button"
          onClick={() => {
            setActiveView('pdf_archive');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black px-6 py-4 rounded-2xl text-xs sm:text-sm shadow-xl shadow-emerald-950/60 shrink-0 cursor-pointer flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 ring-2 ring-emerald-400/40 relative z-10"
        >
          <FileText className="w-5 h-5 text-slate-950" />
          <span>{language === 'rw' ? '🔗 Fungura Ibibazo & Upload' : '🔗 Open Questions & Upload'}</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </section>

      {/* Main Amasomo Course Chapters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Module Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          
          {/* Highlighted Shortcut to PDF Questions in sidebar */}
          <button
            type="button"
            onClick={() => {
              setActiveView('pdf_archive');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full text-left p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/80 hover:bg-emerald-100 transition-all cursor-pointer shadow-xs group"
          >
            <div className="flex items-center justify-between text-xs text-emerald-800 font-bold mb-1">
              <span className="font-mono font-black uppercase">🔗 Ibibazo bya Polisi</span>
              <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black">230+ Qs</span>
            </div>
            <h4 className="text-sm font-black text-emerald-950 group-hover:text-emerald-800 transition-colors">
              Ibibazo byo muri PDF y'Ibizamini
            </h4>
            <p className="text-xs text-emerald-900/80 mt-1">
              Reba ibibazo byose hamwe n'ibisubizo by'ukuri mu mutuku
            </p>
          </button>

          <div className="pt-2 text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Imitwe y'Amasomo (Chapters):
          </div>

          {LESSON_MODULES.map((module, idx) => {
            const isActive = idx === activeModuleIndex;
            return (
              <button
                key={module.id}
                onClick={() => {
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                  setActiveModuleIndex(idx);
                }}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span className="font-bold text-emerald-700">Module 0{idx + 1}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {module.duration}
                  </span>
                </div>
                <h4 className={`text-sm font-bold leading-snug ${
                  isActive ? 'text-emerald-950 font-black' : 'text-slate-800'
                }`}>
                  {module.title[language] || module.title.rw}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {module.description[language] || module.description.rw}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Active Lesson Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Module header & Audio button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase">
                  Module 0{activeModuleIndex + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {activeModule.title[language] || activeModule.title.rw}
                </h3>
              </div>

              <button
                onClick={() => {
                  const fullText = activeModule.chapters
                    .map((c) => `${c.title[language] || c.title.rw}. ${c.content[language] || c.content.rw}`)
                    .join('. ');
                  handleSpeak(fullText);
                }}
                className={`self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'Hagarika Ijwi' : 'Umva Isomo mu Ijwi'}</span>
              </button>
            </div>

            {/* Chapters */}
            <div className="space-y-6">
              {activeModule.chapters.map((chap, cIdx) => (
                <div key={cIdx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {cIdx + 1}
                    </span>
                    <h4 className="font-bold text-base text-slate-900">
                      {chap.title[language] || chap.title.rw}
                    </h4>
                  </div>

                  {chap.signType && (
                    <div className="flex justify-center p-3 bg-white border border-slate-200 rounded-xl max-w-xs mx-auto">
                      <RoadSignGraphic type={chap.signType} size={76} />
                    </div>
                  )}

                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {chap.content[language] || chap.content.rw}
                  </p>
                </div>
              ))}
            </div>

            {/* Knowledge Quick Check at end of lesson */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 font-black text-emerald-950 text-sm">
                <Zap className="w-4 h-4 text-emerald-700" />
                <span>{language === 'rw' ? 'Isuzume ku Byo Wize (Quick Self-Check)' : 'Quick Knowledge Check'}</span>
              </div>

              <p className="font-bold text-sm text-slate-900">
                {activeModule.quickCheck.question[language] || activeModule.quickCheck.question.rw}
              </p>

              <div className="space-y-2">
                {activeModule.quickCheck.options.map((opt) => {
                  const isSelected = currentAnswer === opt.id;
                  const isCorrect = opt.id === activeModule.quickCheck.correctId;

                  let optClass = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';
                  if (currentAnswer) {
                    if (isCorrect) {
                      optClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optClass = 'bg-rose-100 border-rose-400 text-rose-950 font-semibold';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizAnswer(activeModule.id, opt.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <span>{opt.text[language] || opt.text.rw}</span>
                      {currentAnswer && isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {currentAnswer && (
                <div className={`text-xs font-bold p-3 rounded-xl ${
                  isQuizCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                }`}>
                  {isQuizCorrect 
                    ? (language === 'rw' ? '🎉 Wagikoze neza! Urasobanukiwe n\'iri somo.' : '🎉 Correct! You mastered this concept.')
                    : (language === 'rw' ? 'Ongera urebe igisubizo cy\'ukuri hejuru.' : 'Review the correct answer indicated above.')}
                </div>
              )}
            </div>

            {/* Next Module Button */}
            {activeModuleIndex < LESSON_MODULES.length - 1 && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    setActiveModuleIndex((prev) => prev + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  <span>{language === 'rw' ? 'Komeza ku Isomo Ririkurikira' : 'Next Lesson'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
