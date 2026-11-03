import React from 'react';
import { BrandLogo, OFFICIAL_LOGO_SRC } from './BrandLogo';

interface HeroModelVisualProps {
  className?: string;
  onDiscoverClick?: () => void;
}

export const HeroModelVisual: React.FC<HeroModelVisualProps> = ({ className = '', onDiscoverClick }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Central High Fashion Model Silhouette viewed from behind in Dark Architectural Technical Jacket */}
      <svg
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain max-h-[920px] drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle gradient to blend jacket edges into #DADADA */}
          <radialGradient id="studioLighting" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFDF2" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#DADADA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#DADADA" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="jacketFabric" x1="150" y1="200" x2="450" y2="750" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#252525" />
            <stop offset="25%" stopColor="#181818" />
            <stop offset="70%" stopColor="#0E0E0E" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>

          <linearGradient id="jacketSheen" x1="250" y1="180" x2="350" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A4A4A" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#282828" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#080808" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="neckShadow" x1="280" y1="120" x2="320" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#96938D" />
            <stop offset="100%" stopColor="#5E5C57" />
          </linearGradient>

          <linearGradient id="hairTexture" x1="270" y1="60" x2="330" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C1C1C" />
            <stop offset="50%" stopColor="#0F0F0F" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
        </defs>

        {/* Ambient Studio Diffuse Disc */}
        <circle cx="300" cy="400" r="280" fill="url(#studioLighting)" />

        {/* --- MODEL SILHOUETTE --- */}

        {/* Head and Neck - Nape of neck */}
        <path
          d="M282 135 C282 120 286 95 300 95 C314 95 318 120 318 135 C318 165 282 165 282 135 Z"
          fill="url(#neckShadow)"
        />

        {/* Clean Cut Dark Hair (Back of head) */}
        <path
          d="M272 105 C270 70 285 55 300 55 C315 55 330 70 328 105 C326 122 320 128 314 130 C306 132 294 132 286 130 C280 128 274 122 272 105 Z"
          fill="url(#hairTexture)"
        />

        {/* Stand Collar with subtle Orange stitch detail */}
        <path
          d="M260 162 C275 152 325 152 340 162 C348 185 345 200 340 206 C322 200 278 200 260 206 C255 200 252 185 260 162 Z"
          fill="#1C1C1C"
          stroke="#333333"
          strokeWidth="1"
        />
        {/* Signature NOVAIRE Orange collar accent */}
        <line x1="295" y1="160" x2="305" y2="160" stroke="#F15A0A" strokeWidth="2.5" strokeLinecap="round" />

        {/* Main Oversized Dark Technical Jacket Body */}
        <path
          d="M260 165 
             C230 175 185 210 165 265 
             C150 310 142 385 140 470 
             C138 540 148 610 156 680
             C200 690 250 695 300 695 
             C350 695 400 690 444 680 
             C452 610 462 540 460 470 
             C458 385 450 310 435 265 
             C415 210 370 175 340 165 
             Z"
          fill="url(#jacketFabric)"
        />

        {/* Jacket Shoulder Structure & Seams */}
        <path
          d="M165 265 C220 250 300 248 340 165"
          stroke="#383838"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M435 265 C380 250 300 248 260 165"
          stroke="#2A2A2A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />

        {/* Center Back Ergonomic Architectural Seam */}
        <line
          x1="300"
          y1="205"
          x2="300"
          y2="690"
          stroke="#2E2E2E"
          strokeWidth="2"
          strokeDasharray="4 2"
        />

        {/* Left and Right Arm Drapery & Volume */}
        <path
          d="M165 265 C175 340 178 430 180 530 C182 610 175 660 170 682"
          stroke="#1F1F1F"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M435 265 C425 340 422 430 420 530 C418 610 425 660 430 682"
          stroke="#1F1F1F"
          strokeWidth="2.5"
          fill="none"
        />

        {/* Dynamic Studio High-Fashion Light Sheen */}
        <path
          d="M210 240 C250 220 350 220 390 240 C375 340 225 340 210 240 Z"
          fill="url(#jacketSheen)"
          opacity="0.65"
        />

        {/* Technical Storm Flap / Back Vent Detail */}
        <polygon
          points="270,360 330,360 335,420 265,420"
          fill="#111111"
          stroke="#2D2D2D"
          strokeWidth="1"
        />

        {/* Tailored Trousers */}
        <path
          d="M200 690 L240 795 L290 795 L296 720 L304 720 L310 795 L360 795 L400 690 Z"
          fill="#0A0A0A"
        />
        <line x1="250" y1="700" x2="265" y2="795" stroke="#1D1D1D" strokeWidth="1" />
        <line x1="350" y1="700" x2="335" y2="795" stroke="#1D1D1D" strokeWidth="1" />
      </svg>

      {/* FLOATING DARK TRANSLUCENT NOVAIRE BRAND PLATE OVER MODEL'S BACK */}
      <div 
        className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 frosted-glass-dark px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer z-20 group"
        onClick={onDiscoverClick}
      >
        <div className="w-6 h-6 rounded-full bg-[#F15A0A] flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white text-[10px] font-black">N</span>
        </div>
        <BrandLogo size="sm" variant="light" />
        <span className="text-[10px] tracking-widest text-[#FFFDF2] uppercase border-l border-white/20 pl-2.5 font-semibold">
          LONDON · 2026
        </span>
        <div className="flex flex-col gap-0.5 ml-1">
          <span className="w-3 h-[1.5px] bg-[#F15A0A] group-hover:w-4 transition-all" />
          <span className="w-2 h-[1.5px] bg-[#FFFDF2] group-hover:w-3 transition-all" />
        </div>
      </div>

      {/* FLOATING FROSTED GLASS PILL */}
      <div className="absolute top-[28%] left-[8%] lg:left-[12%] hidden md:flex items-center gap-2 frosted-glass-light px-4 py-2 rounded-full shadow-lg border border-[#F15A0A]/30 transition-transform duration-300 hover:-translate-y-1 z-20">
        <span className="w-2 h-2 rounded-full bg-[#F15A0A] animate-pulse" />
        <span className="font-editorial text-[11px] font-bold tracking-[0.2em] text-[#111111] uppercase">
          CRAFTED FOR INDIVIDUALITY
        </span>
      </div>
    </div>
  );
};

export default HeroModelVisual;
