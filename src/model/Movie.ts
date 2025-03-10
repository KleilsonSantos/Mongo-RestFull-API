import { model, Schema } from "mongoose";

// Define movie schema
const movieSchema = new Schema(
  {
    title: String,
    rating: Number,
    description: String,
    director: String,
    genre: String,
    stars: [String],
    poster: String,
  },
  {
    timestamps: true,
  }
);

// Create movie model
const MovieModel = model("Movie", movieSchema);

export { MovieModel };
