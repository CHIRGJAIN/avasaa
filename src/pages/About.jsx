import React, { useEffect } from 'react';
import snowyPines from '../assets/snowy_pines.jpg';
import thumb2 from '../assets/thumb2.jpg';
import heroImg from '../assets/hero.jpg';

function About({ onBookRoom }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background">
      {/* Editorial Header Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-stone-900 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Avasaa Stays Cottages in Jibhi"
            className="w-full h-full object-cover opacity-35 scale-102 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-[#cca85a] block mb-3 animate-fade-in">
            Discover Our Philosophy
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-medium tracking-tight">
            Our Story & Heritage
          </h1>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: The Owner & Vision */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#cca85a] block">
                The Host
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-medium">
                Vibhu Gosain
              </h2>
              <p className="font-serif text-lg text-secondary italic border-l-2 border-secondary/40 pl-5 font-light leading-relaxed">
                "We did not build Avasaa to occupy the hillside, but to belong to it. It is a slow refuge carved carefully for silent minds."
              </p>
            </div>

            {/* Owner Image / Illustration Block */}
            <div className="relative group rounded-3xl overflow-hidden shadow-xl border border-outline-variant/20 bg-stone-100 aspect-square w-full">
              <img
                src={snowyPines}
                alt="Snowy Himalayan pines framing the valley"
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface/95 backdrop-blur-md border border-outline-variant/25 rounded-2xl p-5 shadow-lg">
                <h4 className="font-serif text-base font-semibold text-primary">Founder's Note</h4>
                <p className="font-sans text-xs text-on-surface-variant font-light mt-1.5 leading-relaxed">
                  Growing up, Jibhi's silent woods were my sanctuary. Guided by a desire to preserve this peace, Avasaa Stays was created.
                </p>
              </div>
            </div>

            {/* Owner Description Detail */}
            <div className="space-y-4 font-sans text-sm text-on-surface-variant font-light leading-relaxed">
              <p>
                As a passionate explorer of the Himalayas, Vibhu Gosain set out to build more than just standard rooms. His vision was a retreat where city-dwellers could completely dissolve their schedules, slow down, and rest.
              </p>
              <p>
                Hospitality at Avasaa Stays is curated, highly personalized, and centered around deep silence, organic valley foods, and warm wood fireplaces.
              </p>
            </div>
          </div>

          {/* Right Column: The Property & Craftsmanship */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#cca85a] block">
                The Property
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-primary font-medium">
                A Mountain Sanctuary in Jibhi
              </h2>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] bg-stone-100 group">
              <img
                src={thumb2}
                alt="Detailed wood craftsmanship inside log cabin"
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Detailed Property Copy */}
            <div className="space-y-6 font-sans text-sm text-on-surface-variant font-light leading-relaxed">
              <p>
                Built organically on Jibhi's hillside forest, Avasaa Stays blends into its surrounding environment. The log cottages are crafted using locally sourced cedar pinewood and hand-chosen river stones, echoing traditional Himachali architectural styles.
              </p>
              <p>
                Every sanctuary features large glass windows that frame changing valley mists, towering deodars, and morning sunrises over snow-capped peaks. Inside, you'll find custom hand-polished log walls, soft linen seating, cozy stone fireplaces, and spacious private wooden decks.
              </p>
              <p>
                Located just a short walk away from the whispering Tirthan river streams, the property offers guests immediate access to ancient forest walks, riverside yoga decks, and custom bonfire nights under bright mountain stars.
              </p>
            </div>

            {/* Key Philosophies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-outline-variant/30">
              <div className="space-y-2">
                <h4 className="font-serif text-base italic text-primary font-semibold">Silence</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Displaced from roads, Jibhi's rustling leaves and river murmurs are your only soundtrack.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-base italic text-primary font-semibold">Craftsmanship</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Carved from cedar log cabins and local river stones to preserve classic mountain design.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-base italic text-primary font-semibold">Comfort</h4>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Warm fireplaces, organic mountain tea, and premium linens for cozy alpine nights.
                </p>
              </div>
            </div>

            {/* Call to Action Booking trigger */}
            <div className="pt-8 flex justify-start">
              <button
                onClick={() => onBookRoom()}
                className="bg-primary text-on-primary px-10 py-4 rounded-full font-sans text-xs font-semibold uppercase tracking-widest hover:bg-[#4C6548] transition-all transform hover:scale-105 active:scale-95 shadow-md"
              >
                Reserve Your Escape
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default About;
