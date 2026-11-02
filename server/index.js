const express = require('express');
const cors = require('cors');
const crypto = require('node:crypto');
const path = require('node:path');
const fs = require('node:fs');
const { db, hashPassword } = require('./db');

const app = express();
const PORT = process.env.PORT || 3005;
const JWT_SECRET = process.env.JWT_SECRET || 'vedanta_institute_secret_key_2026_udhampur';

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use('/uploads', express.static(uploadsDir));

// Simple signed token generator & verifier using built-in node:crypto HMAC-SHA256
function createToken(payload) {
  const data = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [data, signature] = token.split('.');
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const parsed = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (parsed.exp && Date.now() > parsed.exp) return null;
    return parsed;
  } catch {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized. Please log in as Administrator.' });
  }
  req.admin = decoded;
  next();
}

// Helper to save base64 image to /uploads if provided
function processImageUpload(imageInput, prefix = 'img') {
  if (!imageInput || typeof imageInput !== 'string') return '';
  if (imageInput.startsWith('data:image/')) {
    const matches = imageInput.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1].replace('+xml', '');
      const buffer = Buffer.from(matches[2], 'base64');
      const filename = `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${ext}`;
      fs.writeFileSync(path.join(uploadsDir, filename), buffer);
      return `/uploads/${filename}`;
    }
  }
  return imageInput.trim();
}

// Helper to fetch all public data in one fast call
function getPublicData() {
  const settingsRows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  for (const row of settingsRows) {
    settings[row.key] = row.value;
  }

  const coursesRaw = db.prepare('SELECT * FROM courses ORDER BY sort_order ASC, id ASC').all();
  const courses = coursesRaw.map(c => ({
    ...c,
    popular: Boolean(c.popular),
    highlights: (() => {
      try {
        return JSON.parse(c.highlights);
      } catch {
        return String(c.highlights).split(',').map(s => s.trim()).filter(Boolean);
      }
    })()
  }));

  const fees = db.prepare('SELECT * FROM fees ORDER BY sort_order ASC, id ASC').all();
  const faculty = db.prepare('SELECT * FROM faculty ORDER BY id ASC').all().map(f => ({
    ...f,
    is_placeholder: Boolean(f.is_placeholder)
  }));
  const gallery = db.prepare('SELECT * FROM gallery ORDER BY id DESC').all().map(g => ({
    ...g,
    is_placeholder: Boolean(g.is_placeholder)
  }));
  const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY id DESC').all().map(t => ({
    ...t,
    is_placeholder: Boolean(t.is_placeholder)
  }));

  return { settings, courses, fees, faculty, gallery, testimonials };
}

// ================= PUBLIC API ROUTES =================

app.get('/api/public/data', (req, res) => {
  try {
    res.json(getPublicData());
  } catch (err) {
    console.error('Error fetching public data:', err);
    res.status(500).json({ error: 'Failed to load institute data' });
  }
});

app.post('/api/enquiries', (req, res) => {
  try {
    const {
      student_name,
      parent_name = '',
      mobile,
      email = '',
      course_interested,
      board = 'CBSE',
      preferred_batch = 'Morning Batch',
      message = '',
      enquiry_type = 'Admission'
    } = req.body || {};

    if (!student_name || String(student_name).trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid Student / Enquirer Name.' });
    }
    const cleanMobile = String(mobile || '').replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      return res.status(400).json({ error: 'Please provide a valid 10-digit Mobile Number.' });
    }
    if (!course_interested || String(course_interested).trim().length === 0) {
      return res.status(400).json({ error: 'Please select a Class or Course of interest.' });
    }

    const stmt = db.prepare(`
      INSERT INTO enquiries (student_name, parent_name, mobile, email, course_interested, board, preferred_batch, message, enquiry_type, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')
    `);
    const result = stmt.run(
      String(student_name).trim(),
      String(parent_name || '').trim(),
      String(mobile).trim(),
      String(email || '').trim(),
      String(course_interested).trim(),
      String(board || 'CBSE').trim(),
      String(preferred_batch || 'Morning Batch').trim(),
      String(message || '').trim(),
      String(enquiry_type || 'Admission').trim()
    );

    res.status(201).json({
      success: true,
      id: Number(result.lastInsertRowid),
      message: 'Your enquiry has been recorded successfully. Vedanta Institute will contact you shortly.'
    });
  } catch (err) {
    console.error('Error submitting enquiry:', err);
    res.status(500).json({ error: 'Could not submit your enquiry. Please try again.' });
  }
});

