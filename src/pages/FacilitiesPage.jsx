import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Lightbulb,
  FileCheck2,
  BookOpen,
  BarChart3,
  Users,
  HelpCircle,
  Target,
  Home,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Phone
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const facilitiesList = [
  {
    number: '01',
    title: 'Expert and Qualified Teachers',
    tag: 'B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil. & Ph.D.',
    description:
      'Our academic team comprises highly qualified educators who bring deep subject mastery and structured classroom pedagogy to every lecture.',
    points: [
      'Subject-wise specialists for Science, Maths, Humanities & Commerce',
      'Dedicated faculty for competitive exams (JEE, NEET, NDA, CDS, JKSSB, SSC)',
      'Approachable mentors focused on student comprehension'
    ],
    icon: GraduationCap
  },
  {
    number: '02',
    title: 'Special Focus on Basic Concepts',
    tag: 'Root-Level Conceptual Clarity',
    description:
      'We never rush through chapters. Special foundational modules ensure students thoroughly understand definitions, formulas, derivations, and grammar rules.',
    points: [
      'Step-by-step concept building from zero level',
      'Eliminates fear of Mathematics, Physics, Chemistry & English',
      'Bridges learning gaps from previous classes'
    ],
    icon: Lightbulb
  },
  {
    number: '03',
    title: 'Regular Practice Examinations',
    tag: 'Board & Competitive Simulation',
    description:
      'Frequent practice examinations familiarize students with actual exam patterns, time constraints, and question variations.',
    points: [
      'JKBOSE & CBSE pattern descriptive practice papers',
      'OMR-based objective tests for NEET, JEE, NDA, CDS, JKSSB & SSC',
      'Builds examination stamina and time management'
    ],
    icon: FileCheck2
  },
  {
    number: '04',
    title: 'Updated Study Material',
    tag: 'Curated Notes & Practice Banks',
    description:
      'Students receive well-structured, updated study material aligned with the latest syllabus revisions and competitive exam trends.',
    points: [
      'Chapter-wise summary notes & formula sheets',
      'Graded assignment sheets (Level 1, Level 2 & Previous Year Questions)',
      'Current affairs & J&K specific modules for JKSSB/SSC'
    ],
    icon: BookOpen
  },
  {
    number: '05',
    title: 'Regular Tests and Evaluation',
    tag: 'Continuous Performance Tracking',
    description:
      'Every test is followed by systematic evaluation and error analysis so students and parents can monitor real academic improvement.',
    points: [
      'Weekly topic tests and monthly cumulative assessments',
      'Detailed answer-sheet checking with presentation tips',
      'Regular progress updates shared with parents/guardians'
    ],
    icon: BarChart3
  },
  {
    number: '06',
    title: 'Personal Attention to Students',
    tag: 'Individualized Mentorship',
    description:
      'We maintain disciplined, manageable batches so teachers can observe each student’s notebook, class participation, and learning pace.',
    points: [
      'Individual focus on both slow learners and high achievers',
      'Customized study schedules during exam season',
      'Direct mentorship under institutional supervision'
    ],
    icon: Users
  },
  {
    number: '07',
    title: 'Doubt-Clearing Sessions',
    tag: 'Zero Unresolved Questions',
    description:
      'Dedicated doubt-clearing counters and post-class sessions allow students to ask questions freely without hesitation.',
    points: [
      'One-on-one doubt resolution with subject faculty',
      'Revision classes for complex numericals and derivations',
      'Support for school homework and NCERT exercises'
    ],
    icon: HelpCircle
  },
  {
    number: '08',
    title: 'Exam-Oriented Preparation',
    tag: 'High-Scoring Strategy',
    description:
      'Targeted preparation focused on board marking schemes, high-weightage chapters, and shortcut techniques for competitive exams.',
    points: [
      'Previous 10-year board & competitive paper discussions',
      'Answer-writing workshops for maximum marks in JKBOSE & CBSE',
      'Speed-calculation & elimination strategies for MCQs'
    ],
    icon: Target
  },
  {
    number: '09',
    title: 'Home Tuition Facility',
    tag: 'Personalized Learning at Home',
    description:
      'In addition to our regular institute batches at Garhi Udhampur, Vedanta Institute coordinates qualified home tutors for students needing one-on-one coaching at home.',
    points: [
      'Verified and qualified tutors across classes and subjects',
      'Flexible timing tailored to the student’s schedule',
      'Ideal for focused individual support'
    ],
    icon: Home
  },
  {
    number: '10',
    title: 'Supportive Learning Environment',
    tag: 'Disciplined & Motivating Campus',
    description:
      'Located near Shiv Mandir Garhi, Udhampur, our institute provides a peaceful, safe, and inspiring academic atmosphere.',
    points: [
      'Positive peer group focused on academic achievement',
      'Accessible location in Garhi, Udhampur',
      'Encouraging faculty who motivate students to chase excellence'
    ],
    icon: Sparkles
  }
];

export default function FacilitiesPage() {
  const { settings, openEnquiryModal } = useInstitute();

  useEffect(() => {
    document.title = 'Facilities & Student Support | VEDANTA INSTITUTE – Udhampur, J&K';
  }, []);

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <section className="hero-mesh text-white py-16 border-b-4 border-[#F59E0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F59E0B] text-[#0B2545] text-xs font-extrabold uppercase tracking-wider">
            Student-Centric Infrastructure & Pedagogy
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
            Our <span className="text-[#F59E0B]">Facilities & Learning Ecosystem</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
            At Vedanta Institute, we provide a complete academic support system — combining qualified teachers, updated study materials, regular evaluations, doubt-clearing sessions, and home tuition facilities.
          </p>
        </div>
      </section>

      {/* 10 Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilitiesList.map(fac => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.number}
                className="card-elevated rounded-2xl bg-white overflow-hidden flex flex-col justify-between"
              >
                {/* Card Top Visual Accent Header */}
                <div className="bg-gradient-to-r from-[#0B2545] to-[#1D4ED8] px-6 py-4 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#0B2545] flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B]">
                        {fac.tag}
                      </span>
                      <h2 className="font-serif-display text-lg sm:text-xl font-bold text-white">
                        {fac.title}
                      </h2>
                    </div>
                  </div>
                  <span className="font-mono-num text-2xl font-extrabold text-white/25">
                    {fac.number}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-[#0B2545]/80 leading-relaxed">
                    {fac.description}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#0B2545]/10">
                    {fac.points.map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#0B2545]/85"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Special Highlight Banner: Home Tuition Facility */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="rounded-3xl bg-[#F1F5F9] border-2 border-[#1D4ED8]/25 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4ED8] text-white text-xs font-bold uppercase">
              Special Facility
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
              Looking for Personalized Home Tuition in Udhampur?
            </h3>
            <p className="text-sm sm:text-base text-[#0B2545]/80 leading-relaxed">
              Vedanta Institute provides a dedicated <strong>Home Tuition Facility</strong> across Udhampur for students who prefer one-on-one instruction at home alongside our regular institute batches at Near Shiv Mandir Garhi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal('Home Tuition Facility', 'Home Tuition')}
              className="px-6 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#F59E0B] text-[#0B2545] font-extrabold text-sm flex items-center gap-2 shadow-sm cursor-pointer"
            >
              Book Home Tuition Enquiry
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:+91${settings.phone_primary}`}
              className="px-5 py-3.5 rounded-xl bg-[#0B2545] text-white font-mono-num font-bold text-sm flex items-center gap-2"
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

