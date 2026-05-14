import axios from "axios";

const API_URL = "http://localhost:8080/api/showtimes";
const API_URL_MOVIES = "http://localhost:8080/api/movies";

export const fetchMovies = async () => axios.get(API_URL_MOVIES);

export const fetchShowtimes = async () => axios.get(API_URL);

export const fetchShowtimesByMovie = async (movieId) => axios.get(`${API_URL}/movie/${movieId}`);

export const addShowtime = async (movieId, showtime) => {
    return axios.post(`${API_URL}/${movieId}`, showtime, {
        headers: { "Content-Type": "application/json" },
    });
};

export const updateShowtime = async (id, showtime) => axios.put(`${API_URL}/${id}`, showtime);

export const deleteShowtime = async (id) => axios.delete(`${API_URL}/${id}`);
