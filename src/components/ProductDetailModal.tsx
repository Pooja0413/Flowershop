import React, { useState } from 'react';
import { FlowerProduct, VASE_OPTIONS } from '../data/flowers';
import { BouquetSize, CartBouquetItem } from '../types/cart';
import { X, Check, Droplets, Wind, Sparkles, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  product: FlowerProduct | null;
  onClose: () => void;
  onAddToCart: (item: CartBouquetItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<BouquetSize>('classic');
  const [selectedVaseId, setSelectedVaseId] = useState<string>('wrapped');
  const [quantity, setQuantity] = useState<number>(1);
  const [includeGiftNote, setIncludeGiftNote] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Size pricing
  const sizeOffsets: Record<BouquetSize, { extraPrice: number; label: string; stemsText: string }> = {
    classic: { extraPrice: 0, label: 'Classic', stemsText: product.stemCountRange },
    deluxe: { extraPrice: 28, label: 'Deluxe (+35% Blooms)', stemsText: '+6 to 8 Extra Stems' },
    grandeur: { extraPrice: 62, label: 'Grandeur (Showpiece)', stemsText: '+14 to 18 Extra Stems' }
  };

  const selectedVase = VASE_OPTIONS.find((v) => v.id === selectedVaseId) || VASE_OPTIONS[0];
  const unitPrice = product.price + sizeOffsets[selectedSize].extraPrice + selectedVase.price;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const cartItem: CartBouquetItem = {
      id: `${product.id}-${selectedSize}-${selectedVaseId}-${Date.now()}`,
      type: 'catalog',
      product,
      size: selectedSize,
      sizePriceMultiplier: sizeOffsets[selectedSize].extraPrice,
      vaseId: selectedVase.id,
      vaseName: selectedVase.name,
      vasePrice: selectedVase.price,
      quantity,
      giftNote: includeGiftNote
        ? {
            recipient: recipient.trim() || 'Dearest Recipient',
            sender: sender.trim() || 'With Love',
            message: message.trim() || 'Wishing you quiet beauty and warmth with these fresh blooms.'
          }
        : undefined,
      totalUnitPrice: unitPrice
    };

    onAddToCart(cartItem);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 transition-colors shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Photography & Stems list */}
        <div className="md:w-1/2 bg-[#F6F4EF] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200/80">
          <div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-inner bg-stone-200 mb-6">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-stone-950/75 text-stone-200 text-xs px-2.5 py-1 rounded backdrop-blur-xs font-serif italic">
                {product.botanicalSubtitle}
              </div>
            </div>

            {/* Scent & Atmosphere */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                  <Wind className="w-3.5 h-3.5 text-stone-500" />
                  <span>Scent Profile</span>
                </div>
                <p className="text-xs text-stone-600 italic font-serif leading-relaxed">
                  "{product.scentProfile}"
                </p>
              </div>

              {/* Bloom Composition */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Botanical Composition</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                  {product.bloomVarieties.map((variety, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                      <span className="truncate">{variety}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Care snippet */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-700" />
                  <span>Atelier Care Advice</span>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {product.careSnippet}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-1">
                Seasonal Bouquet · {product.stemCountRange}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                Select Arrangement Scale
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['classic', 'deluxe', 'grandeur'] as BouquetSize[]).map((sizeKey) => {
                  const sizeInfo = sizeOffsets[sizeKey];
                  const isSelected = selectedSize === sizeKey;
                  return (
                    <button
                      key={sizeKey}
                      type="button"
                      onClick={() => setSelectedSize(sizeKey)}
                      className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border-stone-200 bg-stone-50/70 hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <div className="text-xs font-semibold">{sizeInfo.label}</div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {sizeInfo.extraPrice > 0 ? `+$${sizeInfo.extraPrice}` : 'Standard'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vase Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2">
                Vessel & Presentation
              </label>
              <div className="space-y-2">
                {VASE_OPTIONS.map((vase) => {
                  const isSelected = selectedVaseId === vase.id;
                  return (
                    <label
                      key={vase.id}
                      onClick={() => setSelectedVaseId(vase.id)}
                      className={`flex items-start justify-between p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="text-xs font-semibold text-stone-900">{vase.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{vase.description}</div>
                      </div>
                      <span className="text-xs font-semibold text-stone-900 tabular-nums shrink-0 font-mono">
                        {vase.price === 0 ? 'Included' : `+$${vase.price}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Handwritten Gift Note Toggle */}
            <div className="pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setIncludeGiftNote(!includeGiftNote)}
                className="flex items-center gap-2 text-xs font-medium text-stone-800 hover:text-stone-950 cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${includeGiftNote ? 'text-rose-600 fill-rose-600' : 'text-stone-400'}`} />
                <span>{includeGiftNote ? 'Handwritten card note included' : 'Add complimentary handwritten letterpress card'}</span>
              </button>

              {includeGiftNote && (
                <div className="mt-3 p-4 bg-[#FAF7F2] rounded-lg border border-stone-200/80 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-1">To (Recipient)</label>
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="e.g. Charlotte"
                        className="w-full text-xs p-2 rounded border border-stone-200 bg-white focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-1">From (Sender)</label>
                      <input
                        type="text"
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        placeholder="e.g. Julian"
                        className="w-full text-xs p-2 rounded border border-stone-200 bg-white focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-1">Card Note (Pen on textured cotton card)</label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Wishing you a luminous birthday filled with joy and gentle stillness..."
                      className="w-full text-xs p-2 rounded border border-stone-200 bg-white focus:outline-none focus:border-stone-900 resize-none font-serif"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Module Bottom */}
          <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer text-sm font-semibold"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-semibold tabular-nums text-stone-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 cursor-pointer text-sm font-semibold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Total and Submit Button */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={addedAnimation}
              className={`flex-1 py-3 px-5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-between shadow-sm cursor-pointer whitespace-nowrap ${
                addedAnimation
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-[0.99]'
              }`}
            >
              <span>{addedAnimation ? 'Added to Bag' : 'Add to Shopping Bag'}</span>
              <span className="tabular-nums font-mono font-medium">${totalPrice}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
