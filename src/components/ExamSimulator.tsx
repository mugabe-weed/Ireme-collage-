import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Clock, Flag, CheckCircle, XCircle, AlertTriangle, Volume2, VolumeX, 
  RotateCcw, ArrowRight, ArrowLeft, Send, Check, ShieldCheck, Sparkles,
  Lock, Zap, Phone, Loader2, RefreshCw
} from 'lucide-react';
import { Question, Language, ExamRecord } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RoadSignGraphic } from './RoadSignGraphic';
import { PaymentAPI, InitiatePaymentResponse } from '../services/paymentService';
import { QUESTIONS_BANK } from '../data/questions';

interface ExamSimulatorProps {
  language: Language;
  onFinishExamRecord: (record: ExamRecord) => void;
  onExitExam: () => void;
  selectedCategory?: string;
  isUserPro: boolean;
  onOpenPricing: () => void;
  onPaymentSuccess: (token: string, phone: string) => void;
  savedPaymentToken?: string;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  language,
  onFinishExamRecord,
  onExitExam,
  selectedCategory,
  isUserPro,
  onOpenPricing,
  onPaymentSuccess,
  savedPaymentToken,
}) => {
  const t = TRANSLATIONS[language];
  const FREE_QUESTIONS_COUNT = 2;

  // Immediate questions state (never empty, never broken)
  const [isServerPaid, setIsServerPaid] = useState<boolean>(isUserPro || !!savedPaymentToken);
  const [examQuestions, setExamQuestions] = useState<Question[]>(() => {
    const isPaid = isUserPro || !!savedPaymentToken;
    const pool = selectedCategory && selectedCategory !== 'all'
      ? QUESTIONS_BANK.filter((q) => q.category === selectedCategory)
      : QUESTIONS_BANK;
    return isPaid ? pool.slice(0, 20) : pool.slice(0, 2);
  });
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Exam navigation & answers state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(20 * 60); // 20 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [filterReviewMode, setFilterReviewMode] = useState<'all' | 'incorrect' | 'flagged'>('all');
  
  // Real 500 FRW payment state
  const [selectedProvider, setSelectedProvider] = useState<'mtn' | 'airtel'>('mtn');
  const [paymentPhone, setPaymentPhone] = useState('078');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [activePaymentTx, setActivePaymentTx] = useState<InitiatePaymentResponse | null>(null);
  const [pollingStatus, setPollingStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESSFUL' | 'FAILED'>('IDLE');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch questions from backend
  const loadQuestions = async (token?: string) => {
    try {
      const data = await PaymentAPI.fetchExamQuestions(token || savedPaymentToken, selectedCategory);
      if (data && data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setExamQuestions(data.questions);
        setIsServerPaid(data.isPaid);
      }
    } catch (err) {
      console.warn('API sync fallback to local bank:', err);
    }
  };

  useEffect(() => {
    loadQuestions(savedPaymentToken);
  }, [savedPaymentToken, selectedCategory]);

  // Real payment status polling
  useEffect(() => {
    if (activePaymentTx?.transactionId && pollingStatus === 'PENDING') {
      pollingRef.current = setInterval(async () => {
        try {
          const res = await PaymentAPI.checkPaymentStatus(activePaymentTx.transactionId!);
          if (res.status === 'SUCCESSFUL' && res.paymentToken) {
            clearInterval(pollingRef.current as NodeJS.Timeout);
            setPollingStatus('SUCCESSFUL');
            setIsServerPaid(true);

            // Fetch the unlocked 18 questions from server
            await loadQuestions(res.paymentToken);

            onPaymentSuccess(res.paymentToken, paymentPhone);

            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
            });
          } else if (res.status === 'FAILED') {
            clearInterval(pollingRef.current as NodeJS.Timeout);
            setPollingStatus('FAILED');
            setPaymentError('Ubwishyu bwanze cyangwa igihe cyarangiye. Ongera ugerageze.');
          }
        } catch {
          // keep polling
        }
      }, 2000);
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [activePaymentTx, pollingStatus]);

  // Countdown timer
  useEffect(() => {
    if (isFinished) return;

    timerRef.current = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isFinished]);

  // Current Question
  const isQuestionLocked = !isServerPaid && currentIndex >= FREE_QUESTIONS_COUNT;
  const currentQ = examQuestions[currentIndex] || examQuestions[0];

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Handle select answer
  const handleSelectOption = (optionId: string) => {
    if (isFinished || isQuestionLocked || !currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  // Toggle flag
  const toggleFlag = (qId: string) => {
    if (isQuestionLocked) return;
    setFlagged((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Submit and grade
  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFinished(true);
    setShowConfirmModal(false);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    let score = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    examQuestions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctAnswerId;
      if (isCorrect) score += 1;

      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (isCorrect) {
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const passed = score >= 12;
    const timeSpent = 20 * 60 - timeLeftSeconds;

    if (passed) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    const record: ExamRecord = {
      id: `exam-${Date.now()}`,
      date: new Date().toLocaleDateString('rw-RW', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      score,
      total: examQuestions.length,
      passed,
      timeSpentSeconds: timeSpent,
      categoryBreakdown,
    };

    onFinishExamRecord(record);
  };

  // Handle real payment initiation for 500 FRW
  const handleInitiateRealPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    setIsSubmittingPayment(true);

    try {
      const res = await PaymentAPI.initiatePayment(paymentPhone, selectedProvider, 500);

      if (!res.success) {
        setPaymentError(res.error || 'Habaye ikosa mu gutangiza ubwishyu.');
        setIsSubmittingPayment(false);
        return;
      }

      setActivePaymentTx(res);
      setPollingStatus('PENDING');
    } catch (err: any) {
      setPaymentError('Ntibishoboye guhura na seriveri ya MTN/Airtel. Ongera ugerageze.');
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  // Force manual approve verification in test/sandbox
  const handleManualApprove = async () => {
    if (!activePaymentTx?.transactionId) return;
    try {
      const res = await PaymentAPI.verifyPayment(activePaymentTx.transactionId, paymentPhone);
      if (res.success && res.paymentToken) {
        setPollingStatus('SUCCESSFUL');
        setIsServerPaid(true);
        await loadQuestions(res.paymentToken);
        onPaymentSuccess(res.paymentToken, paymentPhone);
        confetti({ particleCount: 150, spread: 80 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-detect provider when typing phone
  const handlePhoneChange = (val: string) => {
    setPaymentPhone(val);
    const clean = val.replace(/\D/g, '');
    if (clean.startsWith('078') || clean.startsWith('079') || clean.startsWith('25078') || clean.startsWith('25079')) {
      setSelectedProvider('mtn');
    } else if (clean.startsWith('072') || clean.startsWith('073') || clean.startsWith('25072') || clean.startsWith('25073')) {
      setSelectedProvider('airtel');
    }
  };

  // Text to Speech
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window) || isQuestionLocked || !currentQ) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const qText = currentQ.question[language] || currentQ.question.rw;
    const optionsText = currentQ.options
      .map((opt, i) => `${String.fromCharCode(65 + i)}: ${opt.text[language] || opt.text.rw}`)
      .join('. ');

    const fullUtterance = new SpeechSynthesisUtterance(`${qText}. ${optionsText}`);
    fullUtterance.lang = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'rw';
    fullUtterance.rate = 0.95;

    fullUtterance.onend = () => setIsSpeaking(false);
    fullUtterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(fullUtterance);
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = (isServerPaid ? 20 : FREE_QUESTIONS_COUNT) - answeredCount;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;

  const totalScore = examQuestions.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctAnswerId ? 1 : 0);
  }, 0);
  const hasPassed = totalScore >= 12;

  // Loading state
  if (isLoadingQuestions) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
        <h3 className="font-bold text-slate-800 text-base">
          Gufungura ibizamini bya Provisoire...
        </h3>
        <p className="text-xs text-slate-500">
          Guhuza na seriveri ya Ireme College
        </p>
      </div>
    );
  }

  // ================= RESULTS SCREEN =================
  if (isFinished) {
    const percentage = Math.round((totalScore / (isServerPaid ? 20 : FREE_QUESTIONS_COUNT)) * 100);
    const timeUsed = 20 * 60 - timeLeftSeconds;
    const timeUsedMin = Math.floor(timeUsed / 60);
    const timeUsedSec = timeUsed % 60;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
        
        {/* If user finished without unlocking the remaining 18 questions */}
        {!isServerPaid && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full">
                Ibibazo 2 by'Ubuntu (Free Trial Completed)
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Wakoze ibibazo 2 gusa by'ubuntu!
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 max-w-lg">
                Ubonye amanota <strong>{totalScore} kuri 2</strong>. Kugira ngo ukore ibibazo 18 bisigaye by'ikizamini cyuzuye cya 20/20 uhabwe icyemezo cy'ubwitegure, ishyura 500 FRW gusa!
              </p>
            </div>

            <button
              onClick={() => {
                setIsFinished(false);
                setCurrentIndex(2); // Go to paywall question
              }}
              className="bg-white hover:bg-slate-100 text-amber-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-amber-950" />
              <span>Ishyura 500 FRW (Fungura 20/20)</span>
            </button>
          </div>
        )}

        {/* Results Card Header */}
        <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 ${
          hasPassed 
            ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 border-2 border-emerald-400/40' 
            : 'bg-gradient-to-br from-rose-700 via-slate-800 to-slate-900 border-2 border-rose-500/40'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rwanda National Police (RNP) Format</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {hasPassed ? t.resultPassed : t.resultFailed}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-xl">
                {hasPassed ? t.resultPassedDesc : t.resultFailedDesc}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shrink-0 w-44">
              <div className="text-4xl sm:text-5xl font-black tracking-tight">
                {totalScore} <span className="text-xl sm:text-2xl font-bold opacity-75">/ {isServerPaid ? 20 : FREE_QUESTIONS_COUNT}</span>
              </div>
              <div className="text-sm font-bold mt-1 text-emerald-200">
                {percentage}% ({hasPassed ? 'PASSED' : 'NOT PASSED'})
              </div>
              <div className="text-[11px] text-white/70 mt-2">
                {t.passRequirement}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-white/15 text-xs">
            <div>
              <div className="text-white/70">{t.timeSpent}</div>
              <div className="text-base font-bold text-white mt-0.5">
                {timeUsedMin}m {timeUsedSec}s
              </div>
            </div>
            <div>
              <div className="text-white/70">{language === 'rw' ? 'Ibibazo Byakozwe' : 'Questions Answered'}</div>
              <div className="text-base font-bold text-white mt-0.5">
                {answeredCount} / {isServerPaid ? 20 : FREE_QUESTIONS_COUNT}
              </div>
            </div>
            <div>
              <div className="text-white/70">{language === 'rw' ? 'Ibisubizo By\'ukuri' : 'Correct Answers'}</div>
              <div className="text-base font-bold text-emerald-300 mt-0.5">
                {totalScore}
              </div>
            </div>
            <div>
              <div className="text-white/70">{language === 'rw' ? 'Ibyo Wakosheje' : 'Incorrect'}</div>
              <div className="text-base font-bold text-rose-300 mt-0.5">
                {examQuestions.length - totalScore}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setAnswers({});
                setFlagged({});
                setTimeLeftSeconds(20 * 60);
                setIsFinished(false);
              }}
              className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-xl shadow-sm text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retakeExam}</span>
            </button>
            <button
              onClick={onExitExam}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-3 rounded-xl text-sm cursor-pointer"
            >
              {language === 'rw' ? 'Garuka Ahashize' : 'Back to Home'}
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterReviewMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterReviewMode === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
              }`}
            >
              {language === 'rw' ? 'Byose' : 'All'} ({examQuestions.length})
            </button>
            <button
              onClick={() => setFilterReviewMode('incorrect')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterReviewMode === 'incorrect' ? 'bg-white shadow-xs text-rose-700 font-bold' : 'text-slate-600'
              }`}
            >
              {language === 'rw' ? 'Ibyo Wakosheje' : 'Incorrect'} ({examQuestions.length - totalScore})
            </button>
          </div>
        </div>

        {/* Question Review List */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900">
            {t.reviewAnswers}
          </h3>

          {examQuestions
            .filter((q) => {
              if (filterReviewMode === 'incorrect') {
                return answers[q.id] !== q.correctAnswerId;
              }
              return true;
            })
            .map((q) => {
              const selectedOptId = answers[q.id];
              const isCorrect = selectedOptId === q.correctAnswerId;
              const originalIndex = examQuestions.findIndex((item) => item.id === q.id) + 1;

              return (
                <div
                  key={q.id}
                  className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-xs transition-all ${
                    isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {originalIndex}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 uppercase">
                        {q.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          <span>{language === 'rw' ? 'Wagikoze neza (+1)' : 'Correct (+1)'}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                          <XCircle className="w-4 h-4" />
                          <span>{language === 'rw' ? 'Wakosheje (0)' : 'Incorrect (0)'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-base font-bold text-slate-900 mb-3">
                    {q.question[language] || q.question.rw}
                  </p>

                  {q.signSvgType && (
                    <div className="my-3 flex justify-center bg-slate-50 border border-slate-200 p-3 rounded-xl max-w-xs">
                      <RoadSignGraphic type={q.signSvgType} size={70} />
                    </div>
                  )}

                  <div className="space-y-2 mt-4">
                    {q.options.map((opt, optIndex) => {
                      const letter = String.fromCharCode(65 + optIndex);
                      const isOptionCorrect = opt.id === q.correctAnswerId;
                      const isOptionSelected = opt.id === selectedOptId;

                      let badgeStyle = 'border-slate-200 bg-white text-slate-700';
                      if (isOptionCorrect) {
                        badgeStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-900 font-semibold';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        badgeStyle = 'border-rose-400 bg-rose-100/70 text-rose-900 font-semibold';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${badgeStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                            isOptionCorrect ? 'bg-emerald-600 text-white' : isOptionSelected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {letter}
                          </span>
                          <span className="flex-1">{opt.text[language] || opt.text.rw}</span>
                          {isOptionCorrect && (
                            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.correctAnswer}</span>
                            </span>
                          )}
                          {isOptionSelected && !isOptionCorrect && (
                            <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{t.yourAnswer}</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>{t.explanationTitle}</span>
                    </div>
                    <p className="leading-relaxed">
                      {q.explanation[language] || q.explanation.rw}
                    </p>
                    {q.legalReference && (
                      <div className="text-[11px] font-semibold text-emerald-800 pt-1">
                        {t.legalBasis} {q.legalReference}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  // ================= ACTIVE EXAM SCREEN =================
  const isTimeCritical = timeLeftSeconds <= 180;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      
      {/* Top Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Indicator & Free Tag */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-xl font-black text-sm border border-emerald-200">
            {t.questionNumber} {currentIndex + 1} {t.of} {isServerPaid ? 20 : FREE_QUESTIONS_COUNT}
          </div>
          
          {/* Badge indicating free vs paid */}
          {!isServerPaid && currentIndex < FREE_QUESTIONS_COUNT ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
              🆓 Ikibazo cy'Ubuntu ({currentIndex + 1}/2)
            </span>
          ) : !isServerPaid ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>500 FRW PRO Required</span>
            </span>
          ) : (
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 flex items-center gap-1">
              <Zap className="w-3 h-3 fill-emerald-600" />
              <span>PRO Unlocked (20/20)</span>
            </span>
          )}

          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 hidden sm:inline">
            {currentQ?.category || 'Provisoire'}
          </span>
        </div>

        {/* Center: Timer Countdown */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-black text-lg transition-colors ${
          isTimeCritical 
            ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}>
          <Clock className={`w-5 h-5 ${isTimeCritical ? 'text-rose-600' : 'text-slate-500'}`} />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => currentQ && toggleFlag(currentQ.id)}
            disabled={isQuestionLocked}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer disabled:opacity-40 ${
              currentQ && flagged[currentQ.id]
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${currentQ && flagged[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>{currentQ && flagged[currentQ.id] ? t.unmarkForReview : t.markForReview}</span>
          </button>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.finishExam}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Question Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* REAL 500 FRW PAYWALL CARD FOR QUESTIONS 3 TO 20 */}
          {isQuestionLocked ? (
            <div className="bg-white border-2 border-amber-400 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  Ibibazo 2 by'Ubuntu Byarangiye (2 Free Questions Completed)
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Kugira ngo ukomeze ibibazo 18 bisigaye, ishyura 500 FRW kuri API ya MTN MoMo cyangwa Airtel Money!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ubu buryo buhita bwohereza ubutumwa bwo kwishyura kuri telefoni yawe (USSD push prompt). Umaze gushyiramo PIN, ibibazo 18 bisigaye bihita bifunguka ako kanya!
                </p>
              </div>

              {/* Real payment form with API integration */}
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-4">
                
                {/* Network provider tabs: MTN vs Airtel */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Hitamo Umurongo wawe w'Ubwishyu:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProvider('mtn');
                        if (!paymentPhone.startsWith('078') && !paymentPhone.startsWith('079')) {
                          setPaymentPhone('078');
                        }
                      }}
                      className={`p-2.5 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        selectedProvider === 'mtn'
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-950 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-yellow-400" />
                      <span>MTN Mobile Money</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProvider('airtel');
                        if (!paymentPhone.startsWith('072') && !paymentPhone.startsWith('073')) {
                          setPaymentPhone('072');
                        }
                      }}
                      className={`p-2.5 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        selectedProvider === 'airtel'
                          ? 'border-red-500 bg-red-50 text-red-950 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Airtel Money</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-1">
                  <span>Amafaranga yo Kwishyura:</span>
                  <span className="text-xl font-black text-emerald-800">500 FRW</span>
                </div>

                {paymentError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs font-bold text-rose-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Form or active polling indicator */}
                {pollingStatus === 'PENDING' ? (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-center space-y-3 animate-pulse">
                    <Loader2 className="w-6 h-6 text-amber-700 animate-spin mx-auto" />
                    <div className="text-xs font-bold text-amber-900">
                      📲 Ubutumwa bwa 500 FRW bwoherejwe kuri telefoni ({paymentPhone})...
                    </div>
                    <p className="text-[11px] text-amber-800 leading-tight">
                      Kanda PIN yawe ya {selectedProvider.toUpperCase()} MoMo (*182#) kugira ngo wemeze ubwishyu.
                    </p>
                    <div className="pt-2 flex items-center justify-center gap-2">
                      <button
                        onClick={handleManualApprove}
                        className="text-[11px] font-black bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg cursor-pointer"
                      >
                        Nemeje PIN (Emeza Ubwishyu)
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInitiateRealPayment} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Numero ya Telefoni ({selectedProvider === 'mtn' ? '078... / 079...' : '072... / 073...'}):
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={paymentPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder={selectedProvider === 'mtn' ? '0788 000 000' : '0722 000 000'}
                          className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl py-2 pl-9 pr-3 text-sm font-mono font-bold text-slate-900 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingPayment}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingPayment ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Guhuza na API ya {selectedProvider.toUpperCase()}...</span>
                        </div>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-white" />
                          <span>Ishyura 500 FRW kuri API ya {selectedProvider.toUpperCase()}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="text-[11px] text-slate-500 text-center">
                  🔒 Ibibazo 18 bisigaye birinzwe kuri seriveri; ntiwabifungura utishyuye 500 FRW.
                </div>
              </div>

              {/* Navigation back to free questions */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => setCurrentIndex(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  ← Garuka ku kibazo cya 2 (cy'ubuntu)
                </button>
                <button
                  onClick={onOpenPricing}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  Reba andi mapaki: Ku Munsi 1,000 / Mu Cyumweru 2,500 / Ku Kwezi 5,000 FRW →
                </button>
              </div>

            </div>
          ) : (
            /* NORMAL QUESTION CARD FOR FREE QUESTIONS 1-2 OR UNLOCKED QUESTIONS */
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">
                    Question #{currentIndex + 1}
                  </span>
                  {!isServerPaid && (
                    <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Free Question {currentIndex + 1}/2
                    </span>
                  )}
                </div>
                
                <button
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isSpeaking 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 animate-pulse' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                  title="Soma mu ijwi ry'ikoranabuhanga"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? t.audioStop : t.audioSpeak}</span>
                </button>
              </div>

              {currentQ && (
                <>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-4">
                    {currentQ.question[language] || currentQ.question.rw}
                  </h2>

                  {currentQ.signSvgType && (
                    <div className="my-5 flex flex-col items-center justify-center p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                      <RoadSignGraphic type={currentQ.signSvgType} size={90} />
                      {currentQ.signCode && (
                        <span className="mt-2 text-xs font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          Code: {currentQ.signCode}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="space-y-3 mt-6">
                    {currentQ.options.map((option, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isSelected = answers[currentQ.id] === option.id;

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(option.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer select-none ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                            isSelected 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {letter}
                          </span>
                          <span className="text-sm sm:text-base font-medium leading-relaxed pt-0.5">
                            {option.text[language] || option.text.rw}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Bottom Question Controls */}
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-100">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.previous}</span>
                </button>

                <button
                  onClick={() => {
                    if (!isServerPaid && currentIndex === 1) {
                      setCurrentIndex(2); // Triggers 500 FRW paywall
                    } else if (currentIndex < (isServerPaid ? 19 : 1)) {
                      setCurrentIndex((prev) => prev + 1);
                    } else {
                      setShowConfirmModal(true);
                    }
                  }}
                  className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs cursor-pointer"
                >
                  <span>
                    {!isServerPaid && currentIndex === 1 
                      ? 'Komeza ku bibazo 18 (500 FRW)' 
                      : currentIndex === (isServerPaid ? 19 : 1) 
                      ? t.finishExam 
                      : t.next}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Question Matrix Navigation Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-slate-900">
                {language === 'rw' ? 'Urutonde rw\'Ibibazo 20' : 'Question Matrix'}
              </h3>
              {!isServerPaid && (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  2 Free • 18 Locked (500 FRW)
                </span>
              )}
            </div>

            {/* 20 Questions Grid */}
            <div className="grid grid-cols-5 gap-2">
              {[...Array(20)].map((_, idx) => {
                const isCurrent = idx === currentIndex;
                const targetQ = examQuestions[idx];
                const isAnswered = targetQ ? !!answers[targetQ.id] : false;
                const isFlagged = targetQ ? !!flagged[targetQ.id] : false;
                const isLocked = !isServerPaid && idx >= FREE_QUESTIONS_COUNT;

                let cellStyle = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
                if (isAnswered) {
                  cellStyle = 'bg-emerald-600 text-white hover:bg-emerald-700';
                }
                if (isFlagged && !isLocked) {
                  cellStyle = 'bg-amber-500 text-white hover:bg-amber-600';
                }
                if (isLocked) {
                  cellStyle = 'bg-slate-100 text-slate-400 border border-dashed border-slate-300';
                }
                if (isCurrent) {
                  cellStyle += ' ring-2 ring-slate-900 ring-offset-2 font-black';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-11 rounded-xl flex items-center justify-center font-bold text-sm relative transition-all cursor-pointer ${cellStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {isLocked && (
                      <Lock className="w-2.5 h-2.5 absolute top-1 right-1 text-amber-600" />
                    )}
                    {isFlagged && !isLocked && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600" />
                  <span>{language === 'rw' ? 'Ibyashubijwe' : 'Answered'}</span>
                </span>
                <span className="font-bold text-slate-900">{answeredCount}</span>
              </div>
              
              {!isServerPaid && (
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-2">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>{language === 'rw' ? 'Ibibazo byo kwishyura (500 FRW)' : 'Paid questions'}</span>
                  </span>
                  <span className="font-bold text-amber-700">18</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>{language === 'rw' ? 'Ibyo gusubiramo' : 'Flagged for review'}</span>
                </span>
                <span className="font-bold text-slate-900">{flaggedCount}</span>
              </div>
            </div>

            {/* Unlock 500 FRW banner inside matrix */}
            {!isServerPaid && (
              <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-xs text-amber-950 space-y-2">
                <div className="font-black flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                  <span>Fungura ibibazo byose kuri 500 FRW</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-snug">
                  Ishyura 500 FRW ukoresheje MTN MoMo cyangwa Airtel API uhite ufungura ibibazo byose 20/20.
                </p>
                <button
                  onClick={() => setCurrentIndex(2)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-2 rounded-xl text-[11px] shadow-xs cursor-pointer"
                >
                  Ishyura 500 FRW Nonaha
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-2">
              {t.confirmFinishTitle}
            </h3>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              {!isServerPaid ? (
                <>
                  {language === 'rw' 
                    ? `Wakoze ibibazo ${answeredCount} by'ubuntu. Nusoza ubu uzahita ubona amanota yawe. Ushobora kwishyura 500 FRW kuri MTN/Airtel kugira ngo ufungure ibindi 18 bisigaye.`
                    : `You answered ${answeredCount} free questions. Confirming will calculate your test score. You can unlock the remaining 18 questions for 500 FRW via MTN MoMo or Airtel Money.`}
                </>
              ) : unansweredCount > 0 ? (
                <>
                  {language === 'rw' 
                    ? `Ufite ibibazo ${unansweredCount} bitarasubizwa. Nusoza ubu uzahita ubona amanota yawe.`
                    : `You still have ${unansweredCount} unanswered questions. Confirming will compute your official final grade.`}
                </>
              ) : (
                t.confirmFinishDesc
              )}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white shadow-sm cursor-pointer"
              >
                {t.confirmSubmit}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
