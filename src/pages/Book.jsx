import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getRooms, createBooking } from '../data/rooms';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="pt-32 p-6 max-w-xl mx-auto text-red-700 bg-red-50 border border-red-200 rounded-2xl">
          <h2 className="font-bold text-lg">Error rendering page:</h2>
          <pre className="text-xs mt-2 overflow-x-auto whitespace-pre-wrap">{this.state.error?.stack || this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function Book() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // 1: Customer Information, 2: Payment Information, 3: Booking is confirmed!
  
  // Real-time Countdown Timer (starts at 20 minutes)
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0 || currentStep === 3) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, currentStep]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Extract initial values from query parameters
  const qRoomId = searchParams.get('roomId') || '';
  const qCheckIn = searchParams.get('checkIn') || '';
  const qCheckOut = searchParams.get('checkOut') || '';
  const qGuests = parseInt(searchParams.get('guests')) || 1;

  const [formData, setFormData] = useState({
    roomId: '',
    checkIn: '',
    checkOut: '',
    guestsCount: 1,
    firstName: '',
    lastName: '',
    guestEmail: '',
    guestPhoneCode: '+91',
    guestPhone: '',
    country: 'India',
    smokingPreference: 'non-smoking',
    bedPreference: 'large',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardHolder: '',
    upiId: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [pricing, setPricing] = useState({ nights: 0, subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    getRooms()
      .then((data) => {
        setRooms(data);
        // Pre-populate selections from query params or fallback to first room
        setFormData(prev => ({
          ...prev,
          roomId: qRoomId || (data.length > 0 ? data[0].id : ''),
          checkIn: qCheckIn || new Date().toISOString().split('T')[0],
          checkOut: qCheckOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
          guestsCount: qGuests
        }));
      })
      .catch((err) => console.error('Error fetching rooms:', err));
  }, [qRoomId, qCheckIn, qCheckOut, qGuests]);

  // Recalculate pricing on sanctuary/date change
  useEffect(() => {
    const selectedRoom = rooms.find(r => r.id === formData.roomId);
    if (selectedRoom && formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
      
      if (nights > 0 && checkOutDate > checkInDate) {
        const subtotal = selectedRoom.priceInr * nights;
        const tax = Math.round(subtotal * 0.18); // 18% GST
        const total = subtotal + tax;
        setPricing({ nights, subtotal, tax, total });
      } else {
        setPricing({ nights: 0, subtotal: 0, tax: 0, total: 0 });
      }
    } else {
      setPricing({ nights: 0, subtotal: 0, tax: 0, total: 0 });
    }
  }, [formData.roomId, formData.checkIn, formData.checkOut, rooms]);

  const selectedRoom = rooms.find(r => r.id === formData.roomId) || {};

  // Formatter helpers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const cleanVal = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = cleanVal.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      setFormData(prev => ({ ...prev, [name]: parts.length > 0 ? parts.join(' ') : cleanVal }));
    } else if (name === 'cardExpiry') {
      let cleanVal = value.replace(/[^0-9]/g, '');
      if (cleanVal.length >= 2) {
        cleanVal = cleanVal.slice(0, 2) + '/' + cleanVal.slice(2, 4);
      }
      setFormData(prev => ({ ...prev, [name]: cleanVal.slice(0, 5) }));
    } else if (name === 'cardCvv') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/[^0-9]/g, '').slice(0, 3) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const fName = formData.firstName || '';
    const lName = formData.lastName || '';
    const email = formData.guestEmail || '';
    const phone = formData.guestPhone || '';

    if (!fName.trim()) tempErrors.firstName = "First name is required";
    if (!lName.trim()) tempErrors.lastName = "Last name is required";
    
    if (!email) {
      tempErrors.guestEmail = "Email address is required";
    } else if (!emailRegex.test(email)) {
      tempErrors.guestEmail = "Please enter a valid email address";
    }

    if (!phone) {
      tempErrors.guestPhone = "Mobile number is required";
    } else if (phone.replace(/[^0-9]/g, '').length < 10) {
      tempErrors.guestPhone = "Please enter a valid phone number";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    const tempErrors = {};
    const cardNo = formData.cardNumber || '';
    const expiry = formData.cardExpiry || '';
    const cvv = formData.cardCvv || '';
    const holder = formData.cardHolder || '';
    const upi = formData.upiId || '';
    
    if (formData.paymentMethod === 'card') {
      if (!cardNo || cardNo.replace(/\s/g, '').length !== 16) {
        tempErrors.cardNumber = "Enter a valid 16-digit card number";
      }
      if (!expiry || !expiry.includes('/')) {
        tempErrors.cardExpiry = "Expiry is required (MM/YY)";
      }
      if (!cvv || cvv.length < 3) {
        tempErrors.cardCvv = "CVV must be 3 digits";
      }
      if (!holder.trim()) {
        tempErrors.cardHolder = "Cardholder Name is required";
      }
    } else {
      if (!upi || !upi.includes('@')) {
        tempErrors.upiId = "Enter a valid UPI ID";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    setTimeout(async () => {
      try {
        const payload = {
          roomId: formData.roomId,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guestName: `${formData.firstName} ${formData.lastName}`,
          guestEmail: formData.guestEmail,
          guestPhone: formData.guestPhoneCode + ' ' + formData.guestPhone,
          guestsCount: formData.guestsCount,
        };

        const res = await createBooking(payload);
        
        setBookingConfirmed({
          ...res.booking,
          nights: pricing.nights,
          totalAmount: pricing.total,
          taxAmount: pricing.tax
        });
        setCurrentStep(3);
        window.scrollTo(0, 0);
      } catch (err) {
        setErrors({ payment: "Payment declined. Please try again." });
      } finally {
        setLoading(false);
      }
    }, 2500);
  };

  // Generate cancellation date (e.g. 3 days before check-in)
  const getCancellationDateStr = () => {
    try {
      if (!formData.checkIn) return "3 days before arrival";
      const checkInDate = new Date(formData.checkIn);
      if (isNaN(checkInDate.getTime())) return "3 days before arrival";
      checkInDate.setDate(checkInDate.getDate() - 3);
      return checkInDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return "3 days before arrival";
    }
  };

  const getTimelineLimitDateStr = () => {
    try {
      if (!formData.checkIn) return "Refund Limit";
      const d = new Date(formData.checkIn);
      if (isNaN(d.getTime())) return "Refund Limit";
      d.setDate(d.getDate() - 3);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } catch (e) {
      return "Refund Limit";
    }
  };

  return (
    <ErrorBoundary>
      <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-16">
      
      {/* Navigation Progress bar (Agoda Style) */}
      <div className="bg-white border-b border-[#dfd3cc] py-4 px-6 fixed top-[72px] left-0 right-0 z-40 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-primary">Avasaa Stays</span>
          </div>

          <div className="flex items-center gap-10 font-sans text-xs font-semibold uppercase tracking-wider">
            <div className={`flex items-center gap-2 border-b-2 pb-1 transition-all ${currentStep === 1 ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>1</span>
              <span>Customer Information</span>
            </div>
            <div className={`flex items-center gap-2 border-b-2 pb-1 transition-all ${currentStep === 2 ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
              <span>Payment Information</span>
            </div>
            <div className={`flex items-center gap-2 border-b-2 pb-1 transition-all ${currentStep === 3 ? 'border-primary text-primary' : 'border-transparent text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>3</span>
              <span>Booking is Confirmed!</span>
            </div>
          </div>

          <div>
            <button onClick={() => navigate('/stay')} className="text-secondary hover:text-primary font-sans text-xs font-semibold uppercase tracking-wider">
              Back to stays
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6 md:mt-16">
        
        {/* Countdown Alert Banner */}
        {currentStep < 3 && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 rounded-xl p-3.5 flex items-center justify-center gap-2 mb-8 font-sans text-sm shadow-sm">
            <span className="material-symbols-outlined text-rose-600 text-base animate-pulse">schedule</span>
            <span>This price is guaranteed for... <strong>{formatTime(timeLeft)}</strong></span>
          </div>
        )}

        {/* STEP 3: Confirmed state (Full Width Ticket) */}
        {currentStep === 3 && bookingConfirmed ? (
          <div className="max-w-2xl mx-auto text-center space-y-8 py-10 flex flex-col items-center">
            <span className="material-symbols-outlined text-6xl text-white bg-primary p-5 rounded-full shadow-lg">done</span>
            <div className="space-y-2">
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold">Booking Confirmed!</h2>
              <p className="font-sans text-sm text-on-surface-variant font-light">
                An confirmation voucher has been sent to <strong className="font-medium text-secondary">{bookingConfirmed.guestEmail}</strong>.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-left space-y-6 border border-[#dfd3cc] shadow-md w-full relative">
              <div className="flex justify-between items-center pb-4 border-b border-[#dfd3cc]/60">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Booking Reference</span>
                  <p className="font-bold text-primary font-serif text-xl">{bookingConfirmed.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Status</span>
                  <p className="text-emerald-700 font-bold text-xs uppercase tracking-wide bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Confirmed</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pb-6 border-b border-[#dfd3cc]/60">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Sanctuary Type</span>
                  <p className="font-semibold text-primary text-base">{bookingConfirmed.roomName}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Guest Details</span>
                  <p className="font-semibold text-primary text-base">{bookingConfirmed.guestName}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Check-In</span>
                  <p className="font-semibold text-primary">{bookingConfirmed.checkIn}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Check-Out</span>
                  <p className="font-semibold text-primary">{bookingConfirmed.checkOut}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-secondary text-sm">
                  <span>Nights booked</span>
                  <span>{bookingConfirmed.nights} night{bookingConfirmed.nights > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-secondary text-sm">
                  <span>Taxes (18% GST)</span>
                  <span>₹{bookingConfirmed.taxAmount?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-primary text-lg pt-3 border-t border-[#dfd3cc]/30">
                  <span>Total Amount Paid</span>
                  <span>₹{bookingConfirmed.totalAmount?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => window.print()} className="border border-[#dfd3cc] text-secondary px-8 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#e5dad4]/30 transition-all shadow-sm">
                Print Invoice
              </button>
              <button onClick={() => navigate('/')} className="bg-primary text-white px-10 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#3e5349] transition-all shadow-md">
                Return Home
              </button>
            </div>
          </div>
        ) : (
          
          /* Checkout Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Main Form Block */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Customer Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Lead Guest Card */}
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#dfd3cc]/60 shadow-sm space-y-6">
                    <h2 className="font-serif text-2xl text-primary font-semibold">Who's the lead guest?</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wider">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                          required
                        />
                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                          required
                        />
                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          name="guestEmail"
                          value={formData.guestEmail}
                          onChange={handleChange}
                          className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                          required
                        />
                        {errors.guestEmail && <p className="text-red-500 text-xs">{errors.guestEmail}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Country/Region of Residence *</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Spain</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                        </select>
                      </div>

                      <div className="space-y-1 flex gap-2 items-end">
                        <div className="w-1/3">
                          <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">Code</label>
                          <select
                            name="guestPhoneCode"
                            value={formData.guestPhoneCode}
                            onChange={handleChange}
                            className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl p-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all text-center"
                          >
                            <option>+91</option>
                            <option>+1</option>
                            <option>+34</option>
                            <option>+44</option>
                          </select>
                        </div>
                        <div className="w-2/3">
                          <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            name="guestPhone"
                            value={formData.guestPhone}
                            onChange={handleChange}
                            className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        {errors.guestPhone && <p className="text-red-500 text-xs">{errors.guestPhone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests Card */}
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#dfd3cc]/60 shadow-sm space-y-6">
                    <h2 className="font-serif text-2xl text-primary font-semibold">Special requests</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#e5dad4]/20 border border-[#dfd3cc]/40 rounded-2xl p-6">
                      <div className="space-y-3">
                        <h4 className="font-sans text-xs font-bold text-secondary uppercase tracking-wider">Which type of room would you prefer?</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 font-sans text-sm text-on-surface cursor-pointer select-none">
                            <input
                              type="radio"
                              name="smokingPreference"
                              value="non-smoking"
                              checked={formData.smokingPreference === 'non-smoking'}
                              onChange={handleChange}
                              className="text-primary focus:ring-primary"
                            />
                            <span>Non-smoking</span>
                          </label>
                          <label className="flex items-center gap-3 font-sans text-sm text-on-surface cursor-pointer select-none">
                            <input
                              type="radio"
                              name="smokingPreference"
                              value="smoking"
                              checked={formData.smokingPreference === 'smoking'}
                              onChange={handleChange}
                              className="text-primary focus:ring-primary"
                            />
                            <span>Smoking</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-sans text-xs font-bold text-secondary uppercase tracking-wider">Which bed setup would you prefer?</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 font-sans text-sm text-on-surface cursor-pointer select-none">
                            <input
                              type="radio"
                              name="bedPreference"
                              value="large"
                              checked={formData.bedPreference === 'large'}
                              onChange={handleChange}
                              className="text-primary focus:ring-primary"
                            />
                            <span>I'd like a large bed</span>
                          </label>
                          <label className="flex items-center gap-3 font-sans text-sm text-on-surface cursor-pointer select-none">
                            <input
                              type="radio"
                              name="bedPreference"
                              value="twin"
                              checked={formData.bedPreference === 'twin'}
                              onChange={handleChange}
                              className="text-primary focus:ring-primary"
                            />
                            <span>I'd like twin beds</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Additional Requests (Optional)</label>
                      <textarea
                        name="specialRequests"
                        rows="2"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none transition-all resize-none"
                        placeholder="Write any additional preferences..."
                      />
                    </div>
                  </div>

                  {/* Free room benefits */}
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#dfd3cc]/60 shadow-sm space-y-4">
                    <h2 className="font-serif text-2xl text-primary font-semibold">Free room benefits</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#dfd3cc]/40">
                        <span className="material-symbols-outlined text-emerald-600 text-3xl bg-emerald-50 p-2 rounded-lg">verified</span>
                        <div>
                          <h4 className="font-sans text-sm font-semibold text-emerald-800">Fully refundable</h4>
                          <p className="font-sans text-xs text-gray-500 mt-0.5">Cancel for free before {getCancellationDateStr()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#dfd3cc]/40">
                        <span className="material-symbols-outlined text-primary text-3xl bg-primary/10 p-2 rounded-lg">wifi</span>
                        <div>
                          <h4 className="font-sans text-sm font-semibold text-primary">Free High-speed Wi-Fi</h4>
                          <p className="font-sans text-xs text-gray-500 mt-0.5">Stay connected throughout the sanctuary</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Step Button */}
                  <div className="text-right">
                    <button
                      onClick={handleNextStep}
                      className="w-full md:w-fit bg-primary text-white px-12 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#3e5349] transition-all duration-300 shadow-md"
                    >
                      Next: Final Step
                    </button>
                    <p className="font-sans text-[10px] text-gray-400 tracking-wider uppercase mt-2">You won't be charged yet.</p>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {loading ? (
                    /* Processing simulation state */
                    <div className="bg-white p-12 rounded-2xl border border-[#dfd3cc]/60 shadow-sm text-center space-y-6 flex flex-col items-center justify-center min-h-[350px]">
                      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <h3 className="font-serif text-2xl text-primary font-medium animate-pulse">Securing Your Sanctuary</h3>
                      <p className="font-sans text-sm text-on-surface-variant font-light max-w-sm">
                        Verifying date allocations and authorization with the payment gateway. Please do not close this window.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#dfd3cc]/60 shadow-sm space-y-6">
                      <h2 className="font-serif text-2xl text-primary font-semibold">Payment Information</h2>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                            formData.paymentMethod === 'card' 
                              ? 'bg-primary text-white border-primary shadow-sm' 
                              : 'bg-white text-secondary border-[#dfd3cc] hover:bg-[#e5dad4]/20'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">credit_card</span>
                          Card Payment
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                          className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                            formData.paymentMethod === 'upi' 
                              ? 'bg-primary text-white border-primary shadow-sm' 
                              : 'bg-white text-secondary border-[#dfd3cc] hover:bg-[#e5dad4]/20'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                          UPI Payment
                        </button>
                      </div>

                      {formData.paymentMethod === 'card' ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Cardholder Name</label>
                            <input
                              type="text"
                              name="cardHolder"
                              value={formData.cardHolder}
                              onChange={handleChange}
                              className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                              required
                            />
                            {errors.cardHolder && <p className="text-red-500 text-xs">{errors.cardHolder}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Card Number</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              placeholder="4111 2222 3333 4444"
                              className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                              required
                            />
                            {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-secondary uppercase tracking-wider">Expiry Date</label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm text-center focus:ring-1 focus:ring-primary focus:outline-none"
                                required
                              />
                              {errors.cardExpiry && <p className="text-red-500 text-xs">{errors.cardExpiry}</p>}
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-secondary uppercase tracking-wider">CVV</label>
                              <input
                                type="password"
                                name="cardCvv"
                                value={formData.cardCvv}
                                onChange={handleChange}
                                placeholder="123"
                                className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm text-center focus:ring-1 focus:ring-primary focus:outline-none"
                                required
                              />
                              {errors.cardCvv && <p className="text-red-500 text-xs">{errors.cardCvv}</p>}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-bold text-secondary uppercase tracking-wider">UPI ID</label>
                          <input
                            type="text"
                            name="upiId"
                            value={formData.upiId}
                            onChange={handleChange}
                            placeholder="username@bank"
                            className="w-full bg-[#FAF8F5] border border-[#dfd3cc] rounded-xl px-4 py-3 font-sans text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                            required
                          />
                          {errors.upiId && <p className="text-red-500 text-xs">{errors.upiId}</p>}
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="w-1/2 border border-[#dfd3cc] text-secondary py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#e5dad4]/30 transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          onClick={handlePaymentSubmit}
                          className="w-1/2 bg-primary text-white py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#3e5349] transition-all duration-300 shadow-md"
                        >
                          Confirm & Pay
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar Invoice & Details */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Dynamic Checkin & Checkout Block */}
              <div className="bg-white p-6 rounded-2xl border border-[#dfd3cc]/60 shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="border-r border-[#dfd3cc]/50 pr-2">
                    <span className="block font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">Check-in</span>
                    <span className="block font-serif text-sm font-bold text-primary mt-1">{formData.checkIn || '---'}</span>
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">Check-out</span>
                    <span className="block font-serif text-sm font-bold text-primary mt-1">{formData.checkOut || '---'}</span>
                  </div>
                </div>
                {pricing.nights > 0 && (
                  <div className="text-center pt-2 border-t border-[#dfd3cc]/40">
                    <span className="font-sans text-xs font-semibold text-secondary uppercase tracking-widest">
                      {pricing.nights} Night{pricing.nights > 1 ? 's' : ''} Stay
                    </span>
                  </div>
                )}
              </div>

              {/* Room Card Summary */}
              {selectedRoom.name && (
                <div className="bg-white rounded-2xl overflow-hidden border border-[#dfd3cc]/60 shadow-sm">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl text-primary font-bold">{selectedRoom.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs font-sans text-[#cca85a] mt-1">
                        <span className="material-symbols-outlined text-sm font-fill-1">star</span>
                        <span className="font-bold text-primary">9.8</span>
                        <span className="text-gray-400">Exceptional</span>
                      </div>
                    </div>

                    <p className="font-sans text-xs text-on-surface-variant font-light leading-relaxed">
                      {selectedRoom.description?.slice(0, 120)}...
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#dfd3cc]/40">
                      {selectedRoom.amenities?.slice(0, 4).map((am, idx) => (
                        <div key={idx} className="flex items-center gap-2 font-sans text-xs text-on-surface">
                          <span className="material-symbols-outlined text-sm text-primary">
                            {selectedRoom.icons ? selectedRoom.icons[idx] : 'check_circle'}
                          </span>
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Cancellation timeline indicator (Agoda Style) */}
              <div className="bg-white p-6 rounded-2xl border border-[#dfd3cc]/60 shadow-sm space-y-4">
                <h4 className="font-serif text-sm font-bold text-primary">Cancellation Policy</h4>
                <div className="relative pt-2">
                  {/* Timeline Bar */}
                  <div className="h-1 bg-gray-200 rounded-full flex justify-between relative">
                    <div className="h-full bg-emerald-500 rounded-full absolute left-0 w-1/2"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute left-0 top-1/2 -translate-y-1/2 shadow-sm"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 shadow-sm"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-300 border-2 border-white absolute right-0 top-1/2 -translate-y-1/2 shadow-sm"></div>
                  </div>
                  {/* Timeline Labels */}
                  <div className="flex justify-between items-start text-[10px] font-sans text-gray-500 pt-3">
                    <div className="text-left w-1/3">
                      <span className="block font-bold text-emerald-700">Today</span>
                      <span>Free Refund</span>
                    </div>
                    <div className="text-center w-1/3">
                      <span className="block font-bold text-emerald-700">{getTimelineLimitDateStr()}</span>
                      <span>Refund Limit</span>
                    </div>
                    <div className="text-right w-1/3">
                      <span className="block font-bold text-gray-400">Check-in</span>
                      <span>No Refund</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Price Calculations Card */}
              {pricing.nights > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-[#dfd3cc]/60 shadow-sm space-y-4">
                  <h4 className="font-serif text-base font-bold text-primary border-b border-[#dfd3cc]/40 pb-2">Price Breakdown</h4>
                  
                  <div className="space-y-2.5 font-sans text-xs">
                    <div className="flex justify-between text-secondary">
                      <span>Room price ({pricing.nights} night{pricing.nights > 1 ? 's' : ''})</span>
                      <span>₹{pricing.subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>Taxes & service fees (18%)</span>
                      <span>₹{pricing.tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50/50 p-2 rounded-lg">
                      <span>Booking fees</span>
                      <span>FREE</span>
                    </div>
                    <div className="h-[1px] bg-[#dfd3cc]/60 my-2"></div>
                    <div className="flex justify-between items-center text-primary font-bold text-base">
                      <span>Price</span>
                      <span>₹{pricing.total.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider text-right">Included in price: Tax 18%</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRUST BADGES (Agoda Style) */}
        {currentStep < 3 && (
          <div className="border-t border-[#dfd3cc]/60 mt-16 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
            <div className="space-y-2 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#516C60] bg-[#e5dad4]/25 p-3.5 rounded-full">verified_user</span>
              <h4 className="font-serif text-base font-bold text-primary">100% Verified Stays</h4>
              <p className="font-sans text-xs text-on-surface-variant font-light max-w-xs leading-relaxed">
                Every reservation is backed by real reviews and guaranteed by our boutique hospitality network.
              </p>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#516C60] bg-[#e5dad4]/25 p-3.5 rounded-full">price_check</span>
              <h4 className="font-serif text-base font-bold text-primary">Best Price Guarantee</h4>
              <p className="font-sans text-xs text-on-surface-variant font-light max-w-xs leading-relaxed">
                Nobody works harder to offer boutique alpine luxury at honest rates. Found a lower price? We'll match it.
              </p>
            </div>
            <div className="space-y-2 flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-[#516C60] bg-[#e5dad4]/25 p-3.5 rounded-full">support_agent</span>
              <h4 className="font-serif text-base font-bold text-primary">Dedicated Host Support</h4>
              <p className="font-sans text-xs text-on-surface-variant font-light max-w-xs leading-relaxed">
                Connect directly with your on-site hosts for any travel tips, dining plans, or transport help.
              </p>
            </div>
          </div>
        )}
    </div>
    </div>
    </ErrorBoundary>
  );
}

export default Book;
