import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
    };
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      // Update and draw particles
      particles.current.forEach((particle, i) => {
        // Mouse attraction — pull particles toward cursor
        const dx = mx - particle.x;
        const dy = my - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 250 && distance > 1) {
          const force = (250 - distance) / 250;
          particle.vx += (dx / distance) * force * 0.35;
          particle.vy += (dy / distance) * force * 0.35;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Velocity damping — keep movement smooth
        particle.vx *= 0.92;
        particle.vy *= 0.92;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.7)';
        ctx.fill();

        // Draw connections between particles
        particles.current.slice(i + 1).forEach((other) => {
          const ddx = other.x - particle.x;
          const ddy = other.y - particle.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - dist / 120) * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Draw connection to mouse cursor
        if (distance < 180) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(236, 72, 153, ${(1 - distance / 180) * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw glow dot at mouse position
      if (mx > 0 || my > 0) {
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(236, 72, 153, 0.6)';
        ctx.fill();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Defer ALL initialization to after first paint — avoids forced reflow in critical path
    const startTimer = setTimeout(() => {
      resizeCanvas();
      const w = canvas.width || document.documentElement.clientWidth;
      const h = canvas.height || document.documentElement.clientHeight;
      const particleCount = 100;
      particles.current = Array.from<unknown, Particle>({ length: particleCount }, (_) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      }));
      animate();
    }, 500);

    return () => {
      clearTimeout(startTimer);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
