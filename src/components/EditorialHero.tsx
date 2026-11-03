import React, { useState } from 'react';
import { ArrowUpRight, Search, User, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { BrandLogo, OFFICIAL_LOGO_SRC } from './BrandLogo';
import { HeroModelVisual } from './HeroModelVisual';
import { HomepageConfig } from '../types';

interface EditorialHeroProps {
  config: HomepageConfig;
  cartCount: number;
  wishlistCount: number;
  activeNav: string;
  onNavClick: (item: string) => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onExploreMen: () => void;
  onExploreWomen: () => void;
  onContactClick: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  config,
  cartCount,
  wishlistCount,
  activeNav,
  onNavClick,
  onOpenSearch,
  onOpenAccount,
  onOpenWishlist,
  onOpenCart,
  onExploreMen,
  onExploreWomen,
  onContactClick
}) => {
  const [campaignProgress, setCampaignProgress] = useState(70);
  const navItems = ['HOME', 'MEN', 'WOMEN', 'NEW ARRIVALS', 'COLLECTIONS', 'ABOUT'];

  return (
    <section 
      className="relative w-full min-h-[940px] bg-[#FFFDF2] text-[#111111] overflow-hidden flex flex-col justify-between select-none"
      style={{ backgroundColor: '#FFFDF2' }}
    >
      {/* Subtle paper/studio texture gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF2] via-[#F4F1E8] to-[#DADADA] opacity-90 pointer-events-none" />

      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="w-full px-6 md:px-12 pt-6 pb-4 flex items-center justify-between z-30 relative">
        
        {/* Left: Official Bold Chunky Orange NOVAIRE Logo */}
        <div className="flex items-center">
          <BrandLogo size="lg" variant="dark" onClick={() => onNavClick('HOME')} />
        </div>

        {/* Centre: Nav links with animated orange active indicator */}
        <nav className="hidden lg:flex items-center bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-neutral-200/80">
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => onNavClick(item)}
                className={`relative px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 rounded-full cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-neutral-700 hover:text-black'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-[#F15A0A] rounded-full shadow-sm -z-10 transition-all duration-300" />
                )}
                {item}
              </button>
            );
          })}
        </nav>

        {/* Right: Search, Account, Wishlist, Cart & Orange Contact Button */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-black/5 transition-colors text-neutral-800 hover:text-[#F15A0A]"
            aria-label="Search Collection"
          >
            <Search size={18} />
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 rounded-full hover:bg-black/5 transition-colors text-neutral-800 hover:text-[#F15A0A]"
            aria-label="Customer Account"
          >
            <User size={18} />
          </button>

          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full hover:bg-black/5 transition-colors text-neutral-800 hover:text-[#F15A0A]"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F15A0A] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-100 transition-all shadow-sm border border-neutral-200"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={16} className="text-[#F15A0A]" />
            <span className="text-xs font-bold tabular-nums text-neutral-900">
              {cartCount}
            </span>
          </button>

          {/* Contact Button */}
          <button
            onClick={onContactClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] text-white text-xs font-bold tracking-wider rounded-full hover:bg-[#F15A0A] transition-colors shadow-sm cursor-pointer"
          >
            CONTACT
            <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      {/* ================= HERO CONTENT & ASYMMETRIC GRID ================= */}
      <div className="relative w-full max-w-[1536px] mx-auto px-6 md:px-12 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 z-10 pt-4 pb-8">
        
        {/* LEFT COLUMN: Editorial Typography & Dual Explore Buttons (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 md:space-y-7 z-20">
          
          {/* Top Label */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F15A0A]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-600">
              ● ABOUT NOVAIRE · LONDON ATELIER
            </span>
          </div>

          {/* Main Headline (Oversized Archivo) */}
          <div className="space-y-2">
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#111111]">
              THE ART OF<br />
              <span className="italic font-light text-[#F15A0A]">BEING</span> DIFFERENT.
            </h1>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-neutral-600 pt-2">
              {config.editorialBannerText}
            </p>
          </div>

          {/* Editorial Description */}
          <p className="text-sm md:text-base text-neutral-700 max-w-md font-normal leading-relaxed">
            We engineer contemporary essentials for individuals who believe personal style is an unapologetic declaration of identity.
          </p>

          {/* Dual Action Buttons: EXPLORE MEN. & EXPLORE WOMEN. */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExploreMen}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#111111] text-white font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#F15A0A] transition-all hover:scale-[1.02] shadow-md group cursor-pointer"
            >
              EXPLORE MEN.
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreWomen}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white border border-neutral-300 text-[#111111] hover:border-[#F15A0A] hover:text-[#F15A0A] font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all hover:scale-[1.02] shadow-sm group cursor-pointer"
            >
              EXPLORE WOMEN.
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Small Product Information Cards with Orange touches */}
          <div className="pt-6 grid grid-cols-3 gap-3 border-t border-neutral-300/80">
            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest text-[#F15A0A] uppercase font-bold">01 / DROP</span>
              <span className="text-xs font-bold uppercase tracking-wider text-black">NEW ARRIVALS</span>
            </div>
            <div className="flex flex-col border-l border-neutral-300/80 pl-3">
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">EDITION</span>
              <span className="text-xs font-bold uppercase tracking-wider text-black">COLLECTION 01</span>
            </div>
            <div className="flex flex-col border-l border-neutral-300/80 pl-3">
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">CURATION</span>
              <span className="text-xs font-bold uppercase tracking-wider text-black">UK ATELIER</span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Central Fashion Model Image (4 cols) */}
        <div className="lg:col-span-4 h-full min-h-[480px] md:min-h-[580px] lg:min-h-[680px] relative flex items-center justify-center">
          <HeroModelVisual onDiscoverClick={onExploreMen} />
        </div>

        {/* RIGHT COLUMN: Campaign Card & Top-Right Header Info (3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end space-y-8 z-20">
          
          {/* Top-Right Info: "NEW SEASON / 2026" + Orange Contact Button */}
          <div className="flex flex-col items-start lg:items-end space-y-2 text-left lg:text-right">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F15A0A] animate-ping" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-700">
                {config.heroSeasonLabel}
              </span>
            </div>
            <span className="text-xs text-neutral-500 font-medium">
              BRITISH CONTEMPORARY
            </span>
          </div>

          {/* Vertical Fashion Campaign Image Card */}
          <div className="w-full max-w-[240px] bg-white p-3.5 rounded-2xl shadow-xl border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-widest font-bold uppercase text-[#F15A0A]">NOW AVAILABLE</span>
              <span className="text-[10px] font-bold text-neutral-400">UK SS26</span>
            </div>

            {/* Campaign card visual */}
            <div 
              className="relative w-full aspect-[3/4] bg-[#111111] rounded-xl overflow-hidden cursor-pointer group"
              onClick={onExploreMen}
            >
              <svg viewBox="0 0 240 320" fill="none" className="w-full h-full object-cover">
                <rect width="240" height="320" fill="#141414" />
                <circle cx="120" cy="110" r="45" fill="#2E2E2E" />
                <path d="M70 200 C80 150 160 150 170 200 L190 320 L50 320 Z" fill="#1F1F1F" />
                <rect x="110" y="220" width="20" height="4" rx="2" fill="#F15A0A" />
                <text x="120" y="270" fill="#FFFDF2" fontSize="12" fontFamily="sans-serif" textAnchor="middle" letterSpacing="3" fontWeight="bold">
                  AUTUMN/WINTER
                </text>
              </svg>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold tracking-wider uppercase group-hover:text-[#F15A0A] transition-colors flex items-center justify-between w-full">
                  THE NEW COLLECTION
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-600">
                <span>LIMITED RUN</span>
                <span className="text-[#F15A0A] font-bold">{campaignProgress}%</span>
              </div>
              <div 
                className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden cursor-pointer"
                onClick={() => setCampaignProgress(prev => (prev >= 90 ? 45 : prev + 25))}
                title="Click to toggle progress"
              >
                <div 
                  className="h-full bg-[#F15A0A] transition-all duration-500 rounded-full"
                  style={{ width: `${campaignProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM EDITORIAL BRAND MARKS ================= */}
      <footer className="w-full border-t border-neutral-300/80 px-6 md:px-12 py-3.5 flex flex-wrap items-center justify-between text-xs tracking-[0.25em] uppercase text-neutral-600 z-20 bg-white/40 backdrop-blur-sm">
        <div className="font-editorial font-bold text-black tracking-[0.3em] flex items-center gap-2">
          <span className="text-[#F15A0A]">●</span> NOVAIRE LONDON
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-semibold text-neutral-700">
          <span>THE ESSENTIALS</span>
          <span aria-hidden="true">·</span>
          <span>URBAN FORM</span>
          <span aria-hidden="true">·</span>
          <span>AFTER HOURS</span>
          <span aria-hidden="true">·</span>
          <span>EVERYDAY LUXURY</span>
        </div>
        <div className="text-[11px] font-bold text-[#F15A0A]">
          BEYOND THE ORDINARY.
        </div>
      </footer>
    </section>
  );
};

export default EditorialHero;
