import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import pineSlide1 from '../assets/pine_slide1.jpg';
import pineSlide2 from '../assets/pine_slide2.jpg';
import pineSlide3 from '../assets/pine_slide3.jpg';
import pineSlide4 from '../assets/pine_slide4.jpg';
import room2Img from '../assets/room2.jpg';
import room3Img from '../assets/room3.jpg';
import cabinInterior from '../assets/cabin_interior.jpg';
import thumb3 from '../assets/thumb3.jpg';
import thumb4 from '../assets/thumb4.png';
import { getRoomById } from '../data/rooms';

function RoomDetail({ onBookRoom }) {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!room) return;
    const content = roomContent[room.id] || roomContent['pine-chalet'];
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % content.galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [room]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getRoomById(roomId)
      .then((data) => {
        setRoom(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching room:', err);
        setLoading(false);
      });
  }, [roomId]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };
  const nights = calculateNights();
  const totalPrice = room ? nights * room.priceInr : 0;
  const today = new Date().toISOString().split('T')[0];

  // Room-specific content
  const roomContent = {
    'pine-chalet': {
      galleryImages: [
        pineSlide1,
        pineSlide2,
        pineSlide3,
        pineSlide4,
      ],
      aboutLong: 'Tucked away in a private corner of the property, the Pine Chalet is a celebration of raw organic textures. With its private balcony and hand-selected wood paneling, it offers an immersive experience into the surrounding forest. Every element — from the hand-selected wood paneling to the stone fireplace — is chosen to immerse you in the surrounding nature. Wake up to birdsong filtering through your private balcony, and end the day by the crackling fire under a blanket of stars.',
      highlights: [
        { icon: 'wifi', text: 'Free Wi-Fi' },
        { icon: 'fireplace', text: 'Stone Fireplace' },
        { icon: 'balcony', text: 'Private Balcony' },
        { icon: 'restaurant', text: 'Breakfast Included' },
        { icon: 'local_fire_department', text: 'Bonfire Access' },
      ],
      included: [
        { title: 'Accommodation', desc: 'Private log chalet with forest view and stone fireplace' },
        { title: 'Breakfast', desc: 'Farm-to-table Himachali breakfast served daily' },
        { title: 'Welcome Tea', desc: 'Complimentary Himalayan herbal tea on arrival' },
        { title: 'Bonfire', desc: 'Evening bonfire circle with local folk tales' },
        { title: 'Forest Walk', desc: 'One guided forest walk through ancient cedar groves' },
        { title: 'Yoga', desc: 'Access to the morning yoga deck overlooking the valley' },
      ],
      excluded: [
        { title: 'Transport', desc: 'Airport or railway station pickup and drop' },
        { title: 'Lunch & Dinner', desc: 'Meals other than breakfast (available at extra cost)' },
        { title: 'Adventure Activities', desc: 'Trekking, river crossing, and other paid activities' },
        { title: 'Personal Expenses', desc: 'Laundry, phone calls, and personal shopping' },
      ],
      faqs: [
        { q: 'What is the check-in and check-out time?', a: 'Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be arranged based on availability.' },
        { q: 'Is the fireplace available year-round?', a: 'Yes, the stone fireplace is available throughout the year. It is especially cozy during the winter months from November to February.' },
        { q: 'Can I bring pets?', a: 'Unfortunately, pets are not allowed at Avasaa Stays to maintain the tranquil environment for all guests.' },
        { q: 'Is Wi-Fi available?', a: 'Yes, complimentary fiber Wi-Fi is available in all rooms and common areas. However, as we are in a mountain setting, speeds may vary.' },
        { q: 'How far is the nearest town?', a: 'Jibhi town is approximately 3 km from the property. We can arrange local transport for you at any time.' },
      ],
      thingsToPack: [
        { icon: 'checkroom', text: 'Warm Layers' },
        { icon: 'hiking', text: 'Trekking Shoes' },
        { icon: 'photo_camera', text: 'Camera' },
        { icon: 'water_drop', text: 'Sunscreen' },
        { icon: 'flashlight_on', text: 'Flashlight' },
        { icon: 'badge', text: 'ID Proof' },
      ],
    },
    'cedar-suite': {
      galleryImages: [
        pineSlide1,
        pineSlide2,
        pineSlide3,
        pineSlide4,
      ],
      aboutLong: 'Our most expansive offering, the Cedar Suite features 180-degree panoramic views of the Himalayan range. Designed for those who seek uncompromised space, the suite includes a dedicated lounge area and a spa-inspired copper bathtub. Floor-to-ceiling windows frame the ever-changing mountain landscape — from dawn mists to golden sunsets. The private deck is your personal vantage point for watching the world slow down beneath snow-capped peaks.',
      highlights: [
        { icon: 'wifi', text: 'Free Wi-Fi' },
        { icon: 'bathtub', text: 'Copper Tub' },
        { icon: 'landscape', text: 'Panoramic Views' },
        { icon: 'restaurant', text: 'Full-Board Meals' },
        { icon: 'spa', text: 'In-Room Spa' },
      ],
      included: [
        { title: 'Accommodation', desc: 'Luxury suite with panoramic views and private lounge' },
        { title: 'Full-Board Meals', desc: 'Breakfast, lunch, and dinner — all gourmet Himachali cuisine' },
        { title: 'Spa Treatment', desc: 'One complimentary in-room spa session per stay' },
        { title: 'Minibar', desc: 'Stocked minibar with local beverages and snacks' },
        { title: 'Private Trek', desc: 'Guided private trek to Jalori Pass or Serolsar Lake' },
        { title: 'Nespresso & Tea', desc: 'Premium Nespresso machine and Himalayan tea selection' },
      ],
      excluded: [
        { title: 'Transport', desc: 'Airport or railway station pickup and drop' },
        { title: 'Additional Spa', desc: 'Extra spa sessions beyond the complimentary one' },
        { title: 'Adventure Activities', desc: 'River rafting, paragliding, and other paid activities' },
        { title: 'Personal Expenses', desc: 'Laundry, phone calls, and personal shopping' },
      ],
      faqs: [
        { q: 'What is the check-in and check-out time?', a: 'Check-in is at 2:00 PM and check-out is at 12:00 PM (noon). Late check-out until 2:00 PM is complimentary for suite guests.' },
        { q: 'Does the suite have a bathtub?', a: 'Yes, the Cedar Suite features a handcrafted copper bathtub with mountain views — perfect for a relaxing soak after a day of exploration.' },
        { q: 'Are meals customizable?', a: 'Absolutely. Our chef can accommodate dietary preferences and allergies. Please inform us at the time of booking.' },
        { q: 'Is the private trek suitable for beginners?', a: 'Yes, our guides tailor the trek difficulty to your fitness level. Both Jalori Pass and Serolsar Lake routes have beginner-friendly options.' },
        { q: 'How many guests can stay in the suite?', a: 'The Cedar Suite accommodates up to 4 guests. An extra mattress can be arranged for a 5th guest at additional cost.' },
      ],
      thingsToPack: [
        { icon: 'checkroom', text: 'Warm Layers' },
        { icon: 'hiking', text: 'Trekking Shoes' },
        { icon: 'photo_camera', text: 'Camera' },
        { icon: 'water_drop', text: 'Sunscreen' },
        { icon: 'auto_stories', text: 'A Good Book' },
        { icon: 'badge', text: 'ID Proof' },
      ],
    },
    'oak-studio': {
      galleryImages: [
        pineSlide1,
        pineSlide2,
        pineSlide3,
        pineSlide4,
      ],
      aboutLong: 'Perfect for the solo explorer or a couple seeking intimacy, the Oak Studio is a masterclass in functional minimalism. Its compact layout maximizes light and views, providing a serene base for your mountain adventures. The reading nook is stocked with curated mountain literature, and the studio porch opens directly onto the garden — a living canvas that changes with the seasons from spring blossoms to winter snow.',
      highlights: [
        { icon: 'wifi', text: 'Free Wi-Fi' },
        { icon: 'menu_book', text: 'Reading Nook' },
        { icon: 'light_mode', text: 'Natural Light' },
        { icon: 'restaurant', text: 'Breakfast Included' },
        { icon: 'deck', text: 'Studio Porch' },
      ],
      included: [
        { title: 'Accommodation', desc: 'Cozy studio with garden view and queen-size bed' },
        { title: 'Breakfast', desc: 'Continental breakfast served daily at the main house' },
        { title: 'Welcome Tea', desc: 'Complimentary herbal tea and local cookies on arrival' },
        { title: 'Book Library', desc: 'Access to curated mountain and travel literature' },
        { title: 'Trail Maps', desc: 'Self-guided trail maps for exploring the valley' },
        { title: 'Bonfire', desc: 'Evening bonfire circle access with other guests' },
      ],
      excluded: [
        { title: 'Transport', desc: 'Airport or railway station pickup and drop' },
        { title: 'Lunch & Dinner', desc: 'Meals other than breakfast (available at extra cost)' },
        { title: 'Guided Treks', desc: 'Private guided treks (can be arranged separately)' },
        { title: 'Personal Expenses', desc: 'Laundry, phone calls, and personal shopping' },
      ],
      faqs: [
        { q: 'What is the check-in and check-out time?', a: 'Check-in is at 2:00 PM and check-out is at 11:00 AM. Early check-in can be arranged based on availability.' },
        { q: 'Is the studio suitable for families?', a: 'The Oak Studio is designed for 1-2 guests. For families, we recommend the Pine Chalet or Cedar Suite.' },
        { q: 'Does the studio have heating?', a: 'Yes, the studio has a portable heater during winters. The thick log walls also provide excellent natural insulation.' },
        { q: 'Can I access the other room amenities?', a: 'Common amenities like the bonfire circle, yoga deck, and garden trails are accessible to all guests regardless of room type.' },
        { q: 'Is there parking available?', a: 'Yes, complimentary parking is available near the main entrance of the property.' },
      ],
      thingsToPack: [
        { icon: 'checkroom', text: 'Warm Layers' },
        { icon: 'hiking', text: 'Comfortable Shoes' },
        { icon: 'photo_camera', text: 'Camera' },
        { icon: 'water_drop', text: 'Sunscreen' },
        { icon: 'auto_stories', text: 'Journal' },
        { icon: 'badge', text: 'ID Proof' },
      ],
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-2 h-[400px] animate-pulse">
            <div className="col-span-2 row-span-2 bg-stone-200 rounded-xl"></div>
            <div className="bg-stone-200 rounded-xl"></div>
            <div className="bg-stone-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <span className="material-symbols-outlined text-6xl text-stone-300">hotel</span>
          <h2 className="font-serif text-3xl text-primary">Room Not Found</h2>
          <Link to="/" className="inline-block bg-primary text-on-primary px-8 py-3 rounded-full font-sans text-xs font-semibold uppercase tracking-widest hover:bg-[#4C6548] transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const content = roomContent[room.id] || roomContent['pine-chalet'];

  return (
    <div className="bg-white min-h-screen">
      {/* ===== HERO GALLERY SECTION ===== */}
      <div className="pt-0 pb-4 px-0 bg-white">
        <div className="w-full">
          {/* ===== IMAGE GALLERY SLIDESHOW (Single Image Slider) ===== */}
          <div className="relative rounded-b-[32px] md:rounded-b-[48px] rounded-t-none overflow-hidden h-[55vh] md:h-[80vh] shadow-sm bg-stone-100 group">
            {/* Top dark gradient overlay for navbar readability */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-20"></div>

            {/* Slides container */}
            <div className="relative w-full h-full">
              {content.galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${room.name} gallery image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5"></div>
                </div>
              ))}
            </div>

            {/* Slider Navigation Arrows */}
            <button
              onClick={() => setActiveSlide((prev) => (prev === 0 ? content.galleryImages.length - 1 : prev - 1))}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % content.galleryImages.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white text-primary flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Slide Indicators Dots (Bottom Center) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20 bg-black/10 backdrop-blur-md px-4 py-2.5 rounded-full">
              {content.galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'bg-white scale-120' : 'bg-white/40 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== BREADCRUMB + TITLE ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4 flex-wrap">
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors font-sans text-xs">Home</Link>
          <span className="text-on-surface-variant/40 font-sans text-xs">/</span>
          <Link to="/stay" className="text-on-surface-variant hover:text-primary transition-colors font-sans text-xs">Stays</Link>
          <span className="text-on-surface-variant/40 font-sans text-xs">/</span>
          <span className="text-on-surface font-sans text-xs font-medium">{room.name}</span>
          <span className="ml-2 bg-primary text-on-primary font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
            {room.type}
          </span>
          <span className="bg-surface-container font-sans text-[10px] font-bold uppercase tracking-wider text-on-surface-variant px-2.5 py-0.5 rounded">
            {room.occupancy}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl text-on-surface font-semibold mb-4">
          {room.name}
        </h1>

        {/* Quick Stats */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary block">Guests</span>
              <span className="font-serif text-2xl font-semibold text-on-surface">{room.occupancy.split('•')[0].trim().split(' ')[0]}</span>
            </div>
          </div>
          <div className="w-px h-10 bg-stone-200"></div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-sm text-on-surface-variant">
              <span className="font-semibold text-on-surface">{room.occupancy.split('•')[1]?.trim()}</span> View
            </span>
          </div>
        </div>
      </div>

      {/* ===== MAIN TWO-COLUMN LAYOUT ===== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* ===== LEFT COLUMN (Content) ===== */}
          <div className="lg:col-span-7 space-y-10">

            {/* --- About This Room --- */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold mb-4">About This Room</h2>
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {showFullDesc ? content.aboutLong : content.aboutLong.slice(0, 220) + '...'}
                </p>
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="mt-3 font-sans text-sm font-semibold text-primary hover:text-[#4C6548] transition-colors"
                >
                  {showFullDesc ? 'Show Less' : 'Read More'}
                </button>
              </div>
            </div>

            {/* --- Highlights (pill badges) --- */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold mb-4">Highlights of Your Stay</h2>
              <div className="flex flex-wrap gap-3">
                {content.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-full px-5 py-2.5 shadow-sm">
                    <span className="material-symbols-outlined text-primary text-lg">{h.icon}</span>
                    <span className="font-sans text-sm text-on-surface font-medium">{h.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-stone-200" />

            {/* --- What's Included --- */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold mb-4">What's Included</h2>
              <div className="bg-primary rounded-t-xl px-5 py-2.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-lg">check_circle</span>
                <span className="font-sans text-sm font-bold text-white uppercase tracking-wider">Included</span>
              </div>
              <div className="border border-t-0 border-stone-200 rounded-b-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {content.included.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-lg mt-0.5 flex-shrink-0">check_circle</span>
                      <div>
                        <span className="font-sans text-sm font-bold text-on-surface">{item.title}</span>
                        <span className="font-sans text-sm text-on-surface-variant ml-1">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- Not Included --- */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold mb-4">Not Included</h2>
              <div className="bg-red-600 rounded-t-xl px-5 py-2.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-lg">close</span>
                <span className="font-sans text-sm font-bold text-white uppercase tracking-wider">Excluded</span>
              </div>
              <div className="border border-t-0 border-stone-200 rounded-b-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {content.excluded.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-red-500 text-lg mt-0.5 flex-shrink-0">close</span>
                      <div>
                        <span className="font-sans text-sm font-bold text-on-surface">{item.title}</span>
                        <span className="font-sans text-sm text-on-surface-variant ml-1">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-stone-200" />

            {/* --- Things to Pack --- */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold mb-4">Things to Pack</h2>
              <div className="flex flex-wrap gap-4">
                {content.thingsToPack.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-lg">task_alt</span>
                    <span className="font-sans text-sm text-on-surface font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-stone-200" />

            {/* --- Booking Policies --- */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold mb-4">Booking Policies</h2>
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 space-y-4">
                <h3 className="font-sans text-base font-bold text-on-surface">Cancellation Policy</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  At Avasaa Stays, every booking involves advance coordination with our on-ground team, local suppliers, and experience hosts. Since many of these services are locked and confirmed immediately upon reservation, cancellation charges apply based on when cancellation is requested.
                </p>
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="font-sans text-sm font-bold text-on-surface">More than 30 Days Before Check-in</p>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      If booking is cancelled more than 30 days prior to the arrival date, 20% of the total booking cost will be deducted as administrative and processing charges. The remaining balance will be refunded.
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-on-surface">16 to 30 Days Before Check-in</p>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      If booking is cancelled between 16 and 30 days before arrival date, 50% of the total booking cost will be charged as cancellation fee.
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-on-surface">8 to 15 Days Before Check-in</p>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      If cancellation is made between 8 and 15 days before departure, 75% of the total booking cost will be charged as cancellation fees due to confirmed commitments with our team.
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-bold text-on-surface">Within 7 Days Before Check-in</p>
                    <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                      If cancellation is made within 7 days of arrival, or if the guest fails to check in (No Show), 100% of the booking cost will be non-refundable. No refunds, credits, or rescheduling will be permitted.
                    </p>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-4 mt-4">
                  <h4 className="font-sans text-sm font-bold text-on-surface mb-2">Special Cancellation Conditions</h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed mb-3">
                    Certain booking elements carry stricter cancellation terms from our local partners. These include:
                  </p>
                  <ul className="list-disc list-inside font-sans text-xs text-on-surface-variant space-y-1.5 pl-2">
                    <li>Special experience guides</li>
                    <li>Private driver arrangements</li>
                    <li>Off-site adventure bookings</li>
                    <li>Peak festival or holiday season bookings</li>
                    <li>Non-refundable promotional offers</li>
                  </ul>
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <h4 className="font-sans text-sm font-bold text-on-surface mb-2">Force Majeure</h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Avasaa Stays shall not be responsible for cancellations or additional expenses arising due to natural disasters, landslides, extreme weather conditions, blockages, government restrictions, or other circumstances beyond our control. Any refund in such situations will depend entirely on the policies of the respective providers.
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <h4 className="font-sans text-sm font-bold text-on-surface mb-2">Refund Policy</h4>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                    Eligible refunds will be processed after receiving cancellation confirmation and settlement from all concerned partners. Refunds are generally initiated within 7 to 10 working days after approval.
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-stone-200" />

            {/* --- FAQs (Accordion) --- */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl text-on-surface font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {content.faqs.map((faq, i) => (
                  <div key={i} className="border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
                    >
                      <span className="font-sans text-sm font-semibold text-on-surface pr-4">{faq.q}</span>
                      <span className={`material-symbols-outlined text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                        {openFaq === i ? 'remove_circle' : 'add_circle'}
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-5 pb-5 font-sans text-sm text-on-surface-variant leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN (Sticky Booking Card) ===== */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">

              {/* Booking Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
                {/* Price Header (colored) */}
                <div className="bg-primary p-5">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-1">Starting From</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-bold text-white">₹{room.priceInr.toLocaleString('en-IN')}</span>
                    <span className="font-sans text-sm text-white/80">/ Night</span>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Check-in / Check-out */}
                  <div>
                    <label className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Select Dates</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">calendar_today</span>
                        <input
                          type="date"
                          min={today}
                          value={checkIn}
                          onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(''); }}
                          className="w-full pl-10 pr-3 py-3 rounded-xl border border-stone-200 font-sans text-sm text-on-surface bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">calendar_today</span>
                        <input
                          type="date"
                          min={checkIn || today}
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full pl-10 pr-3 py-3 rounded-xl border border-stone-200 font-sans text-sm text-on-surface bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guest Select */}
                  <div>
                    <label className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-2">Select Guests</label>
                    <div className="flex rounded-xl border border-stone-200 overflow-hidden">
                      {[1, 2, 3, 4].map((n) => (
                        <button
                          key={n}
                          onClick={() => setGuests(n)}
                          className={`flex-1 py-3 font-sans text-sm font-semibold transition-colors ${guests === n ? 'bg-primary text-white' : 'bg-white text-on-surface-variant hover:bg-stone-50'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  {nights > 0 && (
                    <div className="space-y-2 pt-2 border-t border-stone-200">
                      <div className="flex justify-between font-sans text-sm">
                        <span className="text-on-surface-variant">₹{room.priceInr.toLocaleString('en-IN')} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                        <span className="text-on-surface font-medium">₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between font-sans text-base font-bold pt-2 border-t border-stone-200">
                        <span className="text-on-surface">Total</span>
                        <span className="text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  )}

                  {/* Book Now CTA */}
                  <button
                    onClick={() => onBookRoom(room.id, checkIn, checkOut, guests)}
                    className="w-full bg-primary text-white py-4 rounded-xl font-sans text-sm font-bold uppercase tracking-wider hover:bg-[#4C6548] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    Book Now
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Quick Info below card */}
              <div className="mt-4 space-y-2.5 px-2">
                <div className="flex items-center gap-3 font-sans text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-lg">verified</span>
                  Instant confirmation
                </div>
                <div className="flex items-center gap-3 font-sans text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-lg">event_available</span>
                  Free cancellation up to 30 days
                </div>
                <div className="flex items-center gap-3 font-sans text-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-lg">shield</span>
                  Secure payment
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
