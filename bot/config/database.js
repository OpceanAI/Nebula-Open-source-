const mongoose = require('mongoose');
const personality = require('../utils/personality');

async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/kawaii-bot';
    
    console.log(personality.format('Connecting to MongoDB...', '🗄️'));
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(personality.format('Connected to MongoDB successfully!', '✨', 'success'));
    
    // Log database name
    const dbName = mongoose.connection.db.databaseName;
    console.log(personality.format(`Database: ${dbName}`, '📊'));
    
  } catch (error) {
    console.error(personality.format(`MongoDB connection failed: ${error.message}`, '💔', 'error'));
    throw error;
  }
}

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log(personality.format('Mongoose connected to MongoDB', '🔗', 'success'));
});

mongoose.connection.on('error', (error) => {
  console.error(personality.format(`Mongoose error: ${error.message}`, '⚠️', 'error'));
});

mongoose.connection.on('disconnected', () => {
  console.log(personality.format('Mongoose disconnected from MongoDB', '🔌', 'warning'));
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log(personality.format('Mongoose connection closed through app termination', '👋'));
  process.exit(0);
});

module.exports = connectDB;
