// Import the Pool object from the 'pg' library
const { Pool } = require('pg');
require("dotenv").config();

console.log(process.env);

// Create a new Pool object with database connection configuration
const pool = new Pool({
    user: 'YourDbUsername', // Database user name
    host: 'YourDbAddress, Use localhost for local db', // Database host
    database: 'DatabaseName', // Database name
    password: 'DatabasePassword', // Database password
    port: 'Your database port, default is 5432', // Database port
});



// Export an object with a query function that uses the pool to execute queries
module.exports = {
    query: (text, params) => pool.query(text, params),
};