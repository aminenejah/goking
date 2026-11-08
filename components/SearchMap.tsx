"use client";

import { useEffect, useState } from "react";
import styles from "./SearchMap.module.css";

interface SearchMapProps {
  properties: any[];
}

export default function SearchMap({ properties }: SearchMapProps) {
  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState<any>(null);
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamic import of Leaflet + react-leaflet (SSR-safe)
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
    ]).then(([leaflet, reactLeaflet]) => {
      // Fix default marker icons
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
      setL(leaflet.default);
      setMapComponents(reactLeaflet);
      setMapReady(true);
    });
  }, []);

  // Filter properties that have valid coordinates
  const mappable = properties.filter(
    (p) => p.lat && p.lng && p.lat !== 0 && p.lng !== 0
  );

  // Center on Tunisia by default, or fit to markers
  const defaultCenter: [number, number] = [34.0, 9.0];
  const center: [number, number] =
    mappable.length > 0
      ? [
          mappable.reduce((sum, p) => sum + p.lat, 0) / mappable.length,
          mappable.reduce((sum, p) => sum + p.lng, 0) / mappable.length,
        ]
      : defaultCenter;

  if (!mapReady || !MapComponents) {
    return (
      <div
        className={styles.mapContainer}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          color: "#999",
          fontSize: "0.9rem",
        }}
      >
        Loading map…
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={center}
        zoom={mappable.length > 0 ? 7 : 6}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mappable.map((property) => (
          <Marker
            key={property.id}
            position={[property.lat, property.lng]}
          >
            <Popup>
              <a
                href={`/properties/${property.id}`}
                className={styles.popup}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className={styles.popupImage}
                />
                <div className={styles.popupInfo}>
                  <span className={styles.popupTitle}>{property.title}</span>
                  <span className={styles.popupPrice}>${property.price}</span>
                  <span className={styles.popupAddress}>{property.address}</span>
                </div>
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
