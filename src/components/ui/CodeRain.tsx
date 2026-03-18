import { useEffect, useRef } from 'react';

interface CodeDrop {
  x: number;
  y: number;
  speed: number;
  characters: string[];
  opacity: number;
}

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drops = useRef<CodeDrop[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code characters (programming symbols)
    const codeSymbols = [
      '{', '}', '[', ']', '(', ')', '<', '>', '/',
      '=', '+', '-', '*', '&', '|', '^', '~',
      'function', 'const', 'let', 'var', 'class',
      '0', '1', 'true', 'false', 'null'
    ];

    // Initialize drops
    const dropCount = 25;
    const columnWidth = canvas.width / dropCount;

    drops.current = Array.from<unknown, CodeDrop>({ length: dropCount }, (_, i) => ({
      x: i * columnWidth + columnWidth / 2,
      y: Math.random() * -canvas.height,
      speed: Math.random() * 2 + 1,
      characters: Array.from<unknown, string>({ length: 8 }, (_) =>
        codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
      ),
      opacity: Math.random() * 0.3 + 0.1
    }));

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with slight fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font once per frame, not per drop
      ctx.font = '14px monospace';

      // Draw and update drops
      drops.current.forEach((drop, index) => {
        drop.y += drop.speed;

        // Reset when off screen
        if (drop.y > canvas.height + 100) {
          drop.y = -100;
          drop.x = index * columnWidth + columnWidth / 2;
          drop.characters = Array.from<unknown, string>({ length: 8 }, (_) =>
            codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
          );
        }

        // Draw characters
        drop.characters.forEach((char, i) => {
          const y = drop.y - i * 20;
          if (y > 0 && y < canvas.height) {
            const charOpacity = drop.opacity * (1 - i / drop.characters.length);

            ctx.fillStyle = `rgba(168, 85, 247, ${charOpacity})`;
            ctx.fillText(char, drop.x, y);

            // Add glow to first character
            if (i === 0) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
              ctx.fillText(char, drop.x, y);
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Defer start to avoid blocking initial page load
    const startTimer = setTimeout(animate, 800);

    return () => {
      clearTimeout(startTimer);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}
