import React, { useState } from 'react';
import { WORKSHOPS, Workshop } from '../data/flowers';
import { X, Calendar, Clock, Users, Check, Sparkles, Ticket } from 'lucide-react';

interface WorkshopsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkshopsModal: React.FC<WorkshopsModalProps> = ({ isOpen, onClose }) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(WORKSHOPS[0]);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail || !selectedWorkshop) return;
    setIsBooked(true);
  };

  const handleResetModal = () => {
    setIsBooked(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Weekend Botanical Masterclasses</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              Floral Design Workshops
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close workshops dialog"
            className="p-2 rounded-full hover:bg-stone-200/60 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl font-semibold text-stone-900">
              Seat Confirmed!
            </h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Thank you, {attendeeName}. We have saved your reservation for{' '}
              <strong className="text-stone-900 font-semibold">{selectedWorkshop?.title}</strong> on{' '}
              {selectedWorkshop?.date}. A confirmation ticket has been dispatched to {attendeeEmail}.
            </p>

            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-stone-200/80 max-w-sm mx-auto text-left text-xs space-y-1.5">
              <div className="flex items-center gap-1 text-stone-700 font-semibold">
                <Ticket className="w-3.5 h-3.5 text-amber-700" />
                <span>Atelier Masterclass Pass #WS-{(Math.random() * 9000 + 1000).toFixed(0)}</span>
              </div>
              <div className="text-stone-500">Location: Atelier Botanica, 142 Mercer St, Soho, NY</div>
              <div className="text-stone-500">Includes all seasonal blooms, shears, and vase to keep.</div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetModal}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                Return to Atelier
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Workshop Selection List */}
            <div className="md:col-span-6 space-y-3">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Upcoming Studio Sessions
              </span>
              {WORKSHOPS.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => setSelectedWorkshop(ws)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedWorkshop?.id === ws.id
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                      {ws.title}
                    </h4>
                    <span className="text-xs font-semibold font-mono tabular-nums text-stone-900 shrink-0">
                      ${ws.price}
                    </span>
                  </div>

                  <div className="mt-2 space-y-1 text-xs text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{ws.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{ws.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-800 font-medium">
                      <Users className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>Only {ws.seatsLeft} of {ws.seatsTotal} seats remaining</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Registration Form */}
            <div className="md:col-span-6 bg-[#FAF9F6] p-5 rounded-xl border border-stone-200/80 flex flex-col justify-between">
              {selectedWorkshop && (
                <form onSubmit={handleBooking} className="space-y-3">
                  <div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                      Workshop Details
                    </span>
                    <h4 className="font-serif text-lg font-semibold text-stone-900 mt-0.5">
                      {selectedWorkshop.title}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {selectedWorkshop.description}
                    </p>
                  </div>

                  {/* Included Materials */}
                  <div className="pt-2 border-t border-stone-200/60">
                    <span className="text-[11px] font-semibold text-stone-700 block mb-1">
                      Included with Your Pass:
                    </span>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {selectedWorkshop.includes.map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-700 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Inputs */}
                  <div className="pt-2 border-t border-stone-200/60 space-y-2">
                    <div>
                      <label className="block text-[11px] text-stone-600 font-medium mb-1">
                        Attendee Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="Margot Vance"
                        className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-600 font-medium mb-1">
                        Email Address for Confirmation
                      </label>
                      <input
                        type="email"
                        required
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        placeholder="margot@example.com"
                        className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-600 font-medium mb-1">
                        Number of Attendees
                      </label>
                      <select
                        value={attendeeCount}
                        onChange={(e) => setAttendeeCount(Number(e.target.value))}
                        className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:border-stone-900"
                      >
                        <option value={1}>1 Seat (${selectedWorkshop.price})</option>
                        <option value={2}>2 Seats (${selectedWorkshop.price * 2})</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Reserve Atelier Pass (${selectedWorkshop.price * attendeeCount})
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
