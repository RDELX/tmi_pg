const tmi = require('tmi.js');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'twitch',
    password: '2400',
    port: 5432,
});

const client = new tmi.client({
    channels: [ 'quin69', 'Steelmage' ]
});

client.on('connected', () => {
    console.log(`Connected to ${client.getChannels().length} channel(s)`);
});

client.on('message', async (channel, tags, message, self) => {
    if (self) return;

    const userId = tags['user-id'];
    const username = tags['username'];
    const channelId = tags['room-id'];
    const channelName = channel.slice(1);

    // check if the user already exists in the users table
    let query = 'INSERT INTO users (name, user_id) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET name = $1 RETURNING user_id';
    let values = [username, userId];
    let { rows: userRows } = await pool.query(query, values);
    const userIdInDB = userRows[0].user_id;

    // check if the channel already exists in the channel_list table
    query = 'INSERT INTO channel_list (name, channel_id) VALUES ($1, $2) ON CONFLICT (channel_id) DO UPDATE SET name = $1 RETURNING channel_id';
    values = [channelName, channelId];
    let { rows: channelRows } = await pool.query(query, values);
    const channelIdInDB = channelRows[0].channel_id;

    // insert the message into the messages table
    query = 'INSERT INTO messages (body, user_id, channel_id) VALUES ($1, $2, $3)';
    values = [message, userIdInDB, channelIdInDB];
    await pool.query(query, values);

    console.log(`${username}: ${message}`);
});

client.connect();