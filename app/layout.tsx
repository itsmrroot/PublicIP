import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhereAmI — IP Locator",
  description: "Discover your public IP address and see exactly where it's located on the map.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-100">{children}</body>
    </html>
  );
}
