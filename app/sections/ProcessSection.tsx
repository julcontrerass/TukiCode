'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Layers, Code2, Gauge, CheckCircle2 } from 'lucide-react';
import { Translation } from '@/app/types';

interface ProcessSectionProps {
  t: Translation;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const workflowIcons = [
  <BrainCircuit key={1} />,
  <Layers key={2} />,
  <Code2 key={3} />,
  <Gauge key={4} />
];

export default function ProcessSection({ t }: ProcessSectionProps) {
  return (
    <section id="proceso" className="min-h-screen py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{t.process.title}</h2>
          <p className="text-gray-400">{t.process.subtitle}</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-zinc-800 to-zinc-800 md:left-1/2 md:-ml-[1px]"></div>
          <div className="space-y-16 md:space-y-24">
            {t.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 ml-24 md:ml-0 bg-black/50 border border-zinc-800 p-6 rounded-2xl hover:border-purple-500/30 transition-colors backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <span className="text-4xl font-black text-white/5 absolute top-4 right-6">{`0${index + 1}`}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{step.desc}</p>
                  <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800/50">
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">
                      {t.process.delivTitle}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                      {step.deliverable}
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 bg-black border-4 border-zinc-900 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {workflowIcons[index]}
                </div>
                <div className="hidden md:block flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
