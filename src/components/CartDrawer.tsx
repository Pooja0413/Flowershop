import React, { useState } from 'react';
import { CartItem } from '../types/cart';
import { X, Trash2, ShoppingBag, ArrowRight, Truck, Check, Sparkles, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  appliedDiscount: number;
  promoCode: string;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  appliedDiscount,
  promoCode,
  onApplyPromo
}) => {
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + item.totalUnitPrice * item.quantity, 0);
  const freeShippingThreshold = 75;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryFee = isFreeDelivery ? 0 : 15;
  const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim());
    if (success) {
      setPromoMessage({ text: 'Promo applied: 10% off entire order!', error: false });
    } else {
      setPromoMessage({ text: 'Invalid promo code. Try "BLOOM10".', error: true });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-200/80 flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h3 className="font-serif text-xl font-semibold text-stone-900">
                Your Shopping Bag
              </h3>
              <span className="text-xs text-stone-500 font-mono tabular-nums">
                ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Delivery Progress Meter */}
          <div className="bg-stone-50 px-6 py-3 border-b border-stone-200/60">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-stone-700" />
                {isFreeDelivery
                  ? 'Complimentary Hand Delivery unlocked!'
                  : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for complimentary delivery`}
              </span>
              <span className="text-[11px] text-stone-400 font-mono tabular-nums">
                ${freeShippingThreshold} threshold
              </span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-stone-500 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="font-serif text-lg text-stone-800">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Discover our seasonal dawn harvest or curate a custom arrangement at our stem bar.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Explore Stems
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200/60 relative">
                    {item.type === 'catalog' ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-[#F3EFE6]">
                        <Sparkles className="w-5 h-5 text-amber-700 mb-1" />
                        <span className="text-[10px] font-serif text-stone-700">Custom</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                          {item.type === 'catalog' ? item.product.name : item.name}
                        </h4>
                        <span className="text-xs font-semibold text-stone-900 font-mono tabular-nums shrink-0">
                          ${item.totalUnitPrice * item.quantity}
                        </span>
                      </div>

                      {/* Metadata */}
                      <div className="text-[11px] text-stone-500 mt-1 space-y-0.5">
                        {item.type === 'catalog' ? (
                          <>
                            <div className="capitalize">Size: {item.size}</div>
                            <div>Vessel: {item.vaseName}</div>
                          </>
                        ) : (
                          <>
                            <div>{item.stems.reduce((sum, s) => sum + s.count, 0)} Botanicals</div>
                            <div>Vessel: {item.vesselName}</div>
                          </>
                        )}
                        {item.giftNote && (
                          <div className="text-rose-700 italic">
                            Handwritten note for {item.giftNote.recipient}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 text-xs"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold tabular-nums text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 text-xs"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                        aria-label="Remove item from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#FAF8F5] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromoCode} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. BLOOM10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full text-xs pl-8 pr-2.5 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-stone-900 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.error ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-mono">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span className="tabular-nums font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Chilled Water Reservoir Delivery</span>
                  <span className="tabular-nums font-mono">
                    {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="text-base font-serif font-bold tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <span>Proceed to Delivery & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Hand-delivered in fresh water · 100% Recyclable Packaging</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
