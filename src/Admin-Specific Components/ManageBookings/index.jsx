import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newSeats, setNewSeats] = useState("");
  const [filterUserId, setFilterUserId] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://localhost:8080/api/bookings")
      .then(response => {
        setBookings(response.data);
        setFilteredBookings(response.data);
      })
      .catch(error => console.error("Error fetching bookings:", error));
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setNewSeats(booking.selectedSeats);
  };

  const handleSaveSeats = (id) => {
    axios.put(`http://localhost:8080/api/bookings/${id}`, { selectedSeats: newSeats })
      .then(() => {
        alert("Seats updated successfully!");
        setEditingBooking(null);
        fetchBookings();
      })
      .catch(error => console.error("Error updating booking:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios.delete(`http://localhost:8080/api/bookings/${id}`)
        .then(() => {
          alert("Booking deleted successfully!");
          fetchBookings();
        })
        .catch(error => console.error("Error deleting booking:", error));
    }
  };

  const handleFilterChange = (e) => {
    const userId = e.target.value;
    setFilterUserId(userId);
    if (userId) {
      setFilteredBookings(bookings.filter(booking => booking.user.id.toString() === userId));
    } else {
      setFilteredBookings(bookings);
    }
  };

  return (
    <div className="manage-bookings">
      <h1 className="manage-bookings__heading">Manage Bookings</h1>
      <div className="manage-bookings__filter">
        <input
          type="text"
          placeholder="Filter by User ID"
          value={filterUserId}
          onChange={handleFilterChange}
        />
      </div>
      <div className="manage-bookings__container">
        <table className="manage-bookings__table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Name</th>
              <th>Movie</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seats</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user.name}</td>
                <td>{booking.showtime.movie.title}</td>
                <td>{new Date(booking.showtime.showtime).toLocaleDateString()}</td>
                <td>{new Date(booking.showtime.showtime).toLocaleTimeString()}</td>
                <td>
                  {editingBooking?.id === booking.id ? (
                    <input
                      type="text"
                      value={newSeats}
                      onChange={(e) => setNewSeats(e.target.value)}
                    />
                  ) : (
                    booking.selectedSeats
                  )}
                </td>
                <td>${booking.totalPrice}</td>
                <td>
                  {editingBooking?.id === booking.id ? (
                    <button onClick={() => handleSaveSeats(booking.id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(booking)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(booking.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
