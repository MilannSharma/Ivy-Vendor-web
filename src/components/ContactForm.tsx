/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { Send, CheckCircle, Smartphone } from 'lucide-react';
import { SuccessIcon } from '@/src/components/ui/animated-state-icons';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    city: '',
    volume: '<500',
    message: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.fullName.trim()) {
      setErrorMsg('Full Name is required');
      return;
    }
    if (!formData.businessName.trim()) {
      setErrorMsg('Business / Print Business name is required');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Phone Number is required');
      return;
    }
    if (!/^\+?[0-9\s]{10,14}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      setErrorMsg('Please enter a valid Indian Phone Number (e.g. 9876543210)');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMsg('City of operation is required');
      return;
    }

    setIsLoading(true);

    // Simulate merchant submission connection
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Thank you, ${formData.fullName}! Your direct inquiry for operating a ${formData.volume} monthly volume node has been verified. One of our specialists will reach out on ${formData.phone} via WhatsApp/Email within 2 hours.`);
      setFormData({
        fullName: '',
        businessName: '',
        phone: '',
        city: '',
        volume: '<500',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xl relative overflow-hidden">
      
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00AEEF] via-[#FFB800] to-cyan-500" />

      {successMsg ? (
        <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 mx-auto flex items-center justify-center">
            <SuccessIcon size={36} className="text-[#10B981]" />
          </div>
          <h3 className="font-display font-extrabold text-[#0A1628] text-xl">Verification Inbound</h3>
          <p className="font-sans text-sm text-[#4A5568] max-w-md mx-auto leading-relaxed">
            {successMsg}
          </p>
          <button 
            type="button"
            onClick={() => setSuccessMsg('')}
            className="px-4.5 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-sans font-bold text-[#0A1628] transition"
          >
            Submit Another Query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4.5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display font-black text-lg text-[#0A1628]">Send B2B Enquiry</h3>
            <p className="font-sans text-xs text-slate-500">Contact Delhi hub directors for bulk vendor pricing tiering.</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-sans font-medium flex items-center gap-2 animate-shake">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
                Full Name <strong className="text-red-500">*</strong>
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
                Business & Print Business Name <strong className="text-red-500">*</strong>
              </label>
              <input 
                type="text" 
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g. Apex Prints & Graphics"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
                Phone Number <strong className="text-red-500">*</strong>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-mono text-xs">
                  +91
                </div>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
                City / Town of Operation <strong className="text-red-500">*</strong>
              </label>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Patna, Ludhiana"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
              Expected Monthly ID Card volume
            </label>
            <select 
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              title="Expected Monthly ID Card volume"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-sans bg-slate-50/50 focus:outline-none focus:border-[#00AEEF]"
            >
              <option value="<500">Less than 500 cards per month</option>
              <option value="500-2000">From 500 to 2,000 cards per month</option>
              <option value="2000-5000">From 2,000 to 5,000 cards per month</option>
              <option value="5000+">Extreme volume (Over 5,000 cards per month)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-[#0A1628] mb-1.5 uppercase">
              Custom Requirements or Questions
            </label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Detail your equipment (e.g., dual hand-fed thermal printer, sheet-fed laminator) or custom pricing questions..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-sans placeholder-slate-400 focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition-all bg-slate-50/50"
            />
          </div>

          <button 
            type="submit"
            id="btn-submit-contact-form"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#00AEEF] hover:bg-[#0096ce] disabled:bg-slate-350 text-white rounded-xl text-sm font-sans font-bold flex items-center justify-center gap-2 shadow-md shadow-[#00AEEF]/20 active:scale-95 duration-100 transition-all cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying credentials with system...</span>
              </span>
            ) : (
              <>
                <span>Secure Send B2B Enquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
}
