/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { 
  Check, 
  ArrowRight, 
  CheckCircle2,
  Home as HomeIcon
} from 'lucide-react';

interface SignUpProps {
  onPageChange: (page: PageId) => void;
  lang: Lang;
}

export default function SignUp({ onPageChange, lang }: SignUpProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    shopName: '',
    printerName: '',
    password: '',
    agreeTerms: true
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
    setErrorMsg('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg(lang === 'en' ? 'Full Name is required.' : 'कृपया अपना नाम भरें।');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg(lang === 'en' ? 'Email is required.' : 'कृपया ईमेल भरें।');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg(lang === 'en' ? 'Valid 10-digit mobile number is required.' : 'सही १०-अंकीय मोबाइल नंबर भरें।');
      return;
    }
    if (!formData.shopName.trim()) {
      setErrorMsg(lang === 'en' ? 'Print Shop Name is required.' : 'कृपया अपनी दुकान या फैक्टरी का नाम भरें।');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMsg(lang === 'en' ? 'Password must be at least 6 characters.' : 'पासवर्ड कम से कम ६ अक्षरों का होना चाहिए।');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  return (
    <div className="pt-20 bg-brand-bg min-h-screen flex items-center justify-center p-4 text-left select-none">
      
      {/* Onboarding Box */}
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-brand-border shadow-lg p-6 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-purple" />

        <div className="mb-6">
          <h2 className="font-display font-black text-2xl text-brand-text uppercase">
            {lang === 'en' ? 'Register Printing Factory' : 'प्रिंटिंग फैक्टरी रजिस्टर करें'}
          </h2>
          <p className="font-sans text-xs text-brand-muted mt-1">
            {lang === 'en' 
              ? 'Start from today with zero setup fees. Enter details below.'
              : 'बिना किसी सेटअप फीस के आज ही शुरू करें। अपनी जानकारी भरें।'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-sans font-bold flex items-center gap-2 mb-4 animate-shake">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">{t.formName} *</label>
              <input 
                type="text" 
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleTextChange}
                placeholder="e.g. Anand Patel"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">{t.formEmail} *</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                placeholder="owner@printshop.in"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">{t.formPhone} *</label>
              <input 
                type="text" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleTextChange}
                placeholder="9876543210"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
              />
            </div>
            <div>
              <label htmlFor="shopName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">{t.formBusiness} *</label>
              <input 
                type="text" 
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleTextChange}
                placeholder="e.g. Balaji Digital Prints"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="printerName" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">{t.formHardware}</label>
              <input 
                type="text" 
                id="printerName"
                name="printerName"
                value={formData.printerName}
                onChange={handleTextChange}
                placeholder="e.g. Fargo HDP5000"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">{lang === 'en' ? 'Create Password *' : 'पासवर्ड बनाएं *'}</label>
              <input 
                type="password" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleTextChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs leading-normal">
              <input 
                type="checkbox" 
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleTextChange}
                className="rounded border-brand-border text-brand-purple focus:ring-brand-purple"
              />
              <span className="text-brand-muted">
                {lang === 'en' 
                  ? 'I agree to the Terms of Service and Privacy Policy.' 
                  : 'मैं सॉफ्टवेयर के नियमों और सेवा शर्तों से सहमत हूँ।'}
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onPageChange('signin')}
              className="text-xs font-sans font-bold text-brand-purple hover:underline"
            >
              {lang === 'en' ? 'ALREADY REGISTERED? SIGN IN' : 'पहले से अकाउंट है? लॉगिन करें'}
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl text-xs font-sans font-black flex items-center gap-1.5 shadow-lg active:scale-95 duration-100 cursor-pointer"
            >
              {isLoading ? (
                <span>Registering...</span>
              ) : (
                <>
                  <span>{lang === 'en' ? 'Register Now' : 'रजिस्टर करें'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-brand-text/60 backdrop-blur-md"
            onClick={() => { setShowSuccess(false); onPageChange('home'); }}
          />
          <div className="relative bg-white rounded-3xl border border-brand-border shadow-2xl p-8 max-w-md w-full text-center z-10 flex flex-col items-center">
            
            <div className="relative mb-6 mt-2">
              <div className="relative w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
            </div>
            
            <h3 className="text-2xl font-display font-black text-brand-text uppercase">
              {lang === 'en' ? 'Registered Successfully!' : 'सफलतापूर्वक रजिस्टर हुआ!'}
            </h3>
            
            <p className="font-sans text-sm text-brand-muted mt-3 mb-6 leading-relaxed">
              {lang === 'en' 
                ? 'Your account has been created. Our team will contact you to set up your print catalog.'
                : 'आपका अकाउंट बन गया है। हमारी टीम जल्द ही आपसे संपर्क करके सेटअप में मदद करेगी।'}
            </p>
            
            <button
              type="button"
              onClick={() => { setShowSuccess(false); onPageChange('home'); }}
              className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl text-xs font-sans font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <HomeIcon className="w-4 h-4" />
              <span>{lang === 'en' ? 'Go to Homepage' : 'होमपेज पर जाएं'}</span>
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
}
