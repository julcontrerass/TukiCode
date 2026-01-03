import { motion, AnimatePresence } from 'framer-motion';
import { TextShimmer } from './text-shimmer';

interface PreloaderProps {
  isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <TextShimmer
              className="text-4xl md:text-6xl font-black tracking-widest [--base-color:#a1a1aa] [--base-gradient-color:#ffffff] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]"
              duration={1.5}
            >
              Generando TUKICODE...
            </TextShimmer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
