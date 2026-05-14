import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/navbar'; // Ensure the path matches your project structure
// import Footer from './components/footer';
// import Home from './components/Home';
// import Movies from './components/movies';
// import Booking from './functional components/Booking';
// import BookingSummary from './functional components/BookingSummary';
// import UserProfile from './functional components/UserProfile';
// import AdminDashboard from './Admin-Specific Components/AdminDashboard';
// import AdminMovieForm from './Admin-Specific Components/ManageMovie';
// import AdminShowtimeForm from './Admin-Specific Components/ManageShowtimes';
// import NotFound from './Utility Components/Not Found';

import './App.css';
import AppRoutes from './AppRoutes';

const App = () => {
    return (
        <div className="App">
            {/* <Router>
             <NavBar />
                <div className='App__main-page-content'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/booking-summary" element={<BookingSummary />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/add-movie" element={<AdminMovieForm />} />
                    <Route path="/admin/manage-showtimes" element={<AdminShowtimeForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </div>
                <Footer />
            </Router> */}
            <AppRoutes />
        </div>
    );
};

export default App;
