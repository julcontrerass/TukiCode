'use client';

import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { Translation } from '@/app/types';

interface ContactSectionProps {
  t: Translation;
}

export default function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contacto" className="min-h-screen py-24 bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),transparent_70%)]"></div>
      <div className="max-w-3xl mx-auto px-4 text-center z-10 w-full">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">{t.contact.title}</h2>
        <p className="text-xl text-gray-400 mb-10">{t.contact.subtitle}</p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 p-10 rounded-3xl border border-white/5 backdrop-blur-xl text-left space-y-6 shadow-2xl relative"
        >
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide">
                {t.contact.nameLabel}
              </label>
              <input className="w-full bg-black/40 border border-zinc-700/50 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all mt-2 focus:ring-1 focus:ring-purple-500/50" />
            </div>
            <div>
              <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide">Email</label>
              <input
                type="email"
                className="w-full bg-black/40 border border-zinc-700/50 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all mt-2 focus:ring-1 focus:ring-purple-500/50"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide">
              {t.contact.ideaLabel}
            </label>
            <textarea
              rows={4}
              className="w-full bg-black/40 border border-zinc-700/50 rounded-xl p-4 text-white focus:border-purple-500 outline-none transition-all mt-2 resize-none focus:ring-1 focus:ring-purple-500/50"
            ></textarea>
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all flex items-center justify-center gap-2 group transform hover:scale-[1.02]">
            {t.contact.btn} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>
        <div className="mt-8 flex justify-center">
          <a
            href="https://wa.me/12345678"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20 font-bold hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-5 h-5" />
            {t.contact.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
