import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Holialby — Your Event, Beautifully Remembered",
  description: "Upload your event photos and receive a beautifully designed physical album with personalized layouts, captions, and religious content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
