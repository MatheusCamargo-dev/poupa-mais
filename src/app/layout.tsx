import '../styles/globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Matheus Camargo Dev</title>
        <link rel="icon" type="image/svg+xml" href="/PriceHouse.ico" />
      </head>
      <body className="bg-dark-blue">{children}</body>
    </html>
  );
}
