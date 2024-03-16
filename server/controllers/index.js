const path = require('path');
const express = require("express");
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const dontenv = require('dotenv');
const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
  dontenv.config();
}

const PORT = process.env.PORT || 3001;
const publicDirectory = path.resolve(__dirname, '../../public/build');

let liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);

const app = express();

app.use(connectLiveReload());
// allow for cross origin requests. Saw online tutorial, don't think I ever managed to use cors... maybe worth it at some point? Idk
app.use(cors());
app.use(express.static(publicDirectory));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Postgres Database setup not working lol
const pool = new Pool(process.env.DB_CONNECT);

// Don't use .env for db config
// const pool = new Pool(DB_CONNECT={
//   user: 'harryhanskat',
//   host: 'localhost',
//   database: 'groovemeister',
//   port: 5432
// });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test Database connection
app.get('/test', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log(result.rows[0]);
    client.release();
  } catch (err) {
    console.error('Error connecting to database: ', err);
    res.status(500).send('Database connection error');
  }
});

// Just a demo of getting a uuid
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

// Get specific practice item by index
app.param('index', function(req, res, next, index) {
  const modified = index;

  req.index = modified;
  next();
});

app.get('/api/PracticeItem/:index', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM practice_items WHERE id = ' + req.index);
    res.json(result.rows);
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
    res.json({ message: "Hello from server! Reloaded Live" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/public', 'index.html'));
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