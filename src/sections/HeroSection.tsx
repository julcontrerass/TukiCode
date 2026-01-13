import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Translation } from '@/types';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import CodeRain from '@/components/ui/CodeRain';

interface HeroSectionProps {
  t: Translation;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Ciclo de textos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % t.hero.rotatingTexts.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [t.hero.rotatingTexts.length]);

  return (
    <section
      id="inicio"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

        {/* Code Rain Effect */}
        <CodeRain />

        {/* Interactive Particle Network */}
        <InteractiveBackground />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-500/30 blur-3xl"
          animate={{
            x: ['-25%', '125%'],
            y: ['0%', '50%', '0%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ top: '10%', left: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
          animate={{
            x: ['125%', '-25%'],
            y: ['50%', '0%', '50%'],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ top: '40%', right: '-10%' }}
        />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </div>

      {/* Contenido */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="z-20 text-center px-4 relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm md:text-base font-medium mb-6 backdrop-blur-sm"
        >
          {t.hero.tag}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-0 drop-shadow-2xl"
        >
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            {t.hero.title}
          </span>
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            CODE
          </span>
        </motion.h1>

        <div className="h-16 md:h-20 flex items-center justify-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-xl md:text-3xl text-gray-300 font-light absolute"
            >
              {t.hero.rotatingTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
