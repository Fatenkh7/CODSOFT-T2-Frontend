import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <div className="container-Header">
            <header className="header">
                <div className="logo">Your Logo</div>
                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <div className="nav-links">
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <Link to="/about" onClick={closeMenu}>About</Link>
                        <Link to="/services" onClick={closeMenu}>Services</Link>
                        <Link to="/contact" onClick={closeMenu}>Contact</Link>
                    </div>
                </nav>
                <button className="menu-button" onClick={toggleMenu}>
                    {menuOpen ? 'Close' : 'Menu'}
                </button>
            </header>
        </div>
    );
}

export default Header;
