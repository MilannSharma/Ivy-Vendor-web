/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types';
import { Lang } from './lib/translations';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import WhatsAppFloat from './components/WhatsAppFloat';

// Pages
import Home from './pages/Home';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import LegalPages from './pages/LegalPages';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [lang, setLang] = useState<Lang>('en');

  // Handle Hash/Deep Routing if user directly types hashtags in UI iframe
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (
        hash === 'features' ||
        hash === 'how-it-works' ||
        hash === 'contact' ||
        hash === 'privacy-policy' ||
        hash === 'terms-of-service' ||
        hash === 'refund-policy' ||
        hash === 'signin' ||
        hash === 'signup'
      ) {
        setCurrentPage(hash as PageId);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check on load
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.location.hash = `#/${pageId}`;
  };

  const isAuthPage = currentPage === 'signin' || currentPage === 'signup';

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col justify-between selection:bg-brand-purple/20 selection:text-brand-text">
      
      {/* Scroll indicator tracker */}
      <ScrollProgress />

      {/* Hide general navigation during auth flow for minimalist focus */}
      {!isAuthPage && (
        <Navbar 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
          lang={lang} 
          onLangChange={setLang} 
        />
      )}

      {/* Main content body pages matcher */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home onPageChange={handlePageChange} lang={lang} />}
        {currentPage === 'features' && <Features onPageChange={handlePageChange} lang={lang} />}
        {currentPage === 'how-it-works' && <HowItWorks onPageChange={handlePageChange} lang={lang} />}
        {currentPage === 'contact' && <Contact onPageChange={handlePageChange} lang={lang} />}

        {/* Legal documents */}
        {(currentPage === 'privacy-policy' || 
          currentPage === 'terms-of-service' || 
          currentPage === 'refund-policy') && (
            <LegalPages section={currentPage} onPageChange={handlePageChange} lang={lang} />
        )}

        {/* Credentials / Onboarders */}
        {currentPage === 'signin' && <SignIn onPageChange={handlePageChange} lang={lang} />}
        {currentPage === 'signup' && <SignUp onPageChange={handlePageChange} lang={lang} />}
      </main>

      {/* Hide footers during auth focus */}
      {!isAuthPage && (
        <Footer onPageChange={handlePageChange} lang={lang} />
      )}

      {/* Floating WhatsApp CTA */}
      {!isAuthPage && <WhatsAppFloat lang={lang} />}

    </div>
  );
}
