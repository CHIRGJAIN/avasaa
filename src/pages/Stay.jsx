import React, { useState, useEffect } from 'react';
import { getRooms } from '../data/rooms';

function Stay({ onBookRoom }) {
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
      <header className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVU3Evafa6HQxh-v_Q2Wrm1BWGWMLyCQeTC3aY1pAXF7KQx4aGrDmOOpoLpzKx-sBQefcJfy6bP8Cz7jweCkYo9rbeWXMhy8zDq19LEyEZNHAp8CVfdVWV_AuQ6OhJ5KWLOPv0YCVfUNwQR0GkvhdTvrqPL8xMXhFIS3Yhb4_mpITiVlVkPAYhoBAMebiWtkZzYBwTYfrD3Q91hkeG5iFPqQHZwzFLKANelG4ceImF12sqRtWfEc3b')" }}
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

      {/* Main content listing rooms */}
      <main className="max-w-7xl mx-auto px-6 py-24">
        {loading ? (
          /* Premium Skeleton Loader */
          <div className="space-y-24 max-w-5xl mx-auto">
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
          <div className="space-y-24 max-w-6xl mx-auto">
            {rooms.map((room, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <section 
                  key={room.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-7 group overflow-hidden rounded-3xl shadow-lg ${
                    isEven ? '' : 'lg:order-2'
                  }`}>
                    <div 
                      className="aspect-[4/3] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${room.image}')` }}
                    ></div>
                  </div>

                  {/* Info Column */}
                  <div className={`lg:col-span-5 flex flex-col justify-center space-y-6 ${
                    isEven ? 'lg:pl-12' : 'lg:pr-12 lg:order-1'
                  }`}>
                    <span className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary block">
                      {room.type}
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary font-semibold">{room.name}</h2>
                    <p className="font-sans text-sm font-semibold text-on-surface-variant/80">{room.occupancy}</p>
                    <p className="font-sans text-base text-on-surface-variant font-light leading-relaxed">
                      {room.description}
                    </p>

                    {/* Amenities list */}
                    <div className="grid grid-cols-2 gap-y-4 py-6 border-t border-outline-variant/40">
                      {room.amenities.map((amenity, amIdx) => (
                        <div key={amIdx} className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">
                            {room.icons ? room.icons[amIdx] : 'check_circle'}
                          </span>
                          <span className="font-sans text-xs text-on-surface">{amenity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-baseline gap-2 py-2">
                      <span className="font-serif text-2xl font-bold text-primary">₹{room.priceInr.toLocaleString('en-IN')}</span>
                      <span className="font-sans text-xs text-on-surface-variant font-light">/ night</span>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button 
                        onClick={() => onBookRoom(room.id)}
                        className="bg-primary text-on-primary px-8 py-3 rounded-2xl font-sans text-xs font-semibold uppercase tracking-widest hover:bg-[#4C6548] transition-colors shadow-md scale-100 hover:scale-105 active:scale-95 duration-200"
                      >
                        Book This Room
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
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
              <span className="material-symbols-outlined text-primary text-4xl mb-4">local_fire_department</span>
              <h4 className="font-serif text-lg text-primary mb-2">Bonfire Circle</h4>
              <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
                Gather nightly under the stars for local folk tales and artisanal warm drinks.
              </p>
            </div>
            <div className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">restaurant</span>
              <h4 className="font-serif text-lg text-primary mb-2">Farm-to-Table</h4>
              <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
                Taste Himachali home-cooked dishes sourced from local farms and organic soils.
              </p>
            </div>
            <div className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">tour</span>
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
