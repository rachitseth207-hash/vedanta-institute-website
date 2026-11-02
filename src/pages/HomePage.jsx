import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone,
  MapPin,
  FileCheck2,
  Target,
  Lightbulb,
  HelpCircle,
  ChevronDown,
  Star,
  Home
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const quickHighlights = [
  {
    title: 'Expert Faculty',
    subtitle: 'B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil. & Ph.D. Educators',
    icon: GraduationCap
  },
  {
    title: 'Regular Tests',
    subtitle: 'Weekly OMR & Subjective Assessments with Feedback',
    icon: FileCheck2
  },
  {
    title: 'Personal Attention',
    subtitle: 'Focused Batch Sizes & Daily Doubt-Clearing Sessions',
    icon: Users
  },
  {
    title: 'Updated Study Material',
    subtitle: 'Structured Notes for JKBOSE, CBSE & Competitive Exams',
    icon: BookOpen
  }
];

const whyChooseItems = [
  {
    title: 'Special Focus on Basic Concepts',
    description:
      'Every subject is taught from foundational principles upward so students build lasting conceptual clarity.',
    icon: Lightbulb
  },
  {
    title: 'Board & Competitive Alignment',
    description:
      'Integrated coaching for JKBOSE & CBSE board exams alongside JEE, NEET, NDA, CDS, JKSSB and SSC.',
    icon: Target
  },
  {
    title: 'Regular Practice Examinations',
    description:
      'Chapter-wise tests and full-length mock papers to build speed, accuracy, and exam confidence.',
    icon: FileCheck2
  },
  {
    title: 'Doubt-Clearing Sessions',
    description:
      'Dedicated post-class doubt resolution and individual mentoring for every learner.',
    icon: HelpCircle
  },
  {
    title: 'Home Tuition Facility',
    description:
      'Personalized home tuition support available across Udhampur alongside classroom batches.',
    icon: Home
  },
  {
    title: 'Supportive Learning Environment',
    description:
      'A disciplined, calm, and student-focused academic campus near Shiv Mandir Garhi, Udhampur.',
    icon: Award
  }
];

const faqs = [
  {
    q: 'Which classes and boards are covered under School Education?',
    a: 'We offer coaching for Classes 5th to 12th across both JKBOSE and CBSE boards. For Classes 11th and 12th, all streams (Science, Commerce, and Arts/Humanities) are covered.'
  },
  {
    q: 'What graduation and competitive exam courses are available?',
    a: 'We provide graduation coaching for B.A. and B.Sc. Mathematics, competitive entrance coaching for JEE, NEET, NDA, and CDS, and job-oriented batches for JKSSB and SSC examinations.'
  },
  {
    q: 'Is a Home Tuition facility available?',
    a: 'Yes, along with regular classroom batches at Near Shiv Mandir Garhi, Udhampur, we provide personalized Home Tuition support.'
  },
  {
    q: 'How can I enquire about fees and batch timings?',
    a: 'You can view the Fee Structure page, submit an online Admission Enquiry form, or call Amit Singh directly at +91 7298329209 or +91 7006843738.'
  }
];

