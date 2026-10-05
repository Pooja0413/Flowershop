import React, { useState } from 'react';
import { CARE_GUIDES } from '../data/flowers';
import { X, Droplets, Scissors, Sun, Sparkles, AlertCircle } from 'lucide-react';

interface CareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareGuideModal: React.FC<CareGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTipId, setActiveTipId] = useState<string>(CARE_GUIDES[0].id);

  if (!isOpen) return null;

  const activeTip = CARE_GUIDES.find((t) => t.id === activeTipId) || CARE_GUIDES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-700" />
              <span>Atelier Botanical Handbook</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              Flower Care & Vase Longevity
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close care guide"
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Rules Bar */}
        <div className="grid grid-cols-3 divide-x divide-stone-100 bg-stone-50 p-3 text-center border-b border-stone-100 text-xs">
          <div className="flex items-center justify-center gap-1.5 text-stone-700">
            <Scissors className="w-3.5 h-3.5 text-stone-500" />
            <span>Angle cut 45°</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-stone-700">
            <Droplets className="w-3.5 h-3.5 text-sky-600" />
            <span>Cold water every 48h</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-stone-700">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            <span>No direct heat / fruit</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Navigation / List */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-2">
              Specific Guides
            </span>
            {CARE_GUIDES.map((tip) => (
              <button
                key={tip.id}
                onClick={() => setActiveTipId(tip.id)}
                className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer ${
                  activeTipId === tip.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-800'
                }`}
              >
                <div className="text-xs font-semibold">{tip.title}</div>
                <div className={`text-[11px] mt-0.5 ${activeTipId === tip.id ? 'text-stone-300' : 'text-stone-500'}`}>
                  {tip.category}
                </div>
              </button>
            ))}

            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>The Fruit Bowl Secret</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Apples and bananas emit natural ethylene gas that triggers premature petal drop in fresh blooms. Keep arrangements at least 6 feet away from fruit displays.
              </p>
            </div>
          </div>

          {/* Active Detail */}
          <div className="md:col-span-7 bg-[#FAF9F6] p-5 rounded-xl border border-stone-200/70 flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
                {activeTip.category}
              </span>
              <h4 className="font-serif text-xl font-semibold text-stone-900 mt-1 mb-2">
                {activeTip.title}
              </h4>
              <p className="text-xs text-stone-600 italic font-serif mb-4 leading-relaxed">
                "{activeTip.summary}"
              </p>

              <div className="space-y-3 pt-2 border-t border-stone-200/60">
                {activeTip.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Atelier Botanica Longevity Guarantee</span>
              </span>
              <button
                onClick={onClose}
                className="text-stone-900 font-semibold hover:underline cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
