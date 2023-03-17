// Import the database connection pool from db.js module
const db = require('./db');

// Define an asynchronous function to create or update a channel in the channel_list table
async function createOrUpdateChannel(name, channelId) {
    // Construct the SQL query to insert or update the channel
    let query = 'INSERT INTO channel_list (name, channel_id) VALUES ($1, $2) ON CONFLICT (channel_id) DO UPDATE SET name = $1 RETURNING channel_id';
    // Define the parameter values for the SQL query
    let values = [name, channelId];
    // Execute the SQL query using the database connection pool and retrieve the resulting rows
    let { rows } = await db.query(query, values);
    // Return the channel ID from the first row of the query result
    return rows[0].channel_id;
}

// Export the createOrUpdateChannel function for use in other modules
module.exports = {
    createOrUpdateChannel,
};
