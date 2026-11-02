import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  BookOpen,
  FileSpreadsheet,
  Users,
  Camera,
  Inbox,
  MessageSquareQuote,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Upload,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useInstitute } from '../context/InstituteContext';

const TOKEN_KEY = 'vedanta_admin_token';

// Helper to convert uploaded File to Base64 data URL
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminDashboardPage() {
  const {
    settings,
    courses,
    fees,
    faculty,
    gallery,
    testimonials,
    refreshData
  } = useInstitute();

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [authVerified, setAuthVerified] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('enquiries');
  const [toast, setToast] = useState(null);

  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);

  // Course editor state
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'School Education',
    board: 'JKBOSE & CBSE',
    eligibility: '',
    description: '',
    highlights: '',
    popular: true
  });

  // Fee inline edits state
  const [feeEdits, setFeeEdits] = useState({});
  const [newFeeRow, setNewFeeRow] = useState({
    group_name: 'Classes 5th to 8th',
    course_name: '',
    monthly_fee: '',
    admission_fee: '',
    study_material_fee: '',
    other_charges: ''
  });

  // Faculty editor state
  const [editingFacultyId, setEditingFacultyId] = useState(null);
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    role: '',
    department: '',
    qualifications: 'B.Ed., M.Sc.',
    experience: '',
    bio: '',
    photo_url: ''
  });

  // Gallery editor state
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Classroom Activities',
    description: '',
    image_url: ''
  });

  // Testimonial editor state
  const [testimonialForm, setTestimonialForm] = useState({
    author_name: '',
    author_role: '',
    course_tag: 'School Education',
    content: '',
    rating: 5
  });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: ''
  });

  useEffect(() => {
    document.title = 'Admin Dashboard | VEDANTA INSTITUTE Content Management System';
  }, []);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  const showNotice = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3800);
  };

  const authFetch = useCallback(
    async (url, options = {}) => {
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`
      };
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken('');
        setAuthVerified(false);
      }
      return res;
    },
    [token]
  );

  const loadEnquiries = useCallback(async () => {
    if (!token) return;
    try {
      const res = await authFetch('/api/admin/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    }
  }, [token, authFetch]);

  useEffect(() => {
    if (!token) {
      setAuthVerified(false);
      return;
    }
    authFetch('/api/admin/verify')
      .then(res => {
        if (res.ok) {
          setAuthVerified(true);
          loadEnquiries();
        }
      })
      .catch(() => setAuthVerified(false));
  }, [token, authFetch, loadEnquiries]);

  const handleLogin = async e => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Invalid credentials');
      } else {
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setAuthVerified(true);
      }
    } catch {
      setLoginError('Could not connect to server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setAuthVerified(false);
  };

  // ================= HANDLERS FOR ADMIN ACTIONS =================

  const handleSaveSettings = async e => {
    e.preventDefault();
    const res = await authFetch('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsForm)
    });
    if (res.ok) {
      await refreshData();
      showNotice('Institute settings, announcements & admission status updated!');
    } else {
      showNotice('Failed to update settings.', 'error');
    }
  };

  const handleToggleAdmissions = async () => {
    const nextVal = settings.admissions_open === 'false' ? 'true' : 'false';
    const res = await authFetch('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({ ...settings, admissions_open: nextVal })
    });
    if (res.ok) {
      await refreshData();
      showNotice(
        `Admissions status changed to: ${nextVal === 'true' ? 'OPEN' : 'CLOSED'}`
      );
    }
  };

  // Course CRUD
  const handleSaveCourse = async e => {
    e.preventDefault();
    const payload = {
      ...courseForm,
      highlights: String(courseForm.highlights)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    };
    const url = editingCourse
      ? `/api/admin/courses/${editingCourse.id}`
      : '/api/admin/courses';
    const method = editingCourse ? 'PUT' : 'POST';

    const res = await authFetch(url, {
      method,
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      await refreshData();
      setEditingCourse(null);
      setCourseForm({
        title: '',
        category: 'School Education',
        board: 'JKBOSE & CBSE',
        eligibility: '',
        description: '',
        highlights: '',
        popular: true
      });
      showNotice(editingCourse ? 'Course updated!' : 'New course added!');
    }
  };

  const handleDeleteCourse = async id => {
    const res = await authFetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
    if (res.ok) {
      await refreshData();
      showNotice('Course deleted.');
    }
  };

  // Fee Structure CRUD
  const handleUpdateFeeRow = async row => {
    const edited = feeEdits[row.id] || row;
    const res = await authFetch(`/api/admin/fees/${row.id}`, {
      method: 'PUT',
      body: JSON.stringify(edited)
    });
    if (res.ok) {
      await refreshData();
      showNotice(`Updated fees for ${edited.course_name}`);
    }
  };

  const handleAddFeeRow = async e => {
    e.preventDefault();
    if (!newFeeRow.course_name) return;
    const res = await authFetch('/api/admin/fees', {
      method: 'POST',
      body: JSON.stringify({
        group_name: newFeeRow.group_name,
        course_name: newFeeRow.course_name,
        monthly_fee: newFeeRow.monthly_fee || '[To Be Updated by Admin]',
        admission_fee: newFeeRow.admission_fee || '[To Be Updated by Admin]',
        study_material_fee: newFeeRow.study_material_fee || '[To Be Updated by Admin]',
        other_charges: newFeeRow.other_charges || '[To Be Updated by Admin]'
      })
    });
    if (res.ok) {
      await refreshData();
      setNewFeeRow({
        group_name: 'Classes 5th to 8th',
        course_name: '',
        monthly_fee: '',
        admission_fee: '',
        study_material_fee: '',
        other_charges: ''
      });
      showNotice('Added new fee row!');
    }
  };

  const handleDeleteFeeRow = async id => {
    const res = await authFetch(`/api/admin/fees/${id}`, { method: 'DELETE' });
    if (res.ok) {
      await refreshData();
      showNotice('Fee row removed.');
    }
  };

  // Faculty CRUD
  const handleSaveFaculty = async e => {
    e.preventDefault();
    const url = editingFacultyId
      ? `/api/admin/faculty/${editingFacultyId}`
      : '/api/admin/faculty';
    const method = editingFacultyId ? 'PUT' : 'POST';
    const res = await authFetch(url, {
      method,
      body: JSON.stringify({ ...facultyForm, is_placeholder: false })
    });
    if (res.ok) {
      await refreshData();
      setEditingFacultyId(null);
      setFacultyForm({
        name: '',
        role: '',
        department: '',
        qualifications: 'B.Ed., M.Sc.',
        experience: '',
        bio: '',
        photo_url: ''
      });
      showNotice(editingFacultyId ? 'Faculty profile updated!' : 'Faculty profile added!');
    }
  };

  const handleDeleteFaculty = async id => {
    const res = await authFetch(`/api/admin/faculty/${id}`, { method: 'DELETE' });
    if (res.ok) {
      await refreshData();
      showNotice('Faculty profile removed.');
    }
  };

  // Gallery CRUD
  const handleAddGallery = async e => {
    e.preventDefault();
    const res = await authFetch('/api/admin/gallery', {
      method: 'POST',
      body: JSON.stringify({ ...galleryForm, is_placeholder: false })
    });
    if (res.ok) {
      await refreshData();
      setGalleryForm({
        title: '',
        category: 'Classroom Activities',
        description: '',
        image_url: ''
      });
      showNotice('Gallery photograph uploaded!');
    }
  };

  const handleDeleteGallery = async id => {
    const res = await authFetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    if (res.ok) {
      await refreshData();
      showNotice('Gallery item deleted.');
    }
  };

  // Testimonials CRUD
  const handleAddTestimonial = async e => {
    e.preventDefault();
    const res = await authFetch('/api/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify({ ...testimonialForm, is_placeholder: false })
    });
    if (res.ok) {
      await refreshData();
      setTestimonialForm({
        author_name: '',
        author_role: '',
        course_tag: 'School Education',
        content: '',
        rating: 5
      });
      showNotice('Testimonial published!');
    }
  };

  const handleDeleteTestimonial = async id => {
    const res = await authFetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    if (res.ok) {
      await refreshData();
      showNotice('Testimonial removed.');
    }
  };

  // Enquiries Status Update & Delete
  const handleUpdateEnquiryStatus = async (id, status) => {
    const res = await authFetch(`/api/admin/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      const data = await res.json();
      setEnquiries(data.enquiries || []);
      showNotice(`Enquiry #${id} marked as ${status}`);
    }
  };

  const handleDeleteEnquiry = async id => {
    const res = await authFetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
    if (res.ok) {
      const data = await res.json();
      setEnquiries(data.enquiries || []);
      showNotice('Enquiry deleted.');
    }
  };

  // Password Change
  const handleChangePassword = async e => {
    e.preventDefault();
    const res = await authFetch('/api/admin/password', {
      method: 'PUT',
      body: JSON.stringify(passwordForm)
    });
    const data = await res.json();
    if (res.ok) {
      setPasswordForm({ currentPassword: '', newPassword: '' });
      showNotice('Admin password updated successfully!');
    } else {
      showNotice(data.error || 'Could not update password.', 'error');
    }
  };

  // ================= LOGIN VIEW =================
  if (!authVerified) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center px-4 py-12 bg-[#F4F4F5]">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-[#09090B]/10 overflow-hidden">
          <div className="hero-mesh text-white p-7 text-center border-b-4 border-[#E4E4E7]">
            <div className="w-14 h-14 rounded-2xl bg-[#E4E4E7] text-[#09090B] mx-auto flex items-center justify-center mb-3 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="font-serif-display text-2xl font-bold">
              Vedanta Institute Admin Portal
            </h1>
            <p className="text-xs text-white/80 mt-1">
              Sign in to manage courses, fee structures, faculty, gallery & student enquiries
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-7 space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#09090B] mb-1">
                Administrator Username
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm focus:bg-white focus:outline-none focus:border-[#27272A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#09090B] mb-1">
                Administrator Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm focus:bg-white focus:outline-none focus:border-[#27272A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#09090B] hover:bg-[#27272A] text-[#E4E4E7] font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              Sign In to Admin Dashboard
            </button>

            <div className="p-3.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/10 text-xs text-[#09090B]/75 space-y-1">
              <p className="font-bold text-[#09090B]">Default Owner Credentials:</p>
              <p>
                Username: <code className="font-mono-num font-bold text-[#27272A]">admin</code> | Password:{' '}
                <code className="font-mono-num font-bold text-[#27272A]">vedanta@2026</code>
              </p>
              <button
                type="button"
                onClick={() => setLoginForm({ username: 'admin', password: 'vedanta@2026' })}
                className="text-[#27272A] font-bold underline mt-1 cursor-pointer"
              >
                Click to Auto-Fill Credentials
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ================= AUTHENTICATED DASHBOARD VIEW =================
  const tabs = [
    { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Inbox },
    { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
    { id: 'fees', label: `Fee Structure (${fees.length})`, icon: FileSpreadsheet },
    { id: 'faculty', label: `Faculty (${faculty.length})`, icon: Users },
    { id: 'gallery', label: `Gallery (${gallery.length})`, icon: Camera },
    { id: 'testimonials', label: `Testimonials (${testimonials.length})`, icon: MessageSquareQuote },
    { id: 'settings', label: 'Contact & Announcements', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] pb-20">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -tranzinc-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs sm:text-sm flex items-center gap-2 ${
            toast.type === 'error'
              ? 'bg-red-600 text-white'
              : 'bg-[#09090B] text-[#E4E4E7] border border-[#E4E4E7]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <div className="bg-[#09090B] text-white py-8 border-b-4 border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E4E4E7] text-[#09090B] text-xs font-extrabold uppercase">
              Institute Owner CMS
            </span>
            <h1 className="font-serif-display text-3xl font-bold mt-2">
              Vedanta Institute — Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-white/75 mt-0.5">
              All changes made here are saved immediately to the SQLite database and reflected live across the website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleToggleAdmissions}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer ${
                settings.admissions_open !== 'false'
                  ? 'bg-zinc-800 text-white'
                  : 'bg-zinc-1000 text-[#09090B]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Admissions Status: {settings.admissions_open !== 'false' ? 'OPEN' : 'CLOSED'} (Click to Toggle)
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-2xl shadow-sm border border-[#09090B]/10">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#27272A] text-white shadow-sm'
                    : 'text-[#09090B]/80 hover:bg-[#F4F4F5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* ================= TAB 1: ADMISSION ENQUIRIES ================= */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#09090B]/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#09090B]/10 pb-4">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-[#09090B]">
                  Student Admission & Contact Enquiries
                </h2>
                <p className="text-xs text-[#09090B]/70">
                  View enquiries submitted via the Admissions Page, Quick Modal, or Contact Form.
                </p>
              </div>
              <button
                type="button"
                onClick={loadEnquiries}
                className="px-4 py-2 rounded-xl bg-[#F4F4F5] hover:bg-[#09090B] hover:text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Refresh Enquiries
              </button>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-12 text-sm text-[#09090B]/65">
                No enquiries submitted yet. Submit a test enquiry on the Admissions page to see it here!
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map(enq => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#09090B] text-[#E4E4E7] text-[11px] font-bold">
                          #{enq.id} • {enq.enquiry_type || 'Admission'}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            enq.status === 'New'
                              ? 'bg-zinc-200 text-zinc-900'
                              : enq.status === 'Enrolled'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          Status: {enq.status}
                        </span>
                        <span className="text-xs text-[#09090B]/60">
                          {enq.created_at}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-[#09090B]">
                        Student: {enq.student_name}{' '}
                        {enq.parent_name && (
                          <span className="font-normal text-xs text-[#09090B]/70">
                            (Parent: {enq.parent_name})
                          </span>
                        )}
                      </h3>

                      <p className="text-xs sm:text-sm font-semibold text-[#27272A]">
                        Course: {enq.course_interested} | Board: {enq.board} | Batch: {enq.preferred_batch}
                      </p>

                      {enq.message && (
                        <p className="text-xs text-[#09090B]/80 bg-white p-2.5 rounded-lg border border-[#09090B]/10">
                          “{enq.message}”
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <a
                        href={`tel:${enq.mobile}`}
                        className="px-3 py-2 rounded-xl bg-[#09090B] text-[#E4E4E7] font-mono-num text-xs font-bold flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {enq.mobile}
                      </a>
                      <a
                        href={`https://wa.me/91${enq.mobile.replace(/\D/g, '').slice(-10)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-zinc-800 text-white text-xs font-bold flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <select
                        value={enq.status}
                        onChange={e => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                        aria-label="Update enquiry status"
                        className="px-3 py-2 rounded-xl bg-white border border-[#09090B]/20 text-xs font-bold"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        className="p-2 rounded-xl bg-red-100 hover:bg-red-600 text-red-700 hover:text-white transition-colors cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: COURSES MANAGER ================= */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Add / Edit Course Form */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 h-fit">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B] mb-4">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h2>
              <form onSubmit={handleSaveCourse} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.title}
                    onChange={e => setCourseForm({ ...courseForm, title: e.target.value })}
                    placeholder="e.g. Class 10th Crash Course"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#09090B] mb-1">
                      Category *
                    </label>
                    <select
                      value={courseForm.category}
                      onChange={e => setCourseForm({ ...courseForm, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs font-bold"
                    >
                      <option value="School Education">School Education</option>
                      <option value="Graduation Courses">Graduation Courses</option>
                      <option value="Competitive Examinations">Competitive Examinations</option>
                      <option value="Job-Oriented Courses">Job-Oriented Courses</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#09090B] mb-1">
                      Board / Exam Body *
                    </label>
                    <input
                      type="text"
                      required
                      value={courseForm.board}
                      onChange={e => setCourseForm({ ...courseForm, board: e.target.value })}
                      placeholder="JKBOSE & CBSE"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Eligibility *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.eligibility}
                    onChange={e => setCourseForm({ ...courseForm, eligibility: e.target.value })}
                    placeholder="e.g. Class 10th Appearing Students"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={courseForm.description}
                    onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Describe syllabus, focus areas..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Highlights (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={courseForm.highlights}
                    onChange={e => setCourseForm({ ...courseForm, highlights: e.target.value })}
                    placeholder="Regular Tests, Updated Material, Doubt Clearing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-[#09090B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseForm.popular}
                    onChange={e => setCourseForm({ ...courseForm, popular: e.target.checked })}
                  />
                  Show on Homepage Popular Courses
                </label>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#E4E4E7] text-[#09090B] font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {editingCourse ? 'Update Course' : 'Add Course'}
                  </button>
                  {editingCourse && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCourse(null);
                        setCourseForm({
                          title: '',
                          category: 'School Education',
                          board: 'JKBOSE & CBSE',
                          eligibility: '',
                          description: '',
                          highlights: '',
                          popular: true
                        });
                      }}
                      className="px-4 py-3 rounded-xl bg-gray-200 text-gray-800 text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Courses List */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 space-y-3">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B] mb-2">
                Existing Courses ({courses.length})
              </h2>
              <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
                {courses.map(c => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10 flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-[#27272A]">
                        {c.category} • {c.board}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-[#09090B]">{c.title}</h3>
                      <p className="text-xs text-[#09090B]/70 mt-0.5 line-clamp-2">{c.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCourse(c);
                          setCourseForm({
                            title: c.title,
                            category: c.category,
                            board: c.board,
                            eligibility: c.eligibility,
                            description: c.description,
                            highlights: (c.highlights || []).join(', '),
                            popular: Boolean(c.popular)
                          });
                        }}
                        className="p-2 rounded-lg bg-white hover:bg-[#27272A] hover:text-white text-[#09090B] border border-[#09090B]/10 transition-colors cursor-pointer"
                        title="Edit Course"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FEE STRUCTURE MANAGER ================= */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            {/* Add New Fee Row */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10">
              <h2 className="font-serif-display text-xl font-bold text-[#09090B] mb-3">
                Add New Course / Class Fee Row
              </h2>
              <form
                onSubmit={handleAddFeeRow}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
              >
                <select
                  value={newFeeRow.group_name}
                  onChange={e => setNewFeeRow({ ...newFeeRow, group_name: e.target.value })}
                  className="px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs font-bold"
                >
                  <option value="Classes 5th to 8th">Classes 5th to 8th</option>
                  <option value="Classes 9th and 10th">Classes 9th and 10th</option>
                  <option value="Classes 11th and 12th">Classes 11th and 12th</option>
                  <option value="Graduation Courses">Graduation Courses</option>
                  <option value="Competitive Examination Preparation">Competitive Examination Preparation</option>
                  <option value="Job-Oriented Courses">Job-Oriented Courses</option>
                </select>
                <input
                  type="text"
                  required
                  value={newFeeRow.course_name}
                  onChange={e => setNewFeeRow({ ...newFeeRow, course_name: e.target.value })}
                  placeholder="Course / Class Name *"
                  className="px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                />
                <input
                  type="text"
                  value={newFeeRow.monthly_fee}
                  onChange={e => setNewFeeRow({ ...newFeeRow, monthly_fee: e.target.value })}
                  placeholder="Monthly Fee"
                  className="px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                />
                <input
                  type="text"
                  value={newFeeRow.admission_fee}
                  onChange={e => setNewFeeRow({ ...newFeeRow, admission_fee: e.target.value })}
                  placeholder="Admission Fee"
                  className="px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                />
                <input
                  type="text"
                  value={newFeeRow.study_material_fee}
                  onChange={e => setNewFeeRow({ ...newFeeRow, study_material_fee: e.target.value })}
                  placeholder="Study Material Fee"
                  className="px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#E4E4E7] text-[#09090B] font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Row
                </button>
              </form>
            </div>

            {/* Editable Fee Rows Table */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 overflow-x-auto">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B] mb-1">
                Update Fee Structure Values
              </h2>
              <p className="text-xs text-[#09090B]/70 mb-4">
                Edit any cell below and click <strong>Save</strong> to update the live Fee Structure page.
              </p>

              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#09090B] text-white text-xs">
                    <th className="p-3">Group</th>
                    <th className="p-3">Course / Class</th>
                    <th className="p-3">Monthly Fee</th>
                    <th className="p-3">Admission Fee</th>
                    <th className="p-3">Study Material</th>
                    <th className="p-3">Other Charges</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#09090B]/10 text-xs">
                  {fees.map(row => {
                    const current = feeEdits[row.id] || row;
                    const updateField = (field, val) => {
                      setFeeEdits(prev => ({
                        ...prev,
                        [row.id]: { ...current, [field]: val }
                      }));
                    };

                    return (
                      <tr key={row.id} className="hover:bg-[#F4F4F5]/50">
                        <td className="p-2.5 font-bold text-[#27272A]">{current.group_name}</td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={current.course_name}
                            onChange={e => updateField('course_name', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F4F5] border border-[#09090B]/15 font-bold"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={current.monthly_fee}
                            onChange={e => updateField('monthly_fee', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F4F5] border border-[#09090B]/15 font-mono-num"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={current.admission_fee}
                            onChange={e => updateField('admission_fee', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F4F5] border border-[#09090B]/15 font-mono-num"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={current.study_material_fee}
                            onChange={e => updateField('study_material_fee', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F4F5] border border-[#09090B]/15 font-mono-num"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={current.other_charges}
                            onChange={e => updateField('other_charges', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#F4F4F5] border border-[#09090B]/15 font-mono-num"
                          />
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap space-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateFeeRow(row)}
                            className="px-3 py-1.5 rounded-lg bg-[#09090B] hover:bg-[#27272A] text-[#E4E4E7] font-bold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFeeRow(row.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: FACULTY PROFILES MANAGER ================= */}
        {activeTab === 'faculty' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 h-fit">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B] mb-4">
                {editingFacultyId ? 'Update Faculty Profile' : 'Add Faculty Profile'}
              </h2>
              <form onSubmit={handleSaveFaculty} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Faculty Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={facultyForm.name}
                    onChange={e => setFacultyForm({ ...facultyForm, name: e.target.value })}
                    placeholder="Enter teacher's full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Role / Subject Specialization *
                  </label>
                  <input
                    type="text"
                    required
                    value={facultyForm.role}
                    onChange={e => setFacultyForm({ ...facultyForm, role: e.target.value })}
                    placeholder="e.g. Senior Faculty – Physics & Mathematics"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#09090B] mb-1">
                      Qualifications *
                    </label>
                    <input
                      type="text"
                      required
                      value={facultyForm.qualifications}
                      onChange={e => setFacultyForm({ ...facultyForm, qualifications: e.target.value })}
                      placeholder="M.Sc., B.Ed., Ph.D."
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#09090B] mb-1">
                      Department / Wing
                    </label>
                    <input
                      type="text"
                      value={facultyForm.department}
                      onChange={e => setFacultyForm({ ...facultyForm, department: e.target.value })}
                      placeholder="Science / Competitive Wing"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Experience / Credentials Note
                  </label>
                  <input
                    type="text"
                    value={facultyForm.experience}
                    onChange={e => setFacultyForm({ ...facultyForm, experience: e.target.value })}
                    placeholder="e.g. 8+ Years Teaching Experience"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Short Bio
                  </label>
                  <textarea
                    rows={3}
                    value={facultyForm.bio}
                    onChange={e => setFacultyForm({ ...facultyForm, bio: e.target.value })}
                    placeholder="Brief introduction..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Upload Faculty Photograph (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const dataUrl = await fileToDataUrl(file);
                        setFacultyForm(prev => ({ ...prev, photo_url: dataUrl }));
                      }
                    }}
                    className="w-full text-xs text-[#09090B] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#09090B] file:text-[#E4E4E7] file:font-bold"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#E4E4E7] text-[#09090B] font-extrabold text-xs cursor-pointer"
                  >
                    {editingFacultyId ? 'Save Faculty Changes' : 'Add Faculty Member'}
                  </button>
                  {editingFacultyId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFacultyId(null);
                        setFacultyForm({
                          name: '',
                          role: '',
                          department: '',
                          qualifications: 'B.Ed., M.Sc.',
                          experience: '',
                          bio: '',
                          photo_url: ''
                        });
                      }}
                      className="px-4 py-3 rounded-xl bg-gray-200 text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 space-y-4">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B]">
                Current Faculty Profiles ({faculty.length})
              </h2>
              {faculty.map(f => (
                <div
                  key={f.id}
                  className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#27272A]">{f.department}</span>
                    <h3 className="font-bold text-base text-[#09090B]">{f.name}</h3>
                    <p className="text-xs font-semibold text-[#09090B]/80">{f.role}</p>
                    <p className="text-xs text-[#09090B]/65 mt-1">
                      Qualifications: {f.qualifications}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFacultyId(f.id);
                        setFacultyForm({
                          name: f.name,
                          role: f.role,
                          department: f.department,
                          qualifications: f.qualifications,
                          experience: f.experience,
                          bio: f.bio,
                          photo_url: f.photo_url || ''
                        });
                      }}
                      className="p-2 rounded-lg bg-white hover:bg-[#27272A] hover:text-white text-[#09090B] border border-[#09090B]/10 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaculty(f.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: GALLERY MANAGER ================= */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 h-fit">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B] mb-4">
                Upload Gallery Photograph
              </h2>
              <form onSubmit={handleAddGallery} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Photo Title / Caption *
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="e.g. Class 12th Weekly Test Session"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Gallery Category *
                  </label>
                  <select
                    value={galleryForm.category}
                    onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm font-bold"
                  >
                    <option value="Classroom Activities">Classroom Activities</option>
                    <option value="Teaching Sessions">Teaching Sessions</option>
                    <option value="Institute Events">Institute Events</option>
                    <option value="Student Activities">Student Activities</option>
                    <option value="Celebrations and Achievements">Celebrations and Achievements</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={galleryForm.description}
                    onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    placeholder="Short description of the activity..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Select Image File from Computer
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const dataUrl = await fileToDataUrl(file);
                        setGalleryForm(prev => ({ ...prev, image_url: dataUrl }));
                      }
                    }}
                    className="w-full text-xs text-[#09090B] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-[#09090B] file:text-[#E4E4E7] file:font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E4E4E7] text-[#09090B] font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Publish to Gallery
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 space-y-3">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B]">
                Gallery Items ({gallery.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map(g => (
                  <div
                    key={g.id}
                    className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#27272A]">
                        {g.category}
                      </span>
                      <h3 className="font-bold text-sm text-[#09090B] mt-0.5">{g.title}</h3>
                      <p className="text-xs text-[#09090B]/70 mt-1">{g.description}</p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteGallery(g.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: TESTIMONIALS MANAGER ================= */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 h-fit">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B] mb-4">
                Add Student / Parent Testimonial
              </h2>
              <form onSubmit={handleAddTestimonial} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.author_name}
                    onChange={e =>
                      setTestimonialForm({ ...testimonialForm, author_name: e.target.value })
                    }
                    placeholder="Enter name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Batch / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.author_role}
                    onChange={e =>
                      setTestimonialForm({ ...testimonialForm, author_role: e.target.value })
                    }
                    placeholder="e.g. Class 12th CBSE Student"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Feedback Content *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={testimonialForm.content}
                    onChange={e =>
                      setTestimonialForm({ ...testimonialForm, content: e.target.value })
                    }
                    placeholder="Write testimonial..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E4E4E7] text-[#09090B] font-extrabold text-xs cursor-pointer"
                >
                  Publish Testimonial
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 space-y-3">
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B]">
                Published Testimonials ({testimonials.length})
              </h2>
              {testimonials.map(t => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-[#F4F4F5] border border-[#09090B]/10 flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="font-bold text-sm text-[#09090B]">
                      {t.author_name} <span className="font-normal text-xs">({t.author_role})</span>
                    </h3>
                    <p className="text-xs text-[#09090B]/80 italic mt-1">“{t.content}”</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteTestimonial(t.id)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: INSTITUTE SETTINGS & CONTACT INFO ================= */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form
              onSubmit={handleSaveSettings}
              className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#09090B]/10 space-y-5"
            >
              <h2 className="font-serif-display text-2xl font-bold text-[#09090B]">
                Homepage Announcements, Admissions & Contact Details
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#09090B] mb-1">
                  Homepage Top Announcement Banner
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.announcement_banner || ''}
                  onChange={e =>
                    setSettingsForm({ ...settingsForm, announcement_banner: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Admissions Status
                  </label>
                  <select
                    value={settingsForm.admissions_open || 'true'}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, admissions_open: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm font-bold"
                  >
                    <option value="true">Admissions Open (Show Badge)</option>
                    <option value="false">Admissions Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={settingsForm.contact_person || ''}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, contact_person: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone_primary || ''}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, phone_primary: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm font-mono-num"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Secondary Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone_secondary || ''}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, phone_secondary: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm font-mono-num"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    WhatsApp Number (with 91)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp_number || ''}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm font-mono-num"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#09090B] mb-1">
                  Verified Institute Address
                </label>
                <input
                  type="text"
                  value={settingsForm.address || ''}
                  onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Facebook URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={settingsForm.facebook_url || ''}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, facebook_url: e.target.value })
                    }
                    placeholder="https://facebook.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    Instagram URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={settingsForm.instagram_url || ''}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, instagram_url: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#09090B] mb-1">
                    YouTube URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={settingsForm.youtube_url || ''}
                    onChange={e =>
                      setSettingsForm({ ...settingsForm, youtube_url: e.target.value })
                    }
                    placeholder="https://youtube.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#E4E4E7] text-[#09090B] font-extrabold text-sm flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save All Institute Settings
              </button>
            </form>

            {/* Change Admin Password */}
            <form
              onSubmit={handleChangePassword}
              className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-[#09090B]/10 h-fit space-y-4"
            >
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#27272A]" />
                <h3 className="font-serif-display text-xl font-bold text-[#09090B]">
                  Change Admin Password
                </h3>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#09090B] mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={e =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#09090B] mb-1">
                  New Password (min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={e =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#09090B]/15 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#09090B] text-[#E4E4E7] font-bold text-xs cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

