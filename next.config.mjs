/** @type {import('next').NextConfig} */
const nextConfig = {
  // react-leaflet's MapContainer initializes its Leaflet instance
  // imperatively on mount; React 18 Strict Mode's dev-only double-mount
  // tears that instance down and can leave the map blank. Disabled here
  // since it's a dev-only diagnostic aid, not a production behavior.
  reactStrictMode: false,
};

export default nextConfig;
