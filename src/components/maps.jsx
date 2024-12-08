import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = ({ lat, long }) => {
  const mapRef = useRef(null);  // Ref to store the map instance
  const mapContainerRef = useRef(null);  // Ref to the container element

  const position = [lat, long];

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Initialize the map only if it hasn't been initialized yet
      mapRef.current = L.map(mapContainerRef.current, {
        center: position,
        zoom: 13,
      });

      // Add the tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
    } else if (mapRef.current) {
      // If the map is already initialized, just update the center position
      mapRef.current.setView(position);
    }

    return () => {
      // Clean up the map instance when the component is unmounted
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, long]);  // Dependency array ensures this runs when lat or long change

  if (!lat || !long) {
    return <div>Loading map...</div>;
  }

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: '500px', // Increased height for better visibility
        width: '100%',
        position: 'relative', // Ensures proper positioning inside container
      }}
    />
  );
};

export default MapComponent;
