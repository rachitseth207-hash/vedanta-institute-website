import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Send, Phone, MessageCircle } from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

export default function EnquiryModal() {
  const { enquiryModal, closeEnquiryModal, courses, settings } = useInstitute();
  const [form, setForm] = useState({
    student_name: '',
    parent_name: '',
    mobile: '',
    email: '',
    course_interested: '',
    board: 'JKBOSE / CBSE',
    preferred_batch: 'Morning Batch',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (enquiryModal.open) {
      setError('');
      setSubmitted(false);
      setForm(prev => ({
        ...prev,
        course_interested:
          enquiryModal.preselectedCourse || (courses[0]?.title ?? 'Class 10th Board Target Batch')
      }));
    }
  }, [enquiryModal.open, enquiryModal.preselectedCourse, courses]);

  if (!enquiryModal.open) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.student_name.trim().length < 2) {
      setError('Please enter the Student Name.');
      return;
    }
    const cleanPhone = form.mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Mobile Number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          enquiry_type: enquiryModal.enquiryType || 'Admission'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Submission failed. Please check your details.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Network error while submitting enquiry. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2545]/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#0B2545]/15 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0B2545] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#F59E0B]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B]">
              {enquiryModal.enquiryType === 'Fee Structure'
                ? 'Fee Structure & Batch Enquiry'
                : 'Quick Admission Enquiry'}
            </span>
            <h3 className="font-serif-display text-xl font-bold text-white">
              Vedanta Institute, Udhampur
            </h3>
          </div>
          <button
            type="button"
            onClick={closeEnquiryModal}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif-display text-2xl font-bold text-[#0B2545]">
                Enquiry Received Successfully!
              </h4>
              <p className="text-sm text-[#0B2545]/75 max-w-md mx-auto">
                Thank you, <strong>{form.student_name}</strong>. Your enquiry for{' '}
                <strong>{form.course_interested}</strong> has been logged in our system.{' '}
                <strong>{settings.contact_person}</strong> will contact you shortly on{' '}
                <span className="font-mono-num font-semibold">{form.mobile}</span>.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${settings.whatsapp_number || '917298329209'}?text=${encodeURIComponent(
                    `Hello Vedanta Institute, I just submitted an enquiry for ${form.course_interested}. Name: ${form.student_name}, Mobile: ${form.mobile}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  Connect on WhatsApp Now
                </a>
                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Student Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.student_name}
                    onChange={e => setForm({ ...form, student_name: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0B2545]/20 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={form.parent_name}
                    onChange={e => setForm({ ...form, parent_name: e.target.value })}
                    placeholder="Enter parent/guardian name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0B2545]/20 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0B2545]/20 text-sm font-mono-num focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Board / Exam Body
                  </label>
                  <select
                    value={form.board}
                    onChange={e => setForm({ ...form, board: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0B2545]/20 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="JKBOSE">JKBOSE</option>
                    <option value="CBSE">CBSE</option>
                    <option value="JKBOSE / CBSE">Both / Either (JKBOSE / CBSE)</option>
                    <option value="University / Graduation">University (B.A. / B.Sc.)</option>
                    <option value="Competitive / Job Exam">Competitive (JEE/NEET/NDA/CDS/JKSSB/SSC)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Class / Course Interested In <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={form.course_interested}
                    onChange={e => setForm({ ...form, course_interested: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0B2545]/20 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                    <option value="Home Tuition Facility">Home Tuition Facility</option>
                    <option value="General Admission / Fee Enquiry">General Admission / Fee Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Preferred Batch
                  </label>
                  <select
                    value={form.preferred_batch}
                    onChange={e => setForm({ ...form, preferred_batch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0B2545]/20 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="Morning Batch">Morning Batch</option>
                    <option value="Afternoon Batch">Afternoon Batch</option>
                    <option value="Evening Batch">Evening Batch</option>
                    <option value="Home Tuition">Home Tuition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B2545] mb-1">
                  Message / Specific Requirement (Optional)
                </label>
                <textarea
                  rows={2}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Any specific subjects, stream, or fee query..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#0B2545]/20 text-sm focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`tel:+91${settings.phone_primary}`}
                  className="text-xs font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Or call directly: +91 {settings.phone_primary}
                </a>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#F59E0B] text-[#0B2545] font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

