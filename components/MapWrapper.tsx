"use client";

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./PropertyMap'), { 
  ssr: false,
  loading: () => <div style={{ height: "400px", background: "#f4f4f5", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading Map...</div>
});

export default function MapWrapper({ lat, lng, title }: { lat: number, lng: number, title: string }) {
  return <DynamicMap lat={lat} lng={lng} title={title} />;
}
