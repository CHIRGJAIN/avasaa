import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { experiencesData } from '../data/experiences';

function Journal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-secondary block">
            Read Our Stories
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-primary font-medium leading-tight">
            Mountain Journal
          </h1>
          <p className="font-sans text-base text-on-surface-variant font-light leading-relaxed">
            A collection of moments, stories, and activities from our little corner of the Himalayas.
          </p>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent w-32 mx-auto mt-6"></div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiencesData.map((exp) => (
            <Link 
              key={exp.id} 
              to={`/journal/${exp.id}`}
              className="bg-white rounded-[32px] overflow-hidden shadow-md border border-black/5 flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={exp.image}
                  alt={exp.title}
                />
              </div>

              <div className="p-8 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#cca85a]">
                    Duration: {exp.duration}
                  </span>
                  <h3 className="font-serif text-2xl text-primary font-medium group-hover:text-[#cca85a] transition-colors">{exp.title}</h3>
                  <p className="font-sans text-xs font-semibold text-secondary italic">{exp.subtitle}</p>
                  <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed pt-2">
                    {exp.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Journal;
