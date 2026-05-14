import React from 'react';
import '../src/style.scss'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../src/components/navbar';
import Footer from '../src/components/footer';
import Home from '../src/components/Home';
import Movies from '../src/components/movies';
import Booking from '../src/functional components/Booking';
import BookingSummary from '../src/functional components/BookingSummary';
import UserProfile from '../src/functional components/UserProfile';
import AdminDashboard from '../src/Admin-Specific Components/AdminDashboard';
import ManageBookings from './Admin-Specific Components/ManageBookings';
import ManageShowtimes from './Admin-Specific Components/ManageShowtimes';
import NotFound from '../src/Utility Components/Not Found';
import Register from './components/auth/registration';
import Login from './components/auth/login';
import ManageMovie from './Admin-Specific Components/ManageMovie';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-container"> {/* Wrapper for full-page layout */}
      {!hideHeaderFooter && <Header />}
      <main className="content">{children}</main> {/* Main content area */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Authorization */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/profile" element={<UserProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/manage-movie" element={<ManageMovie />} />
          <Route path="/admin/manage-showtimes" element={<ManageShowtimes />} />
          <Route path="/admin/manage-booking" element={<ManageBookings />} />

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default AppRoutes;
