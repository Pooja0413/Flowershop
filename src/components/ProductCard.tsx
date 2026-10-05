import React, { useState } from 'react';
import { FlowerProduct } from '../data/flowers';
import { Plus, Eye, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: FlowerProduct;
  onQuickView: (product: FlowerProduct) => void;
  onQuickAdd: (product: FlowerProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickAdd
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-900/5 cursor-pointer"
    >
      {/* 65%-75% Visual slot with zero-broken-image fallback container */}
      <div className="relative aspect-[4/3] w-full bg-[#F5F2EB] overflow-hidden">
        {/* Subtle fallback container */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#EBE7DF] text-stone-500 transition-opacity duration-300 ${
            imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Sparkles className="w-6 h-6 text-stone-400 mb-1" />
          <span className="font-serif text-sm text-stone-700">{product.name}</span>
          <span className="text-[11px] text-stone-500">Fresh cut stems</span>
        </div>

        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Minimal unboxed status label: max 1 quiet tag */}
        {product.bestseller && (
          <div className="absolute top-3 left-3 bg-stone-900/85 text-stone-100 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded backdrop-blur-xs">
            Atelier Favorite
          </div>
        )}

        {/* Quick view hover action button */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-2 text-xs font-semibold text-stone-900 bg-white/95 hover:bg-white rounded-md shadow-sm transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Stems</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata with typographic dot separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
            <span>{product.stemCountRange}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.palette.replace('-', ' ')}</span>
          </div>

          <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-serif italic">
            {product.botanicalSubtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-stone-400 uppercase tracking-wider block">From</span>
            <span className="text-base font-semibold text-stone-900 tabular-nums font-mono">
              ${product.price}
            </span>
          </div>

          <button
            onClick={handleQuickAddClick}
            aria-label={`Add ${product.name} to shopping bag`}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              justAdded
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
