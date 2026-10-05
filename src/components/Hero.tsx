import React, { useState } from 'react';
import { ArrowRight, Coffee, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/coffeeData';

interface HeroProps {
  onScrollToMenu: () => void;
  onScrollToBeans: () => void;
  onOpenFlavorQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToMenu,
  onScrollToBeans,
  onOpenFlavorQuiz
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader Kicker with zero-pill discipline */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#7A7265] uppercase tracking-wider mb-4">
          <span>Specialty Roastery</span>
          <span aria-hidden="true">·</span>
          <span>Single-Lot Sourcing</span>
          <span aria-hidden="true">·</span>
          <span>Arts District, Est. 2018</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <h1 
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#1A1816]"
              style={{ textWrap: 'balance' }}
            >
              Roasted with Intention. <br />
              <span className="italic font-light text-[#634E3F]">Brewed with Precision.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#554F46] leading-relaxed max-w-xl">
              We source exclusive micro-lots directly from smallholder farms across Ethiopia, Colombia, and Guatemala. Roasted weekly on zero-emission convection drums and prepared by craft baristas.
            </p>

            {/* Direct Action Hub */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToBeans}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#FBFBF9] bg-[#1A1816] hover:bg-[#332E28] rounded-md transition-colors shadow-xs"
              >
                <span>Shop Fresh Roasted Beans</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToMenu}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#2E2822] bg-[#EFECE4] hover:bg-[#E5E0D4] rounded-md transition-colors"
              >
                <span>Cafe Pickup Menu</span>
              </button>
            </div>

            {/* Quiz helper lead-in */}
            <div className="pt-4 border-t border-[#E8E4DA]/80 flex items-center justify-between text-xs text-[#6F685D]">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#8C6036]" />
                <span>Not sure which roast suits your palate?</span>
              </div>
              <button
                onClick={onOpenFlavorQuiz}
                className="text-xs font-semibold text-[#1A1816] underline underline-offset-4 hover:text-[#8C6036] transition-colors"
              >
                Taste Profile Quiz →
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden bg-[#ECE8DF] border border-[#E0DBD0] shadow-sm aspect-16/10">
              {!imageError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Kroma Coffee Roasters interior with matte black espresso machine and warm morning sunlight"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#2A231C] text-[#F3EFE6] text-center">
                  <Coffee className="w-12 h-12 text-[#B3804D] mb-3" />
                  <p className="font-display text-xl">Atelier Espresso Bar</p>
                  <p className="text-xs text-[#A89F93] mt-1">Single Origin & Specialty Hand Drips</p>
                </div>
              )}

              {/* Minimalist Floating Roast Status Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#1A1816]/90 backdrop-blur-md text-[#F4F1EC] p-3.5 rounded-lg border border-white/10 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#C4B69E] mb-1">
                  <span>TODAY'S BATCH</span>
                  <span>100% ARABICA</span>
                </div>
                <p className="font-medium text-white text-sm truncate">
                  Ethiopian Guji Natural Lot #4
                </p>
                <div className="flex items-center gap-2 text-[11px] text-[#A69E90] mt-1">
                  <span>Roast: Light</span>
                  <span>·</span>
                  <span>Notes: Bergamot & Berry</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
