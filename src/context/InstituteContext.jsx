import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const InstituteContext = createContext(null);

const DEFAULT_COURSES = [
  {
    id: 1,
    title: 'Class 5th Foundation Tuition',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Students enrolled in Class 5th',
    description: 'Strong foundational coaching in Mathematics, Science, English and Social Studies with special emphasis on reading comprehension, numerical ability and basic concepts.',
    highlights: ['Focus on Basic Concepts', 'Regular Homework Assistance', 'Weekly Unit Tests', 'Personal Attention'],
    popular: false
  },
  {
    id: 2,
    title: 'Class 6th Comprehensive Coaching',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Students enrolled in Class 6th',
    description: 'Structured transition to middle-school academics focusing on conceptual clarity in Science, Mathematics, and Languages.',
    highlights: ['Concept Building Sessions', 'Updated Study Material', 'Regular Practice Tests', 'Doubt-Clearing Classes'],
    popular: false
  },
  {
    id: 3,
    title: 'Class 7th Academic Excellence Batch',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Students enrolled in Class 7th',
    description: 'In-depth syllabus coverage for JKBOSE and CBSE students to build strong analytical thinking and problem-solving skills.',
    highlights: ['Complete Syllabus Coverage', 'Chapter-wise Assignments', 'Bi-weekly Assessments', 'Individual Mentoring'],
    popular: false
  },
  {
    id: 4,
    title: 'Class 8th Board Readiness Course',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Students enrolled in Class 8th',
    description: 'Intensive preparation for Class 8th examinations with rigorous practice in Mathematics, Science and English grammar.',
    highlights: ['Board Pattern Practice Papers', 'Special Focus on Weak Areas', 'Updated Study Material', 'Parent-Teacher Updates'],
    popular: true
  },
  {
    id: 5,
    title: 'Class 9th Core Foundation Program',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Students enrolled in Class 9th',
    description: 'Crucial high-school foundation covering Physics, Chemistry, Biology, Mathematics, English and Social Science with competitive orientation.',
    highlights: ['NCERT & Board Mastery', 'Numerical Problem Solving', 'Regular Evaluation & Feedback', 'Doubt-Clearing Sessions'],
    popular: true
  },
  {
    id: 6,
    title: 'Class 10th Board Target Batch',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Students appearing for Class 10th Board Exams',
    description: 'Result-oriented Class 10th board preparation with exhaustive test series, previous year paper analysis and answer-writing practice.',
    highlights: ['Full-Length Mock Board Exams', 'Previous Year Paper Solutions', 'Updated Study Notes', 'Daily Doubt Resolution'],
    popular: true
  },
  {
    id: 7,
    title: 'Class 11th Coaching (All Streams)',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Class 10th Passed Students (Medical, Non-Medical, Commerce, Arts)',
    description: 'Comprehensive subject-wise coaching across Science (PCM/PCB), Commerce and Humanities streams with conceptual depth and competitive edge.',
    highlights: ['All Streams Covered', 'Subject-Specialist Faculty', 'In-Depth Theory & Numericals', 'Regular Chapter Tests'],
    popular: true
  },
  {
    id: 8,
    title: 'Class 12th Board & Entrance Batch (All Streams)',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: 'Students enrolled in Class 12th (All Streams)',
    description: 'High-impact board examination coaching for Class 12th across Science, Commerce and Arts streams, synchronized with entrance test preparation.',
    highlights: ['Board Exam Scoring Strategy', 'Comprehensive Revision Modules', 'Regular Practice Examinations', 'Personal Attention'],
    popular: true
  },
  {
    id: 9,
    title: 'B.A. (Bachelor of Arts) Coaching',
    category: 'Graduation Courses',
    board: 'University / Degree Level',
    eligibility: '10+2 Passed / Undergraduate B.A. Students (All Semesters)',
    description: 'Structured semester-wise university coaching for Bachelor of Arts subjects with clear notes, answer structuring and exam-oriented preparation.',
    highlights: ['Semester-wise Syllabus Coverage', 'University Exam Pattern Notes', 'Concept & Answer Writing Focus', 'Experienced Postgraduate Faculty'],
    popular: false
  },
  {
    id: 10,
    title: 'B.Sc. Mathematics Coaching',
    category: 'Graduation Courses',
    board: 'University / Degree Level',
    eligibility: '10+2 with Mathematics / B.Sc. Students (All Semesters)',
    description: 'Rigorous undergraduate Mathematics coaching covering Calculus, Algebra, Differential Equations, Real Analysis and university syllabus requirements.',
    highlights: ['Step-by-Step Theorem & Proof Clarity', 'Extensive Problem Practice', 'Previous University Papers Solved', 'Dedicated Doubt Sessions'],
    popular: true
  },
  {
    id: 11,
    title: 'JEE (Main & Advanced) Preparation',
    category: 'Competitive Examinations',
    board: 'National Engineering Entrance',
    eligibility: 'Class 11th, 12th & 12th Pass (PCM Stream)',
    description: 'Focused engineering entrance coaching in Physics, Chemistry and Mathematics emphasizing conceptual application, speed, and accuracy.',
    highlights: ['Concept-to-Advanced Problem Solving', 'Regular OMR / CBT Mock Tests', 'Updated Study Material & DPPs', 'One-on-One Doubt Support'],
    popular: true
  },
  {
    id: 12,
    title: 'NEET (UG) Medical Entrance Coaching',
    category: 'Competitive Examinations',
    board: 'National Medical Entrance',
    eligibility: 'Class 11th, 12th & 12th Pass (PCB Stream)',
    description: 'Dedicated medical entrance preparation with line-by-line NCERT mastery in Biology, Chemistry and Physics along with intensive MCQ practice.',
    highlights: ['NCERT Line-by-Line Coverage', 'Regular NEET Pattern Tests', 'Physics & Chemistry Numericals Drill', 'Performance Tracking'],
    popular: true
  },
  {
    id: 13,
    title: 'NDA (National Defence Academy) Coaching',
    category: 'Competitive Examinations',
    board: 'UPSC Defence Entrance',
    eligibility: '10+2 Appearing / Passed Aspirants',
    description: 'Complete preparation for UPSC NDA written examination covering Mathematics and General Ability Test (GAT) with disciplined practice.',
    highlights: ['Mathematics Shortcut & Concept Mastery', 'Complete GAT & English Coverage', 'Full-Length UPSC Pattern Tests', 'Exam-Oriented Strategy'],
    popular: true
  },
  {
    id: 14,
    title: 'CDS (Combined Defence Services) Coaching',
    category: 'Competitive Examinations',
    board: 'UPSC Defence Entrance',
    eligibility: 'Final Year / Graduate Aspirants',
    description: 'Targeted coaching for CDS examination covering Elementary Mathematics, English, and General Knowledge for IMA, INA, AFA, and OTA.',
    highlights: ['Comprehensive GS & English Modules', 'High-Scoring Mathematics Drills', 'Previous Year Paper Analysis', 'Regular Practice Exams'],
    popular: false
  },
  {
    id: 15,
    title: 'Other Competitive & Entrance Examinations',
    category: 'Competitive Examinations',
    board: 'National & State Level',
    eligibility: 'School & College Aspirants',
    description: 'Customized coaching for CUET, Olympiads, Sainik School entrance, and state-level academic competitive examinations.',
    highlights: ['Aptitude & Reasoning Mastery', 'Domain Subject Preparation', 'Updated Practice Sets', 'Personal Guidance'],
    popular: false
  },
  {
    id: 16,
    title: 'JKSSB (All Examinations) Complete Batch',
    category: 'Job-Oriented Courses',
    board: 'J&K Services Selection Board',
    eligibility: '10th / 12th / Graduate Aspirants (As per JKSSB Notification)',
    description: 'Comprehensive preparation for all JKSSB recruitment examinations including General Knowledge with special reference to J&K, Reasoning, Maths, English & Computer Awareness.',
    highlights: ['J&K Specific GK & Current Affairs', 'Quantitative Aptitude & Reasoning', 'OMR Based Weekly Mock Tests', 'Updated Exam-Oriented Study Material'],
    popular: true
  },
  {
    id: 17,
    title: 'SSC (All Examinations – CGL, CHSL, MTS, GD)',
    category: 'Job-Oriented Courses',
    board: 'Staff Selection Commission',
    eligibility: '10th / 12th / Graduate Aspirants',
    description: 'Structured coaching for SSC CGL, CHSL, MTS, and Constable GD exams focusing on Quantitative Aptitude, General Intelligence, English Comprehension and General Awareness.',
    highlights: ['Basic-to-High Level Arithmetic & Advance Maths', 'Speed & Accuracy Test Series', 'Daily Vocabulary & Grammar Rules', 'Doubt-Clearing Sessions'],
    popular: true
  }
];

