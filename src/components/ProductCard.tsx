import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onQuickAdd: (product: Product, size: any, color: any) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Format currency in GBP (£)
  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleSizeSelect = (e: React.MouseEvent, size: any) => {
    e.stopPropagation();
    onQuickAdd(product, size, product.colors[0]);
    setShowQuickSizes(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div 
      className="group relative flex flex-col cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
      onClick={() => onSelectProduct(product)}
    >
      {/* Product Image Frame */}
      <div className="relative w-full aspect-[4/5] bg-[#161616] rounded-2xl overflow-hidden border border-neutral-900 group-hover:border-[#F15A0A]/50 transition-all duration-500 shadow-sm">
        
        {/* Primary and Alternate Images with smooth crossfade & subtle zoom */}
        <img
          src={isHovered ? product.secondaryImage : product.primaryImage}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
        />

        {/* Subtle Dark Scrim on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges: NEW / BEST SELLER / SALE */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#F15A0A] text-white text-[10px] font-bold tracking-widest uppercase rounded-sm shadow-md">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2.5 py-1 bg-[#111111]/90 text-[#FFFDF2] text-[10px] font-bold tracking-widest uppercase rounded-sm border border-neutral-700">
              SIGNATURE
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isWishlisted 
              ? 'bg-[#F15A0A] text-white scale-110 shadow-md' 
              : 'bg-black/40 text-white hover:bg-white hover:text-black hover:scale-105'
          }`}
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute bottom-3 inset-x-3 z-10 transition-all duration-300 transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {showQuickSizes ? (
            <div 
              className="bg-[#111111]/95 border border-white/20 p-2 rounded-xl backdrop-blur-md flex items-center justify-center gap-1.5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-bold tracking-wider text-neutral-400 mr-1 uppercase">UK SIZE:</span>
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleSizeSelect(e, sz)}
                  className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-[#F15A0A] hover:text-white text-white text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
                >
                  {sz}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickSizes(true);
              }}
              className="w-full py-2.5 bg-white text-black hover:bg-[#F15A0A] hover:text-white text-xs font-bold tracking-[0.2em] uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              {justAdded ? (
                <>
                  <Check size={14} />
                  ADDED TO BAG
                </>
              ) : (
                <>
                  <Plus size={14} />
                  QUICK ADD
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-3.5 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-neutral-500 font-medium">
          <span>{product.collection}</span>
          <span className="text-neutral-400">★ {product.rating}</span>
        </div>

        <h4 className="font-editorial text-sm sm:text-base font-bold uppercase tracking-tight text-white line-clamp-1 group-hover:text-[#F15A0A] transition-colors">
          {product.title}
        </h4>

        {/* Price in GBP & Color Swatches */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="font-editorial font-bold text-sm sm:text-base text-white tabular-nums">
              {formatGBP(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-500 line-through tabular-nums">
                {formatGBP(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full border border-neutral-700"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
