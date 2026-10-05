import React, { useState } from 'react';
import { Plus, Coffee, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { Product, CategoryId } from '../types/coffee';

interface MenuSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  products,
  onSelectProduct,
  onQuickAdd
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' ? true : product.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.tastingNotes && product.tastingNotes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-16 sm:py-24 border-b border-[#E8E4DA] bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7F70] mb-2">
              The Atelier Catalog
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1A1816]">
              Handcrafted Menu & Roast Offerings
            </h2>
          </div>

          {/* Interactive Category Segmented Control (Buttons with click handlers) */}
          <div className="flex items-center gap-1 p-1 bg-[#EFECE4] rounded-lg overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'Complete Menu' },
              { id: 'drinks', label: 'Espresso & Drinks' },
              { id: 'beans', label: 'Single-Origin Beans' },
              { id: 'bakery', label: 'Artisan Bakery' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryId)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#1A1816] text-[#FBFBF9] shadow-xs'
                    : 'text-[#585147] hover:text-[#1A1816] hover:bg-[#E5E1D5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Results Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-xs text-[#6B6357]">
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by notes (e.g. jasmine, cacao, yuzu)..."
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DCD5C6] bg-white placeholder-[#9E9585] focus:outline-hidden focus:border-[#1A1816]"
            />
          </div>
          <div>
            Showing <span className="font-mono tabular-nums font-semibold text-[#1A1816]">{filteredProducts.length}</span> handcrafted offerings
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop with uniform aspect ratio & baseline alignment */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isBean = product.category === 'beans';
              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-[#FAF8F5] border border-[#E5E0D5] rounded-xl overflow-hidden hover:border-[#BFB6A4] hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image: 65-70% visual prominence with subtle zoom */}
                  <div 
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-4/3 w-full bg-[#EBE6DB] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Subtle status marker with zero-pill discipline */}
                    {product.featured && (
                      <div className="absolute top-3 left-3 bg-[#1A1816]/90 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase font-semibold px-2.5 py-1 rounded">
                        Roaster's Pick
                      </div>
                    )}
                  </div>

                  {/* Card Content & Metadata */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Category Text */}
                      <div className="text-[11px] font-medium uppercase tracking-wider text-[#8A7F70] mb-1">
                        {product.subcategory}
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-display text-lg text-[#1A1816] group-hover:text-[#80542C] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#5C554B] line-clamp-2 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Tasting Notes as clean text with typographic separator */}
                      {product.tastingNotes && product.tastingNotes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#EAE5DA] text-[11px] text-[#6E6456] flex flex-wrap items-center gap-1.5">
                          {product.tastingNotes.slice(0, 3).map((note, i) => (
                            <React.Fragment key={note}>
                              <span>{note}</span>
                              {i < Math.min(product.tastingNotes!.length, 3) - 1 && (
                                <span aria-hidden="true" className="text-[#B3A998]">·</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Baseline Module: Price & Primary Action */}
                    <div className="pt-4 mt-4 border-t border-[#EAE5DA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#8A8173] block">Starting at</span>
                        <span className="font-mono tabular-nums text-base font-bold text-[#1A1816]">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="px-3 py-1.5 text-xs font-medium text-[#383129] bg-[#EDE9DE] hover:bg-[#E3DDCF] rounded-md transition-colors"
                        >
                          {isBean ? 'Select Grind' : 'Customize'}
                        </button>

                        <button
                          type="button"
                          onClick={() => onQuickAdd(product)}
                          aria-label={`Quick add ${product.name} to cart`}
                          className="p-1.5 text-[#FBFBF9] bg-[#1A1816] hover:bg-[#2C2722] rounded-md transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#F4F1EA] rounded-xl border border-[#E0DBCF] p-8">
            <Coffee className="w-10 h-10 text-[#8C806F] mx-auto mb-3" />
            <p className="font-display text-lg text-[#1A1816]">No coffee or bakery items match "{searchQuery}"</p>
            <p className="text-xs text-[#6F6659] mt-1">Try searching for other sensory notes or reset the filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-white bg-[#1A1816] rounded-md"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
