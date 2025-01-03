import React from 'react';

const DriverDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Driver Dashboard</h1>
        <p className="text-center text-gray-700">Welcome to the Driver Dashboard!</p>
        {/* Add driver-specific options like trip details, earnings, etc. */}
      </div>
    </div>
  );
};

export default DriverDashboard;
