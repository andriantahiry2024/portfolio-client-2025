import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

// Fix default marker icon issue (utilisation des assets officiels Leaflet via CDN)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LocationMapProps {
  center?: LatLngExpression;
  zoom?: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  // Coordonnées par défaut mises à jour pour Antananarivo (position exacte fournie)
  center = [-18.904039816135764, 47.51331551559624] as LatLngExpression,
  zoom = 13 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[400px] w-full relative z-10 rounded-lg overflow-hidden shadow-lg"
    >
      <MapContainer 
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>
            Antananarivo, Madagascar<br />
            (Ma localisation exacte)
          </Popup>
        </Marker>
      </MapContainer>

      {/* Étiquette lisible directement sur la carte sans clic */}
      <div className="pointer-events-none absolute bottom-2 left-2 z-[1000] rounded-md bg-white/90 text-black text-xs font-medium px-2 py-1 shadow">
        Antananarivo, Madagascar
      </div>
    </motion.div>
  );
};

export default LocationMap; 