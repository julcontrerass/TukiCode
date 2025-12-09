import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Optimización: muestra texto con fuente del sistema mientras carga
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  title: "TukiCode | Software Studio",
  description: "Transformamos el futuro digital con software a medida. Desarrollo web, apps móviles y soluciones tecnológicas personalizadas.",
  keywords: ['desarrollo web', 'software a medida', 'apps móviles', 'TukiCode'],
  authors: [{ name: 'TukiCode' }],
  openGraph: {
    title: 'TukiCode | Software Studio',
    description: 'Transformamos el futuro digital con software a medida.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Agregamos suppressHydrationWarning aquí para evitar el error de extensiones */}
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}