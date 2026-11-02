import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InstituteProvider } from './context/InstituteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import EnquiryModal from './components/EnquiryModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import FeeStructurePage from './pages/FeeStructurePage';
import FacilitiesPage from './pages/FacilitiesPage';
import FacultyPage from './pages/FacultyPage';
import GalleryPage from './pages/GalleryPage';
import AdmissionPage from './pages/AdmissionPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  return (
    <InstituteProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#09090B]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/fees" element={<FeeStructurePage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/admissions" element={<AdmissionPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
          <EnquiryModal />
        </div>
      </BrowserRouter>
    </InstituteProvider>
  );
}

