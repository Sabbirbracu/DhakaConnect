import React, { useEffect, useState } from 'react';

const Dashboard = ({ onLogout }) => {
    const [user, setUser] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // State to show loading indicator
    const [error, setError] = useState(null); // State to show any errors

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
        <div>
            <h1>Welcome to the Dashboard!</h1>
            {user && (
                <div>
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
        </div>
    );
};

export default Dashboard;
