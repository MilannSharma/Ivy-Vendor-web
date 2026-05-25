/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { 
  ShieldCheck, 
  Scale, 
  Coins, 
  ArrowLeft,
  ChevronRight,
  ArrowUp
} from 'lucide-react';

interface LegalPagesProps {
  section: 'privacy-policy' | 'terms-of-service' | 'refund-policy';
  onPageChange: (page: PageId) => void;
}

export default function LegalPages({ section, onPageChange }: LegalPagesProps) {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="legal-pages-container" className="pt-20 bg-white min-h-screen text-left pb-20 font-sans">
      
      {/* Sticky last updated indicator */}
      <div className="bg-slate-50 border-b border-slate-150 py-10 text-center relative">
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative">
          <span className="bg-yellow-100 text-yellow-850 hover:bg-yellow-200 text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-yellow-200">
            Last Updated: Jan 20, 2026
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#0A1628] uppercase tracking-tight">
            {section === 'privacy-policy' && 'Privacy Policy'}
            {section === 'terms-of-service' && 'Terms & Conditions'}
            {section === 'refund-policy' && 'Refund & Cancellation Policy'}
          </h1>
          <p className="text-xs text-slate-400">
            Official operational directives governing the IVY Prints B2B merchant SaaS database.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Quick Nav sidebar for legal policies */}
        <div className="md:col-span-1">
          <div className="sticky top-28 bg-slate-50 p-4 border border-slate-200/80 rounded-xl space-y-2">
            <span className="font-mono text-[9px] text-[#0A1628] uppercase font-bold tracking-widest block pb-1.5 border-b mb-2">Policies catalog</span>
            
            <button
              onClick={() => onPageChange('privacy-policy')}
              className={`w-full text-left py-1.5 px-2.5 rounded text-xs font-sans font-extrabold flex items-center justify-between ${
                section === 'privacy-policy' ? 'text-[#00AEEF] font-bold bg-white shadow-sm' : 'text-slate-650'
              }`}
            >
              <span>Privacy Policy</span>
              <ChevronRight className="w-3" />
            </button>

            <button
              onClick={() => onPageChange('terms-of-service')}
              className={`w-full text-left py-1.5 px-2.5 rounded text-xs font-sans font-extrabold flex items-center justify-between ${
                section === 'terms-of-service' ? 'text-[#00AEEF] font-bold bg-white shadow-sm' : 'text-slate-650'
              }`}
            >
              <span>Terms of Service</span>
              <ChevronRight className="w-3" />
            </button>

            <button
              onClick={() => onPageChange('refund-policy')}
              className={`w-full text-left py-1.5 px-2.5 rounded text-xs font-sans font-extrabold flex items-center justify-between ${
                section === 'refund-policy' ? 'text-[#00AEEF] font-bold bg-white shadow-sm' : 'text-slate-650'
              }`}
            >
              <span>Refund Policy</span>
              <ChevronRight className="w-3" />
            </button>
          </div>
        </div>

        {/* Content Segment */}
        <div className="md:col-span-3 prose prose-slate max-w-none text-slate-600 leading-relaxed text-xs sm:text-sm space-y-6">
          
          {/* PRIVACY POLICY */}
          {section === 'privacy-policy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-850 p-4 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-600" />
                <span className="font-sans text-xs">
                  We verify that no student biometric identification or school record datasets are processed or sold to marketing groups under Indian security regulations.
                </span>
              </div>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">1. Information We Collect</h3>
                <p>
                  IVY Prints collects standard institutional identification information solely inside the pre-press process. This includes student names, roll numbers, school directories, photographs, and optional custom metadata submitted by operating merchants (such as Bus Routes or blood groups).
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">2. How We Use Your Information</h3>
                <p>
                  Any information uploaded is accessed exclusively for executing automated crop guides, background replacements and dual-sided layout sheet rendering in our compiled high resolution PDF systems. We do not inspect personal photographs for telemetry tracking or behavioral training.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">3. Data Storage & Security</h3>
                <p>
                  We compile assets using bank-grade 256-bit encryption pipelines. Customer lists and raw portrait photos are archived on secure cloud servers and automatically purged upon B2B merchant request or 30 days after dataset delivery batches.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">4. Sharing of Data</h3>
                <p>
                  Student datasets are never shared with third party networks. Only designated operators specified under the merchant master account have administrative review permission parameters.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">5. Cookies Policy</h3>
                <p>
                  We utilize lightweight local storage session cookies to preserve active project settings, login details, and template history caches within the browser tab, preventing repetitive page loadings.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">6. User Rights & Data Deletion</h3>
                <p>
                  Merchants maintain global control over uploaded resources. You can permanently clear full classes, departments, list records, or student faces instantly using the clear bin button on the operations dashboard, purging resources permanently from deep storage nodes.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">7. Third-Party Services</h3>
                <p>
                  The software interfaces with standard payment gateways and whitelabel mobile capture links. No demographic details are transmitted to external metrics logs outside this direct line.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">8. Contact for Privacy Concerns</h3>
                <p>
                  Direct all security inquiries or specialized clearance requests to our Jaipur office (Plot No SC-20 B(D), O Block, Narayan Vihar, Jaipur 302020) via privacy@ivyprints.in.
                </p>
              </section>
            </div>
          )}

          {/* TERMS OF SERVICE */}
          {section === 'terms-of-service' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl flex items-center gap-3">
                <Scale className="w-6 h-6 shrink-0 text-blue-600" />
                <span className="font-sans text-xs">
                  Review terms governing operations limits, copyright, and regional billing responsibilities on B2B printing operations.
                </span>
              </div>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">1. Acceptance of Terms</h3>
                <p>
                  By creating a workspace or uploading school rosters, merchants accept complete binding alignment under Indian Digital SME guidelines and local printing copyright codes.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">2. Platform Use & Restrictions</h3>
                <p>
                  Operators are strictly forbidden from compiling identification badges representing official military branches, security police divisions, or national agencies unless they provide direct verified administrative B2B authorization seals.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">3. Vendor Responsibilities</h3>
                <p>
                  Vendors certify having legal alignment permissions to operate student photographs prior to running automated face alignments or publishing white-labeled self-capture links.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">4. Intellectual Property</h3>
                <p>
                  The IVY Prints symbol, layout presets, and pre-press software engine remain complete intellectual property of IVY Prints Delhi NCR corp. Custom logo assets uploaded by merchants belong completely to their respective institutions.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">5. Payments & Billing</h3>
                <p>
                  Subscriptions are billed dynamically based on monthly selection tiers. Pay-per-card models are compiled prior to downloadable high-res double-sided print PDF generations.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">6. Govering Law</h3>
                <p>
                  All disputes are governed under the direct jurisdiction parameters of High Court Delhi, India.
                </p>
              </section>
            </div>
          )}

          {/* REFUND POLICY */}
          {section === 'refund-policy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-amber-50 border border-amber-200 text-amber-850 p-4 rounded-xl flex items-center gap-3">
                <Coins className="w-6 h-6 shrink-0 text-yellow-600" />
                <span className="font-sans text-xs">
                  Our refund timeline provides complete security within 7 operational business days for failed compilation trials.
                </span>
              </div>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">1. Eligibility for Refund</h3>
                <p>
                  Refund eligibility is strictly limited to instances of systemic cloud compilation errors. If a downloadable PDF fails to generate due to platform server errors, merchants qualify for a 100% credit return.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">2. Request Process</h3>
                <p>
                  Submit your billing receipt ID along with the project trace sequence code directly to refunds@ivyprints.in within 48 hours of experiencing compilation errors.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">3. Timeline</h3>
                <p>
                  Verified credit returns are processed directly back to the original source UPI, bank transfer, or debit node within 7 business days of administrative approval.
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-[#0A1628] uppercase tracking-wide">4. Non-Refundable Cases</h3>
                <p>
                  Refunds are not given for physical print business issues, local laminator errors, student photogenic background complaints, or merchant user errors when typing out names in Excel sheets.
                </p>
              </section>
            </div>
          )}

          {/* Back to top btn */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onPageChange('home')}
              className="text-xs font-mono font-bold text-[#00AEEF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN HOME</span>
            </button>

            <button
              onClick={scrollToTop}
              className="text-xs font-mono font-bold text-slate-400 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              title="Scroll to Top of Policy Document"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>BACK TO TOP</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
