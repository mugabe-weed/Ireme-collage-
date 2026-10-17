import React, { useState } from 'react';
import { Shield, Search, AlertCircle, DollarSign, FileText, Printer, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRAFFIC_FINES_2026 } from '../data/trafficFines';
import { STUDY_TOPICS } from '../data/studyTopics';

interface TrafficLawArticlesViewProps {
  language: Language;
  onStartExam: () => void;
}

export const TrafficLawArticlesView: React.FC<TrafficLawArticlesViewProps> = ({
  language,
  onStartExam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'speed' | 'safety' | 'documents' | 'priority' | 'alcohol'>('all');

  const filteredFines = TRAFFIC_FINES_2026.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const txt = (item.infraction[language] || item.infraction.rw).toLowerCase();
      const fine = item.fineRwf.toLowerCase();
      return txt.includes(q) || fine.includes(q);
    }
    return true;
  });

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Shield className="w-3.5 h-3.5" />
            <span>Itegeko Rishya ry'Umuhanda & Ibihano 2026 🇷🇼</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'rw' ? 'Amategeko y\'Umuhanda n\'Amande ya Polisi' : 'Rwandan Road Traffic Code & Official Fine Schedule'}
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            {language === 'rw'
              ? 'Iteka rya Perezida No 85/01 n\'amavugurura mashya ya 2026: amande, amanota yo ku ruhushya, n\'ingingo zikunze kubazwa.'
              : 'Official statutory regulations, updated 2026 traffic fines, demerit points, and legal precedents in Rwanda.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handlePrintSummary}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs shadow-2xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'rw' ? 'Koporora Incamake' : 'Print Summary'}</span>
          </button>
          <button
            onClick={onStartExam}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs cursor-pointer"
          >
            <span>{language === 'rw' ? 'Kora Ikizamini' : 'Test Knowledge'}</span>
          </button>
        </div>
      </div>

      {/* 2026 Law Key Notice Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-10 border border-emerald-800/60">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700">
                Amavugurura ya 2026
              </span>
              <span className="text-xs text-slate-400 font-mono">Rwanda National Police</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              {language === 'rw' 
                ? 'Ibyo Ugomba Kumenya ku Mategeko Mashya n\'Ikoranabuhanga rya za Radar' 
                : 'Key Updates Regarding Speed Cameras & 2026 Enforcement'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {language === 'rw'
                ? 'Itegeko rishya ryakajije ibihano ku batwara basinze, abarenza umuvuduko bafashwe n\'ibyuma bifotora (speed cameras / radars), abatambara umukandara, n\'abakoresha telefoni batwaye. Ubutumwa bw\'amande buhita bujya muri telefoni yanditse ku kinyabiziga binyuze muri IremboGov.'
                : 'Recent legislative adjustments in Rwanda mandate tighter penalties on alcohol violations, automatic camera speed detection, mobile phone usage, and failure to wear seatbelts. Infractions are recorded digitally and delivered via SMS connected to IremboGov.'}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs mb-8 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'rw' ? 'Shakisha ikosa cyangwa amande (urugero: umuvuduko, inzoga, umurongo, 25,000)...' : 'Search infraction or fine amount...'}
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden transition-all"
          />
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: language === 'rw' ? 'Amakosa Yose' : 'All Infractions' },
            { id: 'speed', label: language === 'rw' ? 'Umuvuduko' : 'Speed Limits' },
            { id: 'alcohol', label: language === 'rw' ? 'Inzoga (Alcoolémie)' : 'Alcohol / DUI' },
            { id: 'priority', label: language === 'rw' ? 'Gutambuka & Imirongo' : 'Priority & Markings' },
            { id: 'safety', label: language === 'rw' ? 'Umutekano & Telefone' : 'Safety & Phones' },
            { id: 'documents', label: language === 'rw' ? 'Inyandiko & Control' : 'Vehicle Papers' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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

      {/* Fines Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs mb-12">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-lg text-slate-900">
            {language === 'rw' ? 'Urutonde rw\'Amande ya Polisi y\'u Rwanda (Official Fines Table)' : 'Official Traffic Violation Fine Table'}
          </h3>
          <span className="text-xs font-mono font-bold text-slate-400">
            {filteredFines.length} {language === 'rw' ? 'byabonetse' : 'records'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-extrabold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">{language === 'rw' ? 'Ikosa ryakozwe' : 'Infraction Description'}</th>
                <th className="py-3.5 px-4">{language === 'rw' ? 'Amande y\'Amafaranga' : 'Statutory Fine (RWF)'}</th>
                <th className="py-3.5 px-4">{language === 'rw' ? 'Amanota Akurwaho' : 'Penalty Points'}</th>
                <th className="py-3.5 px-4">{language === 'rw' ? 'Itegeko' : 'Legal Basis'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFines.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-mono text-xs text-slate-400">{idx + 1}</td>
                  <td className="py-4 px-4 font-semibold text-slate-800 max-w-md">
                    {item.infraction[language] || item.infraction.rw}
                  </td>
                  <td className="py-4 px-4 font-mono font-black text-emerald-800 whitespace-nowrap">
                    {item.fineRwf}
                  </td>
                  <td className="py-4 px-4">
                    {item.penaltyPoints ? (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                        -{item.penaltyPoints} pts
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500 font-medium">
                    {item.legalRef}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Essential Presidential Articles Summary */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900">
          {language === 'rw' ? 'Ingingo z\'Iteka rya Perezida No 85/01 Zikunze Kubazwa' : 'Key Presidential Decree Articles Tested on Exams'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STUDY_TOPICS.map((top) => (
            <div key={top.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-2xs">
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {top.legalCode}
              </span>
              <h4 className="font-bold text-base text-slate-900">
                {top.title[language] || top.title.rw}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {top.summary[language] || top.summary.rw}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
