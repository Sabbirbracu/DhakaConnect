import React from 'react';
import { Link } from 'react-router-dom';

const DriverDashboard = ({ onLogout, userInfo }) => {
    if (!userInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">
            {/* Welcome Section */}
            <h1 className="text-2xl font-bold mb-4">Welcome to the Driver Dashboard!</h1>
            {userInfo && (
                <div className="bg-gray-100 p-4 rounded shadow mb-6">
                    <p>
                        <strong>Name:</strong> {userInfo.fname} {userInfo.lname}
                    </p>
                    <p>
                        <strong>Email:</strong> {userInfo.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {userInfo.phone}
                    </p>
                </div>
            )}
            <button
                onClick={onLogout}
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    <Link to="/routes">See Routes for Local Bus</Link>
                </button>
            </div>
        </div>
    );
};

export default DriverDashboard;
