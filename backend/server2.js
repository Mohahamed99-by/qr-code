const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const shortid = require('shortid');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';

// Create Tables Queries
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createQRCodesTableQuery = `
  CREATE TABLE IF NOT EXISTS qr_codes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('url', 'email', 'wifi', 'phone', 'whatsapp', 'location')),
    content TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    qr_code TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Initialize Database
async function initializeDatabase() {
  try {
    const client = await pool.connect();
    await client.query(createUsersTableQuery);
    await client.query(createQRCodesTableQuery);
    client.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Helper Function to Generate QR Code Content
function generateQRCodeContent(type, data) {
  switch (type) {
    case 'url':
      return data.url;
    case 'email':
      return `MATMSG:TO:${data.email};SUB:${data.subject || ''};BODY:${data.body || ''};;`;
    case 'wifi':
      return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};;`;
    case 'phone':
      return `tel:${data.phoneNumber}`;
    case 'whatsapp':
      const message = encodeURIComponent(data.message || '');
      return `https://wa.me/${data.phoneNumber.replace(/\D/g, '')}?text=${message}`;
    case 'location':
      return `geo:${data.latitude},${data.longitude}?q=${data.latitude},${data.longitude}(${encodeURIComponent(data.label || '')})`;
    default:
      throw new Error('Invalid QR code type');
  }
}

// Registration Endpoint
app.post('/register', async (req, res) => {
  const client = await pool.connect();
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const result = await client.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [first_name, last_name, email, hashedPassword]
    );

    res.json({ message: 'User registered successfully', userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, password } = req.body;

    // Find user by email
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      message: 'Login successful', 
      token, 
      user: { 
        id: user.id, 
        first_name: user.first_name, 
        last_name: user.last_name, 
        email: user.email 
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Generate QR Code Endpoint (Protected)
app.post('/generate-qr', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    const { type, data } = req.body;
    const short_code = shortid.generate();

    // Generate content based on type
    const content = generateQRCodeContent(type, data);

    // Generate QR Code
    const qr_code = await QRCode.toDataURL(content, {
      errorCorrectionLevel: 'H',
      width: 300
    });

    // Save to Database with user_id
    const result = await client.query(
      'INSERT INTO qr_codes (user_id, type, content, short_code, qr_code) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [req.user.id, type, content, short_code, qr_code]
    );

    res.json({
      id: result.rows[0].id,
      type,
      content,
      short_code,
      qr_code
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Retrieve User's Saved QR Codes Endpoint (Protected)
app.get('/qr-codes', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM qr_codes WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Delete QR Code Endpoint (Protected)
app.delete('/qr-codes/:id', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    
    // First, verify the QR code belongs to the user
    const qrCode = await client.query(
      'SELECT * FROM qr_codes WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (qrCode.rows.length === 0) {
      return res.status(404).json({ error: 'QR code not found or unauthorized' });
    }

    await client.query('DELETE FROM qr_codes WHERE id = $1', [id]);
    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Protected Route Example
app.get('/protected', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT first_name, last_name FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Initialize Server
const PORT = process.env.PORT || 5000;
initializeDatabase();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
