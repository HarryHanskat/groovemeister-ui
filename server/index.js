const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const dontenv = require('dotenv');
const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
  dontenv.config();
}

const PORT = process.env.PORT || 3001;
const publicDirectory = path.resolve(__dirname, '../../public');

let liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDirectory);

const app = express();

app.use(connectLiveReload());
// allow for cross origin requests. Saw online tutorial, don't think I ever managed to use cors... maybe worth it at some point? Idk
var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./api/models");
db.sequelize.sync()
  .then(() => {
    console.log("\n\n*********** Synced db *************\n\n");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const start = async() => {
  try {
    require("./api/routes/practiceItem.routes.js")(app);

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}\n\n`);
    });
  } catch (err) {
    console.error('Error connecting to database: ', err);
  }
};

start();