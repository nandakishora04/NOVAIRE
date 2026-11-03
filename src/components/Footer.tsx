import React, { useState } from 'react';
import { BrandLogo, BrandSymbol } from './BrandLogo';
import { ArrowUpRight, Mail, Phone, X } from 'lucide-react';

interface FooterProps {
  onNavClick: (item: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenContact }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; content: string[] }> = {
    shipping: {
      title: 'UK SHIPPING & LOGISTICS POLICY',
      content: [
        'Complimentary Royal Mail Tracked 24 on all UK orders exceeding £80.00.',
        'Orders placed before 2:00 PM GMT on business days are dispatched same day from our London Shoreditch Atelier.',
        'Royal Mail Tracked 24 delivery aim: 1 business day. Royal Mail Tracked 48 delivery aim: 2-3 business days.',
        'DPD Carbon-Neutral Next Day courier service includes a 1-hour delivery window with SMS and email tracking notification.'
      ]
    },
    returns: {
      title: '14-DAY UK STATUTORY RETURNS & REFUNDS',
      content: [
        'In compliance with the UK Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, clients have 14 days from delivery to cancel or return garments.',
        'Garments must be unworn, undamaged, and returned in original archival box with security seals intact.',
        'Prepaid Royal Mail return labels are provided for all mainland UK addresses.',
        'Refunds are processed to the original payment method within 3-5 business days upon atelier inspection.'
      ]
    },
    privacy: {
      title: 'UK GDPR & DATA PRIVACY COMPLIANCE',
      content: [
        'NOVAIRE is committed to compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.',
        'We never sell or monetise client data. Information collected is used strictly for fulfilling orders and communicating verified dispatch updates.',
        'Clients have the statutory right to request a copy of their stored data or request complete erasure under the Right to be Forgotten by contacting privacy@novaire.studio.'
      ]
    },
    cookies: {
      title: 'COOKIE DIRECTIVE & PREFERENCES',
      content: [
        'We use essential cookies strictly necessary for shopping bag persistence and secure Stripe 3DS payment verification.',
        'Analytical cookies help us improve user experience and require affirmative user consent under Privacy and Electronic Communications Regulations (PECR).',
        'You can manage or revoke cookie consent at any time via your browser preferences or account portal.'
      ]
    },
    terms: {
      title: 'TERMS OF SERVICE',
      content: [
        'NOVAIRE is the trading name of NOVAIRE APPAREL UK LTD (Company No. 14829104, Registered in England and Wales).',
        'Registered Atelier Office: 24 Redchurch Street, Shoreditch, London E2 7DD, United Kingdom.',
        'UK VAT Registration Number: GB 428 9910 44. All retail prices are displayed inclusive of 20% UK VAT.'
      ]
    },
    faqs: {
      title: 'FREQUENTLY ASKED QUESTIONS (UK)',
      content: [
        'Q: What is the fit of NOVAIRE garments?\nA: Our silhouettes are designed with intentional British architectural relaxation. For a closer fit, select one size smaller than your standard UK size.',
        'Q: Can I visit the London Atelier?\nA: Private styling appointments are available at our Shoreditch atelier by contacting concierge@novaire.studio.',
        'Q: Are duties covered for UK deliveries?\nA: Yes, all garments dispatch from London with full UK VAT included. No import duties or hidden fees apply within the UK.'
      ]
    }
  };

  return (
    <footer className="w-full bg-[#0B0B0B] text-neutral-400 border-t border-neutral-900 select-none">
      
      {/* Top Banner Bar with Official Wordmark & British Flag Tag */}
      <div className="border-b border-neutral-900 py-6 px-6 md:px-12">
        <div className="max-w-[1536px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.25em] uppercase">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" variant="light" />
            <span className="text-[#F15A0A] font-bold">· BEYOND THE ORDINARY</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-neutral-400">
            <span>LONDON ATELIER</span>
            <span>·</span>
            <span>SHOREDITCH</span>
            <span>·</span>
            <span>MAYFAIR</span>
            <span>·</span>
            <span>ROYAL MAIL TRACKED</span>
          </div>
        </div>
      </div>

      {/* Main Directory */}
      <div className="max-w-[1536px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-5">
          <BrandLogo size="lg" variant="light" onClick={() => onNavClick('HOME')} />
          <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
            Contemporary essentials, thoughtful details, and timeless silhouettes. Engineered for those who define their own standard.
          </p>
          <div className="pt-2 text-[11px] text-neutral-500 font-mono space-y-1">
            <p>NOVAIRE APPAREL UK LTD · CO. NO. 14829104</p>
            <p className="text-[#F15A0A]">UK VAT REG: GB 428 9910 44</p>
          </div>
        </div>

        {/* Column 2: Collections */}
        <div className="space-y-3.5 text-xs">
          <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-[#FFFDF2]">
            COLLECTIONS
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li><button onClick={() => onNavClick('all')} className="hover:text-[#F15A0A] transition-colors">All Silhouettes</button></li>
            <li><button onClick={() => onNavClick('men')} className="hover:text-[#F15A0A] transition-colors">Men's Collection</button></li>
            <li><button onClick={() => onNavClick('women')} className="hover:text-[#F15A0A] transition-colors">Women's Collection</button></li>
            <li><button onClick={() => onNavClick('new')} className="hover:text-[#F15A0A] transition-colors">New Arrivals 2026</button></li>
            <li><button onClick={() => onNavClick('collections')} className="hover:text-[#F15A0A] transition-colors">Featured Editions</button></li>
          </ul>
        </div>

        {/* Column 3: Client Services & UK Compliance */}
        <div className="space-y-3.5 text-xs">
          <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-[#FFFDF2]">
            UK CLIENT SERVICES
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li><button onClick={() => setActiveModal('shipping')} className="hover:text-[#F15A0A] transition-colors">Royal Mail & DPD Shipping</button></li>
            <li><button onClick={() => setActiveModal('returns')} className="hover:text-[#F15A0A] transition-colors">14-Day Returns & Exchanges</button></li>
            <li><button onClick={() => setActiveModal('privacy')} className="hover:text-[#F15A0A] transition-colors">UK GDPR & Privacy Policy</button></li>
            <li><button onClick={() => setActiveModal('cookies')} className="hover:text-[#F15A0A] transition-colors">Cookie Policy</button></li>
            <li><button onClick={() => setActiveModal('terms')} className="hover:text-[#F15A0A] transition-colors">Terms & Conditions</button></li>
            <li><button onClick={() => setActiveModal('faqs')} className="hover:text-[#F15A0A] transition-colors">Atelier FAQs</button></li>
          </ul>
        </div>

        {/* Column 4: London Atelier & Socials */}
        <div className="space-y-3.5 text-xs">
          <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-[#FFFDF2]">
            LONDON ATELIER
          </h4>
          <div className="space-y-2 text-neutral-400">
            <p className="flex items-center gap-2">
              <Mail size={13} className="text-[#F15A0A]" />
              concierge@novaire.studio
            </p>
            <p className="flex items-center gap-2">
              <Phone size={13} className="text-[#F15A0A]" />
              +44 (0) 20 7946 0912
            </p>
            <p className="text-[11px] text-neutral-500 pt-1">
              Monday–Friday: 09:00 – 18:00 GMT
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-[#F15A0A] hover:text-white text-white text-[11px] font-bold uppercase tracking-wider rounded-lg border border-neutral-800 transition-colors cursor-pointer"
            >
              SEND INQUIRY <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="pt-2 flex items-center gap-4 text-xs font-bold text-neutral-400">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F15A0A] transition-colors">
              INSTAGRAM
            </a>
            <span>·</span>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#F15A0A] transition-colors">
              PINTEREST
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal & UK Payment Badges */}
      <div className="border-t border-neutral-900 py-6 px-6 md:px-12 text-xs">
        <div className="max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-neutral-500">
            © {new Date().getFullYear()} NOVAIRE APPAREL UK LTD. REGISTERED IN ENGLAND AND WALES. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
            <span>STRIPE SECURE</span>
            <span>·</span>
            <span>APPLE PAY</span>
            <span>·</span>
            <span>GOOGLE PAY</span>
            <span>·</span>
            <span>VISA</span>
            <span>·</span>
            <span>MASTERCARD</span>
            <span>·</span>
            <span>KLARNA</span>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h3 className="font-editorial text-sm font-bold uppercase tracking-wider text-[#F15A0A]">
                {policyContent[activeModal]?.title}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-neutral-300 leading-relaxed whitespace-pre-line">
              {policyContent[activeModal]?.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-[#F15A0A] text-white font-bold uppercase text-xs rounded-lg hover:bg-[#d94e05]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};

export default Footer;
