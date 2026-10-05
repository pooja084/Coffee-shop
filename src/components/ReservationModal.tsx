import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Users, Clock, Coffee } from 'lucide-react';
import { TableReservation } from '../types/coffee';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [reservationType, setReservationType] = useState<'table' | 'cupping'>('table');
  const [form, setForm] = useState<TableReservation>({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:30 AM',
    guests: 2,
    notes: ''
  });
  const [confirmed, setConfirmed] = useState(false);
  const [ticketNo, setTicketNo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setTicketNo(`CUP-${Math.floor(1000 + Math.random() * 9000)}`);
    setConfirmed(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FBFBF9] border border-[#E3DDD1] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close reservation modal"
          className="absolute top-4 right-4 z-10 p-2 text-[#5A5246] hover:text-black bg-[#F0ECE3] hover:bg-[#E5DFD2] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#857B6C] block">
                Atelier Hospitality
              </span>
              <h2 className="font-display text-2xl text-[#1A1816]">
                Reserve a Table or Cupping Flight
              </h2>
              <p className="text-xs text-[#5D554A] mt-1">
                Enjoy guaranteed seating in our quiet mezzanine or join our master roaster for a guided 4-origin sensory tasting.
              </p>
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFECE4] rounded-lg">
              <button
                type="button"
                onClick={() => setReservationType('table')}
                className={`py-2 text-xs font-medium rounded-md transition-all ${
                  reservationType === 'table'
                    ? 'bg-[#1A1816] text-[#FBFBF9] shadow-xs'
                    : 'text-[#585147] hover:text-[#1A1816]'
                }`}
              >
                Cafe Table Seating
              </button>
              <button
                type="button"
                onClick={() => setReservationType('cupping')}
                className={`py-2 text-xs font-medium rounded-md transition-all ${
                  reservationType === 'cupping'
                    ? 'bg-[#1A1816] text-[#FBFBF9] shadow-xs'
                    : 'text-[#585147] hover:text-[#1A1816]'
                }`}
              >
                Guided Cupping Flight
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jordan Vance"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(415) 555-0199"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#786E61] block mb-1">Email (for confirmation pass) *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jordan@domain.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full text-xs px-2.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Time Slot</label>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full text-xs px-2.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  >
                    <option>8:30 AM</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM (Cupping)</option>
                    <option>1:00 PM</option>
                    <option>2:30 PM</option>
                    <option>4:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-[#786E61] block mb-1">Guests</label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                    className="w-full text-xs px-2.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#786E61] block mb-1">Special Notes / Dietary Requirements</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g. Quiet corner, oat milk preferences, high stool..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#DDD6C8] bg-white focus:outline-hidden focus:border-[#1A1816]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#1A1816] hover:bg-[#2C2721] text-[#FBFBF9] font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm Reservation</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase text-[#857A6C]">Pass Booked</span>
              <h3 className="font-display text-2xl text-[#1A1816]">
                Reservation #{ticketNo}
              </h3>
              <p className="text-xs text-[#5C5346] mt-1">
                We have saved a place for {form.guests} guests on {form.date} at {form.time}.
              </p>
            </div>

            <div className="bg-[#F2EFE8] p-4 rounded-xl text-xs space-y-1.5 text-left border border-[#DDD6C8]">
              <div className="flex justify-between font-semibold text-[#1A1816]">
                <span>Experience:</span>
                <span>{reservationType === 'cupping' ? 'Master Cupping Flight' : 'Reserved Mezzanine'}</span>
              </div>
              <div className="flex justify-between text-[#61594D]">
                <span>Contact:</span>
                <span>{form.name} ({form.phone})</span>
              </div>
              <div className="flex justify-between text-[#61594D]">
                <span>Host station:</span>
                <span>Front register greeting</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 text-xs font-medium text-white bg-[#1A1816] rounded-md hover:bg-[#2C2721]"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
