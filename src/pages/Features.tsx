/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageId } from '../types';
import { Lang, translations } from '../lib/translations';
import { 
  UploadCloud, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Smartphone, 
  Lock, 
  Grid, 
  Printer, 
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface FeaturesProps {
  onPageChange: (page: PageId) => void;
  lang: Lang;
}

export default function Features({ onPageChange, lang }: FeaturesProps) {
  const t = translations[lang];

  const mainFeatures = [
    {
      title: t.featExcelTitle,
      desc: t.featExcelDesc,
      sub: lang === 'en' ? "Imports XLS, XLSX, and CSV lists in 1 second. Maps student roll numbers, classes, names, and phone numbers instantly." : "XLS, XLSX और CSV फ़ाइलें तुरंत इम्पोर्ट करें। रोल नंबर, क्लास और नाम अपने आप मैप हो जाते हैं।",
      icon: UploadCloud
    },
    {
      title: t.featCropTitle,
      desc: t.featCropDesc,
      sub: lang === 'en' ? "Detects human eyes and chins on 120 portraits per second. Automatically crops and matches photos with student records." : "चेहरे और आँखों को पहचानकर प्रति सेकंड १२० से ज्यादा फोटो क्रॉप करता है। फोटो और स्टूडेंट का रिकॉर्ड अपने आप मैच हो जाता है।",
      icon: Sparkles
    },
    {
      title: t.featBgTitle,
      desc: t.featBgDesc,
      sub: lang === 'en' ? "No Photoshop backdrop replacement needed. Change background to school-specified white or blue color instantly." : "फ़ोटोशॉप की कोई ज़रूरत नहीं। एक क्लिक में स्कूल के हिसाब से सफेद या नीला बैकग्राउंड सेट करें।",
      icon: RefreshCw
    },
    {
      title: t.featLinkTitle,
      desc: t.featLinkDesc,
      sub: lang === 'en' ? "Send a unique mobile upload link to school administrators or parents. They upload photos directly; photos pair with Roll No." : "स्कूल एडमिन या पेरेंट्स को एक लिंक भेजें। वे सीधे फोटो अपलोड करेंगे, और वे फ़ाइलें अपने आप रोल नंबर से जुड़ जाएंगी।",
      icon: Smartphone
    },
    {
      title: t.featLayoutTitle,
      desc: t.featLayoutDesc,
      sub: lang === 'en' ? "Generates print sheets for thermal or manual laminators in A4 and 12x18 sizes. Perfect double-side alignment." : "थर्मल या मैनुअल लैमिनेटर्स के लिए १२x१८ और ए४ साइज शीट डाउनलोड करें। आगे और पीछे का एकदम सटीक संरेखण (अलाइनमेंट)।",
      icon: FileText
    },
    {
      title: t.featDoubleTitle,
      desc: t.featDoubleDesc,
      sub: lang === 'en' ? "Maintains strict front-to-back margin alignment. No shifting or print errors, reducing sheet wastage to zero." : "कार्ड के आगे और पीछे का भाग बिना किसी शिफ्ट या खिसकाव के प्रिंट करें। शीट्स की बर्बादी बिलकुल नहीं होगी।",
      icon: Printer
    }
  ];

  return (
    <div id="features-page" className="pt-20 bg-brand-bg text-brand-text min-h-screen text-left pb-20 select-none">
      
      {/* ── HEADER ── */}
      <section className="bg-brand-alt border-b border-brand-border py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-brand-purple font-mono text-xs font-black uppercase tracking-widest block">Ivy Prints Capabilities</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-brand-text tracking-tight uppercase">
            {t.featuresTitle}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-brand-muted max-w-xl mx-auto leading-relaxed">
            {t.featuresSubtitle}
          </p>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-brand-border hover:border-brand-purple rounded-3xl p-6 md:p-8 space-y-4 hover:shadow-lg transition duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 text-brand-purple flex items-center justify-center shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-black text-lg text-brand-text uppercase leading-tight">{feat.title}</h3>
                  <span className="text-xs font-mono font-bold text-brand-orange block uppercase tracking-wider">{feat.desc}</span>
                  <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed pt-1">
                    {feat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── HIGHLIGHT: EXTRA B2B UTILITIES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-brand-alt border border-brand-purple/20 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="w-8 h-8 rounded-lg bg-brand-orange/15 text-brand-orange flex items-center justify-center">
              <Lock className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-brand-text uppercase">
              {lang === 'en' ? 'Built Secure For Your Customers' : 'कस्टमर के डेटा की सुरक्षा'}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
              {lang === 'en'
                ? "All photo databases and Excel roster links are encrypted. Student details are locked and never shared. You can delete the project data permanently after printing is complete."
                : "सभी फोटो डेटाबेस और एक्सेल फाइलें सुरक्षित रखी जाती हैं। स्टूडेंट की जानकारी को किसी के साथ शेयर नहीं किया जाता। प्रिंट पूरा होने पर आप डेटा को पूरी तरह मिटा सकते हैं।"}
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => onPageChange('signup')}
              className="w-full sm:w-auto px-8 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-sans font-black text-sm rounded-2xl shadow-md transition active:scale-95 duration-105 cursor-pointer"
            >
              {t.ctaStartFree}
            </button>
            <button 
              onClick={() => onPageChange('contact')}
              className="w-full sm:w-auto px-6 py-4 bg-white border border-brand-border text-brand-text font-sans font-bold text-sm rounded-2xl hover:bg-brand-alt transition active:scale-95 duration-105 cursor-pointer"
            >
              {t.ctaContactSales}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
