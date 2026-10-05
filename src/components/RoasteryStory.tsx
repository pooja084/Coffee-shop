import React from 'react';
import { Award, Compass, HeartHandshake, Leaf } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const RoasteryStory: React.FC = () => {
  return (
    <section id="philosophy" className="py-16 sm:py-24 border-b border-[#E8E4DA] bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle & Headline */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7E6F] mb-2">
            Origins & Sustainable Terroir
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1A1816] leading-tight">
            Traceable Micro-Lots. <br />
            Zero Compromise Roasting.
          </h2>
          <p className="text-sm sm:text-base text-[#575045] mt-4 leading-relaxed">
            Every green bean that enters our hopper is sourced through direct-trade relationships with independent farming families. We pay an average of 140% above fair-trade minimums to support regenerative agriculture and living wages.
          </p>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-[#FAF8F5] border border-[#E3DCD0] rounded-xl p-6 space-y-3">
            <Compass className="w-6 h-6 text-[#8A5B2F]" />
            <h3 className="font-display text-lg text-[#1A1816]">100% Direct-Origin</h3>
            <p className="text-xs text-[#5C5449] leading-relaxed">
              We travel yearly to Huila, Guji, and Antigua, partnering directly with farmers who hand-harvest only ripest coffee cherries at peak brix sugar density.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E3DCD0] rounded-xl p-6 space-y-3">
            <Leaf className="w-6 h-6 text-[#8A5B2F]" />
            <h3 className="font-display text-lg text-[#1A1816]">Single-Convection Tech</h3>
            <p className="text-xs text-[#5C5449] leading-relaxed">
              Roasted on a closed-circuit Loring S15 Kestrel roaster, eliminating smoke emissions and cutting natural gas consumption by 80% compared to traditional drum roasters.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E3DCD0] rounded-xl p-6 space-y-3">
            <Award className="w-6 h-6 text-[#8A5B2F]" />
            <h3 className="font-display text-lg text-[#1A1816]">85+ Specialty Grade</h3>
            <p className="text-xs text-[#5C5449] leading-relaxed">
              Every crop undergoes strict blind cupping protocols. Only micro-lots scoring 85 points or higher on the SCA scale make our seasonal roasting rotation.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#E3DCD0] rounded-xl p-6 space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#8A5B2F]" />
            <h3 className="font-display text-lg text-[#1A1816]">Living Wage Pledges</h3>
            <p className="text-xs text-[#5C5449] leading-relaxed">
              Our direct trade model ensures profits remain with regional cooperatives and pickers, funding local schooling and clean washing stations.
            </p>
          </div>
        </div>

        {/* Proof Adjacency Banner */}
        <div className="bg-[#1A1816] text-[#FBFBF9] rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {CAFE_INFO.stats.map((stat, idx) => (
              <div key={stat.label} className={idx > 0 ? 'pt-4 md:pt-0' : ''}>
                <div className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#E8DCC9]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#A89F93] mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
