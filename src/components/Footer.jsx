import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  UserCheck,
  Clock,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';
import { useInstitute } from '../context/InstituteContext';

export default function Footer() {
  const { settings, openEnquiryModal } = useInstitute();

  return (
    <footer className="bg-[#09090B] text-[#FFFFFF] border-t-4 border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Logo light size="lg" />
            <p className="text-sm text-white/80 leading-relaxed">
              Vedanta Institute is a premier educational and competitive coaching center in Udhampur, Jammu & Kashmir, committed to strong conceptual foundations, personal attention, and result-oriented preparation.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <a
                href={`https://wa.me/${settings.whatsapp_number || '917298329209'}?text=${encodeURIComponent(
                  'Hello Vedanta Institute, I would like to enquire about admissions and courses.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Enquiry
              </a>
              <button
                type="button"
                onClick={() => openEnquiryModal('', 'Admission')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E4E4E7] hover:bg-[#E4E4E7] text-[#09090B] text-xs font-bold transition-colors cursor-pointer"
              >
                Admission Form
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Configurable Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-wider text-white/50 font-semibold mb-2">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={settings.facebook_url || '#contact'}
                  target={settings.facebook_url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  title={settings.facebook_url ? 'Facebook' : 'Facebook (Configure link in Admin Settings)'}
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#27272A] flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href={settings.instagram_url || '#contact'}
                  target={settings.instagram_url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  title={settings.instagram_url ? 'Instagram' : 'Instagram (Configure link in Admin Settings)'}
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#27272A] flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href={settings.youtube_url || '#contact'}
                  target={settings.youtube_url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  title={settings.youtube_url ? 'YouTube' : 'YouTube (Configure link in Admin Settings)'}
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#27272A] flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#E4E4E7]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/" className="hover:text-[#E4E4E7] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#E4E4E7] transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-[#E4E4E7] transition-colors">Courses Offered</Link></li>
              <li><Link to="/fees" className="hover:text-[#E4E4E7] transition-colors">Fee Structure</Link></li>
              <li><Link to="/facilities" className="hover:text-[#E4E4E7] transition-colors">Facilities</Link></li>
              <li><Link to="/faculty" className="hover:text-[#E4E4E7] transition-colors">Our Faculty</Link></li>
              <li><Link to="/gallery" className="hover:text-[#E4E4E7] transition-colors">Photo Gallery</Link></li>
              <li><Link to="/admissions" className="hover:text-[#E4E4E7] transition-colors">Admissions / Enquiry</Link></li>
              <li><Link to="/contact" className="hover:text-[#E4E4E7] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Academic Programs */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#E4E4E7]">
              Programs & Batches
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/courses?category=School+Education" className="hover:text-[#E4E4E7] transition-colors">
                  Classes 5th to 10th (JKBOSE & CBSE)
                </Link>
              </li>
              <li>
                <Link to="/courses?category=School+Education" className="hover:text-[#E4E4E7] transition-colors">
                  Classes 11th & 12th (All Streams)
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Graduation+Courses" className="hover:text-[#E4E4E7] transition-colors">
                  B.A. & B.Sc. Mathematics
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Competitive+Examinations" className="hover:text-[#E4E4E7] transition-colors">
                  JEE & NEET Entrance Coaching
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Competitive+Examinations" className="hover:text-[#E4E4E7] transition-colors">
                  NDA & CDS Defence Coaching
                </Link>
              </li>
              <li>
                <Link to="/courses?category=Job-Oriented+Courses" className="hover:text-[#E4E4E7] transition-colors">
                  JKSSB & SSC (All Examinations)
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-[#E4E4E7] transition-colors">
                  Home Tuition Facility Available
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact Details */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#E4E4E7]">
              Contact Details
            </h3>
            <div className="space-y-3 text-sm text-white/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E4E4E7] shrink-0 mt-1" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#E4E4E7] shrink-0" />
                <span>
                  Contact Person: <strong className="text-white">{settings.contact_person}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#E4E4E7] shrink-0 mt-1" />
                <div className="flex flex-col font-mono-num">
                  <a href={`tel:+91${settings.phone_primary}`} className="hover:text-[#E4E4E7] font-semibold">
                    +91 {settings.phone_primary}
                  </a>
                  {settings.phone_secondary && (
                    <a href={`tel:+91${settings.phone_secondary}`} className="hover:text-[#E4E4E7] font-semibold">
                      +91 {settings.phone_secondary}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E4E4E7] shrink-0" />
                <span className="text-xs text-white/75">{settings.office_hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">VEDANTA INSTITUTE</strong>, Near Shiv Mandir Garhi, Udhampur (J&K). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/fees" className="hover:text-[#E4E4E7] transition-colors">
              Fee Structure
            </Link>
            <Link to="/admissions" className="hover:text-[#E4E4E7] transition-colors">
              Admission Enquiry
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-[#E4E4E7] hover:underline font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
