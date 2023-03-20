// Import the Pool object from the 'pg' library
const { Pool } = require('pg');
require("dotenv").config();

console.log(process.env);

// Create a new Pool object with database connection configuration
const pool = new Pool({
    user: process.env.user, // Database user name
    host: process.env.host, // Database host
    database: process.env.database, // Database name
    password: process.env.password, // Database password
    port: 5432, // Database port
});



// Export an object with a query function that uses the pool to execute queries
module.exports = {
    query: (text, params) => pool.query(text, params),
};