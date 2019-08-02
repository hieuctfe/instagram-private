'use strict';
import mysql from 'mysql';

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'P@12345678',
  database: process.env.DB_NAME || 'insta_bot',
  charset: 'utf8mb4',
});

module.exports = db;
