

import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, User, Sparkles, Code2, Rocket } from 'lucide-react';
import { Translation } from '@/types';
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

      await response.json();

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
        staggerChildren: 0.03,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const infoCards = [
    {
      icon: Rocket,
      title: 'Respuesta Rápida',
      description: 'Te responderemos en menos de 24 horas',
      gradient: 'from-purple-900/20 to-purple-900/5',
      border: 'border-purple-500/20',
      iconBg: 'bg-purple-500/20',
      iconBorder: 'border-purple-500/40',
      iconColor: 'text-purple-400',
      hoverGradient: 'from-purple-500/5',
    },
    {
      icon: Code2,
      title: 'Presupuesto Gratis',
      description: 'Sin compromiso, 100% transparente',
      gradient: 'from-blue-900/20 to-blue-900/5',
      border: 'border-blue-500/20',
      iconBg: 'bg-blue-500/20',
      iconBorder: 'border-blue-500/40',
      iconColor: 'text-blue-400',
      hoverGradient: 'from-blue-500/5',
    },
    {
      icon: Sparkles,
      title: 'Ideas Protegidas',
      description: 'Tu proyecto es confidencial',
      gradient: 'from-pink-900/20 to-pink-900/5',
      border: 'border-pink-500/20',
      iconBg: 'bg-pink-500/20',
      iconBorder: 'border-pink-500/40',
      iconColor: 'text-pink-400',
      hoverGradient: 'from-pink-500/5',
    },
  ];

  return (
    <section id="contacto" className="h-screen max-h-screen py-4 md:py-8 pb-24 md:pb-8 bg-black flex flex-col items-center justify-center relative overflow-hidden">

      <motion.div
        className="max-w-5xl mx-auto px-4 z-10 w-full h-full flex flex-col justify-center max-h-full overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="text-center mb-4 md:mb-6" variants={itemVariants}>
          <h2 className="text-4xl md:text-6xl font-black mb-2 md:mb-3 text-white bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            {t.contact.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 md:mb-0">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4 md:gap-6 items-start">
          {/* Tarjetas de información - responsive (única versión) */}
          <motion.div className="md:col-span-2 grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-3 order-2 md:order-1" variants={itemVariants}>
            {infoCards.map((card, idx) => (
              <motion.div
                key={idx}
                className={`bg-gradient-to-br ${card.gradient} p-3 md:p-4 rounded-2xl border ${card.border} backdrop-blur-sm relative overflow-hidden group flex flex-col items-center md:items-start text-center md:text-left`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.hoverGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center mb-2 relative z-10 border ${card.iconBorder}`}>
                  <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <h3 className="text-xs md:text-base font-bold text-white mb-0 md:mb-1 relative z-10">{card.title}</h3>
                <p className="text-gray-400 text-xs relative z-10 hidden md:block">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Formulario principal */}
          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="md:col-span-3 p-4 md:p-6 rounded-[2rem] border-2 border-white/10 backdrop-blur-sm space-y-3 md:space-y-4 relative md:order-2"
          >
            <div className="relative space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Campo Nombre */}
                <div className="relative">
                  <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide flex items-center gap-2">
                    <User className="w-3 h-3" />
                    {t.contact.nameLabel}
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-black/60 border-2 border-zinc-700/50 rounded-2xl p-2.5 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-purple-500/80 outline-none transition-all focus:ring-4 focus:ring-purple-500/20 focus:bg-black/80 shadow-inner"
                    />
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'name' ? 'text-purple-400' : 'text-gray-500'}`} />
                  </div>
                </div>

                {/* Campo Email */}
                <div className="relative">
                  <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    Email
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full bg-black/60 border-2 border-zinc-700/50 rounded-2xl p-2.5 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-purple-500/80 outline-none transition-all focus:ring-4 focus:ring-purple-500/20 focus:bg-black/80 shadow-inner"
                    />
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'email' ? 'text-purple-400' : 'text-gray-500'}`} />
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
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto, presupuesto estimado, plazos..."
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full bg-black/60 border-2 border-zinc-700/50 rounded-2xl p-2.5 text-sm text-white placeholder:text-gray-500 focus:border-purple-500/80 outline-none transition-all mt-1.5 resize-none focus:ring-4 focus:ring-purple-500/20 focus:bg-black/80 shadow-inner"
                ></textarea>
              </div>

              {/* Botón Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full relative border-2 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-2xl overflow-hidden group/btn transition-all shadow-lg ${
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

              {/* Botón WhatsApp */}
              <div className="relative">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-900 px-3 text-gray-500 text-xs">o</span>
                </div>
              </div>

              <motion.a
                href="https://wa.me/5491164602560"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-3 md:py-3.5 rounded-2xl bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition-all border-2 border-[#25D366]/40 font-bold text-sm md:text-base w-full group/wa relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
              >
                <div className="absolute inset-0 bg-[#25D366]/10 translate-y-full group-hover/wa:translate-y-0 transition-transform"></div>
                <MessageCircle className="w-5 h-5 relative z-10 group-hover/wa:rotate-12 transition-transform" />
                <span className="relative z-10">{t.contact.whatsapp}</span>
              </motion.a>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
