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
  const [permissionGranted, setPermissionGranted] = useState(false);
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
    if (!isMobile || !splineRef.current) return;

    let initialBeta = 0;
    let initialGamma = 0;
    let isInitialized = false;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!splineRef.current) return;

      const beta = event.beta || 0;   // Rotation around X axis (-180 to 180)
      const gamma = event.gamma || 0; // Rotation around Y axis (-90 to 90)

      // Initialize on first reading
      if (!isInitialized) {
        initialBeta = beta;
        initialGamma = gamma;
        isInitialized = true;
        return;
      }

      // Calculate relative movement
      const deltaX = (gamma - initialGamma) * 0.5; // Horizontal movement
      const deltaY = (beta - initialBeta) * 0.3;   // Vertical movement

      // Clamp values to reasonable ranges
      const clampedX = Math.max(-30, Math.min(30, deltaX));
      const clampedY = Math.max(-20, Math.min(20, deltaY));

      // Update Spline camera position
      try {
        const camera = splineRef.current.findObjectByName('Camera');
        if (camera) {
          camera.rotation.y = clampedX * (Math.PI / 180);
          camera.rotation.x = -clampedY * (Math.PI / 180);
        }
      } catch (error) {
        console.log('Spline camera control:', error);
      }
    };

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Permission denied:', error);
        }
      } else {
        // Non-iOS or older iOS
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // Auto-request on mobile
    if (shouldLoadSpline) {
      requestPermission();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile, shouldLoadSpline]);

  // Handle Spline load
  const onSplineLoad = (spline: Application) => {
    splineRef.current = spline;

    // Disable mouse events on mobile
    if (isMobile) {
      spline.setMouseInteractionEnabled(false);
    }
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
    </section>
  );
}
