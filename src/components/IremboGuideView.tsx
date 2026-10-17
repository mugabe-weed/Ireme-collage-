import React from 'react';
import { FileCheck, ExternalLink, CheckCircle2, AlertCircle, Phone, MapPin, DollarSign, Calendar, Shield } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface IremboGuideViewProps {
  language: Language;
  onStartExam: () => void;
}

export const IremboGuideView: React.FC<IremboGuideViewProps> = ({
  language,
  onStartExam,
}) => {
  const t = TRANSLATIONS[language];

  const steps = [
    {
      num: 1,
      title: {
        rw: 'Kwinjira kuri Urubuga rwa IremboGov',
        en: 'Visit the IremboGov Portal',
        fr: 'Accédez au Portail IremboGov',
      },
      desc: {
        rw: 'Fungura umurongo wa www.irembo.gov.rw muri telefoni cyangwa mudasobwa yawe. Kanda ahanditse "Police" maze uhitemo "Registration for Driving Test - Theory (Provisoire)".',
        en: 'Open www.irembo.gov.rw on your device. Navigate to "Police" services and click "Registration for Driving Test - Theory (Provisoire)".',
        fr: 'Ouvrez www.irembo.gov.rw. Rendez-vous dans la rubrique "Police" et sélectionnez "Inscription à l\'Examen Théorique du Permis".',
      },
      tag: 'Step 1',
    },
    {
      num: 2,
      title: {
        rw: 'Kuzuza Imyirondoro (Indangamuntu)',
        en: 'Input Identification Details',
        fr: 'Renseignez Vos Identifiants',
      },
      desc: {
        rw: 'Shyiramo numero yawe y\'Indangamuntu (Imibare 16). Sisitemu izahita izana amazina yawe mu buryo bwikora. Witonde kandi ushyiremo numero ya telefoni igendanwa ikora neza.',
        en: 'Enter your 16-digit National ID number (must be at least 18 years old). The system will auto-populate your legal names. Enter a valid mobile phone number.',
        fr: 'Indiquez votre numéro de Carte Nationale d\'Identité (16 chiffres). Vos nom et prénom apparaîtront automatiquement. Saisissez votre numéro de portable.',
      },
      tag: 'Step 2',
    },
    {
      num: 3,
      title: {
        rw: 'Guhitamo Ikigo n\'Itariki y\'Ikizamini',
        en: 'Select Examination Center & Date',
        fr: 'Choisissez le Centre et la Date',
      },
      desc: {
        rw: 'Hitamo intara n\'ikigo wifuza gukoreraho (urugero: Kigali - BK Arena, Huye, Musanze, Rubavu, Rwamagana, Rusizi, etc.) n\'itariki y\'ikizamini ikunogeye.',
        en: 'Choose your testing location (e.g. Kigali BK Arena, Musanze, Huye, Rubavu, Rwamagana) and pick from the available examination calendar slots.',
        fr: 'Sélectionnez votre centre d\'examen (Kigali, Huye, Musanze, Rubavu, etc.) et retenez une date disponible selon votre convenance.',
      },
      tag: 'Step 3',
    },
    {
      num: 4,
      title: {
        rw: 'Kwishyura Amafaranga y\'Ikizamini (5,000 RWF)',
        en: 'Pay Statutory Fee (5,000 RWF)',
        fr: 'Réglez les Frais d\'Examen (5.000 RWF)',
      },
      desc: {
        rw: 'Irembo izaguha numero yo kwishyuriraho (Billing Number). Wishyure amafaranga 5,000 RWF ukoresheje MTN Mobile Money (*182#), Airtel Money, cyangwa Banki (BK, etc.).',
        en: 'A bill ID number is generated. Complete payment of 5,000 RWF via MTN Mobile Money (*182#), Airtel Money, or bank counter.',
        fr: 'Un code de facturation est généré. Réglez 5.000 RWF par MTN MoMo (*182#), Airtel Money ou auprès des agences bancaires.',
      },
      tag: 'Step 4',
    },
    {
      num: 5,
      title: {
        rw: 'Kwakira Ubutumwa Bwemeza (SMS Confirmation)',
        en: 'Receive SMS Confirmation & Code',
        fr: 'Réception du SMS de Confirmation',
      },
      desc: {
        rw: 'Nyuma yo kwishyura, Polisi izakwoherereza ubutumwa bugufi (SMS) burimo kode y\'ikizamini, isaha, n\'aho uzakorera. Bika ubwo butumwa neza.',
        en: 'Following payment, you will receive an official confirmation SMS containing your exam registration code, scheduled time, and center details.',
        fr: 'Après paiement, la Police vous adresse un SMS comportant votre code de convocation, heure et lieu de convocation.',
      },
      tag: 'Step 5',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
          <FileCheck className="w-3.5 h-3.5" />
          <span>IremboGov & RNP Traffic Services 🇷🇼</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.iremboTitle}
        </h2>
        <p className="text-slate-600 text-sm mt-1">
          {t.iremboSubtitle}
        </p>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase">{language === 'rw' ? 'Amafaranga y\'Ikizamini' : 'Official Fee'}</div>
          <div className="text-2xl font-black text-slate-900 mt-0.5">5,000 RWF</div>
          <div className="text-xs text-slate-500 mt-1">{language === 'rw' ? 'Yishyurwa binyuze kuri MoMo cyangwa Banki' : 'Payable via MoMo or Bank'}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase">{language === 'rw' ? 'Igihe cy\'Ikizamini' : 'Exam Duration'}</div>
          <div className="text-2xl font-black text-slate-900 mt-0.5">20 Min</div>
          <div className="text-xs text-slate-500 mt-1">{language === 'rw' ? 'Ibibazo 20 | Amanota yo gutsinda: 12/20' : '20 questions | Pass mark: 12/20'}</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase">{language === 'rw' ? 'Ibisabwa by\'Ibanze' : 'Core Eligibility'}</div>
          <div className="text-2xl font-black text-slate-900 mt-0.5">18+ Imyaka</div>
          <div className="text-xs text-slate-500 mt-1">{language === 'rw' ? 'Indangamuntu y\'umwimerere y\'u Rwanda' : 'Valid Rwandan National ID'}</div>
        </div>
      </div>

      {/* Step by Step Timeline */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs mb-10 space-y-6">
        <h3 className="text-lg font-black text-slate-900">
          {language === 'rw' ? 'Intambwe ku Ntambwe yo Kwiyandikisha' : 'Step-by-Step Registration Guide'}
        </h3>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.num} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                {step.num}
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                  {step.tag}
                </span>
                <h4 className="text-base font-bold text-slate-900 pt-1">
                  {step.title[language] || step.title.rw}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc[language] || step.desc.rw}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist on Exam Day */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg mb-10 space-y-4">
        <h3 className="text-lg font-black text-emerald-300">
          {language === 'rw' ? 'Ibyo Witwaza ku Munsi w\'Ikizamini' : 'Exam Day Checklist'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3 bg-emerald-900/40 border border-emerald-800/60 p-3.5 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{language === 'rw' ? 'Indangamuntu yawe y\'umwimerere (Original National ID card)' : 'Original Rwandan National ID card (no photocopies)'}</span>
          </div>
          <div className="flex items-start gap-3 bg-emerald-900/40 border border-emerald-800/60 p-3.5 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{language === 'rw' ? 'Telefoni irimo ubutumwa (SMS) bwa Irembo bukurimo kode y\'ikizamini' : 'Mobile phone with confirmation SMS containing your registration code'}</span>
          </div>
          <div className="flex items-start gap-3 bg-emerald-900/40 border border-emerald-800/60 p-3.5 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{language === 'rw' ? 'Kuhagera nibura iminota 30 mbere y\'isaha yagenwe' : 'Arrive at the testing center at least 30 minutes in advance'}</span>
          </div>
          <div className="flex items-start gap-3 bg-emerald-900/40 border border-emerald-800/60 p-3.5 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{language === 'rw' ? 'Kwirinda ibikoresho byo gukoporora (telefoni zizimwa mu cyumba cy\'ikizamini)' : 'Strict prohibition of cheating devices (phones must be switched off)'}</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA to start exam */}
      <div className="text-center">
        <p className="text-sm text-slate-600 mb-4 font-medium">
          {language === 'rw' ? 'Wiyumva witeguye gukora ikizamini cy\'igerageza nonaha?' : 'Ready to test your readiness before registering?'}
        </p>
        <button
          onClick={onStartExam}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-md text-sm transition-all cursor-pointer"
        >
          <span>{language === 'rw' ? 'Kora Ikizamini cy\'Imyitozo nonaha' : 'Start Practice Simulation Now'}</span>
        </button>
      </div>
    </div>
  );
};
