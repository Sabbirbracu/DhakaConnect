import React, { useState } from 'react';

import Button from './button';
import '../styles/Header.css';
import LoginPopup from './LoginPopup';
import { Link } from 'react-router';
const Header = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control the login modal

    return (
        <header>
            {/* section for the up section of Header */}
            <div className='up-header'>
                <h2>
                    Invite Your Friends & Earn <span>Rewards!</span> Get a free ride for every successful referral.
                </h2>
            </div>

            {/* section of Header */}
            <div className='header'>
                
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
                <div className='button-div'>
                    <button
                        onClick={() => setIsLoginOpen(true)} // Open the login modal
                        className='btn-primary '
                    >
                        Get Started
                    </button>
                </div>

                {/* Login Popup */}
                <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                </div>
            
        </header>
    );
};

export default Header;
