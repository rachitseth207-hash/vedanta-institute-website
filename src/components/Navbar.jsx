import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import { useInstitute } from '../context/InstituteContext';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Fees', path: '/fees' },
  { name: 'Facilities', path: '/facilities' },
  { name: 'Faculty', path: '/faculty' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const { settings, openEnquiryModal } = useInstitute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const admissionsOpen = settings.admissions_open !== 'false';

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      {/* Minimal Top Contact Bar */}
      <div className="bg-[#F9FAFB] text-gray-600 border-b border-gray-200/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#B89748] shrink-0" />
            <span className="truncate">{settings.address}</span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={`tel:+91${settings.phone_primary}`}
              className="inline-flex items-center gap-1.5 font-mono-num text-gray-800 hover:text-black font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#B89748]" />
              +91 {settings.phone_primary}
            </a>
            {settings.phone_secondary && (
              <a
                href={`tel:+91${settings.phone_secondary}`}
                className="hidden sm:inline font-mono-num text-gray-500 hover:text-black"
              >
                / {settings.phone_secondary}
              </a>
            )}
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89748]" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Clean White Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Vedanta Institute Home">
              <Logo />
            </Link>
            {admissionsOpen && (
              <Link
                to="/admissions"
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F9F5EB] border border-[#D6B66B]/50 text-[#111827] text-[11px] font-semibold"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Admissions Open
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#111827] text-white'
                      : 'text-gray-600 hover:text-[#111827] hover:bg-gray-100/80'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal('', 'Admission')}
              className="px-4 py-2 rounded-lg bg-[#D6B66B] hover:bg-[#C4A255] text-[#111827] font-semibold text-sm transition-colors cursor-pointer"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-[#111827] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openEnquiryModal('', 'Admission');
                }}
                className="w-full py-2.5 rounded-lg bg-[#D6B66B] text-[#111827] font-semibold text-sm"
              >
                Enquire Now
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
