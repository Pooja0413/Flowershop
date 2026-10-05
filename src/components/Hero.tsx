import React, { useState } from 'react';
import { ArrowRight, Sparkles, Droplets, Sun, Leaf } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onCustomClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroImageSrc = '/src/assets/images/hero_floral_atelier_1791181657048.jpg';

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quiet text kicker without pill badges */}
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
              <span>Bespoke Botanical Studio</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Dawn Market Harvest</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 leading-[1.08] tracking-tight text-balance">
              Poetry sculpted in fresh, wild cut stems.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl text-balance">
              Hand-tied botanical compositions arranged each morning with heirloom garden roses,
              Japanese ranunculus, and wild textural foliage. Delivered in chilled water reservoirs across town.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#2D2A26] hover:bg-[#1B1917] rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <span>Explore Seasonal Stems</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomClick}
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-[#EAE5DC] hover:bg-[#DDD7CC] rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Custom Stem Bar</span>
              </button>
            </div>

            {/* Adjacent Proof Markers */}
            <div className="pt-8 border-t border-stone-200/90 grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-stone-900 text-xs font-semibold mb-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Zero Floral Foam</span>
                </div>
                <p className="text-xs text-stone-500 leading-snug">Sustainable chicken wire & kenzan mechanics</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 text-xs font-semibold mb-1">
                  <Sun className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Market Dawn</span>
                </div>
                <p className="text-xs text-stone-500 leading-snug">Selected daily from organic regional growers</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 text-xs font-semibold mb-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                  <span>Fresh Reservoir</span>
                </div>
                <p className="text-xs text-stone-500 leading-snug">Hydrated in transport; 7-day guarantee</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Focal Atelier Photo with Fallback Container */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-stone-200 shadow-xl shadow-stone-900/5 border border-stone-300/40">
              {/* Fallback container / placeholder while loading or if offline */}
              <div
                className={`absolute inset-0 bg-[#E8E3DA] flex flex-col items-center justify-center p-6 text-stone-500 transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <Leaf className="w-10 h-10 text-stone-400 mb-2 animate-pulse" />
                <span className="font-serif text-lg text-stone-700">Atelier Botanica Floral Studio</span>
                <span className="text-xs text-stone-500">Preparing fresh seasonal harvest...</span>
              </div>

              <img
                src={heroImageSrc}
                alt="Atelier Botanica floral workshop showing fresh garden roses, ranunculus, and eucalyptus stems in warm natural morning light"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Quiet caption tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-stone-950/70 backdrop-blur-md text-stone-100 text-xs py-2 px-3.5 rounded-lg flex items-center justify-between">
                <span className="font-serif italic text-stone-200">The Morning Harvest at our Soho Atelier</span>
                <span className="text-stone-300">Hand-arranged today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
