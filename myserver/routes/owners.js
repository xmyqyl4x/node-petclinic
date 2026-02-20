const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// GET /api/owners – list all owners (optionally filter by last name)
router.get('/', async (req, res) => {
  try {
    const { lastName } = req.query;
    let result;

    if (lastName) {
      result = await pool.query(
        `SELECT * FROM owners WHERE LOWER(last_name) LIKE LOWER($1) ORDER BY last_name, first_name`,
        [`%${lastName}%`]
      );
    } else {
      result = await pool.query(
        'SELECT * FROM owners ORDER BY last_name, first_name'
      );
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/owners/:id – get a single owner by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM owners WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/owners – add a new owner
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, address, city, telephone } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    const result = await pool.query(
      `INSERT INTO owners (first_name, last_name, address, city, telephone)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, address || '', city || '', telephone || '']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
