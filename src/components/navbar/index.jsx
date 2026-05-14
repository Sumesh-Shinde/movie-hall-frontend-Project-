import React, { useState, useEffect } from "react";
import { FaBars, FaFilm } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';

const navItems = [
    { label: 'HOME', to: '/' },
    // { label: 'MOVIES', to: '/movies' },
    // { label: 'BOOKING SUMMARY', to: '/booking-summary' },
    // { label: 'PROFILE', to: '/profile' },
    // { label: 'ADMIN DASHBOARD', to: '/admin' }
];

const NavBar = () => {
    const [toggleIcon, setToggleIcon] = useState(false);
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
    const [username, setUsername] = useState(sessionStorage.getItem('username'));
    const navigate = useNavigate();

    useEffect(() => {
        const updateUserInfo = () => {
            setUserId(sessionStorage.getItem('userId'));
            setUsername(sessionStorage.getItem('username'));
        };

        // ✅ Listen for custom login/logout events and session changes
        window.addEventListener("userLoggedIn", updateUserInfo);
        window.addEventListener("storage", updateUserInfo);

        return () => {
            window.removeEventListener("userLoggedIn", updateUserInfo);
            window.removeEventListener("storage", updateUserInfo);
        };
    }, []);

    const handleToggleIcon = () => {
        setToggleIcon(!toggleIcon);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setUserId(null);
        setUsername(null);

        // ✅ Dispatch event to update Navbar instantly
        window.dispatchEvent(new Event("userLoggedIn"));

        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/" className="navbar__logo">
                    <FaFilm size={30} /> MovieMania
                </Link>
                <ul className={`navbar__menu ${toggleIcon ? 'active' : ''}`}>
                    {navItems.map((item, index) => (
                        <li key={index} className="navbar__menu__item">
                            <Link
                                className="navbar__menu__item__links"
                                to={item.to}
                                onClick={() => setToggleIcon(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    {/* ✅ Login/Logout Button */}
                    <li className="navbar__menu__item">
                        {userId ? (
                            <span className="navbar__user">
                                Logged in as <strong>{username}</strong> | 
                                <button onClick={handleLogout}>Logout</button>
                            </span>
                        ) : (
                            <Link className="navbar__menu__item__links" to="/login">Log in here</Link>
                        )}
                    </li>
                </ul>
                <div className="navbar__icon" onClick={handleToggleIcon}>
                    {toggleIcon ? <HiX size={30} /> : <FaBars size={30} />}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
