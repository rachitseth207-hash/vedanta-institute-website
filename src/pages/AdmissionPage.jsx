import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Send,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

export default function AdmissionPage() {
  const { courses, settings } = useInstitute();

  const [form, setForm] = useState({
    student_name: '',
    parent_name: '',
    mobile: '',
    email: '',
    course_interested: '',
    board: 'JKBOSE',
    preferred_batch: 'Morning Batch',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    document.title = 'Admissions & Online Enquiry | VEDANTA INSTITUTE – Udhampur, J&K';
  }, []);

  useEffect(() => {
    if (!form.course_interested && courses.length > 0) {
      setForm(prev => ({ ...prev, course_interested: courses[0].title }));
    }
  }, [courses, form.course_interested]);

  const validateAndSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.student_name.trim().length < 2) {
      setError('Please enter the full Student Name.');
      return;
    }
    if (form.parent_name.trim().length < 2) {
      setError('Please enter the Parent / Guardian Name.');
      return;
    }
    const cleanPhone = form.mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Mobile Number.');
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid Email Address or leave it blank.');
      return;
    }
    if (!form.course_interested) {
      setError('Please select a Class or Course Interested In.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          enquiry_type: 'Admission Form'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not submit your admission enquiry.');
      } else {
        setSuccessData({ ...form, id: data.id });
      }
    } catch {
      setError('Network error while submitting. Please call +91 ' + settings.phone_primary);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <section className="hero-mesh text-white py-16 border-b-4 border-[#D6B66B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6B66B] text-[#09090B] text-xs font-extrabold uppercase tracking-wider">
            Admissions Open • Academic & Competitive Batches
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
            Admission & <span className="text-[#D6B66B]">Batch Enquiry Form</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
            Register your interest for Classes 5th to 12th (JKBOSE & CBSE), B.A., B.Sc. Mathematics, JEE, NEET, NDA, CDS, JKSSB, SSC, or Home Tuition Facility.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Complete Admission Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#09090B]/10">
            {successData ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#F3EBD8] text-zinc-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#F9F5EB] text-zinc-900 text-xs font-bold">
                  Enquiry Reference #{successData.id}
                </span>
                <h2 className="font-serif-display text-3xl font-bold text-[#09090B]">
                  Admission Enquiry Submitted!
                </h2>
                <p className="text-sm sm:text-base text-[#09090B]/75 max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong>{successData.student_name}</strong> (Parent/Guardian:{' '}
                  <strong>{successData.parent_name}</strong>). We have recorded your admission enquiry for{' '}
                  <strong>{successData.course_interested}</strong> ({successData.board} •{' '}
                  {successData.preferred_batch}).
                </p>
                <div className="p-4 rounded-2xl bg-[#F9F5EB] max-w-md mx-auto text-xs text-[#09090B]/80">
                  Our coordinator <strong>{settings.contact_person}</strong> will contact you on{' '}
                  <strong className="font-mono-num">{successData.mobile}</strong> with batch timings and fee details.
                </div>
                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://wa.me/${settings.whatsapp_number || '917298329209'}?text=${encodeURIComponent(
                      `Hello Vedanta Institute, I submitted Admission Enquiry #${successData.id} for ${successData.course_interested}. Student: ${successData.student_name}, Mobile: ${successData.mobile}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Details via WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessData(null);
                      setForm({
                        student_name: '',
                        parent_name: '',
                        mobile: '',
                        email: '',
                        course_interested: courses[0]?.title || '',
                        board: 'JKBOSE',
                        preferred_batch: 'Morning Batch',
                        message: ''
                      });
                    }}
                    className="px-5 py-3 rounded-xl bg-[#09090B] text-white font-bold text-xs cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-[#09090B]/10 pb-5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C702B]">
                    Official Registration & Counselling Form
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#09090B] mt-1">
                    Student Admission Enquiry
                  </h2>
                  <p className="text-xs sm:text-sm text-[#09090B]/70 mt-1">
                    Fill out the details below. Fields marked with <span className="text-red-600">*</span> are mandatory.
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={validateAndSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                        Student Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.student_name}
                        onChange={e => setForm({ ...form, student_name: e.target.value })}
                        placeholder="Enter student's full name"
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm focus:bg-white focus:outline-none focus:border-[#8C702B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                        Parent / Guardian Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.parent_name}
                        onChange={e => setForm({ ...form, parent_name: e.target.value })}
                        placeholder="Enter father/mother/guardian name"
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm focus:bg-white focus:outline-none focus:border-[#8C702B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                        Mobile Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={e => setForm({ ...form, mobile: e.target.value })}
                        placeholder="10-digit active mobile number"
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm font-mono-num focus:bg-white focus:outline-none focus:border-[#8C702B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                        Email Address <span className="text-[#09090B]/50 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="student@example.com (optional)"
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm focus:bg-white focus:outline-none focus:border-[#8C702B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                      Class / Course Interested In <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={form.course_interested}
                      onChange={e => setForm({ ...form, course_interested: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm font-semibold text-[#09090B] focus:bg-white focus:outline-none focus:border-[#8C702B]"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.title}>
                          {c.title} ({c.category})
                        </option>
                      ))}
                      <option value="Home Tuition Facility">Home Tuition Facility</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                        Board / Examination Body <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={form.board}
                        onChange={e => setForm({ ...form, board: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm font-semibold text-[#09090B] focus:bg-white focus:outline-none focus:border-[#8C702B]"
                      >
                        <option value="CBSE">CBSE</option>
                        <option value="JKBOSE">JKBOSE</option>
                        <option value="Other">Other (University / Competitive Exam)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                        Preferred Batch <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={form.preferred_batch}
                        onChange={e => setForm({ ...form, preferred_batch: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm font-semibold text-[#09090B] focus:bg-white focus:outline-none focus:border-[#8C702B]"
                      >
                        <option value="Morning Batch">Morning Batch</option>
                        <option value="Afternoon Batch">Afternoon Batch</option>
                        <option value="Evening Batch">Evening Batch</option>
                        <option value="Home Tuition">Home Tuition Facility</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#09090B] mb-1.5">
                      Message / Subjects / Specific Query
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Mention specific subjects, stream (Medical/Non-Medical/Commerce/Arts), or any question..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F9F5EB] border border-[#09090B]/15 text-sm focus:bg-white focus:outline-none focus:border-[#8C702B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-[#D6B66B] hover:bg-[#D6B66B] text-[#09090B] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Submitting Admission Enquiry...' : 'Submit Enquiry'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Right Column: Admission Process & Direct Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#09090B] text-white p-7 border-b-4 border-[#D6B66B] space-y-5">
              <span className="px-3 py-1 rounded-full bg-[#D6B66B] text-[#09090B] text-xs font-extrabold uppercase">
                Direct Admission Helpdesk
              </span>
              <h3 className="font-serif-display text-2xl font-bold">
                Speak with {settings.contact_person}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Have questions about batch timings, subject combinations, or home tuition in Udhampur? Reach out directly via phone or WhatsApp.
              </p>

              <div className="space-y-3 pt-2 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D6B66B] shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-3 font-mono-num">
                  <Phone className="w-5 h-5 text-[#D6B66B] shrink-0" />
                  <div>
                    <a href={`tel:+91${settings.phone_primary}`} className="block font-bold hover:text-[#D6B66B]">
                      +91 {settings.phone_primary}
                    </a>
                    <a href={`tel:+91${settings.phone_secondary}`} className="block font-bold hover:text-[#D6B66B]">
                      +91 {settings.phone_secondary}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D6B66B] shrink-0" />
                  <span className="text-xs text-white/80">{settings.office_hours}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:+91${settings.phone_primary}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#D6B66B] text-[#09090B] font-bold text-xs text-center"
                >
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${settings.whatsapp_number || '917298329209'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 text-white font-bold text-xs text-center"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Simple 3-Step Admission Process */}
            <div className="rounded-3xl bg-white p-7 border border-[#09090B]/10 space-y-4">
              <h3 className="font-serif-display text-xl font-bold text-[#09090B]">
                How Admission Works
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Submit Enquiry or Visit Campus',
                    desc: 'Fill out the online enquiry form or visit Near Shiv Mandir Garhi, Udhampur.'
                  },
                  {
                    step: '2',
                    title: 'Academic Counselling & Batch Selection',
                    desc: 'Discuss your class, board (JKBOSE/CBSE), stream, or competitive exam target with our faculty.'
                  },
                  {
                    step: '3',
                    title: 'Start Attending Regular Classes',
                    desc: 'Receive study material, batch schedule, and weekly test calendar.'
                  }
                ].map(s => (
                  <div key={s.step} className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#8C702B] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#09090B]">{s.title}</h4>
                      <p className="text-xs text-[#09090B]/70 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

