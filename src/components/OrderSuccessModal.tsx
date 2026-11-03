import React from 'react';
import { CheckCircle2, Truck } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onTrackOrder: (order: Order) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onTrackOrder
}) => {
  if (!order) return null;

  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none">
      <div 
        className="relative w-full max-w-lg bg-[#111111] border border-neutral-800 rounded-3xl p-8 sm:p-10 text-white shadow-2xl space-y-6 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#F15A0A]/20 border border-[#F15A0A]/40 text-[#F15A0A] flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F15A0A]">
            STRIPE UK TRANSACTION AUTHORISED
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold uppercase text-white">
            THANK YOU FOR YOUR ORDER
          </h2>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Your garments have been reserved at our London Shoreditch Atelier and allocated for inspection.
          </p>
        </div>

        {/* Order Details box */}
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
            <span className="text-neutral-500">UK Order Reference:</span>
            <span className="font-editorial font-bold text-white text-sm">{order.orderNumber}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-500">Royal Mail Barcode (AWB):</span>
            <span className="font-mono text-[#F15A0A] font-semibold">{order.trackingNumber}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-500">Destination:</span>
            <span className="text-white font-medium">{order.shippingAddress.city}, {order.shippingAddress.postcode}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-500">Total Billed (Inc. 20% VAT):</span>
            <span className="font-editorial font-bold text-white tabular-nums">{formatGBP(order.totalAmount)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onTrackOrder(order);
            }}
            className="w-full py-4 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Truck size={15} />
            TRACK ROYAL MAIL SHIPMENT ↗
          </button>

          <button
            onClick={onClose}
            className="text-xs text-neutral-400 hover:text-white uppercase font-semibold"
          >
            Continue Discovering Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
