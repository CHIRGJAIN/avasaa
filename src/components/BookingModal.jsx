import React, { useState, useEffect } from 'react';
import { getRooms, createBooking } from '../data/rooms';

function BookingModal({ isOpen, onClose, initialRoomId, initialCheckIn, initialCheckOut, initialGuestsCount }) {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomId: '',
    checkIn: '',
    checkOut: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    guestsCount: 1,
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Fetch rooms on mount
  useEffect(() => {
    getRooms()
      .then((data) => setRooms(data))
      .catch((err) => console.error('Error fetching rooms:', err));
  }, []);

  // Update selected room when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        roomId: initialRoomId || (rooms.length > 0 ? rooms[0].id : ''),
        checkIn: initialCheckIn || '',
        checkOut: initialCheckOut || '',
        guestsCount: initialGuestsCount || 1,
        guestName: '',
        guestEmail: '',
        guestPhone: '',
      });
      setStatus({ type: '', message: '' });
      setBookingConfirmed(null);
    }
  }, [isOpen, initialRoomId, initialCheckIn, initialCheckOut, initialGuestsCount, rooms]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const data = await createBooking(formData);
      setBookingConfirmed(data.booking);
      setStatus({ type: 'success', message: data.message });
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-background border border-outline-variant/50 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/30 bg-surface-container-low">
          <h2 className="font-serif text-2xl text-primary font-semibold">Reserve Your Sanctuary</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors focus:outline-none"
          >
            <span className="material-symbols-outlined text-2xl text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          {bookingConfirmed ? (
            <div className="text-center py-8 space-y-6">
              <span className="material-symbols-outlined text-6xl text-primary bg-primary-fixed p-4 rounded-full">check_circle</span>
              <h3 className="font-serif text-2xl text-primary">Booking Confirmed!</h3>
              <div className="bg-surface-container rounded-2xl p-6 text-left space-y-3 font-sans text-sm border border-outline-variant/50 max-w-md mx-auto">
                <p><strong className="text-on-surface">Booking ID:</strong> {bookingConfirmed.id}</p>
                <p><strong className="text-on-surface">Room:</strong> {bookingConfirmed.roomName}</p>
                <p><strong className="text-on-surface">Guest Name:</strong> {bookingConfirmed.guestName}</p>
                <p><strong className="text-on-surface">Check-in:</strong> {bookingConfirmed.checkIn}</p>
                <p><strong className="text-on-surface">Check-out:</strong> {bookingConfirmed.checkOut}</p>
                <p><strong className="text-on-surface">Nights:</strong> {bookingConfirmed.nights}</p>
                <p><strong className="text-on-surface">Total:</strong> ₹{bookingConfirmed.totalAmount.toLocaleString('en-IN')}</p>
              </div>
              <button
                onClick={onClose}
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-sans text-sm font-semibold uppercase tracking-wider hover:bg-[#4C6548] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.type === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-sans flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  <span>{status.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room selection */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Select Sanctuary</label>
                  <select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3.5 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface"
                    required
                  >
                    <option value="" disabled>Choose a room...</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} (₹{room.priceInr.toLocaleString('en-IN')}/night)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Check-In</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Check-Out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface"
                    required
                  />
                </div>

                {/* Guests */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Number of Guests</label>
                  <input
                    type="number"
                    name="guestsCount"
                    min="1"
                    max="6"
                    value={formData.guestsCount}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface"
                    required
                  />
                </div>

                {/* Personal Info */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Full Name</label>
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Email Address</label>
                  <input
                    type="email"
                    name="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:border-primary focus:outline-none transition-colors font-sans text-sm text-on-surface"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-sans text-sm font-semibold uppercase tracking-wider hover:bg-[#4C6548] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing Reservation...' : 'Confirm My Reservation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
