import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents,Polyline } from 'react-leaflet';

import type { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const InteractiveMap: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [directions, setDirections] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(13);

  useEffect(() => {
    if (currentLocation && destination) {
      const apiKey = '8caafaf9-a868-4bde-ba35-59d297dd86de';
      const url = `https://graphhopper.com/api/1/route?point=${currentLocation[0]},${currentLocation[1]}&point=${destination[0]},${destination[1]}&vehicle=car&locale=en&instructions=true&key=${apiKey}`;

      axios.get(url)
        .then((response) => {
          setDirections(response.data.paths[0].points.coordinates);
        })
        .catch((error) => {
          console.error('Error fetching directions:', error);
        });
    }
  }, [currentLocation, destination]);

  const handleGeolocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
      setMapCenter([latitude, longitude]);
    });
  };

  const handleDestination = (lat: number, lng: number) => {
    setDestination([lat, lng]);
  };

  useEffect(() => {
    // Create custom marker icon
    const customMarkerIcon = L.icon({
      iconUrl:'.././marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    //   shadowUrl:'.././marker-shadow.png',
    //   shadowSize: [41, 41],
    });

    // Set default marker icon
    L.Marker.prototype.options.icon = customMarkerIcon;
  }, []);

  const ChangeView = ({ center, zoom }: { center: LatLngExpression | null; zoom: number }) => {
    const map = useMapEvents({
      load: () => {
        if (center) {
          map.setView(center, zoom);
        }
      },
    });

    return null;
  };

  return (
    <div className="Text-at-center" >
      <button onClick={handleGeolocation}>Use Current Location</button>
      <input
        type="text"
        placeholder="Enter destination"
        onChange={(e) => setDestination(null)}
      />

      {currentLocation && (
        <MapContainer center={mapCenter || undefined} zoom={zoomLevel} style={{ height: '400px', width: '100%' }}>
          <ChangeView center={mapCenter} zoom={zoomLevel} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={currentLocation}>
            <Popup>Current Location</Popup>
          </Marker>
          {destination && (
            <>
              <Marker position={destination}>
                <Popup>Destination</Popup>
              </Marker>
              {directions && (
                <Polyline positions={directions} />
              )}
            </>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default InteractiveMap;
