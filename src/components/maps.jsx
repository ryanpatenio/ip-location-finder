import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ lat, long }) => {
  const position = [lat, long];

  return (
    <MapContainer
      key={`${lat}-${long}`} // Ensures a new instance of the map when lat/long changes
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
