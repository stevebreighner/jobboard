const express = require('express');
const pg = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  user: 'stephenbreighner',
  host: 'localhost',
  database: 'jobboard',
  password: '',
  port: 5432,
});

const JWT_SECRET = 'your_jwt_secret_here'; // Use env var in production!

// Ensure users table exists
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => console.log('✅ Users table ensured'))
  .catch(err => console.error('🛑 Table creation error:', err.message));

// JWT token creation helper
function createToken(user) {
  return jwt.sign({ id: user.id, username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
}

// Middleware to authenticate JWT token for protected routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user; // user info available in req.user
    next();
  });
}

// Routes

// Get all table names
app.get('/api/tables', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);
    const tables = result.rows.map(row => row.table_name);
    res.json({ tables });
  } catch (err) {
    console.error('🛑 DB Error:', err.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('🛑 Error fetching jobs:', err.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Register new user
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user/email exists
    const exists = await pool.query('SELECT 1 FROM users WHERE username=$1 OR email=$2', [username, email]);
    if (exists.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );
    const user = result.rows[0];
    const token = createToken(user);

    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (err) {
    console.error('🛑 Registration error:', err.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login existing user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    const token = createToken(user);
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email }, token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Example protected route (get account info)
app.get('/api/account', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('🛑 Account fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch account info' });
  }
});

// (Optional) Logout route — with JWT, logout is usually handled client-side by deleting the token.
// You can also implement token blacklisting if needed.
app.post('/api/logout', (req, res) => {
  // Just respond OK; frontend deletes token
  res.json({ message: 'Logged out' });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
