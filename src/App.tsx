/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { PRODUCTS, FlowerProduct } from './data/flowers';
import { CartItem, CartBouquetItem, CartCustomBouquetItem, PlacedOrder } from './types/cart';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomBouquetBuilder } from './components/CustomBouquetBuilder';
import { SubscriptionSection } from './components/SubscriptionSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { CareGuideModal } from './components/CareGuideModal';
import { WorkshopsModal } from './components/WorkshopsModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Sparkles, Calendar, BookOpen, ArrowRight } from 'lucide-react';

export default function App() {
  // Cart state: initial item so the user immediately sees a realistic cart experience
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-wild-meadow',
      type: 'catalog',
      product: PRODUCTS[0],
      size: 'classic',
      sizePriceMultiplier: 0,
      vaseId: 'wrapped',
      vaseName: 'Artisan Linen & Silk Tie Wrap',
      vasePrice: 0,
      quantity: 1,
      giftNote: {
        recipient: 'Claire',
        sender: 'Julian',
        message: 'Wishing you quiet beauty and joyful sunshine this week.'
      },
      totalUnitPrice: PRODUCTS[0].price
    }
  ]);

  // Modals & Drawers visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [isWorkshopsOpen, setIsWorkshopsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(null);

  // Discount & Promo state
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>('');

  // Catalog filtering & sorting state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePalette, setActivePalette] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filtered and sorted products
  const displayProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (activePalette !== 'all') {
      list = list.filter((p) => p.palette === activePalette);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [activeCategory, activePalette, sortBy]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // If matching catalog item with same id/options exists, increase quantity
      const existingIdx = prev.findIndex((i) => i.id === item.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          quantity: copy[existingIdx].quantity + item.quantity
        };
        return copy;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BLOOM10' || clean === 'SPRING10') {
      setAppliedDiscount(0.10);
      setPromoCode(clean);
      return true;
    }
    return false;
  };

  const handleQuickAdd = (product: FlowerProduct) => {
    const quickItem: CartBouquetItem = {
      id: `${product.id}-classic-wrapped-${Date.now()}`,
      type: 'catalog',
      product,
      size: 'classic',
      sizePriceMultiplier: 0,
      vaseId: 'wrapped',
      vaseName: 'Artisan Linen & Silk Tie Wrap',
      vasePrice: 0,
      quantity: 1,
      totalUnitPrice: product.price
    };
    handleAddToCart(quickItem);
  };

  const handleOrderComplete = (_order: PlacedOrder) => {
    // Clear cart after successful checkout
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#EAE4DC]">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStemBar={() => scrollToSection('stem-bar')}
      />

      <main className="flex-1">
        {/* Campaign Hero */}
        <Hero
          onExploreClick={() => scrollToSection('arrangements')}
          onCustomClick={() => scrollToSection('stem-bar')}
        />

        {/* Curated Seasonal Arrangements Catalog */}
        <section className="py-16 md:py-24 border-t border-stone-200/80" id="arrangements">
          <div className="max-w-7xl mx-auto px-6">
            {/* Editorial Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="max-w-xl">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2 flex items-center gap-2">
                  <span>Seasonal Releases</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span>Handcrafted Daily</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
                  Curated Botanical Compositions
                </h2>
                <p className="text-stone-600 text-sm sm:text-base mt-2">
                  Composed each dawn with heirloom varieties from organic Hudson Valley growers.
                  Supplied in hydrated reservoirs with our 7-day vase life assurance.
                </p>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs text-stone-600 self-start md:self-auto">
                <span className="font-medium text-stone-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-800 font-medium cursor-pointer focus:outline-none focus:border-stone-900"
                >
                  <option value="featured">Atelier Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Filter Tabs (Interactive segmented buttons) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200/80">
              {/* Category Filter */}
              <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg overflow-x-auto max-w-full">
                {[
                  { id: 'all', label: 'All Bouquets' },
                  { id: 'seasonal', label: 'Seasonal Garden' },
                  { id: 'romantic', label: 'Romantic & Sunset' },
                  { id: 'sculptural', label: 'Sculptural & Ikebana' },
                  { id: 'sympathy', label: 'Quiet & White' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Palette filter */}
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Palette:</span>
                <div className="flex items-center gap-1">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'pastels', label: 'Pastel' },
                    { id: 'warm-sunset', label: 'Sunset' },
                    { id: 'whites', label: 'Pure White' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePalette(p.id)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                        activePalette === p.id
                          ? 'bg-stone-900 text-white font-medium'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Cards Grid (3 or 4 columns desktop) */}
            {displayProducts.length === 0 ? (
              <div className="py-16 text-center text-stone-500">
                <p className="text-sm">No arrangements found in this specific filter combination.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActivePalette('all');
                  }}
                  className="mt-3 text-xs font-semibold text-stone-900 underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stem-by-Stem Interactive Builder */}
        <CustomBouquetBuilder onAddToCart={handleAddToCart} />

        {/* Subscription Floral Club */}
        <SubscriptionSection onAddToCart={handleAddToCart} />

        {/* Dual Interlude: Workshops & Care Handbook Callouts */}
        <section className="py-16 bg-white border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Workshops Masterclasses */}
              <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>In-Person Masterclasses</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-snug">
                    Learn the Florist's Hand: Studio Workshops
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    Spend an intimate weekend morning at our Soho workbench. Master French spiral hand-tying
                    mechanics or modern Japanese Ikebana. All blooms and tools included.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-stone-500">
                    <span className="font-semibold text-stone-900">Next Class:</span> Saturday, Oct 17
                  </div>
                  <button
                    onClick={() => setIsWorkshopsOpen(true)}
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Reserve a Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: Botanical Care Guide */}
              <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                    <BookOpen className="w-4 h-4 text-sky-700" />
                    <span>Botanical Longevity Guide</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-snug">
                    How to Keep Fresh Stems Thriving for 12+ Days
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    From the 45-degree angle shear technique to reviving drooping hydrangeas with water bath shocks—our
                    head florists share the science behind maximum vase longevity.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-stone-500">
                    <span className="font-semibold text-stone-900">Handbook:</span> 3 Step Protocols
                  </div>
                  <button
                    onClick={() => setIsCareGuideOpen(true)}
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Read Care Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atelier & Story Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onOpenWorkshops={() => setIsWorkshopsOpen(true)}
        onOpenStemBar={() => scrollToSection('stem-bar')}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        appliedDiscount={appliedDiscount}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscount={appliedDiscount}
        onOrderComplete={handleOrderComplete}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Care Guide Modal */}
      <CareGuideModal
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

      {/* Workshops Reservation Modal */}
      <WorkshopsModal
        isOpen={isWorkshopsOpen}
        onClose={() => setIsWorkshopsOpen(false)}
      />
    </div>
  );
}
