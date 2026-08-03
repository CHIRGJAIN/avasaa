import React from 'react';
import logoImg from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-primary text-on-primary mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-12 py-16 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Avaasa Logo" className="h-16 md:h-20 w-auto object-contain brightness-0 invert" />
            <h2 className="font-serif text-2xl md:text-3xl">Avasaa Stays</h2>
          </div>
          <p className="opacity-70 font-sans text-sm leading-relaxed">
            Handcrafted luxury retreats in the heart of the Himalayas. Experience the silence.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 opacity-80 text-primary-fixed">
            Reservations
          </h4>
          <ul className="space-y-4 opacity-70 text-sm font-sans">
            <li>
              <a href="/stay" className="hover:text-tertiary-fixed transition-colors">
                Stay Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-tertiary-fixed transition-colors">
                Booking Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-tertiary-fixed transition-colors">
                Special Offers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-tertiary-fixed transition-colors">
                Group Stays
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 opacity-80 text-primary-fixed">
            Company
          </h4>
          <ul className="space-y-4 opacity-70 text-sm font-sans">
            <li>
              <a href="#" className="hover:text-tertiary-fixed transition-colors">
                Sustainability
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-tertiary-fixed transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 opacity-80 text-primary-fixed">
            Contact
          </h4>
          <ul className="space-y-4 opacity-70 text-sm font-sans">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">location_on</span>
              <span>Jibhi, Himachal Pradesh, India</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>reservations@avaasa.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">phone</span>
              <span>+91 98765 43210</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-8 px-6 text-center opacity-50 font-sans text-[10px] tracking-widest uppercase">
        © 2024 Avasaa Stays. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
