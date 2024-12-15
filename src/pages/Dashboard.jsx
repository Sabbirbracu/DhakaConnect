import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
    const [user, setUser] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // State to show loading indicator
    const [error, setError] = useState(null); // State to show any errors
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user information when the component loads
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('auth_token'); // Retrieve the token from localStorage

                if (!token) {
                    setError('No authentication token found. Please log in.');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://127.0.0.1:8000/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        Authorization: `Bearer ${token}`, // Send token in Authorization header
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUser(data.user); // Set user data from API response
                } else {
                    setError(data.message || 'Failed to fetch user data.');
                }
            } catch (err) {
                setError('An error occurred while fetching user data.');
            } finally {
                setLoading(false); // Hide loading indicator
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth_token'); // Remove token from localStorage
        onLogout(); // Trigger logout action passed as a prop
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator
    }

    if (error) {
        return (
            <div>
                <p className="text-red-500">{error}</p>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Welcome Section */}
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>
            {user && (
                <div className="bg-gray-100 p-4 rounded shadow mb-6">
                    <p>
                        <strong>Name:</strong> {user.fname} {user.lname}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {user.phone}
                    </p>
                </div>
            )}
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded mb-6"
            >
                Logout
            </button>

            {/* Feature 1 Section */}
            <div className="feature-section bg-blue-100 p-6 rounded shadow-md">
                <h2 className="text-xl font-bold text-blue-800 mb-4">
                    Explore Dhaka City Local Bus Routes
                </h2>
                <p className="text-blue-700 mb-4">
                    Find the most efficient and shortest routes for Dhaka city’s local buses.
                </p>
                {/* <button
                    onClick={() => navigate('/routes')}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    See Routes for Local Bus
                </button> */}

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
    <Link to="/routes">See Routes for Local Bus</Link>
</button>
            </div>
        </div>
    );
};

export default Dashboard;
