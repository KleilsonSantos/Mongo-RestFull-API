import express from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define port
const port = process.env.PORT || 3000;

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Initialize server on port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});