const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Email configuration
const emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
    }
});

// Verify email configuration
if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    emailTransporter.verify(function(error, success) {
        if (error) {
            console.log('Email configuration error:', error);
        } else {
            console.log('Email server is ready to send messages');
        }
    });
} else {
    console.log('Warning: Email not configured. Set SMTP_USER and SMTP_PASS in .env file');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Initialize database
const dbPath = path.join(__dirname, 'spin.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        country TEXT NOT NULL,
        institution_type TEXT NOT NULL,
        institution_name TEXT NOT NULL,
        role TEXT NOT NULL,
        verified BOOLEAN DEFAULT 0,
        verification_token TEXT,
        verification_token_expires DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Add verification_token column if it doesn't exist (for existing databases)
    db.run(`ALTER TABLE users ADD COLUMN verification_token TEXT`, (err) => {
        // Ignore error if column already exists
    });
    db.run(`ALTER TABLE users ADD COLUMN verification_token_expires DATETIME`, (err) => {
        // Ignore error if column already exists
    });

    // Posts/Datasets table
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        methods TEXT,
        data_type TEXT,
        field_of_study TEXT,
        subtopic TEXT,
        organisms TEXT,
        author_institution TEXT,
        file_path TEXT,
        file_name TEXT,
        file_size INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Tags table
    db.run(`CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )`);

    // Post tags junction table
    db.run(`CREATE TABLE IF NOT EXISTS post_tags (
        post_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (post_id, tag_id),
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    )`);

    console.log('Database tables initialized');
}

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

// Send verification email
async function sendVerificationEmail(email, firstName, verificationToken) {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:8000'}/verify-email.html?token=${verificationToken}`;
    
    const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@spin-repository.com',
        to: email,
        subject: 'Verify Your Spin Account',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #ff6b35 0%, #c1121f 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
                    .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #ff6b35 0%, #c1121f 100%); color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Spin: Scientific Data Repository</h1>
                    </div>
                    <div class="content">
                        <h2>Welcome, ${firstName}!</h2>
                        <p>Thank you for creating an account with Spin. Please verify your email address to complete your registration.</p>
                        <p>Click the button below to verify your email:</p>
                        <a href="${verificationUrl}" class="button">Verify Email Address</a>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
                        <p>This verification link will expire in 24 hours.</p>
                        <p>If you didn't create an account with Spin, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Spin: Scientific Data Repository</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
            Welcome to Spin: Scientific Data Repository!
            
            Thank you for creating an account, ${firstName}. Please verify your email address by clicking the link below:
            
            ${verificationUrl}
            
            This verification link will expire in 24 hours.
            
            If you didn't create an account with Spin, please ignore this email.
        `
    };

    try {
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await emailTransporter.sendMail(mailOptions);
            console.log(`Verification email sent to ${email}`);
            return true;
        } else {
            console.log('Email not configured. Verification token:', verificationToken);
            return false;
        }
    } catch (error) {
        console.error('Error sending verification email:', error);
        return false;
    }
}

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Register new user
app.post('/api/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('country').trim().notEmpty(),
    body('institutionType').isIn(['academia', 'industry', 'government']),
    body('institutionName').trim().notEmpty(),
    body('role').trim().notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, country, institutionType, institutionName, role } = req.body;

    try {
        // Check if user already exists
        db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (row) {
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Generate verification token
            const verificationToken = crypto.randomBytes(32).toString('hex');
            const verificationTokenExpires = new Date();
            verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 24); // 24 hours from now

            // Insert user
            db.run(
                `INSERT INTO users (first_name, last_name, email, password, country, institution_type, institution_name, role, verification_token, verification_token_expires)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [firstName, lastName, email, hashedPassword, country, institutionType, institutionName, role, verificationToken, verificationTokenExpires.toISOString()],
                async function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to create user' });
                    }

                    // Send verification email
                    const emailSent = await sendVerificationEmail(email, firstName, verificationToken);
                    
                    if (!emailSent && process.env.SMTP_USER && process.env.SMTP_PASS) {
                        console.error('Failed to send verification email, but user was created');
                    }

                    res.status(201).json({
                        message: 'User registered successfully. Please check your email to verify your account.',
                        requiresVerification: true,
                        emailSent: emailSent,
                        user: {
                            id: this.lastID,
                            email: email,
                            firstName: firstName,
                            lastName: lastName
                        }
                    });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
app.post('/api/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if email is verified
        if (!user.verified) {
            return res.status(403).json({ 
                error: 'Email not verified. Please check your email and verify your account.',
                requiresVerification: true
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                institutionName: user.institution_name,
                role: user.role
            }
        });
    });
});

