import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EventOne — Campus Events",
  description: "Discover and join amazing campus events."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}