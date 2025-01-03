import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
import '../styles/Header.css';
import LoginPopup from './LoginPopup';

const Header = ({ isLoggedIn, setIsLoggedIn, userInfo }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false); // State to control the login modal
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the sidebar menu
    const [showDropdown, setShowDropdown] = useState(false); // State for user menu dropdown

    const handleLogout = () => {
        localStorage.removeItem('auth_token'); // Remove token
        setIsLoggedIn(false); // Update logged-in state
    };

    return (
        <header>
            {/* section for the up section of Header */}
            <div className='up-header p-2'>
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

                {/* Hamburger Menu for Mobile */}
                <div className="mobile-menu-icon md:hidden w-20 justify-center pt-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="text-5xl text-center cursor-pointer">&#9776;</span> {/* Hamburger icon */}
                </div>

                {/* Menu Section (Hidden on Mobile, Visible on Desktop) */}
                <nav className="hidden md:block">
                    <ul className="NavMenu_ul">
                        {!isLoggedIn && <li><Link to="/">Home</Link></li>}
                        <li><Link to="#">Features</Link></li>
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#">Contact</Link></li>
                    </ul>
                </nav>

                {/* Sidebar for Mobile */}
                <div
                    className={`fixed top-0 z-50 right-0 h-full bg-blue-950 shadow-lg transform ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out w-64`}
                >
                    <div className="p-5">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-white text-xl font-bold"
                        >
                            <X size={30} /> {/* Close icon */}
                        </button>
                        <ul className="mt-6 text-white font-extrabold">
                            {!isLoggedIn && (
                                <li className="mb-4">
                                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                </li>
                            )}
                            <li className="mb-4">
                                <Link to="#" onClick={() => setIsMenuOpen(false)}>Features</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="#" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="#" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                            </li>
                            <li>
                                {/* Button Section */}
                                <div className='md:block button-div'>
                                    {!isLoggedIn ? (
                                        <button
                                            onClick={() => setIsLoginOpen(true)} // Open the login modal
                                            className='btn-primary bg-green-500 font-extrabold rounded-md'
                                        >
                                            Get Started
                                        </button>
                                    ) : (
                                        <div className="relative inline-block">
                                            <button
                                                className="bg-green-900 text-white w-10 h-10 rounded-full flex items-center justify-center"
                                                onClick={() => setShowDropdown(!showDropdown)}
                                            >
                                                {userInfo?.fname?.[0]?.toUpperCase() || 'U'}
                                            </button>
                                            {showDropdown && (
                                                <div className="md:hidden absolute right-0 mt-2 w-48 bg-green-900 shadow-md rounded-lg z-50">
                                                    <ul className='text-white'>
                                                        <li className="p-2 hover:bg-gray-200 hover:text-blue-950 hover:rounded-t-lg">
                                                            <Link to="/profile">View Profile</Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-200 hover:text-blue-950">
                                                            <Link to="/settings">Settings</Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-200 hover:text-blue-950">
                                                            <Link to="/feedback">Give Feedback</Link>
                                                        </li>
                                                        <li className="p-2 hover:bg-gray-200 text-red-500 cursor-pointer hover:rounded-b-lg" onClick={handleLogout}>
                                                            Logout
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Button Section */}
                <div className='hidden md:block button-div'>
                    {!isLoggedIn ? (
                        <button
                            onClick={() => setIsLoginOpen(true)} // Open the login modal
                            className='btn-primary bg-green-500 font-extrabold rounded-md'
                        >
                            Get Started
                        </button>
                    ) : (
                        <div className="relative inline-block">
                            <button
                                className="bg-green-900 text-white w-10 h-10 rounded-full flex items-center justify-center"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                {userInfo?.fname?.[0]?.toUpperCase() || 'U'}
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-blue-950 shadow-md rounded-lg z-50">
                                    <ul className='text-white'>
                                        <li className="p-2 hover:bg-gray-200 hover:text-blue-950 hover:rounded-t-lg">
                                            <Link to="/profile">View Profile</Link>
                                        </li>
                                        <li className="p-2 hover:bg-gray-200 hover:text-blue-950">
                                            <Link to="/settings">Settings</Link>
                                        </li>
                                        <li className="p-2 hover:bg-gray-200 hover:text-blue-950">
                                            <Link to="/feedback">Give Feedback</Link>
                                        </li>
                                        <li className="p-2 hover:bg-gray-200 text-red-500 cursor-pointer hover:rounded-b-lg" onClick={handleLogout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Login Popup */}
                <LoginPopup
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    setIsLoggedIn={setIsLoggedIn} // Pass the function here
                />
            </div>
        </header>
    );
};

export default Header;
