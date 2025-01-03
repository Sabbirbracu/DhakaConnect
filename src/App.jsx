import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DriverRegistrationPage from './pages/DriverRegistrationPage'; // Import the new DriverRegistrationPage
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Header from '/Users/sabbirahmad/Desktop/DhakaConnect/src/components/header'; // Ensure Header is imported
import RoutePage from '/Users/sabbirahmad/Desktop/DhakaConnect/src/pages/Routepage.jsx'; // Import the new RoutePage
import DriverDashboard from './pages/DriverDashboard'; // Adjust the path if needed

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('auth_token') ? true : false
    );
    const [userInfo, setUserInfo] = useState(null); // To store user-specific information

    const handleLogout = () => {
        localStorage.removeItem('auth_token'); // Remove the token
        setIsLoggedIn(false); // Update login state
        setUserInfo(null); // Clear user info
    };

    // Fetch user info when logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetch('http://127.0.0.1:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        handleLogout(); // Log out if token is invalid or expired
                        throw new Error('Session expired or invalid token');
                    }
                })
                .then((data) => setUserInfo(data))
                .catch((err) => console.error(err));
        }
    }, [isLoggedIn]);

    // Auto Logout when token expires
    useEffect(() => {
        if (isLoggedIn) {
            const tokenExpirationTime = 60 * 60 * 1000; // 60 minutes in milliseconds
            const logoutTimer = setTimeout(() => {
                handleLogout(); // Log out the user when session expires
                alert('Your session has expired. Please log in again.');
            }, tokenExpirationTime);

            return () => clearTimeout(logoutTimer); // Clear timer when component unmounts
        }
    }, [isLoggedIn]);

    return (
        <Router>
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userInfo={userInfo} // Pass user info to Header
            />
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register-driver" element={<DriverRegistrationPage setIsLoggedIn={setIsLoggedIn} />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn && userInfo?.role === 'user' ? (
                            <Dashboard onLogout={handleLogout} userInfo={userInfo} />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/routes"
                    element={
                        isLoggedIn ? <RoutePage /> : <Navigate to="/" />
                    }
                />
                <Route
                    path="/driver-dashboard"
                    element={
                        isLoggedIn && userInfo?.role === 'driver' ? (
                            <DriverDashboard />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
