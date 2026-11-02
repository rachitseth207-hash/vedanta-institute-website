import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

export default function FloatingActions() {
  const { settings } = useInstitute();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappHref = `https://wa.me/${settings.whatsapp_number || '917298329209'}?text=${encodeURIComponent(
    'Hello Vedanta Institute (Garhi, Udhampur), I would like to enquire about courses and admission details.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="w-11 h-11 rounded-full bg-[#0B2545] text-[#F59E0B] border border-[#F59E0B]/40 shadow-lg hover:bg-[#1D4ED8] hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Direct Call Floating Button */}
      <a
        href={`tel:+91${settings.phone_primary}`}
        aria-label={`Call Vedanta Institute at +91 ${settings.phone_primary}`}
        title={`Call +91 ${settings.phone_primary}`}
        className="w-12 h-12 rounded-full bg-[#1D4ED8] hover:bg-[#0B2545] text-white border-2 border-[#FFFFFF] shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        <Phone className="w-5 h-5 text-[#F59E0B]" />
      </a>

      {/* WhatsApp Floating Contact Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Enquire on WhatsApp"
        className="group flex items-center gap-2 pl-3.5 pr-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl border-2 border-white transition-all hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-white/20" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
}

