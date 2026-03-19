import { useState, useEffect, lazy, Suspense } from 'react';
import { Home, Users, FolderCode, Workflow, Phone, Layout } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/constants/translations';
import Navbar from '@/components/layout/Navbar';
import Dock from '@/components/layout/Dock';
import HeroSection from '@/sections/HeroSection';

const AboutSection = lazy(() => import('@/sections/AboutSection'));
const ServicesSection = lazy(() => import('@/sections/ServicesSection'));
const ProjectsSection = lazy(() => import('@/sections/ProjectsSection'));
const ProcessSection = lazy(() => import('@/sections/ProcessSection'));
const ContactSection = lazy(() => import('@/sections/ContactSection'));

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [lang, setLang] = useState<Language>('es');

  const t = translations[lang];

  useEffect(() => {
    const observed = new Set<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setActiveSection(entry.target.id));
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' }
    );

    const observeNew = () => {
      document.querySelectorAll('section[id]').forEach((section) => {
        if (!observed.has(section)) {
          observed.add(section);
          io.observe(section);
        }
      });
    };

    // Observe initial sections (HeroSection is already in DOM)
    observeNew();

    // Watch for lazy-loaded sections added to the DOM
    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  const navItems = [
    { id: 'inicio', icon: <Home className="w-full h-full" />, label: t.nav.home, color: "text-purple-500", bgGlow: "bg-purple-500/20" },
    { id: 'nosotros', icon: <Users className="w-full h-full" />, label: t.nav.about, color: "text-blue-500", bgGlow: "bg-blue-500/20" },
    { id: 'servicios', icon: <Layout className="w-full h-full" />, label: t.nav.services, color: "text-pink-500", bgGlow: "bg-pink-500/20" },
    { id: 'proyectos', icon: <FolderCode className="w-full h-full" />, label: t.nav.projects, color: "text-orange-500", bgGlow: "bg-orange-500/20" },
    { id: 'proceso', icon: <Workflow className="w-full h-full" />, label: t.nav.process, color: "text-green-500", bgGlow: "bg-green-500/20" },
    { id: 'contacto', icon: <Phone className="w-full h-full" />, label: t.nav.contact, color: "text-yellow-400", bgGlow: "bg-yellow-400/20" },
  ];

  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      <style>{`
        canvas {
          outline: none;
        }
        html {
          scroll-behavior: smooth;
          background: black;
        }
      `}</style>

      <Navbar lang={lang} setLang={setLang} />
      <Dock navItems={navItems} activeSection={activeSection} setActiveSection={setActiveSection} />

      <HeroSection t={t} />
      <Suspense fallback={null}>
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <ProjectsSection t={t} />
        <ProcessSection t={t} />
        <ContactSection t={t} />
      </Suspense>
    </main>
  );
}
