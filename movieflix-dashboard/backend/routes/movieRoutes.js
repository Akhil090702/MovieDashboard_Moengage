import express from 'express';
import {
    searchMovies,
    getMovieById,
    genreDistribution,
    averageRating,
    runtimeByYear
  } from '../controllers/movieController.js';
  
const router = express.Router();

router.get('/', searchMovies);      // GET /api/movies?search=batman
router.get('/:id', getMovieById);   // GET /api/movies/tt1234567
router.get('/stats/genre-distribution', genreDistribution);
router.get('/stats/average-rating', averageRating);
router.get('/stats/runtime-by-year', runtimeByYear);

export default router;
