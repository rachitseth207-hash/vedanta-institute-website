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
  Sparkles,
  FileCheck2,
  Target,
  Lightbulb,
  HelpCircle,
  ChevronDown,
  Star,
  Home,
  Bell,
  Briefcase
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const quickHighlights = [
  {
    title: 'Expert Faculty',
    subtitle: 'Qualified B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil. & Ph.D. Educators',
    icon: GraduationCap,
    accent: 'bg-blue-50 text-[#1D4ED8] border-blue-200'
  },
  {
    title: 'Regular Tests',
    subtitle: 'Weekly OMR & Board-Pattern Assessments with Detailed Evaluation',
    icon: FileCheck2,
    accent: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    title: 'Personal Attention',
    subtitle: 'Focused Batch Sizes, Individual Mentoring & Doubt-Clearing Desks',
    icon: Users,
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    title: 'Updated Study Material',
    subtitle: 'Comprehensive Notes Aligned with JKBOSE, CBSE, UPSC, JKSSB & SSC',
    icon: BookOpen,
    accent: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
];

const whyChooseItems = [
  {
    title: 'Special Focus on Basic Concepts',
    description:
      'We build every subject from root fundamentals upward so students develop genuine conceptual mastery instead of rote memorization.',
    icon: Lightbulb
  },
  {
    title: 'Dual Board & Competitive Mastery',
    description:
      'Synchronized preparation for JKBOSE & CBSE board exams alongside JEE, NEET, NDA, CDS, JKSSB and SSC.',
    icon: Target
  },
  {
    title: 'Regular Practice Examinations',
    description:
      'Chapter-wise tests, unit evaluations, and full-length mock papers to build speed, accuracy, and exam confidence.',
    icon: FileCheck2
  },
  {
    title: 'Dedicated Doubt-Clearing Sessions',
    description:
      'Daily post-lecture doubt resolution and one-on-one mentoring so no student falls behind in any topic.',
    icon: HelpCircle
  },
  {
    title: 'Home Tuition Facility Available',
    description:
      'Alongside regular classroom batches at Garhi Udhampur, we provide personalized home tuition support.',
    icon: Home
  },
  {
    title: 'Supportive Learning Environment',
    description:
      'Disciplined, safe, and motivating academic atmosphere located near Shiv Mandir Garhi, Udhampur.',
    icon: Award
  }
];

const faqs = [
  {
    q: 'Which classes and boards are covered under School Education at Vedanta Institute?',
    a: 'We provide comprehensive coaching for Classes 5th, 6th, 7th, 8th, 9th, 10th, 11th and 12th across both JKBOSE and CBSE boards. For Classes 11th and 12th, coaching is available for All Streams (Science, Commerce, and Arts/Humanities).'
  },
  {
    q: 'What graduation and competitive exam courses do you offer?',
    a: 'For Graduation, we offer coaching for B.A. and B.Sc. Mathematics. For Competitive & Entrance Examinations, we prepare students for JEE, NEET, NDA, CDS, and other competitive tests. For Job-Oriented preparation, we run dedicated batches for JKSSB (All Examinations) and SSC (All Examinations).'
  },
  {
    q: 'Does Vedanta Institute provide Home Tuition facilities?',
    a: 'Yes! Along with our regular classroom batches at Near Shiv Mandir Garhi, Udhampur, we also offer a Home Tuition Facility for students requiring personalized one-on-one attention at home.'
  },
  {
    q: 'How are students evaluated during the course?',
    a: 'We conduct regular weekly and fortnightly tests (both subjective board-style and OMR objective tests for competitive batches), followed by detailed evaluation, performance tracking, and doubt-clearing sessions.'
  },
  {
    q: 'How can I check the fee structure or enrol in a batch?',
    a: 'You can view our Fee Structure page, submit an online Admission Enquiry form on this website, or contact Amit Singh directly at +91 7298329209 or +91 7006843738.'
  }
];

export default function HomePage() {
  const { settings, courses, testimonials, openEnquiryModal } = useInstitute();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    document.title = 'VEDANTA INSTITUTE | We Guide You to Achieve – Chase Excellence | Udhampur';
  }, []);

  const categories = [
    'All',
    'School Education',
    'Graduation Courses',
    'Competitive Examinations',
    'Job-Oriented Courses'
  ];

  const displayedCourses = courses
    .filter(c => (selectedCategory === 'All' ? c.popular || true : c.category === selectedCategory))
    .slice(0, 6);

  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section className="relative hero-mesh text-white overflow-hidden pt-10 pb-24 lg:pt-16 lg:pb-28 border-b-4 border-[#F59E0B]">
        {/* Subtle Academic Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#FFFFFF 1px, transparent 1px), radial-gradient(#F59E0B 1px, #0B2545 1px)',
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Core Institutional Pitch */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Badges */}
              <div className="inline-flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B] text-[#0B2545] text-xs font-extrabold uppercase tracking-wider shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#0B2545] animate-ping" />
                  Admissions Open
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {settings.tagline}
                </span>
              </div>

              {/* Required Hero Heading */}
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] text-white">
                Build Your Future With{' '}
                <span className="text-[#F59E0B] underline decoration-[#F59E0B]/40 underline-offset-8">
                  The Right Guidance
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
                <strong className="text-white">VEDANTA INSTITUTE</strong> is Udhampur’s trusted academic and competitive coaching institution. We combine qualified faculty, root-level conceptual clarity, updated study material, and regular testing to guide students toward top board and entrance results.
              </p>

              {/* Clickable Program Stream Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Link
                  to="/courses?category=School+Education"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-colors"
                >
                  Classes 5th–12th (JKBOSE & CBSE • All Streams)
                </Link>
                <Link
                  to="/courses?category=Graduation+Courses"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-colors"
                >
                  B.A. & B.Sc. Mathematics
                </Link>
                <Link
                  to="/courses?category=Competitive+Examinations"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-amber-300 transition-colors"
                >
                  JEE • NEET • NDA • CDS
                </Link>
                <Link
                  to="/courses?category=Job-Oriented+Courses"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-amber-300 transition-colors"
                >
                  JKSSB & SSC (All Exams)
                </Link>
              </div>

              {/* Two Primary Hero Buttons as Required */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0B2545] font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  type="button"
                  onClick={() => openEnquiryModal('', 'Admission')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-[#0B2545] hover:bg-blue-50 font-extrabold text-sm sm:text-base shadow-lg transition-all cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>

              {/* Verified Location & Direct Contact Strip */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2 font-mono-num">
                  <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <a href={`tel:+91${settings.phone_primary}`} className="hover:text-[#F59E0B] font-bold text-white">
                    +91 {settings.phone_primary}
                  </a>
                  <span>/</span>
                  <a href={`tel:+91${settings.phone_secondary}`} className="hover:text-[#F59E0B] font-bold text-white">
                    {settings.phone_secondary}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Official Institute Showcase & Academic Divisions Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white text-[#0B2545] p-4 sm:p-5 shadow-2xl border-2 border-white/80 space-y-4">
                {/* Classroom Visual Banner */}
                <div className="relative rounded-2xl overflow-hidden h-52 bg-[#0B2545]">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                    alt="Students studying at Vedanta Institute"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/45 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F59E0B] text-[#0B2545] text-[10px] font-extrabold uppercase w-fit mb-1">
                      Qualified Faculty Pool
                    </span>
                    <p className="font-serif-display text-base sm:text-lg font-bold leading-snug">
                      B.Ed. • M.Ed. • B.Sc. • M.Sc. • M.A. • M.Phil. • Ph.D.
                    </p>
                    <p className="text-xs text-blue-100">
                      Special Focus on Basic Concepts &amp; Home Tuition Facility
                    </p>
                  </div>
                </div>

                {/* 4 Academic Wings Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    to="/courses?category=School+Education"
                    className="p-3.5 rounded-xl bg-[#F1F5F9] hover:bg-blue-50 border border-slate-200 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                        School Wing
                      </span>
                      <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
                    </div>
                    <p className="text-sm font-extrabold text-[#0B2545] mt-1 group-hover:text-[#1D4ED8]">
                      Classes 5th to 12th
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium">
                      JKBOSE &amp; CBSE (All Streams)
                    </p>
                  </Link>

                  <Link
                    to="/courses?category=Graduation+Courses"
                    className="p-3.5 rounded-xl bg-[#F1F5F9] hover:bg-blue-50 border border-slate-200 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                        Degree Wing
                      </span>
                      <GraduationCap className="w-4 h-4 text-[#1D4ED8]" />
                    </div>
                    <p className="text-sm font-extrabold text-[#0B2545] mt-1 group-hover:text-[#1D4ED8]">
                      B.A. &amp; B.Sc. Maths
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium">
                      University Semester Coaching
                    </p>
                  </Link>

                  <Link
                    to="/courses?category=Competitive+Examinations"
                    className="p-3.5 rounded-xl bg-[#F1F5F9] hover:bg-blue-50 border border-slate-200 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                        Entrance Wing
                      </span>
                      <Award className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-sm font-extrabold text-[#0B2545] mt-1 group-hover:text-[#1D4ED8]">
                      JEE • NEET • NDA • CDS
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Engineering, Medical &amp; Defence
                    </p>
                  </Link>

                  <Link
                    to="/courses?category=Job-Oriented+Courses"
                    className="p-3.5 rounded-xl bg-[#F1F5F9] hover:bg-blue-50 border border-slate-200 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                        Career Wing
                      </span>
                      <Briefcase className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-sm font-extrabold text-[#0B2545] mt-1 group-hover:text-[#1D4ED8]">
                      JKSSB &amp; SSC Exams
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium">
                      All Govt. Job Examinations
                    </p>
                  </Link>
                </div>

                {/* Instant Admission Desk Footer inside Hero Card */}
                <div className="p-3.5 rounded-2xl bg-[#0B2545] text-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#F59E0B] text-[#0B2545] flex items-center justify-center shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        Counselling &amp; Batch Desk: {settings.contact_person}
                      </p>
                      <p className="text-[11px] text-blue-200">
                        Near Shiv Mandir Garhi, Udhampur
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEnquiryModal('', 'Admission')}
                    className="px-3.5 py-2 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0B2545] text-xs font-extrabold shrink-0 cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK HIGHLIGHTS RIBBON ================= */}
      <section className="relative z-20 -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="card-elevated rounded-2xl p-5 bg-white border-b-4 border-b-[#1D4ED8] flex items-start gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${item.accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif-display text-base font-bold text-[#0B2545]">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= INTRODUCTION TO VEDANTA INSTITUTE ================= */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
              Welcome to Vedanta Institute
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B2545] leading-tight">
              Empowering Students in Udhampur with Strong Academic Foundations
            </h2>
            <p className="text-slate-700 text-base leading-relaxed">
              Situated near <strong>Shiv Mandir Garhi, Udhampur (Jammu &amp; Kashmir)</strong>,{' '}
              <strong>Vedanta Institute</strong> is dedicated to its guiding motto:{' '}
              <em className="text-[#1D4ED8] font-semibold">“We Guide You to Achieve – Chase Excellence.”</em> We bridge the gap between school classroom learning and high-stakes competitive examinations.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether a student is building early academic habits in Class 5th, appearing for critical Class 10th &amp; 12th Board Examinations (JKBOSE / CBSE), pursuing B.A. or B.Sc. Mathematics, or preparing for national and state competitive exams like JEE, NEET, NDA, CDS, JKSSB, and SSC — our qualified educators provide structured guidance every step of the way.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Special Focus on Basic Concepts',
                'Regular Practice Examinations',
                'Doubt-Clearing & Personal Attention',
                'Home Tuition Facility Available'
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-[#0B2545]">
                  <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B2545] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-colors"
              >
                About Our Institute
                <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
              </Link>
              <Link
                to="/facilities"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#1D4ED8] text-[#0B2545] text-sm font-bold transition-colors"
              >
                Explore All 10 Facilities
              </Link>
            </div>
          </div>

          {/* Right Side: Institutional Credential Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
              <div className="bg-[#0B2545] text-white rounded-2xl p-6 border-l-4 border-[#F59E0B]">
                <p className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">
                  Our Guiding Motto
                </p>
                <blockquote className="font-serif-display text-xl sm:text-2xl font-bold mt-1">
                  “We Guide You to Achieve – Chase Excellence”
                </blockquote>
                <p className="text-xs text-blue-100 mt-2">
                  Every student learns differently. We combine conceptual teaching with regular tests and personal feedback.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200">
                  <span className="text-xs font-bold uppercase text-[#1D4ED8]">
                    Faculty Qualifications
                  </span>
                  <p className="font-serif-display text-lg font-bold text-[#0B2545] mt-1">
                    B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil. &amp; Ph.D.
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Experienced subject specialists dedicated to student growth.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200">
                  <span className="text-xs font-bold uppercase text-[#1D4ED8]">
                    Boards &amp; Streams
                  </span>
                  <p className="font-serif-display text-lg font-bold text-[#0B2545] mt-1">
                    JKBOSE &amp; CBSE
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Classes 5th–10th All Subjects &amp; 11th–12th All Streams + Graduation.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#1D4ED8] uppercase">
                    Direct Counselling Desk
                  </span>
                  <p className="text-sm font-bold text-[#0B2545] mt-0.5">
                    Contact Person: {settings.contact_person}
                  </p>
                  <p className="text-xs text-slate-600">{settings.address}</p>
                </div>
                <a
                  href={`tel:+91${settings.phone_primary}`}
                  className="px-4 py-2.5 rounded-xl bg-[#0B2545] text-white font-mono-num font-bold text-xs shrink-0 hover:bg-[#1D4ED8] transition-colors"
                >
                  Call +91 {settings.phone_primary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POPULAR COURSES SECTION ================= */}
      <section className="py-16 lg:py-20 bg-[#EFF6FF]/60 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
                Academic &amp; Competitive Programs
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B2545] mt-2">
                Courses Offered at Vedanta Institute
              </h2>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:text-[#0B2545]"
            >
              View All {courses.length} Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2545] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map(course => (
              <div
                key={course.id}
                className="card-elevated rounded-2xl p-6 flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] text-[11px] font-bold">
                      {course.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#0B2545] text-[#F59E0B] text-[11px] font-semibold">
                      {course.board}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-[#0B2545]">
                    {course.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#1D4ED8] mt-1">
                    Eligibility: {course.eligibility}
                  </p>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {course.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                    {(course.highlights || []).slice(0, 4).map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    to="/fees"
                    className="text-xs font-bold text-slate-600 hover:text-[#1D4ED8] transition-colors"
                  >
                    Fee Structure →
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(course.title, 'Admission')}
                    className="px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0B2545] font-bold text-xs transition-colors cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE VEDANTA INSTITUTE ================= */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
            The Vedanta Advantage
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B2545] mt-2">
            Why Choose Vedanta Institute?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            We combine structured classroom pedagogy with regular testing and personal mentorship so every student achieves their full academic potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="card-elevated rounded-2xl p-6 bg-white">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-xl font-bold text-[#0B2545]">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= STUDENT SUCCESS & ACHIEVEMENT METHODOLOGY ================= */}
      <section className="py-16 hero-mesh text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B] text-[#0B2545] text-xs font-extrabold uppercase tracking-wider">
                Student Success &amp; Achievement Framework
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                Our 4-Stage Academic Excellence System
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Success in board exams and competitive tests is built systematically. Our four-stage training cycle turns everyday classroom lessons into top exam scores.
              </p>
              <div className="pt-2">
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F59E0B] text-[#0B2545] font-extrabold text-sm hover:bg-amber-400 transition-colors"
                >
                  Enrol in a Batch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  step: '01',
                  title: 'Concept Foundation',
                  desc: 'Detailed topic explanation starting from basic definitions, derivations, and NCERT/Board core theory.'
                },
                {
                  step: '02',
                  title: 'Updated Study Material',
                  desc: 'Curated worksheets, previous-year board questions, and competitive MCQ drills for speed and accuracy.'
                },
                {
                  step: '03',
                  title: 'Regular Tests & Evaluation',
                  desc: 'Weekly chapter tests and cumulative OMR/Descriptive exams under timed conditions.'
                },
                {
                  step: '04',
                  title: 'Doubt Clearing & Personal Mentoring',
                  desc: 'Dedicated remedial classes and one-on-one doubt sessions to strengthen weak areas before final exams.'
                }
              ].map((st, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/10 border border-white/15 hover:border-[#F59E0B] transition-colors backdrop-blur-xs"
                >
                  <span className="font-mono-num text-2xl font-extrabold text-[#F59E0B]">
                    {st.step}
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-white mt-2">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1.5 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
                Student &amp; Parent Voices
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0B2545] mt-2">
                What Students &amp; Parents Say
              </h2>
            </div>
            <Link
              to="/admin"
              className="text-xs font-semibold text-[#1D4ED8] hover:underline"
            >
              Manage Testimonials in Admin →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(item => (
              <div
                key={item.id}
                className="card-elevated rounded-2xl p-6 bg-[#F8FAFC] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1D4ED8] text-[11px] font-bold">
                      {item.course_tag}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    “{item.content}”
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <p className="font-bold text-sm text-[#0B2545]">{item.author_name}</p>
                  <p className="text-xs text-slate-500">{item.author_role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPANDABLE FAQ SECTION ================= */}
      <section className="py-16 bg-[#F1F5F9] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#0B2545] mt-2">
              Common Questions About Admissions &amp; Batches
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0B2545] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1D4ED8] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION SECTION FOR ADMISSIONS ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl hero-mesh text-white p-8 sm:p-12 shadow-2xl border-2 border-[#F59E0B]/50 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B] text-[#0B2545] text-xs font-extrabold uppercase">
              Admissions Open
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white">
              Start Your Preparation with Vedanta Institute
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Visit our campus at <strong>{settings.address}</strong> or submit an online admission enquiry to discuss suitable batches with <strong>{settings.contact_person}</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal('', 'Admission')}
              className="px-7 py-4 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0B2545] font-extrabold text-sm shadow-lg cursor-pointer"
            >
              Enquire Now
            </button>
            <a
              href={`tel:+91${settings.phone_primary}`}
              className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-mono-num font-bold text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              +91 {settings.phone_primary}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
