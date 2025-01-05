import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationContext } from '../contexts/LocationContext';

const MapPage = () => {
  const { location, setLocation } = useContext(LocationContext);
  const startLocation = { lat: 23.7808, lng: 90.4265 }; // Fixed: Badda coordinates
  const [destination, setDestination] = useState(null); // Dynamic destination
  const [routeCoordinates, setRouteCoordinates] = useState([startLocation]);

  // Update route when destination changes
  useEffect(() => {
    if (destination) {
      const newRoute = [
        [startLocation.lat, startLocation.lng], // Fixed start
        [destination.lat, destination.lng], // Dynamic destination
      ];
      setRouteCoordinates(newRoute);
    }
  }, [destination]);

  // Simulating user input or API for destination
  useEffect(() => {
    const simulatedDestination = { lat: 23.8103, lng: 90.4125 }; // Example: Gulshan
    setTimeout(() => setDestination(simulatedDestination), 3000); // Simulate a delay
  }, []);

  // Simulate real-time location updates for the start point
  useEffect(() => {
    const simulateRealTimeUpdates = () => {
      setInterval(() => {
        const newLocation = {
          lat: startLocation.lat + Math.random() * 0.01,
          lng: startLocation.lng + Math.random() * 0.01,
        };
        setLocation(newLocation);
      }, 5000); // Update every 5 seconds
    };

    simulateRealTimeUpdates();
  }, [setLocation]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[startLocation.lat, startLocation.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Start Marker */}
        <Marker position={[startLocation.lat, startLocation.lng]}>
          <Popup>Start: Badda</Popup>
        </Marker>
        
        {/* Destination Marker */}
        {destination && (
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>Destination: {`Lat: ${destination.lat}, Lng: ${destination.lng}`}</Popup>
          </Marker>
        )}

        {/* Route Visualization */}
        {routeCoordinates.length > 1 && (
          <Polyline positions={routeCoordinates} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;
