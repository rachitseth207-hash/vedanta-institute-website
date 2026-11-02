import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Award,
  Briefcase,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const CATEGORY_ORDER = [
  {
    name: 'School Education',
    subtitle: 'Classes 5th to 12th • Boards: JKBOSE & CBSE • Classes 11th & 12th: All Streams (Science, Commerce & Arts)',
    icon: BookOpen
  },
  {
    name: 'Graduation Courses',
    subtitle: 'Undergraduate Degree Coaching • B.A. & B.Sc. Mathematics (All Semesters)',
    icon: GraduationCap
  },
  {
    name: 'Competitive Examinations',
    subtitle: 'Engineering, Medical & Defence Entrance Preparation • JEE, NEET, NDA, CDS & More',
    icon: Award
  },
  {
    name: 'Job-Oriented Courses',
    subtitle: 'Central & J&K UT Recruitment Coaching • JKSSB (All Examinations) & SSC (All Examinations)',
    icon: Briefcase
  }
];

export default function CoursesPage() {
  const { courses, openEnquiryModal } = useInstitute();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [boardFilter, setBoardFilter] = useState('All');

  useEffect(() => {
    document.title = 'Courses Offered | VEDANTA INSTITUTE – School, Graduation, JEE, NEET, NDA, CDS, JKSSB, SSC';
  }, []);

  useEffect(() => {
    const paramCat = searchParams.get('category');
    if (paramCat) {
      setSelectedCategory(paramCat);
    }
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesCat =
        selectedCategory === 'All' ||
        course.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesBoard =
        boardFilter === 'All' ||
        course.board.toLowerCase().includes(boardFilter.toLowerCase()) ||
        course.title.toLowerCase().includes(boardFilter.toLowerCase());

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.board.toLowerCase().includes(q) ||
        course.eligibility.toLowerCase().includes(q) ||
        (course.highlights || []).some(h => h.toLowerCase().includes(q));

      return matchesCat && matchesBoard && matchesSearch;
    });
  }, [courses, selectedCategory, boardFilter, searchQuery]);

  const groupedCategories = useMemo(() => {
    if (selectedCategory !== 'All') {
      const found = CATEGORY_ORDER.find(c => c.name === selectedCategory) || {
        name: selectedCategory,
        subtitle: 'Comprehensive coaching programs at Vedanta Institute',
        icon: BookOpen
      };
      return [found];
    }
    return CATEGORY_ORDER;
  }, [selectedCategory]);

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <section className="hero-mesh text-white py-16 border-b-4 border-[#F59E0B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F59E0B] text-[#0B2545] text-xs font-extrabold uppercase tracking-wider">
              Academic & Competitive Curriculum
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
              JKBOSE • CBSE • University • UPSC • JKSSB • SSC
            </span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
            Courses Offered at <span className="text-[#F59E0B]">Vedanta Institute</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-3xl mt-3 leading-relaxed">
            Explore our structured coaching programs across School Education (Classes 5th–12th), Graduation (B.A. & B.Sc. Mathematics), Competitive Entrance (JEE, NEET, NDA, CDS) and Job-Oriented Examinations (JKSSB & SSC).
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-[#0B2545]/10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#0B2545]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by class (e.g. 10th, 12th), exam (JEE, NEET, NDA, JKSSB, SSC), or stream..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/15 text-sm focus:outline-none focus:border-[#1D4ED8] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B2545]/50 hover:text-[#0B2545]"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Dropdown / Filter */}
            <div className="md:col-span-3">
              <div className="relative">
                <Filter className="w-4 h-4 text-[#1D4ED8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={e => {
                    const val = e.target.value;
                    setSelectedCategory(val);
                    if (val === 'All') {
                      setSearchParams({});
                    } else {
                      setSearchParams({ category: val });
                    }
                  }}
                  aria-label="Filter by category"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/15 text-sm font-semibold text-[#0B2545] focus:outline-none focus:border-[#1D4ED8]"
                >
                  <option value="All">All Course Categories</option>
                  {CATEGORY_ORDER.map(cat => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Board / Stream Filter */}
            <div className="md:col-span-3">
              <select
                value={boardFilter}
                onChange={e => setBoardFilter(e.target.value)}
                aria-label="Filter by board or exam type"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F1F5F9] border border-[#0B2545]/15 text-sm font-semibold text-[#0B2545] focus:outline-none focus:border-[#1D4ED8]"
              >
                <option value="All">All Boards & Exam Bodies</option>
                <option value="JKBOSE">JKBOSE Board</option>
                <option value="CBSE">CBSE Board</option>
                <option value="University">University (B.A. / B.Sc.)</option>
                <option value="Entrance">JEE / NEET / NDA / CDS</option>
                <option value="JKSSB">JKSSB</option>
                <option value="SSC">SSC</option>
              </select>
            </div>
          </div>

          {/* Category Quick Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#0B2545]/10">
            <div className="flex flex-wrap items-center gap-2">
              {['All', ...CATEGORY_ORDER.map(c => c.name)].map(catName => (
                <button
                  key={catName}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(catName);
                    if (catName === 'All') setSearchParams({});
                    else setSearchParams({ category: catName });
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    selectedCategory === catName
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-[#F1F5F9] text-[#0B2545]/80 hover:bg-[#1D4ED8]/15'
                  }`}
                >
                  {catName}
                </button>
              ))}
            </div>
            <span className="text-xs font-semibold text-[#0B2545]/65">
              Showing <strong>{filteredCourses.length}</strong> of {courses.length} courses
            </span>
          </div>
        </div>
      </section>

      {/* Grouped Course Categories Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#0B2545]/10 p-8">
            <h3 className="font-serif-display text-2xl font-bold text-[#0B2545]">
              No matching courses found
            </h3>
            <p className="text-sm text-[#0B2545]/70 mt-2">
              Try clearing your search filter or enquire directly for customized batch or Home Tuition options.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setBoardFilter('All');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
              <button
                type="button"
                onClick={() => openEnquiryModal('Custom Course / Home Tuition Enquiry', 'Admission')}
                className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-[#0B2545] text-xs font-bold cursor-pointer"
              >
                Enquire Directly
              </button>
            </div>
          </div>
        ) : (
          groupedCategories.map((catObj, idx) => {
            const catCourses = filteredCourses.filter(
              c => c.category.toLowerCase() === catObj.name.toLowerCase()
            );
            if (catCourses.length === 0) return null;
            const Icon = catObj.icon || BookOpen;

            return (
              <div key={idx} className="space-y-6">
                {/* Category Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0B2545]/10">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B2545] text-[#F59E0B] flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0B2545]">
                          {catObj.name}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1D4ED8]/10 text-[#1D4ED8] text-xs font-bold">
                          {catCourses.length} Programs
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#0B2545]/75 mt-0.5">
                        {catObj.subtitle}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/fees"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:text-[#0B2545] shrink-0"
                  >
                    View Fee Structure
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catCourses.map(course => (
                    <div
                      key={course.id}
                      className="card-elevated rounded-2xl p-6 bg-white flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded-md bg-[#0B2545] text-[#F59E0B] text-[11px] font-bold">
                            {course.board}
                          </span>
                          {course.popular && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F59E0B]/25 text-[#0B2545] text-[11px] font-bold">
                              <Sparkles className="w-3 h-3 text-[#1D4ED8]" /> Popular Batch
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif-display text-xl font-bold text-[#0B2545]">
                          {course.title}
                        </h3>

                        <div className="mt-2 px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-xs font-semibold text-[#1D4ED8]">
                          Eligibility: <span className="text-[#0B2545]">{course.eligibility}</span>
                        </div>

                        <p className="text-sm text-[#0B2545]/75 mt-3 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-[#0B2545]/10">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-[#0B2545]/60 mb-2">
                            Course Highlights
                          </p>
                          <ul className="space-y-1.5">
                            {(course.highlights || []).map((hl, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-xs font-medium text-[#0B2545]/85"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#0B2545]/10 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => openEnquiryModal(course.title, 'Admission')}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#F59E0B] hover:bg-[#F59E0B] text-[#0B2545] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                          Enquire About This Course
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

