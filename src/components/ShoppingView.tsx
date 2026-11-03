import React, { useState, useMemo } from 'react';
import { ArrowUpRight, SlidersHorizontal, ArrowUpDown, Search, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ShoppingViewProps {
  products: Product[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickAdd: (product: Product, size: any, color: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  wishlist,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [sortBy, setSortBy] = useState<'newest' | 'popularity' | 'price-asc' | 'price-desc'>('newest');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  React.useEffect(() => {
    if (activeCategory === 'men') {
      setSelectedGender('men');
    } else if (activeCategory === 'women') {
      setSelectedGender('women');
    } else if (activeCategory === 'all') {
      setSelectedGender('all');
    }
  }, [activeCategory]);

  // Categories specified in Section 5 of user brief
  const categories = [
    { label: 'ALL SILHOUETTES', value: 'all' },
    { label: 'T-SHIRTS', value: 't-shirts' },
    { label: 'OVERSIZED T-SHIRTS', value: 'oversized-t-shirts' },
    { label: 'SHIRTS', value: 'shirts' },
    { label: 'HOODIES', value: 'hoodies' },
    { label: 'SWEATSHIRTS', value: 'sweatshirts' },
    { label: 'TROUSERS', value: 'trousers' },
    { label: 'JACKETS', value: 'jackets' },
    { label: 'ACCESSORIES', value: 'accessories' },
  ];

  const collections = [
    'THE ESSENTIALS',
    'URBAN FORM',
    'AFTER HOURS',
    'EVERYDAY LUXURY',
    'COLLECTION 01'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isPublished) return false;

      if (activeCategory === 'new' && !p.isNew) return false;
      if (activeCategory !== 'all' && activeCategory !== 'new' && activeCategory !== 'men' && activeCategory !== 'women' && activeCategory !== 'collections') {
        if (p.category !== activeCategory) return false;
      }

      if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') {
        return false;
      }

      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize as any)) {
        return false;
      }

      if (selectedCollection !== 'all' && p.collection !== selectedCollection) {
        return false;
      }

      if (p.price > maxPrice) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.collection.toLowerCase().includes(q);
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'popularity') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [products, activeCategory, selectedGender, selectedSize, selectedCollection, maxPrice, searchQuery, sortBy]);

  const newArrivals = products.filter(p => p.isNew && p.isPublished).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller && p.isPublished).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2500);
  };

  return (
    <div className="w-full bg-[#111111] text-[#FFFDF2] pt-12 pb-24">
      
      {/* ================= 1. NEW ARRIVALS CURATION ================= */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-8 md:px-12 py-12 border-b border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F15A0A]">
              SPRING / SUMMER 2026 · UK DROP
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white mt-1">
              NEW ARRIVALS
            </h2>
          </div>
          <button
            onClick={() => onCategoryChange('new')}
            className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 hover:text-[#F15A0A] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            EXPLORE FULL DROP <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* ================= 2. SHOP BY CATEGORY ================= */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-neutral-800">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F15A0A]">
            DISCIPLINE OF SILHOUETTE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            SHOP BY CATEGORY
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { label: 'MEN', cat: 'men', count: '14 PIECES' },
            { label: 'WOMEN', cat: 'women', count: '12 PIECES' },
            { label: 'OVERSIZED T-SHIRTS', cat: 'oversized-t-shirts', count: '8 STYLES' },
            { label: 'SHIRTS', cat: 'shirts', count: '9 STYLES' },
            { label: 'TROUSERS', cat: 'trousers', count: '11 STYLES' },
            { label: 'JACKETS', cat: 'jackets', count: '10 SILHOUETTES' },
          ].map((item, idx) => (
            <div
              key={item.label}
              onClick={() => onCategoryChange(item.cat)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#181818] border border-neutral-800 hover:border-[#F15A0A] cursor-pointer transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-[#0E0E0E] opacity-90 group-hover:scale-105 transition-transform duration-700">
                <svg viewBox="0 0 200 300" className="w-full h-full object-cover opacity-20">
                  <circle cx="100" cy="150" r="80" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 2" />
                  <rect x="80" y="140" width="40" height="8" rx="2" fill="#F15A0A" />
                </svg>
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 group-hover:text-[#F15A0A] transition-colors">
                  0{idx + 1}
                </span>
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="font-editorial text-xs sm:text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#FFFDF2]">
                  {item.label}
                </h3>
                <p className="text-[10px] tracking-widest uppercase text-neutral-400">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 3. FEATURED COLLECTIONS ================= */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F15A0A]">
              CURATED CHAPTERS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
              FEATURED COLLECTIONS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'THE ESSENTIALS',
              desc: 'High-density 340 GSM combed cottons and modular foundations engineered for daily British weather.',
              tag: 'CORE CURATION'
            },
            {
              title: 'URBAN FORM',
              desc: 'Technical tailoring, architectural volumes, and weather-resistant Japanese fabrics.',
              tag: 'COLLECTION 01'
            },
            {
              title: 'AFTER HOURS',
              desc: 'Fluid silk, Japanese kimono drapes, and asymmetric cuts designed for evening nuance.',
              tag: 'EDITION 2026'
            },
            {
              title: 'EVERYDAY LUXURY',
              desc: 'Sculptural outerwear and cashmere knits that redefine comfort through quiet precision.',
              tag: 'LONDON ATELIER'
            }
          ].map((col) => (
            <div
              key={col.title}
              onClick={() => {
                setSelectedCollection(col.title);
                const el = document.getElementById('catalog-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-8 rounded-3xl bg-[#161616] border border-neutral-800 hover:border-[#F15A0A] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[260px] group"
            >
              <div className="space-y-3">
                <span className="text-[10px] tracking-widest font-bold uppercase text-[#F15A0A]">
                  {col.tag}
                </span>
                <h3 className="font-editorial text-xl font-bold uppercase tracking-tight text-white group-hover:translate-x-1 transition-transform">
                  {col.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {col.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white">
                <span>VIEW GARMENTS</span>
                <ArrowUpRight size={14} className="group-hover:rotate-45 group-hover:text-[#F15A0A] transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4. BEST SELLERS ================= */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-8 md:px-12 py-20 border-b border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F15A0A]">
              HALLMARK SIGNATURES
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white mt-1">
              BEST SELLERS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickAdd={onQuickAdd}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* ================= 5. BRAND CAMPAIGN BANNER ================= */}
      <section className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-8 my-16">
        <div className="relative rounded-3xl overflow-hidden bg-[#161616] border border-neutral-800 p-10 sm:p-16 lg:p-20 text-center flex flex-col items-center justify-center space-y-6">
          
          <span className="relative z-10 text-[11px] font-bold tracking-[0.35em] uppercase text-[#F15A0A]">
            THE NOVAIRE ESSAY
          </span>

          <h2 className="relative z-10 font-editorial text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white max-w-4xl leading-[1.05]">
            STYLE IS NOT ABOUT FOLLOWING.<br />
            <span className="italic font-light text-[#F15A0A]">IT IS ABOUT DEFINING.</span>
          </h2>

          <p className="relative z-10 text-xs sm:text-sm text-neutral-400 max-w-xl font-normal leading-relaxed">
            NOVAIRE represents a bold perspective on contemporary British fashion. Built around individuality, craftsmanship, and timeless design, we create pieces that make a statement without saying too much.
          </p>

          <button
            onClick={() => {
              onCategoryChange('all');
              const el = document.getElementById('catalog-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="relative z-10 px-8 py-4 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            DISCOVER NOVAIRE ↗
          </button>
        </div>
      </section>

      {/* ================= 6. COMPLETE PRODUCT CATALOG & FILTERS ================= */}
      <section id="catalog-grid" className="max-w-[1536px] mx-auto px-4 sm:px-8 md:px-12 pt-16">
        
        {/* Controls Bar: Category Pills, Gender Tabs, Sort & Filter Drawer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => onCategoryChange(c.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === c.value
                    ? 'bg-[#F15A0A] text-white shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Gender Filter Tabs */}
            <div className="flex rounded-full bg-neutral-900 p-1 border border-neutral-800 text-xs font-semibold uppercase">
              {['all', 'men', 'women'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g as any)}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedGender === g ? 'bg-[#F15A0A] text-white font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1.5 text-xs text-neutral-300">
              <ArrowUpDown size={13} className="text-[#F15A0A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer text-xs uppercase"
              >
                <option value="newest" className="bg-neutral-900">Newest In</option>
                <option value="popularity" className="bg-neutral-900">Most Popular</option>
                <option value="price-asc" className="bg-neutral-900">Price: Low to High (£)</option>
                <option value="price-desc" className="bg-neutral-900">Price: High to Low (£)</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase transition-colors cursor-pointer ${
                showFilterDrawer ? 'bg-[#F15A0A] text-white border-[#F15A0A]' : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal size={13} />
              Refine Filters
            </button>
          </div>

        </div>

        {/* Collapsible Filter Tray */}
        {showFilterDrawer && (
          <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 my-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            
            {/* Search */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">SEARCH GARMENTS</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="e.g. Bomber, Wool, Hoodie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-8 pr-3 py-2 text-white text-xs focus:outline-none focus:border-[#F15A0A]"
                />
              </div>
            </div>

            {/* Size Filter */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">UK SIZE (XS - XXL)</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-2.5 py-1 rounded-lg border ${selectedSize === 'all' ? 'bg-[#F15A0A] text-white border-[#F15A0A]' : 'border-neutral-800 text-neutral-400'}`}
                >
                  ALL
                </button>
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-2.5 py-1 rounded-lg border ${selectedSize === sz ? 'bg-[#F15A0A] text-white border-[#F15A0A]' : 'border-neutral-800 text-neutral-400'}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Collection filter */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">COLLECTION</label>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white uppercase text-xs"
              >
                <option value="all">ALL COLLECTIONS</option>
                {collections.map((col) => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter in GBP */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-400">
                <span>PRICE CEILING (£)</span>
                <span className="text-[#F15A0A] font-bold tabular-nums">£{maxPrice}</span>
              </div>
              <input
                type="range"
                min={30}
                max={350}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F15A0A] cursor-pointer"
              />
            </div>

          </div>
        )}

        {/* Results Info */}
        <div className="py-6 flex items-center justify-between text-xs text-neutral-500 font-semibold uppercase tracking-wider">
          <span>SHOWING {filteredProducts.length} ATELIER PIECES</span>
          {searchQuery && <span>Query: "{searchQuery}"</span>}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <span className="text-3xl text-neutral-600">∅</span>
            <p className="font-editorial text-sm font-bold uppercase tracking-wider text-neutral-300">
              NO GARMENTS MATCH YOUR CRITERIA
            </p>
            <p className="text-xs text-neutral-500">
              Try adjusting your size, price ceiling, or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedGender('all');
                setSelectedSize('all');
                setSelectedCollection('all');
                setMaxPrice(350);
                setSearchQuery('');
                onCategoryChange('all');
              }}
              className="px-5 py-2 bg-white text-black hover:bg-[#F15A0A] hover:text-white text-xs font-bold uppercase rounded-xl"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickAdd={onQuickAdd}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

      </section>

      {/* ================= 7. NEWSLETTER SECTION ================= */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-28">
        <div className="rounded-3xl bg-[#161616] border border-neutral-800 p-10 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#F15A0A]">
            UK DISPATCHES & ARCHIVE ACCESS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            BE PART OF THE NOVAIRE WORLD.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            Receive private preview access to limited seasonal runs, lookbooks, and London salon invitations before public release.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-5 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#F15A0A]"
            />
            <button
              type="submit"
              className="px-7 py-3 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all cursor-pointer shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>

          {newsletterSubscribed && (
            <p className="text-xs text-emerald-400 font-semibold animate-fadeIn">
              ✓ Welcome to NOVAIRE London Privé. Confirmation email dispatched.
            </p>
          )}
        </div>
      </section>

    </div>
  );
};

export default ShoppingView;