// ================= ADMIN AUTH ROUTES =================

app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
    const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(String(username).trim());
    if (!user || user.password_hash !== hashPassword(String(password))) {
      return res.status(401).json({ error: 'Invalid administrator username or password.' });
    }
    const token = createToken({ id: user.id, username: user.username });
    res.json({ token, username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.get('/api/admin/verify', requireAdmin, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

app.put('/api/admin/password', requireAdmin, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!newPassword || String(newPassword).length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters.' });
    }
    const user = db.prepare('SELECT * FROM admin_users WHERE id = ?').get(req.admin.id);
    if (!user || user.password_hash !== hashPassword(String(currentPassword || ''))) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }
    db.prepare('UPDATE admin_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(hashPassword(String(newPassword)), req.admin.id);
    res.json({ success: true, message: 'Admin password updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update password.' });
  }
});

// ================= ADMIN SETTINGS ROUTES =================

app.put('/api/admin/settings', requireAdmin, (req, res) => {
  try {
    const updates = req.body || {};
    const upsert = db.prepare(`
      INSERT INTO settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `);
    for (const [key, value] of Object.entries(updates)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        upsert.run(key, String(value));
      }
    }
    res.json({ success: true, data: getPublicData().settings });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ error: 'Failed to update institute settings' });
  }
});

// ================= ADMIN COURSES CRUD =================

app.post('/api/admin/courses', requireAdmin, (req, res) => {
  try {
    const {
      title,
      category = 'School Education',
      board = 'JKBOSE & CBSE',
      eligibility = 'Open to eligible students',
      description = '',
      highlights = [],
      popular = false,
      sort_order = 100
    } = req.body || {};

    if (!title) return res.status(400).json({ error: 'Course title is required.' });
    const parsedHighlights = Array.isArray(highlights)
      ? JSON.stringify(highlights)
      : JSON.stringify(String(highlights).split(',').map(s => s.trim()).filter(Boolean));

    const result = db.prepare(`
      INSERT INTO courses (title, category, board, eligibility, description, highlights, popular, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      String(title).trim(),
      String(category).trim(),
      String(board).trim(),
      String(eligibility).trim(),
      String(description).trim(),
      parsedHighlights,
      popular ? 1 : 0,
      Number(sort_order) || 100
    );

    res.status(201).json({ success: true, id: Number(result.lastInsertRowid), courses: getPublicData().courses });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: 'Failed to add course' });
  }
});

app.put('/api/admin/courses/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      category,
      board,
      eligibility,
      description,
      highlights = [],
      popular = false,
      sort_order = 100
    } = req.body || {};

    if (!title) return res.status(400).json({ error: 'Course title is required.' });
    const parsedHighlights = Array.isArray(highlights)
      ? JSON.stringify(highlights)
      : JSON.stringify(String(highlights).split(',').map(s => s.trim()).filter(Boolean));

    db.prepare(`
      UPDATE courses
      SET title = ?, category = ?, board = ?, eligibility = ?, description = ?, highlights = ?, popular = ?, sort_order = ?
      WHERE id = ?
    `).run(
      String(title).trim(),
      String(category).trim(),
      String(board).trim(),
      String(eligibility).trim(),
      String(description).trim(),
      parsedHighlights,
      popular ? 1 : 0,
      Number(sort_order) || 100,
      id
    );

    res.json({ success: true, courses: getPublicData().courses });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

app.delete('/api/admin/courses/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM courses WHERE id = ?').run(Number(req.params.id));
    res.json({ success: true, courses: getPublicData().courses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// ================= ADMIN FEES CRUD =================

app.post('/api/admin/fees', requireAdmin, (req, res) => {
  try {
    const {
      group_name = 'Classes 5th to 8th',
      course_name,
      monthly_fee = '[To Be Updated by Admin]',
      admission_fee = '[To Be Updated by Admin]',
      study_material_fee = '[To Be Updated by Admin]',
      other_charges = '[To Be Updated by Admin]',
      sort_order = 100
    } = req.body || {};

    if (!course_name) return res.status(400).json({ error: 'Course/Class name is required.' });

    db.prepare(`
      INSERT INTO fees (group_name, course_name, monthly_fee, admission_fee, study_material_fee, other_charges, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      String(group_name).trim(),
      String(course_name).trim(),
      String(monthly_fee).trim(),
      String(admission_fee).trim(),
      String(study_material_fee).trim(),
      String(other_charges).trim(),
      Number(sort_order) || 100
    );

    res.status(201).json({ success: true, fees: getPublicData().fees });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add fee row' });
  }
});

app.put('/api/admin/fees/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      group_name,
      course_name,
      monthly_fee,
      admission_fee,
      study_material_fee,
      other_charges,
      sort_order = 100
    } = req.body || {};

    db.prepare(`
      UPDATE fees
      SET group_name = ?, course_name = ?, monthly_fee = ?, admission_fee = ?, study_material_fee = ?, other_charges = ?, sort_order = ?
      WHERE id = ?
    `).run(
      String(group_name).trim(),
      String(course_name).trim(),
      String(monthly_fee).trim(),
      String(admission_fee).trim(),
      String(study_material_fee).trim(),
      String(other_charges).trim(),
      Number(sort_order) || 100,
      id
    );

    res.json({ success: true, fees: getPublicData().fees });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update fee structure' });
  }
});

