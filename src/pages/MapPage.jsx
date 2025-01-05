import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

const MapPage = ({ startLocation, destination, onConfirm }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Update route when destination changes
  useEffect(() => {
    if (destination) {
      const newRoute = [
        [startLocation.lat, startLocation.lng], // Fixed start
        [destination.lat, destination.lng], // Dynamic destination
      ];
      setRouteCoordinates(newRoute);
    }
  }, [startLocation, destination]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Ride Route Map</h1>

      {/* Map */}
      <div style={{ height: '70vh', width: '90%' }} className="mb-6">
      <MapContainer
        center={[startLocation.lat, startLocation.lng]}
        className="map-container"
        zoom={13}
        style={{ height: '500px', width: '100%' }} // Set a fixed height and full width
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Start Marker */}
          <Marker position={[startLocation.lat, startLocation.lng]}>
            <Popup>Pickup: Merul Badda</Popup>
          </Marker>

          {/* Destination Marker */}
          {destination && (
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>Destination: {destination.name}</Popup>
            </Marker>
          )}

          {/* Route Visualization */}
          {routeCoordinates.length > 1 && (
            <Polyline positions={routeCoordinates} color="blue" />
          )}
        </MapContainer>
      </div>

      {/* Confirm Ride Button */}
      <button
        onClick={onConfirm}
        className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default MapPage;


