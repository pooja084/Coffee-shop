import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { CartItem } from '../types/coffee';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 35.00;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBFBF9] border-l border-[#E5E0D5] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E4DA] flex items-center justify-between bg-[#F4F1EA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1A1816]" />
              <h2 className="font-display text-lg text-[#1A1816]">Your Atelier Bag</h2>
              <span className="font-mono tabular-nums text-xs bg-[#E3DDD1] px-2 py-0.5 rounded text-[#4A4338]">
                {items.reduce((acc, it) => acc + it.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-[#595247] hover:text-black rounded-md hover:bg-[#EAE4D8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-[#EFECE3] border-b border-[#E3DCD0] text-xs text-[#524B40]">
            <div className="flex items-center gap-2 mb-1.5">
              <Truck className="w-4 h-4 text-[#8A5B2F]" />
              {hasFreeShipping ? (
                <span className="font-medium text-[#1A1816]">You unlocked complimentary local courier / ship!</span>
              ) : (
                <span>
                  Add <span className="font-mono tabular-nums font-semibold text-[#1A1816]">${amountToFreeShipping.toFixed(2)}</span> more for free delivery
                </span>
              )}
            </div>
            <div className="w-full bg-[#DFD8CA] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#1A1816] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-[#EAE4D8]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-[#EFECE3] flex items-center justify-center text-[#8C806F] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg text-[#1A1816]">Your bag is currently empty</h3>
                <p className="text-xs text-[#6F6659] mt-1 max-w-xs leading-relaxed">
                  Explore our handcrafted cafe drinks or order freshly roasted single-origin bean bags for home brewing.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-4 py-2 text-xs font-semibold text-white bg-[#1A1816] rounded-md hover:bg-[#2C2721] transition-colors"
                >
                  Explore Cafe Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#ECE6DC] shrink-0 border border-[#DDD6C8]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-sm font-medium text-[#1A1816] pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#968E80] hover:text-red-700 transition-colors p-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {item.customization && (
                        <div className="text-[11px] text-[#736A5D] mt-1 space-y-0.5">
                          {item.customization.grind && (
                            <div>Grind: <span className="font-medium text-[#1A1816]">{item.customization.grind}</span></div>
                          )}
                          {item.customization.milk && (
                            <div>Milk: <span className="font-medium text-[#1A1816]">{item.customization.milk}</span></div>
                          )}
                          {item.customization.size && (
                            <div>Size: <span className="font-medium text-[#1A1816]">{item.customization.size}</span></div>
                          )}
                          {item.customization.temperature && (
                            <div>Temp: <span className="font-medium text-[#1A1816]">{item.customization.temperature}</span></div>
                          )}
                          {item.customization.notes && (
                            <div className="italic text-[#8A8072]">{item.customization.notes}</div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Stepper & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#D5CEBF] rounded-md bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 hover:bg-[#ECE6DA] text-[#4A4338] transition-colors rounded-l-md"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-semibold tabular-nums text-[#1A1816]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="p-1 hover:bg-[#ECE6DA] text-[#4A4338] transition-colors rounded-r-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-mono tabular-nums text-sm font-semibold text-[#1A1816]">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8E4DA] bg-[#F4F1EA] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#5C5448]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums font-semibold text-[#1A1816]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#5C5448]">
                  <span>Estimated Local Taxes</span>
                  <span className="font-mono tabular-nums">
                    ${(subtotal * 0.0825).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#5C5448]">
                  <span>Pickup / Standard Courier</span>
                  <span className="font-mono tabular-nums">
                    {hasFreeShipping ? 'COMPLIMENTARY' : '$3.50'}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E0D9CB] flex justify-between text-sm font-semibold text-[#1A1816]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-base">
                    ${(subtotal + subtotal * 0.0825 + (hasFreeShipping ? 0 : 3.5)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-6 bg-[#1A1816] hover:bg-[#2C2721] text-[#FBFBF9] font-medium text-xs rounded-lg transition-colors flex items-center justify-between shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-[#807668] text-center">
                Prepared fresh upon pickup confirmation or dispatched within 24 hours.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
