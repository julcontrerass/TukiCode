import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones de producción
  compress: true, // Habilita compresión gzip
  poweredByHeader: false, // Elimina header X-Powered-By

  // Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Optimizaciones del compilador (SWC es el minificador por defecto en Next.js 16)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Configuración para producción - Optimizaciones de rendimiento
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@splinetool/react-spline'],
  },

  // Optimización del servidor
  reactStrictMode: true,

  // Headers de seguridad y performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
