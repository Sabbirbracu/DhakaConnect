import React, { useState } from 'react';
import Button from './button';
import '../styles/Header.css';
import LoginPopup from './LoginPopup';
import { Link } from 'react-router';
const Header = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control the login modal

    return (
        <header>
            {/* Logo Section */}
            <div className="Logo">
                <img src="/logo.png" alt="logo" />
            </div>

            {/* Menu Section */}
            <nav>
                <ul className="NavMenu_ul">
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="#" >Features</Link></li>
                    <li><Link to="#" >Contact</Link></li>
                </ul>
            </nav>

            {/* Button Section */}
            <div>
                <button
                    onClick={() => setIsLoginOpen(true)} // Open the login modal
                    
                >
                    Get Started
                </button>
            </div>

            {/* Login Popup */}
            <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </header>
    );
};

export default Header;