// Verify email
app.get('/api/verify-email', (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'Verification token is required' });
    }

    db.get('SELECT * FROM users WHERE verification_token = ?', [token], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(400).json({ error: 'Invalid verification token' });
        }

        // Check if token has expired
        const now = new Date();
        const expires = new Date(user.verification_token_expires);
        if (now > expires) {
            return res.status(400).json({ error: 'Verification token has expired. Please request a new one.' });
        }

        // Check if already verified
        if (user.verified) {
            return res.json({ 
                message: 'Email already verified',
                verified: true
            });
        }

        // Verify the user
        db.run(
            'UPDATE users SET verified = 1, verification_token = NULL, verification_token_expires = NULL WHERE id = ?',
            [user.id],
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to verify email' });
                }

                res.json({
                    message: 'Email verified successfully',
                    verified: true
                });
            }
        );
    });
});

// Resend verification email
app.post('/api/resend-verification', [
    body('email').isEmail().normalizeEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.verified) {
            return res.json({ message: 'Email already verified' });
        }

        // Generate new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpires = new Date();
        verificationTokenExpires.setHours(verificationTokenExpires.getHours() + 24);

        db.run(
            'UPDATE users SET verification_token = ?, verification_token_expires = ? WHERE id = ?',
            [verificationToken, verificationTokenExpires.toISOString(), user.id],
            async function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to update verification token' });
                }

                const emailSent = await sendVerificationEmail(email, user.first_name, verificationToken);
                
                res.json({
                    message: 'Verification email sent',
                    emailSent: emailSent
                });
            }
        );
    });
});

// Get current user profile
app.get('/api/me', authenticateToken, (req, res) => {
    db.get('SELECT id, first_name, last_name, email, country, institution_type, institution_name, role, verified, created_at FROM users WHERE id = ?', 
        [req.user.id], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            country: user.country,
            institutionType: user.institution_type,
            institutionName: user.institution_name,
            role: user.role,
            verified: user.verified === 1,
            createdAt: user.created_at
        });
    });
});

// ============================================
// POSTS/DATASETS ROUTES
// ============================================

