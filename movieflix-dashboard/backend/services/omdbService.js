import axios from 'axios';
const API_KEY = process.env.OMDB_API_KEY;

export const fetchMovieById = async (imdbID) => {
  const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
  return res.data;
};

export const fetchMoviesByTitle = async (title) => {
  const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
  return res.data;
};

export const fetchMovieDetails = async (title) => {
  const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`);
  return res.data;
};
