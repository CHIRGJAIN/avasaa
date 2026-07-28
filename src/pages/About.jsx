import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.jpg';

function About() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      
      {/* Hero Header with image */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-stone-900 flex items-center justify-center mb-16 md:mb-24">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="About Us"
            className="w-full h-full object-cover opacity-60 scale-102"
          />
        </div>
        <div className="relative z-10 text-center space-y-3 px-6">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-white/80 block">
            Our Story
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight drop-shadow-md">
            About Us
          </h1>
          <p className="font-sans text-sm md:text-base text-white/90 font-light leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            Your boutique sanctuary for slow living & mountain luxury. Learn about our philosophy and heritage.
          </p>
        </div>
      </div>

      {/* Main Narrative Block & Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        
        {/* Large Elegant Green Subtitle Header */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#cca85a] block mb-3">
            Your Ultimate Guide to Slow Mountain Living
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-primary font-medium leading-[1.1] tracking-tight">
            Discover the Thrill of Adventure & Silence with Avasaa
          </h2>
        </div>

        {/* Section Intro Badge */}
        <div className="flex items-center gap-2 text-primary font-sans text-xs font-bold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#cca85a]"></span>
          About Our Philosophy
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: 2x2 Stats Cards */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            
            <div className="bg-white p-6 md:p-8 rounded-[24px] border border-[#dfd3cc]/50 shadow-sm space-y-2 flex flex-col justify-center min-h-[140px] md:min-h-[160px] hover:shadow-md transition-shadow">
              <span className="font-sans text-3xl md:text-4xl font-extrabold text-primary block">200+</span>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Happy Guest Stays</span>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[24px] border border-[#dfd3cc]/50 shadow-sm space-y-2 flex flex-col justify-center min-h-[140px] md:min-h-[160px] hover:shadow-md transition-shadow">
              <span className="font-sans text-3xl md:text-4xl font-extrabold text-primary block">6</span>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Curated Experiences</span>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[24px] border border-[#dfd3cc]/50 shadow-sm space-y-2 flex flex-col justify-center min-h-[140px] md:min-h-[160px] hover:shadow-md transition-shadow">
              <span className="font-sans text-3xl md:text-4xl font-extrabold text-primary block">98%</span>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Customer Satisfaction</span>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[24px] border border-[#dfd3cc]/50 shadow-sm space-y-2 flex flex-col justify-center min-h-[140px] md:min-h-[160px] hover:shadow-md transition-shadow">
              <span className="font-sans text-3xl md:text-4xl font-extrabold text-primary block">5K+</span>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Community Members</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Narrative Block */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-serif text-2xl md:text-3xl text-secondary font-medium leading-normal">
              Elevate every step, embrace every trail. Silence awaits—let's make it unforgettable.
            </h3>
            
            <div className="space-y-6 font-sans text-sm text-on-surface-variant font-light leading-relaxed">
              <p>
                At Avasaa, we believe that the mountains are not just a place to visit, but a sanctuary to return to. Founded by Vibhu Gosain, our stays were built with the sole philosophy of belonging to the Jibhi hillside rather than occupying it.
              </p>
              <p>
                Every log chalet, stone path, and organic farm meal has been carefully created to inspire slow, mindful living. We invite our guests to unplug, dissolve their schedules, and connect with the raw beauty of the pine forests and rushing Tirthan waters.
              </p>
              <p>
                Whether you're sipping warm spiced apple cider by our garden fire pit or trekking the ancient paths of the Jalori Pass, Avasaa provides a boutique mountain shelter designed specifically for peaceful minds.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/stay"
                className="inline-flex items-center gap-2 bg-primary hover:bg-[#3e5349] text-white px-8 py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-102 active:scale-98"
              >
                Explore Stays
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default About;
