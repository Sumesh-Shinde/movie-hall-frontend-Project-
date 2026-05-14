import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const UserProfile = () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      alert("Please log in to view profile.");
      return;
    }

    // ✅ Fetch User Info
    axios.get(`http://localhost:8080/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUser(res.data))
    .catch((err) => {
      console.error("Error fetching user:", err);
      setError("Failed to load user data.");
    });

    // ✅ Fetch User's Booking History
    axios.get(`http://localhost:8080/api/bookings/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("Fetched Bookings:", res.data);
      setBookings(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching bookings:", err);
      setError("Failed to load booking history.");
      setLoading(false);
    });

  }, [userId, token]);

  return (
    <div className="user-profile">
      <h1 className="user-profile__heading">User Profile</h1>

      {error && <p className="error-message">{error}</p>}

      {user ? (
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}

      <h2 className="user-profile__subheading">Booking History</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length > 0 ? (
        <table className="booking-history">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Movie</th>
              <th>Theater</th>
              <th>Showtime</th>
              <th>Seats</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.showtime.movie.title}</td>
                <td>{booking.showtime.theaterName}</td>
                <td>{new Date(booking.showtime.showtime).toLocaleString()}</td>
                <td>{booking.selectedSeats}</td>
                <td>₹{booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserProfile;
