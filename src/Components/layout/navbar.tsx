import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/" onClick={() => window.location.href = '/'}>Hotel Booking</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={() => window.location.href = '/'}>Hotels</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/bookings">Bookings</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
