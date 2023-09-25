import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import 'leaflet.locatecontrol';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import busIconUrl from './logo.png'; // Update the path to your bus icon image

const MapComponent = () => {
  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      return;
    }

    const map = L.map(mapContainer).setView([22.5958, 88.2636], 11);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Leaflet &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const busIcon = L.icon({
      iconUrl: busIconUrl,
      iconSize: [40, 40],
    });

    let marker;

    marker = L.marker([22.5958, 88.2636], { icon: busIcon }).addTo(map);

    // Create a Geocoder control
    const geocoderControl = L.Control.geocoder({
      geocoder: new L.Control.Geocoder.Nominatim({
        geocodingQueryParams: {
          apiKey: 'your-api-key', // Replace with your actual API key
        },
      }),
    }).addTo(map);

    console.log(geocoderControl);
    // Create a Locate control
    L.control.locate().addTo(map);

    

    // Cleanup function
    return () => {
      if (marker) {
        marker.remove();
      }
      map.remove();
    };
  }, []);

  return (
    <div className='con1'>
      <div id="map" style={{ width: '100%', height: '35vh' }}></div>
    </div>
  );
};

export default MapComponent;
