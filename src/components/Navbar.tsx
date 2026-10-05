import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, X, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenStemBar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  onOpenSearch,
  onOpenStemBar
}) => {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Slim Promotional Announcement Banner (<= 40px) */}
      {!bannerDismissed && (
        <div className="bg-[#2D2A26] text-[#FAF8F5] text-xs font-normal py-2 px-4 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center text-stone-200">
            <span className="font-serif italic text-amber-200 text-sm">Same-Day Delivery</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Order by 1:00 PM for fresh hand-delivery in temperature-controlled water reservoirs</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span className="hidden sm:inline text-stone-300">Complimentary delivery over $75</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss announcement"
            className="text-stone-400 hover:text-white transition-colors ml-2 cursor-pointer p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-6 nav links) — Zone 3 (1-2 primary actions) */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('top');
          }}
          className="font-serif text-2xl md:text-3xl tracking-tight text-stone-900 font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Atelier Botanica
        </a>

        {/* Zone 2: 4–6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('arrangements')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-stone-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Arrangements
          </button>
          <button
            onClick={onOpenStemBar}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 flex items-center gap-1.5 text-stone-800 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Stem Bar</span>
          </button>
          <button
            onClick={() => onNavigate('subscriptions')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-stone-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Floral Club
          </button>
          <button
            onClick={() => onNavigate('workshops')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-stone-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Workshops
          </button>
          <button
            onClick={() => onNavigate('care-guide')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-stone-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Care Guide
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-stone-950 transition-colors cursor-pointer py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-stone-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Our Atelier
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            aria-label="Search blooms and arrangements"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200/90 rounded-full transition-colors cursor-pointer"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-stone-800" />
            <span className="hidden sm:inline font-medium text-stone-700">Bag</span>
            <span className="tabular-nums font-bold bg-[#2D2A26] text-white text-[11px] px-1.5 py-0.2 rounded-full min-w-4 text-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-950 cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-4 space-y-3">
          <button
            onClick={() => {
              onNavigate('arrangements');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-stone-800 py-1.5"
          >
            Seasonal Arrangements
          </button>
          <button
            onClick={() => {
              onOpenStemBar();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-amber-900 py-1.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            Custom Stem Bar
          </button>
          <button
            onClick={() => {
              onNavigate('subscriptions');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-stone-800 py-1.5"
          >
            Floral Club Subscriptions
          </button>
          <button
            onClick={() => {
              onNavigate('workshops');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-stone-800 py-1.5"
          >
            Atelier Workshops
          </button>
          <button
            onClick={() => {
              onNavigate('care-guide');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-stone-800 py-1.5"
          >
            Flower Longevity & Care
          </button>
          <button
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-base font-medium text-stone-800 py-1.5"
          >
            Our Atelier & Philosophy
          </button>
        </div>
      )}
    </header>
  );
};
