
require('dotenv').config();
const mysql = require('mysql2');
// Create a connection pool to handle multiple simultaneous requests
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,    // Maximum 10 connections at once
  queueLimit: 0
});

// Convert the pool to use Promises so we can use async/await in our controllers
const promisePool = pool.promise();

// Test the connection immediately when the server starts
promisePool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Pool connected successfully');
    connection.release(); // Important: release the connection back to the pool
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });

module.exports = promisePool;