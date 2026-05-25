/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { PageId } from '../types';
import { 
  Mail, 
  Send,
  CheckCircle,
  ArrowRight,
  Zap,
  Building,
  Check,
  Shield
} from 'lucide-react';

interface ContactProps {
  onPageChange: (page: PageId) => void;
}

export default function Contact({ onPageChange }: ContactProps) {
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    customHardware: '',
    message: ''
  });
  
  const [printingTech, setPrintingTech] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleTechToggle = (tech: string) => {
    setPrintingTech(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) { setErrorMsg('Full Name is required'); return; }
    if (!formData.businessName.trim()) { setErrorMsg('Print Business / Company Name is required'); return; }
    if (!formData.phone.trim()) { setErrorMsg('Phone Number is required'); return; }
    if (!/^\+?[0-9\s]{10,14}$/.test(formData.phone.replace(/[-\s]/g, ''))) { setErrorMsg('Please enter a valid Phone Number'); return; }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) { setErrorMsg('Please enter a valid Email Address'); return; }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Thank you, ${formData.fullName}! Your IVY Prints B2B registration has been received. Our integration team will reach out via ${formData.phone} within 2 hours.`);
      setFormData({ 
        fullName: '', 
        email: '',
        phone: '', 
        businessName: '', 
        customHardware: '',
        message: '' 
      });
      setPrintingTech([]);
    }, 1500);
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const techOptions = [
    "Thermal Card Printers (Zebra, Fargo, Evolis, etc.)",
    "High-Speed Laser/Offset Presses (HP Indigo, Konica Minolta)",
    "Inkjet Direct Badge Systems (Epson, Canon)",
    "Outsourced / Partner Printing"
  ];

  return (
    <div id="contact-page" className="bg-[#F8FAFC] text-[#0A1628] min-h-screen font-sans overflow-x-hidden pt-16">
      
      {/* ── CINEMATIC LIGHT HERO SECTION ── */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-br from-[#EAF6FF] via-[#FFFFFF] to-[#FFF8E7] overflow-hidden border-b border-slate-200/60">
        
        {/* Subtle decorative grid backdrop */}
        <div className="absolute inset-0 opacity-[0.4] bg-grid-lines-40 pointer-events-none" />
        
        {/* Soft color ambient blur backdrops */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-200/30 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-100/40 rounded-full filter blur-[100px] pointer-events-none" />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 select-none">
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-[#0A1628] leading-tight max-w-4xl mx-auto">
            Start Your Journey With<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#0A1628]">AI-Featured Printing Software.</span>
          </h1>
          
          {/* Description */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-650 max-w-2xl leading-relaxed mx-auto">
            IVY Prints is India's leading B2B pre-press automation platform for bulk ID card production. We help print vendors, school photographers, and corporate agencies eliminate manual alignment bottlenecks with AI-driven face cropping, automated roster validation, and rapid 10k+ PDF imposition exports.
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00AEEF] text-white font-sans font-black text-xs rounded-full hover:bg-[#0096ce] hover:scale-105 active:scale-95 duration-200 transition-all shadow-lg shadow-[#00AEEF]/20 cursor-pointer"
            >
              <span>CONNECT WITH US</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
          
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
          <span className="text-[8px] font-mono text-slate-450 uppercase tracking-[0.25em]">SCROLL TO EXPLORE</span>
          <div className="w-[1px] h-10 bg-slate-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00AEEF] animate-scroll-line" />
          </div>
        </div>

      </section>

      {/* ── B2B FORM SECTION ── */}
      <section 
        ref={formSectionRef}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20"
        id="onboarding-form-section"
      >
        {/* Form Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-[#00AEEF] uppercase tracking-wider block">B2B PARTNERSHIP</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0A1628] tracking-tight">
            Join the IVY Prints B2B Network
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-500">
            Apply to integrate your print business with the IVY Prints Dispatcher system. Reduce manual prepress labor and automate bulk student database validation.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Onboarding Steps */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-md space-y-6">
              <div>
                <h3 className="font-display font-black text-[#0A1628] text-base uppercase tracking-wide">
                  Onboarding Steps
                </h3>
                <p className="font-sans text-[11px] text-slate-500 leading-normal mt-1">
                  What happens after you submit your B2B onboarding registration details:
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF6FF] text-[#00AEEF] flex items-center justify-center shrink-0 font-display font-extrabold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-[#0A1628] leading-snug">Sign Up Today</h4>
                    <p className="font-sans text-[11px] text-slate-500 mt-0.5 leading-normal">
                      Start from today only with zero setup friction. Just submit your details to provision your instant pre-press sandbox account.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-display font-extrabold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-[#0A1628] leading-snug">Get Customized Plan</h4>
                    <p className="font-sans text-[11px] text-slate-500 mt-0.5 leading-normal">
                      Get custom volume‑tier pricing adjusted specifically for your card production capacity and hardware setup.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-display font-extrabold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-[#0A1628] leading-snug">Double Your Profit</h4>
                    <p className="font-sans text-[11px] text-slate-500 mt-0.5 leading-normal">
                      Achieve double profit with minimum investment by eliminating manual alignment time and photo resizing labor completely.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice Card */}
            <div className="bg-[#0A1628] text-white rounded-3xl p-6 border border-slate-800 space-y-3.5 shadow-lg">
              <div className="flex items-center gap-2">
                <Shield className="w-4.5 h-4.5 text-[#00AEEF] shrink-0" />
                <span className="font-display font-black text-[10px] uppercase tracking-wider text-slate-200">
                  Enterprise-Grade Security
                </span>
              </div>
              <p className="font-sans text-[11px] text-slate-400 leading-normal">
                Student records and high-resolution biometric images are protected using localized database isolation, SSL encryption, and strict GDPR-compliant retention policies.
              </p>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-xl border border-slate-200/80">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00AEEF] to-[#0A1628]" />

          {successMsg ? (
            <div className="text-center py-12 space-y-6 animate-fade-in" aria-live="polite">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#10B981] border border-emerald-250 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-display font-extrabold text-[#0A1628] text-2xl">Onboarding Successful</h3>
              <p className="font-sans text-sm text-slate-650 max-w-md mx-auto leading-relaxed">{successMsg}</p>
              <button 
                type="button"
                onClick={() => setSuccessMsg('')}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-white rounded-lg transition cursor-pointer"
              >
                Submit New Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-650 text-xs rounded-xl font-sans font-medium flex items-center gap-2" role="alert">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ── SECTION 1: BUSINESS & CONTACT IDENTITY ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Building className="w-4 h-4 text-[#00AEEF]" />
                  <h3 className="font-display font-bold text-xs text-[#0A1628] uppercase tracking-wider">Business & Contact Identity</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase">
                      Full Name <strong className="text-red-500">*</strong>
                    </label>
                    <input 
                      type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange}
                      placeholder="Rajesh Kumar"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0A1628] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition duration-205 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase">
                      Print Business / Company Name <strong className="text-red-500">*</strong>
                    </label>
                    <input 
                      type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange}
                      placeholder="Apex Digital Prints"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0A1628] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition duration-205 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase">
                      Email Address <strong className="text-red-500">*</strong>
                    </label>
                    <input 
                      type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="rajesh@apexprints.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0A1628] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition duration-205 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase">
                      Mobile Number <strong className="text-red-500">*</strong>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-455 font-mono text-xs">+91</div>
                      <input 
                        type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="98765 43210"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0A1628] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition duration-205 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SECTION 2: HARDWARE SPECIFICATIONS ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Zap className="w-4 h-4 text-[#FFB800]" />
                  <h3 className="font-display font-bold text-xs text-[#0A1628] uppercase tracking-wider">In-House Printing Hardware & Technology</h3>
                </div>

                {/* Printing Technology Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {techOptions.map((tech) => {
                    const isSelected = printingTech.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => handleTechToggle(tech)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition duration-200 cursor-pointer ${
                          isSelected 
                            ? 'border-[#00AEEF] bg-[#EAF6FF] text-[#00AEEF] font-bold shadow-sm shadow-[#00AEEF]/5' 
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50/55'
                        }`}
                      >
                        <span className="leading-snug pr-2">{tech}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-all ${
                          isSelected ? 'border-[#00AEEF] bg-[#00AEEF] text-white' : 'border-slate-350 bg-transparent'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom/Type-in Hardware Input */}
                <div>
                  <label htmlFor="customHardware" className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase">
                    Other Hardware (Type here if not listed)
                  </label>
                  <input 
                    type="text" id="customHardware" name="customHardware" value={formData.customHardware} onChange={handleChange}
                    placeholder="e.g. Fargo HDP5000, HP Indigo 7K, Evolis Primacy..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0A1628] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition duration-205 text-xs"
                  />
                </div>
              </div>

              {/* ── SECTION 3: EXTRA REQUIREMENTS ── */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  <h3 className="font-display font-bold text-xs text-[#0A1628] uppercase tracking-wider">Extra Requirements</h3>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 uppercase">
                    Message / Custom Request Notes
                  </label>
                  <textarea 
                    id="message" name="message" value={formData.message} onChange={handleChange} rows={3}
                    placeholder="Describe any special layouts, school ERP integrations, or custom requirements..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-[#0A1628] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] transition duration-205 text-xs"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit" id="btn-submit-contact-form" disabled={isLoading}
                  className="w-full py-3.5 bg-[#00AEEF] hover:bg-[#0096ce] disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-2xl text-xs font-sans font-black flex items-center justify-center gap-2 shadow-lg shadow-[#00AEEF]/10 active:scale-95 duration-100 transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>COMPILING B2B DEVIATIONS...</span>
                    </span>
                  ) : (
                    <>
                      <span>START PRINTING</span>
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

      {/* MAP SECTION — before Footer */}
      <section className="bg-[#060D1F] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left: 3D Interactive Map */}
            <div className="relative group">
              {/* Glow rim */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00AEEF]/30 to-[#FFB800]/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

              {/* Map Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 contact-map-card">
                {/* Map iframe — fully interactive (drag, zoom, pan) */}
                <div className="relative transition-transform duration-500 ease-out group-hover:scale-[1.01] h-[380px]">
                  <iframe
                    title="IVY Prints Office Location"
                    src="https://maps.google.com/maps?q=26.859941,75.721658&t=m&z=16&output=embed&iwloc=near"
                    width="100%"
                    height="380"
                    className="border-none block contact-map-iframe"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Dark overlay for cinematic tone — only on edges */}
                  <div className="absolute inset-0 pointer-events-none rounded-2xl contact-map-overlay" />
                </div>

                {/* Bottom bar with open-in-maps button */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060D1F]/95 to-transparent px-5 pb-4 pt-12 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-mono font-bold text-[#00AEEF] uppercase tracking-widest mb-1">📍 Office Location</p>
                    <p className="text-xs text-white/80 font-sans leading-snug max-w-xs">
                      Plot No SC-20 B(D), O Block,<br />Narayan Vihar, Jaipur – 302020
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=26.859941,75.721658"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 ml-4 flex items-center gap-2 px-4 py-2 bg-[#00AEEF] hover:bg-[#0096ce] text-white text-[11px] font-mono font-black uppercase tracking-wider rounded-lg transition-all duration-200 shadow-lg shadow-[#00AEEF]/30 hover:scale-105 active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-8 text-white">
              <div>
                <span className="text-[10px] font-mono font-black text-[#00AEEF] uppercase tracking-[0.3em] block mb-3">Find Us</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-4">
                  Visit Our Office<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#FFB800]">in Jaipur, Rajasthan</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Based in Narayan Vihar, Jaipur — serving print vendors and ID card agencies across India.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: '📍',
                    label: 'Address',
                    value: 'Plot No SC-20 B(D), O Block, Narayan Vihar, Jaipur, Rajasthan – 302020',
                  },
                  {
                    icon: '📞',
                    label: 'Phone / WhatsApp',
                    value: '+91 8588816148',
                  },
                  {
                    icon: '✉️',
                    label: 'Email Support',
                    value: 'sales@ivyprints.in',
                  },
                  {
                    icon: '🕘',
                    label: 'Working Hours',
                    value: 'Mon – Sat: 9:00 AM – 7:00 PM IST',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl border border-white/8 bg-white/4 hover:border-[#00AEEF]/40 hover:bg-white/6 transition-all duration-200">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-sm text-slate-200 font-sans leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* App Store Buttons */}
              <div>
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">Download the App</p>
                <div className="flex flex-wrap gap-3">
                  {/* Google Play Store */}
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-white/6 hover:bg-white/10 border border-white/10 hover:border-[#00AEEF]/40 rounded-xl transition-all duration-200 group/btn hover:scale-105 active:scale-95"
                  >
                    {/* Play Store icon */}
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M3.18 1.12C2.46 1.53 2 2.28 2 3.17v17.66c0 .89.46 1.64 1.18 2.05l.09.05 9.89-9.89v-.23L3.27 1.07l-.09.05z" fill="#4285F4"/>
                      <path d="M16.46 15.41l-3.3-3.3v-.23l3.3-3.3.07.04 3.91 2.22c1.12.63 1.12 1.67 0 2.31l-3.91 2.22-.07.04z" fill="#FBBC05"/>
                      <path d="M16.53 15.37L13.16 12 3.18 21.88c.37.39.98.44 1.66.05l11.69-6.56" fill="#EA4335"/>
                      <path d="M16.53 8.63L4.84 2.07C4.16 1.68 3.55 1.73 3.18 2.12L13.16 12l3.37-3.37z" fill="#34A853"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider leading-none mb-0.5">GET IT ON</p>
                      <p className="text-sm font-bold text-white leading-none">Google Play</p>
                    </div>
                  </a>

                  {/* Apple App Store */}
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-white/6 hover:bg-white/10 border border-white/10 hover:border-[#00AEEF]/40 rounded-xl transition-all duration-200 group/btn hover:scale-105 active:scale-95"
                  >
                    {/* Apple icon */}
                    <svg className="w-6 h-6 shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider leading-none mb-0.5">DOWNLOAD ON THE</p>
                      <p className="text-sm font-bold text-white leading-none">App Store</p>
                    </div>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
