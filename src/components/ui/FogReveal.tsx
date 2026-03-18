import { useRef, useEffect, useState } from 'react';

interface FogRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export default function FogReveal({ children, className = '', delay = 0, threshold = 0.1 }: FogRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setRevealed(true), delay);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        filter: revealed ? 'blur(0px) brightness(1)' : 'blur(14px) brightness(1.4)',
        transform: revealed ? 'translateY(0px)' : 'translateY(12px)',
        transition: `opacity 1s ease ${delay}ms, filter 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
        willChange: 'opacity, filter, transform',
      }}
    >
      {children}
    </div>
  );
}
