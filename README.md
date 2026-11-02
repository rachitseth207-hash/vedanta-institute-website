# VEDANTA INSTITUTE – Official Educational Website & Admin Portal

> **Tagline:** *"We Guide You to Achieve – Chase Excellence"*  
> **Location:** Near Shiv Mandir Garhi, Udhampur, Jammu & Kashmir  
> **Contact Person:** Amit Singh (`+91 7298329209` / `+91 7006843738`)

---

## 1. Overview & Architecture

This is a complete, full-stack educational website and content management portal built for **Vedanta Institute**.

- **Frontend:** React 19, React Router 7, Tailwind CSS 4, Lucide Icons, Playfair Display & Plus Jakarta Sans typography.
- **Backend:** Node.js + Express 5 REST API (`server/index.js`).
- **Database:** Built-in `node:sqlite` relational SQLite database (`server/data/vedanta.db`) with zero external database setup required.
- **Colour Palette:**
  - Deep Navy Blue (`#101B3D`)
  - Royal Purple (`#4031A0`)
  - Golden Yellow (`#F5C542`)
  - Warm White (`#FFFDF7`)
  - Light Grey (`#F4F5F8`)

---

## 2. How to Run the Website

```bash
# 1. Install dependencies
npm.cmd install

# 2. Start the full-stack server (API + Frontend on port 3005)
node server/index.js
```

Then open **http://localhost:3005** in your browser.

---

## 3. Admin Dashboard Credentials & Capabilities

Navigate to **http://localhost:3005/admin** (or click **Admin** in the top navigation bar).

- **Default Username:** `admin`
- **Default Password:** `vedanta@2026` *(Can be changed anytime inside the Admin Dashboard under the "Contact & Announcements" tab)*

### What the Institute Owner Can Manage in `/admin`:
1. **Admission & Contact Enquiries:** View student/parent enquiries, filter/update status (`New`, `Contacted`, `Enrolled`, `Closed`), one-click Call or WhatsApp, or delete entries.
2. **Courses Manager:** Add, edit, or delete courses across *School Education (5th–12th, JKBOSE & CBSE)*, *Graduation (B.A., B.Sc. Mathematics)*, *Competitive Exams (JEE, NEET, NDA, CDS)*, and *Job-Oriented Courses (JKSSB, SSC)*.
3. **Fee Structure Manager:** Update Monthly Fee, Admission Fee, Study Material Charges, and Other Charges for any class/course row, or add new fee rows.
4. **Faculty Profiles Manager:** Replace editable placeholder slots with actual faculty names, qualifications (`B.Ed., M.Ed., B.Sc., M.Sc., M.A., M.Phil., Ph.D.`), experience, and upload faculty photographs directly from your device.
5. **Gallery Manager:** Upload classroom, teaching session, event, student activity, and achievement photographs directly from your computer.
6. **Testimonials Manager:** Add or remove student and parent feedback cards.
7. **Institute Settings & Announcements:** Toggle the **"Admissions Open"** status, update the Homepage Announcement Banner, edit phone numbers/address, and configure social media links.
