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
  const sectionRef = useRef<HTMLElement>(null);
  const splineRef = useRef<Application | null>(null);

  // Detect if mobile device
  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
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

  // Auto-rotate camera on mobile
  useEffect(() => {
    if (!isMobile || !splineRef.current) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      if (!splineRef.current) return;

      time += 0.01;

      try {
        const camera = splineRef.current.findObjectByName('Camera');
        if (camera) {
          // Smooth sine wave movement for natural look
          const moveX = Math.sin(time * 0.5) * 15; // -15 to +15 degrees horizontal
          const moveY = Math.sin(time * 0.3) * 8;  // -8 to +8 degrees vertical

          camera.rotation.y = moveX * (Math.PI / 180);
          camera.rotation.x = moveY * (Math.PI / 180);
        }
      } catch (error) {
        // Silent error handling
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isMobile]);

  // Handle Spline load
  const onSplineLoad = (spline: Application) => {
    splineRef.current = spline;
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
