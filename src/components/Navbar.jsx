import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

function Navbar({ onBookClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Stay', path: '/stay' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    // { name: 'Experiences', path: '/#experiences', hash: true },
    // { name: 'Gallery', path: '/#gallery', hash: true },
    { name: 'Contact', path: '/#contact', hash: true },
  ];

  const pagesWithHero = ['/', '/about'];
  const hasHero = pagesWithHero.includes(location.pathname) || location.pathname.startsWith('/room/');
  const activeScrolled = isScrolled || !hasHero;

  return (
    <nav className="fixed w-full top-0 z-50 px-4 md:px-8 pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto w-full rounded-2xl md:rounded-full transition-all duration-300 flex justify-between items-center ${
          activeScrolled
            ? 'bg-white/30 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border border-white/20 py-2 md:py-3 px-6 md:px-10'
            : 'bg-transparent shadow-none border border-transparent py-4 px-6 md:px-10'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center font-serif transition-colors ${activeScrolled ? 'text-primary' : 'text-white'}`}
        >
          <img
            src={logoImg}
            alt="Avaasa Logo"
            className={`h-14 md:h-20 w-auto -my-2 md:-my-4 object-contain transition-all duration-300 ${
              activeScrolled ? '' : 'brightness-0 invert'
            }`}
          />
        </Link>

        {/* Desktop Nav (Center) */}
        <div className="hidden md:flex justify-center items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return link.hash ? (
              <a
                key={link.name}
                href={link.path}
                className={`font-sans text-xs font-semibold uppercase tracking-wider px-4 py-2 transition-colors ${
                  activeScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-xs font-semibold uppercase tracking-wider transition-all px-4 py-2 ${
                  isActive
                    ? activeScrolled
                      ? 'bg-primary/10 text-primary rounded-full'
                      : 'bg-white/20 text-white rounded-full'
                    : activeScrolled
                      ? 'text-on-surface-variant hover:text-primary'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onBookClick}
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 shadow-sm scale-100 hover:scale-102 active:scale-98 ${
              activeScrolled
                ? 'bg-primary hover:bg-[#12281a] text-white'
                : 'bg-white hover:bg-[#f5f2eb] text-primary'
            }`}
          >
            <span>Book Now</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 flex items-center justify-center focus:outline-none"
          >
            <span className={`material-symbols-outlined text-3xl transition-colors duration-300 ${activeScrolled ? 'text-primary' : 'text-white'}`}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[calc(100%+8px)] left-4 right-4 bg-white border border-outline-variant/30 rounded-2xl shadow-lg py-5 px-6 flex flex-col space-y-3 animate-fade-in z-50">
          {navLinks.map((link) => (
            link.hash ? (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-sm font-semibold uppercase tracking-widest text-on-surface-variant hover:text-primary py-2 border-b border-gray-100 last:border-0"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-sans text-sm font-semibold uppercase tracking-widest py-2 border-b border-gray-100 last:border-0 ${
                  location.pathname === link.path ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
