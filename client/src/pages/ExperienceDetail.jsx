import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getExperienceById } from '../data/experiences';

function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getExperienceById(id)
      .then((data) => {
        setExperience(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#EFE6E1] min-h-screen flex items-center justify-center pt-24">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="bg-[#EFE6E1] min-h-screen flex flex-col items-center justify-center pt-24 px-6 space-y-6">
        <h2 className="font-serif text-2xl text-primary font-bold">Journal Entry Not Found</h2>
        <p className="font-sans text-sm text-gray-500">The journal details you are looking for do not exist.</p>
        <Link to="/journal" className="bg-primary text-white px-8 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#3e5349]">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#EFE6E1] min-h-screen pb-24">
      {/* Hero Section with Same Image */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-stone-900 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover opacity-60 scale-102"
          />
        </div>

        {/* Back Link overlay */}
        <div className="absolute top-28 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Link
              to="/journal"
              className="w-fit flex items-center gap-2 text-white/80 hover:text-white font-sans text-xs font-semibold uppercase tracking-wider transition-all bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Journal
            </Link>
          </div>
        </div>

        {/* Title Context Overlay */}
        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-left space-y-3">
            <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full inline-block shadow-sm">
              {experience.intensity} Intensity
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-white font-semibold leading-tight drop-shadow-md">
              {experience.title}
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/90 font-light italic leading-relaxed max-w-2xl drop-shadow-sm">
              {experience.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left main info */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl text-primary font-semibold">About this experience</h2>
            <p className="font-sans text-base text-gray-700 font-light leading-relaxed whitespace-pre-wrap">
              {experience.longDescription || experience.description}
            </p>
          </div>

          {/* Quick Specifications block */}
          <div className="grid grid-cols-3 gap-4 border-y border-[#dfd3cc]/60 py-6 font-sans">
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</span>
              <span className="block text-sm font-semibold text-primary mt-1">{experience.duration}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Intensity</span>
              <span className="block text-sm font-semibold text-primary mt-1">{experience.intensity}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timings</span>
              <span className="block text-sm font-semibold text-primary mt-1">{experience.timings}</span>
            </div>
          </div>
        </div>

        {/* Right inclusions box */}
        <div className="lg:col-span-4 bg-white border border-[#dfd3cc]/50 p-6 md:p-8 rounded-[24px] shadow-sm space-y-6">
          <h3 className="font-serif text-lg text-primary font-bold pb-2 border-b border-gray-100">What's included</h3>
          
          <ul className="space-y-4">
            {experience.inclusions?.map((inc, index) => (
              <li key={index} className="flex items-start gap-3 font-sans text-xs text-secondary leading-relaxed">
                <span className="material-symbols-outlined text-primary text-base flex-shrink-0 mt-0.5">check_circle</span>
                <span>{inc}</span>
              </li>
            ))}
          </ul>

          <Link to="/book" className="w-full bg-primary hover:bg-[#3e5349] text-white py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all">
            Book Stays
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ExperienceDetail;
