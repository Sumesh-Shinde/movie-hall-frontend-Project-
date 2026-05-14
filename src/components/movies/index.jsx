import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const fetchShowtimes = (movieId) => {
    axios.get(`http://localhost:8080/api/showtimes/movie/${movieId}`)
      .then(response => setShowtimes(prev => ({ ...prev, [movieId]: response.data })))
      .catch(error => console.error('Error fetching showtimes:', error));
  };

  const handleBookNow = (movieId) => {
    if (!userId) {
      alert('Please log in to book a movie.');
      navigate('/login');
      return;
    }
    setSelectedMovie(movieId);
    setSelectedShowtime(null);
    fetchShowtimes(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setSelectedShowtime(null);
  };

  const handleConfirmShowtime = () => {
    if (!userId) {
      alert('Please log in to proceed with booking.');
      navigate('/login');
      return;
    }
    if (!selectedShowtime) {
      alert('Please select a showtime.');
      return;
    }
    navigate(`/booking?userId=${userId}&movieId=${selectedMovie}&showtimeId=${selectedShowtime}`);
  };

  return (
    <div className="main-content">
      <div className="movies">
        <h1 className="movies__heading">Available Movies</h1>
        <div className="movies__grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="movies__card">
                <div className="movies__card__image-container">
                  <img src={movie.imageUrl} alt={movie.title} className="movies__card__image" />
                </div>
                <div className="movies__card__details">
                  <h2 className="movies__card__title">{movie.title}</h2>
                  <p className="movies__card__description">{movie.description}</p>
                  <button className="movies__card__button" onClick={() => handleBookNow(movie.id)}>
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading movies...</p>
          )}
        </div>

        {selectedMovie && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-btn" onClick={handleCloseModal}>✖</button>
              <h2>Select a Showtime</h2>
              {showtimes[selectedMovie] ? (
                showtimes[selectedMovie].length > 0 ? (
                  showtimes[selectedMovie].map((showtime) => (
                    <div key={showtime.id} className='showtime-container'>
                      <input
                        className='showtime-container input'
                        type="radio"
                        id={`showtime-${showtime.id}`}
                        name="showtime"
                        value={showtime.id}
                        onChange={() => setSelectedShowtime(showtime.id)}
                      />
                      <label className='showtime-container label ' htmlFor={`showtime-${showtime.id}`}>
                        {showtime.theaterName} - {new Date(showtime.showtime).toLocaleString()} - ₹{showtime.ticketPrice}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>No showtimes available.</p>
                )
              ) : (
                <p>Loading showtimes...</p>
              )}
              <button className="modal__button" onClick={handleConfirmShowtime}>Proceed to Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
