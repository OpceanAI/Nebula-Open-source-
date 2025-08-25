const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { loadCommands } = require('./handlers/commandHandler');
const personality = require('./utils/personality');
const connectDB = require('./config/database');
require('dotenv').config();

// Create kawaii Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Initialize collections for kawaii commands
client.commands = new Collection();
client.cooldowns = new Collection();

async function initializeKawaiiBot() {
  try {
    console.log(personality.format('Starting kawaii bot... *excited*', '🌸'));
    
    // Connect to MongoDB
    await connectDB();
    
    // Load all kawaii commands
    await loadCommands(client);
    
    // Login with kawaii personality
    await client.login(process.env.DISCORD_TOKEN);
    
  } catch (error) {
    console.error(personality.format(`Failed to start bot: ${error.message}`, '😢', 'error'));
    process.exit(1);
  }
}

// Kawaii error handling
client.on('error', (error) => {
  console.error(personality.format(`Discord client error: ${error.message}`, '🥺', 'error'));
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(personality.format(`Unhandled rejection: ${reason}`, '💔', 'error'));
});

process.on('uncaughtException', (error) => {
  console.error(personality.format(`Uncaught exception: ${error.message}`, '😭', 'error'));
  process.exit(1);
});

// Start the kawaii bot
initializeKawaiiBot();

module.exports = client;
