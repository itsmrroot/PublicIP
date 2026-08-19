import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
