import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, ShieldCheck, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { STUDY_TOPICS } from '../data/studyTopics';
import { TRANSLATIONS } from '../data/translations';

interface StudyGuideViewProps {
  language: Language;
}

export const StudyGuideView: React.FC<StudyGuideViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedTopicId, setSelectedTopicId] = useState<string>(STUDY_TOPICS[0].id);

  const activeTopic = STUDY_TOPICS.find((top) => top.id === selectedTopicId) || STUDY_TOPICS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold mb-2 border border-sky-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Iteka rya Perezida No 85/01 & Amategeko y'Umuhanda</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {language === 'rw' ? 'Igitabo cy\'Amasomo y\'Amategeko y\'Umuhanda' : 'Rwanda Traffic Code Study Digest'}
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-2xl">
          {language === 'rw' 
            ? 'Incamake y\'ingingo z\'ingenzi zikunze kubazwa mu bizamini bya Polisi y\'u Rwanda, amategeko yo gutambuka mbere, umuvuduko, n\'ubutabazi.'
            : 'Key legal articles, priority conventions, speed caps, and practical traffic principles explained clearly for exam candidates.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Topic navigation tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          {STUDY_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-mono font-bold text-emerald-800">
                    {topic.legalCode || 'Code'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {topic.readTime}
                  </span>
                </div>
                <h4 className={`text-sm font-bold leading-snug ${
                  isSelected ? 'text-emerald-950 font-black' : 'text-slate-800'
                }`}>
                  {topic.title[language] || topic.title.rw}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {topic.summary[language] || topic.summary.rw}
                </p>
              </button>
            );
          })}
        </div>

        {/* Topic content viewer (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Topic header */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{activeTopic.legalCode}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {activeTopic.title[language] || activeTopic.title.rw}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {activeTopic.summary[language] || activeTopic.summary.rw}
              </p>
            </div>

            {/* Articles list */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-400">
                {language === 'rw' ? 'Ingingo n\'Amahame y\'Itegeko' : 'Statutory Articles & Principles'}
              </h4>

              <div className="space-y-3">
                {(activeTopic.content[language] || activeTopic.content.rw).map((paragraph, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-150"
                  >
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key takeaways & Exam traps */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{language === 'rw' ? 'Ibyo Kwitondera mu Kizamini cya Polisi' : 'Key Takeaways & Exam Traps'}</span>
              </div>
              <ul className="space-y-2">
                {(activeTopic.keyTakeaways[language] || activeTopic.keyTakeaways.rw).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-900 font-medium">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
