import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Info,
  Phone,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const FEE_GROUPS = [
  'Classes 5th to 8th',
  'Classes 9th and 10th',
  'Classes 11th and 12th',
  'Graduation Courses',
  'Competitive Examination Preparation',
  'Job-Oriented Courses'
];

export default function FeeStructurePage() {
  const { fees, settings, openEnquiryModal } = useInstitute();

  useEffect(() => {
    document.title = 'Fee Structure | VEDANTA INSTITUTE – Udhampur, J&K';
  }, []);

  // Group fee rows while preserving any custom group names added via Admin
  const allGroupNames = Array.from(
    new Set([...FEE_GROUPS, ...fees.map(f => f.group_name)])
  );

  return (
    <div className="pb-20">
      {/* Page Header */}
      <section className="hero-mesh text-white py-16 border-b-4 border-[#D6B66B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6B66B] text-[#09090B] text-xs font-extrabold uppercase tracking-wider">
                Transparent Institutional Fee Schedule
              </span>
              <h1 className="font-serif-display text-4xl sm:text-5xl font-extrabold mt-4">
                Course-Wise <span className="text-[#D6B66B]">Fee Structure</span>
              </h1>
              <p className="text-white/85 text-base sm:text-lg mt-3 leading-relaxed">
                Organized fee tables for School Education (Classes 5th–12th), Graduation (B.A. & B.Sc. Mathematics), Competitive Examinations (JEE, NEET, NDA, CDS) and Job-Oriented Batches (JKSSB & SSC).
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => openEnquiryModal('Fee Structure & Batch Enquiry', 'Fee Structure')}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-[#D6B66B] hover:bg-[#D6B66B] text-[#09090B] font-extrabold text-sm shadow-lg transition-all cursor-pointer"
              >
                Enquire About Fees
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Required Institutional Note & Admin Edit Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="rounded-2xl bg-[#FFFFFF] border-2 border-[#D6B66B] p-5 sm:p-6 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#09090B] text-[#D6B66B] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif-display text-lg font-bold text-[#09090B]">
                For the latest fee details and available batches, please contact the institute.
              </p>
              <p className="text-xs sm:text-sm text-[#09090B]/75 mt-1">
                All fee fields below are managed directly by the institute administration via the{' '}
                <Link to="/admin" className="text-[#8C702B] font-bold underline">
                  Admin Dashboard
                </Link>
                . Unfilled placeholders indicate fees that depend on subject combinations, stream selection, or batch duration.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal('Fee Structure Enquiry', 'Fee Structure')}
              className="px-4 py-2.5 rounded-xl bg-[#8C702B] hover:bg-[#09090B] text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Enquire About Fees
            </button>
            <a
              href={`tel:+91${settings.phone_primary}`}
              className="px-4 py-2.5 rounded-xl bg-[#09090B] text-[#D6B66B] font-mono-num font-bold text-xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 {settings.phone_primary}
            </a>
          </div>
        </div>
      </section>

      {/* Separate Fee Tables */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {allGroupNames.map((groupName, gIdx) => {
          const groupRows = fees.filter(
            f => f.group_name.toLowerCase() === groupName.toLowerCase()
          );
          if (groupRows.length === 0) return null;

          return (
            <div
              key={gIdx}
              className="rounded-2xl bg-white border border-[#09090B]/12 shadow-sm overflow-hidden"
            >
              {/* Table Header Bar */}
              <div className="bg-[#09090B] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#D6B66B]">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="w-5 h-5 text-[#D6B66B]" />
                  <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
                    {groupName}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#D6B66B]">
                  {groupRows.length} {groupRows.length === 1 ? 'Course' : 'Courses / Classes'}
                </span>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F9F5EB] border-b border-[#09090B]/10 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#09090B]">
                      <th className="py-3.5 px-5 min-w-[230px]">Course / Class</th>
                      <th className="py-3.5 px-4 min-w-[150px]">Monthly Fee</th>
                      <th className="py-3.5 px-4 min-w-[150px]">Admission Fee</th>
                      <th className="py-3.5 px-4 min-w-[170px]">Study Material Charges</th>
                      <th className="py-3.5 px-4 min-w-[150px]">Other Charges</th>
                      <th className="py-3.5 px-4 text-right min-w-[130px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#09090B]/10 text-sm">
                    {groupRows.map(row => {
                      const renderCell = val => {
                        const isPlaceholder =
                          !val ||
                          val.includes('[') ||
                          val.toLowerCase().includes('to be updated');
                        return isPlaceholder ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F9F5EB] border border-[#D6B66B]/45 text-zinc-900 text-xs font-medium">
                            {val || '[To Be Updated by Admin]'}
                          </span>
                        ) : (
                          <span className="font-mono-num font-bold text-[#09090B]">{val}</span>
                        );
                      };

                      return (
                        <tr
                          key={row.id}
                          className="hover:bg-[#F9F5EB]/60 transition-colors"
                        >
                          <td className="py-4 px-5 font-bold text-[#09090B]">
                            {row.course_name}
                          </td>
                          <td className="py-4 px-4">{renderCell(row.monthly_fee)}</td>
                          <td className="py-4 px-4">{renderCell(row.admission_fee)}</td>
                          <td className="py-4 px-4">{renderCell(row.study_material_fee)}</td>
                          <td className="py-4 px-4">{renderCell(row.other_charges)}</td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                openEnquiryModal(row.course_name, 'Fee Structure')
                              }
                              className="px-3 py-1.5 rounded-lg bg-[#D6B66B] hover:bg-[#D6B66B] text-[#09090B] font-bold text-xs transition-colors cursor-pointer"
                            >
                              Enquire Fee
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom Enquiry CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-[#09090B] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Need Exact Fee Details for Your Subject Combination?
            </h3>
            <p className="text-sm text-white/80">
              For the latest fee details and available batches, please contact the institute or submit a fee enquiry.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openEnquiryModal('Fee Structure & Installment Query', 'Fee Structure')}
              className="px-6 py-3.5 rounded-xl bg-[#D6B66B] hover:bg-[#D6B66B] text-[#09090B] font-extrabold text-sm cursor-pointer"
            >
              Enquire About Fees
            </button>
            <Link
              to="/admin"
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#D6B66B]" />
              Update Fees (Admin)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

