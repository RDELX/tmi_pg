// Import the required modules
const tmi = require('tmi.js');
const messages = require('./src/messages');

// Create a new TMI.js client instance and configure it to listen on the specified channels
const client = new tmi.client({
    channels: [ 'channel' ]
});

// Set up a listener for when the client is connected
client.on('connected', () => {
    console.log(`Connected to ${client.getChannels().length} channel(s)`);
});


// Set up a listener for when a new message is received
client.on('message', async (channel, tags, message, self) => {
    // Ignore messages sent by the bot itself
    if (self) return;

    // Extract the relevant information from the message metadata
    const userId = tags['user-id'];
    const username = tags['username'];
    const channelId = tags['room-id'];
    const channelName = channel.slice(1);

    // Save the message to the database
    await messages.saveMessage(message, username, userId, channelName, channelId);
});

// Connect the client to the Twitch IRC server
client.connect();
