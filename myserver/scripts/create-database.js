require('dotenv').config();
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

async function createDatabaseArtifacts() {
  const client = new Client(adminConfig);

  try {
    await client.connect();

    const roleResult = await client.query('SELECT 1 FROM pg_roles WHERE rolname = $1', [appUser]);

    if (roleResult.rowCount === 0) {
      await client.query(`CREATE ROLE "${appUser}" LOGIN PASSWORD '${appPassword}'`);
    } else {
      await client.query(`ALTER ROLE "${appUser}" WITH LOGIN PASSWORD '${appPassword}'`);
    }

    const dbResult = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [appDatabase]);

    if (dbResult.rowCount === 0) {
      await client.query(`CREATE DATABASE "${appDatabase}" OWNER "${appUser}"`);
    }

    console.log(`Database artifacts ready: role=${appUser}, database=${appDatabase}`);
  } finally {
    await client.end();
  }
}

createDatabaseArtifacts().catch((error) => {
  console.error('Error creating database artifacts:', error.message);
  process.exit(1);
});
