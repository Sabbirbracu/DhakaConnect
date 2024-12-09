import React from 'react';
import Modal from './Modal';
// import { Link } from 'react-router';

const LoginPopup = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='bg-white rounded-lg shadow-lg p-6 w-96'>
            <h2 className="text-4xl font-bold mb-4 place-self-center">Login</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white py-2 rounded hover:bg-blue-600"
                    style={{backgroundColor:"#03123a"}}
                >
                    Log In
                </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
                Not have an account?{' '}
                <a href="/register" className="text-blue-500 hover:underline">
                    Register here
                </a>
            </p>
            </div>
            
            
        </Modal>
    );
};

export default LoginPopup;
