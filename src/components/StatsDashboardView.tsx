import React from 'react';
import { Award, Clock, TrendingUp, CheckCircle, XCircle, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ExamRecord, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface StatsDashboardViewProps {
  language: Language;
  records: ExamRecord[];
  onClearRecords: () => void;
  onRetakeExam: () => void;
}

export const StatsDashboardView: React.FC<StatsDashboardViewProps> = ({
  language,
  records,
  onClearRecords,
  onRetakeExam,
}) => {
  const t = TRANSLATIONS[language];

  const totalExams = records.length;
  const passedExams = records.filter((r) => r.passed).length;
  const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;
  
  const avgScore = totalExams > 0 
    ? (records.reduce((acc, r) => acc + r.score, 0) / totalExams).toFixed(1) 
    : '0';

  const bestScore = totalExams > 0 
    ? Math.max(...records.map((r) => r.score)) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Iterambere ryawe mu Kwiga</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.statsTitle}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {t.statsSubtitle}
          </p>
        </div>

        {totalExams > 0 && (
          <button
            onClick={onClearRecords}
            className="self-start sm:self-auto text-xs font-bold text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {language === 'rw' ? 'Siba amateka yose' : 'Clear all history'}
          </button>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs">
          <div className="text-xs text-slate-400 font-bold uppercase">{t.totalExams}</div>
          <div className="text-3xl font-black text-slate-900 mt-1">{totalExams}</div>
          <div className="text-xs text-slate-500 mt-1">
            {passedExams} {language === 'rw' ? 'byatsinzwe neza' : 'passed'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs">
          <div className="text-xs text-slate-400 font-bold uppercase">{t.avgScore}</div>
          <div className="text-3xl font-black text-emerald-700 mt-1">{avgScore} <span className="text-sm font-semibold text-slate-400">/ 20</span></div>
          <div className="text-xs text-slate-500 mt-1">
            {language === 'rw' ? 'Amanota yo hagati' : 'Average score'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs">
          <div className="text-xs text-slate-400 font-bold uppercase">{t.bestScore}</div>
          <div className="text-3xl font-black text-sky-700 mt-1">{bestScore} <span className="text-sm font-semibold text-slate-400">/ 20</span></div>
          <div className="text-xs text-slate-500 mt-1">
            {language === 'rw' ? 'Amanota menshi wigeze kubona' : 'Personal high score'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-2xs">
          <div className="text-xs text-slate-400 font-bold uppercase">{language === 'rw' ? 'Igipimo cyo Gutsinda' : 'Pass Rate'}</div>
          <div className="text-3xl font-black text-teal-700 mt-1">{passRate}%</div>
          <div className="text-xs text-slate-500 mt-1">
            {language === 'rw' ? 'Ku bipimo bya 12/20' : 'Based on 12/20 pass criteria'}
          </div>
        </div>
      </div>

      {/* Readiness Assessment Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 mb-10 border ${
        passRate >= 75 && totalExams >= 3
          ? 'bg-emerald-950 text-white border-emerald-800'
          : 'bg-slate-900 text-white border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {language === 'rw' ? 'Isuzuma ry\'Ubushobozi bwawe' : 'Exam Readiness Diagnosis'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              {totalExams === 0 ? (
                language === 'rw' ? 'Nturakora ikizamini na kimwe' : 'No tests taken yet'
              ) : passRate >= 75 ? (
                language === 'rw' ? 'Witeguye 100% Gutsinda Ikizamini cya Polisi! 🚀' : 'You are fully prepared to pass the RNP exam! 🚀'
              ) : (
                language === 'rw' ? 'Komeza witoze kugira ngo urenze 75% yo gutsinda!' : 'Keep practicing to bring your average pass rate over 75%!'
              )}
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              {totalExams === 0
                ? language === 'rw' 
                  ? 'Tangira ikizamini cyawe cya mbere kugira ngo umenye aho ugeze mu kwiga amategeko y\'umuhanda.' 
                  : 'Start your first simulation to evaluate your road traffic knowledge.'
                : passRate >= 75
                ? language === 'rw' 
                  ? 'Amanota yawe aragaragaza ko ushobora gutsindira rimwe uruhushya rw\'agateganyo kuri IremboGov.' 
                  : 'Your historical performance demonstrates a very high probability of passing on your first official attempt.'
                : language === 'rw'
                ? 'Itegure by\'umwihariko mu byiciro by\'Ibyapa bibuza n\'Amategeko yo gutambuka mbere kuri rond-point.'
                : 'Focus on road signs and roundabout priority rules to consolidate your score.'}
            </p>
          </div>

          <button
            onClick={onRetakeExam}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-md shrink-0 cursor-pointer"
          >
            {language === 'rw' ? 'Kora Ikindi Kizamini' : 'Start New Simulation'}
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-black text-slate-900 mb-4">
          {language === 'rw' ? 'Amateka y\'Ibizamini Biheruka' : 'Past Examination Sessions'}
        </h3>

        {totalExams === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            {language === 'rw' ? 'Nta bizamini birakorwa kugeza ubu.' : 'No recorded exam sessions yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">{language === 'rw' ? 'Itariki' : 'Date'}</th>
                  <th className="py-3 px-4">{language === 'rw' ? 'Amanota' : 'Score'}</th>
                  <th className="py-3 px-4">{language === 'rw' ? 'Ibisubizo' : 'Status'}</th>
                  <th className="py-3 px-4">{language === 'rw' ? 'Igihe' : 'Time'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {records.map((r, idx) => {
                  const mins = Math.floor(r.timeSpentSeconds / 60);
                  const secs = r.timeSpentSeconds % 60;
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 text-slate-400 text-xs">{idx + 1}</td>
                      <td className="py-3 px-4 text-slate-700 font-mono text-xs">{r.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {r.score} / {r.total} ({Math.round((r.score / r.total) * 100)}%)
                      </td>
                      <td className="py-3 px-4">
                        {r.passed ? (
                          <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 text-xs font-bold px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Watsinze</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-800 bg-rose-100 text-xs font-bold px-2.5 py-1 rounded-full">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Watsinzwe</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-xs font-mono">
                        {mins}m {secs}s
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
