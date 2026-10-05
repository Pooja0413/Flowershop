import React, { useState } from 'react';
import { CartItem, DeliveryDetails, PlacedOrder } from '../types/cart';
import { X, Check, Truck, CreditCard, DollarSign, Calendar, Clock, Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  onOrderComplete: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  // Form states
  const [recipientName, setRecipientName] = useState('Eleanor Sterling');
  const [recipientPhone, setRecipientPhone] = useState('+1 (555) 234-8901');
  const [streetAddress, setStreetAddress] = useState('742 Evergreen Terrace');
  const [apartment, setApartment] = useState('Suite 4B');
  const [city, setCity] = useState('New York');
  const [postalCode, setPostalCode] = useState('10012');
  const [deliveryDate, setDeliveryDate] = useState('Today (Within 3 Hours)');
  const [deliveryWindow, setDeliveryWindow] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Ring doorbell or leave with doorman if unavailable.');
  const [isGift, setIsGift] = useState(true);
  const [senderName, setSenderName] = useState('Arthur Vance');
  const [senderPhone, setSenderPhone] = useState('+1 (555) 987-6543');
  const [senderEmail, setSenderEmail] = useState('arthur.vance@example.com');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'apple-pay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Final confirmation receipt
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  // Financial calculations
  const subtotal = items.reduce((sum, item) => sum + item.totalUnitPrice * item.quantity, 0);
  const freeThreshold = 75;
  const isFreeDelivery = subtotal >= freeThreshold;
  const deliveryFee = isFreeDelivery ? 0 : 15;
  const discountAmount = appliedDiscount > 0 ? subtotal * appliedDiscount : 0;
  const estimatedTax = (subtotal - discountAmount) * 0.08875; // NYC sales tax rate
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + estimatedTax);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName || !streetAddress || !postalCode || !recipientPhone) return;
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const orderData: PlacedOrder = {
      orderNumber: `FLR-${Math.floor(100000 + Math.random() * 900000)}`,
      datePlaced: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      items,
      subtotal,
      deliveryFee,
      discount: discountAmount,
      tax: estimatedTax,
      total,
      deliveryDetails: {
        recipientName,
        recipientPhone,
        streetAddress,
        apartment,
        city,
        postalCode,
        deliveryDate,
        deliveryWindow,
        deliveryInstructions,
        isGift,
        senderName,
        senderPhone,
        senderEmail
      },
      paymentMethod
    };

    setConfirmedOrder(orderData);
    setStep('confirmation');
    onOrderComplete(orderData);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-200/80 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-800" />
              <span>Chilled Reservoir Hand-Delivery</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              {step === 'confirmation' ? 'Order Confirmed' : 'Florist Hand-Delivery Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (for steps 1 & 2) */}
        {step !== 'confirmation' && (
          <div className="bg-stone-50 px-6 py-2.5 border-b border-stone-200/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === 'details' ? 'bg-stone-900 text-white' : 'bg-emerald-700 text-white'
                }`}
              >
                1
              </span>
              <span className={step === 'details' ? 'font-semibold text-stone-900' : 'text-stone-600'}>
                Recipient & Schedule
              </span>
            </div>
            <span className="text-stone-300">———</span>
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === 'payment' ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-600'
                }`}
              >
                2
              </span>
              <span className={step === 'payment' ? 'font-semibold text-stone-900' : 'text-stone-500'}>
                Payment & Verification
              </span>
            </div>
          </div>
        )}

        {/* Step 1: Recipient & Delivery Schedule Form */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Recipient Details */}
            <div>
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                1. Recipient Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1">Recipient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Recipient Phone (For Delivery Courier) *</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                2. Delivery Destination
              </h4>
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Apt / Suite / Buzz</label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">Postal / Zip Code *</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">Courier Delivery Instructions</label>
                  <input
                    type="text"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="e.g. Leave with building concierge, ring apartment buzzer 14B"
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Date & Time Slot */}
            <div>
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                3. Delivery Date & Time Window
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1">Delivery Day</label>
                  <select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                  >
                    <option value="Today (Within 3 Hours)">Today (Express Hand-Delivery within 3h)</option>
                    <option value="Tomorrow (Morning Harvest)">Tomorrow (Morning Fresh Harvest)</option>
                    <option value="Friday, Oct 16">Friday, Oct 16 (Pre-Weekend Drop)</option>
                    <option value="Saturday, Oct 17">Saturday, Oct 17</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">Time Window</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'morning', label: '9AM–1PM' },
                      { id: 'afternoon', label: '1PM–5PM' },
                      { id: 'evening', label: '5PM–8PM' }
                    ].map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setDeliveryWindow(w.id as any)}
                        className={`p-2 rounded-lg border text-center transition-colors cursor-pointer text-xs ${
                          deliveryWindow === w.id
                            ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        {w.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sender / Purchaser Details */}
            <div className="pt-2 border-t border-stone-200">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800 mb-3">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="rounded text-stone-900 focus:ring-0"
                />
                <span>This is a gift delivery (We hide invoice pricing and attach your handwritten card)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1">Your Name (Sender) *</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Your Email (Order Confirmation) *</label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500">Order Subtotal:</span>
                <span className="text-base font-serif font-bold text-stone-900 tabular-nums ml-2">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment & Verification */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Delivery Recap */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/80 text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-stone-900 flex items-center justify-between">
                <span>Hand-delivering to {recipientName}</span>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  Edit details
                </button>
              </div>
              <div>{streetAddress}, {apartment ? `${apartment}, ` : ''}{city}, {postalCode}</div>
              <div className="text-stone-500">
                Scheduled for {deliveryDate} ({deliveryWindow} slot)
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-3">
                Select Payment Method
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1.5" />
                  <span className="text-xs">Credit / Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <DollarSign className="w-5 h-5 mx-auto mb-1.5" />
                  <span className="text-xs">Cash on Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'apple-pay'
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mx-auto mb-1.5" />
                  <span className="text-xs">Apple / Google Pay</span>
                </button>
              </div>
            </div>

            {/* Payment Sub-Form */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200 bg-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">CVC Security Code</label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/70 text-xs text-amber-900 space-y-2">
                <div className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  <span>Cash on Hand-Delivery Verified</span>
                </div>
                <p className="leading-relaxed">
                  Total payable upon flower hand-off: <strong className="font-mono text-sm">${total.toFixed(2)}</strong>.
                  Our florist courier carries exact change or accepts card tap on delivery.
                </p>
              </div>
            )}

            {paymentMethod === 'apple-pay' && (
              <div className="p-4 bg-stone-100 rounded-xl border border-stone-200 text-center space-y-2 text-xs text-stone-700">
                <p>One-touch biometric authorization enabled.</p>
                <div className="inline-block px-4 py-2 bg-black text-white font-semibold rounded-lg text-sm">
                   Pay ${total.toFixed(2)}
                </div>
              </div>
            )}

            {/* Financial Ledger Breakdown */}
            <div className="pt-2 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal ({items.length} arrangements)</span>
                <span className="tabular-nums font-mono">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promo Discount</span>
                  <span className="tabular-nums font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Hand-Delivery (Water Reservoir)</span>
                <span className="tabular-nums font-mono">
                  {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>State & Local Tax (NYC 8.875%)</span>
                <span className="tabular-nums font-mono">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Final Total Charged</span>
                <span className="text-xl font-serif font-bold tabular-nums">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="flex-1 py-3.5 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm text-center"
              >
                Authorize & Dispatch Order (${total.toFixed(2)})
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation Receipt */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="p-8 text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-emerald-800 font-semibold mb-1">
                Order Confirmed — Preparing Dawn Harvest
              </div>
              <h4 className="font-serif text-3xl font-semibold text-stone-900">
                Thank You, {confirmedOrder.deliveryDetails.senderName}
              </h4>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                Order Tracking ID: {confirmedOrder.orderNumber}
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="max-w-md mx-auto p-5 bg-[#FAF7F2] rounded-xl border border-stone-200/80 text-left text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 font-semibold text-stone-900">
                <span>Delivery Schedule</span>
                <span className="text-stone-600 font-normal">
                  {confirmedOrder.deliveryDetails.deliveryDate}
                </span>
              </div>

              <div>
                <span className="text-stone-500 block mb-0.5">Recipient</span>
                <div className="font-semibold text-stone-900">
                  {confirmedOrder.deliveryDetails.recipientName}
                </div>
                <div className="text-stone-600">
                  {confirmedOrder.deliveryDetails.streetAddress}, {confirmedOrder.deliveryDetails.city}
                </div>
              </div>

              <div>
                <span className="text-stone-500 block mb-1">Arrangements</span>
                <ul className="space-y-1">
                  {confirmedOrder.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-stone-700">
                      <span>
                        {item.type === 'catalog' ? item.product.name : item.name} × {item.quantity}
                      </span>
                      <span className="font-mono tabular-nums">
                        ${item.totalUnitPrice * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-stone-200/60 flex justify-between font-semibold text-stone-900">
                <span>Total Paid</span>
                <span className="font-serif text-sm">${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              A courier tracking notification has been dispatched to{' '}
              <strong className="text-stone-800">{confirmedOrder.deliveryDetails.senderEmail}</strong>.
              All stems are hydrated in cold water reservoirs to ensure peak freshness upon arrival.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Continue Exploring Atelier Botanica
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
