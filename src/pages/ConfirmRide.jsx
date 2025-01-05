// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const ConfirmRide = () => {
//   const location = useLocation();
//   const { rideInfo } = location.state || {};
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (rideInfo && rideInfo.destination) {
//       const createRideRequest = async () => {
//         try {
//           const token = localStorage.getItem("auth_token");
//           if (!token) {
//             setMessage("You must be logged in to confirm the ride.");
//             return;
//           }

//           const response = await fetch("http://127.0.0.1:8000/api/ride-requests", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               end_location_id: rideInfo.destination.id, // Use destination ID for the API
//             }),
//           });

//           const data = await response.json();
//           if (response.ok) {
//             setMessage("Ride request created successfully!");
//           } else {
//             setMessage(data.message || "Failed to create ride request.");
//           }
//         } catch (error) {
//           setMessage("An error occurred while creating the ride request.");
//           console.error("Error:", error);
//         }
//       };

//       createRideRequest();
//     }
//   }, [rideInfo]);

//   if (!rideInfo) {
//     return <p>No ride information available.</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
//       <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Ride Details</h2>
//         <p className="text-gray-700">
//           <strong>Pickup Location:</strong> {rideInfo.pickup}
//         </p>
//         <p className="text-gray-700">
//           <strong>Destination:</strong> {rideInfo.destination.name}
//         </p>
//         <p className="text-gray-700">
//           <strong>Distance:</strong> {rideInfo.distance} km
//         </p>
//         <p className="text-gray-700">
//           <strong>Fare:</strong> {rideInfo.fare} BDT
//         </p>
//         <p className="text-gray-700">
//           <strong>Estimated Time:</strong> {rideInfo.time}
//         </p>
//       </div>
//       <p className="text-red-500 mt-4 font-bold">Searching for your ride partner, Please wait...</p>
//       {message && <p className="text-green-600 mt-4">{message}</p>}
//     </div>
//   );
// };

// export default ConfirmRide;



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmRide = () => {
  const location = useLocation();
  const rideInfo = location.state?.rideInfo || {};
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [groupDetails, setGroupDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        // Call the group API
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`http://127.0.0.1:8000/api/ride-groups/${rideInfo.destination.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass the token
          },
        });

        const data = await response.json();

        if (response.ok) {
          setGroupDetails(data.group);
        } else {
          setError(data.message || 'Failed to fetch ride group details.');
        }
      } catch (err) {
        setError('An error occurred while fetching ride group details.');
      } finally {
        setLoadingGroup(false);
      }
    };

    fetchGroupDetails();
  }, [rideInfo.destination.id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
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

      <div className="mt-6 text-center">
        {loadingGroup ? (
          <p className="text-red-500 font-bold">Searching for your ride partner, Please wait...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : groupDetails && groupDetails.length > 0 ? (
          <div className="mt-4 bg-blue-50 p-4 rounded shadow">
            <h3 className="text-lg font-bold text-blue-600">Ride Group Details:</h3>
            <ul className="mt-2">
              {groupDetails.map((group, index) => (
                <li key={index} className="text-gray-700">
                  - {group.user.name || 'User'} is also heading to {rideInfo.destination.name}.
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-green-500 font-bold">No ride partners found yet. Please wait...</p>
        )}
      </div>

      {!loadingGroup && !error && (
        <p className="mt-4 text-green-600 font-bold">Ride request created successfully!</p>
      )}
    </div>
  );
};

export default ConfirmRide;
