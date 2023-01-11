const client = require("./client");

async function dropTables() {
    try {
        console.log("Dropping all tables.");
        await client.query(`
                DROP TABLE IF EXISTS users;
        `);
      console.log("Tables dropped correctly.")
    } catch (error) {
        console.error("Tables did not drop correctly.")
        throw error;
    }
}

async function createTables() {
    try {
        console.log("Creating all tables.");
        await client.query(`
               CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                first_name VARCHAR(40) NOT NULL,
                last_name VARCHAR(40) NOT NULL
               );

               INSERT INTO users(
                username,
                password,
                email,
                first_name,
                last_name 
               )VALUES
               ('YZeus','abc123','tincidunt.orci@icloud.ca','Zeus','Yang'),
               ('kaliapart','sadlk;fj','vulputate.nisi.sem@google.edu','Kalia','Park');
               `);
      console.log("Tables created correctly.")
    } catch (error) {
        console.error("Tables did not create correctly.")
        throw error;
    }
}

async function rebuildDb(){
    try {
        await dropTables();
        await createTables();
    } catch (error) {
        console.error("rebuildDb did not create correctly.")
        throw error
    }
}

module.exports = {dropTables,createTables,rebuildDb}