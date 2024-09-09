import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
const BASE_URL = 'https://api.themoviedb.org/3';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);



  // Function to fetch data from TheMovieDB API based on the search query
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
          language: 'en-US',
        },
      });
      setResults(response.data.results); // Set the results from the API response
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Search Results */}
      <div className="results-grid">
        {results.length > 0 ? (
          results.map((movie) => (
            <div key={movie.id} className="movie-card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              ) : (
                <div className="no-poster">No Poster Available</div>
              )}
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-release-date">Release Date: {movie.release_date}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;