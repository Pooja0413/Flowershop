import React, { useState } from 'react';
import { Check, Calendar, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { CartBouquetItem } from '../types/cart';
import { PRODUCTS } from '../data/flowers';

interface SubscriptionSectionProps {
  onAddToCart: (item: CartBouquetItem) => void;
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ onAddToCart }) => {
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');
  const [stylePreference, setStylePreference] = useState<'pastels' | 'wild' | 'monochrome'>('pastels');
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const tiers = {
    weekly: {
      title: 'Weekly Fresh Stems',
      price: 65,
      frequencyLabel: 'Delivered every Thursday',
      perks: ['Fresh morning market cut', 'Complimentary handmade ceramic urn', 'First pick of seasonal rarities']
    },
    biweekly: {
      title: 'Bi-Weekly Atelier Drop',
      price: 72,
      frequencyLabel: 'Delivered every other Thursday',
      perks: ['Seasonal floral rotation', 'Complimentary vase conditioning kit', 'Skip or pause anytime']
    },
    monthly: {
      title: 'Monthly Collector Cut',
      price: 85,
      frequencyLabel: 'Delivered 1st Thursday of the month',
      perks: ['Grand showpiece arrangement', 'Exclusive grower variety notes', 'Complimentary holiday upgrades']
    }
  };

  const selectedTier = tiers[frequency];

  const handleSubscribe = () => {
    // Generate a subscription cart item based on featured product
    const baseProduct = PRODUCTS[0];
    const subItem: CartBouquetItem = {
      id: `sub-${frequency}-${Date.now()}`,
      type: 'catalog',
      product: {
        ...baseProduct,
        name: `Botanical Club: ${selectedTier.title}`,
        price: selectedTier.price,
        description: `Seasonal fresh rotation in ${stylePreference} palette. ${selectedTier.frequencyLabel}. Includes artisan vase on initial delivery.`
      },
      size: 'classic',
      sizePriceMultiplier: 0,
      vaseId: 'fluted-ceramic',
      vaseName: 'Collector Ceramic Vessel (Included)',
      vasePrice: 0,
      quantity: 1,
      totalUnitPrice: selectedTier.price
    };

    onAddToCart(subItem);
    setEnrolledSuccess(true);
    setTimeout(() => setEnrolledSuccess(false), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F2EB] border-t border-stone-200/90" id="subscriptions">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Description & Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>The Botanical Club</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Living Seasonal Atmosphere</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
              An ever-evolving garden in your home.
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              Never let your vases sit empty. Join our private floral collective to receive
              hand-tied seasonal stems harvested just hours before arriving at your doorstep.
              Pause, reschedule, or cancel with a single click.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-stone-300/60 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-stone-800" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">Complimentary Stoneware Vessel</h4>
                  <p className="text-xs text-stone-500">Every new subscriber receives our fluted ivory ceramic urn with their first drop.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-stone-300/60 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-800" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">Effortless Flexibility</h4>
                  <p className="text-xs text-stone-500">Traveling? Skip a week or redirect delivery to a friend with no penalties.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-stone-300/60 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-800" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-stone-900">7-Day Freshness Guarantee</h4>
                  <p className="text-xs text-stone-500">If any bloom flags prematurely, we send fresh replacements immediately.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Plan Configurator */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                1. Select Delivery Rhythm
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['weekly', 'biweekly', 'monthly'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setFrequency(key)}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      frequency === key
                        ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="text-xs capitalize">{key}</div>
                    <div className={`text-[11px] mt-0.5 ${frequency === key ? 'text-stone-300' : 'text-stone-500'}`}>
                      ${tiers[key].price}/drop
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                2. Palette Aesthetic
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'pastels', label: 'Pastel Garden' },
                  { id: 'wild', label: 'Wild & Moody' },
                  { id: 'monochrome', label: 'Crisp Whites' }
                ].map((palette) => (
                  <button
                    key={palette.id}
                    onClick={() => setStylePreference(palette.id as any)}
                    className={`p-2.5 rounded-lg border text-center cursor-pointer transition-colors ${
                      stylePreference === palette.id
                        ? 'border-stone-900 bg-stone-100 font-semibold text-stone-900'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {palette.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Summary Card */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-stone-900">{selectedTier.title}</h3>
                  <p className="text-xs text-stone-500">{selectedTier.frequencyLabel}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    ${selectedTier.price}
                  </span>
                  <span className="text-xs text-stone-400 block">/ delivery</span>
                </div>
              </div>

              <ul className="text-xs text-stone-600 space-y-1.5 pt-2 border-t border-stone-200/60">
                {selectedTier.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Join CTA */}
            <button
              onClick={handleSubscribe}
              disabled={enrolledSuccess}
              className={`w-full py-3.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                enrolledSuccess
                  ? 'bg-emerald-800 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-[0.99]'
              }`}
            >
              {enrolledSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Subscription Added to Bag</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 text-rose-300" />
                  <span>Join The Botanical Club</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
