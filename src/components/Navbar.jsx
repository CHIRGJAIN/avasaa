import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';

function Navbar() {
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
    { name: 'The Stay', path: '/stay' },
    { name: 'Our Story', path: '/about' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const pagesWithHero = ['/', '/stay', '/contact', '/about'];
  const hasHero = pagesWithHero.includes(location.pathname) || location.pathname.startsWith('/room/') || location.pathname.startsWith('/experience/');
  const activeScrolled = isScrolled || !hasHero;

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        activeScrolled
          ? 'bg-[#EFE6E1]/90 backdrop-blur-lg border-b border-[#dfd3cc] shadow-[0_2px_12px_rgba(0,0,0,0.03)] py-3 px-6 md:px-12'
          : 'bg-transparent py-5 px-6 md:px-12'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
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
          <Link
            to="/book"
            className={`px-5 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 shadow-sm scale-100 hover:scale-102 active:scale-98 ${
              activeScrolled
                ? 'bg-primary hover:bg-[#3e5349] text-white'
                : 'bg-white hover:bg-[#f5f2eb] text-primary'
            }`}
          >
            <span>Book Now</span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </Link>

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
