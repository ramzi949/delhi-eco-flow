'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Location, LocationCategory } from '@/data/types';

const COLORS: Record<LocationCategory, string> = {
  ewaste: '#c4e538',
  composting: '#4ade80',
  recycler: '#60a5fa',
  hazardous: '#f97316',
  landfill: '#dc2626',
};

const RADIUS: Record<LocationCategory, number> = {
  ewaste: 8,
  composting: 8,
  recycler: 8,
  hazardous: 8,
  landfill: 14,
};

interface MapClientProps {
  locations: Location[];
  activeCategories: Set<LocationCategory>;
}

export default function MapClient({ locations, activeCategories }: MapClientProps) {
  const visible = locations.filter(loc => activeCategories.has(loc.category));

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={11}
      style={{ height: '70vh', width: '100%' }}
      className="rounded-lg"
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={20}
      />
      {visible.map(loc => (
        <CircleMarker
          key={loc.id}
          center={[loc.lat, loc.lng]}
          radius={RADIUS[loc.category]}
          pathOptions={{
            color: COLORS[loc.category],
            fillColor: COLORS[loc.category],
            fillOpacity: 0.85,
            weight: 2,
          }}
        >
          <Popup>
            <div style={{ fontSize: 13, lineHeight: 1.5, minWidth: 180 }}>
              <strong style={{ fontSize: 14 }}>{loc.name}</strong>
              {loc.placeholder && (
                <span style={{ marginLeft: 6, fontSize: 11, color: '#f97316' }}>
                  [unverified]
                </span>
              )}
              <br />
              <span style={{ color: '#888' }}>{loc.address}</span>
              <br />
              <span style={{ color: '#888' }}>
                <em>Accepts:</em> {loc.accepts}
              </span>
              {loc.hours && (
                <>
                  <br />
                  <span style={{ color: '#888' }}>
                    <em>Hours:</em> {loc.hours}
                  </span>
                </>
              )}
              {loc.sourceUrl && (
                <>
                  <br />
                  <a
                    href={loc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#60a5fa', fontSize: 12 }}
                  >
                    Source ↗
                  </a>
                </>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
