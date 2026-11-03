import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, Shield } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { UserProfile } from '../types';

interface StoreHeaderProps {
  cartCount: number;
  wishlistCount: number;
  currentUser: UserProfile;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  cartCount,
  wishlistCount,
  currentUser,
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenAccount,
  onOpenWishlist,
  onOpenCart,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ALL SILHOUETTES', value: 'all' },
    { label: 'MEN', value: 'men' },
    { label: 'WOMEN', value: 'women' },
    { label: 'NEW ARRIVALS', value: 'new' },
    { label: 'COLLECTIONS', value: 'collections' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#111111]/95 backdrop-blur-xl border-b border-neutral-800 shadow-2xl py-3.5' 
          : 'bg-[#111111] border-b border-neutral-900 py-4'
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between gap-6">
        
        {/* Left: Official Bold Orange NOVAIRE Logo */}
        <div className="flex items-center gap-6">
          <BrandLogo 
            size="md" 
            variant="light" 
            onClick={() => onSelectCategory('all')} 
          />
        </div>

        {/* Center: Clean Navigation Links with Orange Active Underline */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => onSelectCategory(link.value)}
              className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors whitespace-nowrap cursor-pointer relative py-1 ${
                activeCategory === link.value 
                  ? 'text-white' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.label}
              {activeCategory === link.value && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F15A0A] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Currency Indicator, Search, Account, Wishlist, Cart & Admin */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Subtle UK Currency Indicator */}
          <span className="hidden xl:inline-block text-[11px] font-bold tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded uppercase">
            UK (£) · VAT INC.
          </span>

          {/* Admin shortcut badge */}
          {currentUser.role === 'admin' ? (
            <button
              onClick={onOpenAdmin}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#F15A0A]/20 hover:bg-[#F15A0A]/30 text-[#F15A0A] text-[10px] font-bold tracking-widest uppercase rounded-full border border-[#F15A0A]/40 transition-all cursor-pointer"
            >
              <Shield size={12} />
              ADMIN CONTROL
            </button>
          ) : (
            <button
              onClick={onOpenAdmin}
              className="hidden lg:inline-flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-300 tracking-wider uppercase"
              title="Access store admin panel"
            >
              ADMIN
            </button>
          )}

          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full text-neutral-400 hover:text-[#F15A0A] hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Search Catalog"
          >
            <Search size={19} />
          </button>

          <button
            onClick={onOpenAccount}
            className="p-2 rounded-full text-neutral-400 hover:text-[#F15A0A] hover:bg-white/5 transition-colors cursor-pointer relative"
            aria-label="Account Settings"
          >
            <User size={19} />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-2 rounded-full text-neutral-400 hover:text-[#F15A0A] hover:bg-white/5 transition-colors cursor-pointer relative"
            aria-label="Saved Wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F15A0A] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFDF2] text-[#111111] hover:bg-[#F15A0A] hover:text-white transition-all shadow-sm cursor-pointer ml-1 group"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag size={16} className="text-[#F15A0A] group-hover:text-white transition-colors" />
            <span className="text-xs font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  onSelectCategory(link.value);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-semibold tracking-widest uppercase py-2 border-b border-neutral-900 ${
                  activeCategory === link.value ? 'text-[#F15A0A] font-bold' : 'text-neutral-400'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-semibold tracking-widest uppercase py-2 text-[#F15A0A] flex items-center gap-2"
            >
              <Shield size={16} />
              ADMIN DASHBOARD
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default StoreHeader;
