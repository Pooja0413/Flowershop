import React, { useState, useMemo } from 'react';
import { PRODUCTS, FlowerProduct } from '../data/flowers';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: FlowerProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = p.botanicalSubtitle.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchBloom = p.bloomVarieties.some((v) => v.toLowerCase().includes(q));
      const matchScent = p.scentProfile.toLowerCase().includes(q);
      return matchName || matchSubtitle || matchDesc || matchBloom || matchScent;
    });
  }, [query]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stems, scents, varieties (e.g. Garden Rose, Peony, Orchid, Eucalyptus)..."
            className="w-full text-sm sm:text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-2 py-1 rounded cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-3 bg-stone-50/80 border-b border-stone-100 flex items-center gap-2 overflow-x-auto text-xs text-stone-600">
          <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {['Garden Roses', 'Ranunculus', 'Peonies', 'Dahlia', 'Orchids', 'White Stems'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="hover:text-stone-950 hover:underline cursor-pointer whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
          {results.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs">
              No arrangements found matching "{query}". Try searching for roses, ranunculus, or seasonal pastels.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 group cursor-pointer hover:bg-stone-50/60 p-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                      {product.name}
                    </h4>
                    <div className="text-[11px] text-stone-500 font-serif italic mt-0.5">
                      {product.botanicalSubtitle} · {product.stemCountRange}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                    ${product.price}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-stone-900 group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
