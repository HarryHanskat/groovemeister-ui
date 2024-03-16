module.exports = {
    HOST: "localhost:5432",
    USER: "me",
    PASSWORD: "password",
    DB: "groovemeister",
    PORT: 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  