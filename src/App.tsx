import { useState, useEffect } from 'react';
import { Home, Users, FolderCode, Workflow, Phone, Layout } from 'lucide-react';
import { Language } from '@/types';
import { translations } from '@/constants/translations';
import Navbar from '@/components/layout/Navbar';
import Dock from '@/components/layout/Dock';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ServicesSection from '@/sections/ServicesSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ProcessSection from '@/sections/ProcessSection';
import ContactSection from '@/sections/ContactSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [lang, setLang] = useState<Language>('es');

  const t = translations[lang];

  useEffect(() => {

    // Optimize Intersection Observer with rootMargin and lower threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame to batch DOM updates
            requestAnimationFrame(() => {
              setActiveSection(entry.target.id);
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px' // Trigger slightly before entering viewport
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
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
      <AboutSection t={t} />
      <ServicesSection t={t} />
      <ProjectsSection t={t} />
      <ProcessSection t={t} />
      <ContactSection t={t} />
    </main>
  );
}
