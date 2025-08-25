import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true, unique: true },
  title: String,
  year: Number,
  genre: [String],
  director: String,
  actors: [String],
  runtime: Number,
  rating: Number,
  lastUpdated: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
