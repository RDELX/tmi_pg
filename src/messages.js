// Importing necessary modules
const db = require('./db');
const channels = require('./channels');
const users = require('./users');

// Function to save message to the database
async function saveMessage(message, username, userId, channelName, channelId) {
    // Check if user exists in the database, if not, create a new user
    const userIdInDB = await users.createOrUpdateUser(username, userId);
    // Check if channel exists in the database, if not, create a new channel
    const channelIdInDB = await channels.createOrUpdateChannel(channelName, channelId);

    // Define query to insert message into the database
    let query = 'INSERT INTO messages (body, user_id, channel_id) VALUES ($1, $2, $3)';
    let values = [message, userIdInDB, channelIdInDB];

    // Execute the query to insert message into the database
    await db.query(query, values);

    // Print the message on console
    console.log(`${channelName}:${username}: ${message}`);
}

// Exporting the function to be used in other modules
module.exports = {
    saveMessage,
};
