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
import stayHero from '../assets/stay_hero.jpg';

function Home() {
  const slides = [
    {
      image: heroImg,
      subtitle: "SERI VILLAGE • JIBHI",
      title: <>Come Home. <br /><span className="italic font-light">To The Mountains..</span></>,
      description: "Some places are visited. Others are felt. Nestled in the quiet village of Seri, Avasaa invites you to pause, reconnect, and experience the mountains at their own pace."
    },
    {
      image: heroBalcony,
      subtitle: "UNINTERRUPTED VIEWS",
      title: <>A Balcony Above <br /><span className="italic font-light">The Whispering Clouds.</span></>,
      description: "Watch the clouds roll through the valley from your balcony, sip your morning coffee in silence, and let the mountains remind you how peaceful life can feel."
    },
    {
      image: heroWinter,
      subtitle: "A TABLE WITH A VIEW",
      title: <>More Than A Café. <br /><span className="italic font-light">It's Where Days Slow Down.</span></>,
      description: "The laughter around the table, the warmth of a fresh meal, the view beyond the window. These are the moments people carry home from Avasaa."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [instagramPhotos, setInstagramPhotos] = useState([
    {
      id: "fb_1",
      media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK-48nzqziOQPo8BqWXWZCzrXt-DRDFu1S0WIa8AaJ4kSJI5vznPwYH6Tay6ZMSoKVQrPv51uFVrNJG8IzRdknyK6x_FglycDbIyRpGvHD3B5J-Jfp5kK14bRpJhKiwFWWFvc-_q70hZlSiIS3h-Y-yProyksoEyidefBqeIpYPnu5itUgPNylSA2Hv3MHmNLbvjhvIAlE8mWeG9FM0Rq4Jloqe-wTLtFXQtNRANb0-WOIViXX2bEW",
      permalink: "https://instagram.com",
      caption: "Sunset glow casting on our handcarved wooden cabin balconies. #avaasa #jibhi #slowliving"
    },
    {
      id: "fb_2",
      media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiqrG6Zj_Vxx0q9ds2Q3OwBRNKbYlyJafapeLAuKME0JZCiQRkYCwjF9G2HXwYUCd85587o1l10Mj-HrCWWOtHw24cVQeZD4HakevVtf66EVs8wBjfferyAP2KyJQ3FRJjmS-MpFYJf6izDuKELXqOBLdMZi1ig6xE05TQiXbtuXG0ULEkLiGNa61oazrGLxpS4RPskLjTp_6DLHsbVRiTWH0VbbOPm-ZEx9b1MvC7I6MTqnGpd3wp",
      permalink: "https://instagram.com",
      caption: "A warm bath looking out into the dense pine and cedar forests. Morning rhythms. #retreat #escape"
    },
    {
      id: "fb_3",
      media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCToewijSEL79Xo-GOkN2JkmPp6jJgPMaqRyV0DAzgjO0diDTmQhcoDVI_tAAkUs1flH56gx0kkPvYikt0swqtG7xC5covliw90Mmc2rUE2_62ds3Cd3_9tJcJYnv5EH5ilbGn-y7SpZKH3bdkk9Stp9gDE21b0EnTFCDNAelDZ5m3iKxeE40V2u1Fs0NGEf3tFyNnN_jH7LQxv3daIWQRviXjVll12Gw_fW6ZS4KEa9chf0LheQayN",
      permalink: "https://instagram.com",
      caption: "Craftsmanship in wood: every corner at Avasaa carries details. #himachal #interiors #mountaindesign"
    },
    {
      id: "fb_4",
      media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSCkvIot5v7uygqLfZRjeUQRxZ1SVwSwUD-h-h0R2neRjrXP64djE_zeK0UlsFpSLsWebRwhwdrMBXMh8i4mIJCgm69gb1DajsxHeR7SgqYkZW4xmnQUnU1N6RhhaC8hDbHcujWIyA2h2qmmaEjcRms97n57Tn89hFKHy2Q3nzdPquiQ1ks8RQrxWwhYT743xUB8l9OuXJRaQcj7QUXyVMU4aovYix8K2ONRD7W8YKUsWfm1-iZXlq",
      permalink: "https://instagram.com",
      caption: "Waking up above the clouds. First sun rays kissing Jibhi Valley. #morningglow #mountains"
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    fetch('http://localhost:5001/api/instagram/photos')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setInstagramPhotos(data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load Instagram photos from server:", err);
      });
  }, []);

  const roomSummaries = [
    {
      id: 'pine-chalet',
      name: 'Anandaa',
      type: 'Mountain Refuge',
      description: '2 Adults • Forest View',
      price: '₹18,000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0sgw4-SXq_qXpKloANjXlNkl_q5VFMDtF9bJPtuoLQPVB2sWocdu_w44u87THUY2ucSgdaaKOqxa-jqKEUsNMZaROwdERXOiJL4yu79PP4rufasEEw-h6Kv_MS4aE8diaqjFaNN7UjxtvzgVklzifP3Ukq4GJ6QJBAQAJrcnw2W1HCx3yt5gdit_4_GkPeIUZQVvJ-cfzmJOAQluNO457NvNnc_22xy6Um_p8JKJqkRtK6LKTBgzd',
      icons: ['wifi', 'whatshot', 'local_cafe']
    },
    {
      id: 'cedar-suite',
      name: 'Tattva',
      type: 'Elevated Luxury',
      description: '4 Guests • River Facing',
      price: '₹24,500',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfXjs_vO-186Ogx0iNtMIh8G0fhMHT2mQNu75hrqN6Ue1EWfqwG_h6neboJYenTLHjjBj0GRVGPSjLYtkXvsUTHb9w39uQ4VMtkHwUoAImjEt-CoWk_fJyWbuEqxny2tDP_zPREL41jsyyfG_fQ82W7xZI-c6za6GU5J1Q58mOLzAdql-27jjC0j50UuLc7_wEWRJs0kJ843vFLO2_HiJ9vMrq2H9g2YcUcRO0Z9tOtzPAMywpTmBB',
      icons: ['wifi', 'balcony', 'ac_unit']
    },
    {
      id: 'oak-studio',
      name: 'Samsara',
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
                className={`w-full h-full object-cover transition-transform duration-[10s] ease-out ${slide.scale || 'scale-101'}`}
                style={{ objectPosition: slide.objectPosition || 'top' }}
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
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-30 hidden md:block">
            <div className="bg-white/10 backdrop-blur-md rounded-[24px] shadow-2xl border border-white/20 p-4 relative">

              {/* Bottom Row - Form Grid */}
              <div className="grid grid-cols-4 gap-4 items-center">
                {/* 1. Check-in */}
                <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/90 border border-white/10">
                    <span className="material-symbols-outlined text-xl">calendar_today</span>
                  </div>
                  <div className="flex-grow">
                    <span className="block font-sans text-[9px] font-bold text-white/60 uppercase tracking-wider">Check-in</span>
                    <input
                      type="date"
                      className="block w-full font-sans text-sm font-bold text-white bg-transparent border-none p-0 focus:ring-0 cursor-pointer [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* 2. Check-out */}
                <div className="flex items-center gap-3 px-2 pr-4 border-r border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/90 border border-white/10">
                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                  </div>
                  <div className="flex-grow">
                    <span className="block font-sans text-[9px] font-bold text-white/60 uppercase tracking-wider">Check-out</span>
                    <input
                      type="date"
                      className="block w-full font-sans text-sm font-bold text-white bg-transparent border-none p-0 focus:ring-0 cursor-pointer [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* 3. Guests */}
                <div className="flex items-center gap-3 px-2 pr-4 border-r border-white/10">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/90 border border-white/10">
                    <span className="material-symbols-outlined text-xl">group</span>
                  </div>
                  <div className="flex-grow">
                    <span className="block font-sans text-[9px] font-bold text-white/60 uppercase tracking-wider">Guests</span>
                    <select className="block w-full font-sans text-sm font-bold text-white bg-transparent border-none p-0 focus:ring-0 cursor-pointer">
                      <option className="text-black bg-white">1 Guest</option>
                      <option className="text-black bg-white">2 Guests</option>
                      <option className="text-black bg-white">3 Guests</option>
                      <option className="text-black bg-white">4+ Guests</option>
                    </select>
                  </div>
                </div>

                {/* 4. Search Button (Shifted Inside Searchbar) */}
                <div className="flex items-center justify-center pl-2">
                  <Link
                    to="/stay"
                    className="w-full bg-[#516C60] hover:bg-[#3e5349] text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all duration-200 transform hover:scale-102 active:scale-98 whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">search</span>
                    <span>Search Rooms</span>
                  </Link>
                </div>
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
          <div className="bg-white/40 backdrop-blur-md rounded-[24px] shadow-xl border border-white/30 p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-white/20 rounded-xl border border-white/20">
                  <span className="material-symbols-outlined text-gray-700 text-lg">calendar_today</span>
                  <div className="flex-grow">
                    <span className="block font-sans text-[8px] font-semibold text-gray-500 uppercase tracking-wider">Check-in</span>
                    <input type="date" className="block w-full font-sans text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0" />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/20 rounded-xl border border-white/20">
                  <span className="material-symbols-outlined text-gray-700 text-lg">calendar_month</span>
                  <div className="flex-grow">
                    <span className="block font-sans text-[8px] font-semibold text-gray-500 uppercase tracking-wider">Check-out</span>
                    <input type="date" className="block w-full font-sans text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/20 rounded-xl border border-white/20">
                <span className="material-symbols-outlined text-gray-700">group</span>
                <div className="flex-grow">
                  <span className="block font-sans text-[8px] font-semibold text-gray-500 uppercase tracking-wider">Guests</span>
                  <select className="block w-full font-sans text-xs font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0">
                    <option className="text-black bg-white">1 Guest</option>
                    <option className="text-black bg-white">2 Guests</option>
                    <option className="text-black bg-white">3 Guests</option>
                  </select>
                </div>
              </div>

              <Link to="/stay" className="w-full bg-[#516C60] hover:bg-[#3e5349] text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md">
                <span className="material-symbols-outlined text-sm font-bold">search</span>
                <span>Search Rooms</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Redefining Experiential Luxury */}
      <section id="about" className="py-24 px-6 md:py-28 bg-gradient-to-br from-[#516C60] to-[#34463e] text-white">
        <div className="max-w-3xl mx-auto reveal space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl text-white font-medium leading-tight">
              Redefining Experiential <span className="italic font-light text-[#cca85a]">Luxury</span>
            </h2>
            <h3 className="font-serif text-xl text-white/80 font-light">Welcome to Avasaa Stays</h3>
          </div>

          {/* High-end introduction statement */}
          <blockquote className="border-l border-white/20 pl-6 py-1 italic font-serif text-lg md:text-xl text-white/80 font-light leading-relaxed">
            We believe true luxury is having the time to watch the clouds drift by, share an unhurried meal, and wake up with nowhere else you'd rather be.
          </blockquote>

          <div className="space-y-6 font-sans text-sm md:text-base text-white/70 font-light leading-relaxed">
            <p>
              Some places are made for ticking off destinations.<br />
              <span className="font-semibold text-white">Avasaa is made for slowing down.</span>
            </p>
            <p>
              Located in the quiet village of Seri, Jibhi, Avasaa offers a different pace of travel. Mornings begin with birdsong instead of traffic. Evenings end under star-filled skies. The days in between are yours to spend however you like.
            </p>
            <div className="space-y-1 font-serif italic text-base text-white/70 pl-60">
              <p>Read a book on the balcony.</p>
              <p>Work with the mountains as your backdrop.</p>
              <p>Go chasing waterfalls or do absolutely nothing.</p>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <Link
              to="/about"
              className="inline-flex items-center font-sans text-xs font-semibold uppercase tracking-widest text-[#cca85a] hover:text-[#e4c483] group border-b border-[#cca85a]/30 pb-1.5 hover:border-[#cca85a] transition-all duration-300"
            >
              <span>HERE'S HOW IT ALL STARTED</span>
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Accommodation Banner */}
      <section className="w-full relative h-[75vh] md:h-[95vh] overflow-hidden group">
        <Link to="/stay" className="block w-full h-full relative cursor-pointer">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${stayHero})` }}
          />
          {/* Subtle Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-transparent transition-all duration-300" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center px-8 md:px-20 max-w-7xl mx-auto">
            <div className="flex items-center gap-6 reveal">
              {/* Vertical BOOK tag */}
              <div
                className="font-sans text-[10px] md:text-xs tracking-[0.4em] font-semibold text-[#cca85a] uppercase border-r border-[#cca85a]/30 pr-4 py-2 select-none"
                style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              >
                BOOK
              </div>
              {/* Heading and details */}
              <div className="space-y-1 md:space-y-2">
                <h2 className="font-serif text-4xl md:text-6xl text-white font-light tracking-wide leading-none">
                  Accommodation
                </h2>
                <p className="font-serif text-lg md:text-2xl text-white/90 italic font-light flex items-center">
                  at Avasaa <span className="font-sans not-italic text-lg md:text-2xl ml-2 tracking-tighter text-white/90">»</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Section 4: Experiences */}
      <section id="experiences" className="py-10 px-6 max-w-6xl mx-auto">
        <div className="w-full">
          {/* Centered Editorial Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 reveal">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-secondary block">
              Read Our Stories
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium leading-tight">
              Mountain Journal
            </h2>
            <p className="font-sans text-base text-on-surface-variant font-light leading-relaxed">
              A collection of moments, stories, and activities from our little corner of the Himalayas.
            </p>
          </div>

          {/* 6-Column Text-Only Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10">
            {[
              {
                title: "Village Walks",
                subtitle: "Walk Through Mountain Life",
                description: "Take a leisurely stroll through the quiet lanes of Seri, where every corner tells a story. Meet friendly locals, admire traditional Himalayan homes, and experience the simple beauty of life in the mountains."
              },
              {
                title: "Hidden Trails",
                subtitle: "Take the Path Less Travelled",
                description: "Leave the crowds behind and wander along peaceful forest trails. Discover hidden viewpoints, breathe in the fresh mountain air, and let nature set the pace."
              },
              {
                title: "Forest Picnics",
                subtitle: "Meals Taste Better Outdoors",
                description: "Spread a blanket beneath the deodars, unpack a basket of simple comforts, and enjoy an unhurried picnic surrounded by birdsong, mountain views, and the scent of pine."
              },
              {
                title: "Painting in Nature",
                subtitle: "Let the Mountains Be Your Canvas",
                description: "Slow down, pick up a brush, and capture the beauty around you. No experience is needed, just curiosity, fresh air, and a moment to create something inspired by the landscape."
              },
              {
                title: "Exploring Hidden Gems",
                subtitle: "Discover Places Few People Know About",
                description: "Spend a day exploring hidden waterfalls, peaceful viewpoints, and untouched corners of the valley, far from the crowds. Because the most beautiful places are often the ones that aren't on the itinerary."
              },
              {
                title: "Bonfire Nights",
                subtitle: "Where Evenings Turn Into Memories",
                description: "Gather around the fire, share a warm meal, listen to music, and lose track of time beneath a sky full of stars. Some of the best memories at Avasaa are made after the sun goes down."
              }
            ].map((exp, idx) => (
              <div
                key={idx}
                className={`px-8 md:px-12 py-6 md:py-8 text-center space-y-4 reveal border-b border-primary/10 md:border-b-0 ${idx % 3 !== 2 ? 'md:border-r border-primary/10' : ''
                  } ${idx >= 3 ? 'md:border-t border-primary/10' : ''
                  } last:border-b-0`}
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl text-secondary font-semibold leading-tight tracking-wide">
                    {exp.title}
                  </h3>
                  {exp.subtitle && (
                    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#cca85a] italic">
                      {exp.subtitle}
                    </p>
                  )}
                </div>
                <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed max-w-xs mx-auto">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Wide Banner — Google Maps Location (Full width touching the corners) */}
      <section className="w-full reveal mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden bg-surface-container-low shadow-lg">
          {/* Left side: Google Map */}
          <div className="relative h-80 md:h-[420px] overflow-hidden md:col-span-2">
            <iframe
              title="Avasaa Café and Stay Location"
              src="https://maps.google.com/maps?q=Avasaa%20Cafe%20and%20Stay%20Jibhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Right side: Location info card */}
          <div className="bg-white text-[#516C60] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden h-80 md:h-[420px] md:col-span-1 border-l border-outline-variant/20">
            {/* Top-left decoration badge */}
            <div className="absolute top-8 left-8 opacity-25">
              <span className="material-symbols-outlined text-4xl">location_on</span>
            </div>

            {/* Background Pine Trees Silhouette */}
            <div className="absolute right-[-40px] bottom-[-20px] opacity-5 pointer-events-none select-none">
              <span className="material-symbols-outlined text-[240px] leading-none">forest</span>
            </div>

            {/* Card Typography */}
            <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#516C60]/70 mb-4 block">
              Find Us
            </span>
            <h3 className="font-sans text-3xl md:text-4xl font-black uppercase tracking-wider leading-[0.95] text-[#516C60] mb-6">
              Seri Village,<br />Jibhi
            </h3>
            <p className="font-sans text-sm text-[#516C60]/80 font-light leading-relaxed mb-6 max-w-xs">
              Avasaa Café and Stay, Seri Rd, Jibhi, Tandi, Himachal Pradesh 175123
            </p>
            <a
              href="https://www.google.com/maps/search/Avasaa+Cafe+and+Stay+Seri+Rd+Jibhi+Tandi+Himachal+Pradesh+175123"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#516C60] text-white px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#3e5349] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 w-fit"
            >
              <span className="material-symbols-outlined text-sm">directions</span>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Section 6: Gallery — Decorated & Colored */}
      <section id="gallery" className="py-24 px-6 bg-[#EFE6E1] relative overflow-hidden">

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

          <a
            href="https://www.instagram.com/avasaastays/"
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
            {instagramPhotos.map((photo, idx) => {
              let gridClass = "overflow-hidden rounded-3xl reveal";
              if (idx === 0) {
                gridClass = "md:col-span-2 md:row-span-2 overflow-hidden rounded-3xl reveal";
              } else if (idx === 3) {
                gridClass = "md:col-span-2 overflow-hidden rounded-3xl reveal";
              }

              return (
                <div key={photo.id || idx} className={gridClass}>
                  <a
                    href={photo.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full relative group overflow-hidden"
                  >
                    <img
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      alt={photo.caption || "Instagram Moment"}
                      src={photo.media_url}
                    />
                    {/* Caption Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                      <p className="text-white text-xs font-sans font-light leading-relaxed line-clamp-3">
                        {photo.caption}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="bg-surface-container py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-4xl text-center text-primary mb-8 reveal font-medium">
            Voices From The Mountains
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm reveal">
              <div className="flex text-[#edbf7a] mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined font-fill-1 text-lg">star</span>
                ))}
              </div>
              <p className="font-sans text-on-surface-variant italic mb-6 leading-relaxed font-light text-sm">
                "An absolute dream. The attention to detail in the woodwork and the sheer peace of the location is unmatched. It’s luxury, but it feels incredibly authentic."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high"></div>
                <div>
                  <p className="font-sans font-bold text-primary text-xs">Sarah Mitchell</p>
                  <p className="text-[9px] text-on-surface-variant font-semibold tracking-widest uppercase">London, UK</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm reveal" style={{ transitionDelay: '100ms' }}>
              <div className="flex text-[#edbf7a] mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined font-fill-1 text-lg">star</span>
                ))}
              </div>
              <p className="font-sans text-on-surface-variant italic mb-6 leading-relaxed font-light text-sm">
                "Waking up to the mountain views from the Cedar Suite was a highlight of our year. The staff treated us like royalty. We'll be back every winter."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high"></div>
                <div>
                  <p className="font-sans font-bold text-primary text-xs">Arjun Khanna</p>
                  <p className="text-[9px] text-on-surface-variant font-semibold tracking-widest uppercase">Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm reveal" style={{ transitionDelay: '200ms' }}>
              <div className="flex text-[#edbf7a] mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined font-fill-1 text-lg">star</span>
                ))}
              </div>
              <p className="font-sans text-on-surface-variant italic mb-6 leading-relaxed font-light text-sm">
                "Jibhi is a hidden gem and Avaasa is its crown. The riverside dinner experience was the most romantic evening we've ever had. Truly special."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high"></div>
                <div>
                  <p className="font-sans font-bold text-primary text-xs">Elena Rodriguez</p>
                  <p className="text-[9px] text-on-surface-variant font-semibold tracking-widest uppercase">Barcelona, Spain</p>
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
