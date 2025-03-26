import { model, Schema } from 'mongoose';

// 🎥 Define Movie Schema
const movieSchema = new Schema(
  {
    title: String, // 🎞️ Movie title
    rating: Number, // ⭐ Movie rating (e.g., 8.5)
    description: String, // 📝 Short description of the movie
    director: String, // 🎬 Director of the movie
    genre: String, // 🎭 Movie genre (e.g., Action, Drama)
    stars: [String], // 🌟 List of main actors/actresses
    poster: String, // 🖼️ URL of the movie poster
  },
  {
    timestamps: true, // ⏳ Automatically adds createdAt & updatedAt fields
  },
);

// 🎬 Create Movie Model
const MovieModel = model('Movie', movieSchema);

export { MovieModel }; // 📤 Export Movie model
