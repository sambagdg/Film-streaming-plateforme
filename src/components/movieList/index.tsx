/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import MovieCard from "../movieCard";
import { Movie } from "@/types/movie";
import ReactLoading from "react-loading";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setISLoading] = useState<boolean>(true);

  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = async () => {
    await axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "edb4dedc03bc8399b8de4fbebd5b31f3",
        language: "fr-FR",
      },
    }).then((response) => {
      setMovies(response.data.results);
    });

    setISLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <ReactLoading
          type="spin"
          color="#6046ff"
          height={"5%"}
          width={"5%"}
        />
      </div>
    );
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </ul>
  );
}
