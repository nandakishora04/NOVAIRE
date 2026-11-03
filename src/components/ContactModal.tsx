import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-lg bg-[#111111] border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#F15A0A] uppercase">
              LONDON CLIENT SERVICES
            </span>
            <h3 className="font-editorial text-lg font-bold uppercase tracking-tight text-white">
              CONNECT WITH NOVAIRE ATELIER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 size={40} className="text-[#F15A0A] mx-auto" />
            <h4 className="font-editorial text-base font-bold uppercase text-white">
              DISPATCH TRANSMITTED
            </h4>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              Our London client concierge will respond to your email within four business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-semibold text-neutral-400">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Oliver Sterling"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F15A0A] mt-1"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold text-neutral-400">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.co.uk"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F15A0A] mt-1"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold text-neutral-400">Message / Inquiry</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Private salon appointments, styling advice, or bespoke tailoring..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-white focus:outline-none focus:border-[#F15A0A] mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#F15A0A] text-white hover:bg-[#d94e05] font-editorial text-xs font-bold tracking-[0.2em] uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send size={14} />
              TRANSMIT TO LONDON CONCIERGE ↗
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
          <p className="flex items-center gap-2">
            <MapPin size={12} className="text-[#F15A0A]" />
            NOVAIRE Atelier, 24 Redchurch Street, Shoreditch, London E2 7DD
          </p>
          <p className="flex items-center gap-2">
            <Phone size={12} className="text-[#F15A0A]" />
            Direct Concierge: +44 (0) 20 7946 0912
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
