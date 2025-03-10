import mongoose from "mongoose";
import { Logger } from "./logger";

// Connect to database
async function connect() {
  const mongoUri: string | undefined = process.env.MONGODB_URI_ATLAS;

  if (!mongoUri) {
    Logger.error("❌ MONGODB_URI is not defined in environment variables.");
    throw new Error("MONGODB_URI is required but not provided.");
  }

  try {
    const connection = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    Logger.info("✅🔗 Connected to MongoDB database successfully.");

    return connection;
  } catch (error) {
    Logger.error(`❌ Database connection error: ${error}`);
    throw error; // Throw error to stop the application
  }
}

export default connect;
