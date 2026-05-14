import React from 'react';
import './style.scss';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content__logo">
          <h2>Cinema Hall</h2>
          <p>Your ultimate movie booking destination.</p>
        </div>
        <div className="footer__content__links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/movies">Movies</a></li>
            <li><a href="/booking">Book Tickets</a></li>
            <li><a href="/profile">My Profile</a></li>
          </ul>
        </div>
        <div className="footer__content__social">
          <h3>Follow Us</h3>
          <div className="footer__content__social__icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2025 Cinema Hall. All Rights Reserved @Sumesh Shinde</p>
      </div>
    </footer>
  );
};

export default Footer;
