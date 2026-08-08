import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.jpg';
import thumb1 from '../assets/thumb1.jpg';
import thumb2 from '../assets/thumb2.jpg';
import thumb3 from '../assets/thumb3.jpg';
import thumb4 from '../assets/thumb4.png';

function GuestSlider() {
  const baseImages = [thumb1, thumb2, thumb3, thumb4];
  // Duplicate images list to ensure a seamless infinite scrolling loop
  const images = [...baseImages, ...baseImages, ...baseImages];

  return (
    <div className="w-full overflow-hidden py-6 relative">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-256px * 4 - 16px * 4));
          }
        }
        @keyframes scroll-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-192px * 4 - 16px * 4));
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll-mobile 18s linear infinite;
          }
        }
      `}</style>
      
      <div className="animate-scroll gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-sm border border-[#dfd3cc]/40 hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
          >
            <img
              src={img}
              alt={`Guest Moment ${idx + 1}`}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#EFE6E1] min-h-screen pb-24">

      {/* Hero Header with image */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-stone-900 flex items-center justify-center mb-10 md:mb-12">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="About Us"
            className="w-full h-full object-cover opacity-60 scale-102"
          />
        </div>
      </div>

      {/* Main Narrative Block & Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-20">

        {/* Section 1: Our Story */}
        <div className="space-y-5 reveal max-w-4xl mx-auto">
          <div className="space-y-2">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#cca85a] block">
              Here's how it all started            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary italic font-light leading-tight">
              Avasaa means home.
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm md:text-base text-on-surface-variant font-light leading-relaxed">
            <p>
              Not just a place to stay, but a place where you can slow down, breathe a little deeper, and let go of the need to be somewhere else.
            </p>
            <p>
              When we first came to these mountains, we fell in love with the quiet. The mornings that began without alarms, the conversations that had nowhere to be, and the feeling that time had finally slowed down. We wanted more people to experience that feeling.
            </p>
            <p className="font-medium text-primary">
              That's how Avasaa came to life.
            </p>
            <p>
              Nestled in the village of Seri, we invite you to experience Avasaa. Slow mornings, hidden trails, quiet village walks, wholesome meals, cozy cafe and evenings spent over coffee with the mountains in sight.
            </p>
            <p>
              There isn't a checklist here. No pressure to see everything.
            </p>
            <p className="font-medium text-primary">
              Just space to pause, to reconnect, and to create memories that don't need a camera to be remembered.
            </p>
            <p className="italic text-secondary text-lg font-serif">
              When you leave, we hope you take a little piece of these mountains with you, just as they became a part of us.
            </p>
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#dfd3cc] to-transparent w-full"></div>

        {/* Section 2: Founder's Note */}
        <div className="space-y-5 reveal max-w-4xl mx-auto">
          <div className="space-y-2">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#cca85a] block">
              FOUNDER'S NOTE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary italic font-light leading-tight">
              From Our Hearts to Yours
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm md:text-base text-on-surface-variant font-light leading-relaxed">
            <p>
              We've spent years travelling, staying in different places, collecting stories from around the world. Along the way, we realised that the things we remembered most weren't the grandest ones. They were the ones that made us feel welcome. The ones that felt honest, personal, and real.
            </p>
            <p className="font-medium text-primary">
              That became the foundation of Avasaa.
            </p>
            <p>
              Every corner of this home has been created with the intention of offering the kind of stay we always searched for ourselves. A place where you're greeted like a guest, cared for like family, and encouraged to experience the mountains without rushing through them.
            </p>
            <p>
              If there's one thing we'd like to say, it's this.
            </p>
            <p className="font-serif text-xl text-primary italic font-light pl-6 border-l-2 border-primary/20 py-1">
              Come with an open heart.
            </p>
            <p>
              The mountains have a quiet way of giving you exactly what you didn't know you needed.
            </p>
            <p className="italic text-secondary text-lg font-serif">
              We hope you leave with far more than beautiful photographs. We hope you leave with a feeling that brings you back.
            </p>
          </div>
        </div>

      </div> {/* Close max-w-6xl wrapper */}

      {/* Section 3: Guest Image Slider */}
      <div className="space-y-6 reveal py-6 w-full mt-20">
        <div className="text-center space-y-2 max-w-5xl mx-auto px-6">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#cca85a] block">
            GUEST DIARIES
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-medium">
            Moments Capturing Stillness
          </h2>
          <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed max-w-md mx-auto">
            A look at how our guests spend their time, slow down, and soak in the beauty of Avaasa.
          </p>
        </div>
        <div className="w-full px-0">
          <GuestSlider />
        </div>
      </div>
    </div>
  );
}

export default About;
