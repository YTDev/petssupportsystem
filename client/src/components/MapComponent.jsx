import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude, longitude, petName }) => {
  if (!latitude || !longitude) {
    return <p>Location not available</p>;
  }

  const position = [latitude, longitude];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position}>
        <Popup>{`Explore ${petName}'s adventure zone!`}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
