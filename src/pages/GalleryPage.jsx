import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  ShieldCheck,
  Maximize2,
  X,
  BookOpen,
  GraduationCap,
  Award,
  Users,
  Sparkles
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const GALLERY_CATEGORIES = [
  'All',
  'Classroom Activities',
  'Teaching Sessions',
  'Institute Events',
  'Student Activities',
  'Celebrations and Achievements'
];

// Custom high-craft educational SVG placeholder generator for items without an uploaded photo yet
function PlaceholderIllustration({ category, title }) {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-full object-cover"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="600" height="400" fill="#09090B" />
      <circle cx="510" cy="80" r="120" fill="#8C702B" fillOpacity="0.55" />
      <circle cx="90" cy="340" r="140" fill="#D6B66B" fillOpacity="0.12" />
      <rect
        x="36"
        y="36"
        width="528"
        height="328"
        rx="20"
        fill="#18181B"
        stroke="#D6B66B"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <rect x="64" y="68" width="210" height="32" rx="8" fill="#8C702B" />
      <text
        x="80"
        y="89"
        fill="#D6B66B"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="bold"
        fontSize="12"
      >
        {category.toUpperCase()}
      </text>
      <text
        x="64"
        y="150"
        fill="#FFFFFF"
        fontFamily="Playfair Display, serif"
        fontWeight="bold"
        fontSize="24"
      >
        VEDANTA INSTITUTE
      </text>
      <text
        x="64"
        y="182"
        fill="#D6B66B"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="bold"
        fontSize="14"
      >
        Near Shiv Mandir Garhi, Udhampur (J&amp;K)
      </text>
      <line x1="64" y1="208" x2="536" y2="208" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="2" />
      <text
        x="64"
        y="246"
        fill="#FFFFFF"
        fillOpacity="0.85"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="14"
      >
        {title.slice(0, 56)}
      </text>
      <rect x="64" y="284" width="280" height="40" rx="10" fill="#D6B66B" fillOpacity="0.15" stroke="#D6B66B" strokeOpacity="0.5" />
      <text
        x="82"
        y="309"
        fill="#D6B66B"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="bold"
        fontSize="12"
      >
        Editable Photo Slot • Upload via Admin
      </text>
    </svg>
  );
}

export default function GalleryPage() {
  const { gallery } = useInstitute();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.title = 'Photo Gallery | VEDANTA INSTITUTE – Udhampur, J&K';
  }, []);

  const filteredGallery = gallery.filter(
    item =>
      activeCategory === 'All' ||
      item.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <section className="hero-mesh text-white py-16 border-b-4 border-[#D6B66B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6B66B] text-[#09090B] text-xs font-extrabold uppercase tracking-wider">
              Campus Life & Academic Moments
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
              Institute <span className="text-[#D6B66B]">Photo Gallery</span>
            </h1>
            <p className="text-white/85 text-base sm:text-lg max-w-2xl mt-3 leading-relaxed">
              Explore glimpses of Classroom Activities, Teaching Sessions, Institute Events, Student Activities, and Celebrations at Vedanta Institute.
            </p>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#D6B66B] border border-[#D6B66B]/40 text-xs font-bold shrink-0"
          >
            <Camera className="w-4 h-4" />
            Upload / Replace Photos in Admin
          </Link>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-[#09090B]/10 shadow-sm">
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#09090B] text-[#D6B66B] shadow-xs'
                  : 'bg-[#F9F5EB] text-[#09090B]/80 hover:bg-[#8C702B]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="card-elevated rounded-2xl bg-white overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#09090B] overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <PlaceholderIllustration category={item.category} title={item.title} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-xs font-bold text-white">Click to Enlarge</span>
                  <Maximize2 className="w-4 h-4 text-[#D6B66B]" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#8C702B]/10 text-[#8C702B] text-[11px] font-bold">
                    {item.category}
                  </span>
                  {item.is_placeholder && !item.image_url && (
                    <span className="text-[11px] font-semibold text-zinc-800 bg-[#F9F5EB] px-2 py-0.5 rounded">
                      Placeholder Slot
                    </span>
                  )}
                </div>
                <h2 className="font-serif-display text-lg font-bold text-[#09090B] group-hover:text-[#8C702B] transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-[#09090B]/75 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#09090B]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-[#09090B]">
              {selectedItem.image_url ? (
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <PlaceholderIllustration
                  category={selectedItem.category}
                  title={selectedItem.title}
                />
              )}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#09090B]/80 text-white hover:bg-[#8C702B] cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <span className="px-3 py-1 rounded-full bg-[#8C702B]/10 text-[#8C702B] text-xs font-bold">
                {selectedItem.category}
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#09090B] mt-2">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-[#09090B]/75 mt-2">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

