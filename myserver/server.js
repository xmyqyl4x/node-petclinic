require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool, testConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the PostgreSQL-powered server');
});

app.get('/api/health', async (req, res) => {
  try {
    await testConnection();
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected', message: error.message });
  }
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Connected to PostgreSQL database ${process.env.PGDATABASE || 'node-petclinic-db'}`);
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error.message);
  }

  console.log(`Server running on http://localhost:${PORT}`);
});
