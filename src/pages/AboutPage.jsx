import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  BookOpen,
  Lightbulb,
  Users,
  Award,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  Compass,
  FileCheck2
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

export default function AboutPage() {
  const { settings, openEnquiryModal } = useInstitute();

  useEffect(() => {
    document.title = 'About Us | VEDANTA INSTITUTE – Udhampur, J&K';
  }, []);

  const qualificationsList = [
    { code: 'B.Ed. & M.Ed.', desc: 'Certified Pedagogical & Classroom Teaching Methodology Specialists' },
    { code: 'B.Sc. & M.Sc.', desc: 'Subject Matter Experts in Mathematics, Physics, Chemistry & Biology' },
    { code: 'M.A.', desc: 'Postgraduate Educators in Humanities, English & Social Sciences' },
    { code: 'M.Phil. & Ph.D.', desc: 'Research-Backed Academic Mentors for Higher & Competitive Studies' }
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="hero-mesh text-white py-16 lg:py-20 border-b-4 border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E4E4E7] text-[#09090B] text-xs font-extrabold uppercase tracking-wider">
            About Our Institution
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
            We Guide You to Achieve – <span className="text-[#E4E4E7]">Chase Excellence</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-3xl mt-4 leading-relaxed">
            Discover the educational vision, teaching philosophy, and unwavering commitment to conceptual clarity that define <strong>Vedanta Institute</strong> in Udhampur, Jammu & Kashmir.
          </p>
        </div>
      </section>

      {/* 1. Introduction to Vedanta Institute */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#27272A]">
              Who We Are
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#09090B]">
              An Institution Built on Strong Fundamentals & Personal Mentorship
            </h2>
            <p className="text-[#09090B]/80 text-base leading-relaxed">
              <strong>VEDANTA INSTITUTE</strong>, situated at <strong>{settings.address}</strong>, is a comprehensive tuition and competitive coaching institute dedicated to nurturing academic excellence across school, graduation, and career-oriented examinations.
            </p>
            <p className="text-[#09090B]/80 text-base leading-relaxed">
              We recognize that every student has unique learning needs. Some require patient rebuilding of foundational concepts in Mathematics and Science during middle school, while others seek rigorous problem-solving speed for JEE, NEET, NDA, CDS, JKSSB, or SSC examinations. Our structured programs cater to learners from <strong>Class 5th to Class 12th (JKBOSE & CBSE – All Streams)</strong>, undergraduate students in <strong>B.A. and B.Sc. Mathematics</strong>, and competitive exam aspirants.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10">
                <p className="font-serif-display text-2xl font-extrabold text-[#27272A]">5th–12th</p>
                <p className="text-xs font-semibold text-[#09090B]/75 mt-1">JKBOSE & CBSE Coaching</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10">
                <p className="font-serif-display text-2xl font-extrabold text-[#27272A]">B.A. / B.Sc.</p>
                <p className="text-xs font-semibold text-[#09090B]/75 mt-1">Graduation Coaching</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10 col-span-2 sm:col-span-1">
                <p className="font-serif-display text-2xl font-extrabold text-[#27272A]">Competitive</p>
                <p className="text-xs font-semibold text-[#09090B]/75 mt-1">JEE, NEET, NDA, CDS, JKSSB, SSC</p>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="card-elevated rounded-2xl p-6 bg-[#09090B] text-white border-l-4 border-l-[#E4E4E7]">
              <div className="w-11 h-11 rounded-xl bg-[#E4E4E7] text-[#09090B] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#E4E4E7]">
                Our Vision
              </h3>
              <p className="text-sm text-white/85 mt-2 leading-relaxed">
                To be the most trusted and result-oriented educational institution in Udhampur and Jammu & Kashmir — empowering students from every background to master core concepts, excel in board and university examinations, and succeed in competitive careers.
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-6 bg-white border-l-4 border-l-[#27272A]">
              <div className="w-11 h-11 rounded-xl bg-[#27272A] text-white flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#09090B]">
                Our Mission
              </h3>
              <p className="text-sm text-[#09090B]/80 mt-2 leading-relaxed">
                To replace rote learning with deep conceptual understanding through qualified faculty, updated study material, regular practice tests, dedicated doubt-clearing sessions, and personal attention to every student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Teaching Philosophy, Conceptual Clarity & Student Development */}
      <section className="py-16 bg-[#F4F4F5] border-y border-[#09090B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#27272A]">
              Our Pedagogical Pillars
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#09090B] mt-2">
              Teaching Philosophy & Commitment to Student Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-elevated rounded-2xl p-7 bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#09090B] text-[#E4E4E7] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#09090B]">
                Our Teaching Philosophy
              </h3>
              <p className="text-sm text-[#09090B]/75 mt-2.5 leading-relaxed">
                We believe teaching is mentorship, not merely completing a syllabus. Our teachers pace lectures so every student grasps the “why” behind every theorem, grammar rule, scientific law, and historical concept before moving to advanced applications.
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-7 bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#27272A] text-white flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#09090B]">
                Conceptual Clarity & Strong Fundamentals
              </h3>
              <p className="text-sm text-[#09090B]/75 mt-2.5 leading-relaxed">
                Special focus on basic concepts is the hallmark of Vedanta Institute. When fundamentals in Mathematics, Science, Humanities, and Aptitude are crystal clear, students can tackle both descriptive board questions and tricky objective MCQs effortlessly.
              </p>
            </div>

            <div className="card-elevated rounded-2xl p-7 bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#09090B] text-[#E4E4E7] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-xl font-bold text-[#09090B]">
                Holistic Student Development
              </h3>
              <p className="text-sm text-[#09090B]/75 mt-2.5 leading-relaxed">
                Beyond syllabus coverage, we cultivate discipline, time management, answer presentation skills, and exam temperament through regular evaluations, constructive feedback, and a supportive learning environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Elegant Section: "Why Vedanta Institute?" */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#09090B] text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4E4E7] text-[#09090B] text-xs font-extrabold uppercase tracking-wider">
              Distinction & Trust
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-white mt-3">
              Why Vedanta Institute?
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-2 leading-relaxed">
              Ten reasons why students and parents across Udhampur trust Vedanta Institute for academic and competitive preparation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {[
              {
                title: '1. Expert & Qualified Teachers',
                desc: 'Educators holding B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil., and Ph.D. degrees.'
              },
              {
                title: '2. Special Focus on Basic Concepts',
                desc: 'Dedicated foundation-building so students overcome subject fear permanently.'
              },
              {
                title: '3. Regular Practice Examinations',
                desc: 'Simulated board and competitive exams to build speed, accuracy, and confidence.'
              },
              {
                title: '4. Updated Study Material',
                desc: 'Curated notes, topic-wise assignments, and question banks aligned with current syllabi.'
              },
              {
                title: '5. Regular Tests & Evaluation',
                desc: 'Continuous assessment with transparent performance tracking for students and parents.'
              },
              {
                title: '6. Personal Attention to Students',
                desc: 'Manageable batch sizes where teachers know every student’s strengths and improvement areas.'
              },
              {
                title: '7. Dedicated Doubt-Clearing Sessions',
                desc: 'Regular interactive sessions where students can ask questions without hesitation.'
              },
              {
                title: '8. Exam-Oriented Preparation',
                desc: 'Strategic focus on marking schemes, previous year papers, and high-weightage topics.'
              },
              {
                title: '9. Home Tuition Facility Available',
                desc: 'Flexible home tuition support for learners needing personalized one-on-one coaching.'
              },
              {
                title: '10. Supportive Learning Environment',
                desc: 'Safe, disciplined, and motivating academic atmosphere near Shiv Mandir Garhi, Udhampur.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/6 border border-white/15 flex items-start gap-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E4E4E7] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Professional Faculty Introduction */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#F4F4F5] border border-[#09090B]/10 p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#27272A]">
                Academic Leadership
              </span>
              <h2 className="font-serif-display text-3xl font-bold text-[#09090B] mt-1">
                Qualified Teaching Professionals
              </h2>
              <p className="text-sm text-[#09090B]/75 mt-2 max-w-2xl">
                Our academic wing brings together educators with strong university and professional teaching credentials:
              </p>
            </div>
            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#27272A] hover:bg-[#09090B] text-white text-sm font-bold transition-colors shrink-0"
            >
              View Faculty Profiles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualificationsList.map((q, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-[#09090B]/10">
                <div className="w-10 h-10 rounded-lg bg-[#09090B] text-[#E4E4E7] flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-[#09090B]">{q.code}</h3>
                <p className="text-xs text-[#09090B]/70 mt-1 leading-relaxed">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

