import React from 'react';

const DriverDashboard = () => {
  // Dummy data for trip requests
  const tripRequests = [
    {
      id: 1,
      starting: 'Badda',
      destination: 'Mohakhali',
      distance: '5 km',
      fare: '100 BDT',
      time: '15 mins',
    },
    {
      id: 2,
      starting: 'Mirpur 10',
      destination: 'Farmgate',
      distance: '10 km',
      fare: '200 BDT',
      time: '25 mins',
    },
    {
      id: 3,
      starting: 'Kazipara',
      destination: 'Shahbagh',
      distance: '8 km',
      fare: '150 BDT',
      time: '20 mins',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">Driver Dashboard</h1>
      <p className="text-lg text-center mb-6">Welcome, Driver! Manage your rides and view your stats here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tripRequests.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              GO: {trip.starting} → {trip.destination}
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Approximate Distance:</span> {trip.distance}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Approximate Fare:</span> {trip.fare}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Approximate Time to Go:</span> {trip.time}
            </p>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Confirm Trip
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverDashboard;
