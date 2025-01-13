const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const shortid = require('shortid');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

});

// JWT Secret Key
const JWT_SECRET = 'your_jwt_secret_key';


// Create Tables Queries
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createQRCodesTableQuery = `
  CREATE TABLE IF NOT EXISTS qr_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('url', 'email', 'wifi', 'phone', 'whatsapp', 'location') NOT NULL,
    content TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    qr_code LONGTEXT NOT NULL,
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
    const connection = await pool.getConnection();
    await connection.query(createUsersTableQuery);
    await connection.query(createQRCodesTableQuery);
    connection.release();
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
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if email already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword]
    );

    res.json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
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
  }
});

// Generate QR Code Endpoint (Protected)
app.post('/generate-qr', authenticateToken, async (req, res) => {
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
    const [result] = await pool.query(
      'INSERT INTO qr_codes (user_id, type, content, short_code, qr_code) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, type, content, short_code, qr_code]
    );

    res.json({
      id: result.insertId,
      type,
      content,
      short_code,
      qr_code
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve User's Saved QR Codes Endpoint (Protected)
app.get('/qr-codes', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM qr_codes WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete QR Code Endpoint (Protected)
app.delete('/qr-codes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, verify the QR code belongs to the user
    const [qrCodes] = await pool.query('SELECT * FROM qr_codes WHERE id = ? AND user_id = ?', [id, req.user.id]);
    
    if (qrCodes.length === 0) {
      return res.status(404).json({ error: 'QR code not found or unauthorized' });
    }

    await pool.query('DELETE FROM qr_codes WHERE id = ?', [id]);
    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Protected Route Example
app.get('/protected', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Access granted', user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});







// Initialize Server
const PORT = process.env.PORT || 5000;
initializeDatabase();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
