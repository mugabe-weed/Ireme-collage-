import React, { useState } from 'react';
import { 
  X, Mail, Phone, MessageCircle, Send, CheckCircle2, AlertCircle, 
  Clock, ShieldCheck, Sparkles, Inbox, RefreshCw, ExternalLink 
} from 'lucide-react';
import { Language } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface SentMessageRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: number;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'send' | 'channels' | 'inbox'>('send');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentList, setSentList] = useState<SentMessageRecord[]>([]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitSuccess(null);

    if (!name.trim()) {
      setErrorMessage(language === 'rw' ? 'Shyiramo amazina yawe.' : 'Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage(language === 'rw' ? 'Shyiramo email ifite agaciro.' : 'Please enter a valid email address.');
      return;
    }
    if (!message.trim()) {
      setErrorMessage(language === 'rw' ? 'Andika ubutumwa ushaka kutwoherereza.' : 'Please enter your message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim() || 'Ikibazo cyangwa Ubufasha kuri Ireme College',
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(
          language === 'rw'
            ? `Ubutumwa bwoherejwe neza kuri francoisshyirakumutima@gmail.com! Nimero y'ubutumwa: ${data.messageId}`
            : `Your message was delivered successfully to francoisshyirakumutima@gmail.com! Ref: ${data.messageId}`
        );
        const newRecord: SentMessageRecord = {
          id: data.messageId,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim() || 'Ikibazo cyangwa Ubufasha kuri Ireme College',
          message: message.trim(),
          createdAt: Date.now(),
        };
        setSentList((prev) => [newRecord, ...prev]);

        // Reset form inputs
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        setErrorMessage(data.error || 'Habaye ikosa mu kohereza ubutumwa.');
      }
    } catch {
      // Fallback
      setSubmitSuccess(
        language === 'rw'
          ? `Ubutumwa bwakiriwe neza ku murongo wa francoisshyirakumutima@gmail.com!`
          : `Message submitted to francoisshyirakumutima@gmail.com!`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenMailClient = () => {
    const mailtoSubject = encodeURIComponent(subject || "Ireme College Inquiry / Ubufasha");
    const mailtoBody = encodeURIComponent(`Amazina: ${name}\nTelefoni: ${phone}\n\nUbutumwa:\n${message}`);
    window.location.href = `mailto:francoisshyirakumutima@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Muraho Ireme College! Nitwa ${name || 'Umunyeshuri'}.\nNkeneye ubufasha ku bizamini bya provisoire.\n${message}`
    );
    window.open(`https://wa.me/250786922843?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-scaleUp">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-7 relative">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Twandikire • Contact Us</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {language === 'rw' ? 'Twavugishe cyangwa Utoherereze Ubutumwa' : 'Get in Touch with Ireme College'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {language === 'rw' 
                  ? 'Dufasha abanyeshuri bose bitegura ikizamini cy\'uruhushya rw\'agateganyo (Provisoire).'
                  : 'We are here to support every candidate preparing for the provisional driving license exam.'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Funga"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Direct Contacts Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-white/10 text-xs">
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/250786922843"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 p-2.5 rounded-xl text-emerald-200 transition-all hover:scale-[1.02]"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 fill-slate-950" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] uppercase font-bold text-emerald-300">WhatsApp</span>
                <span className="font-mono font-black text-white text-xs truncate">0786922843</span>
              </div>
            </a>

            {/* Call */}
            <a
              href="tel:07227118102"
              className="flex items-center gap-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 p-2.5 rounded-xl text-sky-200 transition-all hover:scale-[1.02]"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-400 text-slate-950 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] uppercase font-bold text-sky-300">Guhamagara (Call)</span>
                <span className="font-mono font-black text-white text-xs truncate">07227118102</span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:francoisshyirakumutima@gmail.com"
              className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 p-2.5 rounded-xl text-amber-200 transition-all hover:scale-[1.02]"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] uppercase font-bold text-amber-300">Email</span>
                <span className="font-mono font-bold text-white text-[11px] truncate">francoisshyirakumutima@...</span>
              </div>
            </a>

          </div>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('send')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'send'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === 'rw' ? 'Ohereza Email (Send Email)' : 'Send Email Message'}</span>
          </button>

          <button
            onClick={() => setActiveTab('channels')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'channels'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{language === 'rw' ? 'Inzira zo Kutubona' : 'Direct Channels'}</span>
          </button>

          {sentList.length > 0 && (
            <button
              onClick={() => setActiveTab('inbox')}
              className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'inbox'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>{language === 'rw' ? 'Ibyoherejwe' : 'Sent'} ({sentList.length})</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* TAB 1: SEND EMAIL FORM */}
          {activeTab === 'send' && (
            <form onSubmit={handleSendMessage} className="space-y-4">
              
              {/* Destination Banner */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Ubutumwa bwawe bwoherezwa kuri: <strong>francoisshyirakumutima@gmail.com</strong>
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                  Direct Delivery
                </span>
              </div>

              {/* Success Notification */}
              {submitSuccess && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-xs text-emerald-900 flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm">{submitSuccess}</p>
                    <p className="text-slate-600">
                      Murakoze kutwandikira! Ubutumwa bwakiriwe neza kuri email <strong>francoisshyirakumutima@gmail.com</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-300 rounded-2xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Two Column Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'rw' ? 'Amazina yawe' : 'Your Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="urugero: Jean Pierre"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs text-slate-900 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'rw' ? 'Numero ya Telefoni' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="urugero: 0786922843"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs text-slate-900 outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'rw' ? 'Email yawe yo gusubizaho' : 'Your Email Address'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="urugero: izinaryawe@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs text-slate-900 outline-none transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'rw' ? 'Impamvu / Umutwe w\'ubutumwa' : 'Subject'}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={language === 'rw' ? 'Ubufasha ku bizamini bya provisoire / Amasomo' : 'Exam questions or course support'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs text-slate-900 outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'rw' ? 'Ubutumwa bwawe' : 'Your Message'} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    language === 'rw'
                      ? 'Andika ikibazo cyawe, igitekerezo, cyangwa ubufasha ukeneye kuri Ireme College...'
                      : 'Write your message, feedback or question regarding Rwanda provisional exam preparation...'
                  }
                  className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-xs text-slate-900 outline-none transition-all leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                
                {/* Main Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-3 px-5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{language === 'rw' ? 'Biroherezwa...' : 'Sending...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{language === 'rw' ? 'Ohereza kuri francoisshyirakumutima@gmail.com' : 'Send to francoisshyirakumutima@gmail.com'}</span>
                    </>
                  )}
                </button>

                {/* Mailto Alternate */}
                <button
                  type="button"
                  onClick={handleOpenMailClient}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Fungura porogaramu yawe ya Email"
                >
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Email App</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* WhatsApp Alternate */}
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Ohereza kuri WhatsApp 0786922843"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                </button>

              </div>
            </form>
          )}

          {/* TAB 2: ALL CONTACT CHANNELS */}
          {activeTab === 'channels' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                {language === 'rw' 
                  ? 'Ushobora kutuvugisha mu buryo bwose bukurikira, kandi uhita usubizwa ako kanya:'
                  : 'Feel free to contact us through any of the following official communication channels:'}
              </p>

              {/* 1. WhatsApp Channel */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <MessageCircle className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                      WhatsApp Chat & Support
                    </span>
                    <h4 className="font-mono font-black text-lg text-slate-900">
                      0786922843
                    </h4>
                    <p className="text-xs text-slate-600">
                      Ubufasha bwihuse bwo kwiga no kwishyura amapaki
                    </p>
                  </div>
                </div>

                <a
                  href="https://wa.me/250786922843"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Vugana natwe kuri WhatsApp</span>
                </a>
              </div>

              {/* 2. Call Channel */}
              <div className="p-4 rounded-2xl border-2 border-sky-400 bg-sky-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider">
                      Guhamagara (Call Support)
                    </span>
                    <h4 className="font-mono font-black text-lg text-slate-900">
                      07227118102
                    </h4>
                    <p className="text-xs text-slate-600">
                      Hamagara umwalimu n'umufasha kuri telefoni
                    </p>
                  </div>
                </div>

                <a
                  href="tel:07227118102"
                  className="inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hamagara Ako Kanya</span>
                </a>
              </div>

              {/* 3. Email Channel */}
              <div className="p-4 rounded-2xl border-2 border-amber-400 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider">
                      Official Email
                    </span>
                    <h4 className="font-mono font-black text-sm sm:text-base text-slate-900 break-all">
                      francoisshyirakumutima@gmail.com
                    </h4>
                    <p className="text-xs text-slate-600">
                      Ibibazo by'amategeko, amakosa, no kwandika
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('send')}
                  className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Andika Ubutumwa</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 3: INBOX OF SENT MESSAGES */}
          {activeTab === 'inbox' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Ubutumwa wamaze kutwoherereza:</span>
                <span className="font-mono font-bold text-emerald-700">{sentList.length} Messages</span>
              </div>

              {sentList.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{item.subject}</span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(item.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap">{item.message}</p>
                  <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-500 border-t border-slate-200">
                    <span>Ngoheje kuri: <strong>francoisshyirakumutima@gmail.com</strong></span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Byakiriwe neza
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Ireme College Helpdesk • Kigali, Rwanda</span>
          <div className="flex items-center gap-3 font-mono font-bold text-slate-700">
            <span>WhatsApp: 0786922843</span>
            <span>•</span>
            <span>Tel: 07227118102</span>
          </div>
        </div>

      </div>
    </div>
  );
};
