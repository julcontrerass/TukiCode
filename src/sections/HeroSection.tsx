import { useState, useEffect } from 'react';
import { Translation } from '@/types';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import CodeRain from '@/components/ui/CodeRain';

interface HeroSectionProps {
  t: Translation;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [prevTextIndex, setPrevTextIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => {
        setPrevTextIndex(prev);
        return (prev + 1) % t.hero.rotatingTexts.length;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [t.hero.rotatingTexts.length]);

  return (
    <section
      id="inicio"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

        <CodeRain />
        <InteractiveBackground />

        {/* Orbs — pure CSS, zero JS */}
        <div
          className="absolute w-96 h-96 rounded-full bg-purple-500/30 blur-3xl"
          style={{ top: '10%', left: '-10%', animation: 'orbA 20s linear infinite' }}
        />
        <div
          className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
          style={{ top: '40%', right: '-10%', animation: 'orbB 25s linear infinite' }}
        />
      </div>

      {/* Content — CSS keyframe animations, no JS library */}
      <div className="z-20 text-center px-4 relative hero-content">
        <div className="hero-tag inline-block px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm md:text-base font-medium mb-6 backdrop-blur-sm">
          {t.hero.tag}
        </div>

        <h1 className="hero-h1 text-6xl md:text-8xl font-black tracking-tighter mb-0 drop-shadow-2xl">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            {t.hero.title}
          </span>
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            CODE
          </span>
        </h1>

        {/* Rotating text — CSS transitions only */}
        <div className="h-16 md:h-20 flex items-center justify-center overflow-hidden relative">
          {t.hero.rotatingTexts.map((text, i) => {
            const isActive = i === currentTextIndex;
            const isPrev = i === prevTextIndex;
            return (
              <p
                key={i}
                className="text-xl md:text-3xl text-gray-300 font-light absolute transition-all duration-500 ease-in-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? 'translateY(0)'
                    : isPrev
                    ? 'translateY(-40px)'
                    : 'translateY(40px)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                {text}
              </p>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
