import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Check, X, Zap, Phone, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { PaymentAPI, InitiatePaymentResponse } from '../services/paymentService';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onActivatePro: (planName: string) => void;
  onPaymentSuccess?: (token: string, phone: string) => void;
  defaultPlan?: 'daily' | 'weekly' | 'monthly' | 'single_exam';
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  language,
  onActivatePro,
  onPaymentSuccess,
  defaultPlan = 'daily',
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'weekly' | 'monthly' | 'single_exam'>(defaultPlan);
  const [provider, setProvider] = useState<'mtn' | 'airtel'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState('078');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTx, setActiveTx] = useState<InitiatePaymentResponse | null>(null);
  const [pollingStatus, setPollingStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESSFUL' | 'FAILED'>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSelectedPlan(defaultPlan);
  }, [defaultPlan]);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const planAmounts: Record<string, number> = {
    daily: 1000,
    weekly: 2500,
    monthly: 5000,
    single_exam: 500,
  };

  const planPrices: Record<string, string> = {
    daily: '1,000 FRW',
    weekly: '2,500 FRW',
    monthly: '5,000 FRW',
    single_exam: '500 FRW',
  };

  const planLabels: Record<string, string> = {
    daily: 'Ku Munsi (Daily Access - 1,000 FRW)',
    weekly: 'Mu Cyumweru (Weekly Access - 2,500 FRW)',
    monthly: 'Ku Kwezi (Monthly VIP - 5,000 FRW)',
    single_exam: '500 FRW PRO (20/20 Questions Unlocked)',
  };

  const handlePhoneChange = (val: string) => {
    setPhoneNumber(val);
    const clean = val.replace(/\D/g, '');
    if (clean.startsWith('078') || clean.startsWith('079') || clean.startsWith('25078') || clean.startsWith('25079')) {
      setProvider('mtn');
    } else if (clean.startsWith('072') || clean.startsWith('073') || clean.startsWith('25072') || clean.startsWith('25073')) {
      setProvider('airtel');
    }
  };

  const handlePayViaAPI = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      const amount = planAmounts[selectedPlan] || 500;
      const res = await PaymentAPI.initiatePayment(phoneNumber, provider, amount);

      if (!res.success) {
        setErrorMessage(res.error || 'Habaye ikosa mu gutangiza ubwishyu.');
        setIsProcessing(false);
        return;
      }

      setActiveTx(res);
      setPollingStatus('PENDING');

      // Start status polling
      pollingRef.current = setInterval(async () => {
        try {
          const statusRes = await PaymentAPI.checkPaymentStatus(res.transactionId!);
          if (statusRes.status === 'SUCCESSFUL' && statusRes.paymentToken) {
            if (pollingRef.current) clearInterval(pollingRef.current);
            setPollingStatus('SUCCESSFUL');
            
            if (onPaymentSuccess) {
              onPaymentSuccess(statusRes.paymentToken, phoneNumber);
            }
            onActivatePro(planLabels[selectedPlan] || '500 FRW PRO');

            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 },
            });

            setTimeout(() => {
              onClose();
            }, 1500);
          } else if (statusRes.status === 'FAILED') {
            if (pollingRef.current) clearInterval(pollingRef.current);
            setPollingStatus('FAILED');
            setErrorMessage('Ubwishyu bwanze cyangwa igihe cyarangiye. Ongera ugerageze.');
          }
        } catch {
          // keep polling
        }
      }, 2000);
    } catch {
      setErrorMessage('Ntibishobotse guhura na seriveri ya MTN/Airtel API.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualApprove = async () => {
    if (!activeTx?.transactionId) return;
    try {
      const res = await PaymentAPI.verifyPayment(activeTx.transactionId, phoneNumber);
      if (res.success && res.paymentToken) {
        if (pollingRef.current) clearInterval(pollingRef.current);
        setPollingStatus('SUCCESSFUL');
        if (onPaymentSuccess) {
          onPaymentSuccess(res.paymentToken, phoneNumber);
        }
        onActivatePro(planLabels[selectedPlan] || '500 FRW PRO');
        confetti({ particleCount: 150, spread: 90 });
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch {
      setErrorMessage('Habaye ikosa mu kwemeza ubwishyu.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 animate-scaleUp relative my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-md mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Zap className="w-3.5 h-3.5 fill-emerald-600" />
            <span>Ireme College — Kwishyura 500 FRW kuri API</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            {language === 'rw' ? 'Fungura Ibibazo 18 Bisigaye' : 'Unlock All 20 Exam Questions'}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            {language === 'rw' 
              ? 'Ibibazo 2 bya mbere ni ubuntu. Kugira ngo ubone ibindi bibazo 18 bisigaye n\'ibizamini byose 20/20, ishyura 500 FRW kuri MTN MoMo cyangwa Airtel Money.'
              : 'The first 2 questions are free. To unlock the remaining 18 questions, pay 500 FRW via MTN MoMo or Airtel Money API.'}
          </p>
        </div>

        {/* Pricing Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
          
          {/* Daily Plan: 1,000 FRW */}
          <div
            onClick={() => setSelectedPlan('daily')}
            className={`border-2 rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer transition-all ${
              selectedPlan === 'daily'
                ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-400'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-800 block">Ku Munsi</span>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">1,000 FRW</div>
              <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                {language === 'rw' ? 'Ibibazo byose mu masaha 24' : 'All questions for 24h'}
              </p>
            </div>
          </div>

          {/* Weekly Plan: 2,500 FRW */}
          <div
            onClick={() => setSelectedPlan('weekly')}
            className={`border-2 rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer relative transition-all ${
              selectedPlan === 'weekly'
                ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
              Ikunzwe Cyane
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase text-emerald-800 block">Mu Cyumweru</span>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">2,500 FRW</div>
              <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                {language === 'rw' ? 'Iminsi 7 ibizamini bitagira umupaka' : '7 days unlimited tests'}
              </p>
            </div>
          </div>

          {/* Monthly Plan: 5,000 FRW */}
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={`border-2 rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer transition-all ${
              selectedPlan === 'monthly'
                ? 'border-purple-600 bg-purple-50/80 shadow-md ring-2 ring-purple-500'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-purple-800 block">Ku Kwezi (VIP)</span>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">5,000 FRW</div>
              <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                {language === 'rw' ? 'Ukwezi kose (30d) + Icyemezo' : 'Full 30 days + Certificate'}
              </p>
            </div>
          </div>

          {/* Single Exam: 500 FRW */}
          <div
            onClick={() => setSelectedPlan('single_exam')}
            className={`border-2 rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer transition-all ${
              selectedPlan === 'single_exam'
                ? 'border-slate-800 bg-slate-100 shadow-xs ring-1 ring-slate-800'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 block">Ikizamini 1</span>
              <div className="text-base sm:text-lg font-black text-slate-900 mt-0.5">500 FRW</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                {language === 'rw' ? 'Fungura 20/20 y\'ikizamini 1' : 'Unlock 20/20 for 1 exam'}
              </p>
            </div>
          </div>

        </div>

        {/* Feature inclusions */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 mb-5 text-xs text-slate-700 space-y-1.5">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Fungura ibibazo 18 bisigaye kuri ubu buryo bwa <strong>{planPrices[selectedPlan]}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ibarurishamibare n'amanota yawe nyuma yo gukora ikizamini cyuzuye cya 20/20</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ibisobanuro nyabyo n'ingingo z'amategeko (Iteka rya Perezida No 85/01)</span>
          </div>
        </div>

        {/* Network provider tabs: MTN vs Airtel */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Hitamo Umurongo wawe w'Ubwishyu:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setProvider('mtn');
                if (!phoneNumber.startsWith('078') && !phoneNumber.startsWith('079')) {
                  setPhoneNumber('078');
                }
              }}
              className={`p-2.5 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                provider === 'mtn'
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
                setProvider('airtel');
                if (!phoneNumber.startsWith('072') && !phoneNumber.startsWith('073')) {
                  setPhoneNumber('072');
                }
              }}
              className={`p-2.5 rounded-xl border-2 font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                provider === 'airtel'
                  ? 'border-red-500 bg-red-50 text-red-950 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span>Airtel Money</span>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-xs font-bold text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Polling / USSD Active state */}
        {pollingStatus === 'PENDING' ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-3 animate-pulse">
            <Loader2 className="w-6 h-6 text-amber-700 animate-spin mx-auto" />
            <div className="text-xs font-bold text-amber-900">
              📲 Ubutumwa bw'amafaranga {planPrices[selectedPlan]} bwoherejwe kuri telefoni ({phoneNumber})...
            </div>
            <p className="text-[11px] text-amber-800 leading-tight">
              Kanda PIN yawe ya {provider.toUpperCase()} MoMo (*182#) kugira ngo wemeze ubwishyu.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleManualApprove}
                className="text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Nemeje PIN (Emeza Ubwishyu)
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handlePayViaAPI} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {language === 'rw' 
                  ? `Numero ya Telefoni (${provider === 'mtn' ? '078... / 079...' : '072... / 073...'})` 
                  : 'Mobile Money Phone Number'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder={provider === 'mtn' ? '0788 000 000' : '0722 000 000'}
                  className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-sm font-mono font-bold text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Amafaranga ({planPrices[selectedPlan]}) azakatwa kuri konti yawe ya {provider.toUpperCase()} umaze kwemeza PIN.</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-3.5 rounded-2xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guhuza na API ya {provider.toUpperCase()}...</span>
                </div>
              ) : (
                <>
                  <span>{language === 'rw' ? `Ishyura ${planPrices[selectedPlan]} kuri API ya ${provider.toUpperCase()}` : `Pay ${planPrices[selectedPlan]} Now`}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
