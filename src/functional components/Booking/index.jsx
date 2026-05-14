import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // ✅ Get user ID and token from sessionStorage
  const userId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  // ✅ Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('movieId');
  const showtimeId = queryParams.get('showtimeId');

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // ✅ Store already booked seats
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState(null);

  useEffect(() => {
    if (!userId) {
      alert('Please log in to access this page.');
      navigate('/login');
      return;
    }

    // ✅ Fetch movie details
    axios.get(`http://localhost:8080/api/movies/${movieId}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('Error fetching movie details:', error));

    // ✅ Fetch showtime details
    axios.get(`http://localhost:8080/api/showtimes/${showtimeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setShowtime(response.data))
    .catch(error => console.error('Error fetching showtime:', error));

    // ✅ Fetch already booked seats
    axios.get(`http://localhost:8080/api/bookings/showtime/${showtimeId}/booked-seats`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setBookedSeats(response.data); // ✅ Set booked seats
    })
    .catch(error => console.error('Error fetching booked seats:', error));

  }, [userId, movieId, showtimeId, navigate, token]);

  const seats = Array.from({ length: 50 }, (_, i) => i + 1);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return; // ✅ Prevent selecting booked seats

    setSelectedSeats(selectedSeats.includes(seatNumber)
      ? selectedSeats.filter(seat => seat !== seatNumber)
      : [...selectedSeats, seatNumber]);
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat to book.');
      return;
    }

    if (!showtime) {
      alert('Showtime not available for this movie.');
      return;
    }

    const bookingData = {
      user: { id: userId },
      showtime: { id: showtimeId },
      selectedSeats: selectedSeats.join(","), // ✅ Store selected seats as a string
      numberOfSeats: selectedSeats.length,
      totalPrice: selectedSeats.length * (showtime.ticketPrice || 0),
    };

    // ✅ Send booking request with Authorization token
    axios.post('http://localhost:8080/api/bookings', bookingData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      alert(`Booking confirmed for "${movie?.title}"!`);
      
      // ✅ Redirect to Booking Summary Page with bookingId
      navigate(`/booking-summary?bookingId=${response.data.id}`);
    })
    .catch(error => {
      console.error('Error booking seats:', error);
      alert('Failed to book seats. Please try again.');
    });
  };

  return (
    <div className="booking">
      <h1 className="booking__heading">
        {movie && showtime ? `Book Your Seats for "${movie.title}" at ${showtime?.theaterName || "Unknown Theater"}` : 'Loading details...'}
      </h1>
      <div className="booking__seats">
        {seats.map((seat) => (
          <div
            key={seat}
            className={`booking__seat 
              ${selectedSeats.includes(seat) ? 'selected' : ''} 
              ${bookedSeats.includes(seat) ? 'booked' : ''}`} // ✅ Add "booked" class
            onClick={() => handleSeatClick(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      <button className="booking__button" onClick={handleBooking} disabled={!showtime}>
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
