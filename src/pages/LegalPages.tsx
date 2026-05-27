/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
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
  lang: Lang;
}

export default function LegalPages({ section, onPageChange, lang }: LegalPagesProps) {
  const t = translations[lang];
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="legal-pages-container" className="pt-20 bg-brand-bg min-h-screen text-left pb-20 font-sans select-none">
      
      {/* Updated header */}
      <div className="bg-brand-alt border-b border-brand-border py-10 text-center relative">
        <div className="max-w-4xl mx-auto px-4 space-y-3 relative">
          <span className="bg-brand-purple/10 text-brand-purple text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-brand-purple/20">
            Last Updated: Jan 20, 2026
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-text uppercase tracking-tight">
            {section === 'privacy-policy' && (lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति')}
            {section === 'terms-of-service' && (lang === 'en' ? 'Terms & Conditions' : 'सेवा की शर्तें')}
            {section === 'refund-policy' && (lang === 'en' ? 'Refund & Cancellation Policy' : 'रिफंड और रद्दीकरण नीति')}
          </h1>
          <p className="text-xs text-brand-muted">
            {lang === 'en' ? 'Official guidelines governing the IVY Prints B2B software.' : 'आईवी प्रिंट्स बी२बी सॉफ्टवेयर के संचालन नियम।'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <div className="md:col-span-1">
          <div className="sticky top-28 bg-white p-4 border border-brand-border rounded-2xl space-y-2">
            <span className="font-mono text-[9px] text-brand-text uppercase font-bold tracking-widest block pb-1.5 border-b border-brand-border mb-2">Policies</span>
            
            <button
              onClick={() => onPageChange('privacy-policy')}
              className={`w-full text-left py-1.5 px-2.5 rounded-xl text-xs font-sans font-extrabold flex items-center justify-between cursor-pointer ${
                section === 'privacy-policy' ? 'text-brand-purple font-bold bg-brand-alt' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>{lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</span>
              <ChevronRight className="w-3" />
            </button>

            <button
              onClick={() => onPageChange('terms-of-service')}
              className={`w-full text-left py-1.5 px-2.5 rounded-xl text-xs font-sans font-extrabold flex items-center justify-between cursor-pointer ${
                section === 'terms-of-service' ? 'text-brand-purple font-bold bg-brand-alt' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>{lang === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}</span>
              <ChevronRight className="w-3" />
            </button>

            <button
              onClick={() => onPageChange('refund-policy')}
              className={`w-full text-left py-1.5 px-2.5 rounded-xl text-xs font-sans font-extrabold flex items-center justify-between cursor-pointer ${
                section === 'refund-policy' ? 'text-brand-purple font-bold bg-brand-alt' : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              <span>{lang === 'en' ? 'Refund Policy' : 'रिफंड नीति'}</span>
              <ChevronRight className="w-3" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 prose prose-slate max-w-none text-brand-muted leading-relaxed text-xs sm:text-sm space-y-6">
          
          {/* PRIVACY POLICY */}
          {section === 'privacy-policy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-850 p-4 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-600" />
                <span className="font-sans text-xs">
                  {lang === 'en' 
                    ? 'We verify that no student biometric identification or school record datasets are processed or sold under Indian regulations.'
                    : 'हम पुष्टि करते हैं कि भारतीय कानूनों के अनुसार छात्र के किसी भी डेटा को बेचा या गलत इस्तेमाल नहीं किया जाता है।'}
                </span>
              </div>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-brand-text uppercase tracking-wide">
                  {lang === 'en' ? '1. Information We Collect' : '1. एकत्रित जानकारी'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'IVY Prints collects standard institutional identification information solely inside the pre-press process. This includes student names, roll numbers, photographs, and optional custom metadata submitted by operating merchants.'
                    : 'आईवी प्रिंट्स सिर्फ आईडी कार्ड प्रिंट करने के उद्देश्य से जानकारी एकत्रित करता है। इसमें नाम, रोल नंबर, क्लास, फोटो और दुकानदारों द्वारा दी गई जानकारी शामिल है।'}
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-brand-text uppercase tracking-wide">
                  {lang === 'en' ? '2. Data Storage & Security' : '2. डेटा सुरक्षा और भंडारण'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Customer lists and raw portrait photos are archived on secure cloud servers and automatically purged upon B2B merchant request or 30 days after dataset delivery batches.'
                    : 'स्टूडेंट की फोटो और एक्सेल शीट डेटा सुरक्षित सर्वर पर रखा जाता है और काम पूरा होने या ३० दिन बाद अपने आप डिलीट कर दिया जाता है।'}
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
                  {lang === 'en' 
                    ? 'Review terms governing operations limits, copyright, and regional billing responsibilities.'
                    : 'आईडी कार्ड प्रिंटिंग सॉफ्टवेयर के इस्तेमाल की शर्तें और नियम ध्यान से पढ़ें।'}
                </span>
              </div>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-brand-text uppercase tracking-wide">
                  {lang === 'en' ? '1. Acceptance of Terms' : '1. नियमों की स्वीकृति'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'By creating a workspace or uploading school rosters, merchants accept complete alignment under Indian Digital SME guidelines and local printing copyright codes.'
                    : 'आईवी सॉफ्टवेयर का उपयोग करके प्रोजेक्ट बनाने पर आप सभी सरकारी नियमों और सेवा की शर्तों से सहमत होते हैं।'}
                </p>
              </section>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-brand-text uppercase tracking-wide">
                  {lang === 'en' ? '2. Restricted Badges' : '2. प्रतिबंधित कार्ड्स'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Operators are strictly forbidden from compiling identification badges representing official military branches, security police divisions, or national agencies unless they provide direct verified administrative B2B authorization.'
                    : 'सेना, पुलिस, सरकारी अधिकारियों या सुरक्षा विभागों के नकली आईडी कार्ड बनाना सख्त मना है। ऐसा करने पर कानूनी कार्रवाई हो सकती है।'}
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
                  {lang === 'en' 
                    ? 'Our refund timeline provides complete security within 7 operational business days for failed compilation trials.'
                    : 'भुगतान और रिफंड की शर्तें ७ कार्य दिवसों की समय सीमा के तहत लागू होती हैं।'}
                </span>
              </div>

              <section className="space-y-2.5">
                <h3 className="font-display font-bold text-base text-brand-text uppercase tracking-wide">
                  {lang === 'en' ? '1. Eligibility for Refund' : '1. रिफंड की पात्रता'}
                </h3>
                <p>
                  {lang === 'en'
                    ? 'Refund eligibility is strictly limited to instances of systemic cloud compilation errors. If a downloadable PDF fails to generate due to platform server errors, merchants qualify for a 100% credit return.'
                    : 'रिफंड केवल सर्वर की गड़बड़ी के कारण पीडीएफ डाउनलोड न होने पर ही दिया जाएगा। प्रिंटर की गड़बड़ी या एक्सेल शीट में गलत जानकारी के लिए रिफंड नहीं मिलेगा।'}
                </p>
              </section>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-8 border-t border-brand-border flex items-center justify-between">
            <button
              onClick={() => onPageChange('home')}
              className="text-xs font-mono font-bold text-brand-purple hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'RETURN HOME' : 'होमपेज पर जाएं'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="text-xs font-mono font-bold text-brand-muted hover:text-brand-text flex items-center gap-1 cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'BACK TO TOP' : 'ऊपर जाएं'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
