import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../data/rooms';
import stayHero from '../assets/stay_hero.jpg';
import bonfireIllustration from '../assets/bonfire_illustration.png';
import chefIllustration from '../assets/chef_illustration.png';
import trailIllustration from '../assets/trail_illustration.png';

function RoomCard({ room, isEven }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideImages = room.images || [room.image];

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % slideImages.length);
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-[#34463e] text-white w-full overflow-hidden">
      {/* Slider Column */}
      <div className={`relative h-80 md:h-auto min-h-[360px] md:min-h-[550px] overflow-hidden group ${
        isEven ? 'md:order-1' : 'md:order-2'
      }`}>
        {/* Slides */}
        {slideImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={img}
              alt={`${room.name} view ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        {slideImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-black/80 hover:text-black z-20 transition-all shadow"
              aria-label="Previous slide"
            >
              <span className="material-symbols-outlined font-bold">chevron_left</span>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-black/80 hover:text-black z-20 transition-all shadow"
              aria-label="Next slide"
            >
              <span className="material-symbols-outlined font-bold">chevron_right</span>
            </button>
          </>
        )}

        {/* Dots Indicators */}
        {slideImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slideImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === slideIndex ? 'bg-white w-4' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Column */}
      <div className={`p-8 md:p-12 lg:p-20 flex flex-col justify-center space-y-6 bg-[#34463e] ${
        isEven ? 'md:order-2' : 'md:order-1'
      }`}>
        <div className="space-y-1">
          <h2 className="font-serif text-3xl md:text-5xl text-white font-medium">{room.name}</h2>
          {room.occupancy && (
            <p className="font-serif text-xl md:text-3xl text-white/90 italic font-light">
              {room.occupancy}
            </p>
          )}
        </div>

        <p className="font-sans text-sm md:text-base text-white/75 font-light leading-relaxed">
          {room.description}
        </p>

        {/* Amenities List - 2 columns with dashes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 font-sans text-sm text-white/70 font-light pt-2">
          {room.amenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-white/40">-</span>
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-white/10">
          <span className="font-sans text-2xl md:text-3xl text-white font-light tracking-wide">
            {room.priceLabel || `${room.priceInr.toLocaleString('en-IN')}/N`}
          </span>
        </div>

        <div>
          <Link
            to={`/book?roomId=${room.id}`}
            className="inline-block border border-white/20 hover:border-white text-white bg-transparent hover:bg-white hover:text-[#34463e] py-4 px-10 font-sans text-xs font-bold uppercase tracking-widest text-center transition-all duration-300 w-fit"
          >
            INQUIRE TO BOOK
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stay() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRooms()
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching rooms:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Header */}
      <header className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center scale-105" 
            style={{ backgroundImage: `url(${stayHero})` }}
          ></div>
          <div className="absolute inset-0 bg-black/35"></div>
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-3xl reveal">
          <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight font-semibold">Our Sanctuaries</h1>
          <p className="font-sans text-base md:text-lg text-white/90 font-light italic leading-relaxed">
            A collection of thoughtfully crafted spaces designed for the art of slow living. Discover a refuge where the grandeur of the Himalayas meets the warmth of modern alpine comfort.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white mb-2">Explore Stays</span>
          <span className="material-symbols-outlined text-white">expand_more</span>
        </div>
      </header>

      {/* Section Heading */}
      <section className="py-20 md:py-28 bg-[#f7f5f0] text-center px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#516C60]">
            Where You'll Stay
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] font-medium leading-tight">
            Rooms Crafted for<br className="hidden md:block" /> <span className="italic font-light">Stillness</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-[#555] font-light leading-relaxed max-w-xl mx-auto">
            Each room at Avasaa is a quiet invitation to slow down — designed with warmth, wood, and the mountain air in mind.
          </p>
        </div>
      </section>

      {/* Main content listing rooms */}
      <main className="pt-0 pb-12">
        {loading ? (
          /* Premium Skeleton Loader */
          <div className="space-y-24 max-w-5xl mx-auto px-6">
            {[1, 2].map((n) => (
              <div key={n} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-pulse">
                <div className="lg:col-span-7 bg-surface-container-high rounded-3xl aspect-[4/3]"></div>
                <div className="lg:col-span-5 space-y-6">
                  <div className="h-4 bg-surface-container-high rounded w-1/4"></div>
                  <div className="h-10 bg-surface-container-high rounded w-3/4"></div>
                  <div className="h-20 bg-surface-container-high rounded"></div>
                  <div className="h-8 bg-surface-container-high rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full space-y-0">
            {rooms.map((room, idx) => (
              <RoomCard key={room.id} room={room} isEven={idx % 2 === 0} />
            ))}
          </div>
        )}
      </main>

      {/* Stay Experience Section */}
      <section className="bg-surface-container-low rounded-[40px] px-6 py-24 max-w-7xl mx-auto mb-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary block">
            Beyond Your Room
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium">The Avaasa Experience</h2>
          <p className="font-sans text-lg text-on-surface-variant font-light leading-relaxed italic">
            Your sanctuary extends beyond your walls. We invite you to wander our organic gardens, share stories by the communal bonfire, and find your rhythm on our hidden nature trails.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
            <div className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
              <img src={bonfireIllustration} alt="Bonfire Circle" className="h-16 w-auto mb-4 object-contain mix-blend-multiply" />
              <h4 className="font-serif text-lg text-primary mb-2">Bonfire Circle</h4>
              <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
                Gather nightly under the stars for local folk tales and artisanal warm drinks.
              </p>
            </div>
            <div className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
              <img src={chefIllustration} alt="Farm-to-Table" className="h-16 w-auto mb-4 object-contain mix-blend-multiply" />
              <h4 className="font-serif text-lg text-primary mb-2">Farm-to-Table</h4>
              <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
                Taste Himachali home-cooked dishes sourced from local farms and organic soils.
              </p>
            </div>
            <div className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
              <img src={trailIllustration} alt="Private Trails" className="h-16 w-auto mb-4 object-contain" />
              <h4 className="font-serif text-lg text-primary mb-2">Private Trails</h4>
              <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
                Embark on self-guided morning hikes through dense pine forests bordering our estate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Stay;
