const path = require('path');
const express = require("express");
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;

const app = express();

// Postgres Database setup
const pool = new Pool({
  user: 'harryhanskat',
  host: 'localhost',
  database: 'groovemeister',
  port: 5432
});

// Have Node serve the files for our build React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/test', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Error connecting to database: ', err);
    res.status(500).send('Database connection error');
  }
});

// Get first row of the practice items table.
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM practice_items WHERE id = 1');
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Error connecting to database: ', err);
    res.status(500).send('Database connection error');
  }
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});