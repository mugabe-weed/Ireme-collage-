import React, { useState } from 'react';
import { MessageCircle, X, Send, Users, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface WhatsAppSupportProps {
  language: Language;
}

export const WhatsAppSupport: React.FC<WhatsAppSupportProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickMessages = [
    {
      label: language === 'rw' ? 'Ikibazo ku kizamini cya Provisoire' : 'Provisoire exam question',
      text: 'Mwiriwe Ireme College! Mfite ikibazo ku kizamini cya Provisoire nifuza ko mwasobanurira.',
    },
    {
      label: language === 'rw' ? 'Ubufasha bwo kwiyandikisha kuri Irembo' : 'IremboGov help',
      text: 'Mwiriwe! Nkeneye ubufasha bwo kwiyandikisha ku kizamini cya provisoire kuri IremboGov.',
    },
    {
      label: language === 'rw' ? 'Injira muri Group ya WhatsApp' : 'Join WhatsApp study group',
      text: 'Mwiriwe! Ndashaka kwinjira muri Group ya WhatsApp y\'abitegura ikizamini cya provisoire.',
    },
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/250788889000?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          aria-label="Vugana natwe kuri WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            {language === 'rw' ? 'Vugana natwe kuri WhatsApp' : 'Chat on WhatsApp'}
          </span>
        </button>
      </div>

      {/* WhatsApp Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-scaleUp">
          {/* Header */}
          <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm leading-tight">
                  Ireme College WhatsApp
                </h4>
                <span className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Kora rimwe Utsinde
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-emerald-800 text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 bg-slate-50 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-slate-700 leading-relaxed">
              Muraho! 👋 Murakaza neza kuri <strong>Ireme College</strong>. Hitamo ubutumwa bwihuse cyangwa wandike ikibazo cyawe munsi uhite uhuzwa n'umufasha kuri WhatsApp.
            </div>

            {/* Quick choices */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block px-1">
                Ubutumwa bwihuse
              </span>
              {quickMessages.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(msg.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200/80 font-medium text-slate-700 text-xs transition-colors cursor-pointer"
                >
                  {msg.label}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Andika ubutumwa bwawe hano..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-emerald-500"
              />
              <button
                onClick={() => handleSend(customMsg || 'Mwiriwe Ireme College!')}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
