// Add these imports at the top of your file
import { useEffect, useRef } from 'react';
import L from 'leaflet';
// Add this MapComponent separately in your components folder
const MapComponent = ({ latitude, longitude, onLocationSelect }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
  
    useEffect(() => {
      // Initialize map
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([latitude || 34.0209, longitude || -6.8416], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);
  
        // Add marker
        markerRef.current = L.marker([latitude || 34.0209, longitude || -6.8416], {
          draggable: true
        }).addTo(mapRef.current);
  
        // Handle marker drag
        markerRef.current.on('dragend', (event) => {
          const marker = event.target;
          const position = marker.getLatLng();
          onLocationSelect(position.lat, position.lng);
        });
  
        // Handle map click
        mapRef.current.on('click', (event) => {
          const { lat, lng } = event.latlng;
          markerRef.current.setLatLng([lat, lng]);
          onLocationSelect(lat, lng);
        });
      }
    }, []);
  
    useEffect(() => {
      if (mapRef.current && markerRef.current) {
        // Update marker position when coordinates change
        markerRef.current.setLatLng([latitude || 34.0209, longitude || -6.8416]);
        mapRef.current.setView([latitude || 34.0209, longitude || -6.8416], mapRef.current.getZoom());
      }
    }, [latitude, longitude]);
  
    return null;
  };
  
  export default MapComponent