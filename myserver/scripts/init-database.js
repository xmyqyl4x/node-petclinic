require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const adminConfig = {
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGADMINUSER || process.env.PGUSER || 'postgres',
  password: process.env.PGADMINPASSWORD || process.env.PGPASSWORD || 'postgres',
  database: process.env.PGADMINDATABASE || 'postgres'
};

const appUser = process.env.PGUSER || 'pwere';
const appPassword = process.env.PGPASSWORD || 'pwere';
const appDatabase = process.env.PGDATABASE || 'node-petclinic-db';

async function initDatabase() {
  const adminClient = new Client(adminConfig);

  try {
    await adminClient.connect();

    // Drop the database if it exists (CASCADE via terminating connections first)
    await adminClient.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = $1
        AND pid <> pg_backend_pid()
    `, [appDatabase]);

    const dbExists = await adminClient.query(
      'SELECT 1 FROM pg_database WHERE datname = $1', [appDatabase]
    );
    if (dbExists.rowCount > 0) {
      await adminClient.query(`DROP DATABASE "${appDatabase}"`);
      console.log(`Dropped existing database: ${appDatabase}`);
    }

    // Ensure role exists
    const roleResult = await adminClient.query(
      'SELECT 1 FROM pg_roles WHERE rolname = $1', [appUser]
    );
    if (roleResult.rowCount === 0) {
      await adminClient.query(`CREATE ROLE "${appUser}" LOGIN PASSWORD '${appPassword}'`);
    } else {
      await adminClient.query(`ALTER ROLE "${appUser}" WITH LOGIN PASSWORD '${appPassword}'`);
    }

    // Recreate the database
    await adminClient.query(`CREATE DATABASE "${appDatabase}" OWNER "${appUser}"`);
    console.log(`Created database: ${appDatabase}`);
  } finally {
    await adminClient.end();
  }

  // Connect to the new database to run migrations and seed data
  const appClient = new Client({
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT || 5432),
    user: appUser,
    password: appPassword,
    database: appDatabase
  });

  try {
    await appClient.connect();

    const sqlDir = path.join(__dirname, '..', 'sql');
    const files = fs.readdirSync(sqlDir).filter(f => f.endsWith('.sql')).sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(sqlDir, file), 'utf8');
      await appClient.query(sql);
      console.log(`Applied: ${file}`);
    }

    console.log('Database initialised successfully with all tables and seed data.');
  } finally {
    await appClient.end();
  }
}

initDatabase().catch((error) => {
  console.error('Database initialisation failed:', error.message);
  process.exit(1);
});
