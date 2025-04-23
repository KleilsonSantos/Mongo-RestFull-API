import mongoose from 'mongoose';
import Logger from './logger';

// 📌 Asynchronous function to connect to the MongoDB database
async function connect() {
  const mongoUri: string | undefined = process.env.MONGODB_URI;
  // 🚨 Check if the environment variable is defined
  if (!mongoUri) {
    Logger.error('❌ MONGODB_URI is not defined in environment variables.');
    throw new Error('MONGODB_URI is required but not provided.');
  }

  try {
    // 🔄 Attempting to establish a connection to MongoDB
    const connection = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // ⏳ Maximum time to select a MongoDB server
      socketTimeoutMS: 45000, // ⏳ Timeout for socket communication with the database
    });

    Logger.info('✅🔗 Connected to MongoDB database successfully.');
    return connection;
  } catch (error) {
    // ❌ Log and throw any connection errors
    Logger.error(`❌ Database connection error: ${error}`);
    throw error;
  }
}

// 📌 Asynchronous function to disconnect from the database
const disconnect = async () => {
  try {
    await mongoose.disconnect();
    Logger.info('✅🔗 Disconnected from MongoDB database successfully.');
  } catch (error) {
    // ❌ Log any errors that occur during disconnection
    Logger.error(`❌ Database disconnection error: ${error}`);
  }
};

export { connect, disconnect };
