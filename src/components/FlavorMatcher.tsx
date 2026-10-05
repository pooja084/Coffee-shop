import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Coffee } from 'lucide-react';
import { Product } from '../types/coffee';
import { PRODUCTS } from '../data/coffeeData';

interface FlavorMatcherProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const FlavorMatcher: React.FC<FlavorMatcherProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [method, setMethod] = useState<'filter' | 'espresso' | 'cold' | 'immersion'>('filter');
  const [profile, setProfile] = useState<'floral' | 'balanced' | 'deep'>('floral');
  const [roast, setRoast] = useState<'light' | 'medium' | 'dark'>('light');

  // Match recommendation
  let matchedProductId = 'bean-guji';
  if (profile === 'floral') {
    matchedProductId = 'bean-guji';
  } else if (profile === 'balanced') {
    matchedProductId = 'bean-huila';
  } else if (profile === 'deep') {
    matchedProductId = roast === 'dark' ? 'bean-sumatra' : 'bean-antigua';
  }

  const matchedProduct = PRODUCTS.find((p) => p.id === matchedProductId) || PRODUCTS[0];

  return (
    <section id="beans" className="py-16 sm:py-24 border-b border-[#E8E4DA] bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#827768] mb-2">
            Sensory Taste Profiler
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1816]">
            Find Your Signature Single Origin
          </h2>
          <p className="text-sm text-[#5C5549] mt-3">
            Answer three quick questions about how you drink your coffee to receive our head roaster's personalized micro-lot recommendation.
          </p>
        </div>

        {/* 3 Step Interactive Card */}
        <div className="bg-[#FAF8F5] border border-[#E5DFD4] rounded-2xl p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Question 1: How do you brew? */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#665D50] block">
                1. How Do You Brew?
              </label>
              <div className="space-y-2">
                {[
                  { id: 'filter', label: 'V60 / Pour-over' },
                  { id: 'espresso', label: 'Espresso Machine' },
                  { id: 'cold', label: 'Cold Brew / Ice' },
                  { id: 'immersion', label: 'French Press' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setMethod(item.id as any)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-medium text-left border transition-all ${
                      method === item.id
                        ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9]'
                        : 'border-[#E0DBCF] bg-white text-[#453F36] hover:border-[#ADA394]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Flavor note preference */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#665D50] block">
                2. Preferred Flavor Tone
              </label>
              <div className="space-y-2">
                {[
                  { id: 'floral', label: 'Jasmine, Berries & Citrus', desc: 'Vibrant & Clean' },
                  { id: 'balanced', label: 'Stone Fruit, Honey & Peach', desc: 'Silky & Sweet' },
                  { id: 'deep', label: 'Dark Chocolate & Warm Spice', desc: 'Full & Rich' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setProfile(item.id as any);
                      if (item.id === 'floral') setRoast('light');
                      if (item.id === 'deep') setRoast('dark');
                    }}
                    className={`w-full p-2.5 rounded-lg text-xs text-left border transition-all ${
                      profile === item.id
                        ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9]'
                        : 'border-[#E0DBCF] bg-white text-[#453F36] hover:border-[#ADA394]'
                    }`}
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 ${profile === item.id ? 'text-[#C9BFB0]' : 'text-[#827869]'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Roast depth */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#665D50] block">
                3. Roast Level
              </label>
              <div className="space-y-2">
                {[
                  { id: 'light', label: 'Light Roast', desc: 'Retains fruit & terroir acidity' },
                  { id: 'medium', label: 'Medium Roast', desc: 'Caramelized sugar sweetness' },
                  { id: 'dark', label: 'Medium-Dark', desc: 'Heavy body & smoky cacao' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRoast(item.id as any)}
                    className={`w-full p-2.5 rounded-lg text-xs text-left border transition-all ${
                      roast === item.id
                        ? 'border-[#1A1816] bg-[#1A1816] text-[#FBFBF9]'
                        : 'border-[#E0DBCF] bg-white text-[#453F36] hover:border-[#ADA394]'
                    }`}
                  >
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 ${roast === item.id ? 'text-[#C9BFB0]' : 'text-[#827869]'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendation Match Box */}
          <div className="bg-[#EFEBE1] border border-[#DDD6C8] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 border border-[#D0C7B6] bg-[#E8E2D4]">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A6F60]">
                Curated Match for You · {matchedProduct.origin}
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-[#1A1816]">
                {matchedProduct.name}
              </h3>
              <p className="text-xs text-[#524B41] leading-relaxed max-w-xl">
                {matchedProduct.description}
              </p>
              
              {/* Unboxed Notes */}
              <div className="text-[11px] text-[#6E6354] pt-1">
                <span className="font-semibold text-[#1A1816]">Flavor Notes: </span>
                {matchedProduct.tastingNotes?.join(' · ')}
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2.5 shrink-0 w-full sm:w-auto">
              <div className="font-mono tabular-nums text-xl font-bold text-[#1A1816] text-center sm:text-right">
                ${matchedProduct.price.toFixed(2)}
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onSelectProduct(matchedProduct)}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium text-[#2E2822] bg-[#E4DDD0] hover:bg-[#D9D0C1] rounded-md transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => onAddToCart(matchedProduct, 1)}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-[#1A1816] hover:bg-[#2F2924] rounded-md transition-colors shadow-xs"
                >
                  Add Bag
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
