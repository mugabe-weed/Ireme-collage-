import React, { useState, useEffect } from 'react';
import { 
  Award, Layers, BookOpen, Sparkles, FileCheck, ShieldCheck, 
  ArrowRight, CheckCircle2, Zap, Clock, Shield, AlertCircle, Play,
  Scale, MessageCircle, User, Star
} from 'lucide-react';
import { Language, ExamRecord, UserProfile } from './types';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExamSimulator } from './components/ExamSimulator';
import { RoadSignsExplorer } from './components/RoadSignsExplorer';
import { PracticeMode } from './components/PracticeMode';
import { StudyGuideView } from './components/StudyGuideView';
import { FlashcardsView } from './components/FlashcardsView';
import { IremboGuideView } from './components/IremboGuideView';
import { StatsDashboardView } from './components/StatsDashboardView';
import { LessonsCourseView } from './components/LessonsCourseView';
import { ExamSeriesView } from './components/ExamSeriesView';
import { TrafficLawArticlesView } from './components/TrafficLawArticlesView';
import { PricingModal } from './components/PricingModal';
import { AllQuestionsModal } from './components/AllQuestionsModal';
import { UserAuthModal } from './components/UserAuthModal';
import { WhatsAppSupport } from './components/WhatsAppSupport';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export default function App() {
  // 1. Language state (defaults to Kinyarwanda as on isuzume.rw)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('ireme_language');
    if (saved === 'en' || saved === 'fr' || saved === 'rw') return saved;
    return 'rw';
  });

  useEffect(() => {
    localStorage.setItem('ireme_language', language);
  }, [language]);

  // 2. Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('home');

  // 3. Exam active state
  const [isExamActive, setIsExamActive] = useState(false);
  const [selectedExamCategory, setSelectedExamCategory] = useState<string | undefined>(undefined);
  const [signSearchQuery, setSignSearchQuery] = useState<string>('');

  // 4. User profile & Pro status
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ireme_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('ireme_user_profile', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('ireme_user_profile');
    }
  }, [userProfile]);

  // 5. Stored Exam Records
  const [examRecords, setExamRecords] = useState<ExamRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ireme_records');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ireme_records', JSON.stringify(examRecords));
  }, [examRecords]);

  // 6. Payment token
  const [paymentToken, setPaymentToken] = useState<string>(() => {
    return localStorage.getItem('ireme_payment_token') || '';
  });

  const handlePaymentSuccess = (token: string, phone: string) => {
    setPaymentToken(token);
    localStorage.setItem('ireme_payment_token', token);
    setUserProfile((prev) => ({
      name: prev?.name || 'Umunyeshuri w\'Ireme',
      phone: phone || prev?.phone || '078...',
      isPro: true,
      planName: '500 FRW PRO (20/20 Questions Unlocked)',
      proExpiryDate: '2026-12-31',
    }));
  };

  // 7. Modals
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAllQuestionsOpen, setIsAllQuestionsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [pricingDefaultPlan, setPricingDefaultPlan] = useState<'daily' | 'weekly' | 'monthly' | 'single_exam'>('daily');

  // Direct URL Hash Navigation Support (#exam, #questions, #ibizamini, #contact)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#exam') {
        setIsExamActive(true);
      } else if (hash === '#questions' || hash === '#all-questions') {
        setIsAllQuestionsOpen(true);
      } else if (hash === '#ibizamini' || hash === '#series') {
        setIsExamActive(false);
        setCurrentTab('series');
      } else if (hash === '#amasomo' || hash === '#lessons' || hash === '#ibibazo-bya-polisi' || hash === '#pdf-questions') {
        setIsExamActive(false);
        setCurrentTab('lessons');
      } else if (hash === '#contact' || hash === '#twandikire' || hash === '#support') {
        setIsContactOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleFinishExamRecord = (record: ExamRecord) => {
    setExamRecords((prev) => [record, ...prev]);
  };

  const handleStartExam = (category?: string) => {
    setSelectedExamCategory(category);
    setIsExamActive(true);
    try {
      if (window.location.hash !== '#exam') {
        window.history.pushState(null, '', '#exam');
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitExam = () => {
    setIsExamActive(false);
    try {
      if (window.location.hash === '#exam') {
        window.history.pushState(null, '', window.location.pathname);
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActivatePro = (planName: string) => {
    setUserProfile((prev) => {
      const base = prev || { name: 'Umunyeshuri w\'Ireme', phone: '0788000000', isPro: true };
      return {
        ...base,
        isPro: true,
        planName,
        proExpiryDate: '2026-12-31',
      };
    });
  };

  const handleLogin = (name: string, phone: string) => {
    setUserProfile((prev) => ({
      name,
      phone,
      isPro: prev?.isPro || false,
      planName: prev?.planName,
    }));
  };

  const handleLogout = () => {
    setUserProfile(null);
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Main Navbar */}
      <Navbar
        currentTab={isExamActive ? 'exams' : currentTab}
        setCurrentTab={(tab) => {
          setIsExamActive(false);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        setLanguage={setLanguage}
        onStartQuickExam={() => handleStartExam()}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        userProfile={userProfile}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* ACTIVE EXAM SIMULATOR */}
        {isExamActive ? (
          <ExamSimulator
            language={language}
            onFinishExamRecord={handleFinishExamRecord}
            onExitExam={handleExitExam}
            selectedCategory={selectedExamCategory}
            isUserPro={!!userProfile?.isPro || !!paymentToken}
            onOpenPricing={() => setIsPricingOpen(true)}
            onPaymentSuccess={handlePaymentSuccess}
            savedPaymentToken={paymentToken}
          />
        ) : (
          <>
            {/* 1. HOME TAB */}
            {currentTab === 'home' && (
              <div>
                {/* Hero Section */}
                <HeroSection
                  language={language}
                  onStartExam={handleStartExam}
                  onNavigateTab={(tab) => {
                    setCurrentTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSearchSigns={(q) => {
                    setSignSearchQuery(q);
                    setCurrentTab('signs');
                  }}
                />

                {/* Slogan Banner */}
                <div className="bg-emerald-800 text-white py-3 px-4 text-center font-black text-sm tracking-wide shadow-xs flex items-center justify-center gap-3">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>KORA RIMWE UTSINDE! — Kwiga no gutsindira uruhushya rw'agateganyo ku nshuro ya mbere.</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>

                {/* Quick Shortcuts Grid (like isuzume.rw top grid) */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    
                    <button
                      onClick={() => { setCurrentTab('series'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 text-left shadow-2xs hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Award className="w-5 h-5" />
                      </div>
                      <h4 className="font-black text-base text-slate-900 group-hover:text-emerald-700">
                        {language === 'rw' ? 'Ibizamini 20/20' : 'Mock Exams 20/20'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'rw' ? 'Ibizamini 8+ byuzuye' : '8+ full simulated tests'}
                      </p>
                    </button>

                    <button
                      onClick={() => { setCurrentTab('lessons'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 text-left shadow-2xs hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h4 className="font-black text-base text-slate-900 group-hover:text-teal-700">
                        {language === 'rw' ? 'Amasomo Yuzuye' : 'Step Lessons'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'rw' ? 'Amategeko mu nyandiko n\'ijwi' : 'Illustrated notes & audio'}
                      </p>
                    </button>

                    <button
                      onClick={() => { setCurrentTab('signs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 text-left shadow-2xs hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h4 className="font-black text-base text-slate-900 group-hover:text-sky-700">
                        {language === 'rw' ? 'Ibyapa byose' : 'Road Signs'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'rw' ? 'Ibyapa 24+ n\'ibisobanuro' : 'Vector signs & meanings'}
                      </p>
                    </button>

                    <button
                      onClick={() => { setCurrentTab('laws'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 text-left shadow-2xs hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <Scale className="w-5 h-5" />
                      </div>
                      <h4 className="font-black text-base text-slate-900 group-hover:text-amber-700">
                        {language === 'rw' ? 'Amategeko & Amande' : '2026 Traffic Fines'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'rw' ? 'Ibihano bishya bya Polisi' : 'Updated fines & points'}
                      </p>
                    </button>

                  </div>
                </section>

                {/* Testimonials / Trust by Rwandan Candidates */}
                <section className="bg-slate-900 text-white py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-850">
                        {language === 'rw' ? 'Ubuhamya bw\'Abatsinze' : 'Successful Candidates'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black mt-2">
                        {language === 'rw' ? 'Batsinze ku Nshuro ya Mbere Bakoresheje Ireme College' : 'Passed on First Attempt at BK Arena & Centers'}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          "Ibizamini 20/20 bya hano bisa neza 100% n'ibyo nakoreye kuri mudasobwa ya Polisi muri BK Arena! Nabonye 18/20 ku nshuro ya mbere."
                        </p>
                        <div className="pt-2 border-t border-slate-700/60">
                          <span className="font-bold text-xs text-white block">Eric Mugisha</span>
                          <span className="text-[11px] text-emerald-400">Kigali (BK Arena Center)</span>
                        </div>
                      </div>

                      <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          "Gusobanurirwa ingingo y'iteka rya Perezida kuri buri kibazo wibeshyeho byamfashije gusobanukirwa ibyapa byangoye. Mwarakoze cyane!"
                        </p>
                        <div className="pt-2 border-t border-slate-700/60">
                          <span className="font-bold text-xs text-white block">Aline Uwase</span>
                          <span className="text-[11px] text-emerald-400">Musanze Testing Center</span>
                        </div>
                      </div>

                      <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          "Kwishyura na MoMo byaroroshye kandi nahise mbona icyemezo cyanjye. Nari mfite ubwoba bwa provisoire ariko nayitsinze nishimye!"
                        </p>
                        <div className="pt-2 border-t border-slate-700/60">
                          <span className="font-bold text-xs text-white block">Patrick Hakizimana</span>
                          <span className="text-[11px] text-emerald-400">Huye Examination Center</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* 2. EXAM SERIES TAB */}
            {currentTab === 'series' && (
              <ExamSeriesView
                language={language}
                onLaunchExam={handleStartExam}
                onOpenPricing={() => {
                  setPricingDefaultPlan('daily');
                  setIsPricingOpen(true);
                }}
                onOpenPricingWithPlan={(plan) => {
                  setPricingDefaultPlan(plan);
                  setIsPricingOpen(true);
                }}
                onOpenAllQuestions={() => setIsAllQuestionsOpen(true)}
                isUserPro={!!userProfile?.isPro || !!paymentToken}
                onNavigateTab={(tab) => {
                  setCurrentTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* 3. LESSONS TAB */}
            {currentTab === 'lessons' && (
              <LessonsCourseView
                language={language}
                onStartExam={() => handleStartExam()}
              />
            )}

            {/* 4. ROAD SIGNS TAB */}
            {currentTab === 'signs' && (
              <RoadSignsExplorer
                language={language}
                initialSearch={signSearchQuery}
                onStartSignPractice={() => handleStartExam('ibyapa')}
              />
            )}

            {/* 5. TRAFFIC LAWS & 2026 FINES TAB */}
            {currentTab === 'laws' && (
              <TrafficLawArticlesView
                language={language}
                onStartExam={() => handleStartExam()}
              />
            )}

            {/* 6. FLASHCARDS TAB */}
            {currentTab === 'flashcards' && (
              <FlashcardsView language={language} />
            )}

            {/* 7. IREMBO TAB */}
            {currentTab === 'irembo' && (
              <IremboGuideView
                language={language}
                onStartExam={() => handleStartExam()}
              />
            )}

            {/* 8. STATS TAB */}
            {currentTab === 'stats' && (
              <StatsDashboardView
                language={language}
                records={examRecords}
                onClearRecords={() => setExamRecords([])}
                onRetakeExam={() => handleStartExam()}
              />
            )}

            {/* 9. PRACTICE MODE TAB */}
            {currentTab === 'practice' && (
              <PracticeMode
                language={language}
                onExitPractice={() => setCurrentTab('home')}
              />
            )}
          </>
        )}

      </main>

      {/* Floating WhatsApp Support */}
      <WhatsAppSupport 
        language={language} 
        onOpenContactModal={() => setIsContactOpen(true)}
      />

      {/* All Questions Bank Modal */}
      <AllQuestionsModal
        isOpen={isAllQuestionsOpen}
        onClose={() => setIsAllQuestionsOpen(false)}
        language={language}
        isUserPro={!!userProfile?.isPro || !!paymentToken}
        onOpenPricingWithPlan={(plan) => {
          setIsAllQuestionsOpen(false);
          setPricingDefaultPlan(plan);
          setIsPricingOpen(true);
        }}
        onStartExam={handleStartExam}
      />

      {/* Pricing / PRO Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        language={language}
        onActivatePro={handleActivatePro}
        onPaymentSuccess={handlePaymentSuccess}
        defaultPlan={pricingDefaultPlan}
      />

      {/* User Login & Certificate Modal */}
      <UserAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
        userProfile={userProfile}
        onLogin={handleLogin}
        onLogout={handleLogout}
        examRecords={examRecords}
      />

      {/* Official Contact Modal (WhatsApp 0786922843, Call 07227118102, francoisshyirakumutima@gmail.com) */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={language}
      />

      {/* Footer */}
      {!isExamActive && (
        <Footer
          language={language}
          onNavigateTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenContactModal={() => setIsContactOpen(true)}
        />
      )}

    </div>
  );
}
