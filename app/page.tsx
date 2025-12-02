'use client';

import { useState, useEffect } from 'react';
import { Home, Users, FolderGit2, Workflow, Sparkles, Layout } from 'lucide-react';
import { Language } from '@/app/types';
import { translations } from '@/app/constants/translations';
import Preloader from '@/app/components/ui/Preloader';
import Navbar from '@/app/components/layout/Navbar';
import Dock from '@/app/components/layout/Dock';
import HeroSection from '@/app/sections/HeroSection';
import AboutSection from '@/app/sections/AboutSection';
import ServicesSection from '@/app/sections/ServicesSection';
import ProjectsSection from '@/app/sections/ProjectsSection';
import ProcessSection from '@/app/sections/ProcessSection';
import ContactSection from '@/app/sections/ContactSection';

export default function Page() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [lang, setLang] = useState<Language>('es');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const t = translations[lang];

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isLoading]);

  const navItems = [
    { id: 'inicio', icon: <Home className="w-full h-full" />, label: t.nav.home, color: "text-purple-500", bgGlow: "bg-purple-500/20" },
    { id: 'nosotros', icon: <Users className="w-full h-full" />, label: t.nav.about, color: "text-blue-500", bgGlow: "bg-blue-500/20" },
    { id: 'servicios', icon: <Layout className="w-full h-full" />, label: t.nav.services, color: "text-pink-500", bgGlow: "bg-pink-500/20" },
    { id: 'proyectos', icon: <FolderGit2 className="w-full h-full" />, label: t.nav.projects, color: "text-orange-500", bgGlow: "bg-orange-500/20" },
    { id: 'proceso', icon: <Workflow className="w-full h-full" />, label: t.nav.process, color: "text-green-500", bgGlow: "bg-green-500/20" },
    { id: 'contacto', icon: <Sparkles className="w-full h-full" />, label: t.nav.contact, color: "text-yellow-400", bgGlow: "bg-yellow-400/20" },
  ];

  return (
    <main className="bg-black text-white font-sans overflow-x-hidden pb-32">
      <style jsx global>{`
        #spline-watermark {
          display: none !important;
        }
        canvas {
          outline: none;
        }
        html {
          scroll-behavior: smooth;
          background: black;
        }
        /* Ocultar icono flotante de Next.js */
        #__next-build-watcher,
        nextjs-portal {
          display: none !important;
        }
      `}</style>

      <Preloader isLoading={isLoading} />
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
