// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';
// import Header from './components/Header'; // Import Header here
// import '/Users/sabbirahmad/Desktop/DhakaConnect/src/App.css';

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(
//         localStorage.getItem('auth_token') ? true : false // Check if token exists
//     );

//     // Protected Route Component
//     const ProtectedRoute = ({ children }) => {
//         return isLoggedIn ? children : <Navigate to="/" />; // Redirect to home if not logged in
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('auth_token'); // Clear auth token
//         setIsLoggedIn(false); // Update login state
//     };

//     return (
//         <Router>
//             <Header setIsLoggedIn={setIsLoggedIn} /> 
//             <Routes>
//                 {/* Public Routes */}
//                 <Route
//                     path="/"
//                     element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
//                 />
//                 <Route path="/register" element={<RegisterPage />} />

//                 {/* Protected Routes */}
//                 <Route
//                     path="/dashboard"
//                     element={
//                         <ProtectedRoute>
//                             <Dashboard onLogout={handleLogout} />
//                         </ProtectedRoute>
//                     }
//                 />
//             </Routes>
//         </Router>
//     );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import '/Users/sabbirahmad/Desktop/DhakaConnect/src/App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth_token') ? true : false);
    const [userInfo, setUserInfo] = useState(null); // To store user data

    useEffect(() => {
        if (isLoggedIn) {
            // Fetch user info if logged in
            fetch('http://127.0.0.1:8000/api/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setUserInfo(data))
                .catch((err) => console.error(err));
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('auth_token'); // Remove token
        setIsLoggedIn(false);
        setUserInfo(null); // Clear user info
    };

    return (
        <Router>
            <Header
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userInfo={userInfo}
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? (
                            <Dashboard onLogout={handleLogout} />
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
