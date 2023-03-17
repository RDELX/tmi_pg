// Import the Pool object from the 'pg' library
const { Pool } = require('pg');

// Create a new Pool object with database connection configuration
const pool = new Pool({
    user: 'username', // Database user name
    host: 'localhost', // Database host
    database: 'dbname', // Database name
    password: 'password', // Database password
    port: 5432, // Database port
});

// Export an object with a query function that uses the pool to execute queries
module.exports = {
    query: (text, params) => pool.query(text, params),
};