const PLACEHOLDER_FEE = '[To Be Updated by Admin]';
const DEFAULT_FEES = [
  { id: 1, group_name: 'Classes 5th to 8th', course_name: 'Class 5th (All Subjects - JKBOSE / CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 2, group_name: 'Classes 5th to 8th', course_name: 'Class 6th (All Subjects - JKBOSE / CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 3, group_name: 'Classes 5th to 8th', course_name: 'Class 7th (All Subjects - JKBOSE / CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 4, group_name: 'Classes 5th to 8th', course_name: 'Class 8th (All Subjects - JKBOSE / CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 5, group_name: 'Classes 9th and 10th', course_name: 'Class 9th Foundation Batch (JKBOSE / CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 6, group_name: 'Classes 9th and 10th', course_name: 'Class 10th Board Target Batch (JKBOSE / CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 7, group_name: 'Classes 11th and 12th', course_name: 'Class 11th (Science / Commerce / Arts - JKBOSE & CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 8, group_name: 'Classes 11th and 12th', course_name: 'Class 12th (Science / Commerce / Arts - JKBOSE & CBSE)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 9, group_name: 'Graduation Courses', course_name: 'B.A. (Bachelor of Arts - Semester Coaching)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 10, group_name: 'Graduation Courses', course_name: 'B.Sc. Mathematics (Undergraduate Coaching)', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 11, group_name: 'Competitive Examination Preparation', course_name: 'JEE (Main & Advanced) Coaching', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 12, group_name: 'Competitive Examination Preparation', course_name: 'NEET (UG) Medical Coaching', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 13, group_name: 'Competitive Examination Preparation', course_name: 'NDA Written Examination Batch', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 14, group_name: 'Competitive Examination Preparation', course_name: 'CDS Written Examination Batch', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 15, group_name: 'Competitive Examination Preparation', course_name: 'Other Competitive Examinations', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 16, group_name: 'Job-Oriented Courses', course_name: 'JKSSB (All Examinations) Coaching Batch', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE },
  { id: 17, group_name: 'Job-Oriented Courses', course_name: 'SSC (CGL / CHSL / MTS / GD) Coaching Batch', monthly_fee: PLACEHOLDER_FEE, admission_fee: PLACEHOLDER_FEE, study_material_fee: PLACEHOLDER_FEE, other_charges: PLACEHOLDER_FEE }
];

const DEFAULT_FACULTY = [
  {
    id: 1,
    name: '[Editable Faculty Profile – Slot 1]',
    role: 'Senior Faculty – Mathematics & Quantitative Aptitude',
    department: 'Mathematics (School, B.Sc., JEE, NDA & SSC/JKSSB)',
    qualifications: 'Institute Pool: B.Sc. / M.Sc. / B.Ed. / M.Ed. / Ph.D. (Update via Admin)',
    experience: 'Update Experience via Admin Dashboard',
    bio: 'Dedicated faculty position for foundational and higher Mathematics across Classes 5th–12th, B.Sc. Mathematics, and competitive exams. Use the Admin Dashboard to enter specific faculty name, photo, and credentials.',
    photo_url: '',
    is_placeholder: true
  },
  {
    id: 2,
    name: '[Editable Faculty Profile – Slot 2]',
    role: 'Senior Faculty – Science (Physics, Chemistry & Biology)',
    department: 'Science & Medical/Engineering Division (Classes 8th–12th, JEE & NEET)',
    qualifications: 'Institute Pool: B.Sc. / M.Sc. / B.Ed. / M.Phil. / Ph.D. (Update via Admin)',
    experience: 'Update Experience via Admin Dashboard',
    bio: 'Dedicated faculty position focused on conceptual clarity, laboratory/theoretical fundamentals, and NEET/JEE exam-oriented preparation. Editable from the Admin Dashboard.',
    photo_url: '',
    is_placeholder: true
  },
  {
    id: 3,
    name: '[Editable Faculty Profile – Slot 3]',
    role: 'Senior Faculty – Humanities, Arts & Social Sciences',
    department: 'Arts, B.A., Commerce & General Studies Division',
    qualifications: 'Institute Pool: B.A. / M.A. / B.Ed. / M.Ed. / M.Phil. (Update via Admin)',
    experience: 'Update Experience via Admin Dashboard',
    bio: 'Dedicated faculty position for Class 11th–12th Arts/Humanities, B.A. degree coaching, and General Studies for CDS, NDA, JKSSB, and SSC.',
    photo_url: '',
    is_placeholder: true
  },
  {
    id: 4,
    name: '[Editable Faculty Profile – Slot 4]',
    role: 'Faculty – English Language, Comprehension & Reasoning',
    department: 'Languages & Competitive Aptitude Division',
    qualifications: 'Institute Pool: M.A. / B.Ed. / M.Ed. (Update via Admin)',
    experience: 'Update Experience via Admin Dashboard',
    bio: 'Focused on grammar fundamentals, board examination writing skills, and verbal/reasoning sections for NDA, CDS, JKSSB, and SSC examinations.',
    photo_url: '',
    is_placeholder: true
  }
];

const DEFAULT_GALLERY = [
  {
    id: 1,
    title: 'Interactive Classroom Learning Session [Placeholder – Upload Photo in Admin]',
    category: 'Classroom Activities',
    description: 'Structured classroom sessions at Vedanta Institute with personal attention to every student.',
    image_url: '',
    is_placeholder: true
  },
  {
    id: 2,
    title: 'Concept-Focused Board & Competitive Lecture [Placeholder – Upload Photo in Admin]',
    category: 'Teaching Sessions',
    description: 'In-depth subject lectures focusing on strong fundamentals for JKBOSE, CBSE, and competitive exam aspirants.',
    image_url: '',
    is_placeholder: true
  },
  {
    id: 3,
    title: 'Weekly OMR & Subjective Practice Examination [Placeholder – Upload Photo in Admin]',
    category: 'Student Activities',
    description: 'Regular evaluation and test sessions held at the institute to monitor academic progress.',
    image_url: '',
    is_placeholder: true
  },
  {
    id: 4,
    title: 'One-on-One Doubt Clearing & Mentoring [Placeholder – Upload Photo in Admin]',
    category: 'Teaching Sessions',
    description: 'Dedicated doubt-resolution desks ensuring no student falls behind in core subjects.',
    image_url: '',
    is_placeholder: true
  },
  {
    id: 5,
    title: 'Orientation & Academic Guidance Seminar [Placeholder – Upload Photo in Admin]',
    category: 'Institute Events',
    description: 'Career and stream selection seminars guiding students toward NDA, CDS, JEE, NEET, JKSSB, and SSC pathways.',
    image_url: '',
    is_placeholder: true
  },
  {
    id: 6,
    title: 'Student Felicitation & Milestone Celebration [Placeholder – Upload Photo in Admin]',
    category: 'Celebrations and Achievements',
    description: 'Recognizing dedication, test toppers, and board/competitive achievements at Vedanta Institute.',
    image_url: '',
    is_placeholder: true
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    author_name: 'Board Exam Student [Editable via Admin]',
    author_role: 'Class 10th / 12th Student (JKBOSE / CBSE)',
    course_tag: 'School Education',
    content: 'The special focus on basic concepts and regular weekly tests helped build strong confidence for board exams. Teachers explain every topic patiently during doubt-clearing sessions.',
    rating: 5,
    is_placeholder: true
  },
  {
    id: 2,
    author_name: 'Competitive Exam Aspirant [Editable via Admin]',
    author_role: 'JKSSB & SSC Batch Aspirant, Udhampur',
    course_tag: 'Job-Oriented Courses',
    content: 'Updated study material and regular practice examinations make preparation systematic and exam-oriented. Personal attention from faculty makes a big difference.',
    rating: 5,
    is_placeholder: true
  },
  {
    id: 3,
    author_name: 'Parent Feedback [Editable via Admin]',
    author_role: 'Parent / Guardian, Garhi Udhampur',
    course_tag: 'Foundation & Board Coaching',
    content: 'A disciplined, supportive learning environment near Shiv Mandir Garhi. Regular test evaluations keep parents informed about the student’s progress.',
    rating: 5,
    is_placeholder: true
  }
];

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
    courses: DEFAULT_COURSES,
    fees: DEFAULT_FEES,
    faculty: DEFAULT_FACULTY,
    gallery: DEFAULT_GALLERY,
    testimonials: DEFAULT_TESTIMONIALS
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
          courses: json.courses?.length ? json.courses : prev.courses,
          fees: json.fees?.length ? json.fees : prev.fees,
          faculty: json.faculty?.length ? json.faculty : prev.faculty,
          gallery: json.gallery?.length ? json.gallery : prev.gallery,
          testimonials: json.testimonials?.length ? json.testimonials : prev.testimonials
        }));
      }
    } catch {
      // Static hosting fallback uses built-in DEFAULT_* seed data
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
