const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new Database(dbPath/*, { verbose: console.log }*/);

// Create transactions table
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL
  )
`);

module.exports = db;
