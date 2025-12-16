'use client';

import { motion } from 'framer-motion';
import { Globe, ShoppingCart, Database, Code2, Terminal, Cloud, Layers, PenTool, Layout, Smartphone } from 'lucide-react';
import { Translation } from '@/app/types';

interface ServicesSectionProps {
  t: Translation;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const serviceIcons = [
  <Globe key={1} className="w-8 h-8 text-purple-400" />,
  <ShoppingCart key={2} className="w-8 h-8 text-pink-400" />,
  <Database key={3} className="w-8 h-8 text-blue-400" />
];

const techStack = [
  { name: "React", icon: <Code2 /> },
  { name: "Next.js", icon: <Globe /> },
  { name: "Node.js", icon: <Terminal /> },
  { name: "AWS", icon: <Cloud /> },
  { name: "TypeScript", icon: <Code2 /> },
  { name: "PostgreSQL", icon: <Database /> },
  { name: "Docker", icon: <Layers /> },
  { name: "Figma", icon: <PenTool /> },
  { name: "Tailwind", icon: <Layout /> },
  { name: "Mobile", icon: <Smartphone /> }
];

export default function ServicesSection({ t }: ServicesSectionProps) {
  return (
    <section id="servicios" className="min-h-screen py-24 bg-zinc-950 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-900/20 blur-[100px] rounded-full"></div>
      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            {t.services.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {t.services.subtitle}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t.services.intro}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {t.services.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-zinc-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl group hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/50">
                {serviceIcons[index]}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[80px]">{card.desc}</p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="w-full">
          <h3 className="text-center text-gray-500 text-sm font-bold uppercase tracking-widest mb-8">
            {t.services.techTitle}
          </h3>
          <div className="relative flex overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10"></div>
            <motion.div
              className="flex gap-8 items-center w-max"
              animate={{ x: "-33.33%" }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-white/5 rounded-full min-w-[150px] justify-center hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all"
                >
                  <span className="text-purple-400">{tech.icon}</span>
                  <span className="font-bold text-gray-300">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
