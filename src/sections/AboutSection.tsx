

import { motion } from 'framer-motion';
import { Target, Telescope } from 'lucide-react';
import { Translation } from '@/types';
import { team } from '@/constants/team';
import TeamCard from '@/components/ui/TeamCard';

interface AboutSectionProps {
  t: Translation;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="nosotros" className="min-h-screen py-24 bg-black relative z-10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">{t.about.title}</h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">{t.about.desc}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div
            className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm hover:border-blue-500/50 transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20 blur-xl"></div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">{t.about.missionTitle}</h3>
            </div>
            <p className="text-gray-400 relative z-10">{t.about.missionDesc}</p>
          </div>
          <div
            className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm hover:border-purple-500/50 transition-colors relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:bg-purple-500/20 blur-xl"></div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                <Telescope className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">{t.about.visionTitle}</h3>
            </div>
            <p className="text-gray-400 relative z-10">{t.about.visionDesc}</p>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-10 inline-block border-b-2 border-purple-500 pb-2 text-white">
            {t.about.teamTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
