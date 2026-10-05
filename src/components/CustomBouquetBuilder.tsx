import React, { useState, useMemo } from 'react';
import { CUSTOM_STEM_CATALOG, VASE_OPTIONS, CustomStem } from '../data/flowers';
import { CartCustomBouquetItem } from '../types/cart';
import { Plus, Minus, Sparkles, Check, Heart, RotateCcw, AlertCircle } from 'lucide-react';

interface CustomBouquetBuilderProps {
  onAddToCart: (item: CartCustomBouquetItem) => void;
  onClose?: () => void;
}

export const CustomBouquetBuilder: React.FC<CustomBouquetBuilderProps> = ({
  onAddToCart,
  onClose
}) => {
  const [selectedStems, setSelectedStems] = useState<Record<string, number>>({
    'stem-garden-rose': 3,
    'stem-peony-coral': 2,
    'stem-ranunculus-white': 3,
    'stem-eucalyptus': 3,
    'stem-astilbe': 2
  });
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');
  const [selectedVesselId, setSelectedVesselId] = useState<string>('wrapped');
  const [customName, setCustomName] = useState<string>('Bespoke Atelier Creation');
  const [includeGiftNote, setIncludeGiftNote] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const selectedVessel = VASE_OPTIONS.find((v) => v.id === selectedVesselId) || VASE_OPTIONS[0];

  // Calculate totals
  const totalStemsCount = useMemo(() => {
    return Object.values(selectedStems).reduce((acc, count) => acc + count, 0);
  }, [selectedStems]);

  const stemsSubtotal = useMemo(() => {
    return Object.entries(selectedStems).reduce((acc, [stemId, count]) => {
      const stem = CUSTOM_STEM_CATALOG.find((s) => s.id === stemId);
      return acc + (stem ? stem.pricePerStem * count : 0);
    }, 0);
  }, [selectedStems]);

  const grandTotal = Math.round(stemsSubtotal + selectedVessel.price);

  const handleUpdateStem = (stemId: string, delta: number) => {
    setSelectedStems((prev) => {
      const current = prev[stemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[stemId];
        return copy;
      }
      return { ...prev, [stemId]: next };
    });
  };

  const handleReset = () => {
    setSelectedStems({});
    setSelectedVesselId('wrapped');
    setCustomName('Bespoke Atelier Creation');
  };

  const filteredCatalog = useMemo(() => {
    if (activeTypeFilter === 'all') return CUSTOM_STEM_CATALOG;
    return CUSTOM_STEM_CATALOG.filter((s) => s.type === activeTypeFilter);
  }, [activeTypeFilter]);

  const handleAddCustomToCart = () => {
    if (totalStemsCount < 5) return;

    const stemItems = Object.entries(selectedStems)
      .map(([stemId, count]) => {
        const stem = CUSTOM_STEM_CATALOG.find((s) => s.id === stemId);
        return stem && count > 0 ? { stem, count } : null;
      })
      .filter((item): item is { stem: CustomStem; count: number } => item !== null);

    const item: CartCustomBouquetItem = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      name: customName.trim() || 'Bespoke Hand-Tied Bouquet',
      stems: stemItems,
      vesselId: selectedVessel.id,
      vesselName: selectedVessel.name,
      vesselPrice: selectedVessel.price,
      quantity: 1,
      giftNote: includeGiftNote
        ? {
            recipient: recipient.trim() || 'Dearest Recipient',
            sender: sender.trim() || 'With Love',
            message: message.trim() || 'Arranged stem-by-stem especially for you.'
          }
        : undefined,
      totalUnitPrice: grandTotal
    };

    onAddToCart(item);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      if (onClose) onClose();
    }, 900);
  };

  return (
    <div className="bg-[#FAF8F5] py-12 md:py-20 border-t border-stone-200" id="stem-bar">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Floral Atelier</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Hand-Tied to Order</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
            The Stem-by-Stem Bar
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Curate your own bespoke botanical arrangement. Select your focal garden blooms,
            silvery foliage, and finishing vessels—our florists hand-tie each stem upon dawn receipt.
          </p>
        </div>

        {/* Builder Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stem Palette Selector (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Interactive Filter Tabs (Segmented control) */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg max-w-md">
              {[
                { id: 'all', label: 'All Stems' },
                { id: 'focal', label: 'Focal Blooms' },
                { id: 'foliage', label: 'Foliage & Greens' },
                { id: 'accent', label: 'Textural Accents' },
                { id: 'filler', label: 'Delicate Fillers' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTypeFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeTypeFilter === tab.id
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Stem Catalog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredCatalog.map((stem) => {
                const count = selectedStems[stem.id] || 0;
                return (
                  <div
                    key={stem.id}
                    className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      count > 0
                        ? 'border-stone-800 bg-white ring-1 ring-stone-800/10 shadow-xs'
                        : 'border-stone-200/90 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: stem.colorHex }}
                              title={stem.colorName}
                            />
                            <h4 className="text-sm font-semibold text-stone-900">
                              {stem.name}
                            </h4>
                          </div>
                          <span className="text-[11px] font-serif italic text-stone-500 block mt-0.5">
                            {stem.botanicalName}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-stone-900 tabular-nums font-mono shrink-0">
                          ${stem.pricePerStem.toFixed(2)}
                          <span className="text-[10px] text-stone-400 font-normal">/ea</span>
                        </span>
                      </div>

                      <div className="mt-2 text-[11px] text-stone-500 leading-snug">
                        <span>{stem.colorName}</span> · <span>{stem.scent}</span>
                      </div>
                    </div>

                    {/* Stepper Control */}
                    <div className="mt-4 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">
                        {count > 0 ? `${count} stems added` : '0 stems'}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateStem(stem.id, -1)}
                          disabled={count === 0}
                          aria-label={`Remove one ${stem.name}`}
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-stone-700 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold tabular-nums text-stone-900 min-w-5 text-center">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateStem(stem.id, 1)}
                          aria-label={`Add one ${stem.name}`}
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-stone-900 bg-stone-900 text-white hover:bg-stone-800 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Arrangement Workshop Summary (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200/90 p-6 shadow-sm sticky top-28 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-lg font-semibold text-stone-900">
                  Arrangement Ledger
                </h3>
                <span className="text-xs text-stone-500">Live Stem Synthesis</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset bouquet selection"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Arrangement Custom Name */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Name Your Bouquet
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Sunday Morning in Provence"
                className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-stone-900"
              />
            </div>

            {/* Stem Breakdown List */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                <span>Selected Botanicals</span>
                <span className="tabular-nums font-mono text-stone-500">
                  {totalStemsCount} Stems Total
                </span>
              </div>

              {totalStemsCount === 0 ? (
                <div className="py-6 text-center text-xs text-stone-400 border border-dashed border-stone-200 rounded-lg">
                  No stems selected yet. Click (+) on the left to begin composing.
                </div>
              ) : (
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 divide-y divide-stone-50 text-xs">
                  {Object.entries(selectedStems).map(([stemId, count]) => {
                    const stem = CUSTOM_STEM_CATALOG.find((s) => s.id === stemId);
                    if (!stem) return null;
                    return (
                      <div key={stemId} className="pt-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 truncate pr-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: stem.colorHex }}
                          />
                          <span className="truncate text-stone-700">{stem.name}</span>
                          <span className="text-stone-400 text-[11px]">× {count}</span>
                        </div>
                        <span className="tabular-nums font-mono text-stone-900 shrink-0">
                          ${(stem.pricePerStem * count).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Vessel Choice */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                Vessel & Wrapping
              </label>
              <div className="space-y-1.5">
                {VASE_OPTIONS.map((vase) => (
                  <button
                    key={vase.id}
                    type="button"
                    onClick={() => setSelectedVesselId(vase.id)}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      selectedVesselId === vase.id
                        ? 'border-stone-900 bg-stone-50 font-semibold'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-stone-800">{vase.name}</span>
                    <span className="tabular-nums font-mono text-stone-600">
                      {vase.price === 0 ? 'Free' : `+$${vase.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Handwritten Card Note Option */}
            <div className="pt-1 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIncludeGiftNote(!includeGiftNote)}
                className="flex items-center gap-2 text-xs font-medium text-stone-700 hover:text-stone-950 cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${includeGiftNote ? 'text-rose-600 fill-rose-600' : 'text-stone-400'}`} />
                <span>{includeGiftNote ? 'Card note included' : 'Add complimentary card note'}</span>
              </button>

              {includeGiftNote && (
                <div className="mt-2.5 p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Recipient Name"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="p-1.5 border border-stone-200 rounded bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Sender Name"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      className="p-1.5 border border-stone-200 rounded bg-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Personal message for the recipient..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-1.5 border border-stone-200 rounded bg-white resize-none"
                  />
                </div>
              )}
            </div>

            {/* Minimum stem validation warning */}
            {totalStemsCount > 0 && totalStemsCount < 5 && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200/80">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                <span>Add at least {5 - totalStemsCount} more stems for a balanced hand-tied structure.</span>
              </div>
            )}

            {/* Total & Action Button */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Total Investment</span>
                <span className="text-xl font-serif font-bold text-stone-900 tabular-nums">
                  ${grandTotal}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddCustomToCart}
                disabled={totalStemsCount < 5 || addedSuccess}
                className={`w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  addedSuccess
                    ? 'bg-emerald-800 text-white'
                    : totalStemsCount < 5
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.99]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Add Custom Creation (${grandTotal})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
