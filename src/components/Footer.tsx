import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Coffee } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#141210] text-[#E8E3D8] pt-16 pb-12 border-t border-[#29241F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C2721]">
          
          {/* Brand & Ethos */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-white block">
              KROMA ROASTERS
            </span>
            <p className="text-xs text-[#9E9585] leading-relaxed max-w-sm">
              Artisanal single-origin roastery and espresso bar located in the Arts District. Sourcing regenerative micro-lots and roasting with closed-circuit convection technology.
            </p>
            <div className="text-xs text-[#7A7161] space-y-1">
              <div>{CAFE_INFO.address}</div>
              <div>{CAFE_INFO.phone} · {CAFE_INFO.email}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A89E8D]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#8E8474]">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Cafe Drinks Menu</a>
              </li>
              <li>
                <a href="#beans" className="hover:text-white transition-colors">Single Origin Beans</a>
              </li>
              <li>
                <a href="#brew-guide" className="hover:text-white transition-colors">Brewing Ratio Tool</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">Sourcing Standards</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">Hours & Directions</a>
              </li>
            </ul>
          </div>

          {/* Roastery Sourcing Standards */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A89E8D]">
              Certifications
            </div>
            <ul className="space-y-2 text-xs text-[#8E8474]">
              <li>SCA Grade 85+</li>
              <li>100% Direct Farm Trade</li>
              <li>Zero-Emission Loring Roaster</li>
              <li>Compostable Cornstarch Bags</li>
              <li>Oat Milk Carbon Offset</li>
            </ul>
          </div>

          {/* Micro-lot Roast Drops Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#A89E8D]">
              Rare Crop Releases
            </div>
            <p className="text-xs text-[#8E8474] leading-relaxed">
              Receive first access when limited nano-lots and competition Geishas are roasted. No spam, strictly coffee.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="barista@domain.com"
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-[#3A332B] bg-[#1E1B17] text-white placeholder-[#6B6152] focus:outline-hidden focus:border-[#E8E3D8]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 py-2.5 bg-[#E8E3D8] hover:bg-white text-[#141210] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are on the rare harvest dispatch list.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#786E5E] gap-4">
          <div>
            © {new Date().getFullYear()} Kroma Coffee Roasters Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Specialty Coffee Association Member</span>
            <span aria-hidden="true">·</span>
            <span>Ethical Harvest Certified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
