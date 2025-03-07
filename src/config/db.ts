import mongoose from "mongoose";
import { Logger } from "./loggers";

// Connect to database
async function connect() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    Logger.error("MONGODB_URI is not defined in environment variables.");
    throw new Error("MONGODB_URI is required but not provided.");
  }

  try {
    const connection = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout para evitar travamento
      socketTimeoutMS: 45000, // Evita conexões penduradas
    });

    Logger.info("✅ Database connected successfully.");
    return connection;
  } catch (error) {
    Logger.error(`❌ Database connection error: ${error}`);
    throw error; // Não usa process.exit(1), apenas lança erro
  }
}

export default connect;
