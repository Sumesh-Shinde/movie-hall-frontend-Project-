import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      navigate(`/movies?userId=${userId}`);
    } else {
      alert('Please log in to continue.');
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  return (
    <div className="home">
      {/* ✅ Hero Section */}
      <section className="home__hero">
        <div className="home__hero__content">
          <h1>Welcome to Cinema Hall</h1>
          <p>Your ultimate destination for booking movie tickets and exploring showtimes.</p>
          <button className="home__hero__cta" onClick={handleNavigation}>
            Explore Movies
          </button>
        </div>
      </section>

      {/* ✅ Features Section */}
      <section className="home__features">
        <h2>Why Choose Us?</h2>
        <div className="home__features__grid">
          <div className="home__features__card">
            <h3>Wide Selection of Movies</h3>
            <p>From the latest blockbusters to indie gems, we have it all.</p>
          </div>
          <div className="home__features__card">
            <h3>Seamless Booking</h3>
            <p>Book tickets effortlessly with our user-friendly interface.</p>
          </div>
          <div className="home__features__card">
            <h3>Exclusive Offers</h3>
            <p>Enjoy discounts and special deals on movie tickets.</p>
          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="home__cta">
        <h2>Ready to Book Your Next Movie?</h2>
        <button className="home__cta__button" onClick={handleNavigation}>
          Book Now
        </button>
      </section>
    </div>
  );
};

export default Home;
