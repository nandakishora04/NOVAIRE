import React, { useState } from 'react';
import { X, ShieldCheck, Lock, ArrowLeft, CreditCard, Smartphone, Banknote, Building2 } from 'lucide-react';
import { CartItem, UKShippingAddress, Order } from '../types';
import { storeService } from '../services/storeService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedCoupon?: string;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedCoupon,
  onOrderSuccess
}) => {
  const defaultUser = storeService.getUser();
  const defaultAddress: UKShippingAddress = defaultUser.savedAddresses[0] || {
    fullName: defaultUser.name || 'Oliver Sterling',
    phone: defaultUser.phone || '+44 7911 884422',
    email: defaultUser.email || 'oliver.sterling@london-design.co.uk',
    addressLine1: '24 Redchurch Street',
    addressLine2: 'Studio 4',
    city: 'London',
    county: 'Greater London',
    postcode: 'E2 7DD',
    country: 'United Kingdom'
  };

  const [shippingData, setShippingData] = useState<UKShippingAddress>(defaultAddress);
  const [shippingMethod, setShippingMethod] = useState<'royal_mail_48' | 'royal_mail_24' | 'dpd_next_day'>('royal_mail_24');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'card' | 'apple_pay' | 'google_pay' | 'klarna'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'stripe_3ds_overlay' | 'verifying'>('form');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon === 'NOVAIRE10') {
    discountAmount = Number((subtotal * 0.1).toFixed(2));
  } else if (appliedCoupon === 'LONDONFIRST' && subtotal >= 75) {
    discountAmount = 15.00;
  } else if (appliedCoupon === 'STUDIO20' && subtotal >= 150) {
    discountAmount = Number((subtotal * 0.2).toFixed(2));
  }

  const freeShippingThreshold = 80.00;
  let shippingFee = 0;
  if (shippingMethod === 'royal_mail_48') {
    shippingFee = subtotal >= freeShippingThreshold ? 0 : 4.99;
  } else if (shippingMethod === 'royal_mail_24') {
    shippingFee = subtotal >= freeShippingThreshold ? 0 : 7.99;
  } else if (shippingMethod === 'dpd_next_day') {
    shippingFee = 9.99;
  }

  const total = Number(Math.max(0, subtotal - discountAmount + shippingFee).toFixed(2));
  const vatAmount = Number(((total / 1.2) * 0.2).toFixed(2));

  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('stripe_3ds_overlay');
  };

  const handleSimulateStripeAuthorized = () => {
    setPaymentStep('verifying');
    setIsProcessing(true);

    setTimeout(() => {
      const order = storeService.createOrder(
        cartItems,
        shippingData,
        paymentMethod,
        shippingMethod,
        appliedCoupon
      );
      setIsProcessing(false);
      onOrderSuccess(order);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-55 overflow-y-auto bg-black/90 backdrop-blur-md select-none flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-4xl bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white my-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="font-editorial text-sm sm:text-base font-bold tracking-tight uppercase">
              UK SECURE CHECKOUT · LONDON ATELIER
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold uppercase">
            <Lock size={12} className="text-[#F15A0A]" />
            Stripe 256-Bit SSL
          </div>
        </div>

        {/* Form Body */}
        {paymentStep === 'form' && (
          <form onSubmit={handleSubmitOrder} className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Columns: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-[#F15A0A]">
                  01. CONTACT DETAILS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                      placeholder="e.g. Oliver Sterling"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">UK Mobile (+44) *</label>
                    <input
                      type="tel"
                      required
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                      placeholder="+44 7911 123456"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Email for Royal Mail Dispatch Tracking *</label>
                    <input
                      type="email"
                      required
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                      placeholder="client@london-atelier.co.uk"
                    />
                  </div>
                </div>
              </div>

              {/* UK Shipping Address */}
              <div className="space-y-3 pt-2 border-t border-neutral-900">
                <h3 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-[#F15A0A]">
                  02. UK DELIVERY ADDRESS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Address Line 1 *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.addressLine1}
                      onChange={(e) => setShippingData({ ...shippingData, addressLine1: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                      placeholder="e.g. 18 Mount Street"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={shippingData.addressLine2 || ''}
                      onChange={(e) => setShippingData({ ...shippingData, addressLine2: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                      placeholder="Apartment / Flat / Suite"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Town / City *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                      placeholder="London"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">County *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.county}
                      onChange={(e) => setShippingData({ ...shippingData, county: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1"
                      placeholder="Greater London"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">UK Postcode *</label>
                    <input
                      type="text"
                      required
                      value={shippingData.postcode}
                      onChange={(e) => setShippingData({ ...shippingData, postcode: e.target.value.toUpperCase() })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F15A0A] mt-1 uppercase"
                      placeholder="e.g. W1K 2RN"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Country</label>
                    <input
                      type="text"
                      readOnly
                      value="United Kingdom"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-400 mt-1 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* UK Shipping Delivery Method Selection */}
              <div className="space-y-3 pt-2 border-t border-neutral-900">
                <h3 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-[#F15A0A]">
                  03. SHIPPING SERVICE
                </h3>
                <div className="space-y-2">
                  <label 
                    onClick={() => setShippingMethod('royal_mail_24')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'royal_mail_24' ? 'bg-[#F15A0A]/10 border-[#F15A0A] text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="text-xs">
                      <p className="font-bold text-white uppercase">Royal Mail Tracked 24 (Next Business Day)</p>
                      <p className="text-[10px] text-neutral-400">Insured express delivery directly from London Atelier</p>
                    </div>
                    <span className="font-bold tabular-nums">
                      {subtotal >= 80 ? 'FREE' : '£7.99'}
                    </span>
                  </label>

                  <label 
                    onClick={() => setShippingMethod('royal_mail_48')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'royal_mail_48' ? 'bg-[#F15A0A]/10 border-[#F15A0A] text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="text-xs">
                      <p className="font-bold text-white uppercase">Royal Mail Tracked 48 (2-3 Business Days)</p>
                      <p className="text-[10px] text-neutral-400">Standard insured UK mainland delivery</p>
                    </div>
                    <span className="font-bold tabular-nums">
                      {subtotal >= 80 ? 'FREE' : '£4.99'}
                    </span>
                  </label>

                  <label 
                    onClick={() => setShippingMethod('dpd_next_day')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      shippingMethod === 'dpd_next_day' ? 'bg-[#F15A0A]/10 border-[#F15A0A] text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="text-xs">
                      <p className="font-bold text-white uppercase">DPD UK Carbon-Neutral Next Day</p>
                      <p className="text-[10px] text-neutral-400">1-hour delivery slot with live GPS tracking</p>
                    </div>
                    <span className="font-bold tabular-nums">£9.99</span>
                  </label>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-neutral-900">
                <h3 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-[#F15A0A]">
                  04. PAYMENT OPTION
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'stripe'
                        ? 'border-[#F15A0A] bg-[#F15A0A]/10 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    <ShieldCheck size={18} className="text-[#F15A0A] shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase">Stripe Checkout</div>
                      <div className="text-[10px] text-neutral-400">Visa / Mastercard / Amex</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#F15A0A] bg-[#F15A0A]/10 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    <Smartphone size={18} className="text-neutral-200 shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase">Apple / Google Pay</div>
                      <div className="text-[10px] text-neutral-400">1-Touch Biometric Auth</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'klarna'
                        ? 'border-[#F15A0A] bg-[#F15A0A]/10 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    <Building2 size={18} className="text-pink-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase">Klarna Pay in 3</div>
                      <div className="text-[10px] text-neutral-400">3x {formatGBP(total / 3)} No fees</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#F15A0A] bg-[#F15A0A]/10 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                    }`}
                  >
                    <CreditCard size={18} className="text-purple-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase">Direct Debit Card</div>
                      <div className="text-[10px] text-neutral-400">UK Bank Issued Cards</div>
                    </div>
                  </button>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Order Review & Final Authorization CTA */}
            <div className="lg:col-span-5 bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-800 pb-3">
                  ORDER SUMMARY ({cartItems.length} ITEMS)
                </h4>

                {/* Items preview list */}
                <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs">
                      <img 
                        src={item.product.primaryImage} 
                        alt={item.product.title} 
                        className="w-12 h-14 object-cover rounded-lg bg-neutral-950 shrink-0"
                      />
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold uppercase text-white truncate">{item.product.title}</p>
                        <p className="text-[10px] text-neutral-400">UK {item.selectedSize} · {item.selectedColor.name} · Qty: {item.quantity}</p>
                        <p className="font-editorial font-bold text-neutral-300 tabular-nums">{formatGBP(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial breakdown with UK VAT */}
                <div className="space-y-2 text-xs text-neutral-400 border-t border-neutral-800 pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-white tabular-nums">{formatGBP(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#F15A0A] font-semibold">
                      <span>Discount ({appliedCoupon})</span>
                      <span className="tabular-nums">-{formatGBP(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping Service</span>
                    <span className="text-white font-semibold">
                      {shippingFee === 0 ? 'FREE' : formatGBP(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-neutral-500">
                    <span>Includes UK VAT (20%)</span>
                    <span className="tabular-nums">{formatGBP(vatAmount)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white border-t border-neutral-800 pt-2 font-editorial">
                    <span>TOTAL PAYABLE</span>
                    <span className="tabular-nums">{formatGBP(total)}</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.25em] uppercase rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    'AUTHORIZING VIA STRIPE...'
                  ) : (
                    `PAY ${formatGBP(total)} VIA ${paymentMethod.replace('_', ' ').toUpperCase()} ↗`
                  )}
                </button>
                <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest">
                  UK VAT Reg: GB 428 9910 44 · 14-Day Statutory Returns
                </p>
              </div>

            </div>

          </form>
        )}

        {/* STRIPE 3D SECURE MODAL */}
        {paymentStep === 'stripe_3ds_overlay' && (
          <div className="p-8 max-w-md mx-auto text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#F15A0A]/20 text-[#F15A0A] border border-[#F15A0A]/30 flex items-center justify-center mx-auto">
              <ShieldCheck size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-[#F15A0A] uppercase">
                STRIPE UK 3D SECURE 2.0 (SCA VERIFICATION)
              </span>
              <h3 className="font-editorial text-xl font-bold uppercase text-white">
                AUTHORISE {formatGBP(total)}
              </h3>
              <p className="text-xs text-neutral-400">
                Merchant: NOVAIRE APPAREL UK LTD (London Atelier)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Method:</span>
                <span className="text-white font-bold uppercase">{paymentMethod.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Client:</span>
                <span className="text-white font-bold">{shippingData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Destination:</span>
                <span className="text-white font-bold">{shippingData.postcode}, UK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">VAT Status:</span>
                <span className="text-emerald-400 font-semibold">20% UK VAT Included</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSimulateStripeAuthorized}
                className="w-full py-3.5 bg-[#F15A0A] hover:bg-[#d94e05] text-white font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all cursor-pointer shadow-lg"
              >
                CONFIRM 3D SECURE PAYMENT & VERIFY SIGNATURE ↗
              </button>
              <button
                type="button"
                onClick={() => setPaymentStep('form')}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Cancel and return to bag
              </button>
            </div>
          </div>
        )}

        {/* VERIFYING SIGNATURE STATE */}
        {paymentStep === 'verifying' && (
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#F15A0A] border-t-transparent animate-spin mx-auto" />
            <h3 className="font-editorial text-sm font-bold tracking-[0.2em] uppercase text-white">
              VERIFYING STRIPE PAYMENT SIGNATURE & GENERATING ROYAL MAIL AWB...
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Confirming transaction tokens with Stripe UK, reserving inventory at Shoreditch Atelier, and allocating Royal Mail Tracked barcode.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
