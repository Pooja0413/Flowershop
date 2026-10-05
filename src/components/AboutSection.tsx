import React from 'react';
import { MapPin, Clock, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-200" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Brand Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Ethical Floristry</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Soho Atelier</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
              Honoring botanical form, seasonal cycles, and earth-conscious craft.
            </h2>

            <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Founded in 2021 by floral architect Margaux Laurent, Atelier Botanica was created
                to reject the homogenized, plastic-wrapped supermarket flower industry. We believe
                arranging flowers is an intimate dialogue between architectural space and wild natural rhythm.
              </p>
              <p>
                We source directly from small, independent flower farms in the Hudson Valley and
                organic growers who harvest at first light. Every stem arrives fresh in cool water—never
                stored in dehydration chambers or treated with synthetic glazes.
              </p>
            </div>

            {/* Sustainability Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <span className="font-serif text-xl font-bold text-stone-900">01.</span>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wide">
                  Zero Floral Foam
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  We use reusable brass kenzan and recyclable aluminum lattice rather than toxic microplastic foam.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-serif text-xl font-bold text-stone-900">02.</span>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wide">
                  Compostable Wraps
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Unbleached kraft, natural plant-dyed silk ribbons, and biodegradable water cellulose reservoirs.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-serif text-xl font-bold text-stone-900">03.</span>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wide">
                  7-Day Freshness
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Because our stems are cut at dawn, they thrive twice as long as imported cold-storage bouquets.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Studio Card & Hours */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Visit Our Studio & Coffee Bar
              </span>
              <h3 className="font-serif text-2xl font-semibold text-stone-900">
                The Soho Floral Workshop
              </h3>
            </div>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">142 Mercer Street</div>
                  <div className="text-stone-500">Soho, New York, NY 10012</div>
                  <div className="text-stone-400 text-[11px] mt-0.5">Between Prince & Houston Streets</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Opening Hours</div>
                  <div className="text-stone-600">Monday – Saturday: 8:00 AM – 7:00 PM</div>
                  <div className="text-stone-600">Sunday: 9:00 AM – 4:00 PM</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Daily Stem Counter</div>
                  <div className="text-stone-500 leading-relaxed">
                    Walk in anytime to build a personalized bouquet with our florists or enjoy single estate pour-overs amidst fresh blooms.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-semibold text-stone-900 block">Courier Direct Phone:</span>
              <span className="font-mono text-stone-800">+1 (212) 555-0194</span>
              <p className="text-[11px] text-stone-500 pt-1">
                For custom wedding consultations, corporate events, or urgent same-day floral requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
