import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: (couponCode?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // UK Coupons: NOVAIRE10 (10%), LONDONFIRST (£15 off £75+), STUDIO20 (20% off £150+)
  let discountAmount = 0;
  if (appliedCoupon === 'NOVAIRE10') {
    discountAmount = Number((subtotal * 0.1).toFixed(2));
  } else if (appliedCoupon === 'LONDONFIRST' && subtotal >= 75) {
    discountAmount = 15.00;
  } else if (appliedCoupon === 'STUDIO20' && subtotal >= 150) {
    discountAmount = Number((subtotal * 0.2).toFixed(2));
  }

  const freeShippingThreshold = 80.00;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 4.99;
  const total = Number(Math.max(0, subtotal - discountAmount + shippingFee).toFixed(2));
  const vatAmount = Number(((total / 1.2) * 0.2).toFixed(2));
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'NOVAIRE10') {
      setAppliedCoupon('NOVAIRE10');
      setCouponError(null);
    } else if (code === 'LONDONFIRST') {
      if (subtotal < 75) {
        setCouponError('Minimum bag value for LONDONFIRST is £75.00');
        return;
      }
      setAppliedCoupon('LONDONFIRST');
      setCouponError(null);
    } else if (code === 'STUDIO20') {
      if (subtotal < 150) {
        setCouponError('Minimum bag value for STUDIO20 is £150.00');
        return;
      }
      setAppliedCoupon('STUDIO20');
      setCouponError(null);
    } else {
      setCouponError('Invalid promotion code. Try NOVAIRE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm select-none">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111111] border-l border-neutral-800 text-white flex flex-col justify-between shadow-2xl relative">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-lg font-bold tracking-tight uppercase">
                SHOPPING BAG
              </span>
              <span className="text-xs text-neutral-400 tabular-nums">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} ITEMS)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* UK Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-neutral-950 border-b border-neutral-800 text-xs">
            <div className="flex items-center justify-between font-semibold pb-1.5">
              <span>{isFreeShipping ? 'FREE ROYAL MAIL TRACKED UNLOCKED' : `ADD ${formatGBP(freeShippingThreshold - subtotal)} FOR FREE UK SHIPPING`}</span>
              <span className="text-[#F15A0A] font-bold">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F15A0A] transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <span className="text-4xl text-neutral-600">∅</span>
                <p className="font-editorial text-sm font-bold uppercase tracking-wider text-neutral-300">
                  YOUR BAG IS CURRENTLY EMPTY
                </p>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Discover our architectural British outerwear, heavy tees, and tailored trousers.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-white text-black hover:bg-[#F15A0A] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  EXPLORE RUNWAY PIECES
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 items-center"
                >
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-xl bg-neutral-950 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold uppercase text-white line-clamp-1">
                      {item.product.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                      <span>UK SIZE: {item.selectedSize}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <span 
                          className="w-2 h-2 rounded-full inline-block border border-neutral-600" 
                          style={{ backgroundColor: item.selectedColor.hex }} 
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                    <div className="font-editorial font-bold text-sm text-white tabular-nums pt-1">
                      {formatGBP(item.product.price * item.quantity)}
                    </div>
                    
                    {/* Steppers & Remove */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-neutral-700 rounded-lg overflow-hidden bg-neutral-950">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary & Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
              
              {/* Promotion Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-2.5 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. NOVAIRE10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-8 pr-3 py-2 text-xs uppercase text-white placeholder-neutral-500 focus:outline-none focus:border-[#F15A0A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-800 hover:bg-[#F15A0A] hover:text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-[11px] text-[#F15A0A] font-semibold pt-1">
                    ✓ Applied: {appliedCoupon}
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400 pt-1">
                    {couponError}
                  </p>
                )}
              </form>

              {/* Subtotal breakdown with UK VAT note */}
              <div className="space-y-1.5 text-xs text-neutral-400 border-t border-neutral-900 pt-3">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-white tabular-nums">{formatGBP(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#F15A0A]">
                    <span>DISCOUNT ({appliedCoupon})</span>
                    <span className="font-bold tabular-nums">-{formatGBP(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ROYAL MAIL TRACKED 48</span>
                  <span className="text-white font-semibold">
                    {isFreeShipping ? 'FREE' : formatGBP(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500">
                  <span>Includes UK VAT (20%)</span>
                  <span className="tabular-nums">{formatGBP(vatAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white border-t border-neutral-800 pt-2 font-editorial">
                  <span>FINAL ORDER TOTAL</span>
                  <span className="tabular-nums">{formatGBP(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onProceedToCheckout(appliedCoupon || undefined);
                }}
                className="w-full py-4 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.25em] uppercase rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                PROCEED TO UK CHECKOUT
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 uppercase tracking-widest">
                <ShieldCheck size={13} className="text-[#F15A0A]" />
                STRIPE 3D SECURE ENCRYPTED CHECKOUT
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
