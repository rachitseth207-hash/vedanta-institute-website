const { DatabaseSync } = require('node:sqlite');
const crypto = require('node:crypto');
const path = require('node:path');
const fs = require('node:fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'vedanta.db');
const db = new DatabaseSync(dbPath);

function hashPassword(password, salt = 'vedanta_institute_salt_2026') {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      board TEXT NOT NULL,
      eligibility TEXT NOT NULL,
      description TEXT NOT NULL,
      highlights TEXT NOT NULL,
      popular INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 100
    );

    CREATE TABLE IF NOT EXISTS fees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_name TEXT NOT NULL,
      course_name TEXT NOT NULL,
      monthly_fee TEXT NOT NULL,
      admission_fee TEXT NOT NULL,
      study_material_fee TEXT NOT NULL,
      other_charges TEXT NOT NULL,
      sort_order INTEGER DEFAULT 100
    );

    CREATE TABLE IF NOT EXISTS faculty (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      department TEXT NOT NULL,
      qualifications TEXT NOT NULL,
      experience TEXT NOT NULL,
      bio TEXT NOT NULL,
      photo_url TEXT DEFAULT '',
      is_placeholder INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT DEFAULT '',
      is_placeholder INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL,
      course_tag TEXT NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      is_placeholder INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT NOT NULL,
      parent_name TEXT DEFAULT '',
      mobile TEXT NOT NULL,
      email TEXT DEFAULT '',
      course_interested TEXT NOT NULL,
      board TEXT DEFAULT 'CBSE',
      preferred_batch TEXT DEFAULT 'Morning Batch',
      message TEXT DEFAULT '',
      enquiry_type TEXT DEFAULT 'Admission',
      status TEXT DEFAULT 'New',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default admin if none exists
  const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin_users').get().count;
  if (adminCount === 0) {
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(
      'admin',
      hashPassword('vedanta@2026')
    );
  }

  // Seed default settings
  const defaultSettings = {
    institute_name: 'VEDANTA INSTITUTE',
    tagline: 'We Guide You to Achieve – Chase Excellence',
    admissions_open: 'true',
    admission_badge_text: 'Admissions Open for Academic Session & Competitive Batches',
    announcement_banner: 'Admissions Open at Vedanta Institute, Garhi Udhampur! Comprehensive coaching for Classes 5th–12th (JKBOSE & CBSE), B.A./B.Sc., JEE, NEET, NDA, CDS, JKSSB & SSC.',
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
  };

  const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  for (const [k, v] of Object.entries(defaultSettings)) {
    insertSetting.run(k, v);
  }

  // Seed courses if empty
  const courseCount = db.prepare('SELECT COUNT(*) as count FROM courses').get().count;
  if (courseCount === 0) {
    const initialCourses = [
      // 1. SCHOOL EDUCATION
      {
        title: 'Class 5th Foundation Tuition',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Students enrolled in Class 5th',
        description: 'Strong foundational coaching in Mathematics, Science, English and Social Studies with special emphasis on reading comprehension, numerical ability and basic concepts.',
        highlights: JSON.stringify(['Focus on Basic Concepts', 'Regular Homework Assistance', 'Weekly Unit Tests', 'Personal Attention']),
        popular: 0,
        sort_order: 1
      },
      {
        title: 'Class 6th Comprehensive Coaching',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Students enrolled in Class 6th',
        description: 'Structured transition to middle-school academics focusing on conceptual clarity in Science, Mathematics, and Languages.',
        highlights: JSON.stringify(['Concept Building Sessions', 'Updated Study Material', 'Regular Practice Tests', 'Doubt-Clearing Classes']),
        popular: 0,
        sort_order: 2
      },
      {
        title: 'Class 7th Academic Excellence Batch',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Students enrolled in Class 7th',
        description: 'In-depth syllabus coverage for JKBOSE and CBSE students to build strong analytical thinking and problem-solving skills.',
        highlights: JSON.stringify(['Complete Syllabus Coverage', 'Chapter-wise Assignments', 'Bi-weekly Assessments', 'Individual Mentoring']),
        popular: 0,
        sort_order: 3
      },
      {
        title: 'Class 8th Board Readiness Course',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Students enrolled in Class 8th',
        description: 'Intensive preparation for Class 8th examinations with rigorous practice in Mathematics, Science and English grammar.',
        highlights: JSON.stringify(['Board Pattern Practice Papers', 'Special Focus on Weak Areas', 'Updated Study Material', 'Parent-Teacher Updates']),
        popular: 1,
        sort_order: 4
      },
      {
        title: 'Class 9th Core Foundation Program',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Students enrolled in Class 9th',
        description: 'Crucial high-school foundation covering Physics, Chemistry, Biology, Mathematics, English and Social Science with competitive orientation.',
        highlights: JSON.stringify(['NCERT & Board Mastery', 'Numerical Problem Solving', 'Regular Evaluation & Feedback', 'Doubt-Clearing Sessions']),
        popular: 1,
        sort_order: 5
      },
      {
        title: 'Class 10th Board Target Batch',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Students appearing for Class 10th Board Exams',
        description: 'Result-oriented Class 10th board preparation with exhaustive test series, previous year paper analysis and answer-writing practice.',
        highlights: JSON.stringify(['Full-Length Mock Board Exams', 'Previous Year Paper Solutions', 'Updated Study Notes', 'Daily Doubt Resolution']),
        popular: 1,
        sort_order: 6
      },
      {
        title: 'Class 11th Coaching (All Streams)',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Class 10th Passed Students (Medical, Non-Medical, Commerce, Arts)',
        description: 'Comprehensive subject-wise coaching across Science (PCM/PCB), Commerce and Humanities streams with conceptual depth and competitive edge.',
        highlights: JSON.stringify(['All Streams Covered', 'Subject-Specialist Faculty', 'In-Depth Theory & Numericals', 'Regular Chapter Tests']),
        popular: 1,
        sort_order: 7
      },
      {
        title: 'Class 12th Board & Entrance Batch (All Streams)',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: 'Students enrolled in Class 12th (All Streams)',
        description: 'High-impact board examination coaching for Class 12th across Science, Commerce and Arts streams, synchronized with entrance test preparation.',
        highlights: JSON.stringify(['Board Exam Scoring Strategy', 'Comprehensive Revision Modules', 'Regular Practice Examinations', 'Personal Attention']),
        popular: 1,
        sort_order: 8
      },

      // 2. GRADUATION COURSES
      {
        title: 'B.A. (Bachelor of Arts) Coaching',
        category: 'Graduation Courses',
        board: 'University / Degree Level',
        eligibility: '10+2 Passed / Undergraduate B.A. Students (All Semesters)',
        description: 'Structured semester-wise university coaching for Bachelor of Arts subjects with clear notes, answer structuring and exam-oriented preparation.',
        highlights: JSON.stringify(['Semester-wise Syllabus Coverage', 'University Exam Pattern Notes', 'Concept & Answer Writing Focus', 'Experienced Postgraduate Faculty']),
        popular: 0,
        sort_order: 9
      },
      {
        title: 'B.Sc. Mathematics Coaching',
        category: 'Graduation Courses',
        board: 'University / Degree Level',
        eligibility: '10+2 with Mathematics / B.Sc. Students (All Semesters)',
        description: 'Rigorous undergraduate Mathematics coaching covering Calculus, Algebra, Differential Equations, Real Analysis and university syllabus requirements.',
        highlights: JSON.stringify(['Step-by-Step Theorem & Proof Clarity', 'Extensive Problem Practice', 'Previous University Papers Solved', 'Dedicated Doubt Sessions']),
        popular: 1,
        sort_order: 10
      },

      // 3. COMPETITIVE EXAMINATIONS
      {
        title: 'JEE (Main & Advanced) Preparation',
        category: 'Competitive Examinations',
        board: 'National Engineering Entrance',
        eligibility: 'Class 11th, 12th & 12th Pass (PCM Stream)',
        description: 'Focused engineering entrance coaching in Physics, Chemistry and Mathematics emphasizing conceptual application, speed, and accuracy.',
        highlights: JSON.stringify(['Concept-to-Advanced Problem Solving', 'Regular OMR / CBT Mock Tests', 'Updated Study Material & DPPs', 'One-on-One Doubt Support']),
        popular: 1,
        sort_order: 11
      },
      {
        title: 'NEET (UG) Medical Entrance Coaching',
        category: 'Competitive Examinations',
        board: 'National Medical Entrance',
        eligibility: 'Class 11th, 12th & 12th Pass (PCB Stream)',
        description: 'Dedicated medical entrance preparation with line-by-line NCERT mastery in Biology, Chemistry and Physics along with intensive MCQ practice.',
        highlights: JSON.stringify(['NCERT Line-by-Line Coverage', 'Regular NEET Pattern Tests', 'Physics & Chemistry Numericals Drill', 'Performance Tracking']),
        popular: 1,
        sort_order: 12
      },
      {
        title: 'NDA (National Defence Academy) Coaching',
        category: 'Competitive Examinations',
        board: 'UPSC Defence Entrance',
        eligibility: '10+2 Appearing / Passed Aspirants',
        description: 'Complete preparation for UPSC NDA written examination covering Mathematics and General Ability Test (GAT) with disciplined practice.',
        highlights: JSON.stringify(['Mathematics Shortcut & Concept Mastery', 'Complete GAT & English Coverage', 'Full-Length UPSC Pattern Tests', 'Exam-Oriented Strategy']),
        popular: 1,
        sort_order: 13
      },
      {
        title: 'CDS (Combined Defence Services) Coaching',
        category: 'Competitive Examinations',
        board: 'UPSC Defence Entrance',
        eligibility: 'Final Year / Graduate Aspirants',
        description: 'Targeted coaching for CDS examination covering Elementary Mathematics, English, and General Knowledge for IMA, INA, AFA, and OTA.',
        highlights: JSON.stringify(['Comprehensive GS & English Modules', 'High-Scoring Mathematics Drills', 'Previous Year Paper Analysis', 'Regular Practice Exams']),
        popular: 0,
        sort_order: 14
      },
      {
        title: 'Other Competitive & Entrance Examinations',
        category: 'Competitive Examinations',
        board: 'National & State Level',
        eligibility: 'School & College Aspirants',
        description: 'Customized coaching for CUET, Olympiads, Sainik School entrance, and state-level academic competitive examinations.',
        highlights: JSON.stringify(['Aptitude & Reasoning Mastery', 'Domain Subject Preparation', 'Updated Practice Sets', 'Personal Guidance']),
        popular: 0,
        sort_order: 15
      },

      // 4. JOB-ORIENTED COURSES
      {
        title: 'JKSSB (All Examinations) Complete Batch',
        category: 'Job-Oriented Courses',
        board: 'J&K Services Selection Board',
        eligibility: '10th / 12th / Graduate Aspirants (As per JKSSB Notification)',
        description: 'Comprehensive preparation for all JKSSB recruitment examinations including General Knowledge with special reference to J&K, Reasoning, Maths, English & Computer Awareness.',
        highlights: JSON.stringify(['J&K Specific GK & Current Affairs', 'Quantitative Aptitude & Reasoning', 'OMR Based Weekly Mock Tests', 'Updated Exam-Oriented Study Material']),
        popular: 1,
        sort_order: 16
      },
      {
        title: 'SSC (All Examinations – CGL, CHSL, MTS, GD)',
        category: 'Job-Oriented Courses',
        board: 'Staff Selection Commission',
        eligibility: '10th / 12th / Graduate Aspirants',
        description: 'Structured coaching for SSC CGL, CHSL, MTS, and Constable GD exams focusing on Quantitative Aptitude, General Intelligence, English Comprehension and General Awareness.',
        highlights: JSON.stringify(['Basic-to-High Level Arithmetic & Advance Maths', 'Speed & Accuracy Test Series', 'Daily Vocabulary & Grammar Rules', 'Doubt-Clearing Sessions']),
        popular: 1,
        sort_order: 17
      }
    ];

    const insertCourse = db.prepare(`
      INSERT INTO courses (title, category, board, eligibility, description, highlights, popular, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const c of initialCourses) {
      insertCourse.run(c.title, c.category, c.board, c.eligibility, c.description, c.highlights, c.popular, c.sort_order);
    }
  }

  // Seed fee tables if empty (IMPORTANT: Do not invent or assume actual fee amounts!)
  const feeCount = db.prepare('SELECT COUNT(*) as count FROM fees').get().count;
  if (feeCount === 0) {
    const placeholderText = '[To Be Updated by Admin]';
    const initialFees = [
      // Classes 5th to 8th
      { group_name: 'Classes 5th to 8th', course_name: 'Class 5th (All Subjects - JKBOSE / CBSE)', sort_order: 1 },
      { group_name: 'Classes 5th to 8th', course_name: 'Class 6th (All Subjects - JKBOSE / CBSE)', sort_order: 2 },
      { group_name: 'Classes 5th to 8th', course_name: 'Class 7th (All Subjects - JKBOSE / CBSE)', sort_order: 3 },
      { group_name: 'Classes 5th to 8th', course_name: 'Class 8th (All Subjects - JKBOSE / CBSE)', sort_order: 4 },

      // Classes 9th and 10th
      { group_name: 'Classes 9th and 10th', course_name: 'Class 9th Foundation Batch (JKBOSE / CBSE)', sort_order: 5 },
      { group_name: 'Classes 9th and 10th', course_name: 'Class 10th Board Target Batch (JKBOSE / CBSE)', sort_order: 6 },

      // Classes 11th and 12th
      { group_name: 'Classes 11th and 12th', course_name: 'Class 11th (Science / Commerce / Arts - JKBOSE & CBSE)', sort_order: 7 },
      { group_name: 'Classes 11th and 12th', course_name: 'Class 12th (Science / Commerce / Arts - JKBOSE & CBSE)', sort_order: 8 },

      // Graduation courses
      { group_name: 'Graduation Courses', course_name: 'B.A. (Bachelor of Arts - Semester Coaching)', sort_order: 9 },
      { group_name: 'Graduation Courses', course_name: 'B.Sc. Mathematics (Undergraduate Coaching)', sort_order: 10 },

      // Competitive examination preparation
      { group_name: 'Competitive Examination Preparation', course_name: 'JEE (Main & Advanced) Coaching', sort_order: 11 },
      { group_name: 'Competitive Examination Preparation', course_name: 'NEET (UG) Medical Coaching', sort_order: 12 },
      { group_name: 'Competitive Examination Preparation', course_name: 'NDA Written Examination Batch', sort_order: 13 },
      { group_name: 'Competitive Examination Preparation', course_name: 'CDS Written Examination Batch', sort_order: 14 },
      { group_name: 'Competitive Examination Preparation', course_name: 'Other Competitive Examinations', sort_order: 15 },

      // Job-oriented courses
      { group_name: 'Job-Oriented Courses', course_name: 'JKSSB (All Examinations) Coaching Batch', sort_order: 16 },
      { group_name: 'Job-Oriented Courses', course_name: 'SSC (CGL / CHSL / MTS / GD) Coaching Batch', sort_order: 17 }
    ];

    const insertFee = db.prepare(`
      INSERT INTO fees (group_name, course_name, monthly_fee, admission_fee, study_material_fee, other_charges, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const f of initialFees) {
      insertFee.run(
        f.group_name,
        f.course_name,
        placeholderText,
        placeholderText,
        placeholderText,
        placeholderText,
        f.sort_order
      );
    }
  }

  // Seed editable faculty slots if empty (IMPORTANT: Do not invent faculty names, photos, or individual qualifications)
  const facultyCount = db.prepare('SELECT COUNT(*) as count FROM faculty').get().count;
  if (facultyCount === 0) {
    const initialFaculty = [
      {
        name: '[Editable Faculty Profile – Slot 1]',
        role: 'Senior Faculty – Mathematics & Quantitative Aptitude',
        department: 'Mathematics (School, B.Sc., JEE, NDA & SSC/JKSSB)',
        qualifications: 'Institute Pool: B.Sc. / M.Sc. / B.Ed. / M.Ed. / Ph.D. (Update via Admin)',
        experience: 'Update Experience via Admin Dashboard',
        bio: 'Dedicated faculty position for foundational and higher Mathematics across Classes 5th–12th, B.Sc. Mathematics, and competitive exams. Use the Admin Dashboard to enter specific faculty name, photo, and credentials.',
        photo_url: '',
        is_placeholder: 1
      },
      {
        name: '[Editable Faculty Profile – Slot 2]',
        role: 'Senior Faculty – Science (Physics, Chemistry & Biology)',
        department: 'Science & Medical/Engineering Division (Classes 8th–12th, JEE & NEET)',
        qualifications: 'Institute Pool: B.Sc. / M.Sc. / B.Ed. / M.Phil. / Ph.D. (Update via Admin)',
        experience: 'Update Experience via Admin Dashboard',
        bio: 'Dedicated faculty position focused on conceptual clarity, laboratory/theoretical fundamentals, and NEET/JEE exam-oriented preparation. Editable from the Admin Dashboard.',
        photo_url: '',
        is_placeholder: 1
      },
      {
        name: '[Editable Faculty Profile – Slot 3]',
        role: 'Senior Faculty – Humanities, Arts & Social Sciences',
        department: 'Arts, B.A., Commerce & General Studies Division',
        qualifications: 'Institute Pool: B.A. / M.A. / B.Ed. / M.Ed. / M.Phil. (Update via Admin)',
        experience: 'Update Experience via Admin Dashboard',
        bio: 'Dedicated faculty position for Class 11th–12th Arts/Humanities, B.A. degree coaching, and General Studies for CDS, NDA, JKSSB, and SSC.',
        photo_url: '',
        is_placeholder: 1
      },
      {
        name: '[Editable Faculty Profile – Slot 4]',
        role: 'Faculty – English Language, Comprehension & Reasoning',
        department: 'Languages & Competitive Aptitude Division',
        qualifications: 'Institute Pool: M.A. / B.Ed. / M.Ed. (Update via Admin)',
        experience: 'Update Experience via Admin Dashboard',
        bio: 'Focused on grammar fundamentals, board examination writing skills, and verbal/reasoning sections for NDA, CDS, JKSSB, and SSC examinations.',
        photo_url: '',
        is_placeholder: 1
      }
    ];

    const insertFaculty = db.prepare(`
      INSERT INTO faculty (name, role, department, qualifications, experience, bio, photo_url, is_placeholder)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const fac of initialFaculty) {
      insertFaculty.run(fac.name, fac.role, fac.department, fac.qualifications, fac.experience, fac.bio, fac.photo_url, fac.is_placeholder);
    }
  }

  // Seed gallery categories with clearly labelled placeholders if empty
  const galleryCount = db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
  if (galleryCount === 0) {
    const initialGallery = [
      {
        title: 'Interactive Classroom Learning Session [Placeholder – Upload Photo in Admin]',
        category: 'Classroom Activities',
        description: 'Structured classroom sessions at Vedanta Institute with personal attention to every student. Replace with actual classroom photographs via the Admin Dashboard.',
        image_url: '',
        is_placeholder: 1
      },
      {
        title: 'Concept-Focused Board & Competitive Lecture [Placeholder – Upload Photo in Admin]',
        category: 'Teaching Sessions',
        description: 'In-depth subject lectures focusing on strong fundamentals for JKBOSE, CBSE, and competitive exam aspirants.',
        image_url: '',
        is_placeholder: 1
      },
      {
        title: 'Weekly OMR & Subjective Practice Examination [Placeholder – Upload Photo in Admin]',
        category: 'Student Activities',
        description: 'Regular evaluation and test sessions held at the institute to monitor academic progress and build exam temperament.',
        image_url: '',
        is_placeholder: 1
      },
      {
        title: 'One-on-One Doubt Clearing & Mentoring [Placeholder – Upload Photo in Admin]',
        category: 'Teaching Sessions',
        description: 'Dedicated doubt-resolution desks ensuring no student falls behind in core subjects.',
        image_url: '',
        is_placeholder: 1
      },
      {
        title: 'Orientation & Academic Guidance Seminar [Placeholder – Upload Photo in Admin]',
        category: 'Institute Events',
        description: 'Career and stream selection seminars guiding students toward NDA, CDS, JEE, NEET, JKSSB, and SSC pathways.',
        image_url: '',
        is_placeholder: 1
      },
      {
        title: 'Student Felicitation & Milestone Celebration [Placeholder – Upload Photo in Admin]',
        category: 'Celebrations and Achievements',
        description: 'Recognizing dedication, test toppers, and board/competitive achievements at Vedanta Institute.',
        image_url: '',
        is_placeholder: 1
      }
    ];

    const insertGallery = db.prepare(`
      INSERT INTO gallery (title, category, description, image_url, is_placeholder)
      VALUES (?, ?, ?, ?, ?)
    `);
    for (const g of initialGallery) {
      insertGallery.run(g.title, g.category, g.description, g.image_url, g.is_placeholder);
    }
  }

  // Seed editable testimonials if empty
  const testimonialCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get().count;
  if (testimonialCount === 0) {
    const initialTestimonials = [
      {
        author_name: 'Board Exam Student [Editable via Admin]',
        author_role: 'Class 10th / 12th Student (JKBOSE / CBSE)',
        course_tag: 'School Education',
        content: 'The special focus on basic concepts and regular weekly tests helped build strong confidence for board exams. Teachers explain every topic patiently during doubt-clearing sessions.',
        rating: 5,
        is_placeholder: 1
      },
      {
        author_name: 'Competitive Exam Aspirant [Editable via Admin]',
        author_role: 'JKSSB & SSC Batch Aspirant, Udhampur',
        course_tag: 'Job-Oriented Courses',
        content: 'Updated study material and regular practice examinations make preparation systematic and exam-oriented. Personal attention from faculty makes a big difference.',
        rating: 5,
        is_placeholder: 1
      },
      {
        author_name: 'Parent Feedback [Editable via Admin]',
        author_role: 'Parent / Guardian, Garhi Udhampur',
        course_tag: 'Foundation & Board Coaching',
        content: 'A disciplined, supportive learning environment near Shiv Mandir Garhi. Regular test evaluations keep parents informed about the student’s progress.',
        rating: 5,
        is_placeholder: 1
      }
    ];

    const insertTestimonial = db.prepare(`
      INSERT INTO testimonials (author_name, author_role, course_tag, content, rating, is_placeholder)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const t of initialTestimonials) {
      insertTestimonial.run(t.author_name, t.author_role, t.course_tag, t.content, t.rating, t.is_placeholder);
    }
  }
}

initDb();

module.exports = {
  db,
  hashPassword
};

