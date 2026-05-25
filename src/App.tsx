/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { PageId } from './types';
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
    <div className="min-h-screen bg-white text-[#0A1628] flex flex-col justify-between selection:bg-[#00AEEF]/20 selection:text-[#0A1628]">
      
      {/* Scroll indicator tracker */}
      <ScrollProgress />

      {/* Hide general navigation during auth flow for minimalist focus */}
      {!isAuthPage && (
        <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      )}

      {/* Main content body pages matcher */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home onPageChange={handlePageChange} />}
        {currentPage === 'features' && <Features onPageChange={handlePageChange} />}
        {currentPage === 'how-it-works' && <HowItWorks onPageChange={handlePageChange} />}
        {currentPage === 'contact' && <Contact onPageChange={handlePageChange} />}

        {/* Legal documents */}
        {(currentPage === 'privacy-policy' || 
          currentPage === 'terms-of-service' || 
          currentPage === 'refund-policy') && (
            <LegalPages section={currentPage} onPageChange={handlePageChange} />
        )}

        {/* Credentials / Onboarders */}
        {currentPage === 'signin' && <SignIn onPageChange={handlePageChange} />}
        {currentPage === 'signup' && <SignUp onPageChange={handlePageChange} />}
      </main>

      {/* Hide footers during auth focus */}
      {!isAuthPage && (
        <Footer onPageChange={handlePageChange} />
      )}

      {/* Floating WhatsApp CTA */}
      {!isAuthPage && <WhatsAppFloat />}

    </div>
  );
}
