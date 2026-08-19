// GitHub Pages serves the repo under /<repo-name>/, so the built app
// needs that as its basePath. Only applied when building for Pages
// (set by the deploy workflow) so local dev/build stay at the root.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "PublicIP";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // react-leaflet's MapContainer initializes its Leaflet instance
  // imperatively on mount; React 18 Strict Mode's dev-only double-mount
  // tears that instance down and can leave the map blank. Disabled here
  // since it's a dev-only diagnostic aid, not a production behavior.
  reactStrictMode: false,

  // GitHub Pages hosts static files only, no Node server — this app
  // is fully client-rendered already, so a static export is a clean fit.
  output: "export",
  ...(isGithubPages && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
};

export default nextConfig;
