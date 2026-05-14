import React, { useState, useEffect } from "react";
import "../ManageMovie/style.scss";
import { fetchMovies, addMovie, updateMovie, deleteMovie } from "../ManageMovie/movieApi";

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: "",
        description: "",
        imageUrl: "",
        releaseDate: "",
        durationMinutes: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            setLoading(true);
            const response = await fetchMovies();
            setMovies(response.data || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError("Failed to load movies.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddMovie = async () => {
        if (!newMovie.title || !newMovie.releaseDate || !newMovie.durationMinutes) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccessMessage(null);

            const response = await addMovie(newMovie);

            if (!response || !response.data) {
                throw new Error("Server did not return movie data.");
            }

            setSuccessMessage("Movie added successfully!");

            // Delay fetching movies by 5 seconds
            setTimeout(async () => {
                await loadMovies();
            }, 5000);

            setNewMovie({
                title: "",
                description: "",
                imageUrl: "",
                releaseDate: "",
                durationMinutes: ""
            });

        } catch (error) {
            console.error("Error adding movie:", error);
            setError("Error adding movie. Please wait and refresh.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteMovie(id);
            setMovies(movies.filter((movie) => movie.id !== id));
        } catch (error) {
            console.error("Error deleting movie:", error);
            setError("Failed to delete movie.");
        }
    };

    const handleEdit = async (id) => {
        const movieToEdit = movies.find((m) => m.id === id);
        if (movieToEdit) {
            const updatedTitle = prompt("Enter new title:", movieToEdit.title);
            if (updatedTitle) {
                const updatedMovie = { ...movieToEdit, title: updatedTitle };
                try {
                    await updateMovie(id, updatedMovie);
                    setMovies(movies.map((m) => (m.id === id ? updatedMovie : m)));
                } catch (error) {
                    console.error("Error updating movie:", error);
                    setError("Failed to update movie.");
                }
            }
        }
    };

    if (loading) {
        return <div>Loading movies...</div>;
    }

    return (
        <div className="manage-movies">
            <h1 className="manage-movies__heading">Manage Movies</h1>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <div className="manage-movies__add-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newMovie.imageUrl}
                    onChange={(e) => setNewMovie({ ...newMovie, imageUrl: e.target.value })}
                />
                <input
                    type="date"
                    value={newMovie.releaseDate}
                    onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Duration (Minutes)"
                    value={newMovie.durationMinutes}
                    onChange={(e) => setNewMovie({ ...newMovie, durationMinutes: e.target.value })}
                />
                <button onClick={handleAddMovie}>Add Movie</button>
            </div>

            <table className="manage-movies__table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Release Date</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>{movie.description}</td>
                            <td>
                                {movie.imageUrl ? (
                                    <img src={movie.imageUrl} alt={movie.title} width="50" />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{movie.releaseDate}</td>
                            <td>{movie.durationMinutes} min</td>
                            <td>
                                <button className="manage-movies__edit-button" onClick={() => handleEdit(movie.id)}>
                                    Edit
                                </button>
                                <button className="manage-movies__delete-button" onClick={() => handleDelete(movie.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageMovies;
