import { ExternalLink } from 'lucide-react';
import { Translation } from '@/types';

interface ProjectsSectionProps {
  t: Translation;
}

export default function ProjectsSection({ t }: ProjectsSectionProps) {
  return (
    <section id="proyectos" className="min-h-screen py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t.projects.title}</h2>
          <p className="text-gray-400 text-lg">{t.projects.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="group relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-all">
            <picture>
              <source srcSet="/images/Proyectos/Tuki.png?format=avif" type="image/avif" />
              <source srcSet="/images/Proyectos/Tuki.png?format=webp" type="image/webp" />
              <img
                src="/images/Proyectos/Tuki.png"
                alt={t.projects.p1.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 to-black/80 z-10 group-hover:from-purple-900/70 group-hover:to-black/90 transition-all"></div>
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <h3 className="text-3xl font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform text-white">
                {t.projects.p1.title}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity mb-4">
                {t.projects.p1.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">ASP.NET</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">JavaScript</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">MySQL</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <a
            href="https://joup-lab-studio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500/50 transition-all cursor-pointer"
          >
            <picture>
              <source srcSet="/images/Proyectos/joup.png?format=avif" type="image/avif" />
              <source srcSet="/images/Proyectos/joup.png?format=webp" type="image/webp" />
              <img
                src="/images/Proyectos/joup.png"
                alt={t.projects.p2.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-black/80 z-10 group-hover:from-blue-900/70 group-hover:to-black/90 transition-all"></div>
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/20">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <h3 className="text-3xl font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform text-white">
                {t.projects.p2.title}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity mb-4">
                {t.projects.p2.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">React</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">TypeScript</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Tailwind</span>
              </div>
            </div>
          </a>

          {/* Project 3 */}
          <a
            href="https://gritodecarnaval.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all cursor-pointer"
          >
            <picture>
              <source srcSet="/images/Proyectos/GritoCarnaval.png?format=avif" type="image/avif" />
              <source srcSet="/images/Proyectos/GritoCarnaval.png?format=webp" type="image/webp" />
              <img
                src="/images/Proyectos/GritoCarnaval.png"
                alt={t.projects.p3.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/60 to-black/80 z-10 group-hover:from-orange-900/70 group-hover:to-black/90 transition-all"></div>
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/20">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <h3 className="text-3xl font-bold mb-2 translate-y-2 group-hover:translate-y-0 transition-transform text-white">
                {t.projects.p3.title}
              </h3>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity mb-4">
                {t.projects.p3.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">HTML</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">CSS</span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">JavaScript</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
