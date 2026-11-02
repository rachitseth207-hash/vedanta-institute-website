import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  UserCheck,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

export default function ContactPage() {
  const { settings, courses } = useInstitute();
  const [form, setForm] = useState({
    student_name: '',
    mobile: '',
    course_interested: 'General Contact Enquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | VEDANTA INSTITUTE – Near Shiv Mandir Garhi, Udhampur, J&K';
  }, []);

  const handleContactSubmit = async e => {
    e.preventDefault();
    setError('');

    if (form.student_name.trim().length < 2) {
      setError('Please enter your Name.');
      return;
    }
    const cleanPhone = form.mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit Phone Number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          enquiry_type: 'Contact Page'
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not send message.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Network error. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const mapQuery = encodeURIComponent(
    settings.address || 'Near Shiv Mandir Garhi, Udhampur, Jammu and Kashmir'
  );

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <section className="hero-mesh text-white py-16 border-b-4 border-[#F59E0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F59E0B] text-[#0B2545] text-xs font-extrabold uppercase tracking-wider">
            Get in Touch With Us
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
            Contact <span className="text-[#F59E0B]">Vedanta Institute</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
            Visit our campus at <strong>{settings.address}</strong> or connect directly with{' '}
            <strong>{settings.contact_person}</strong> for admissions, batch timings, and counselling.
          </p>
        </div>
      </section>

      {/* Verified Contact Cards Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Verified Address */}
          <div className="card-elevated rounded-2xl p-6 bg-white border-t-4 border-t-[#0B2545]">
            <div className="w-12 h-12 rounded-xl bg-[#0B2545] text-[#F59E0B] flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              Institute Campus Address
            </span>
            <h2 className="font-serif-display text-xl font-bold text-[#0B2545] mt-1">
              Vedanta Institute
            </h2>
            <p className="text-sm font-medium text-[#0B2545]/80 mt-2 leading-relaxed">
              {settings.address}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:underline"
            >
              Open in Google Maps
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Contact Person & Click-to-Call Phone Numbers */}
          <div className="card-elevated rounded-2xl p-6 bg-white border-t-4 border-t-[#1D4ED8]">
            <div className="w-12 h-12 rounded-xl bg-[#1D4ED8] text-white flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              Contact Person: {settings.contact_person}
            </span>
            <h2 className="font-serif-display text-xl font-bold text-[#0B2545] mt-1">
              Direct Phone Numbers
            </h2>
            <div className="mt-3 space-y-2">
              <a
                href={`tel:+91${settings.phone_primary}`}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F1F5F9] hover:bg-[#0B2545] hover:text-white text-[#0B2545] font-mono-num font-bold text-sm flex items-center justify-between transition-colors"
              >
                <span>+91 {settings.phone_primary}</span>
                <span className="text-xs font-sans bg-[#F59E0B] text-[#0B2545] px-2 py-0.5 rounded font-bold">
                  Tap to Call
                </span>
              </a>
              {settings.phone_secondary && (
                <a
                  href={`tel:+91${settings.phone_secondary}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F1F5F9] hover:bg-[#0B2545] hover:text-white text-[#0B2545] font-mono-num font-bold text-sm flex items-center justify-between transition-colors"
                >
                  <span>+91 {settings.phone_secondary}</span>
                  <span className="text-xs font-sans bg-[#F59E0B] text-[#0B2545] px-2 py-0.5 rounded font-bold">
                    Tap to Call
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Card 3: Instant WhatsApp Enquiry */}
          <div className="card-elevated rounded-2xl p-6 bg-white border-t-4 border-t-emerald-600">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Instant Messaging
            </span>
            <h2 className="font-serif-display text-xl font-bold text-[#0B2545] mt-1">
              WhatsApp Enquiry Desk
            </h2>
            <p className="text-xs sm:text-sm text-[#0B2545]/75 mt-2">
              Chat directly with <strong>{settings.contact_person}</strong> on WhatsApp for quick answers on batches, fees, and admissions.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={`https://wa.me/${settings.whatsapp_number || '917298329209'}?text=${encodeURIComponent(
                  'Hello Amit Singh Ji (Vedanta Institute, Udhampur), I would like to enquire about admission and batch timings.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: +91 {settings.phone_primary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Enquiry Form & Google Maps Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Enquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#0B2545]/10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              Send Us a Message
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B2545] mt-1">
              Contact Enquiry Form
            </h2>
            <p className="text-xs sm:text-sm text-[#0B2545]/70 mt-1 mb-6">
              Have a question about courses, fees, or home tuition? Send us a direct message below.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif-display text-xl font-bold text-[#0B2545]">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#0B2545]/75">
                  Thank you, <strong>{form.student_name}</strong>. We will contact you shortly on{' '}
                  <strong className="font-mono-num">{form.mobile}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      student_name: '',
                      mobile: '',
                      course_interested: 'General Contact Enquiry',
                      message: ''
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Your Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.student_name}
                    onChange={e => setForm({ ...form, student_name: e.target.value })}
                    placeholder="Enter student or parent name"
                    className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/15 text-sm focus:bg-white focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Phone / Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/15 text-sm font-mono-num focus:bg-white focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Topic / Course of Interest
                  </label>
                  <select
                    value={form.course_interested}
                    onChange={e => setForm({ ...form, course_interested: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/15 text-sm font-semibold text-[#0B2545] focus:bg-white focus:outline-none focus:border-[#1D4ED8]"
                  >
                    <option value="General Contact Enquiry">General Contact Enquiry</option>
                    <option value="Fee Structure Enquiry">Fee Structure Enquiry</option>
                    <option value="Home Tuition Enquiry">Home Tuition Enquiry</option>
                    {courses.map(c => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B2545] mb-1">
                    Your Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="How can Vedanta Institute help you?"
                    className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/15 text-sm focus:bg-white focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#F59E0B] text-[#0B2545] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Google Maps Location Section using Verified Institute Address */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#0B2545]/10 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Campus Location Map
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B2545] mt-1">
                Locate Us in Garhi, Udhampur
              </h2>
              <p className="text-xs sm:text-sm text-[#0B2545]/75 mt-1">
                <strong>Address:</strong> {settings.address}
              </p>
            </div>

            <div className="w-full flex-1 min-h-[320px] rounded-2xl overflow-hidden border border-[#0B2545]/15 bg-[#F1F5F9]">
              <iframe
                title="Vedanta Institute Location – Near Shiv Mandir Garhi, Udhampur, Jammu & Kashmir"
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full min-h-[320px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#0B2545]/75">
              <span>Landmark: Near Shiv Mandir Garhi, Udhampur (J&K)</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#1D4ED8] hover:underline"
              >
                Get Directions on Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

