import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import Logo from './Logo';
import { useInstitute } from '../context/InstituteContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Fee Structure', path: '/fees' },
  { name: 'Facilities', path: '/facilities' },
  { name: 'Faculty', path: '/faculty' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const { settings, openEnquiryModal } = useInstitute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const admissionsOpen = settings.admissions_open !== 'false';

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Top Institutional Utility & Announcement Bar */}
      <div className="bg-[#09090B] text-[#FFFFFF] border-b border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Dynamic Homepage Announcement */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8C702B] text-[#D6B66B] font-semibold text-[11px] shrink-0">
              <Sparkles className="w-3 h-3" /> Notice
            </span>
            <p className="text-white/90 line-clamp-1 font-medium">
              {settings.announcement_banner}
            </p>
          </div>

          {/* Verified Contact Info & Admin Portal Link */}
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <span className="hidden xl:inline-flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#D6B66B]" />
              {settings.address}
            </span>
            <a
              href={`tel:+91${settings.phone_primary}`}
              className="inline-flex items-center gap-1.5 font-mono-num text-[#D6B66B] hover:underline font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 {settings.phone_primary}
            </a>
            {settings.phone_secondary && (
              <a
                href={`tel:+91${settings.phone_secondary}`}
                className="hidden sm:inline-flex items-center gap-1.5 font-mono-num text-white/90 hover:text-[#D6B66B] transition-colors"
              >
                / {settings.phone_secondary}
              </a>
            )}
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/90 transition-colors text-[11px] font-medium"
              title="Institute Owner Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6B66B]" />
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-md border-b border-[#09090B]/10 py-2.5'
            : 'bg-[#FFFFFF] border-b border-[#09090B]/10 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Vedanta Institute Home">
              <Logo />
            </Link>

            {/* Prominent Admissions Open Badge */}
            {admissionsOpen ? (
              <Link
                to="/admissions"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#09090B] text-[#D6B66B] border border-[#D6B66B]/50 text-xs font-bold tracking-wide shadow-sm hover:bg-[#8C702B] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#D6B66B] animate-pulse-gold" />
                Admissions Open
              </Link>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
                Enquiries Open
              </span>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#8C702B] text-[#FFFFFF] shadow-sm'
                      : 'text-[#09090B]/85 hover:text-[#8C702B] hover:bg-[#8C702B]/8'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal('', 'Admission')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D6B66B] hover:bg-[#D6B66B] text-[#09090B] font-bold text-xs xl:text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            {admissionsOpen && (
              <Link
                to="/admissions"
                className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-full bg-[#09090B] text-[#D6B66B] text-[10px] font-bold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B66B] animate-ping" />
                Admissions Open
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-[#F9F5EB] text-[#09090B] hover:bg-[#8C702B] hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#FFFFFF] border-t border-[#09090B]/10 shadow-xl px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#8C702B] text-white'
                        : 'bg-[#F9F5EB] text-[#09090B] hover:bg-[#8C702B]/10'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-2 border-t border-[#09090B]/10 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openEnquiryModal('', 'Admission');
                }}
                className="w-full py-3 rounded-xl bg-[#D6B66B] text-[#09090B] font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <GraduationCap className="w-4 h-4" />
                Enquire Now — Admissions Open
              </button>
              <a
                href={`tel:+91${settings.phone_primary}`}
                className="w-full py-3 rounded-xl bg-[#09090B] text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D6B66B]" />
                Call: +91 {settings.phone_primary}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

