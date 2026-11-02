import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  BookOpen,
  ShieldCheck,
  UserCheck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const QUALIFICATION_BADGES = [
  { degree: 'B.Ed.', full: 'Bachelor of Education' },
  { degree: 'M.Ed.', full: 'Master of Education' },
  { degree: 'B.Sc.', full: 'Bachelor of Science' },
  { degree: 'M.Sc.', full: 'Master of Science' },
  { degree: 'M.A.', full: 'Master of Arts' },
  { degree: 'M.Phil.', full: 'Master of Philosophy' },
  { degree: 'Ph.D.', full: 'Doctor of Philosophy' }
];

export default function FacultyPage() {
  const { faculty, settings } = useInstitute();

  useEffect(() => {
    document.title = 'Our Faculty | VEDANTA INSTITUTE – Qualified Educators (B.Ed., M.Ed., M.Sc., M.A., M.Phil., Ph.D.)';
  }, []);

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <section className="hero-mesh text-white py-16 border-b-4 border-[#F59E0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F59E0B] text-[#0B2545] text-xs font-extrabold uppercase tracking-wider">
            Academic Mentors & Subject Specialists
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
            Qualified <span className="text-[#F59E0B]">Teaching Professionals</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
            At Vedanta Institute, students are mentored by dedicated, qualified educators holding{' '}
            <strong className="text-[#F59E0B]">
              {settings.available_qualifications || 'B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil. and Ph.D.'}
            </strong>{' '}
            qualifications across Science, Mathematics, Humanities, and Competitive Exam divisions.
          </p>
        </div>
      </section>

      {/* Institute Qualifications Showcase Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-2xl bg-white p-6 shadow-xl border border-[#0B2545]/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#0B2545]/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Verified Institutional Academic Credentials
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#0B2545] mt-0.5">
                Qualifications Available at Vedanta Institute
              </h2>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F1F5F9] hover:bg-[#1D4ED8] hover:text-white text-[#0B2545] text-xs font-bold transition-colors shrink-0"
            >
              <ShieldCheck className="w-4 h-4 text-[#1D4ED8] group-hover:text-white" />
              Manage Faculty Profiles in Admin
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-5">
            {QUALIFICATION_BADGES.map(item => (
              <div
                key={item.degree}
                className="p-3.5 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/10 text-center hover:border-[#1D4ED8] transition-colors"
              >
                <span className="font-serif-display text-xl font-extrabold text-[#0B2545] block">
                  {item.degree}
                </span>
                <span className="text-[11px] font-medium text-[#0B2545]/70 block mt-0.5">
                  {item.full}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editable Faculty Profiles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold uppercase tracking-wider">
              Departmental Faculty Roster
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#0B2545] mt-2">
              Faculty Profiles & Academic Wings
            </h2>
            <p className="text-sm text-[#0B2545]/75 mt-1">
              Individual faculty names, photographs, and specific designations can be added or updated anytime by the institute administrator.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faculty.map(member => (
            <div
              key={member.id}
              className="card-elevated rounded-2xl p-6 bg-white flex flex-col sm:flex-row items-start gap-5"
            >
              {/* Avatar or Uploaded Photograph */}
              <div className="w-24 h-24 rounded-2xl bg-[#0B2545] border-2 border-[#F59E0B] flex items-center justify-center shrink-0 overflow-hidden shadow-md">
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2">
                    <GraduationCap className="w-9 h-9 text-[#F59E0B] mx-auto" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/80 block mt-1">
                      Faculty Slot
                    </span>
                  </div>
                )}
              </div>

              {/* Faculty Details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold">
                    {member.department}
                  </span>
                  {member.is_placeholder && (
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-semibold">
                      Editable via Admin
                    </span>
                  )}
                </div>

                <h3 className="font-serif-display text-xl font-bold text-[#0B2545]">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#1D4ED8]">
                  {member.role}
                </p>

                <div className="pt-1 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] font-semibold text-[#0B2545]">
                    <strong>Qualifications:</strong> {member.qualifications}
                  </span>
                  {member.experience && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] font-semibold text-[#0B2545]/80">
                      {member.experience}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#0B2545]/75 pt-1 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching Standards Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="rounded-3xl bg-[#0B2545] text-white p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F59E0B]">
              Our Commitment to High-Calibre Instruction
            </h3>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Every faculty member at Vedanta Institute is selected not only for academic degrees (<strong>B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil., Ph.D.</strong>) but for their ability to simplify complex topics and mentor students patiently.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Dedicated Subject Specialists per Stream</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Daily Post-Class Doubt Resolution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Regular Answer Sheet Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>Personal Attention in Every Batch</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/admissions"
              className="px-6 py-3.5 rounded-xl bg-[#F59E0B] text-[#0B2545] font-extrabold text-sm text-center hover:bg-[#F59E0B] transition-colors"
            >
              Enquire About Demo / Admission
            </Link>
            <Link
              to="/admin"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center transition-colors"
            >
              Owner: Add / Edit Faculty Profiles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

