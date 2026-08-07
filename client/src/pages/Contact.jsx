import React, { useState, useEffect } from 'react';
import contactHeroImg from '../assets/contact_hero.jpg';

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Header with image */}
      <div className="relative w-full h-[65vh] md:h-[62vh] overflow-hidden bg-stone-900 flex items-center justify-center mb-16 md:mb-24">
        <div className="absolute inset-0 z-0">
          <img
            src={contactHeroImg}
            alt="Contact Us"
            className="w-full h-full object-cover opacity-60 scale-102"
          />
        </div>
        <div className="relative z-10 text-center space-y-3 px-6">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-white/80 block">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight drop-shadow-md">
            Contact Us
          </h1>
          <p className="font-sans text-sm md:text-base text-white/90 font-light leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            Have questions about stays, bookings, or planning your journey? We are here to help you slow down.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Details & Map */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl text-primary font-medium">Reservations & Inquiry</h2>
              <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed">
                Reach out to us directly to plan your bespoke stay in Jibhi. We typically reply within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Address</h4>
                  <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed mt-1">
                    Avasaa Café and Stay, Seri Rd, Jibhi, Tandi, Himachal Pradesh 175123
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined">phone</span>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Phone</h4>
                  <p className="font-sans text-sm text-on-surface-variant font-light mt-1">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-secondary">Email</h4>
                  <p className="font-sans text-sm text-on-surface-variant font-light mt-1">
                    reservations@avaasa.com
                  </p>
                </div>
              </div>
            </div>

            {/* Embed Mini Map */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-black/5 h-64">
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
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[32px] shadow-md border border-black/5">
            <h2 className="font-serif text-3xl text-primary font-medium mb-6">Send A Message</h2>
            
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex items-center gap-4">
                <span className="material-symbols-outlined text-emerald-600 text-3xl">check_circle</span>
                <div>
                  <h4 className="font-sans font-bold text-sm">Thank you for your message!</h4>
                  <p className="font-sans text-xs mt-1">Our team will get back to you as soon as possible.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-background border border-black/5 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Phone Number</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-background border border-black/5 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your Phone Number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-background border border-black/5 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-sans text-xs font-bold uppercase tracking-wider text-on-surface-variant">Message</label>
                  <textarea
                    required
                    rows="5"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-background border border-black/5 rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="How can we help you plan your journey?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-[#3e5349] text-white py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:scale-102 active:scale-98 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
