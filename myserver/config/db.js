const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'pwere',
  password: process.env.PGPASSWORD || 'pwere',
  database: process.env.PGDATABASE || 'node-petclinic-db'
});

async function testConnection() {
  await pool.query('SELECT 1');
}

module.exports = {
  pool,
  testConnection
};