// Create new post/dataset
app.post('/api/posts', authenticateToken, upload.single('dataFile'), [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        description,
        methods,
        dataType,
        fieldOfStudy,
        subtopic,
        organisms,
        authorInstitution,
        tags
    } = req.body;

    const filePath = req.file ? req.file.path : null;
    const fileName = req.file ? req.file.originalname : null;
    const fileSize = req.file ? req.file.size : null;

    db.run(
        `INSERT INTO posts (user_id, title, description, methods, data_type, field_of_study, subtopic, organisms, author_institution, file_path, file_name, file_size)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, title, description, methods || null, dataType || null, fieldOfStudy || null, 
         subtopic || null, organisms || null, authorInstitution || null, filePath, fileName, fileSize],
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to create post' });
            }

            const postId = this.lastID;

            // Handle tags
            if (tags) {
                const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
                
                tagArray.forEach(tagName => {
                    if (tagName) {
                        // Insert tag if it doesn't exist
                        db.run('INSERT OR IGNORE INTO tags (name) VALUES (?)', [tagName], (err) => {
                            if (!err) {
                                // Get tag ID and link to post
                                db.get('SELECT id FROM tags WHERE name = ?', [tagName], (err, tag) => {
                                    if (!err && tag) {
                                        db.run('INSERT OR IGNORE INTO post_tags (post_id, tag_id) VALUES (?, ?)', 
                                            [postId, tag.id]);
                                    }
                                });
                            }
                        });
                    }
                });
            }

            res.status(201).json({
                message: 'Post created successfully',
                postId: postId
            });
        }
    );
});

// Get all posts with pagination and search
app.get('/api/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const fieldOfStudy = req.query.fieldOfStudy || '';
    const dataType = req.query.dataType || '';
    const author = req.query.author || '';
    const tag = req.query.tag || '';

    let query = `
        SELECT p.*, u.first_name, u.last_name, u.institution_name as author_institution_name,
               GROUP_CONCAT(t.name) as tags
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE 1=1
    `;
    const params = [];

    if (search) {
        query += ' AND (p.title LIKE ? OR p.description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }
    if (fieldOfStudy) {
        query += ' AND p.field_of_study = ?';
        params.push(fieldOfStudy);
    }
    if (dataType) {
        query += ' AND p.data_type = ?';
        params.push(dataType);
    }
    if (author) {
        query += ' AND (u.first_name LIKE ? OR u.last_name LIKE ?)';
        params.push(`%${author}%`, `%${author}%`);
    }

    query += ' GROUP BY p.id ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    db.all(query, params, (err, posts) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        // Get total count
        db.get('SELECT COUNT(*) as total FROM posts', (err, count) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            res.json({
                posts: posts.map(post => ({
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    methods: post.methods,
                    dataType: post.data_type,
                    fieldOfStudy: post.field_of_study,
                    subtopic: post.subtopic,
                    organisms: post.organisms,
                    author: `${post.first_name} ${post.last_name}`,
                    authorInstitution: post.author_institution_name,
                    tags: post.tags ? post.tags.split(',') : [],
                    createdAt: post.created_at,
                    fileName: post.file_name,
                    fileSize: post.file_size
                })),
                pagination: {
                    page: page,
                    limit: limit,
                    total: count.total,
                    totalPages: Math.ceil(count.total / limit)
                }
            });
        });
    });
});

// Get single post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    db.get(`
        SELECT p.*, u.first_name, u.last_name, u.email, u.institution_name as author_institution_name,
               GROUP_CONCAT(t.name) as tags
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE p.id = ?
        GROUP BY p.id
    `, [postId], (err, post) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({
            id: post.id,
            title: post.title,
            description: post.description,
            methods: post.methods,
            dataType: post.data_type,
            fieldOfStudy: post.field_of_study,
            subtopic: post.subtopic,
            organisms: post.organisms,
            author: `${post.first_name} ${post.last_name}`,
            authorEmail: post.email,
            authorInstitution: post.author_institution_name,
            tags: post.tags ? post.tags.split(',') : [],
            createdAt: post.created_at,
            fileName: post.file_name,
            fileSize: post.file_size,
            filePath: post.file_path
        });
    });
});

// Get featured posts (most recent, can be customized)
app.get('/api/posts/featured', (req, res) => {
    db.all(`
        SELECT p.*, u.first_name, u.last_name, u.institution_name as author_institution_name,
               GROUP_CONCAT(t.name) as tags
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        GROUP BY p.id
        ORDER BY p.created_at DESC
        LIMIT 3
    `, (err, posts) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            methods: post.methods,
            dataType: post.data_type,
            fieldOfStudy: post.field_of_study,
            author: `${post.first_name} ${post.last_name}`,
            authorInstitution: post.author_institution_name,
            tags: post.tags ? post.tags.split(',') : [],
            createdAt: post.created_at
        })));
    });
});

// Get user's posts
app.get('/api/users/:userId/posts', authenticateToken, (req, res) => {
    const userId = req.params.userId;

    // Users can only see their own posts unless it's public
    if (parseInt(userId) !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
    }

    db.all(`
        SELECT p.*, GROUP_CONCAT(t.name) as tags
        FROM posts p
        LEFT JOIN post_tags pt ON p.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        WHERE p.user_id = ?
        GROUP BY p.id
        ORDER BY p.created_at DESC
    `, [userId], (err, posts) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(posts.map(post => ({
            id: post.id,
            title: post.title,
            description: post.description,
            methods: post.methods,
            dataType: post.data_type,
            fieldOfStudy: post.field_of_study,
            tags: post.tags ? post.tags.split(',') : [],
            createdAt: post.created_at
        })));
    });
});

// ============================================
// USER PROFILE ROUTES
// ============================================

// Get user profile by ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.get(`
        SELECT id, first_name, last_name, email, country, institution_type, institution_name, role, verified, created_at,
               (SELECT COUNT(*) FROM posts WHERE user_id = users.id) as post_count
        FROM users
        WHERE id = ?
    `, [userId], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            country: user.country,
            institutionType: user.institution_type,
            institutionName: user.institution_name,
            role: user.role,
            verified: user.verified === 1,
            createdAt: user.created_at,
            postCount: user.post_count
        });
    });
});

// Update user profile
app.put('/api/users/:id', authenticateToken, [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('country').optional().trim().notEmpty()
], (req, res) => {
    if (parseInt(req.params.id) !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const { firstName, lastName, country, institutionName } = req.body;
    const updates = [];
    const params = [];

    if (firstName) {
        updates.push('first_name = ?');
        params.push(firstName);
    }
    if (lastName) {
        updates.push('last_name = ?');
        params.push(lastName);
    }
    if (country) {
        updates.push('country = ?');
        params.push(country);
    }
    if (institutionName) {
        updates.push('institution_name = ?');
        params.push(institutionName);
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(req.params.id);

    db.run(
        `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
        params,
        function(err) {
            if (err) {
                return res.status(500).json({ error: 'Failed to update profile' });
            }

            res.json({ message: 'Profile updated successfully' });
        }
    );
});

// ============================================
// STATS ROUTES
// ============================================

app.get('/api/stats', (req, res) => {
    db.get(`
        SELECT 
            (SELECT COUNT(*) FROM posts) as datasets,
            (SELECT COUNT(*) FROM users) as researchers,
            (SELECT COUNT(DISTINCT institution_name) FROM users) as institutions,
            (SELECT COUNT(DISTINCT country) FROM users) as countries
    `, (err, stats) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        res.json({
            datasets: stats.datasets,
            researchers: stats.researchers,
            institutions: stats.institutions,
            countries: stats.countries
        });
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed');
        process.exit(0);
    });
});

