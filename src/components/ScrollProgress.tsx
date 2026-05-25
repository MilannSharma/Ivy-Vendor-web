/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-100 z-50">
      <div 
        className="h-full bg-gradient-to-r from-[#00AEEF] via-[#FFB800] to-[#00AEEF] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
