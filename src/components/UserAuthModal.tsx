import React, { useState } from 'react';
import { X, User, Phone, Award, ShieldCheck, QrCode, LogOut, CheckCircle2 } from 'lucide-react';
import { Language, UserProfile, ExamRecord } from '../types';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  userProfile: UserProfile | null;
  onLogin: (name: string, phone: string) => void;
  onLogout: () => void;
  examRecords: ExamRecord[];
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  language,
  userProfile,
  onLogin,
  onLogout,
  examRecords,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() && phoneInput.trim()) {
      onLogin(nameInput.trim(), phoneInput.trim());
      onClose();
    }
  };

  const passedTestsCount = examRecords.filter((r) => r.passed).length;
  const isEligibleForCertificate = passedTestsCount >= 1;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-scaleUp relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {userProfile ? (
          /* Profile & Certificate Screen */
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 font-black text-2xl flex items-center justify-center mx-auto mb-3">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {userProfile.name}
              </h3>
              <p className="text-xs font-mono text-slate-500">
                {userProfile.phone}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{userProfile.isPro ? userProfile.planName || 'PRO Student' : 'Free Member'}</span>
              </div>
            </div>

            {/* Certificate of Readiness Card */}
            {isEligibleForCertificate ? (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 text-center space-y-2">
                <Award className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="font-black text-sm text-amber-950 uppercase">
                  Icyemezo cy'Ubwitegure (Readiness Certificate)
                </h4>
                <p className="text-[11px] text-amber-850 leading-snug">
                  Watsinze ibizamini {passedTestsCount} bya 20/20. Ubu wemerewe gukora ikizamini cya Polisi y'u Rwanda kuri BK Arena!
                </p>
                <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-amber-900">
                  <QrCode className="w-4 h-4" />
                  <span>ID: IRE-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center text-xs text-slate-500">
                Tsinze nibura ikizamini 1 cya 20/20 (amanota 12+) kugira ngo ufungure icyemezo cy'ubwitegure cyawe.
              </div>
            )}

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sohoka muri Konti (Log out)</span>
            </button>
          </div>
        ) : (
          /* Login / Register Form */
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                {language === 'rw' ? 'Injira muri Konti yawe' : 'Sign in to Ireme College'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'rw' 
                  ? 'Bika amateka y\'ibizamini byawe n\'amanota ubonye.'
                  : 'Track your test history, scores, and unlock personalized study stats.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'rw' ? 'Amazina yawe' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="urugero: Jean Pierre"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-sm text-slate-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'rw' ? 'Numero ya Telefoni' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="0788 000 000"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-2.5 px-3.5 text-sm font-mono text-slate-900 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl text-sm transition-all shadow-sm cursor-pointer"
              >
                {language === 'rw' ? 'Komeza Ubone Konti' : 'Continue'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
