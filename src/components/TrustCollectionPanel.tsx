import React from 'react';
import { ArrowUpRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogo, BrandSymbol } from './BrandLogo';

interface TrustCollectionPanelProps {
  onExploreCampaign?: () => void;
  onExploreEssentials?: () => void;
  onExploreCollection?: () => void;
}

export const TrustCollectionPanel: React.FC<TrustCollectionPanelProps> = ({
  onExploreCampaign,
  onExploreEssentials,
  onExploreCollection
}) => {
  return (
    <section className="w-full bg-[#111111] py-16 md:py-24 px-4 sm:px-8 md:px-12 select-none">
      {/* Large bordered editorial panel: Dark background with subtle border and rounded corners */}
      <div className="w-full max-w-[1440px] mx-auto rounded-3xl md:rounded-[36px] bg-[#161616] border border-neutral-800 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Subtle orange ambient glow in background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F15A0A]/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* Panel Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-neutral-800 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F15A0A]" />
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#F15A0A]">
                BRAND PHILOSOPHY & PILLARS
              </span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight text-[#FFFDF2]">
              DEFINED BY<br />
              <span className="italic font-light text-neutral-300">INDIVIDUALITY.</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl">
              Discover a new perspective on contemporary fashion. Every collection is designed around confidence, quality, and effortless expression.
            </p>
          </div>

          {/* Frosted glass decorative tiles with geometric symbols & orange accent */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl frosted-glass flex items-center justify-center text-white border border-white/10 transition-all duration-300 hover:scale-105 hover:border-[#F15A0A]/50 cursor-default">
              <BrandSymbol size={32} color="#F15A0A" />
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl frosted-glass flex items-center justify-center text-neutral-300 border border-white/10 transition-all duration-300 hover:scale-105 hover:border-[#F15A0A]/50 cursor-default">
              <Compass size={28} className="rotate-45 text-[#FFFDF2]" />
            </div>
          </div>
        </div>

        {/* THREE CARDS SPECIFIED IN BRIEF:
            1. NOVAIRE COLLECTION
            2. PREMIUM ESSENTIALS
            3. EDITORIAL CAMPAIGNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-12 relative z-10">
          
          {/* CARD 1 — NOVAIRE COLLECTION */}
          <div 
            onClick={onExploreCollection}
            className="rounded-2xl sm:rounded-3xl bg-[#FFFDF2] text-[#111111] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer group min-h-[400px]"
          >
            <div>
              <div className="flex items-center justify-between pb-6">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#F15A0A]">
                  CHAPTER 01
                </span>
                <span className="text-xs font-bold tracking-wider text-black">
                  SEASON 2026
                </span>
              </div>

              <div className="space-y-4">
                <BrandLogo size="md" variant="dark" />
                <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#111111]">
                  NOVAIRE COLLECTION
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Sculptural tailoring, Japanese technical outerwear, and fluid silhouettes designed for the contemporary UK wardrobe.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-300/80 flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-900 group-hover:text-[#F15A0A] transition-colors">
                EXPLORE RUNWAY PIECES
              </span>
              <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#F15A0A] transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

          {/* CARD 2 — PREMIUM ESSENTIALS */}
          <div 
            onClick={onExploreEssentials}
            className="rounded-2xl sm:rounded-3xl bg-[#1D1D1D] border border-neutral-800 text-white p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F15A0A]/60 hover:shadow-2xl cursor-pointer group min-h-[400px]"
          >
            <div>
              <div className="flex items-center justify-between pb-6">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#F15A0A]">
                  CHAPTER 02
                </span>
                <ShieldCheck size={18} className="text-[#F15A0A]" />
              </div>

              <div className="space-y-3">
                <div className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#FFFDF2] tracking-tight">
                  340<span className="text-[#F15A0A] text-2xl">GSM</span>
                </div>
                <h3 className="font-editorial text-2xl font-bold uppercase tracking-tight text-white">
                  PREMIUM ESSENTIALS
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Heavyweight organic combed cottons, dense 480 GSM loopback fleece, and structural tailoring built to withstand daily repetition.
                </p>
              </div>

              {/* Decorative emblem badge with official logo accent */}
              <div className="my-6 p-3.5 rounded-xl bg-black/50 border border-neutral-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F15A0A] flex items-center justify-center text-white shrink-0 font-black text-xs">
                  N
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-white">
                    BRITISH ATELIER STANDARD
                  </div>
                  <div className="text-[9px] text-neutral-400 tracking-widest uppercase">
                    ZERO PLANNED OBSOLESCENCE
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-300 group-hover:text-[#F15A0A] transition-colors">
                DISCOVER FOUNDATIONS
              </span>
              <div className="w-9 h-9 rounded-full bg-neutral-800 text-white flex items-center justify-center group-hover:bg-[#F15A0A] transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

          {/* CARD 3 — EDITORIAL CAMPAIGNS */}
          <div 
            onClick={onExploreCampaign}
            className="rounded-2xl sm:rounded-3xl bg-[#141414] border border-neutral-800 text-white overflow-hidden relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer group min-h-[400px] flex flex-col justify-end p-8"
          >
            {/* Photographic B&W graphic backdrop */}
            <div className="absolute inset-0 z-0">
              <svg viewBox="0 0 400 500" fill="none" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <rect width="400" height="500" fill="#181818" />
                <circle cx="200" cy="180" r="120" fill="#282828" />
                <path d="M100 480 C110 320 290 320 300 480 Z" fill="#0C0C0C" />
                <rect x="188" y="270" width="24" height="6" rx="2" fill="#F15A0A" />
                <line x1="200" y1="260" x2="200" y2="480" stroke="#3A3A3A" strokeWidth="2" strokeDasharray="6 3" />
                <circle cx="200" cy="160" r="50" fill="#202020" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Overlay content & Arrow interaction */}
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F15A0A]/20 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-[#F15A0A] border border-[#F15A0A]/40">
                <Sparkles size={11} />
                CHAPTER 03
              </div>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
                    EDITORIAL<br />CAMPAIGNS
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Visual essays, seasonal runway archive & lookbooks
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 group-hover:bg-[#F15A0A] group-hover:text-white shadow-lg">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustCollectionPanel;
