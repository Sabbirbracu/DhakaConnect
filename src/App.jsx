import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/header';
import Dashboard from './pages/Dashboard';
import DriverDashboard from './pages/DriverDashboard'; // Import DriverDashboard
import DriverRegistrationPage from './pages/DriverRegistrationPage'; // Import DriverRegistrationPage
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import UserRide from './pages/UserRide'; // Import the new UserRide page

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('auth_token') ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role'); // Remove user role
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-driver" element={<DriverRegistrationPage />} /> {/* New Route */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              localStorage.getItem('user_role') === 'user' ? (
                <Dashboard />
              ) : (
                <Navigate to="/driver-dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/driver-dashboard"
          element={
            isLoggedIn ? (
              localStorage.getItem('user_role') === 'driver' ? (
                <DriverDashboard />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
                    path="/ride"
                    element={
                        isLoggedIn ? <UserRide /> : <Navigate to="/" /> // Protect the route
                    }
                />
        
      </Routes>
    </Router>
  );
};

export default App;
