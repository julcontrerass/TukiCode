'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Translation } from '@/app/types';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  ),
});

interface HeroSectionProps {
  t: Translation;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Lazy load Spline solo cuando el usuario scrollea cerca de la sección
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadSpline(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' } // Empieza a cargar 200px antes de que sea visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Para la primera carga, esperar al preloader
    const timer = setTimeout(() => {
      setShouldLoadSpline(true);
    }, 1800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full h-screen flex flex-col items-center justify-start pt-24 md:pt-32 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9, duration: 0.6 }}
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
        {shouldLoadSpline && <Spline scene="https://prod.spline.design/vSH5X4aRpDPX9uUJ/scene.splinecode" />}
      </div>
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
