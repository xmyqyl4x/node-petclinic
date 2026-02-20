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

app.post('/api/reservations', async (req, res) => {
  const {
    pet_name,
    pet_type,
    email,
    doctor,
    appointment_date,
    appointment_time,
    reminder
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reservations (
        pet_name,
        pet_type,
        email,
        doctor,
        appointment_date,
        appointment_time,
        reminder
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, pet_name, pet_type, email, doctor, appointment_date, appointment_time, reminder, created_at`,
      [
        pet_name,
        pet_type,
        email,
        doctor,
        appointment_date,
        appointment_time,
        reminder || false
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Error saving reservation', error: error.message });
  }
});

app.get('/api/reservations', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, pet_name, pet_type, email, doctor, appointment_date, appointment_time, reminder, created_at
       FROM reservations
       ORDER BY created_at DESC`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
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
