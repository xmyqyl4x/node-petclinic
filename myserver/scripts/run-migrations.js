require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '..', 'sql');
  const files = fs.readdirSync(migrationsDir).filter((file) => file.endsWith('.sql')).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await pool.query(sql);
    console.log(`Applied migration: ${file}`);
  }

  await pool.end();
}

runMigrations().catch(async (error) => {
  console.error('Migration failed:', error.message);
  try {
    await pool.end();
  } catch (poolError) {
    console.error('Error closing pool:', poolError.message);
  }
  process.exit(1);
});
