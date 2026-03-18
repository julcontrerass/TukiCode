import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Translation } from '@/types';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import CodeRain from '@/components/ui/CodeRain';

interface HeroSectionProps {
  t: Translation;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % t.hero.rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.hero.rotatingTexts.length]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="inicio"
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        {/* Background Layers */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

          <CodeRain />
          <InteractiveBackground />

          {/* Orbs — CSS animation, zero JS cost */}
          <div
            className="absolute w-96 h-96 rounded-full bg-purple-500/30 blur-3xl"
            style={{ top: '10%', left: '-10%', animation: 'orbA 20s linear infinite' }}
          />
          <div
            className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
            style={{ top: '40%', right: '-10%', animation: 'orbB 25s linear infinite' }}
          />
        </div>

        {/* Content */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="z-20 text-center px-4 relative"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm md:text-base font-medium mb-6 backdrop-blur-sm"
          >
            {t.hero.tag}
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.4 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-0 drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {t.hero.title}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              CODE
            </span>
          </m.h1>

          <div className="h-16 md:h-20 flex items-center justify-center overflow-hidden relative">
            <AnimatePresence mode="wait">
              <m.p
                key={currentTextIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-xl md:text-3xl text-gray-300 font-light absolute"
              >
                {t.hero.rotatingTexts[currentTextIndex]}
              </m.p>
            </AnimatePresence>
          </div>
        </m.div>

        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
      </section>
    </LazyMotion>
  );
}
