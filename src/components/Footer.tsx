import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCareGuide: () => void;
  onOpenWorkshops: () => void;
  onOpenStemBar: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCareGuide,
  onOpenWorkshops,
  onOpenStemBar
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1C1A18] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl text-white font-semibold tracking-tight block">
              Atelier Botanica
            </span>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Fine floral design studio and botanical atelier. Hand-tying heirloom stems
              with dawn market cuts, zero floral foam, and sustainable hand delivery.
            </p>
            <div className="text-xs text-stone-400">
              142 Mercer Street, Soho, New York · +1 (212) 555-0194
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Studio
            </h4>
            <ul className="text-xs text-stone-400 space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('arrangements')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Seasonal Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStemBar}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Stem Bar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('subscriptions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Floral Club
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWorkshops}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Masterclasses
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCareGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Flower Care Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing & Ethics (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Pillars
            </h4>
            <ul className="text-xs text-stone-400 space-y-2">
              <li>Hudson Valley Farms</li>
              <li>Zero Floral Foam</li>
              <li>Compostable Silk Wraps</li>
              <li>7-Day Longevity Pledge</li>
              <li>Same-Day Chilled Delivery</li>
            </ul>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Botanical Gazette
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive our seasonal harvest notes, private workshop announcements, and rare flower releases.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/60">
                <Check className="w-3.5 h-3.5" />
                <span>Thank you. You are subscribed to our gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full text-xs p-2.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="p-2.5 bg-stone-100 hover:bg-white text-stone-900 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 block">
                  We send one thoughtful letter every fortnight. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} Atelier Botanica LLC. All rights reserved. Handcrafted with reverence for botanical life.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
