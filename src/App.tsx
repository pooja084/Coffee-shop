/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BrewCalculator } from './components/BrewCalculator';
import { FlavorMatcher } from './components/FlavorMatcher';
import { RoasteryStory } from './components/RoasteryStory';
import { VisitHoursSection } from './components/VisitHoursSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/coffeeData';
import { Product, CartItem, CartCustomization } from './types/coffee';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  // Cart state initialized from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kroma_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kroma_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Could not save cart:', err);
    }
  }, [cartItems]);

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to cart with customizations
  const handleAddToCart = (
    product: Product,
    quantity: number,
    customization?: CartCustomization
  ) => {
    // Generate a unique key based on product ID and customization snapshot
    const customKey = customization ? JSON.stringify(customization) : 'default';
    const itemId = `${product.id}-${btoa(customKey).slice(0, 10)}`;

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((it) => it.id === itemId);
      if (existingIdx > -1) {
        const next = [...prevItems];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [
        ...prevItems,
        {
          id: itemId,
          product,
          quantity,
          customization,
          unitPrice: product.price
        }
      ];
    });

    showToast(`Added ${quantity}× ${product.name} to bag`);
  };

  // Quick add from card (without opening modal)
  const handleQuickAdd = (product: Product) => {
    if (product.category === 'beans') {
      // If it's beans, default to Whole Bean
      handleAddToCart(product, 1, { grind: 'Whole Bean' });
    } else if (product.category === 'drinks') {
      // If drink, default to standard hot whole milk
      handleAddToCart(product, 1, {
        size: '12 oz (Standard)',
        milk: 'Whole Organic Milk',
        temperature: 'Hot'
      });
    } else {
      handleAddToCart(product, 1);
    }
  };

  // Cart modifications
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Scroll helpers
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBeans = () => {
    const el = document.getElementById('beans');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-[#1A1816] font-body selection:bg-[#1A1816] selection:text-[#FBFBF9]">
      
      {/* Top Banner: Roastery Fresh Notification */}
      <aside aria-label="Roastery dispatch notice" className="bg-[#1A1816] text-[#E8E2D5] text-[11px] py-2 px-4 text-center border-b border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-medium">
          <span>Fresh Roast Drop: Guji Anaerobic Lot #4 now available.</span>
          <span className="hidden sm:inline text-[#8E8576]">·</span>
          <span className="hidden sm:inline text-[#C4BAA9]">Complimentary local delivery over $35.</span>
        </div>
      </aside>

      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <Navbar
        totalCartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToMenu={scrollToMenu}
          onScrollToBeans={scrollToBeans}
          onOpenFlavorQuiz={scrollToBeans}
        />

        {/* Menu & Catalog Section */}
        <MenuSection
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Find Your Roast Flavor Matcher Quiz */}
        <FlavorMatcher
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, qty) => handleAddToCart(p, qty, { grind: 'Whole Bean' })}
        />

        {/* Interactive Brew Extraction & Ratio Calculator */}
        <BrewCalculator />

        {/* Sourcing & Roastery Story */}
        <RoasteryStory />

        {/* Cafe Hours & Visit */}
        <VisitHoursSection
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleClearCart}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-50 bg-[#1A1816] text-[#FBFBF9] px-4 py-3 rounded-lg shadow-xl border border-[#3C362F] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
          role="status"
          aria-live="polite"
        >
          <div className="w-5 h-5 rounded-full bg-[#3C362F] flex items-center justify-center text-emerald-400">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-semibold text-[#D4C8B2] hover:text-white underline underline-offset-2 ml-2"
          >
            View Bag
          </button>
        </div>
      )}

    </div>
  );
}
