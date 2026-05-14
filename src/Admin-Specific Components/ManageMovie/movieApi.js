import axios from "axios";

const API_URL = "http://localhost:8080/api/movies";

export const fetchMovies = async () => axios.get(API_URL);

export const addMovie = async (movie) => {
    try {
        const response = await axios.post(API_URL, movie, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding movie:", error.response?.data || error.message);
        throw error;
    }
};

export const updateMovie = async (id, movie) => axios.put(`${API_URL}/${id}`, movie);

export const deleteMovie = async (id) => axios.delete(`${API_URL}/${id}`);
