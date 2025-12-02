'use client';

import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { Language } from '@/app/types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-40 bg-transparent pt-6 pointer-events-none">
      <div className="flex justify-center items-center max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 pointer-events-auto shadow-lg"
        >
          <span className="text-xl md:text-2xl font-black tracking-widest bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            TUKICODE
          </span>
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto absolute right-0"
        >
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="bg-zinc-900/60 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-zinc-800 transition-all shadow-lg flex items-center gap-1 text-white"
          >
            <Languages className="w-5 h-5" />
            <span className="text-xs font-bold w-4">{lang.toUpperCase()}</span>
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
