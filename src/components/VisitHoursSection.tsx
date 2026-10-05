import React from 'react';
import { MapPin, Clock, Wifi, Calendar, Phone, Mail, Navigation } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

interface VisitHoursSectionProps {
  onOpenReservation: () => void;
}

export const VisitHoursSection: React.FC<VisitHoursSectionProps> = ({
  onOpenReservation
}) => {
  // Current time check for cafe open status
  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= 6 && currentHour < 18;

  return (
    <section id="visit" className="py-16 sm:py-24 border-b border-[#E8E4DA] bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7E6F] mb-2">
            The Atelier Space
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1816]">
            Visit the Roastery & Espresso Bar
          </h2>
          <p className="text-sm text-[#5C5549] mt-3">
            Designed as a sanctuary for craft coffee. Watch our roasting batch in real-time through the glass partition while enjoying hand-poured seasonal lots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hours & Status */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E4DDD1] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Live Opening Status Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE4D8]">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1816]">
                    {isOpen ? 'Open Now · Roasting Batch Active' : 'Doors Closed · Opens 6:30 AM'}
                  </span>
                </div>
                <span className="text-xs font-mono text-[#786F62]">Local Time</span>
              </div>

              {/* Operating Hours Table */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#736859]">
                  <Clock className="w-4 h-4 text-[#8C5D30]" />
                  <span>Cafe & Retail Hours</span>
                </div>

                <div className="space-y-3">
                  {CAFE_INFO.hours.map((schedule) => (
                    <div key={schedule.days} className="text-xs">
                      <div className="flex justify-between font-medium text-[#1A1816]">
                        <span>{schedule.days}</span>
                        <span className="font-mono tabular-nums">{schedule.hours}</span>
                      </div>
                      <div className="text-[11px] text-[#7A7163] mt-0.5">
                        {schedule.roastStatus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities & Contact */}
              <div className="pt-4 border-t border-[#EAE4D8] space-y-3 text-xs text-[#524B40]">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8C5D30] shrink-0" />
                  <span>{CAFE_INFO.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Wifi className="w-4 h-4 text-[#8C5D30] shrink-0" />
                  <span>Guest Fiber: {CAFE_INFO.wifi}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#8C5D30] shrink-0" />
                  <span>{CAFE_INFO.phone}</span>
                </div>
              </div>

            </div>

            {/* Action Button: Book Tasting / Table */}
            <div className="pt-6 border-t border-[#EAE4D8]">
              <button
                onClick={onOpenReservation}
                className="w-full py-3 px-4 text-xs font-semibold text-[#1A1816] bg-[#EDE8DC] hover:bg-[#E2DDD0] rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Roastery Table / Cupping Session</span>
              </button>
            </div>

          </div>

          {/* Right Column: Architectural Map & Visual Vignette */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E4DDD1] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A7E6F]">
                Location & Parking
              </div>
              <h3 className="font-display text-2xl text-[#1A1816]">
                Located in the Historic Foundry Yard
              </h3>
              <p className="text-xs text-[#5A5246] leading-relaxed">
                Dedicated customer parking is available in the rear courtyard. Ample bicycle racks and 5-minute express pick-up bays are situated directly in front of our loading doors.
              </p>
            </div>

            {/* Stylized Architectural Floor & Vicinity Map Box */}
            <div className="my-6 rounded-xl border border-[#DCD5C6] bg-[#ECE6DA] p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1A1816_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-[#1A1816] text-[#FBFBF9] px-3 py-1 rounded text-xs font-mono font-medium">
                  KROMA COFFEE ROASTERS · BAY 04
                </div>
                <div className="text-[11px] font-mono text-[#6E6455] bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded">
                  LAT: 37.7749° N, 122.4194° W
                </div>
              </div>

              <div className="relative z-10 space-y-1 bg-white/85 backdrop-blur-sm p-4 rounded-lg max-w-sm border border-[#D5CEBF]">
                <div className="text-xs font-bold text-[#1A1816]">Main Espresso Bar & Roasting Drum</div>
                <div className="text-[11px] text-[#5C5346]">Enter via St. Clair glass double doors. Order pick-up station is located to the immediate right of the register.</div>
              </div>

              <div className="relative z-10 flex justify-end">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#1A1816] hover:bg-[#332E27] rounded-md transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Directions</span>
                </a>
              </div>
            </div>

            {/* Cupping Experience Note */}
            <div className="text-xs text-[#6F6657] border-t border-[#EAE4D8] pt-4 flex items-center justify-between">
              <span>Public Sensory Cupping every Saturday at 11:00 AM</span>
              <span className="font-semibold text-[#1A1816]">Free with bean purchase</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
