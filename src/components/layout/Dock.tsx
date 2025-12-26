

import { motion } from 'framer-motion';
import { NavItem } from '@/types';

interface DockProps {
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function Dock({ navItems, activeSection, setActiveSection }: DockProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-auto px-4 pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.8, type: "spring", stiffness: 200, damping: 20 }}
        className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl px-4 py-3 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-end gap-3 pointer-events-auto h-20 items-center"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className="relative group flex flex-col items-center justify-center transition-all duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className={`absolute inset-0 rounded-2xl blur-md ${item.bgGlow}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.5 : 1, y: isActive ? -10 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative z-10 p-2 rounded-xl transition-colors duration-300 ${
                  isActive
                    ? `${item.color} bg-zinc-900 border border-white/10 shadow-xl`
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="w-6 h-6">{item.icon}</div>
              </motion.div>
              <span className="absolute -top-14 bg-zinc-900 border border-zinc-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className={`absolute -bottom-1 w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}`}
                />
              )}
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}
