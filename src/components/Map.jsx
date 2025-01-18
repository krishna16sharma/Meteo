import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapClickHandler = ({ setMarkerPosition, setQuery, setCoordinates }) => {
useMapEvents({
    click: (event) => {
        const { lat, lng } = event.latlng;
        setMarkerPosition({ lat, lon: lng });
        setQuery({ q: ""});
        setCoordinates({ lat: lat, lon: lng });
        console.log('Marker clicked at:', lat, lng);
    },
    });

  return null;
};

const MapCenterUpdater = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lon], 10); // Zoom level 10
    }
  }, [coordinates, map]);

  return null;
};

const Map = ({ coordinates, setQuery, setCoordinates }) => {
  const [markerPosition, setMarkerPosition] = useState(coordinates);

  // Update marker position when coordinates change (e.g., city search)
  useEffect(() => {
    if (coordinates) {
      setMarkerPosition(coordinates);
    }
  }, [coordinates]);

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lon]}
      zoom={10}
      style={{ height: "500px", width: "100%", borderRadius: "15px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapCenterUpdater coordinates={coordinates}/>
      <MapClickHandler setMarkerPosition={setMarkerPosition} setQuery={setQuery} setCoordinates={setCoordinates}/>
      {markerPosition && (
        <Marker
          key={`${markerPosition.lat}-${markerPosition.lon}`} // Force marker re-render
          position={[markerPosition.lat, markerPosition.lon]}
        />
      )}
    </MapContainer>
  );
};

export default Map;
