import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DriverDashboard from './pages/DriverDashboard';
import DriverRegistrationPage from './pages/DriverRegistrationPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Header from '/Users/sabbirahmad/Desktop/DhakaConnect/src/components/header';
import RoutePage from '/Users/sabbirahmad/Desktop/DhakaConnect/src/pages/Routepage.jsx';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('auth_token') ? true : false
    );
    const [userInfo, setUserInfo] = useState(null); 
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
                .then((data) => {
                    console.log('Fetched user data:', data);
                    if (data.user) {
                        setUserInfo(data.user);
                        console.log('User Info Set:', data.user);
                    } else {
                        console.error('User data not found in response:', data);
                        setUserInfo(null);
                    }
                })
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
                userInfo={userInfo}
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
                    path="/driver-dashboard"
                    element={
                        isLoggedIn && userInfo?.role === 'driver' ? (
                            <DriverDashboard onLogout={handleLogout} />
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
            </Routes>
        </Router>
    );
};

export default App;
