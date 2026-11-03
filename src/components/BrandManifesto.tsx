import React, { useEffect, useRef, useState } from 'react';
import { BrandLogo, OFFICIAL_LOGO_SRC } from './BrandLogo';

export const BrandManifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Statement broken into five carefully composed lines
  const manifestoLines = [
    ['WE', 'BELIEVE', 'STYLE'],
    ['IS', 'MORE', 'THAN'],
    ['WHAT', 'YOU', 'WEAR.'],
    ['IT', 'IS', 'HOW', 'YOU'],
    ['DEFINE', 'YOURSELF.']
  ];

  const allWords = manifestoLines.flat();
  const totalWords = allWords.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.15;
      const current = start - rect.top;
      const total = start - end + rect.height * 0.5;
      
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeWordThreshold = scrollProgress * (totalWords + 3);
  let wordCounter = 0;

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#111111] text-[#FFFDF2] py-24 md:py-36 px-6 md:px-16 flex flex-col justify-between items-center text-center select-none overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Top editorial accent with small orange NOVAIRE logo */}
      <div className="flex flex-col items-center gap-3">
        <BrandLogo size="sm" variant="light" />
        <span className="text-[11px] font-bold tracking-[0.35em] text-[#F15A0A] uppercase">
          THE NOVAIRE MANIFESTO
        </span>
      </div>

      {/* Main 5-Line Statement: Every word is an individual span */}
      <div className="max-w-5xl mx-auto my-12 md:my-20 space-y-3 sm:space-y-4 md:space-y-6">
        {manifestoLines.map((line, lineIndex) => (
          <div 
            key={lineIndex} 
            className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 md:gap-x-7"
          >
            {line.map((word) => {
              const currentWordIndex = wordCounter++;
              const distance = activeWordThreshold - currentWordIndex;
              
              // 3-word soft transition edge:
              let wordColor = '#6F6F6F';
              let wordOpacity = 0.45;

              if (distance >= 2) {
                wordColor = '#FFFFFF';
                wordOpacity = 1;
              } else if (distance >= 1) {
                wordColor = '#ECEAE4';
                wordOpacity = 0.85;
              } else if (distance >= 0) {
                wordColor = '#B8B4AA';
                wordOpacity = 0.7;
              }

              return (
                <span
                  key={word}
                  style={{
                    color: wordColor,
                    opacity: wordOpacity,
                    transition: 'color 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease'
                  }}
                  className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight inline-block transform transition-transform"
                >
                  {word}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Supporting statement: DESIGNED WITH INTENTION. CREATED FOR INDIVIDUALITY. */}
      <div className="max-w-2xl mx-auto space-y-4 px-4">
        <p className="font-editorial text-lg sm:text-xl font-bold uppercase tracking-[0.2em] text-[#FFFDF2]">
          DESIGNED WITH INTENTION.<br className="hidden sm:inline" /> CREATED FOR INDIVIDUALITY.
        </p>

        <p className="text-sm sm:text-base text-[#858585] leading-relaxed max-w-xl mx-auto">
          Contemporary essentials, thoughtful details, and timeless silhouettes. Engineered for those who define their own standard.
        </p>
      </div>

      {/* Subtle Horizontal Divider */}
      <div className="w-full max-w-4xl mx-auto my-12 border-t border-neutral-800" />

      {/* Bottom Footer Info */}
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-[0.25em] text-[#858585] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F15A0A]" />
          <span className="font-editorial font-bold text-neutral-300">
            NOVAIRE / EST. 2026
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400 animate-bounce">
          <span>SCROLL TO EXPLORE</span>
          <span className="text-[#F15A0A]">↓</span>
        </div>
      </div>
    </section>
  );
};

export default BrandManifesto;
