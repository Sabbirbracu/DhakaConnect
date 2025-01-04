// import React, { useEffect, useState } from 'react';
// import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import Header from './components/header'; // Correct path
// import Dashboard from './pages/Dashboard';
// import DriverRegistrationPage from './pages/DriverRegistrationPage'; // Correct import
// import HomePage from './pages/HomePage';
// import RegisterPage from './pages/RegisterPage';
// import RoutePage from './pages/Routepage'; // Correct path

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(
//         localStorage.getItem('auth_token') ? true : false
//     );
//     const [userInfo, setUserInfo] = useState(null);

//     const handleLogout = () => {
//         localStorage.removeItem('auth_token');
//         setIsLoggedIn(false);
//         setUserInfo(null);
//     };

//     useEffect(() => {
//         if (isLoggedIn) {
//             fetch('http://127.0.0.1:8000/api/user', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
//                 },
//             })
//                 .then((res) => res.json())
//                 .then((data) => setUserInfo(data))
//                 .catch((err) => console.error(err));
//         }
//     }, [isLoggedIn]);

//     return (
//         <Router>
//             <Header
//                 isLoggedIn={isLoggedIn}
//                 setIsLoggedIn={setIsLoggedIn}
//                 userInfo={userInfo}
//             />
//             <Routes>
//                 {/* Public Routes */}
//                 <Route
//                     path="/"
//                     element={<HomePage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}
//                 />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/register-driver" element={<DriverRegistrationPage />} /> {/* New Route */}

//                 {/* Protected Routes */}
//                 <Route
//                     path="/dashboard"
//                     element={
//                         isLoggedIn ? (
//                             <Dashboard onLogout={handleLogout} userInfo={userInfo} />
//                         ) : (
//                             <Navigate to="/" />
//                         )
//                     }
//                 />
//                 <Route
//                     path="/routes"
//                     element={isLoggedIn ? <RoutePage /> : <Navigate to="/" />}
//                 />
//             </Routes>
//         </Router>
//     );
// };

// export default App;


// -------------------------------------------

import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/header';
import Dashboard from './pages/Dashboard';
import DriverDashboard from './pages/DriverDashboard'; // Import DriverDashboard
import DriverRegistrationPage from './pages/DriverRegistrationPage'; // Import DriverRegistrationPage
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import RoutePage from './pages/Routepage';
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
            path="/routes"
            element={isLoggedIn ? <RoutePage /> : <Navigate to="/" />}
        />
        
      </Routes>
    </Router>
  );
};

export default App;
