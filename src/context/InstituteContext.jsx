import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const InstituteContext = createContext(null);

export function InstituteProvider({ children }) {
  const [data, setData] = useState({
    settings: {
      institute_name: 'VEDANTA INSTITUTE',
      tagline: 'We Guide You to Achieve – Chase Excellence',
      admissions_open: 'true',
      admission_badge_text: 'Admissions Open for Academic Session & Competitive Batches',
      announcement_banner:
        'Admissions Open at Vedanta Institute, Garhi Udhampur! Comprehensive coaching for Classes 5th–12th (JKBOSE & CBSE), B.A./B.Sc., JEE, NEET, NDA, CDS, JKSSB & SSC.',
      contact_person: 'Amit Singh',
      phone_primary: '7298329209',
      phone_secondary: '7006843738',
      whatsapp_number: '917298329209',
      address: 'Near Shiv Mandir Garhi, Udhampur, Jammu & Kashmir',
      email: '',
      office_hours: 'Monday – Saturday: 8:00 AM to 7:00 PM',
      facebook_url: '',
      instagram_url: '',
      youtube_url: '',
      available_qualifications: 'B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil. and Ph.D.'
    },
    courses: [],
    fees: [],
    faculty: [],
    gallery: [],
    testimonials: []
  });
  const [loading, setLoading] = useState(true);
  const [enquiryModal, setEnquiryModal] = useState({
    open: false,
    preselectedCourse: '',
    enquiryType: 'Admission'
  });

  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/public/data');
      if (res.ok) {
        const json = await res.json();
        setData(prev => ({
          settings: { ...prev.settings, ...(json.settings || {}) },
          courses: json.courses || [],
          fees: json.fees || [],
          faculty: json.faculty || [],
          gallery: json.gallery || [],
          testimonials: json.testimonials || []
        }));
      }
    } catch (err) {
      console.error('Failed to fetch institute data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openEnquiryModal = (preselectedCourse = '', enquiryType = 'Admission') => {
    setEnquiryModal({ open: true, preselectedCourse, enquiryType });
  };

  const closeEnquiryModal = () => {
    setEnquiryModal({ open: false, preselectedCourse: '', enquiryType: 'Admission' });
  };

  return (
    <InstituteContext.Provider
      value={{
        ...data,
        loading,
        refreshData,
        enquiryModal,
        openEnquiryModal,
        closeEnquiryModal
      }}
    >
      {children}
    </InstituteContext.Provider>
  );
}

export function useInstitute() {
  const ctx = useContext(InstituteContext);
  if (!ctx) {
    throw new Error('useInstitute must be used within an InstituteProvider');
  }
  return ctx;
}

