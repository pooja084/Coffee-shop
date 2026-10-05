import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  totalCartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCartCount,
  onOpenCart,
  onOpenReservation
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E8E4DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-display text-2xl font-bold tracking-tight text-[#1A1816] hover:opacity-80 transition-opacity"
        >
          KROMA ROASTERS
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A453E]">
          <a href="#menu" className="hover:text-[#1A1816] transition-colors py-1">
            Cafe Menu
          </a>
          <a href="#beans" className="hover:text-[#1A1816] transition-colors py-1">
            Single Origins
          </a>
          <a href="#brew-guide" className="hover:text-[#1A1816] transition-colors py-1">
            Brew Calculator
          </a>
          <a href="#philosophy" className="hover:text-[#1A1816] transition-colors py-1">
            Sourcing & Craft
          </a>
          <a href="#visit" className="hover:text-[#1A1816] transition-colors py-1">
            Visit & Hours
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#2C241E] bg-[#EFECE4] hover:bg-[#E5E1D6] rounded-md transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Table & Tasting</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FBFBF9] bg-[#1A1816] hover:bg-[#2E2B27] rounded-md transition-colors whitespace-nowrap shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums text-xs bg-[#3E3832] px-1.5 py-0.5 rounded text-[#F4F1EA]">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2C241E] hover:text-black rounded-md focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E4DA] bg-[#FBFBF9] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[#38332D]">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Cafe Menu
            </a>
            <a
              href="#beans"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Single Origins
            </a>
            <a
              href="#brew-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Brew Calculator & Ratio
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Sourcing & Craft
            </a>
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-black"
            >
              Visit & Hours
            </a>
          </nav>
          <div className="pt-2 border-t border-[#E8E4DA]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-2.5 text-xs font-semibold text-center text-[#1A1816] bg-[#ECE8DC] rounded-md"
            >
              Reserve Table / Tasting
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
