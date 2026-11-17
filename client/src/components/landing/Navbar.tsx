import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../hooks/useLenis';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  logoImage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ logoImage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'products', 'why-choose-us', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'why-choose-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#D9E8FF] py-3.5'
          : 'bg-white/80 backdrop-blur-xs py-5 border-b border-[#D9E8FF]/60'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex items-center justify-between">

          {/* Brand Logo & Studio Tag */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            {logoImage ? (
              <img src={logoImage} alt="2K MAKER Logo" className="h-9 w-auto object-contain" />
            ) : (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#223176] to-[#0A42A1] flex items-center justify-center text-white shadow-md shadow-[#0A42A1]/20 group-hover:scale-105 transition-transform">
                <span className="font-black text-xs tracking-tighter">2K</span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-[#223176] group-hover:text-[#0A42A1] transition-colors leading-none">
                  2K MAKER
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Đang nhận đơn in 3D" />
              </div>
              <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-[#0A42A1] block mt-0.5">
                3D PRINTING STUDIO
              </span>
            </div>
          </button>

          {/* Desktop Navigation – Studio Freight style with spacing & active indicator */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-200 relative py-1 ${
                  activeSection === link.id ? 'text-[#0A42A1]' : 'text-[#223176]/70 hover:text-[#0A42A1]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#0A42A1] transition-all duration-300 ${
                    activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D9E8FF] text-[#223176] hover:text-[#0A42A1] hover:border-[#0A42A1] bg-[#EEF4FF]/50 hover:bg-[#EEF4FF] transition-all flex items-center gap-1.5"
              title="Cổng quản trị Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0A42A1]" />
              <span>Admin</span>
            </Link>

            <button
              onClick={() => scrollToSection('contact')}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A42A1] hover:bg-[#083582] text-white text-xs font-bold tracking-wider uppercase shadow-md shadow-[#0A42A1]/20 hover:shadow-[#0A42A1]/35 transition-all active:scale-95"
            >
              <span>Tư Vấn In 3D</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/admin"
              className="p-2 rounded-lg text-[#223176] hover:text-[#0A42A1] bg-[#EEF4FF]"
              title="Admin"
            >
              <ShieldCheck className="w-4 h-4 text-[#0A42A1]" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col gap-1.5 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-0.5 bg-[#223176] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-4 h-0.5 bg-[#0A42A1] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#223176] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-[#D9E8FF] px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => { scrollToSection(link.id); setMobileMenuOpen(false); }}
                className="px-3 py-2.5 text-left font-bold text-[#223176] hover:text-[#0A42A1] rounded-xl hover:bg-[#EEF4FF] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-slate-400 font-mono">0{i + 1}</span>
              </button>
            ))}
            <div className="pt-3 border-t border-[#D9E8FF] flex flex-col gap-2 mt-2">
              <button
                onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl bg-[#0A42A1] text-white font-bold text-xs uppercase tracking-wider text-center shadow-md shadow-[#0A42A1]/20"
              >
                Tư Vấn In 3D Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
