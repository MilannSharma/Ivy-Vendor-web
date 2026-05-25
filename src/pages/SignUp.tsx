/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { PageId } from '../types';
import { 
  User, 
  Building, 
  Lock, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  Printer
} from 'lucide-react';

interface SignUpProps {
  onPageChange: (page: PageId) => void;
}

export default function SignUp({ onPageChange }: SignUpProps) {
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    city: '',
    state: 'Delhi',
    shopName: '',
    businessType: 'Print Business',
    volume: '<500',
    source: 'Google Search',
    gstNum: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    whatsappAlerts: true
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // States structures
  const indianStates = [
    'Delhi', 'Maharashtra', 'Karnataka', 'Telangana', 'Tamil Nadu', 
    'West Bengal', 'Rajasthan', 'Gujarat', 'Bihar', 'Madhya Pradesh', 
    'Punjab', 'Haryana', 'Uttar Pradesh'
  ];

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    });
    setErrorMsg('');
  };

  const calculatePasswordStrength = () => {
    const pw = formData.password;
    if (!pw) return { label: 'Empty', color: 'bg-slate-200', width: 'w-0' };
    if (pw.length < 6) return { label: 'Too Short', color: 'bg-red-400', width: 'w-1/3' };
    if (pw.match(/[a-z]/) && pw.match(/[A-Z]/) && pw.match(/[0-9]/) && pw.length >= 8) {
      return { label: 'Strong B2B password', color: 'bg-emerald-500', width: 'w-full' };
    }
    return { label: 'Medium security', color: 'bg-yellow-400', width: 'w-2/3' };
  };

  const handleNextStep = () => {
    setErrorMsg('');
    
    if (step === 1) {
      if (!formData.fullName.trim()) {
        setErrorMsg('Please supply your Full Name.');
        return;
      }
      if (!formData.email.trim()) {
        setErrorMsg('Email Address is required.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrorMsg('Valid email format required (e.g. name@shop.in)');
        return;
      }
      if (!formData.phone.trim()) {
        setErrorMsg('Standard contact Phone number is required.');
        return;
      }
      if (!formData.city.trim()) {
        setErrorMsg('Please list your operational City.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.shopName.trim()) {
        setErrorMsg('Please specify your Business or Print Business Name.');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (step < 3) return;

    // Password validations
    if (!formData.password) {
      setErrorMsg('Please establish a secure login password.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg('Password should be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Confirm Password should match your created password exactly.');
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service & Privacy regulations to sign up.');
      return;
    }

    setIsLoading(true);

    // Simulate merchant onboard node creation
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = 'https://projects-ivy.pages.dev';
    }, 2000);
  };

  const strength = calculatePasswordStrength();

  return (
    <div className="pt-20 bg-slate-50 min-h-screen flex items-center justify-center p-4">
      
      {/* Onboarding Box */}
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-250 shadow-2xl overflow-hidden p-6 md:p-8 text-left">
        
        {/* Progress header bar */}
        <div className="mb-8 font-sans">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-3 uppercase">
            <span>Progress: Onboarding</span>
            <span className="text-[#00AEEF]">Step {step} of 3</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 h-2">
            <div className={`rounded ${step >= 1 ? 'bg-[#00AEEF]' : 'bg-slate-100'}`} />
            <div className={`rounded ${step >= 2 ? 'bg-[#00AEEF]' : 'bg-slate-100'}`} />
            <div className={`rounded ${step >= 3 ? 'bg-[#00AEEF]' : 'bg-slate-100'}`} />
          </div>
        </div>

        {/* Action Header */}
        <div className="mb-6">
          <h2 className="font-display font-black text-xl text-[#0A1628] uppercase">
            {step === 1 && 'Step 1 — Personal Details'}
            {step === 2 && 'Step 2 — Business Credentials'}
            {step === 3 && 'Step 3 — Establish Password'}
          </h2>
          <p className="font-sans text-xs text-slate-500 mt-1">
            {step === 1 && 'Provide operators direct contact coordinates.'}
            {step === 2 && 'Let us customize catalog presets layout structures based on volume.'}
            {step === 3 && 'Encrypt your login node settings.'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-sans font-medium flex items-center gap-2 mb-4 animate-shake">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* STEP 1: PERSONAL DETAILS */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleTextChange}
                    placeholder="e.g. Anand Deshmukh"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    placeholder="owner@shop.in"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Primary Phone *</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleTextChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">WhatsApp number (if different)</label>
                  <input 
                    type="text" 
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleTextChange}
                    placeholder="9876543210 (Leave blank if same)"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Operational City *</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleTextChange}
                    placeholder="e.g. Pune, Indore"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">State Territory</label>
                  <select 
                    name="state"
                    value={formData.state}
                    onChange={handleTextChange}
                    title="State Territory"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  >
                    {indianStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BUSINESS DETAILS */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Business / Print Business Name *</label>
                  <input 
                    type="text" 
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleTextChange}
                    placeholder="e.g. Sri Balaji Digital Press"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Business Type Profile</label>
                  <select 
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleTextChange}
                    title="Business Type Profile"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  >
                    <option value="Print Shop">Offset Print Business / Press Desk</option>
                    <option value="Vendor">Freelance B2B Broker / Vendor</option>
                    <option value="Freelancer">Independent Graphic Freelancer</option>
                    <option value="Other">Corporate Admin / Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Monthly ID pass Volume</label>
                  <select 
                    name="volume"
                    value={formData.volume}
                    onChange={handleTextChange}
                    title="Monthly ID pass Volume"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  >
                    <option value="<500">Less than 500 cards</option>
                    <option value="500-2000">From 500 to 2,000 cards</option>
                    <option value="2000-5000">From 2,000 to 5,000 cards</option>
                    <option value="5000+">Extreme volume (Over 5k cards)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">How did you discover us?</label>
                  <select 
                    name="source"
                    value={formData.source}
                    onChange={handleTextChange}
                    title="How did you discover us?"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  >
                    <option value="Google Search">Google Search engine</option>
                    <option value="WhatsApp Group">WhatsApp merchant alliance</option>
                    <option value="Recommendation">Referral from co-vendor</option>
                    <option value="LinkedIn">Social media / LinkedIn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Merchant GST ID number (Optional)</label>
                <input 
                  type="text" 
                  name="gstNum"
                  value={formData.gstNum}
                  onChange={handleTextChange}
                  placeholder="e.g. 07AAAAA1111A1Z1"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55 uppercase placeholder:lowercase"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PASSWORD & CONFIRMATION */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Create Password *</label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleTextChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">Confirm Password *</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleTextChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#00AEEF] bg-slate-55"
                  />
                </div>
              </div>

              {/* Password strength visual meter */}
              {formData.password && (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>STRENGTH:</span>
                    <strong className="text-slate-700">{strength.label}</strong>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-305 ${strength.color} ${strength.width}`} />
                  </div>
                </div>
              )}

              {/* Consent check boxes */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer text-xs leading-normal">
                  <input 
                    type="checkbox" 
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={() => setFormData({ ...formData, agreeTerms: !formData.agreeTerms })}
                    className="rounded text-[#00AEEF] mt-0.5"
                  />
                  <span className="text-slate-500">
                    I agree to the IVY Prints B2B operations <span className="text-[#00AEEF] font-bold underline cursor-pointer" onClick={() => onPageChange('terms-of-service')}>Terms of Service</span> and <span className="text-[#00AEEF] font-bold underline cursor-pointer" onClick={() => onPageChange('privacy-policy')}>Privacy Policy</span>.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-xs leading-normal">
                  <input 
                    type="checkbox" 
                    name="whatsappAlerts"
                    checked={formData.whatsappAlerts}
                    onChange={() => setFormData({ ...formData, whatsappAlerts: !formData.whatsappAlerts })}
                    className="rounded text-[#00AEEF] mt-0.5"
                  />
                  <span className="text-slate-500">
                    Send me security alert credentials and queue updates via legal WhatsApp automated SMS.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Action buttons panel */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            
            {/* Prev button */}
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-3 border border-slate-250 hover:bg-slate-50 rounded-xl text-xs font-sans font-bold text-[#0A1628] flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onPageChange('signin')}
                className="text-xs font-mono font-bold text-slate-400 hover:text-slate-800"
              >
                ALREADY ENROLLED? SIGN IN
              </button>
            )}

            {/* Next or Submit Button */}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-[#00AEEF] hover:bg-[#0096ce] text-white rounded-xl text-xs font-sans font-black flex items-center gap-1 shadow-md shadow-[#00AEEF]/10 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                id="onboard-submit-btn"
                disabled={isLoading}
                className="px-8 py-3.5 bg-[#00AEEF] hover:bg-[#0096ce] disabled:bg-slate-350 text-white rounded-xl text-xs font-sans font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Deploying security keys...</span>
                  </span>
                ) : (
                  <>
                    <span>Create B2B Merchant Node</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

          </div>

        </form>

        <p className="font-sans text-[10px] text-slate-400 mt-6 text-center">
          In proceeding, you authorize IVY Prints to initialize automated pre-press servers on your behalf. Standard SLA limits apply.
        </p>

      </div>

    </div>
  );
}
