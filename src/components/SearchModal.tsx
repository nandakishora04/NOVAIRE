import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(p => 
        p.isPublished && (
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()) ||
          p.fabricDetails.some(f => f.toLowerCase().includes(query.toLowerCase()))
        )
      )
    : [];

  const formatGBP = (val: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-2xl bg-[#111111] border border-neutral-800 rounded-3xl p-6 text-white shadow-2xl z-10 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <Search size={18} className="text-[#F15A0A]" />
          <input
            type="text"
            autoFocus
            placeholder="Search UK silhouettes, British wool, heavy loopback..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick searches */}
        {!query && (
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F15A0A]">
              POPULAR LONDON SEARCHES
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Bomber', 'Melton Wool', '340 GSM', 'Loopback Hoodie', 'Wide-Leg', 'Black', 'Orange'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#F15A0A] text-neutral-300"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 text-xs">
                No garments found matching "{query}"
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800 hover:border-[#F15A0A] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.primaryImage}
                      alt={product.title}
                      className="w-12 h-14 object-cover rounded-xl bg-neutral-950 shrink-0"
                    />
                    <div>
                      <h4 className="font-editorial text-xs font-bold uppercase text-white group-hover:text-[#F15A0A]">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        {product.collection} · {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-editorial text-xs font-bold text-white tabular-nums">
                      {formatGBP(product.price)}
                    </span>
                    <ArrowRight size={14} className="text-neutral-500 group-hover:translate-x-1 group-hover:text-[#F15A0A] transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
