const path = require('path');
const express = require("express");
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');


const PORT = process.env.PORT || 3001;
const publicDirectory = path.resolve(__dirname, '../client/build');

let liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);

const app = express();

app.use(connectLiveReload());

app.use(express.static(publicDirectory));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Postgres Database setup
const pool = new Pool({
  user: 'harryhanskat',
  host: 'localhost',
  database: 'groovemeister',
  port: 5432
});

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

app.get('/uuid', (req, res) => {
  res.json(uuidv4());
})

// Get first row of the practice items table.
app.get('/api/PracticeItem', async (req, res) => {
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

app.post('/api/addPracticeItem', (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send("Practice Item Added");
  } catch (err) {
    console.error('Not implemented yet', err);
    res.status(500).send('Not implemented yet');
  }
});

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server! Live reloaded! Live reload?" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const start = async() => {
  // Test Database connection before starting the server
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log("DB Connection Successful", result.rows[0]);

    // Given a successful connection then we start the server.
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to database: ', err);
  }
};

start();