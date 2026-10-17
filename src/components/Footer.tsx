import React from 'react';
import { Phone, Shield, ExternalLink, Heart, Layers, BookOpen, Award } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateTab }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                I
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                IREME <span className="text-emerald-500">COLLEGE</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {language === 'rw' 
                ? 'Urubuga rwambere rw\'ikoranabuhanga rwo kwimenyereza amategeko y\'umuhanda no kwitegura ikizamini cya Provisoire mu Rwanda. Gutsinda ku nshuro ya mbere ni intego yacu.'
                : 'Rwanda\'s premier digital platform for learning traffic regulations and preparing for the provisional driving license exam (Provisoire).'}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{language === 'rw' ? 'Ibibazo bihuje n\'Iteka rya Perezida No 85/01' : 'Aligned with Presidential Decree No 85/01'}</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              {language === 'rw' ? 'Kwisuzuma & Kwiga' : 'Learning Modes'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('exams')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.navExams} (20/20 Simulator)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('signs')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.navRoadSigns}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('study')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.navStudy}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('flashcards')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  {t.navFlashcards}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              {language === 'rw' ? 'Serivisi za Leta' : 'Official Portals'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('irembo')} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  IremboGov Application Guide
                </button>
              </li>
              <li>
                <a 
                  href="https://irembo.gov.rw" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>irembo.gov.rw</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://police.gov.rw" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>police.gov.rw</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines Rwanda */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              {language === 'rw' ? 'Ubutabazi mu Rwanda' : 'Rwanda Hotlines'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Polisi (Emergency): <strong className="text-white">112</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Polisi y'Umuhanda (Traffic): <strong className="text-white">118</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ambulance SAMU: <strong className="text-white">912</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Irembo Helpdesk: <strong className="text-white">9099</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Ireme College. Inspired by isuzume.rw for Rwandan driving license candidates.
          </p>
          <p className="text-center sm:text-right text-[11px] max-w-md">
            {language === 'rw' 
              ? 'Ireme College ni urubuga rwigenga rwo gufasha abanyarwanda kwiga no gutsinda ibizamini by\'umuhanda.'
              : 'Independent educational simulator supporting provisional license exam candidates in Rwanda.'}
          </p>
        </div>
      </div>
    </footer>
  );
};
