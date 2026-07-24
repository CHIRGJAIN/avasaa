import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.jpg';
import heroBalcony from '../assets/hero_balcony.jpg';
import heroWinter from '../assets/hero_winter.jpg';
import thumb1 from '../assets/thumb1.jpg';
import thumb2 from '../assets/thumb2.jpg';
import thumb3 from '../assets/thumb3.jpg';
import thumb4 from '../assets/thumb4.png';
import cabinInterior from '../assets/cabin_interior.jpg';
import snowyPines from '../assets/snowy_pines.jpg';
import forestWalkImg from '../assets/forest_walk.jpg';
import bonfireImg from '../assets/bonfire.jpg';
import room1Img from '../assets/room1.jpg';
import room2Img from '../assets/room2.jpg';
import room3Img from '../assets/room3.jpg';
import mountainPeakImg from '../assets/mountain_peak.png';

function Home({ onBookRoom }) {
  const slides = [
    {
      image: heroImg,
      subtitle: "SERI VILLAGE • JIBHI",
      title: <>Come Home. <span className="italic font-light">To The Mountains..</span></>,
      description: "Some places are visited. Others are felt. Nestled in the quiet village of Seri, Avasaa invites you to pause, reconnect, and experience the mountains at their own pace."
    },
    {
      image: heroBalcony,
      subtitle: "UNINTERRUPTED VIEWS",
      title: <>A Balcony Above <span className="italic font-light">The Whispering Clouds.</span></>,
      description: "Watch the clouds roll through the valley from your balcony, sip your morning coffee in silence, and let the mountains remind you how peaceful life can feel."
    },
    {
      image: heroWinter,
      subtitle: "A TABLE WITH A VIEW",
      title: <>More Than A Café. <span className="italic font-light">It's Where Days Slow Down.</span></>,
      description: "The laughter around the table, the warmth of a fresh meal, the view beyond the window. These are the moments people carry home from Avasaa."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const roomSummaries = [
    {
      id: 'pine-chalet',
      name: 'Pine Chalet',
      type: 'Mountain Refuge',
      description: '2 Adults • Forest View',
      price: '₹18,000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgw4-SXq_qXpKloANjXlNkl_q5VFMDtF9bJPtuoLQPVB2sWocdu_w44u87THUY2ucSgdaaKOqxa-jqKEUsNMZaROwdERXOiJL4yu79PP4rufasEEw-h6Kv_MS4aE8diaqjFaNN7UjxtvzgVklzifP3Ukq4GJ6QJBAQAJrcnw2W1HCx3yt5gdit_4_GkPeIUZQVvJ-cfzmJOAQluNO457NvNnc_22xy6Um_p8JKJqkRtK6LKTBgzd',
      icons: ['wifi', 'fireplace', 'local_cafe']
    },
    {
      id: 'cedar-suite',
      name: 'Cedar Suite',
      type: 'Elevated Luxury',
      description: '4 Guests • River Facing',
      price: '₹24,500',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfXjs_vO-186Ogx0iNtMIh8G0fhMHT2mQNu75hrqN6Ue1EWfqwG_h6neboJYenTLHjjBj0GRVGPSjLYtkXvsUTHb9w39uQ4VMtkHwUoAImjEt-CoWk_fJyWbuEqxny2tDP_zPREL41jsyyfG_fQ82W7xZI-c6za6GU5J1Q58mOLzAdql-27jjC0j50UuLc7_wEWRJs0kJ843vFLO2_HiJ9vMrq2H9g2YcUcRO0Z9tOtzPAMywpTmBB',
      icons: ['wifi', 'balcony', 'ac_unit']
    },
    {
      id: 'oak-studio',
      name: 'Oak Studio',
      type: 'Intimate Escape',
      description: '2 Guests • Garden View',
      price: '₹15,000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0qvBsifYopqnouXKhQ5nbi3ZRpZzPDsP58-StYZyAqbC0kFOFXBi2X0qfbl7huJBmxGwxNOnb5cR5mbttqJbID8DdjetiCBiP186rIRPH_SZZBbQ4ChywlZjJ3TEtGeU1ED6k2CaEIL9vc25pU6E7s6W2u8Wq2kqQXp0YD5ONiQ94bgjL-224VzsZ4QEhAcfSiSVmsJoh5_acaOJQwtCHgDaepwtyc-A_HQdFkinTnNnRcODk7dVl',
      icons: ['menu_book', 'light_mode', 'bed']
    }
  ];

  return (
    <div>
      {/* Hero Section - Full Bleed */}
      <section className="pt-0 pb-0 w-full">
        {/* Full Screen Image Container with Slideshow */}
        <div className="relative group w-full h-[80vh] md:h-[95vh] lg:h-[100vh] overflow-hidden">
          {/* Top dark gradient overlay for transparent navbar contrast */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 via-black/20 to-transparent z-20 pointer-events-none"></div>

          {/* Slides Crossfade */}
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <img
                className="w-full h-full object-cover object-top transition-transform duration-[10s] ease-out scale-101"
                alt={slide.subtitle}
                src={slide.image}
              />
            </div>
          ))}

          {/* Poetic Editorial Overlay Text */}
          <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center pb-52 text-center px-6 z-20">
            <div className="max-w-5xl space-y-6">
              <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-white/90 block transition-all duration-700 transform translate-y-0 opacity-100">
                {slides[currentSlide].subtitle}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-[1.05] tracking-tight transition-all duration-700 transform translate-y-0 opacity-100">
                {slides[currentSlide].title}
              </h1>
              <p className="font-sans text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed font-light transition-all duration-700 transform translate-y-0 opacity-100">
                {slides[currentSlide].description}
              </p>
            </div>
          </div>

          {/* Slide Indicators - Vertical Right */}
          <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3 z-30">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-1 rounded-full transition-all duration-500 ${idx === currentSlide ? 'h-8 bg-white' : 'h-2 bg-white/40'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Desktop Search Bar - Placed back in Hero Section */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6 z-30 hidden md:block">
            <div className="bg-white rounded-[32px] shadow-2xl border border-black/5 p-8 relative">
              {/* Top Row */}
              <div className="flex justify-between items-center pb-5 border-b border-gray-100 mb-5">
                <div>
                  <h3 className="font-sans text-xl font-bold text-gray-900 leading-tight">Where Will You Stay Next?</h3>
                  <p className="font-sans text-sm text-gray-500 mt-1">Choose your best options to discover the perfect sanctuary for your next journey.</p>
                </div>
                <div className="flex items-center gap-2 text-[#1f432d] font-sans text-xs font-semibold bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100/50">
                  <span className="material-symbols-outlined text-base text-emerald-600">verified_user</span>
                  <span>Hassle-Free Bookings</span>
                  <span className="material-symbols-outlined text-blue-500 text-xs font-fill-1 ml-0.5">verified</span>
                </div>
              </div>

              {/* Bottom Row - Form Grid */}
              <div className="grid grid-cols-3 gap-6 items-center">
                {/* 1. Check-in */}
                <div className="flex items-center gap-4 pr-6 border-r border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-600 border border-gray-100">
                    <span className="material-symbols-outlined text-2xl">calendar_today</span>
                  </div>
                  <div className="flex-grow">
                    <span className="block font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">Check-in</span>
                    <input
                      type="date"
                      className="block w-full font-sans text-base font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0 cursor-pointer"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* 2. Check-out */}
                <div className="flex items-center gap-4 px-4 pr-6 border-r border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-600 border border-gray-100">
                    <span className="material-symbols-outlined text-2xl">calendar_month</span>
                  </div>
                  <div className="flex-grow">
                    <span className="block font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">Check-out</span>
                    <input
                      type="date"
                      className="block w-full font-sans text-base font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0 cursor-pointer"
                      defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                {/* 3. Guests */}
                <div className="flex items-center gap-4 pl-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-600 border border-gray-100">
                    <span className="material-symbols-outlined text-2xl">group</span>
                  </div>
                  <div className="flex-grow">
                    <span className="block font-sans text-[10px] font-bold text-gray-400 uppercase tracking-wider">Guests</span>
                    <select className="block w-full font-sans text-base font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0 cursor-pointer">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Floating Search Button */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <Link to="/stay" className="bg-[#1e75eb] hover:bg-[#155fc0] text-white px-10 py-4 rounded-2xl font-sans text-sm font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap">
                  <span className="material-symbols-outlined text-base font-bold">search</span>
                  <span>Search Rooms</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Reverted Scroll Down Indicator - Center Bottom */}
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.88 })}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 opacity-70 hover:opacity-100 transition-all duration-300 animate-luxury-float md:hidden"
            aria-label="Scroll Down"
          >
            <div className="w-5 h-8 border border-white/60 rounded-full p-1 flex justify-center">
              <div className="w-0.5 h-1.5 bg-white rounded-full animate-bounce"></div>
            </div>
            <span className="font-sans text-[8px] font-semibold text-white/60 uppercase tracking-[0.25em]">Scroll</span>
          </button>
        </div>

        {/* Mobile Search Bar - Displayed right below the hero image slider on mobile screens */}
        <div className="px-6 mt-[-32px] relative z-30 block md:hidden">
          <div className="bg-white rounded-[24px] shadow-xl border border-black/5 p-6">
            <h3 className="font-sans text-base font-bold text-gray-900 mb-4">Where Will You Stay Next?</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="material-symbols-outlined text-gray-500 text-lg">calendar_today</span>
                  <div className="flex-grow">
                    <span className="block font-sans text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Check-in</span>
                    <input type="date" className="block w-full font-sans text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="material-symbols-outlined text-gray-500 text-lg">calendar_month</span>
                  <div className="flex-grow">
                    <span className="block font-sans text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Check-out</span>
                    <input type="date" className="block w-full font-sans text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0" defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="material-symbols-outlined text-gray-500">group</span>
                <div className="flex-grow">
                  <span className="block font-sans text-[8px] font-semibold text-gray-400 uppercase tracking-wider">Guests</span>
                  <select className="block w-full font-sans text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                  </select>
                </div>
              </div>

              <Link to="/stay" className="w-full bg-[#1e75eb] hover:bg-[#155fc0] text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md">
                <span className="material-symbols-outlined text-sm font-bold">search</span>
                <span>Search Rooms</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Redefining Experiential Luxury */}
      <section id="about" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Overlapping Asymmetric Images */}
          <div className="lg:col-span-6 reveal relative h-[480px] md:h-[580px]">
            {/* Main Snowy Pines Image */}
            <div className="absolute top-0 left-0 w-[82%] h-[82%] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/20 group bg-stone-100">
              <img
                className="w-full h-full object-cover object-top transition-transform duration-[10s] ease-out group-hover:scale-102"
                alt="Snowy pine forest hillside in the Himalayas"
                src={snowyPines}
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Overlapping Detail Image (Cabin Interior with Pillows) */}
            <div className="absolute bottom-0 right-0 w-[45%] h-[48%] rounded-2xl overflow-hidden shadow-2xl border-4 border-background z-10 group">
              <img
                className="w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-105"
                alt="Detailed wood craftsmanship and cozy seating"
                src={thumb2}
              />
            </div>

          </div>

          {/* Right Column: Editorial Text & Philosophy Pillars */}
          <div className="lg:col-span-6 reveal space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-secondary block">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium leading-tight">
                Welcome to <span className="italic">Avasaa Stays</span>
              </h2>
            </div>

            {/* High-end introduction statement */}
            <p className="font-serif text-lg md:text-xl text-primary italic leading-relaxed font-light border-l-2 border-secondary/40 pl-6">
              We believe true luxury is having the time to watch the clouds drift by, share an unhurried meal, and wake up with nowhere else you'd rather be.
            </p>

            <div className="space-y-4 font-sans text-sm md:text-base text-on-surface-variant font-light leading-relaxed">
              <p>
                Some places are made for ticking off destinations.<br />
                <span className="font-semibold text-primary">Avasaa is made for slowing down.</span>
              </p>
              <p>
                Located in the quiet village of Seri, Jibhi, Avasaa offers a different pace of travel. Mornings begin with birdsong instead of traffic. Evenings end under star-filled skies. The days in between are yours to spend however you like.
              </p>
              <p className="italic">
                Read a book on the balcony.<br />
                Work with the mountains as your backdrop.<br />
                Go chasing waterfalls or do absolutely nothing.
              </p>
            </div>

            <div className="pt-6 border-t border-outline-variant/30 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-serif text-xl italic text-secondary font-light"></p>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-sans"></span>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center font-sans text-xs font-semibold uppercase tracking-widest text-primary group border-b-2 border-primary/20 pb-1 hover:border-primary transition-all duration-300"
              >
                HERE'S HOW IT ALL STARTED
                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-2">
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: The Stay */}
      <section className="bg-[#fcfbf9] py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-secondary mb-4 block">
              CRAFTED FOR COMFORT
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium">
              The Stay
            </h2>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c2a25a]/30 to-transparent w-32 mx-auto mt-4"></div>
          </div>

          {/* Vertical Cards 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                id: 'pine-chalet',
                name: 'Pine Chalet',
                type: 'Mountain Refuge',
                description: '2 Adults • Forest View',
                price: '₹ 18,000',
                originalPrice: '₹ 24,000',
                discount: '- ₹ 6,000',
                taxes: '+ ₹ 1,200 taxes & fees / night',
                stars: 5,
                rating: '4.9',
                reviews: '128 reviews',
                tags: ['Forest View', 'Fireplace'],
                bullets: ['wifi', 'fireplace', 'parking', '24-hour service'],
                image: room1Img,
                imagePosition: 'center 38%'
              },
              {
                id: 'cedar-suite',
                name: 'Cedar Suite',
                type: 'Elevated Luxury',
                description: '4 Guests • River Facing',
                price: '₹ 24,500',
                originalPrice: '₹ 31,000',
                discount: '- ₹ 6,500',
                taxes: '+ ₹ 1,800 taxes & fees / night',
                stars: 5,
                rating: '4.8',
                reviews: '94 reviews',
                tags: ['River Facing', 'Balcony'],
                bullets: ['wifi', 'balcony', 'ac_unit', 'minibar'],
                image: room2Img
              },
              {
                id: 'oak-studio',
                name: 'Oak Studio',
                type: 'Intimate Escape',
                description: '2 Guests • Garden View',
                price: '₹ 15,000',
                originalPrice: '₹ 20,000',
                discount: '- ₹ 5,000',
                taxes: '+ ₹ 950 taxes & fees / night',
                stars: 4,
                rating: '4.7',
                reviews: '56 reviews',
                tags: ['Garden View', 'Eco Friendly'],
                bullets: ['wifi', 'kitchenette', 'parking', 'breakfast'],
                image: room3Img,
                imagePosition: 'center 45%'
              }
            ].map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden reveal hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* 1. Image Section (Top) */}
                <div className="relative aspect-[16/10] overflow-hidden group">
                  <img
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-103 ${room.containImage ? 'object-contain bg-stone-100/60' : 'object-cover'
                      }`}
                    alt={room.name}
                    src={room.image}
                    style={{ objectPosition: room.imagePosition || 'center' }}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-300"></div>

                  {/* Rating Scorecard Badge (Overlay Top Right) */}
                  <div className="absolute top-3 right-3 bg-[#1f432d] text-white font-sans text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md backdrop-blur-md">
                    <span>{room.rating}</span>
                    <span className="w-1 h-1 rounded-full bg-white/55"></span>
                    <span className="text-[9px] font-medium tracking-wide uppercase">{room.type}</span>
                  </div>
                </div>

                {/* 2. Room Content Info Section (Middle) */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-3.5 bg-primary rounded-full"></span>
                      <h3 className="font-serif text-lg font-semibold text-primary">{room.name}</h3>
                    </div>

                    {/* Star Rating Indicator */}
                    <div className="flex text-[#cca85a]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`material-symbols-outlined text-xs ${i < room.stars ? 'font-fill-1' : ''}`}>star</span>
                      ))}
                    </div>

                    {/* Breadcrumb Destination */}
                    <p className="font-sans text-[9px] font-semibold text-[#1e75eb] uppercase tracking-wider">
                      Jibhi &gt; Tirthan Valley
                    </p>

                    {/* Tags Badges */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {room.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100/80 text-gray-600 px-2 py-0.5 rounded-md font-sans text-[8px] font-bold uppercase tracking-wider border border-black/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bullet Amenities Row */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[10px] text-on-surface-variant font-light pt-2.5 border-t border-outline-variant/30">
                    {room.bullets.map((bullet, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        {idx > 0 && <span className="text-gray-300">•</span>}
                        <span className="capitalize">{bullet}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Pricing & Booking Column (Bottom) */}
                <div className="p-5 pt-0 flex flex-col justify-between items-stretch">

                  {/* Pricing and Tax details */}
                  <div className="text-left border-t border-outline-variant/30 pt-3 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#d32f2f] text-white px-1.5 py-0.5 rounded font-sans text-[8px] font-bold">
                        {room.discount}
                      </span>
                      <span className="font-sans text-xs text-gray-400 line-through">
                        {room.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <p className="font-serif text-xl font-bold text-primary leading-none">
                        {room.price}
                      </p>
                      <span className="text-[9px] text-on-surface-variant font-light">/ night</span>
                    </div>
                    <p className="text-[8px] text-on-surface-variant font-light">
                      {room.taxes}
                    </p>
                  </div>

                  {/* View Rooms / Booking Button */}
                  <Link
                    to={`/room/${room.id}`}
                    className="w-full mt-3 bg-[#1f432d] hover:bg-[#12281a] text-white py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-98 transition-all"
                  >
                    <span>View Rooms</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Experiences */}
      <section id="experiences" className="py-24 px-6 max-w-7xl mx-auto">
        {/* Centered Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 reveal">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-secondary block">
            Immerse Yourself
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium leading-tight">
            Curated Experiences
          </h2>
          <p className="font-sans text-base text-on-surface-variant font-light leading-relaxed">
            Designed around the rhythm of the mountains, our experiences are simple, authentic, and deeply rooted in the place we call home.
          </p>
        </div>

        {/* 3-Column Image-Driven Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {/* Card 1: Village Walks */}
          <div className="group relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg border border-outline-variant/30 reveal">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-108"
              alt="Village Walks"
              src={forestWalkImg}
            />
            {/* Elegant Gradient Overlay — Thinned to remove black shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent z-10"></div>

            {/* Card Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white">
              <span className="font-serif text-3xl italic text-[#cca85a]/90 mb-2 font-light block">01</span>
              <h3 className="font-sans text-xl font-bold uppercase tracking-wider text-white mb-2">
                Village Walks
              </h3>
              <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                Walk Through Mountain Life
                Take a leisurely stroll through the quiet lanes of Seri, where every corner tells a story.
              </p>
            </div>
          </div>

          {/* Card 2: HIDDEN TRAILSs */}
          <div className="group relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg border border-outline-variant/30 reveal">
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-108"
              alt="HIDDEN TRAILSs"
              src={thumb4}
            />
            {/* Elegant Gradient Overlay — Thinned to remove black shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent z-10"></div>

            {/* Card Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white">
              <span className="font-serif text-3xl italic text-[#cca85a]/90 mb-2 font-light block">02</span>
              <h3 className="font-sans text-xl font-bold uppercase tracking-wider text-white mb-2">
                HIDDEN TRAILS
              </h3>
              <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                Take the Path Less Travelled
                Leave the crowds behind and wander along peaceful forest trails.
              </p>
            </div>
          </div>

          {/* Card 3: Signature Bonfire Evenings */}
          <div className="group relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg border border-outline-variant/30 reveal">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
              alt="Signature Bonfire Evenings"
              src={bonfireImg}
            />
            {/* Elegant Gradient Overlay — Thinned to remove black shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent z-10"></div>

            {/* Card Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white">
              <span className="font-serif text-3xl italic text-[#cca85a]/90 mb-2 font-light block">03</span>
              <h3 className="font-sans text-xl font-bold uppercase tracking-wider text-white mb-2">
                Forest Picnic
              </h3>
              <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                Meals Taste Better Outdoors
                Spread a blanket beneath the deodars, unpack a basket of simple comforts.
              </p>
            </div>
          </div>

        </div>

        {/* Featured Wide Banner at Bottom */}
        <div className="w-full reveal mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-[40px] bg-surface-container-low shadow-lg border border-outline-variant/30">
            {/* Left side: Immersive photo */}
            <div className="relative aspect-[4/3] md:aspect-auto h-80 md:h-[420px] overflow-hidden">
              <img
                className="w-full h-full object-cover scale-105 transition-transform duration-[10s] ease-out hover:scale-100"
                src={cabinInterior}
                alt="Cozy cabin interior view"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Right side: Gold colored experience card */}
            <div className="bg-[#c2a25a] text-[#1f432d] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden h-80 md:h-[420px]">
              {/* Top-left decoration badge */}
              <div className="absolute top-8 left-8 opacity-25">
                <span className="material-symbols-outlined text-4xl">filter_vintage</span>
              </div>

              {/* Background Pine Trees Silhouette */}
              <div className="absolute right-[-40px] bottom-[-20px] opacity-15 pointer-events-none select-none">
                <span className="material-symbols-outlined text-[240px] leading-none">forest</span>
              </div>

              {/* Card Typography */}
              <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#1f432d]/70 mb-4 block">
                A raw mountain experience in
              </span>
              <h3 className="font-sans text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider leading-[0.95] text-[#1f432d] mb-2">
                Jibhi's <br />Tirthan Valley
              </h3>
            </div>
          </div>
        </div>
      </section>



      {/* Brand Typography Section — Decorated */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-[#f8f6f1] to-white">

        {/* Subtle Background Pattern — Faint grid dots */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style={{ backgroundImage: 'radial-gradient(circle, #1f432d 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Top & Bottom Gold Accent Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#c2a25a]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#c2a25a]/50 to-transparent"></div>

        {/* Corner Ornament — Top Left */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 opacity-15 pointer-events-none select-none">
          <div className="w-16 h-16 border-t-2 border-l-2 border-[#c2a25a]/60 rounded-tl-lg"></div>
        </div>
        {/* Corner Ornament — Top Right */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-15 pointer-events-none select-none">
          <div className="w-16 h-16 border-t-2 border-r-2 border-[#c2a25a]/60 rounded-tr-lg"></div>
        </div>
        {/* Corner Ornament — Bottom Left */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 opacity-15 pointer-events-none select-none">
          <div className="w-16 h-16 border-b-2 border-l-2 border-[#c2a25a]/60 rounded-bl-lg"></div>
        </div>
        {/* Corner Ornament — Bottom Right */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-15 pointer-events-none select-none">
          <div className="w-16 h-16 border-b-2 border-r-2 border-[#c2a25a]/60 rounded-br-lg"></div>
        </div>

        {/* Decorative Pine Silhouettes — Left */}
        <div className="absolute left-[-20px] bottom-0 opacity-[0.04] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[200px] text-primary leading-none">park</span>
        </div>
        {/* Decorative Pine Silhouettes — Right */}
        <div className="absolute right-[-20px] bottom-0 opacity-[0.04] pointer-events-none select-none">
          <span className="material-symbols-outlined text-[200px] text-primary leading-none">forest</span>
        </div>

        {/* Left Vertical Stamp */}
        <div className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-30 z-10">
          <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-primary [writing-mode:vertical-lr] rotate-180">ESTD. 2024</span>
          <div className="h-10 w-[1px] bg-primary/40"></div>
        </div>

        {/* Right Vertical Stamp */}
        <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 opacity-30 z-10">
          <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-primary [writing-mode:vertical-lr]">JIBHI • HP</span>
          <div className="h-10 w-[1px] bg-primary/40"></div>
        </div>

        {/* Top Center Label */}
        <div className="relative z-10 flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] bg-[#c2a25a]/30 w-12 md:w-20"></div>
          <span className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-[#c2a25a]">Our Identity</span>
          <div className="h-[1px] bg-[#c2a25a]/30 w-12 md:w-20"></div>
        </div>

        {/* Image-Masked Branding Typography */}
        <div className="relative z-10 flex justify-center items-center font-sans text-[15vw] md:text-[14vw] font-black tracking-[0.2em] md:tracking-[0.25em] text-center uppercase leading-none select-none max-w-[95vw] mx-auto">
          <span className="bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-108 inline-block cursor-default" style={{ backgroundImage: `url(${thumb1})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A</span>
          <span className="bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-108 inline-block cursor-default" style={{ backgroundImage: `url(${thumb2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>V</span>
          <span className="bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-108 inline-block cursor-default" style={{ backgroundImage: `url(${thumb3})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A</span>
          <span className="bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-108 inline-block cursor-default" style={{ backgroundImage: `url(${thumb4})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>S</span>
          <span className="bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-108 inline-block cursor-default" style={{ backgroundImage: `url(${snowyPines})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A</span>
          <span className="bg-cover bg-center bg-no-repeat transition-all duration-300 hover:scale-108 inline-block cursor-default" style={{ backgroundImage: `url(${heroImg})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>A</span>
        </div>

        {/* Bottom Flanked Subtitle */}
        <div className="relative z-10 flex items-center justify-center gap-4 mt-8">
          <div className="h-[1px] bg-primary/20 w-12 md:w-20"></div>
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-secondary">Himalayan Sanctuary</span>
          <div className="h-[1px] bg-primary/20 w-12 md:w-20"></div>
        </div>
      </section>

      {/* Section 8: Discover Jibhi */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="reveal space-y-8">
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary block">
              The Destination
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium">Discover Jibhi</h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                <span className="font-serif text-4xl text-surface-container-highest">01</span>
                <div>
                  <h4 className="font-serif text-xl text-primary mb-2">Jalori Pass</h4>
                  <p className="text-on-surface-variant font-sans font-light leading-relaxed">
                    A breathtaking mountain pass located at 10,800 ft. Perfect for a day trek with 360-degree views of the snowy peaks.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-serif text-4xl text-surface-container-highest">02</span>
                <div>
                  <h4 className="font-serif text-xl text-primary mb-2">Serolsar Lake</h4>
                  <p className="text-on-surface-variant font-sans font-light leading-relaxed">
                    A hidden mystical lake deep in the forest. Its waters are said to be eternally clean, guarded by local mountain spirits.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="font-serif text-4xl text-surface-container-highest">03</span>
                <div>
                  <h4 className="font-serif text-xl text-primary mb-2">Jibhi Waterfall</h4>
                  <p className="text-on-surface-variant font-sans font-light leading-relaxed">
                    A gentle cascading waterfall located just a short walk from the retreat. The perfect spot for a cold mountain dip.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative reveal flex justify-center">
            <div className="w-[80%] aspect-square rounded-full overflow-hidden border border-outline-variant/60 p-4">
              <img
                className="w-full h-full object-cover rounded-full"
                alt="Snow-capped mountain peaks"
                src={mountainPeakImg}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-secondary-container rounded-full flex items-center justify-center p-6 text-center animate-spin-slow">
              <p className="font-sans text-[9px] font-semibold text-on-secondary-container tracking-widest leading-normal">
                EXPLORE • HIMALAYAS • EXPLORE • HIMALAYAS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Gallery — Decorated & Colored */}
      <section id="gallery" className="py-24 px-6 bg-[#FAF8F5] relative overflow-hidden">

        {/* Subtle decorative background line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>

        {/* Small gold ornament above section title */}
        <div className="flex justify-center mb-4">
          <span className="material-symbols-outlined text-[#c2a25a] text-lg font-light tracking-[0.2em]">spa</span>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 reveal">
          <div className="space-y-4">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#c2a25a] block">
              Visual Story
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium leading-tight">
              The Avaasa Gallery
            </h2>
          </div>

          {/* Instagram Connect Button */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-primary/10 text-primary font-sans text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm scale-100 hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>Connect on Instagram</span>
          </a>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-3xl reveal">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Himalayan wood cottage sunset glow"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK-48nzqziOQPo8BqWXWZCzrXt-DRDFu1S0WIa8AaJ4kSJI5vznPwYH6Tay6ZMSoKVQrPv51uFVrNJG8IzRdknyK6x_FglycDbIyRpGvHD3B5J-Jfp5kK14bRpJhKiwFWWFvc-_q70hZlSiIS3h-Y-yProyksoEyidefBqeIpYPnu5itUgPNylSA2Hv3MHmNLbvjhvIAlE8mWeG9FM0Rq4Jloqe-wTLtFXQtNRANb0-WOIViXX2bEW"
              />
            </div>
            <div className="overflow-hidden rounded-3xl reveal">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Chalet tub looking out to forest"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiqrG6Zj_Vxx0q9ds2Q3OwBRNKbYlyJafapeLAuKME0JZCiQRkYCwjF9G2HXwYUCd85587o1l10Mj-HrCWWOtHw24cVQeZD4HakevVtf66EVs8wBjfferyAP2KyJQ3FRJjmS-MpFYJf6izDuKELXqOBLdMZi1ig6xE05TQiXbtuXG0ULEkLiGNa61oazrGLxpS4RPskLjTp_6DLHsbVRiTWH0VbbOPm-ZEx9b1MvC7I6MTqnGpd3wp"
              />
            </div>
            <div className="overflow-hidden rounded-3xl reveal">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Hand carved wooden details"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCToewijSEL79Xo-GOkN2JkmPp6jJgPMaqRyV0DAzgjO0diDTmQhcoDVI_tAAkUs1flH56gx0kkPvYikt0swqtG7xC5covliw90Mmc2rUE2_62ds3Cd3_9tJcJYnv5EH5ilbGn-y7SpZKH3bdkk9Stp9gDE21b0EnTFCDNAelDZ5m3iKxeE40V2u1Fs0NGEf3tFyNnN_jH7LQxv3daIWQRviXjVll12Gw_fW6ZS4KEa9chf0LheQayN"
              />
            </div>
            <div className="md:col-span-2 overflow-hidden rounded-3xl reveal">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Sun peek valley morning mist deodar forest"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSCkvIot5v7uygqLfZRjeUQRxZ1SVwSwUD-h-h0R2neRjrXP64djE_zeK0UlsFpSLsWebRwhwdrMBXMh8i4mIJCgm69gb1DajsxHeR7SgqYkZW4xmnQUnU1N6RhhaC8hDbHcujWIyA2h2qmmaEjcRms97n57Tn89hFKHy2Q3nzdPquiQ1ks8RQrxWwhYT743xUB8l9OuXJRaQcj7QUXyVMU4aovYix8K2ONRD7W8YKUsWfm1-iZXlq"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="bg-surface-container py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-center text-primary mb-16 reveal font-medium">
            Voices From The Mountains
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm reveal">
              <div className="flex text-[#edbf7a] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined font-fill-1">star</span>
                ))}
              </div>
              <p className="font-sans text-on-surface-variant italic mb-8 leading-relaxed font-light">
                "An absolute dream. The attention to detail in the woodwork and the sheer peace of the location is unmatched. It’s luxury, but it feels incredibly authentic."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high"></div>
                <div>
                  <p className="font-sans font-bold text-primary text-sm">Sarah Mitchell</p>
                  <p className="text-[10px] text-on-surface-variant font-semibold tracking-widest uppercase">London, UK</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm reveal" style={{ transitionDelay: '100ms' }}>
              <div className="flex text-[#edbf7a] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined font-fill-1">star</span>
                ))}
              </div>
              <p className="font-sans text-on-surface-variant italic mb-8 leading-relaxed font-light">
                "Waking up to the mountain views from the Cedar Suite was a highlight of our year. The staff treated us like royalty. We'll be back every winter."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high"></div>
                <div>
                  <p className="font-sans font-bold text-primary text-sm">Arjun Khanna</p>
                  <p className="text-[10px] text-on-surface-variant font-semibold tracking-widest uppercase">Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm reveal" style={{ transitionDelay: '200ms' }}>
              <div className="flex text-[#edbf7a] mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined font-fill-1">star</span>
                ))}
              </div>
              <p className="font-sans text-on-surface-variant italic mb-8 leading-relaxed font-light">
                "Jibhi is a hidden gem and Avaasa is its crown. The riverside dinner experience was the most romantic evening we've ever had. Truly special."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high"></div>
                <div>
                  <p className="font-sans font-bold text-primary text-sm">Elena Rodriguez</p>
                  <p className="text-[10px] text-on-surface-variant font-semibold tracking-widest uppercase">Barcelona, Spain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}

export default Home;
