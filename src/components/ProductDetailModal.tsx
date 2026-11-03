import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Truck, Check, Sparkles, Ruler } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { storeService } from '../services/storeService';
import { SizeGuideModal } from './SizeGuideModal';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', color: ProductColor, quantity: number) => void;
  onBuyNow: (product: Product, size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL', color: ProductColor, quantity: number) => void;
  onSelectRelated: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectRelated,
  allProducts
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.primaryImage);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping' | 'reviews'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [ukPostcodeInput, setUkPostcodeInput] = useState('');
  const [postcodeResult, setPostcodeResult] = useState<{ valid: boolean; message: string; estimatedDays: string } | null>(null);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const images = [product.primaryImage, product.secondaryImage, ...product.galleryImages];

  // UK GBP currency formatting
  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handlePostcodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = storeService.checkUKPostcode(ukPostcodeInput.trim());
    setPostcodeResult(res);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setNewReviewAuthor('');
      setNewReviewComment('');
    }, 2000);
  };

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md select-none">
      
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div 
        className="relative w-full max-w-6xl bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-white flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#111111]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#F15A0A]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-bold">
              NOVAIRE LONDON ATELIER · {product.collection}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close Product View"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-12">
          
          {/* Top Two-Column Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Gallery & Thumbnails (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
              
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
                {images.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      selectedImage === imgUrl 
                        ? 'border-[#F15A0A] scale-105 shadow-md' 
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Angle ${i + 1}`} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

              {/* Main Display Stage with Zoom */}
              <div 
                className="relative flex-1 aspect-[4/5] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 cursor-crosshair group"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={selectedImage}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
                  }`}
                />

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider text-neutral-300 pointer-events-none">
                  {isZoomed ? 'CLICK TO RESET' : 'CLICK TO EXPAND'}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contiguous Purchase Module (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              {/* Title & Collection */}
              <div className="space-y-2 border-b border-neutral-800 pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#F15A0A]">
                    {product.gender} · {product.category}
                  </span>
                  <span className="text-xs font-semibold text-neutral-400">
                    ★ {product.rating} ({product.reviewsCount} reviews)
                  </span>
                </div>

                <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  {product.title}
                </h1>

                <p className="text-xs text-neutral-400">
                  {product.subtitle}
                </p>

                {/* Price block */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-editorial text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {formatGBP(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-neutral-500 line-through tabular-nums">
                        {formatGBP(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold tracking-wider text-[#F15A0A] uppercase px-2 py-0.5 rounded bg-[#F15A0A]/10 border border-[#F15A0A]/30">
                        SAVE {product.discount}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400">
                  Prices include 20% UK VAT. Free Royal Mail Tracked shipping on orders over £80.
                </p>
              </div>

              {/* Colour Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase font-semibold">
                  <span className="text-neutral-400">COLOUR:</span>
                  <span className="text-white">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                        selectedColor.name === c.name 
                          ? 'border-[#F15A0A] scale-110 shadow-lg' 
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-neutral-700"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector with UK Size Guide */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs tracking-wider uppercase font-semibold">
                  <span className="text-neutral-400">UK SIZE:</span>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[#F15A0A] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    <Ruler size={13} />
                    UK SIZE GUIDE
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#F15A0A] text-white shadow-md'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & UK Stock Status */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    In Stock at London Atelier ({product.stockCount} left)
                  </span>
                  <span className="text-[10px] text-neutral-500">Order by 2pm for same-day dispatch</span>
                </div>
              </div>

              {/* Primary Actions: Add to Bag & Buy Now */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity)}
                    className="flex-1 py-3.5 bg-white text-black hover:bg-[#F15A0A] hover:text-white font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                    ADD TO BAG
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-[#F15A0A] text-white border-[#F15A0A]' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <button
                  onClick={() => onBuyNow(product, selectedSize, selectedColor, quantity)}
                  className="w-full py-3.5 bg-neutral-900 border border-neutral-700 hover:border-[#F15A0A] text-white font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all cursor-pointer"
                >
                  BUY NOW ↗
                </button>
              </div>

              {/* UK Postcode Delivery Checker */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-300">
                  <Truck size={14} className="text-[#F15A0A]" />
                  CHECK UK POSTCODE DELIVERY
                </div>
                <form onSubmit={handlePostcodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={9}
                    placeholder="e.g. SW1A 1AA or EC1A 1BB"
                    value={ukPostcodeInput}
                    onChange={(e) => setUkPostcodeInput(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#F15A0A] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-800 hover:bg-[#F15A0A] hover:text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    CHECK
                  </button>
                </form>

                {postcodeResult && (
                  <div className={`text-xs p-2.5 rounded-lg border ${
                    postcodeResult.valid ? 'bg-neutral-900 border-neutral-700 text-neutral-300' : 'bg-red-950/40 border-red-900 text-red-400'
                  }`}>
                    <p className="font-semibold">{postcodeResult.message}</p>
                    {postcodeResult.estimatedDays && (
                      <p className="text-[11px] text-[#F15A0A] font-semibold mt-1">
                        Estimated Transit: {postcodeResult.estimatedDays}
                      </p>
                    )}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Additional Information Tabs */}
          <div className="border-t border-neutral-800 pt-8 space-y-6">
            <div className="flex border-b border-neutral-800 gap-8 overflow-x-auto">
              {[
                { id: 'details', label: 'DESCRIPTION & SILHOUETTE' },
                { id: 'fabric', label: 'FABRIC & SUSTAINABILITY' },
                { id: 'shipping', label: 'UK ROYAL MAIL & DPD SHIPPING' },
                { id: 'reviews', label: `CLIENT REVIEWS (${product.reviewsCount})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors whitespace-nowrap cursor-pointer relative ${
                    activeTab === tab.id ? 'text-[#F15A0A]' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F15A0A] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            {activeTab === 'details' && (
              <div className="max-w-3xl space-y-4 text-sm text-neutral-300 leading-relaxed">
                <p>{product.description}</p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#F15A0A] uppercase tracking-widest">
                  <Sparkles size={14} /> Crafted in limited British runs to eliminate waste
                </div>
              </div>
            )}

            {activeTab === 'fabric' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div className="space-y-3">
                  <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-white">
                    FABRIC COMPOSITION
                  </h4>
                  <ul className="space-y-1.5 text-neutral-400 text-xs">
                    {product.fabricDetails.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#F15A0A]">·</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-white">
                    CARE & PRESERVATION
                  </h4>
                  <ul className="space-y-1.5 text-neutral-400 text-xs">
                    {product.careInstructions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#F15A0A]">·</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-3xl space-y-4 text-xs text-neutral-300 leading-relaxed">
                <p>
                  <strong>UK Delivery:</strong> Complimentary Royal Mail Tracked 24 on all UK mainland orders over £80. Standard orders below £80 are £4.99 (Tracked 48) or £7.99 (Tracked 24).
                </p>
                <p>
                  <strong>London Atelier Dispatch:</strong> Orders placed before 2:00 PM GMT Monday–Friday are dispatched same day from our Shoreditch atelier.
                </p>
                <p>
                  <strong>Statutory 14-Day UK Return Right:</strong> In accordance with UK Consumer Contracts Regulations, you have 14 days from delivery to cancel or return garments with prepaid Royal Mail label.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Submit Review */}
                <form onSubmit={handleAddReview} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4 max-w-2xl">
                  <h4 className="font-editorial text-xs font-bold uppercase tracking-wider text-white">
                    SHARE YOUR VERIFIED ATELIER EXPERIENCE
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name (e.g. Julian T.)"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#F15A0A]"
                      required
                    />
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A]"
                    >
                      <option value={5}>★★★★★ (5/5 Exceptional)</option>
                      <option value={4}>★★★★☆ (4/5 Great)</option>
                      <option value={3}>★★★☆☆ (3/5 Average)</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Describe the fabric weight, British tailoring fit, and drape..."
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#F15A0A]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-white text-black hover:bg-[#F15A0A] hover:text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all cursor-pointer"
                  >
                    POST REVIEW
                  </button>
                  {reviewSubmitted && (
                    <span className="text-xs text-emerald-400 font-semibold ml-3">
                      ✓ Verified review recorded!
                    </span>
                  )}
                </form>

                {/* Review items */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Julian Thorne (London)</span>
                      <span className="text-neutral-500">Verified Client · 28 February 2026</span>
                    </div>
                    <div className="text-xs text-[#F15A0A] my-1">★★★★★</div>
                    <p className="text-xs text-neutral-300">
                      The volume on this bomber is unlike anything on Regent Street. The Japanese technical nylon holds its cut with absolute precision, and the subtle orange interior pull tab is an exquisite touch.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-neutral-800 pt-8 space-y-4">
              <h3 className="font-editorial text-lg font-bold uppercase tracking-tight text-white">
                CURATED TO COMPLETE THE LOOK
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectRelated(rel);
                      setSelectedImage(rel.primaryImage);
                    }}
                    className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-[#F15A0A] cursor-pointer flex gap-3 items-center group transition-colors"
                  >
                    <img 
                      src={rel.primaryImage} 
                      alt={rel.title} 
                      className="w-16 h-16 object-cover rounded-xl shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold uppercase text-white truncate group-hover:text-[#F15A0A]">
                        {rel.title}
                      </h4>
                      <p className="text-xs font-bold text-neutral-400 tabular-nums">
                        {formatGBP(rel.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {showSizeGuide && (
        <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
      )}
    </div>
  );
};

export default ProductDetailModal;
