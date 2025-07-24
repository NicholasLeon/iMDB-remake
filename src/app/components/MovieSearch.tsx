"use client";

import React, { useState } from "react";
import { getMovies } from "../../../lib/movies";
import { Movie } from "../../../types/movie";
import { useRouter } from "next/navigation";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await getMovies(query);
      const unique = data.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.imdbID === movie.imdbID)
      );
      setMovies(unique);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <section className="p-4 sm:p-8 md:p-12 lg:p-16 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Search movie..."
          className="border border-gray-300 rounded p-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 hover:transition-transform hover:">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="border p-2 rounded transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto"
                onClick={() => router.push(`/movie/${movie.imdbID}`)}
              />
              <h2 className="font-semibold mt-2">{movie.Title}</h2>
              <p className="text-sm text-gray-600">{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