export default function HomePage() {
  const { settings, courses, testimonials, openEnquiryModal } = useInstitute();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    document.title =
      'VEDANTA INSTITUTE – OFFICIAL EDUCATIONAL WEBSITE | We Guide You to Achieve – Chase Excellence';
  }, []);

  const categories = [
    'All',
    'School Education',
    'Graduation Courses',
    'Competitive Examinations',
    'Job-Oriented Courses'
  ];

  const displayedCourses = courses
    .filter(c => (selectedCategory === 'All' ? true : c.category === selectedCategory))
    .slice(0, 6);

  return (
    <div className="bg-white">
      {/* ================= CLEAN MINIMALIST HERO SECTION ================= */}
      <section className="bg-[#FAF8F5] border-b border-gray-200/80 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D6B66B] text-xs font-semibold text-[#111827]">
                <span className="w-2 h-2 rounded-full bg-[#D6B66B]" />
                Admissions Open • {settings.tagline}
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#111827] leading-[1.15]">
                Build Your Future With The Right Guidance
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Welcome to <strong className="text-[#111827]">Vedanta Institute</strong>, Udhampur. We provide structured, concept-driven coaching for{' '}
                <strong className="text-[#111827]">Classes 5th to 12th (JKBOSE &amp; CBSE)</strong>,{' '}
                <strong className="text-[#111827]">B.A. &amp; B.Sc. Mathematics</strong>, and competitive examinations including{' '}
                <strong className="text-[#111827]">JEE, NEET, NDA, CDS, JKSSB &amp; SSC</strong>.
              </p>

              {/* Two Clean Hero Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#111827] hover:bg-gray-800 text-white font-semibold text-sm transition-colors"
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4 text-[#D6B66B]" />
                </Link>
                <button
                  type="button"
                  onClick={() => openEnquiryModal('', 'Admission')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D6B66B] hover:bg-[#C4A255] text-[#111827] font-semibold text-sm transition-colors cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>

              {/* Clean Location & Phone Row */}
              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B89748]" />
                  {settings.address}
                </span>
                <a
                  href={`tel:+91${settings.phone_primary}`}
                  className="inline-flex items-center gap-1.5 font-mono-num font-semibold text-[#111827] hover:underline"
                >
                  <Phone className="w-4 h-4 text-[#B89748]" />
                  +91 {settings.phone_primary} / {settings.phone_secondary}
                </a>
              </div>
            </div>

            {/* Right Column: Clean Framed Image & Program Summary */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white p-4 border border-gray-200 shadow-xs space-y-4">
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                    alt="Classroom learning at Vedanta Institute"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg bg-[#F9FAFB] border border-gray-200/80">
                    <span className="text-[11px] font-semibold text-[#8C702B] uppercase">
                      School Wing
                    </span>
                    <p className="text-sm font-bold text-[#111827] mt-0.5">Classes 5th–12th</p>
                    <p className="text-xs text-gray-500">JKBOSE &amp; CBSE • All Streams</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F9FAFB] border border-gray-200/80">
                    <span className="text-[11px] font-semibold text-[#8C702B] uppercase">
                      Graduation
                    </span>
                    <p className="text-sm font-bold text-[#111827] mt-0.5">B.A. &amp; B.Sc. Maths</p>
                    <p className="text-xs text-gray-500">Semester Coaching</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F9FAFB] border border-gray-200/80">
                    <span className="text-[11px] font-semibold text-[#8C702B] uppercase">
                      Competitive
                    </span>
                    <p className="text-sm font-bold text-[#111827] mt-0.5">JEE • NEET • NDA • CDS</p>
                    <p className="text-xs text-gray-500">Entrance Preparation</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F9FAFB] border border-gray-200/80">
                    <span className="text-[11px] font-semibold text-[#8C702B] uppercase">
                      Job-Oriented
                    </span>
                    <p className="text-sm font-bold text-[#111827] mt-0.5">JKSSB &amp; SSC</p>
                    <p className="text-xs text-gray-500">All Examinations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Quick Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-10 border-t border-gray-200/80">
            {quickHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-gray-200/80"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F9F5EB] text-[#8C702B] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#111827]">{item.title}</h2>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ABOUT INTRODUCTION SECTION ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C702B]">
              About Vedanta Institute
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#111827]">
              Conceptual Clarity &amp; Personal Attention for Every Student
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Located near <strong>Shiv Mandir Garhi, Udhampur</strong>, Vedanta Institute is built on the belief that strong fundamentals create confident achievers. Our qualified faculty members hold <strong>B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil., and Ph.D.</strong> degrees.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {[
                'Special Focus on Basic Concepts',
                'Regular Practice Examinations',
                'Dedicated Doubt-Clearing Sessions',
                'Home Tuition Facility Available'
              ].map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#B89748] shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] hover:text-[#8C702B]"
              >
                Learn more about our teaching philosophy
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-gray-200">
              <span className="text-xs font-semibold uppercase text-[#8C702B]">Faculty Pool</span>
              <p className="font-serif-display text-xl font-bold text-[#111827] mt-1">
                Qualified Educators
              </p>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil. &amp; Ph.D. specialists across Science, Mathematics, Humanities, and Competitive wings.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#F9FAFB] border border-gray-200">
              <span className="text-xs font-semibold uppercase text-[#8C702B]">Boards Covered</span>
              <p className="font-serif-display text-xl font-bold text-[#111827] mt-1">
                JKBOSE &amp; CBSE
              </p>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Complete syllabus coverage for Classes 5th to 10th and all streams in Classes 11th &amp; 12th.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#111827] text-white sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#D6B66B] uppercase">
                  Direct Admission Desk
                </span>
                <p className="text-base font-bold mt-0.5">
                  Contact Person: {settings.contact_person}
                </p>
                <p className="text-xs text-gray-400">{settings.address}</p>
              </div>
              <a
                href={`tel:+91${settings.phone_primary}`}
                className="px-4 py-2.5 rounded-lg bg-[#D6B66B] text-[#111827] font-mono-num font-semibold text-xs shrink-0"
              >
                Call +91 {settings.phone_primary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POPULAR COURSES SECTION ================= */}
      <section className="py-20 bg-[#F9FAFB] border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C702B]">
                Academic Programs
              </span>
              <h2 className="font-serif-display text-3xl font-bold text-[#111827] mt-1">
                Courses Offered
              </h2>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111827] hover:text-[#8C702B]"
            >
              View All {courses.length} Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Clean Category Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#111827] text-white'
                    : 'bg-white text-gray-600 hover:text-[#111827] border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map(course => (
              <div
                key={course.id}
                className="card-elevated rounded-xl p-6 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-[#8C702B] uppercase tracking-wide">
                      {course.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 text-[11px] font-medium">
                      {course.board}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-[#111827]">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Eligibility: {course.eligibility}
                  </p>
                  <p className="text-sm text-gray-600 mt-2.5 leading-relaxed">
                    {course.description}
                  </p>

                  <ul className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                    {(course.highlights || []).slice(0, 3).map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B89748] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to="/fees"
                    className="text-xs font-medium text-gray-500 hover:text-[#111827]"
                  >
                    Fee Structure
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(course.title, 'Admission')}
                    className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-gray-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE VEDANTA INSTITUTE ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C702B]">
            Why Choose Us
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-[#111827] mt-1">
            A Focused Academic Environment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-xl bg-white border border-gray-200/90">
                <div className="w-10 h-10 rounded-lg bg-[#F9F5EB] text-[#8C702B] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#111827]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-20 bg-[#F9FAFB] border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8C702B]">
              Feedback
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#111827] mt-1">
              Student &amp; Parent Perspectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(item => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-white border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D6B66B] mb-3">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D6B66B]" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    “{item.content}”
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="font-bold text-sm text-[#111827]">{item.author_name}</p>
                  <p className="text-xs text-gray-500">{item.author_role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C702B]">
            FAQ
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-[#111827] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="w-full text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#111827] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CLEAN CALL TO ACTION ================= */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#111827] text-white p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">
              Ready to Enrol at Vedanta Institute?
            </h2>
            <p className="text-sm text-gray-300">
              Visit us at {settings.address} or speak with {settings.contact_person} for batch timings and admission guidance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal('', 'Admission')}
              className="px-6 py-3 rounded-lg bg-[#D6B66B] hover:bg-[#C4A255] text-[#111827] font-semibold text-sm cursor-pointer"
            >
              Enquire Now
            </button>
            <a
              href={`tel:+91${settings.phone_primary}`}
              className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono-num text-sm font-medium"
            >
              +91 {settings.phone_primary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
