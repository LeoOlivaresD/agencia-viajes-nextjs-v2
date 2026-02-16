import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agencia de Viajes Oeste",
  description: "Sistema de gestión de solicitudes de viaje",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
