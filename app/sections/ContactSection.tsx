'use client';

import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, User, Sparkles, Code2, Rocket } from 'lucide-react';
import { Translation } from '@/app/types';
import { useState } from 'react';

interface ContactSectionProps {
  t: Translation;
}

export default function ContactSection({ t }: ContactSectionProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const floatingIcons = [
    { Icon: Code2, delay: 0, x: '10%', y: '20%' },
    { Icon: Rocket, delay: 1, x: '85%', y: '15%' },
    { Icon: Sparkles, delay: 2, x: '90%', y: '80%' },
    { Icon: Code2, delay: 1.5, x: '15%', y: '75%' },
  ];

  return (
    <section id="contacto" className="min-h-screen py-24 bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Grid de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      {/* Gradientes de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(168,85,247,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.1),transparent_60%)]"></div>

      {/* Íconos flotantes de fondo */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-500/10"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + delay,
            repeat: Infinity,
            delay: delay,
            ease: 'easeInOut',
          }}
        >
          <Icon className="w-12 h-12 md:w-20 md:h-20" />
        </motion.div>
      ))}

      <motion.div
        className="max-w-5xl mx-auto px-4 z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(147,51,234,0.4)]">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-white bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            {t.contact.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Tarjetas de información lateral */}
          <motion.div className="md:col-span-2 space-y-4 order-2 md:order-1" variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 relative z-10 border border-purple-500/40">
                <Rocket className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Respuesta Rápida</h3>
              <p className="text-gray-400 text-sm relative z-10">Te responderemos en menos de 24 horas</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 relative z-10 border border-blue-500/40">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Presupuesto Gratis</h3>
              <p className="text-gray-400 text-sm relative z-10">Sin compromiso, 100% transparente</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-pink-900/20 to-pink-900/5 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 relative z-10 border border-pink-500/40">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 relative z-10">Ideas Protegidas</h3>
              <p className="text-gray-400 text-sm relative z-10">Tu proyecto es confidencial</p>
            </motion.div>
          </motion.div>

          {/* Formulario principal */}
          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="md:col-span-3 p-8 md:p-12 rounded-[2rem] border-2 border-white/10 backdrop-blur-sm space-y-6 relative group order-1 md:order-2"
          >
            {/* Bordes brillantes animados */}
            <div className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 blur-sm group-hover:opacity-20 transition-opacity duration-500"></div>

            <div className="relative space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo Nombre */}
                <div className="relative">
                  <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide flex items-center gap-2">
                    <User className="w-3 h-3" />
                    {t.contact.nameLabel}
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-black/60 border-2 border-zinc-700/50 rounded-2xl p-4 pl-12 text-white placeholder:text-gray-500 focus:border-purple-500/80 outline-none transition-all focus:ring-4 focus:ring-purple-500/20 focus:bg-black/80 shadow-inner"
                    />
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                </div>

                {/* Campo Email */}
                <div className="relative">
                  <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    Email
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-black/60 border-2 border-zinc-700/50 rounded-2xl p-4 pl-12 text-white placeholder:text-gray-500 focus:border-purple-500/80 outline-none transition-all focus:ring-4 focus:ring-purple-500/20 focus:bg-black/80 shadow-inner"
                    />
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                </div>
              </div>

              {/* Campo Mensaje */}
              <div className="relative">
                <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide flex items-center gap-2">
                  <MessageCircle className="w-3 h-3" />
                  {t.contact.ideaLabel}
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto, presupuesto estimado, plazos..."
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-black/60 border-2 border-zinc-700/50 rounded-2xl p-4 text-white placeholder:text-gray-500 focus:border-purple-500/80 outline-none transition-all mt-2 resize-none focus:ring-4 focus:ring-purple-500/20 focus:bg-black/80 shadow-inner"
                ></textarea>
              </div>

              {/* Botón Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full relative border-2 text-white font-bold py-5 rounded-2xl overflow-hidden group/btn transition-all shadow-lg ${
                  isSubmitting
                    ? 'bg-purple-600/30 border-purple-500/50 cursor-wait'
                    : submitStatus === 'success'
                    ? 'bg-green-600/30 border-green-500/60 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                    : submitStatus === 'error'
                    ? 'bg-red-600/30 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                    : 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/40 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>

                {/* Animación de envío */}
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Avión de papel animado */}
                      <Send className="w-8 h-8 text-purple-400 animate-[fly_2.5s_ease-in-out_infinite]" />
                      {/* Estela de partículas */}
                      <div className="absolute top-1/2 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-[trail_2.5s_ease-in-out_infinite] opacity-60"></div>
                      <div className="absolute top-1/2 -left-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-[trail_2.5s_ease-in-out_infinite_0.3s] opacity-40"></div>
                      <div className="absolute top-1/2 -left-12 w-1 h-1 bg-blue-400 rounded-full animate-[trail_2.5s_ease-in-out_infinite_0.6s] opacity-20"></div>
                    </div>
                  </div>
                )}

                <div className={`relative flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  {submitStatus === 'success' ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-[bounce_0.5s_ease-in-out]">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      Mensaje Enviado
                    </>
                  ) : submitStatus === 'error' ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center animate-[shake_0.5s_ease-in-out]">
                        <span className="text-white text-sm">✗</span>
                      </div>
                      Error - Intenta de nuevo
                    </>
                  ) : (
                    <>
                      {t.contact.btn}
                      <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </>
                  )}
                </div>
              </motion.button>

              {/* Estilos de animación */}
              <style jsx>{`
                @keyframes fly {
                  0%, 100% {
                    transform: translate(0, 0) rotate(0deg);
                  }
                  25% {
                    transform: translate(15px, -8px) rotate(5deg);
                  }
                  50% {
                    transform: translate(30px, -3px) rotate(-2deg);
                  }
                  75% {
                    transform: translate(15px, 8px) rotate(-5deg);
                  }
                }
                @keyframes trail {
                  0% {
                    transform: translateX(0) scale(1);
                    opacity: 0.6;
                  }
                  100% {
                    transform: translateX(-40px) scale(0);
                    opacity: 0;
                  }
                }
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  25% { transform: translateX(-5px); }
                  75% { transform: translateX(5px); }
                }
              `}</style>

              {/* Botón WhatsApp */}
              <div className="relative">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-900 px-4 text-gray-500 text-sm">o</span>
                </div>
              </div>

              <motion.a
                href="https://wa.me/5491164602560"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition-all border-2 border-[#25D366]/40 font-bold w-full group/wa relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
              >
                <div className="absolute inset-0 bg-[#25D366]/10 translate-y-full group-hover/wa:translate-y-0 transition-transform"></div>
                <MessageCircle className="w-6 h-6 relative z-10 group-hover/wa:rotate-12 transition-transform" />
                <span className="relative z-10">{t.contact.whatsapp}</span>
              </motion.a>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
