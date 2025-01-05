// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Dashboard = ({ onLogout }) => {
//     const [user, setUser] = useState(null); // State to hold user data
//     const [loading, setLoading] = useState(true); // State to show loading indicator
//     const [error, setError] = useState(null); // State to show any errors
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch user information when the component loads
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem('auth_token'); // Retrieve the token from localStorage

//                 if (!token) {
//                     setError('No authentication token found. Please log in.');
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await fetch('http://127.0.0.1:8000/api/user', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                         Authorization: `Bearer ${token}`, // Send token in Authorization header
//                     },
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     setUser(data.user); // Set user data from API response
//                 } else {
//                     setError(data.message || 'Failed to fetch user data.');
//                 }
//             } catch (err) {
//                 setError('An error occurred while fetching user data.');
//             } finally {
//                 setLoading(false); // Hide loading indicator
//             }
//         };

//         fetchUser();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('auth_token'); // Remove token from localStorage
//         onLogout(); // Trigger logout action passed as a prop
//     };

//     if (loading) {
//         return <p>Loading...</p>; // Show loading indicator
//     }

//     if (error) {
//         return (
//             <div>
//                 <p className="text-red-500">{error}</p>
//                 <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//                     Logout
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6">
//             {/* Welcome Section */}
//             <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>
//             {user && (
//                 <div className="bg-gray-100 p-4 rounded shadow mb-6">
//                     <p>
//                         <strong>Name:</strong> {user.fname} {user.lname}
//                     </p>
//                     <p>
//                         <strong>Email:</strong> {user.email}
//                     </p>
//                     <p>
//                         <strong>Phone:</strong> {user.phone}
//                     </p>
//                 </div>
//             )}

//             {/* Feature 1 Section */}
//             <div className="feature-section bg-blue-100 p-6 rounded shadow-md">
//                 <h2 className="text-xl font-bold text-blue-800 mb-4">
//                     Explore Dhaka City Local Bus Routes
//                 </h2>
//                 <p className="text-blue-700 mb-4">
//                     Find the most efficient and shortest routes for Dhaka city’s local buses.
//                 </p>

//                 <button className="bg-blue-500 text-white px-4 py-2 rounded">
//     <Link to="/routes">See Routes for Local Bus</Link>
// </button>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// ---------------------------


// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Dashboard = ({ onLogout }) => {
//     const [user, setUser] = useState(null); // State to hold user data
//     const [loading, setLoading] = useState(true); // State to show loading indicator
//     const [error, setError] = useState(null); // State to show any errors
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch user information when the component loads
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem('auth_token'); // Retrieve the token from localStorage

//                 if (!token) {
//                     setError('No authentication token found. Please log in.');
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await fetch('http://127.0.0.1:8000/api/user', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Accept': 'application/json',
//                         Authorization: `Bearer ${token}`, // Send token in Authorization header
//                     },
//                 });

//                 const data = await response.json();

//                 if (response.ok) {
//                     setUser(data.user); // Set user data from API response
//                 } else {
//                     setError(data.message || 'Failed to fetch user data.');
//                 }
//             } catch (err) {
//                 setError('An error occurred while fetching user data.');
//             } finally {
//                 setLoading(false); // Hide loading indicator
//             }
//         };

//         fetchUser();
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('auth_token'); // Remove token from localStorage
//         onLogout(); // Trigger logout action passed as a prop
//     };

//     if (loading) {
//         return <p>Loading...</p>; // Show loading indicator
//     }

//     if (error) {
//         return (
//             <div>
//                 <p className="text-red-500">{error}</p>
//                 <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
//                     Logout
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6">
//             {/* Welcome Section */}
//             <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h1>
//             {user && (
//                 <div className="bg-gray-100 p-4 rounded shadow mb-6">
//                     <p>
//                         <strong>Name:</strong> {user.fname} {user.lname}
//                     </p>
//                     <p>
//                         <strong>Email:</strong> {user.email}
//                     </p>
//                     <p>
//                         <strong>Phone:</strong> {user.phone}
//                     </p>
//                 </div>
//             )}

//             {/* Feature 1 Section */}
//             <div className="feature-section bg-blue-100 p-6 rounded shadow-md mb-6">
//                 <h2 className="text-xl font-bold text-blue-800 mb-4">
//                     Explore Dhaka City Local Bus Routes
//                 </h2>
//                 <p className="text-blue-700 mb-4">
//                     Find the most efficient and shortest routes for Dhaka city’s local buses.
//                 </p>

//                 <button className="bg-blue-500 text-white px-4 py-2 rounded">
//                     <Link to="/routes">See Routes for Local Bus</Link>
//                 </button>
//             </div>

//             {/* Ride Sharing Section */}
//             <div className="ride-section bg-green-100 p-6 rounded shadow-md">
//                 <h2 className="text-xl font-bold text-green-800 mb-4">
//                     Take a ride from our Exciting Ride Sharing System
//                 </h2>
//                 <p className="text-green-700 mb-4">
//                     To take the ride by Car/CNG click the Ride button below.
//                 </p>

//                 <button className="bg-green-500 text-white px-4 py-2 rounded">
//                     <Link to="/ride">Ride</Link>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


// -------------------------

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
    const [user, setUser] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // State to show loading indicator
    const [error, setError] = useState(null); // State to show any errors
    const [showDialPad, setShowDialPad] = useState(false); // State to toggle dial pad
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

            {/* Feature 1 Section */}
            <div className="feature-section bg-blue-100 p-6 rounded shadow-md mb-6">
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

            {/* Ride Sharing Section */}
            <div className="ride-sharing-section bg-green-100 p-6 rounded shadow-md mb-6">
                <h2 className="text-xl font-bold text-green-800 mb-4">
                    Take a ride from our Exciting Ride Sharing System
                </h2>
                <p className="text-green-700 mb-4">
                    To take the ride by Car/CNG click the Ride button.
                </p>
                {/* <button className="bg-green-500 text-white px-4 py-2 rounded">Ride</button> */}
                <Link to="/ride">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                    Ride
                </button>
                </Link>

            </div>

            {/* Emergency Service Section */}
            <div className="emergency-service-section bg-red-100 p-6 rounded shadow-md">
                <h2 className="text-xl font-bold text-red-800 mb-4">Get Emergency Service</h2>
                <div className="text-center">
                    <button
                        className="flex flex-col items-center bg-red-500 text-white px-4 py-2 rounded-full w-16 h-16 mx-auto"
                        onClick={() => setShowDialPad(!showDialPad)}
                    >
                        <span className="text-xl font-bold mb-2">Call Now</span>
                        <i className="fas fa-phone-alt text-2xl"></i>
                    </button>
                    {showDialPad && (
                        <div className="mt-4 bg-white p-4 rounded shadow-md">
                            <h3 className="text-lg font-bold mb-4">Dialpad</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {[...Array(9)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        className="bg-gray-200 text-black font-bold py-2 rounded-full"
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button className="bg-gray-200 text-black font-bold py-2 rounded-full">*</button>
                                <button className="bg-gray-200 text-black font-bold py-2 rounded-full">0</button>
                                <button className="bg-gray-200 text-black font-bold py-2 rounded-full">#</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
