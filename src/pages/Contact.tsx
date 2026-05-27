/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { 
  Mail, 
  Send,
  CheckCircle,
  ArrowRight,
  Zap,
  Building,
  Shield
} from 'lucide-react';

interface ContactProps {
  onPageChange: (page: PageId) => void;
  lang: Lang;
}

export default function Contact({ onPageChange, lang }: ContactProps) {
  const formSectionRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];
  
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    printerName: '',
    message: ''
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) { 
      setErrorMsg(lang === 'en' ? 'Full Name is required' : 'आपका नाम भरना आवश्यक है'); 
      return; 
    }
    if (!formData.businessName.trim()) { 
      setErrorMsg(lang === 'en' ? 'Factory / Company Name is required' : 'फैक्ट्री/दुकान का नाम भरना आवश्यक है'); 
      return; 
    }
    if (!formData.phone.trim() || formData.phone.length < 10) { 
      setErrorMsg(lang === 'en' ? 'Valid 10-digit Mobile Number is required' : 'सही १०-अंकीय मोबाइल नंबर आवश्यक है'); 
      return; 
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(t.formSuccess);
      setFormData({ 
        fullName: '', 
        businessName: '', 
        phone: '',
        printerName: '',
        message: '' 
      });
    }, 1200);
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="contact-page" className="bg-brand-bg text-brand-text min-h-screen font-sans overflow-x-hidden pt-20 pb-20 select-none">
      
      {/* ── CINEMATIC LIGHT HERO SECTION ── */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-brand-alt overflow-hidden border-b border-brand-border">
        
        {/* Soft color ambient blur backdrops */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-purple/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-orange/10 rounded-full filter blur-[100px] pointer-events-none" />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6">
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-brand-text leading-tight max-w-4xl mx-auto uppercase">
            {t.contactTitleLine1}<br />
            <span className="text-brand-purple">{t.contactTitleLine2}</span>
          </h1>
          
          {/* Description */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-brand-muted max-w-2xl leading-relaxed mx-auto">
            {t.contactSubtitle}
          </p>
          
          {/* CTA Button */}
          <div className="pt-2">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-white font-sans font-black text-sm rounded-full hover:bg-brand-purple-dark hover:scale-105 active:scale-95 duration-200 transition-all shadow-lg shadow-brand-purple/20 cursor-pointer"
            >
              <span>{lang === 'en' ? 'CONNECT WITH US' : 'संपर्क करें'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
          
        </div>

      </section>

      {/* ── B2B FORM SECTION ── */}
      <section 
        ref={formSectionRef}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20 text-left"
        id="onboarding-form-section"
      >
        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Onboarding Steps */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-brand-border shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-black text-brand-text text-base uppercase tracking-wide">
                  {lang === 'en' ? 'How it works' : 'सॉफ्टवेयर कैसे शुरू करें'}
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0 font-display font-extrabold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-text leading-snug">{t.contactStep1}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-brand-muted mt-0.5 leading-normal">
                      {t.contactStep1Desc}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0 font-display font-extrabold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-text leading-snug">{t.contactStep2}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-brand-muted mt-0.5 leading-normal">
                      {t.contactStep2Desc}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0 font-display font-extrabold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs sm:text-sm text-brand-text leading-snug">{t.contactStep3}</h4>
                    <p className="font-sans text-[11px] sm:text-xs text-brand-muted mt-0.5 leading-normal">
                      {t.contactStep3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice Card */}
            <div className="bg-brand-purple text-white rounded-3xl p-6 border border-brand-purple-dark space-y-3 shadow-md">
              <div className="flex items-center gap-2">
                <Shield className="w-4.5 h-4.5 text-brand-orange shrink-0" />
                <span className="font-display font-black text-[10px] uppercase tracking-wider text-slate-100">
                  {lang === 'en' ? 'Data Security' : 'डेटा की सुरक्षा'}
                </span>
              </div>
              <p className="font-sans text-[11px] text-slate-200 leading-relaxed">
                {lang === 'en'
                  ? "All student records and images are protected. We delete project records automatically once you delete the project."
                  : "छात्रों का डेटा सुरक्षित रखा जाता है। आपके डिलीट करते ही डेटा को पूरी तरह मिटा दिया जाता है।"}
              </p>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-md border border-brand-border">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-purple" />

          {successMsg ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-50 text-green-500 border border-green-200 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-display font-extrabold text-brand-text text-2xl">{lang === 'en' ? 'Onboarding Successful' : 'सफलतापूर्वक प्राप्त हुआ'}</h3>
              <p className="font-sans text-sm text-brand-muted max-w-md mx-auto leading-relaxed">{successMsg}</p>
              <button 
                type="button"
                onClick={() => setSuccessMsg('')}
                className="px-6 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-xs font-bold text-white rounded-xl transition cursor-pointer"
              >
                {lang === 'en' ? 'Submit New Inquiry' : 'नया फॉर्म भरें'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-650 text-xs rounded-xl font-sans font-bold flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ── SECTION 1: IDENTITY ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-border pb-2">
                  <Building className="w-4 h-4 text-brand-purple" />
                  <h3 className="font-display font-black text-xs text-brand-text uppercase tracking-wider">{t.formHeader}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                      {t.formName} <strong className="text-red-500">*</strong>
                    </label>
                    <input 
                      type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                      {t.formBusiness} <strong className="text-red-500">*</strong>
                    </label>
                    <input 
                      type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange}
                      placeholder="e.g. Apex Digital Prints"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                      {t.formPhone} <strong className="text-red-500">*</strong>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted font-mono text-xs">+91</div>
                      <input 
                        type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="98765 43210"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="printerName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                      {t.formHardware}
                    </label>
                    <input 
                      type="text" id="printerName" name="printerName" value={formData.printerName} onChange={handleChange}
                      placeholder="e.g. Fargo HDP5000, Evolis Primacy"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* ── SECTION 2: EXTRA ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-border pb-2">
                  <Mail className="w-4 h-4 text-brand-purple" />
                  <h3 className="font-display font-black text-xs text-brand-text uppercase tracking-wider">{lang === 'en' ? 'Additional Notes' : 'अन्य संदेश'}</h3>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                    {t.formMessage}
                  </label>
                  <textarea 
                    id="message" name="message" value={formData.message} onChange={handleChange} rows={3}
                    placeholder="e.g. Any custom sheet layouts or event cards requirements..."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple text-xs"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" disabled={isLoading}
                  className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-2xl text-xs font-sans font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/20 active:scale-95 duration-100 transition cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>COMPILING DATA...</span>
                    </span>
                  ) : (
                    <>
                      <span>{t.ctaSubmit}</span>
                      <Send className="w-4 h-4 stroke-[2]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
          </div>
        </div>
      </section>

      {/* MAP SECTION — Plot No SC-20 B(D), O Block, Narayan Vihar, Jaipur */}
      <section className="bg-brand-alt border-t border-brand-border py-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left: Map */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-brand-border h-[380px]">
              <iframe
                title="IVY Prints Office Location"
                src="https://maps.google.com/maps?q=26.859941,75.721658&t=m&z=16&output=embed&iwloc=near"
                width="100%"
                height="380"
                className="border-none block"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono font-black text-brand-purple uppercase tracking-[0.2em] block mb-2">{t.footerOffice}</span>
                <h2 className="font-display font-black text-3xl text-brand-text leading-tight">
                  {lang === 'en' ? 'Visit Our Office' : 'जयपुर ऑफिस का पता'}
                </h2>
                <p className="text-brand-muted text-sm mt-2 leading-relaxed">
                  {lang === 'en'
                    ? "Located in Jaipur, Rajasthan. Serving printing plants and vendors across India."
                    : "हमारा ऑफिस जयपुर, राजस्थान में स्थित है। यहाँ से हम पूरे भारत के प्रिंटिंग वेंडर्स की सेवा करते हैं।"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-brand-border flex gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-brand-muted uppercase leading-none mb-1">Jaipur Office Address</h4>
                    <p className="text-xs sm:text-sm font-sans text-brand-text">Plot No SC-20 B(D), O Block, Narayan Vihar, Jaipur, Rajasthan - 302020</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-brand-border flex gap-3">
                  <span className="text-lg">📞</span>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-brand-muted uppercase leading-none mb-1">Phone / WhatsApp</h4>
                    <p className="text-xs sm:text-sm font-sans text-brand-text font-bold">+91 85888 16148</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-brand-border flex gap-3">
                  <span className="text-lg">✉️</span>
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-brand-muted uppercase leading-none mb-1">Email Support</h4>
                    <p className="text-xs sm:text-sm font-sans text-brand-text">sales@ivyprints.in</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