app.delete('/api/admin/fees/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM fees WHERE id = ?').run(Number(req.params.id));
    res.json({ success: true, fees: getPublicData().fees });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete fee entry' });
  }
});

// ================= ADMIN FACULTY CRUD =================

app.post('/api/admin/faculty', requireAdmin, (req, res) => {
  try {
    const {
      name,
      role,
      department = '',
      qualifications = '',
      experience = '',
      bio = '',
      photo_url = '',
      is_placeholder = false
    } = req.body || {};

    if (!name || !role) return res.status(400).json({ error: 'Faculty name and role are required.' });
    const savedPhoto = processImageUpload(photo_url, 'faculty');

    db.prepare(`
      INSERT INTO faculty (name, role, department, qualifications, experience, bio, photo_url, is_placeholder)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      String(name).trim(),
      String(role).trim(),
      String(department).trim(),
      String(qualifications).trim(),
      String(experience).trim(),
      String(bio).trim(),
      savedPhoto,
      is_placeholder ? 1 : 0
    );

    res.status(201).json({ success: true, faculty: getPublicData().faculty });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add faculty member' });
  }
});

app.put('/api/admin/faculty/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      name,
      role,
      department = '',
      qualifications = '',
      experience = '',
      bio = '',
      photo_url = '',
      is_placeholder = false
    } = req.body || {};

    const savedPhoto = processImageUpload(photo_url, 'faculty');

    db.prepare(`
      UPDATE faculty
      SET name = ?, role = ?, department = ?, qualifications = ?, experience = ?, bio = ?, photo_url = ?, is_placeholder = ?
      WHERE id = ?
    `).run(
      String(name).trim(),
      String(role).trim(),
      String(department).trim(),
      String(qualifications).trim(),
      String(experience).trim(),
      String(bio).trim(),
      savedPhoto,
      is_placeholder ? 1 : 0,
      id
    );

    res.json({ success: true, faculty: getPublicData().faculty });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update faculty profile' });
  }
});

app.delete('/api/admin/faculty/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM faculty WHERE id = ?').run(Number(req.params.id));
    res.json({ success: true, faculty: getPublicData().faculty });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete faculty profile' });
  }
});

// ================= ADMIN GALLERY CRUD =================

app.post('/api/admin/gallery', requireAdmin, (req, res) => {
  try {
    const {
      title,
      category = 'Classroom Activities',
      description = '',
      image_url = '',
      is_placeholder = false
    } = req.body || {};

    if (!title) return res.status(400).json({ error: 'Gallery item title is required.' });
    const savedImage = processImageUpload(image_url, 'gallery');

    db.prepare(`
      INSERT INTO gallery (title, category, description, image_url, is_placeholder)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      String(title).trim(),
      String(category).trim(),
      String(description).trim(),
      savedImage,
      savedImage ? 0 : (is_placeholder ? 1 : 0)
    );

    res.status(201).json({ success: true, gallery: getPublicData().gallery });
  } catch (err) {
    console.error('Error uploading gallery item:', err);
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

app.put('/api/admin/gallery/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      category,
      description = '',
      image_url = '',
      is_placeholder = false
    } = req.body || {};

    const savedImage = processImageUpload(image_url, 'gallery');

    db.prepare(`
      UPDATE gallery
      SET title = ?, category = ?, description = ?, image_url = ?, is_placeholder = ?
      WHERE id = ?
    `).run(
      String(title).trim(),
      String(category).trim(),
      String(description).trim(),
      savedImage,
      savedImage ? 0 : (is_placeholder ? 1 : 0),
      id
    );

    res.json({ success: true, gallery: getPublicData().gallery });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

app.delete('/api/admin/gallery/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM gallery WHERE id = ?').run(Number(req.params.id));
    res.json({ success: true, gallery: getPublicData().gallery });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// ================= ADMIN TESTIMONIALS CRUD =================

app.post('/api/admin/testimonials', requireAdmin, (req, res) => {
  try {
    const {
      author_name,
      author_role = 'Student',
      course_tag = 'School Education',
      content,
      rating = 5,
      is_placeholder = false
    } = req.body || {};

    if (!author_name || !content) return res.status(400).json({ error: 'Author name and feedback content are required.' });

    db.prepare(`
      INSERT INTO testimonials (author_name, author_role, course_tag, content, rating, is_placeholder)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      String(author_name).trim(),
      String(author_role).trim(),
      String(course_tag).trim(),
      String(content).trim(),
      Number(rating) || 5,
      is_placeholder ? 1 : 0
    );

    res.status(201).json({ success: true, testimonials: getPublicData().testimonials });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

app.put('/api/admin/testimonials/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      author_name,
      author_role,
      course_tag,
      content,
      rating = 5,
      is_placeholder = false
    } = req.body || {};

    db.prepare(`
      UPDATE testimonials
      SET author_name = ?, author_role = ?, course_tag = ?, content = ?, rating = ?, is_placeholder = ?
      WHERE id = ?
    `).run(
      String(author_name).trim(),
      String(author_role).trim(),
      String(course_tag).trim(),
      String(content).trim(),
      Number(rating) || 5,
      is_placeholder ? 1 : 0,
      id
    );

    res.json({ success: true, testimonials: getPublicData().testimonials });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/admin/testimonials/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM testimonials WHERE id = ?').run(Number(req.params.id));
    res.json({ success: true, testimonials: getPublicData().testimonials });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// ================= ADMIN ENQUIRIES MANAGEMENT =================

app.get('/api/admin/enquiries', requireAdmin, (req, res) => {
  try {
    const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
    res.json({ enquiries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

app.put('/api/admin/enquiries/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body || {};
    db.prepare('UPDATE enquiries SET status = ? WHERE id = ?').run(String(status || 'Contacted'), id);
    const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
    res.json({ success: true, enquiries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update enquiry status' });
  }
});

app.delete('/api/admin/enquiries/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM enquiries WHERE id = ?').run(Number(req.params.id));
    const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY id DESC').all();
    res.json({ success: true, enquiries });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

// ================= FRONTEND SERVING (VITE / STATIC) =================

async function startServer() {
  const distPath = path.join(__dirname, '..', 'dist');
  const useStaticDist = process.env.VITE_DEV !== 'true' && fs.existsSync(path.join(distPath, 'index.html'));

  if (useStaticDist) {
    app.use(express.static(distPath));
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Vedanta Institute Server running at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
