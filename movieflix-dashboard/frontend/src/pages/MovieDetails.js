import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const fetchMovie = async () => {
    try {
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) return <p className="p-6">Loading movie details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-2 text-blue-700">{movie.title}</h1>
    <p className="text-gray-700 mb-1">Year: {movie.year}</p>
    <p className="text-gray-700 mb-1">Runtime: {movie.runtime} mins</p>
    <p className="text-gray-700 mb-1">Rating: {movie.rating}</p>
    <p className="text-gray-700 mb-1">Genre: {movie.genre.join(', ')}</p>
    <p className="text-gray-700 mb-1">Director: {movie.director}</p>
    <p className="text-gray-700 mb-1">Actors: {movie.actors.join(', ')}</p>
    <a
      href={`https://www.imdb.com/title/${movie.imdbID}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline mt-4 inline-block"
    >
      View on IMDb
    </a>
  </div>
  
  );
};

export default MovieDetails;
