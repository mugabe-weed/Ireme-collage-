import React, { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  BookOpen, Search, CheckCircle2, XCircle, Eye, EyeOff, 
  Volume2, VolumeX, ArrowLeft, ShieldCheck, Award, Zap, HelpCircle, 
  ChevronRight, Sparkles, Filter, Hash, Check, Upload, Plus, FileUp, 
  FileText, RefreshCw, Download, AlertCircle 
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
  // Questions list initialized with official police questions + any user uploaded questions
  const [questionsList, setQuestionsList] = useState<RNPArchiveQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('ireme_custom_uploaded_questions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return RNP_ARCHIVE_QUESTIONS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'study' | 'quiz'>('study');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);

  // Uploader modal / panel state
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [uploaderTab, setUploaderTab] = useState<'paste' | 'file' | 'manual'>('paste');
  const [pastedText, setPastedText] = useState('');
  const [manualQuestion, setManualQuestion] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswerId: 'a',
    category: 'amategeko' as const,
    explanation: '',
  });
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  // Sync to local storage
  const handleSaveQuestions = (updated: RNPArchiveQuestion[]) => {
    setQuestionsList(updated);
    try {
      localStorage.setItem('ireme_custom_uploaded_questions', JSON.stringify(updated));
    } catch {}
  };

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
    return questionsList.filter((q) => {
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
  }, [questionsList, selectedCategory, searchQuery]);

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

  // UPLOAD: Parse pasted text
  const handleParsePastedText = () => {
    if (!pastedText.trim()) return;

    // Simple parser for questions separated by double newlines or question numbers
    const blocks = pastedText.split(/\n\s*\n/).filter((b) => b.trim().length > 10);
    const parsedQuestions: RNPArchiveQuestion[] = [];
    let startNumber = questionsList.length + 1;

    for (const block of blocks) {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length >= 2) {
        const questionLine = lines[0].replace(/^(\d+[\.\)]|\-)\s*/, '');
        const options: { id: string; text: string }[] = [];
        let correctLetter = 'a';

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          const match = line.match(/^([a-dA-D])[\.\)]\s*(.*)/);
          if (match) {
            const letter = match[1].toLowerCase();
            const text = match[2];
            if (line.includes('*') || line.toLowerCase().includes('(ukuri)') || line.toLowerCase().includes('(correct)')) {
              correctLetter = letter;
            }
            options.push({ id: letter, text: text.replace(/\*|\(ukuri\)|\(correct\)/gi, '').trim() });
          } else if (line.length > 2) {
            const letter = String.fromCharCode(97 + options.length);
            options.push({ id: letter, text: line });
          }
        }

        if (options.length >= 2) {
          parsedQuestions.push({
            id: `custom-q-${Date.now()}-${startNumber}`,
            number: startNumber++,
            question: questionLine,
            options,
            correctAnswerId: correctLetter,
            category: 'amategeko',
            explanation: "Ikibazo cyashyizweho n'umukoresha (Uploaded custom question).",
          });
        }
      }
    }

    if (parsedQuestions.length > 0) {
      const updated = [...questionsList, ...parsedQuestions];
      handleSaveQuestions(updated);
      setUploadNotice(`Byagenze neza! Ibibazo bishya ${parsedQuestions.length} byongewe mu bubiko.`);
      setPastedText('');
      confetti({ particleCount: 60, spread: 70 });
    } else {
      setUploadNotice("Nta bibazo byashoboye gusomwa neza. Reba ko bifite format: Ikibazo cyo hejuru na a), b), c), d).");
    }
  };

  // UPLOAD: Handle JSON or Text file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            const merged = [...questionsList, ...parsed];
            handleSaveQuestions(merged);
            setUploadNotice(`File ya JSON yasomwe neza! Ibibazo ${parsed.length} byongewe mu cyegeranyo.`);
            confetti({ particleCount: 60 });
            return;
          }
        }
        // If text file, put in pasted text
        setPastedText(content);
        setUploaderTab('paste');
        setUploadNotice("Amagambo yo muri file yashyizwe mu gasanduku! Kanda 'Injiza Ibibazo' kugira ngo ubishyire mu bubiko.");
      } catch {
        setUploadNotice("Habaye ikosa mu gusoma file. Reba ko ari JSON cyangwa TXT ifite amakuru nyayo.");
      }
    };
    reader.readAsText(file);
  };

  // UPLOAD: Manual Question
  const handleAddManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuestion.question.trim() || !manualQuestion.optionA.trim() || !manualQuestion.optionB.trim()) {
      setUploadNotice("Shyiramo ikibazo nibura n'amahitamo abiri.");
      return;
    }

    const newQ: RNPArchiveQuestion = {
      id: `manual-q-${Date.now()}`,
      number: questionsList.length + 1,
      question: manualQuestion.question.trim(),
      options: [
        { id: 'a', text: manualQuestion.optionA.trim() },
        { id: 'b', text: manualQuestion.optionB.trim() },
        ...(manualQuestion.optionC.trim() ? [{ id: 'c', text: manualQuestion.optionC.trim() }] : []),
        ...(manualQuestion.optionD.trim() ? [{ id: 'd', text: manualQuestion.optionD.trim() }] : []),
      ],
      correctAnswerId: manualQuestion.correctAnswerId,
      category: manualQuestion.category,
      explanation: manualQuestion.explanation.trim() || "Ikibazo cyashyizweho n'umukoresha.",
    };

    const updated = [...questionsList, newQ];
    handleSaveQuestions(updated);
    setUploadNotice(`Ikibazo No ${newQ.number} cyashyizweho neza!`);
    setManualQuestion({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswerId: 'a',
      category: 'amategeko',
      explanation: '',
    });
    confetti({ particleCount: 40 });
  };

  // Reset to default RNP questions
  const handleResetToDefault = () => {
    if (window.confirm("Urashaka gusubiza ku bibazo 230+ by'umwimerere bya Polisi y'u Rwanda?")) {
      handleSaveQuestions(RNP_ARCHIVE_QUESTIONS);
      localStorage.removeItem('ireme_custom_uploaded_questions');
      setUploadNotice("Ibibazo byasubiye ku by'umwimerere 230+ bya Polisi y'u Rwanda.");
    }
  };

  // Quick statistics
  const answeredTotal = Object.keys(userAnswers).length;
  const correctTotal = Object.entries(userAnswers).filter(
    ([qId, optId]) => {
      const target = questionsList.find((q) => q.id === qId);
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

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-500/40">
                {questionsList.length} Questions (Official Document & Uploads)
              </span>

              {/* Upload Questions Trigger */}
              <button
                type="button"
                onClick={() => setIsUploaderOpen(!isUploaderOpen)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploaderOpen ? 'Funga Uploader' : 'Shyiramo Ibibazo (Upload Questions)'}</span>
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Polisi y'u Rwanda • Official PDF Questions & Upload Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              {language === 'rw' 
                ? '🔗 Ibibazo Nyabyo by\'Ikizamini cya Polisi y\'u Rwanda' 
                : 'Official Rwanda National Police Theory Exam Questions Archive'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              {language === 'rw'
                ? 'Ibi ni byo bibazo byose byo mu kizamini cy\'amategeko y\'umuhanda cya Polisi y\'u Rwanda byashyizwe hano hamwe n\'ibisubizo by\'ukuri byemejwe mu mutuku nk\'uko biri muri PDF. Ushobora no gushyiramo ibindi bibazo wifuza (Upload Questions).'
                : 'Complete verified bank of official Rwanda National Police (RNP) driving theory examination questions with the authentic red-marked correct answers. Study, practice, or upload your own questions.'}
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

      {/* =========================================================================
          INTERACTIVE QUESTION UPLOADER (UPLOAD THIS QUESTION I GAVE YOU)
         ========================================================================= */}
      {isUploaderOpen && (
        <section className="bg-white border-2 border-amber-400 rounded-3xl p-6 shadow-xl space-y-5 animate-scaleUp">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900">
                  {language === 'rw' ? 'Shyiramo Ibibazo Bishya (Upload Questions)' : 'Upload or Import New Questions'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'rw' 
                    ? 'Shyiramo ibibazo byawe muri file, byandike cyangwa ubyinjize n\'intoki kugira ngo byiyongere ku bibazo bya Polisi.'
                    : 'Import questions from file, paste text, or add them manually to study alongside police questions.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsUploaderOpen(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              ✕ Funga
            </button>
          </div>

          {/* Upload notice */}
          {uploadNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between">
              <span>{uploadNotice}</span>
              <button onClick={() => setUploadNotice(null)} className="text-emerald-700">✕</button>
            </div>
          )}

          {/* Sub-tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setUploaderTab('paste')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                uploaderTab === 'paste' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              📋 Shyiramo Inyandiko (Paste Text)
            </button>
            <button
              onClick={() => setUploaderTab('file')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                uploaderTab === 'file' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              📁 Shyiramo File (.json / .txt)
            </button>
            <button
              onClick={() => setUploaderTab('manual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                uploaderTab === 'manual' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ✍️ Andika Ikibazo Kimwe
            </button>
          </div>

          {/* TAB 1: PASTE */}
          {uploaderTab === 'paste' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Koporora ibibazo byawe ubishyire hano (Paste questions here):
              </label>
              <textarea
                rows={6}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder={`Urugero rw'uko byandikwa:\n\n1. Ikinyabiziga cyose kigomba kugira:\na) Umuyobozi *\nb) Umuherekeza\nc) Bose hamwe\n\n2. Umuvuduko ntarengwa mu mujyi ni:\na) 40 km/h\nb) 50 km/h *\nc) 60 km/h`}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-mono focus:border-amber-500 focus:outline-hidden leading-relaxed"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Tip: Shyira akanyenyeri (*) ku gisubizo cy'ukuri kugira ngo kimenyekane!
                </span>
                <button
                  type="button"
                  onClick={handleParsePastedText}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Injiza Ibibazo mu Bubiko</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FILE UPLOAD */}
          {uploaderTab === 'file' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3 bg-slate-50 hover:bg-slate-100 transition-colors">
                <FileUp className="w-10 h-10 text-slate-400 mx-auto" />
                <div>
                  <label className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-4 py-2 rounded-xl cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>Hitamo File yawe (.json cyangwa .txt)</span>
                    <input
                      type="file"
                      accept=".json,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Shyiramo file yawe ifite ibibazo by'ibizamini bya provisoire, ihita ifunguka kandi ikajya mu kizamini ako kanya.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: MANUAL INPUT */}
          {uploaderTab === 'manual' && (
            <form onSubmit={handleAddManualQuestion} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Ikibazo (Question):</label>
                <input
                  type="text"
                  required
                  value={manualQuestion.question}
                  onChange={(e) => setManualQuestion({ ...manualQuestion, question: e.target.value })}
                  placeholder="urugero: Iteka rya Perezida rigenga umuhanda ni irihe?"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-amber-500 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ihitamo A:</label>
                  <input
                    type="text"
                    required
                    value={manualQuestion.optionA}
                    onChange={(e) => setManualQuestion({ ...manualQuestion, optionA: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ihitamo B:</label>
                  <input
                    type="text"
                    required
                    value={manualQuestion.optionB}
                    onChange={(e) => setManualQuestion({ ...manualQuestion, optionB: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ihitamo C (Option C):</label>
                  <input
                    type="text"
                    value={manualQuestion.optionC}
                    onChange={(e) => setManualQuestion({ ...manualQuestion, optionC: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ihitamo D (Option D):</label>
                  <input
                    type="text"
                    value={manualQuestion.optionD}
                    onChange={(e) => setManualQuestion({ ...manualQuestion, optionD: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Igisubizo cy'Ukuri:</label>
                  <select
                    value={manualQuestion.correctAnswerId}
                    onChange={(e) => setManualQuestion({ ...manualQuestion, correctAnswerId: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                  >
                    <option value="a">Ihitamo A ry'Ukuri</option>
                    <option value="b">Ihitamo B ry'Ukuri</option>
                    <option value="c">Ihitamo C ry'Ukuri</option>
                    <option value="d">Ihitamo D ry'Ukuri</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Icyiciro (Category):</label>
                  <select
                    value={manualQuestion.category}
                    onChange={(e) => setManualQuestion({ ...manualQuestion, category: e.target.value as any })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  >
                    <option value="amategeko">Amategeko Shingiro</option>
                    <option value="ibyapa">Ibyapa by'Umuhanda</option>
                    <option value="ibinyabiziga">Ibinyabiziga & Romoruki</option>
                    <option value="amatara">Amatara & Utugarurarumuri</option>
                    <option value="umuvuduko">Umuvuduko & Amahoni</option>
                    <option value="umutekano">Umutekano & Impanuka</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Garura ibibazo by'umwimerere 230+</span>
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ongeraho Ikibazo</span>
                </button>
              </div>
            </form>
          )}

          {/* Reset button toolbar */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Ubu uri gukoresha ibibazo <strong>{questionsList.length}</strong></span>
            <button
              onClick={handleResetToDefault}
              className="text-slate-600 hover:text-slate-900 underline cursor-pointer"
            >
              Gusubiza ku bibazo 230+ byatanzwe bya Polisi
            </button>
          </div>
        </section>
      )}

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
            const isAnswered = !!userAnswers[q.id];
            const isExplanationOpen = !!revealedExplanations[q.id];
            const isSpeaking = isSpeakingId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-5 transition-all hover:border-slate-300"
              >
                {/* Question Header & Meta */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
                      #{q.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider">
                      {q.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Read question with speech */}
                    <button
                      onClick={() => handleSpeak(q)}
                      className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                        isSpeaking
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="Soma mu jwi riranguruye"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isSpeaking ? 'Hagarika' : 'Soma'}</span>
                    </button>

                    {/* Reveal Explanation */}
                    {q.explanation && (
                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        title="Sobanukirwa amategeko"
                      >
                        {isExplanationOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span className="hidden sm:inline">Ubusobanuro</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Road Sign Graphic if applicable */}
                {(q.signCode || q.signSvgType) && (
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-center">
                    <RoadSignGraphic
                      type={q.signSvgType || q.signCode || 'danger'}
                      size={110}
                    />
                  </div>
                )}

                {/* Question Title */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {q.question}
                </h3>

                {/* Options List */}
                <div className="space-y-2.5">
                  {q.options.map((opt) => {
                    const isOptionCorrect = opt.id === q.correctAnswerId;
                    const isSelected = userAnswers[q.id] === opt.id;

                    let optContainerStyle = '';
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
