// users.js

// import the database client
const db = require('../db');

// create or update a user in the users table
async function createOrUpdateUser(name, userId) {
    // set the query to insert or update the user
    let query = 'INSERT INTO users (name, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET name = $1 RETURNING user_id';
    let values = [name, userId];
    // execute the query and return the user ID
    let { rows } = await db.query(query, values);
    return rows[0].user_id;
}

// export the function to be used by other modules
module.exports = {
    createOrUpdateUser,
};
