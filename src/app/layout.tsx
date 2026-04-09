import type { Metadata } from "next";
// Fuentes locales — evita ChunkLoadError en Cloudflare Workers
// next/font/google genera chunks SSR dinámicos que Workers no puede resolver
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";


export const metadata: Metadata = {
  title: "NombreWoW - Servidor 3.3.5a",
  description: "Únete a la mejor comunidad de Wrath of the Lich King",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-wow-dark">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
