import React, { useState, useEffect } from "react";
import "./style.scss";
import { fetchShowtimes, fetchMovies, addShowtime, deleteShowtime } from "../ManageShowtimes/showtimeApi";

const ManageShowtimes = () => {
    const [movies, setMovies] = useState([]); // List of movies
    const [showtimes, setShowtimes] = useState([]); // List of showtimes
    const [selectedMovieId, setSelectedMovieId] = useState(""); // Selected movie ID
    const [newShowtime, setNewShowtime] = useState({
        date: "",
        time: "",
        theater: "",
        ticketPrice: "",
    });

    useEffect(() => {
        fetchMovies().then(response => setMovies(response.data));
        fetchShowtimes().then(response => setShowtimes(response.data));
    }, []);

    const handleAddShowtime = async () => {
        if (!selectedMovieId || !newShowtime.date || !newShowtime.time || !newShowtime.theater || !newShowtime.ticketPrice) {
            alert("Please fill in all required fields.");
            return;
        }

        const showtimeData = {
            showtime: `${newShowtime.date}T${newShowtime.time}:00`,
            theaterName: newShowtime.theater,
            ticketPrice: parseFloat(newShowtime.ticketPrice),
        };

        try {
            await addShowtime(selectedMovieId, showtimeData);
            fetchShowtimes().then(response => setShowtimes(response.data));
            setNewShowtime({ date: "", time: "", theater: "", ticketPrice: "" });
        } catch (error) {
            console.error("Error adding showtime:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteShowtime(id);
            setShowtimes(showtimes.filter((showtime) => showtime.id !== id));
        } catch (error) {
            console.error("Error deleting showtime:", error);
        }
    };

    return (
        <div className="manage-showtimes">
            <h1>Manage Showtimes</h1>

            {/* Dropdown to select a movie */}
            <select value={selectedMovieId} onChange={(e) => setSelectedMovieId(e.target.value)}>
                <option value="">Select a Movie</option>
                {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                        {movie.title}
                    </option>
                ))}
            </select>

            {/* Show input fields only if a movie is selected */}
            {selectedMovieId && (
                <div className="manage-showtimes__add-form">
                    <input type="date" value={newShowtime.date} onChange={(e) => setNewShowtime({ ...newShowtime, date: e.target.value })} />
                    <input type="time" value={newShowtime.time} onChange={(e) => setNewShowtime({ ...newShowtime, time: e.target.value })} />
                    <input type="text" placeholder="Theater Name" value={newShowtime.theater} onChange={(e) => setNewShowtime({ ...newShowtime, theater: e.target.value })} />
                    <input type="number" placeholder="Ticket Price" value={newShowtime.ticketPrice} onChange={(e) => setNewShowtime({ ...newShowtime, ticketPrice: e.target.value })} />
                    <button onClick={handleAddShowtime}>Add Showtime</button>
                </div>
            )}

            {/* Display showtimes */}
            <table className="manage-showtimes__table">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Theater</th>
                        <th>Ticket Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {showtimes.map((showtime) => (
                        <tr key={showtime.id}>
                            <td>{showtime.movie.title}</td>
                            <td>{showtime.showtime.split("T")[0]}</td>
                            <td>{showtime.showtime.split("T")[1]}</td>
                            <td>{showtime.theaterName}</td>
                            <td>${showtime.ticketPrice}</td>
                            <td>
                                <button onClick={() => handleDelete(showtime.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageShowtimes;
