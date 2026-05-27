/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Printer
} from 'lucide-react';

interface SignInProps {
  onPageChange: (page: PageId) => void;
  lang: Lang;
}

export default function SignIn({ onPageChange, lang }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = translations[lang];

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg(lang === 'en' ? 'Please enter your email.' : 'कृपया अपनी ईमेल आईडी भरें।');
      return;
    }
    if (!password) {
      setErrorMsg(lang === 'en' ? 'Please enter your password.' : 'कृपया अपना पासवर्ड भरें।');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = 'https://projects-ivy.pages.dev';
    }, 1200);
  };

  return (
    <div className="pt-20 bg-brand-bg min-h-screen flex items-center justify-center p-4 select-none text-left">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-brand-border shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        
        {/* Left Side (Desktop only) */}
        <div className="hidden md:flex md:col-span-5 bg-brand-text text-white p-8 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-purple/20 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white font-display font-black text-lg">
                I
              </div>
              <span className="font-display font-black text-sm tracking-tight">IVY Prints</span>
            </div>
            
            <h3 className="font-display font-black text-xl leading-snug pt-4 uppercase">
              {lang === 'en' ? "Welcome Back. Let's Print." : "स्वागत है। छपाई शुरू करें।"}
            </h3>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              {lang === 'en'
                ? "Sign in to manage bulk print projects and download sheet PDFs."
                : "अपने पुराने प्रोजेक्ट्स देखने और शीट डाउनलोड करने के लिए लॉगिन करें।"}
            </p>
          </div>

          <div className="text-[9px] font-mono text-slate-400">
            SECURE B2B MERCHANT NODE
          </div>
        </div>

        {/* Right Side: Sign In Form */}
        <div className="col-span-1 md:col-span-7 p-6 md:p-10 flex flex-col justify-center">
          
          <div className="mb-6">
            <h2 className="font-display font-black text-2xl text-brand-text uppercase">{t.navSignIn}</h2>
            <p className="font-sans text-xs text-brand-muted">{lang === 'en' ? 'Access your printing workspace' : 'अपने प्रिंटिंग अकाउंट में जाएं'}</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-sans font-bold flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                {t.formEmail}
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                  placeholder="name@printbusiness.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
                />
                <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-mono font-bold text-brand-muted mb-1.5 uppercase">
                {lang === 'en' ? 'Password' : 'पासवर्ड'}
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-brand-border bg-brand-bg text-brand-text text-xs placeholder-brand-muted/50 focus:outline-none focus:border-brand-purple"
                />
                <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-brand-muted hover:text-brand-text"
                  title="Toggle Password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-brand-muted cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-brand-border text-brand-purple focus:ring-brand-purple"
                />
                <span>{lang === 'en' ? 'Remember me' : 'लॉगिन याद रखें'}</span>
              </label>

              <button 
                type="button"
                onClick={() => setErrorMsg(lang === 'en' ? 'Reset link sent to registered mobile.' : 'पासवर्ड रीसेट लिंक मोबाइल नंबर पर भेजा गया।')}
                className="text-brand-purple font-bold hover:underline"
              >
                {lang === 'en' ? 'Forgot Password?' : 'पासवर्ड भूल गए?'}
              </button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-brand-purple hover:bg-brand-purple-dark text-white rounded-xl text-xs font-sans font-black flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/20 active:scale-95 duration-100 cursor-pointer"
            >
              {isLoading ? (
                <span>Redirecting...</span>
              ) : (
                <>
                  <span>{lang === 'en' ? 'Sign In & Load Dashboard' : 'लॉगिन करें और डैशबोर्ड खोलें'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="font-sans text-xs text-brand-muted text-center mt-6">
            {lang === 'en' ? "Don't have an account?" : "अकाउंट नहीं है?"}{' '}
            <button 
              onClick={() => onPageChange('signup')}
              className="text-brand-purple font-bold hover:underline"
            >
              {lang === 'en' ? 'Register here' : 'यहाँ नया अकाउंट बनाएं'}
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}
