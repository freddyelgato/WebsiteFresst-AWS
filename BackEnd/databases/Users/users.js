// Import the Pool class from the 'pg' module to manage PostgreSQL connections
const { Pool } = require('pg');

// Create a new Pool instance to handle database connections
const pool = new Pool({
    user: 'postgres', // The username to connect to the PostgreSQL database
    host: 'localhost', // The host where the database is running (localhost means it's on the same machine)
    database: 'User_DB', // The name of the database to connect to
    password: '12345', // The password for the 'postgres' user
    port: 5432, // The port where PostgreSQL is listening (default is 5432)
});

// Export the pool object to be used in other files for database queries
module.exports = pool;
