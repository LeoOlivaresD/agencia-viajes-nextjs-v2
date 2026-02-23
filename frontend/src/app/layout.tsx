import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";

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
      <body>
        <LanguageProvider>
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
              <LanguageSelector />
            </div>
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}