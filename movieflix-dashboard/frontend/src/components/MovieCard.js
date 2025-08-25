import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
    >
      {/* Poster */}
      {movie.Poster && movie.Poster !== "N/A" ? (
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-80 object-cover group-hover:brightness-90 transition-all duration-300"
        />
      ) : (
        <div className="w-full h-80 flex items-center justify-center bg-gray-300 text-gray-600 text-sm">
          No Image Available
        </div>
      )}

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div> */}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-color:red">
      <h2 className="text-lg font-bold truncate">{movie.Title}</h2>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-gray-200">📅 {movie.Year}</span>
          {movie.imdbRating && (
            <span className="text-yellow-400 font-semibold">⭐ {movie.imdbRating}</span>
          )}
        </div>

        {movie.Runtime && movie.Runtime !== "N/A" && (
          <p className="text-gray-300 text-xs mt-1">⏱ {movie.Runtime}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
