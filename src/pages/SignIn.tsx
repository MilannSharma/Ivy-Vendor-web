/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { PageId } from '../types';
import { 
  Lock, 
  Mail, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Printer
} from 'lucide-react';

interface SignInProps {
  onPageChange: (page: PageId) => void;
}

export default function SignIn({ onPageChange }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validations
    if (!email.trim()) {
      setErrorMsg('Please enter your B2B merchant email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Please enter a valid email format (e.g. name@business.in)');
      return;
    }
    if (!password) {
      setErrorMsg('Password cannot be left blank.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Simulate login redirect to production panel projects-ivy.pages.dev
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = 'https://projects-ivy.pages.dev';
    }, 1800);
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen flex items-center justify-center p-4">
      
      {/* Centered Main Panel Card with 3D Depth */}
      <div className="w-full max-w-4xl bg-white rounded-2xl border border-slate-250 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
        
        {/* Left Side: Decorative & Trust Building (Desktop only) */}
        <div className="hidden md:flex md:col-span-5 bg-[#0A1628] text-white p-8 flex-col justify-between relative overflow-hidden text-left">
          {/* Visual gradient node overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#00AEEF]/20 rounded-full filter blur-2xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#00AEEF] flex items-center justify-center">
                <Printer className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-display font-extrabold text-sm tracking-tight">IVY Prints</span>
            </div>
            
            <h3 className="font-display font-black text-xl leading-snug pt-4">
              Welcome Back.<br />Let's Print Smarter.
            </h3>
            <p className="font-sans text-xs text-slate-350 leading-relaxed">
              Sign in to your IVY Prints B2B Vendor dashboard to manage bulk print projects, or register a new merchant node.
            </p>
          </div>

          <div className="space-y-3 relative z-10 pt-8 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs font-sans">
              <CheckCircle2 className="w-4 h-4 text-[#00AEEF]" />
              <span>Secure Encrypted Login Node</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans">
              <CheckCircle2 className="w-4 h-4 text-[#00AEEF]" />
              <span>Full compliance with Local Laws</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-sans">
              <CheckCircle2 className="w-4 h-4 text-[#00AEEF]" />
              <span>99.8% Cloud Compilation Speed</span>
            </div>
          </div>

          <div className="text-[9px] font-mono text-slate-500 uppercase">
            Platform ID: IVY-PREPRESS-PROD
          </div>
        </div>

        {/* Right Side: Sign In Form panel */}
        <div className="col-span-1 md:col-span-7 p-6 md:p-10 flex flex-col justify-center text-left">
          
          <div className="mb-6">
            <h2 className="font-display font-black text-2xl text-[#0A1628]">Merchant Sign In</h2>
            <p className="font-sans text-xs text-slate-500">Access your active printing projects.</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-sans font-medium flex items-center gap-2 mb-4 animate-shake">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignInSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
                Email Address
              </label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                  placeholder="name@printbusiness.in"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-650"
                  title="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-650 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded border-slate-300 text-[#00AEEF] focus:ring-[#00AEEF]"
                />
                <span>Remember me</span>
              </label>

              <button 
                type="button"
                onClick={() => setErrorMsg('Reset instruction link dispatched to secure backup phone coordinates.')}
                className="text-[#00AEEF] font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit"
              id="btn-login-submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#00AEEF] hover:bg-[#0096ce] disabled:bg-slate-300 text-white rounded-xl text-sm font-sans font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 duration-100 cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Redirecting to projects-ivy.pages.dev ...</span>
                </span>
              ) : (
                <>
                  <span>Sign In & Load Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative my-6 text-center text-xs">
            <span className="bg-white px-3 relative z-10 font-mono text-slate-400">OR CONTINUE WITH</span>
            <div className="absolute top-[9px] left-0 w-full h-[1px] bg-slate-200" />
          </div>

          <button 
            type="button"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                window.location.href = 'https://projects-ivy.pages.dev';
              }, 1200);
            }}
            className="w-full py-3 border border-slate-200 rounded-xl text-xs font-sans font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Sign In with Google</span>
          </button>

          <p className="font-sans text-xs text-slate-500 text-center mt-6">
            Don't have a merchant account?{' '}
            <button 
              onClick={() => onPageChange('signup')}
              className="text-[#00AEEF] font-bold hover:underline"
            >
              Register here
            </button>
          </p>

        </div>

      </div>

    </div>
  );
}
