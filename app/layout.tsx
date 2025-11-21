import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spinwheel Debt Profile Dashboard",
  description: "View and manage debt profiles using Spinwheel API",
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

