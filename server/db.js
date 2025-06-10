// server/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'stephenbreighner',   // replace with your DB username if different
  host: 'localhost',
  database: 'jobboard',
  password: '',                // leave blank if no password set
  port: 5432,
});

module.exports = pool;
