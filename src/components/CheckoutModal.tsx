import React, { useState } from 'react';
import { X, CheckCircle2, Coffee, Clock, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import { CartItem } from '../types/coffee';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupSlot, setPickupSlot] = useState('In 15–20 minutes');
  const [address, setAddress] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const tipAmount = (subtotal * tipPercent) / 100;
  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal >= 35 ? 0 : 3.50) : 0;
  const finalTotal = subtotal + tax + tipAmount + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `KR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onOrderSuccess();
    }, 700);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FBFBF9] border border-[#E3DDD1] rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close checkout modal"
          className="absolute top-4 right-4 z-10 p-2 text-[#5A5246] hover:text-black bg-[#F0ECE3] hover:bg-[#E5DFD2] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderConfirmed ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#857B6C] block">
                Direct Atelier Checkout
              </span>
              <h2 className="font-display text-2xl text-[#1A1816]">
                Confirm Your Order
              </h2>
            </div>

            {/* Fulfillment Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFECE4] rounded-lg">
              <button
                type="button"
                onClick={() => setFulfillmentType('pickup')}
                className={`py-2 text-xs font-medium rounded-md transition-all ${
                  fulfillmentType === 'pickup'
                    ? 'bg-[#1A1816] text-[#FBFBF9] shadow-xs'
                    : 'text-[#585147] hover:text-[#1A1816]'
                }`}
              >
                In-Store Cafe Pickup
              </button>
              <button
                type="button"
                onClick={() => setFulfillmentType('delivery')}
                className={`py-2 text-xs font-medium rounded-md transition-all ${
                  fulfillmentType === 'delivery'
                    ? 'bg-[#1A1816] text-[#FBFBF9] shadow-xs'
                    : 'text-[#585147] hover:text-[#1A1816]'
                }`}
              >
                Local Courier Shipping
              </button>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#635B50]">
                Customer Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Mobile Phone (for pickup SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(415) 000-0000"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#786E61] block mb-1">Email Receipt</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                />
              </div>

              {fulfillmentType === 'pickup' ? (
                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Estimated Pickup Time</label>
                  <select
                    value={pickupSlot}
                    onChange={(e) => setPickupSlot(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  >
                    <option>In 15–20 minutes</option>
                    <option>In 30–45 minutes</option>
                    <option>In 1 hour</option>
                    <option>Later today (specify at counter)</option>
                    <option>Tomorrow morning at 8:00 AM</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Delivery Address & Apt/Suite</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Market St, Apt 4B, San Francisco, CA"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  />
                </div>
              )}
            </div>

            {/* Tip the Baristas */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#635B50] block mb-2">
                Tip Our Roastery & Barista Team
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[0, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTipPercent(pct)}
                    className={`py-2 text-xs font-mono font-medium rounded-lg border transition-all ${
                      tipPercent === pct
                        ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9]'
                        : 'border-[#DDD7CA] bg-[#FAF8F4] text-[#4A443B] hover:border-[#8E8474]'
                    }`}
                  >
                    {pct === 0 ? 'No tip' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Ledger & Totals */}
            <div className="bg-[#F4F1EA] p-4 rounded-xl space-y-2 text-xs border border-[#E3DDD1]">
              <div className="flex justify-between text-[#5C5448]">
                <span>Items ({items.reduce((acc, it) => acc + it.quantity, 0)})</span>
                <span className="font-mono tabular-nums font-semibold text-[#1A1816]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#5C5448]">
                <span>Taxes (8.25%)</span>
                <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
              </div>
              {tipPercent > 0 && (
                <div className="flex justify-between text-[#5C5448]">
                  <span>Barista Team Tip ({tipPercent}%)</span>
                  <span className="font-mono tabular-nums">${tipAmount.toFixed(2)}</span>
                </div>
              )}
              {fulfillmentType === 'delivery' && (
                <div className="flex justify-between text-[#5C5448]">
                  <span>Courier Delivery</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-[#DDD6C8] flex justify-between text-sm font-bold text-[#1A1816]">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-base">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment simulation button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-[#1A1816] hover:bg-[#2C2721] text-[#FBFBF9] font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Order Confirmation...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize Order · Pay at Pickup / Door (${finalTotal.toFixed(2)})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A7163]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Contactless order confirmation · Zero upfront charge</span>
            </div>

          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A7F70]">
                Order Confirmed
              </span>
              <h2 className="font-display text-3xl text-[#1A1816]">
                Ticket #{orderId}
              </h2>
              <p className="text-xs text-[#595247] max-w-sm mx-auto">
                Thank you, {customerName}! We have transmitted your ticket directly to the atelier barista station.
              </p>
            </div>

            {/* Pickup Badge */}
            <div className="bg-[#F2EFE8] border border-[#DDD6C8] rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between font-semibold text-[#1A1816]">
                <span>Fulfillment Mode</span>
                <span>{fulfillmentType === 'pickup' ? 'Cafe Express Bar' : 'Local Courier'}</span>
              </div>
              <div className="flex justify-between text-[#61584C]">
                <span>Estimated Ready</span>
                <span className="font-mono tabular-nums font-medium text-[#1A1816]">{pickupSlot}</span>
              </div>
              <div className="flex justify-between text-[#61584C]">
                <span>Total Balance</span>
                <span className="font-mono tabular-nums font-bold text-[#1A1816]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-medium text-[#2E2822] bg-[#EFECE4] hover:bg-[#E5E0D4] rounded-md transition-colors flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Ticket</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-xs font-semibold text-white bg-[#1A1816] hover:bg-[#2C2721] rounded-md transition-colors"
              >
                Back to Roastery
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
