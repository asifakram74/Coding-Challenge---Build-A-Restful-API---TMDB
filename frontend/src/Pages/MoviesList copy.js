import React, { useEffect, useState } from "react";
import "./App.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:4000/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupMoviesByMonth = (moviesList) => {
    const grouped = {};
    moviesList.forEach((movie) => {
      if (!movie.release_date) return;
      const date = new Date(movie.release_date);
      const key = `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(movie);
    });
    return grouped;
  };

  const groupedMovies = groupMoviesByMonth(filteredMovies);
  const months = ["All", ...Object.keys(groupedMovies)];

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies =
    sortBy === "All"
      ? filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)
      : groupedMovies[sortBy]?.slice(indexOfFirstMovie, indexOfLastMovie) || [];

  // Handle Pagination
  const totalPages = Math.ceil(
    (sortBy === "All" ? filteredMovies.length : groupedMovies[sortBy]?.length || 0) /
      moviesPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="movie-app">
      <h1>🎬 Movie App</h1>

      <div className="filter_wrap">
        <div className="tabs">
          {months.map((month) => (
            <button
              key={month}
              className={`tab-button ${sortBy === month ? "active" : ""}`}
              onClick={() => {
                setSortBy(month);
                setCurrentPage(1);
              }}
            >
              {month}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search movies..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesList;