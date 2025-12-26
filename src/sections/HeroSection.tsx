import { motion } from 'framer-motion';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Translation } from '@/types';
import type { Application } from '@splinetool/runtime';

// Lazy load Spline (replaces next/dynamic with ssr: false)
const Spline = lazy(() => import('@splinetool/react-spline'));

// Loading component for Spline
const SplineLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

interface HeroSectionProps {
  t: Translation;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [gyroActive, setGyroActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const splineRef = useRef<Application | null>(null);

  // Detect if mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  // Load Spline when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setShouldLoadSpline(true);
          }, 300);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      setShouldLoadSpline(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Handle gyroscope on mobile
  useEffect(() => {
    if (!isMobile || !shouldLoadSpline) return;

    let initialBeta: number | null = null;
    let initialGamma: number | null = null;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta;
      const gamma = event.gamma;

      // Check if we have valid readings
      if (beta === null || gamma === null) {
        console.log('DeviceOrientation: null values', { beta, gamma });
        return;
      }

      // Initialize on first valid reading
      if (initialBeta === null || initialGamma === null) {
        initialBeta = beta;
        initialGamma = gamma;
        setGyroActive(true);
        console.log('Gyroscope initialized:', { beta, gamma });
        return;
      }

      // Check if Spline is loaded
      if (!splineRef.current) return;

      // Calculate relative movement from initial position
      const deltaX = (gamma - initialGamma) * 0.5; // Horizontal tilt
      const deltaY = (beta - initialBeta) * 0.3;   // Vertical tilt

      // Clamp values to reasonable ranges
      const clampedX = Math.max(-30, Math.min(30, deltaX));
      const clampedY = Math.max(-20, Math.min(20, deltaY));

      // Update Spline camera rotation
      try {
        const camera = splineRef.current.findObjectByName('Camera');
        if (camera) {
          camera.rotation.y = clampedX * (Math.PI / 180);
          camera.rotation.x = -clampedY * (Math.PI / 180);
        }
      } catch (error) {
        console.error('Error updating camera:', error);
      }
    };

    // Register event listener
    const registerListener = async () => {
      console.log('Attempting to register gyroscope...', {
        isMobile,
        shouldLoadSpline,
        hasDeviceOrientation: typeof DeviceOrientationEvent !== 'undefined'
      });

      // Check if permission is needed (iOS 13+)
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        console.log('iOS: Requesting permission...');
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          console.log('iOS Permission result:', permission);
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
            console.log('iOS: Listener registered');
          }
        } catch (error) {
          console.error('iOS Permission denied:', error);
        }
      } else {
        // Android and older iOS - no permission needed
        console.log('Android/Old iOS: Registering listener directly...');
        window.addEventListener('deviceorientation', handleOrientation, true);
        console.log('Android: Listener registered');
      }
    };

    registerListener();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [isMobile, shouldLoadSpline]);

  // Handle Spline load
  const onSplineLoad = (spline: Application) => {
    splineRef.current = spline;
    // Note: Mouse interaction control is handled by gyroscope on mobile
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-screen flex flex-col items-center justify-start pt-24 md:pt-32 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="z-20 text-center px-4 relative"
      >
        <div className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm md:text-sm font-medium mb-3 backdrop-blur-sm">
          {t.hero.tag}
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-3 drop-shadow-xl text-white">
          {t.hero.title}<span className="text-purple-500">CODE</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-light max-w-lg mx-auto">
          {t.hero.subtitle}
        </p>
      </motion.div>

      <div className="w-full h-[120%] absolute top-0 left-0 z-1 md:top-10">
        {!shouldLoadSpline && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-purple-500/20 text-6xl font-bold">TukiCode</div>
          </div>
        )}
        {shouldLoadSpline && (
          <Suspense fallback={<SplineLoader />}>
            <Spline
              scene="https://prod.spline.design/vSH5X4aRpDPX9uUJ/scene.splinecode"
              onLoad={onSplineLoad}
            />
          </Suspense>
        )}
      </div>

      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/90 to-transparent z-10 pointer-events-none"></div>

      {/* Gyroscope indicator (debug) */}
      {isMobile && gyroActive && (
        <div className="absolute bottom-4 right-4 z-30 bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1 text-xs text-green-300 backdrop-blur-sm">
          📱 Giroscopio activo
        </div>
      )}
    </section>
  );
}
