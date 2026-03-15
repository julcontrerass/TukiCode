import { ExternalLink } from 'lucide-react';
import { Translation } from '@/types';

interface ProjectsSectionProps {
  t: Translation;
}

export default function ProjectsSection({ t }: ProjectsSectionProps) {
  const projects = [
    {
      title: t.projects.p1.title,
      desc: t.projects.p1.desc,
      image: '/images/Proyectos/Tuki.png',
      tags: ['ASP.NET', 'JavaScript', 'MySQL'],
      href: 'http://tukiasistentedesalon.somee.com/',
      border: 'hover:border-purple-500/50',
      tagBg: 'bg-purple-500/20',
    },
    {
      title: t.projects.p2.title,
      desc: t.projects.p2.desc,
      image: '/images/Proyectos/joup.png',
      tags: ['React', 'TypeScript', 'Tailwind'],
      href: 'https://joup-lab-studio.vercel.app/',
      border: 'hover:border-blue-500/50',
      tagBg: 'bg-blue-500/20',
    },
    {
      title: t.projects.p3.title,
      desc: t.projects.p3.desc,
      image: '/images/Proyectos/GritoCarnaval1.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      href: 'https://gritodecarnaval.vercel.app/',
      border: 'hover:border-orange-500/50',
      tagBg: 'bg-orange-500/20',
    },
    {
      title: t.projects.p4.title,
      desc: t.projects.p4.desc,
      image: '/images/Proyectos/skyNext.png',
      tags: ['Next.js', 'React', 'Tailwind'],
      href: 'https://skynextarg.com/',
      border: 'hover:border-emerald-500/50',
      tagBg: 'bg-emerald-500/20',
    },
    {
      title: t.projects.p5.title,
      desc: t.projects.p5.desc,
      image: '/images/Proyectos/deAguirres.png',
      tags: ['React', 'TypeScript', 'Tailwind'],
      href: 'https://deaguirres.vercel.app/',
      border: 'hover:border-rose-500/50',
      tagBg: 'bg-rose-500/20',
    },
  ];

  return (
    <section id="proyectos" className="min-h-screen py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {t.projects.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {t.projects.subtitle}
            </span>
          </h2>
          <p className="text-gray-400 text-lg">{t.projects.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const baseClass = `group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 ${project.border} transition-all duration-300`;

            const inner = (
              <>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    {project.href && (
                      <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors ml-3 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 ${project.tagBg} rounded-full text-xs text-white`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            return project.href ? (
              <a
                key={i}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClass} block cursor-pointer`}
              >
                {inner}
              </a>
            ) : (
              <div key={i} className={baseClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
