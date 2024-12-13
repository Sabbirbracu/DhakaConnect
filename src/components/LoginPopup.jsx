import React, { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ isOpen, onClose, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // For navigation after successful login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(''); // Reset previous errors
  
    try {
      // Send API request to the backend login endpoint
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
      console.log('Response:', response); // Debug the response object
      console.log('Data:', data); // Debug the data returned from the backend
  
      if (response.ok) {
        // Login successful
        console.log('Login successful');
        localStorage.setItem('auth_token', data.token); // Save token to localStorage
        setIsLoggedIn(true); // Update login state
        onClose(); // Close the modal
        navigate('/dashboard'); // Redirect to the dashboard or home page
      } else {
        // Login failed
        console.error('Login failed:', data);
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Error occurred during login:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Stop the loading state
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-50 md:w-96">
        <h2 className="text-4xl font-bold mb-4 place-self-center">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error if any */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded hover:bg-blue-600 ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Log In'}
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
