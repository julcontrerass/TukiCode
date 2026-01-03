import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Translation } from '@/types';

interface HeroSectionProps {
  t: Translation;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Textos para la animación
  const rotatingTexts = ["Tu idea en la web", "Tu visión, nuestro código", "Innovación en cada línea"];

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations para el mouse
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalizar a -1 a 1
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Ciclo de textos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  return (
    <section
      id="inicio"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gradiente animado de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente principal - se mueve con el mouse */}
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            x: isMounted ? smoothMouseX : 0,
            y: isMounted ? smoothMouseY : 0,
          }}
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-3xl" />

        {/* Orbes flotantes - Interactivos con el mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
          style={{
            top: '20%',
            left: '-10%',
            x: isMounted ? smoothMouseX : 0,
            y: isMounted ? smoothMouseY : 0,
          }}
          animate={{
            x: ['-25%', '125%'],
            y: ['0%', '50%', '0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
          style={{
            top: '40%',
            right: '-10%',
            x: isMounted ? smoothMouseX : 0,
            y: isMounted ? smoothMouseY : 0,
          }}
          animate={{
            x: ['125%', '-25%'],
            y: ['50%', '0%', '50%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl"
          style={{
            bottom: '10%',
            left: '30%',
            x: isMounted ? smoothMouseX : 0,
            y: isMounted ? smoothMouseY : 0,
          }}
          animate={{
            x: ['0%', '100%', '0%'],
            y: ['100%', '0%', '100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Spotlight que sigue el cursor */}
        {isMounted && (
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
              x: smoothMouseX,
              y: smoothMouseY,
              left: '50%',
              top: '50%',
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}
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
              {rotatingTexts[currentTextIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Gradiente inferior */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
