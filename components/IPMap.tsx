"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IPInfo } from "@/lib/types";

const TILE_URLS = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
};

const pulseIcon = divIcon({
  className: "",
  html: '<div class="pulse-marker"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 11, { duration: 1.6 });
  }, [lat, lng, map]);
  return null;
}

function InvalidateSizeOnMount() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 200);
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", onResize);
    };
  }, [map]);
  return null;
}

export default function IPMap({ info }: { info: IPInfo }) {
  const { latitude, longitude, city, region, country, ip } = info;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Default to dark tiles until the theme resolves client-side, matching
  // this app's default theme so there's no flash of the wrong style.
  const isLight = mounted && resolvedTheme === "light";
  const tileUrl = isLight ? TILE_URLS.light : TILE_URLS.dark;

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={11}
      scrollWheelZoom={true}
      className="h-full w-full"
      attributionControl={true}
    >
      <TileLayer
        key={tileUrl}
        url={tileUrl}
        subdomains="abcd"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        eventHandlers={{
          tileerror: (e) => console.error("Tile failed to load", e),
        }}
      />
      <InvalidateSizeOnMount />
      <Marker position={[latitude, longitude]} icon={pulseIcon}>
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">{ip}</p>
            <p>
              {city}, {region}
            </p>
            <p>{country}</p>
          </div>
        </Popup>
      </Marker>
      <FlyTo lat={latitude} lng={longitude} />
    </MapContainer>
  );
}
