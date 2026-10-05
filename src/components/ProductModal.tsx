import React, { useState } from 'react';
import { X, Check, Plus, Minus, ShoppingBag, Coffee, Sparkles } from 'lucide-react';
import { Product, CartCustomization, GrindOption, MilkOption, SizeOption, TemperatureOption } from '../types/coffee';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, customization?: CartCustomization) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const isBean = product.category === 'beans';
  const isDrink = product.category === 'drinks';

  // State for customization
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Whole Bean');
  const [selectedMilk, setSelectedMilk] = useState<MilkOption>('Whole Organic Milk');
  const [selectedSize, setSelectedSize] = useState<SizeOption>('12 oz (Standard)');
  const [selectedTemp, setSelectedTemp] = useState<TemperatureOption>('Hot');
  const [notes, setNotes] = useState('');
  const [bagWeightMultiplier, setBagWeightMultiplier] = useState<number>(1); // 1 = 250g, 1.85 = 500g, 3.4 = 1kg
  const [bagWeightLabel, setBagWeightLabel] = useState<string>('250g (Standard Bag)');

  // Calculate unit price based on selections
  const basePrice = product.price;
  let dynamicUnitPrice = basePrice;

  if (isBean) {
    dynamicUnitPrice = basePrice * bagWeightMultiplier;
  } else if (isDrink) {
    if (selectedSize.startsWith('16')) dynamicUnitPrice += 0.75;
    if (selectedSize.startsWith('8')) dynamicUnitPrice -= 0.50;
    if (selectedMilk === 'Oatly Oat Milk') dynamicUnitPrice += 0.75;
    if (selectedMilk === 'House Almond Milk') dynamicUnitPrice += 0.75;
  }

  const totalPrice = dynamicUnitPrice * quantity;

  const handleAdd = () => {
    const custom: CartCustomization = {};
    if (isBean) {
      custom.grind = selectedGrind;
      custom.notes = `${bagWeightLabel}${notes ? ` · Note: ${notes}` : ''}`;
    } else if (isDrink) {
      custom.milk = selectedMilk;
      custom.size = selectedSize;
      custom.temperature = selectedTemp;
      if (notes) custom.notes = notes;
    } else {
      if (notes) custom.notes = notes;
    }

    // Call add to cart
    onAddToCart({
      ...product,
      price: dynamicUnitPrice
    }, quantity, custom);

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-[#FBFBF9] border border-[#E4DFD3] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 z-10 p-2 text-[#4A453E] hover:text-black bg-[#F2EFE8]/80 hover:bg-[#E7E2D7] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Hero Image */}
        <div className="relative h-60 sm:h-72 w-full bg-[#E8E3D8] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="text-xs font-medium uppercase tracking-wider text-[#E8DCC9] mb-1">
              {product.subcategory}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-white">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Description & Tasting notes */}
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-[#4F4941] leading-relaxed">
              {product.description}
            </p>

            {product.tastingNotes && product.tastingNotes.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#70675B] pt-1">
                <span className="font-medium text-[#1A1816]">Sensory notes:</span>
                {product.tastingNotes.map((note, idx) => (
                  <React.Fragment key={note}>
                    <span>{note}</span>
                    {idx < product.tastingNotes!.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* Bean Technical Terroir Details */}
          {isBean && product.origin && (
            <div className="bg-[#F3EFE7] rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#80776C] block">Origin & Region</span>
                <span className="font-semibold text-[#1A1816] mt-0.5 block">{product.origin}, {product.region}</span>
              </div>
              <div>
                <span className="text-[#80776C] block">Elevation</span>
                <span className="font-semibold text-[#1A1816] mt-0.5 block">{product.altitude}</span>
              </div>
              <div>
                <span className="text-[#80776C] block">Process</span>
                <span className="font-semibold text-[#1A1816] mt-0.5 block">{product.process}</span>
              </div>
              <div>
                <span className="text-[#80776C] block">Roast Profile</span>
                <span className="font-semibold text-[#1A1816] mt-0.5 block">{product.roastLevel} Roast</span>
              </div>
            </div>
          )}

          {/* Bean Customizer: Size & Grind */}
          {isBean && (
            <div className="space-y-5 pt-2 border-t border-[#E8E4DA]">
              {/* Bag Size */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635B50] block mb-2">
                  Bag Weight & Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '250g (Standard)', multiplier: 1, desc: 'approx. 16 cups' },
                    { label: '500g (Reserve)', multiplier: 1.85, desc: 'approx. 32 cups (-8%)' },
                    { label: '1kg (Cafe Bulk)', multiplier: 3.4, desc: 'approx. 65 cups (-15%)' }
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => {
                        setBagWeightMultiplier(opt.multiplier);
                        setBagWeightLabel(opt.label);
                      }}
                      className={`p-3 rounded-lg text-left border transition-all text-xs ${
                        bagWeightMultiplier === opt.multiplier
                          ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9]'
                          : 'border-[#E4DFD3] bg-[#FAF8F4] text-[#3A352F] hover:border-[#B5AEA0]'
                      }`}
                    >
                      <div className="font-semibold">{opt.label}</div>
                      <div className={`text-[11px] mt-0.5 ${bagWeightMultiplier === opt.multiplier ? 'text-[#D0C8B8]' : 'text-[#8A8173]'}`}>
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635B50] block mb-2">
                  Grind Selection
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Whole Bean', 'Pour-over (V60 / Kalita)', 'Espresso', 'French Press', 'Cold Brew', 'Aeropress'] as GrindOption[]).map((grind) => (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setSelectedGrind(grind)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left border transition-all ${
                        selectedGrind === grind
                          ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9]'
                          : 'border-[#E4DFD3] bg-[#FAF8F4] text-[#3A352F] hover:border-[#B5AEA0]'
                      }`}
                    >
                      {grind}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Drink Customizer: Size, Temperature, Milk */}
          {isDrink && (
            <div className="space-y-5 pt-2 border-t border-[#E8E4DA]">
              {/* Temperature */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635B50] block mb-2">
                  Preparation Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Hot', 'Iced'] as TemperatureOption[]).map((temp) => (
                    <button
                      key={temp}
                      type="button"
                      onClick={() => setSelectedTemp(temp)}
                      className={`py-2 px-4 rounded-lg text-xs font-medium text-center border transition-all ${
                        selectedTemp === temp
                          ? 'border-[#1A1816] bg-[#1A1816] text-white'
                          : 'border-[#E4DFD3] bg-[#FAF8F4] text-[#3A352F] hover:border-[#B5AEA0]'
                      }`}
                    >
                      {temp === 'Hot' ? 'Steamed & Hot' : 'Cold Brewed over Ice'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635B50] block mb-2">
                  Cup Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['8 oz (Cortado / Flat)', '12 oz (Standard)', '16 oz (Large)'] as SizeOption[]).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium text-left border transition-all ${
                        selectedSize === sz
                          ? 'border-[#1A1816] bg-[#1A1816] text-white'
                          : 'border-[#E4DFD3] bg-[#FAF8F4] text-[#3A352F] hover:border-[#B5AEA0]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#635B50] block mb-2">
                  Milk / Alternative
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Whole Organic Milk', 'Oatly Oat Milk', 'House Almond Milk', 'None (Black)'] as MilkOption[]).map((milk) => (
                    <button
                      key={milk}
                      type="button"
                      onClick={() => setSelectedMilk(milk)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium text-left border transition-all ${
                        selectedMilk === milk
                          ? 'border-[#1A1816] bg-[#1A1816] text-white'
                          : 'border-[#E4DFD3] bg-[#FAF8F4] text-[#3A352F] hover:border-[#B5AEA0]'
                      }`}
                    >
                      <span>{milk}</span>
                      {milk.includes('Oat') || milk.includes('Almond') ? (
                        <span className="block text-[10px] opacity-75">+ $0.75</span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#635B50] block mb-1.5">
              Special Preparation Request (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra hot, double filtered, extra cup sleeve..."
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DED7C9] bg-white focus:outline-hidden focus:border-[#1A1816]"
            />
          </div>

          {/* Sticky Bottom Module: Quantity & Add Button */}
          <div className="pt-4 border-t border-[#E8E4DA] flex items-center justify-between gap-4">
            {/* Stepper */}
            <div className="flex items-center border border-[#D5CEBF] rounded-lg bg-[#FAF8F4]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="p-2 text-[#4A443B] hover:text-black hover:bg-[#ECE7DC] rounded-l-lg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-xs font-mono font-semibold tabular-nums text-[#1A1816]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="p-2 text-[#4A443B] hover:text-black hover:bg-[#ECE7DC] rounded-r-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-6 bg-[#1A1816] hover:bg-[#2C2722] text-[#FBFBF9] font-medium text-sm rounded-lg transition-colors flex items-center justify-between shadow-xs"
            >
              <span>Add to Bag</span>
              <span className="font-mono tabular-nums font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
