import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Package, Truck, Home, MapPin } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { storeService } from '../services/storeService';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder?: Order | null;
  onViewProduct?: (productId: string) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  activeOrder,
  onViewProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(activeOrder || null);
  const [notFound, setNotFound] = useState(false);

  React.useEffect(() => {
    if (activeOrder) {
      setSelectedOrder(activeOrder);
    } else {
      const orders = storeService.getOrders();
      if (orders.length > 0) {
        setSelectedOrder(orders[0]);
      }
    }
  }, [activeOrder]);

  if (!isOpen) return null;

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const order = storeService.getOrderById(searchQuery.trim());
    if (order) {
      setSelectedOrder(order);
    } else {
      setNotFound(true);
    }
  };

  const steps: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
    { key: 'placed', label: 'Order Placed', icon: <Clock size={16} /> },
    { key: 'confirmed', label: 'Payment Confirmed', icon: <CheckCircle2 size={16} /> },
    { key: 'processing', label: 'London Atelier QA', icon: <Package size={16} /> },
    { key: 'packed', label: 'Archival Boxed', icon: <Package size={16} /> },
    { key: 'shipped', label: 'Royal Mail Dispatched', icon: <Truck size={16} /> },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: <MapPin size={16} /> },
    { key: 'delivered', label: 'Signed & Delivered', icon: <Home size={16} /> },
  ];

  const getStepIndex = (status: OrderStatus) => {
    return steps.findIndex(s => s.key === status);
  };

  const currentStepIndex = selectedOrder ? getStepIndex(selectedOrder.status) : -1;

  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleAdvanceStatus = () => {
    if (!selectedOrder) return;
    const nextIndex = (currentStepIndex + 1) % steps.length;
    const nextStatus = steps[nextIndex].key;
    const updated = storeService.updateOrderStatus(selectedOrder.id, nextStatus);
    if (updated) setSelectedOrder({ ...updated });
  };

  return (
    <div className="fixed inset-0 z-55 overflow-y-auto bg-black/90 backdrop-blur-md select-none flex items-center justify-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-3xl bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-white my-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F15A0A]" />
            <span className="font-editorial text-sm sm:text-base font-bold tracking-tight uppercase">
              ROYAL MAIL & ATELIER ORDER TRACKING
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Search by Order ID Form */}
          <form onSubmit={handleSearchOrder} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-3 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by UK Order ID (e.g. NOV-UK-7291)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#F15A0A] uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F15A0A] text-white hover:bg-[#d94e05] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              TRACK
            </button>
          </form>

          {notFound && (
            <p className="text-xs text-red-400 text-center">
              No order found matching "{searchQuery}". Please verify your UK order reference.
            </p>
          )}

          {selectedOrder ? (
            <div className="space-y-8">
              
              {/* Order Meta Card */}
              <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] tracking-widest text-[#F15A0A] uppercase font-bold">
                    ORDER REFERENCE
                  </div>
                  <div className="font-editorial text-xl font-bold tracking-tight text-white">
                    {selectedOrder.orderNumber}
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                    ROYAL MAIL BARCODE AWB
                  </div>
                  <div className="text-xs font-mono font-bold text-white bg-black px-2.5 py-1 rounded border border-neutral-700 inline-block mt-0.5">
                    {selectedOrder.trackingNumber}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                    Service: {selectedOrder.shippingMethod === 'dpd_next_day' ? 'DPD Carbon-Neutral' : 'Royal Mail Tracked 24'}
                  </div>
                </div>
              </div>

              {/* 7-Stage Progression Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                    SHIPMENT PROGRESSION
                  </h4>
                  <button
                    onClick={handleAdvanceStatus}
                    className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider border border-neutral-800 hover:border-[#F15A0A] px-2.5 py-1 rounded cursor-pointer"
                    title="Simulate dispatch progression stage"
                  >
                    Simulate Next Stage →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {steps.map((st, i) => {
                    const isCompleted = i <= currentStepIndex;
                    const isCurrent = i === currentStepIndex;

                    return (
                      <div 
                        key={st.key}
                        className={`p-3 rounded-xl border flex flex-col items-center text-center space-y-2 transition-all ${
                          isCurrent
                            ? 'bg-[#F15A0A] text-white border-[#F15A0A] shadow-lg'
                            : isCompleted
                            ? 'bg-neutral-900 border-neutral-700 text-white'
                            : 'bg-neutral-950 border-neutral-900 text-neutral-600'
                        }`}
                      >
                        <div className={`p-1.5 rounded-full ${isCurrent ? 'bg-black text-white' : isCompleted ? 'bg-white/10 text-white' : 'bg-neutral-900 text-neutral-600'}`}>
                          {st.icon}
                        </div>
                        <span className="text-[10px] font-bold tracking-wider uppercase leading-tight">
                          {st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Timeline History */}
              <div className="space-y-3">
                <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                  ACTIVITY LOG & CARRIER MILESTONES
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {selectedOrder.timeline.map((event, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/80 flex items-start gap-3 text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#F15A0A] mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-white uppercase">{event.description}</span>
                          <span className="text-[10px] text-neutral-500">
                            {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GMT
                          </span>
                        </div>
                        {event.location && (
                          <span className="text-[10px] text-neutral-400">Location: {event.location}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800 text-xs">
                <div>
                  <h5 className="font-editorial font-bold uppercase text-[#F15A0A] text-[11px] mb-1">
                    UK DESTINATION
                  </h5>
                  <p className="font-bold text-white">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="text-neutral-400">{selectedOrder.shippingAddress.addressLine1}</p>
                  {selectedOrder.shippingAddress.addressLine2 && <p className="text-neutral-400">{selectedOrder.shippingAddress.addressLine2}</p>}
                  <p className="text-neutral-400">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.county} - {selectedOrder.shippingAddress.postcode}</p>
                  <p className="text-neutral-400">{selectedOrder.shippingAddress.phone}</p>
                </div>

                <div>
                  <h5 className="font-editorial font-bold uppercase text-[#F15A0A] text-[11px] mb-1">
                    PARCEL CONTENTS
                  </h5>
                  <div className="space-y-1.5">
                    {selectedOrder.items.map((it, i) => (
                      <div key={i} className="flex justify-between text-neutral-300">
                        <span className="truncate pr-2">{it.quantity}x {it.product.title} (UK {it.selectedSize})</span>
                        <span className="font-bold tabular-nums shrink-0">{formatGBP(it.product.price * it.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-neutral-800 pt-1 font-bold text-white flex justify-between">
                      <span>TOTAL BILLED (INC. VAT):</span>
                      <span className="tabular-nums">{formatGBP(selectedOrder.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No orders selected. Enter your UK order reference above.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default OrderTrackerModal;
