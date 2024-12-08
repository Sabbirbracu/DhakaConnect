import React from 'react';
import Button from '/Users/sabbirahmad/Desktop/DhakaConnect/src/components/Button';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
            {/* Logo Section */}
            <div className="text-xl font-bold">
                MyApp
            </div>

            {/* Menu Section */}
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-blue-500">Home</a></li>
                    <li><a href="#" className="hover:text-blue-500">Features</a></li>
                    <li><a href="#" className="hover:text-blue-500">Contact</a></li>
                </ul>
            </nav>

            {/* Button Section */}
            <div>
                <Button text="Sign Up" className='btn-primary' />
            </div>
        </header>
    );
};

export default Header;
