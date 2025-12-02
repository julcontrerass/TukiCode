'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { Translation } from '@/app/types';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

interface HeroSectionProps {
  t: Translation;
}

export default function HeroSection({ t }: HeroSectionProps) {
  return (
    <section id="inicio" className="relative w-full h-screen flex flex-col items-center justify-start pt-32 md:pt-48 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="z-20 text-center px-4 relative"
      >
        <div className="inline-block px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4 backdrop-blur-sm">
          {t.hero.tag}
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 drop-shadow-xl text-white">
          {t.hero.title}<span className="text-purple-500">CODE</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-xl mx-auto">
          {t.hero.subtitle}
        </p>
      </motion.div>
      <div className="w-full h-[120%] absolute top-0 left-0 z-1 md:top-10">
        <Suspense fallback={null}>
          <Spline scene="https://prod.spline.design/vSH5X4aRpDPX9uUJ/scene.splinecode" />
        </Suspense>
      </div>
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
