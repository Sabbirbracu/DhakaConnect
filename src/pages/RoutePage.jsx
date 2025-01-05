import React, { useState } from 'react';
import BusRouteCard from '../components/BusRouteCard';

const RoutePage = () => {
    const [destination, setDestination] = useState('');
    const [directRoutes, setDirectRoutes] = useState([]);
    const [showSection, setShowSection] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [totalFare, setTotalFare] = useState(0);
    const [loading, setLoading] = useState(false); // New state for loading

    const destinations = [
        'Shewrapara',
        'Kazipara',
        'Gabtoli',
        'Badda',
        'Mohakhali',
        'Rampura Bridge',
    ];

    const busImages = {
        'Alif': '/Alif.webp',
        'BusName2': '/assets/buses/BusName2.jpg',
        'BusName3': '/assets/buses/BusName3.jpg',
        // Add your bus names and corresponding images here
    };

    const handleSearch = async () => {
        if (!destination) {
            alert('Please select a valid destination!');
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await fetch('http://127.0.0.1:8000/api/direct-buses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ destination }),
            });

            const data = await response.json();
            setDirectRoutes(data.routes || []);
            setTotalDistance(data.total_distance || 0);
            setTotalFare(data.total_fare || 0);
        } catch (error) {
            console.error('Error fetching direct buses:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Explore Dhaka City Local Bus Routes</h1>

            {/* Search Bar */}
            <div className="mb-8 text-center">
                <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-1/2"
                >
                    <option value="">Select Your Destination</option>
                    {destinations.map((loc, idx) => (
                        <option key={idx} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleSearch}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center mb-8">
                    <div className="justify-self-center animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
                    <p className="mt-2 text-gray-500">Fetching routes, please wait...</p>
                </div>
            )}

            {/* Direct Buses Section */}
            {!loading && directRoutes.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Direct Buses on Your Route</h2>

                    {/* Bus Name */}
                    <h2 className="text-lg text-blue-600 font-semibold mb-4">
                        Bus Name: {directRoutes[0]?.bus_name}
                    </h2>

                    {/* Route Cards */}
                    <div className="flex flex-wrap items-center space-x-4 space-y-4 overflow-x-auto">
                        {directRoutes.map((route, idx) => (
                            <BusRouteCard
                                key={idx}
                                routeName={`${route.start} → ${route.end}`}
                                image={busImages[route.bus_name] || '/Bus.jpg'} // Use bus image or default
                                fare={`${route.fare} BDT`}
                            />
                        ))}
                    </div>

                    {/* Total Distance and Fare */}
                    <div className="mt-4 p-4 border-t border-gray-300">
                        <p className="text-gray-700 font-semibold">
                            Total Distance: {totalDistance} km
                        </p>
                        <p className="text-gray-700 font-semibold">
                            Total Fare: {totalFare} BDT
                        </p>
                    </div>
                </div>
            )}

            {/* Buttons for additional routes */}
            {!loading && directRoutes.length > 0 && (
                <div className="text-center">
                    <button
                        onClick={() => setShowSection('multi-bus')}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                    >
                        Show Multi-Bus Routes
                    </button>
                    <button
                        onClick={() => setShowSection('shortest')}
                        className="bg-purple-500 text-white px-4 py-2 rounded"
                    >
                        Show Shortest Route
                    </button>
                </div>
            )}
        </div>
    );
};

export default RoutePage;

