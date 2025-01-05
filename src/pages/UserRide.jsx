// import React, { useState } from 'react';

// const UserRide = () => {
//   const [pickupLocation, setPickupLocation] = useState('');
//   const [dropoffLocation, setDropoffLocation] = useState('');
//   const [rideRequested, setRideRequested] = useState(false);

//   const handleRideRequest = () => {
//     if (!pickupLocation || !dropoffLocation) {
//       alert('Please enter both pickup and drop-off locations.');
//       return;
//     }
//     // Simulate ride request confirmation
//     setRideRequested(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Request a Ride</h1>

//       {!rideRequested ? (
//         <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
//           <div className="mb-4">
//             <label className="block font-bold mb-2 text-gray-700">Pickup Location</label>
//             <input
//               type="text"
//               value={pickupLocation}
//               onChange={(e) => setPickupLocation(e.target.value)}
//               className="w-full border border-gray-300 p-2 rounded"
//               placeholder="Enter your pickup location"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block font-bold mb-2 text-gray-700">Drop-off Location</label>
//             <input
//               type="text"
//               value={dropoffLocation}
//               onChange={(e) => setDropoffLocation(e.target.value)}
//               className="w-full border border-gray-300 p-2 rounded"
//               placeholder="Enter your drop-off location"
//             />
//           </div>
//           <button
//             onClick={handleRideRequest}
//             className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//           >
//             Request Ride
//           </button>
//         </div>
//       ) : (
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-green-600 mb-4">Ride Requested Successfully!</h2>
//           <p className="text-gray-700">Your ride from <b>{pickupLocation}</b> to <b>{dropoffLocation}</b> has been requested. Please wait for a driver to confirm.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRide;


// import React, { useState } from 'react';

// const UserRide = () => {
//     const [destination, setDestination] = useState('');
//     const [rideInfo, setRideInfo] = useState(null);

//     const handleRideRequest = () => {
//         if (!destination) {
//             alert('Please select a valid destination!');
//             return;
//         }

//         // Mock ride calculation (this will later be replaced with API call)
//         const distance = Math.random() * (10 - 2) + 2; // Random distance between 2km and 10km
//         const fare = distance * 20; // Assume 20 BDT per km
//         const time = distance * 3; // Assume 3 minutes per km

//         setRideInfo({
//             pickup: 'Badda', // Fixed pickup location
//             destination,
//             distance: distance.toFixed(2),
//             fare: fare.toFixed(2),
//             time: `${Math.floor(time / 60)} hours ${Math.ceil(time % 60)} minutes`,
//         });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//             <h1 className="text-3xl font-bold text-blue-600 mb-6">Take a Ride</h1>

//             {/* Destination Selector */}
//             <div className="w-full max-w-md mb-6">
//                 <label htmlFor="destination" className="block text-lg font-medium mb-2">
//                     Choose Your Destination:
//                 </label>
//                 <select
//                     id="destination"
//                     value={destination}
//                     onChange={(e) => setDestination(e.target.value)}
//                     className="w-full border border-gray-300 rounded px-4 py-2"
//                 >
//                     <option value="">Select Destination</option>
//                     <option value="Rampura Bridge">Rampura Bridge</option>
//                     <option value="Mohakhali">Mohakhali</option>
//                     <option value="Farmgate">Farmgate</option>
//                     <option value="Gulshan">Gulshan</option>
//                     <option value="Banani">Banani</option>
//                 </select>
//             </div>

//             {/* Ride Request Button */}
//             <button
//                 onClick={handleRideRequest}
//                 className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 mb-6"
//             >
//                 Request Ride
//             </button>

//             {/* Ride Information */}
//             {rideInfo && (
//                 <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
//                     <h2 className="text-xl font-bold mb-4">Ride Details</h2>
//                     <p className="text-gray-700">
//                         <strong>Pickup Location:</strong> {rideInfo.pickup}
//                     </p>
//                     <p className="text-gray-700">
//                         <strong>Destination:</strong> {rideInfo.destination}
//                     </p>
//                     <p className="text-gray-700">
//                         <strong>Distance:</strong> {rideInfo.distance} km
//                     </p>
//                     <p className="text-gray-700">
//                         <strong>Fare:</strong> {rideInfo.fare} BDT
//                     </p>
//                     <p className="text-gray-700">
//                         <strong>Estimated Time:</strong> {rideInfo.time}
//                     </p>
//                     <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                         Confirm Ride
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserRide;



import React, { useState } from 'react';
import MapPage from './MapPage';



const UserRide = () => {
  const [destination, setDestination] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [rideInfo, setRideInfo] = useState(null);

  const startLocation = { lat: 23.7808, lng: 90.4265 }; // Fixed: Merul Badda

  const destinations = [
    { name: 'Rampura Bridge', lat: 23.7689, lng: 90.4212 },
    { name: 'Mohakhali', lat: 23.7785, lng: 90.4000 },
    { name: 'Farmgate', lat: 23.7515, lng: 90.3910 },
    { name: 'Gulshan', lat: 23.8103, lng: 90.4125 },
    { name: 'Banani', lat: 23.7965, lng: 90.4049 },
  ];

  const handleRideRequest = () => {
    if (!destination) {
      alert('Please select a valid destination!');
      return;
    }

    const selectedDestination = destinations.find((d) => d.name === destination);

    const distance = Math.random() * (10 - 2) + 2; // Random distance between 2km and 10km
    const fare = distance * 20; // Assume 20 BDT per km
    const time = distance * 3; // Assume 3 minutes per km

    setRideInfo({
      pickup: 'Merul Badda', // Fixed pickup location
      destination: selectedDestination,
      distance: distance.toFixed(2),
      fare: fare.toFixed(2),
      time: `${Math.floor(time / 60)} hours ${Math.ceil(time % 60)} minutes`,
    });

    setShowMap(true); // Show map after requesting the ride
  };

  const handleConfirmRide = () => {
    alert('Ride confirmed! Have a safe journey.');
    setShowMap(false); // Reset the map view after confirming the ride
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {showMap ? (
        <MapPage
          startLocation={startLocation}
          destination={rideInfo.destination}
          onConfirm={handleConfirmRide}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Take a Ride</h1>

          {/* Destination Selector */}
          <div className="w-full max-w-md mb-6">
            <label htmlFor="destination" className="block text-lg font-medium mb-2">
              Choose Your Destination:
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select Destination</option>
              {destinations.map((d, idx) => (
                <option key={idx} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ride Request Button */}
          <button
            onClick={handleRideRequest}
            className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 mb-6"
          >
            Request Ride
          </button>

          {/* Ride Information */}
          {rideInfo && (
            <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Ride Details</h2>
              <p className="text-gray-700">
                <strong>Pickup Location:</strong> {rideInfo.pickup}
              </p>
              <p className="text-gray-700">
                <strong>Destination:</strong> {rideInfo.destination.name}
              </p>
              <p className="text-gray-700">
                <strong>Distance:</strong> {rideInfo.distance} km
              </p>
              <p className="text-gray-700">
                <strong>Fare:</strong> {rideInfo.fare} BDT
              </p>
              <p className="text-gray-700">
                <strong>Estimated Time:</strong> {rideInfo.time}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserRide;
