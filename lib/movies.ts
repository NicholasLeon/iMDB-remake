import { Movie, MovieDetail, MovieResponse } from "../types/movie";

const API_KEY = "5ce81b0";
const BASE_URL = "http://www.omdbapi.com";

export async function getMovies(query: string): Promise<Movie[]> {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data: MovieResponse = await res.json();

  if (data.Response === "False" || !data.Search) {
    return [];
  }

  return data.Search;
}
