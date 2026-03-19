import { NavItem } from '@/types';

interface DockProps {
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}

export default function Dock({ navItems, activeSection, setActiveSection }: DockProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 pointer-events-none">
      <div className="dock-entry bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl px-4 py-3 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center gap-3 pointer-events-auto h-20">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className="relative group flex flex-col items-center justify-center"
            >
              {/* Active glow */}
              <div
                className={`absolute inset-0 rounded-2xl blur-md ${item.bgGlow}`}
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />

              {/* Icon */}
              <div
                className={`relative z-10 p-2 rounded-xl ${
                  isActive
                    ? `${item.color} bg-zinc-900 border border-white/10 shadow-xl`
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
                style={{
                  transform: isActive ? 'scale(1.5) translateY(-10px)' : 'scale(1) translateY(0px)',
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease, background-color 0.2s ease',
                }}
              >
                <div className="w-6 h-6">{item.icon}</div>
              </div>

              {/* Tooltip */}
              <span className="absolute -top-14 bg-zinc-900 border border-zinc-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                {item.label}
              </span>

              {/* Active dot */}
              <div
                className={`absolute -bottom-1 w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}`}
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
