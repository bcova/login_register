const { Client } = require("pg");

const DB_NAME = 'users'

const connectionString =
  process.env.DATABASE_URL || `https://localhost:5432/${DB_NAME}`;
  let client;
  client = new Client(connectionString);
  client.connect();


module.exports = client;