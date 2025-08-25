import React, { useEffect, useState } from "react";
import api from "../utils/api";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("batman");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const API_KEY = "cea62c6";
  const BASE_URL = "http://www.omdbapi.com/";

  const fetchMovies = async () => {
    try {
      const query = search ? `&s=${search}` : "&s=batman";
      // const query = search ? search : "";
      const res = await api.get(`${BASE_URL}?apikey=${API_KEY}${query}&page=1`);

      if (res.data && res.data.Search) {
        let movies = res.data.Search;

        // Fetch details for each movie (Genre, Rating, etc.)
        const details = await Promise.all(
          movies.map((m) =>
            api.get(`${BASE_URL}?apikey=${API_KEY}&i=${m.imdbID}`)
          )
        );

        movies = details.map((d) => d.data);

        // --- Filter ---
        if (genre) {
          movies = movies.filter(
            (m) =>
              m.Genre && m.Genre.toLowerCase().includes(genre.toLowerCase())
          );
        }

        // --- Sort ---
        if (sort === "rating") {
          movies.sort(
            (a, b) =>
              (parseFloat(b.imdbRating) || 0) - (parseFloat(a.imdbRating) || 0)
          );
        } else if (sort === "year") {
          movies.sort(
            (a, b) => (parseInt(b.Year) || 0) - (parseInt(a.Year) || 0)
          );
        } else if (sort === "title") {
          movies.sort((a, b) => a.Title.localeCompare(b.Title));
        }

        setMovies(movies);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, genre, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-400 drop-shadow-lg">
          🎬 MovieFlix Dashboard
        </h1>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/10 p-4 rounded-2xl shadow-lg backdrop-blur-md">
          <SearchBar onSearch={setSearch} />
          <Filters onGenreChange={setGenre} onSortChange={setSort} />
        </div>

        {/* Movie Cards */}
        {movies.length === 0 ? (
          <p className="text-center mt-12 text-gray-400 text-lg">
            No movies found. Try searching for something else 🎥
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

        )}
      </div>
    </div>
  );
};

export default Home;
