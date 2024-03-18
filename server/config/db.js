/*
Connect to the database and provide a 'pool' that other parts of the application can use.
*/

const { Pool } = require('pg');

const dbConfig = require('./config.json')

const pool = new Pool(DB_CONNECT=dbConfig['development']);

pool.on('connect', () => {
    console.log("DB Connection Successful");
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};