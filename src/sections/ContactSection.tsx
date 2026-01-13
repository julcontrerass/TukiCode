

import { motion } from 'framer-motion';
import { Send, Mail, User, Sparkles, Code2, Rocket, Edit3 } from 'lucide-react';
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
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Crear un formulario temporal para enviar
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/jjulian.contrerass@gmail.com';
    form.method = 'POST';
    form.target = 'formsubmit-iframe';
    form.style.display = 'none';

    // Agregar campos del formulario
    const fields = {
      name: formData.name,
      email: formData.email,
      _subject: formData.subject,
      message: formData.message,
      _replyto: formData.email,
      _captcha: 'false',
      _template: 'box',
      _next: window.location.origin + '/gracias'
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);

    // Enviar formulario
    form.submit();

    // Limpiar
    setTimeout(() => {
      document.body.removeChild(form);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
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
      title: t.contact.card1Title,
      description: t.contact.card1Desc,
      gradient: 'from-purple-900/20 to-purple-900/5',
      border: 'border-purple-500/20',
      iconBg: 'bg-purple-500/20',
      iconBorder: 'border-purple-500/40',
      iconColor: 'text-purple-400',
      hoverGradient: 'from-purple-500/5',
    },
    {
      icon: Code2,
      title: t.contact.card2Title,
      description: t.contact.card2Desc,
      gradient: 'from-blue-900/20 to-blue-900/5',
      border: 'border-blue-500/20',
      iconBg: 'bg-blue-500/20',
      iconBorder: 'border-blue-500/40',
      iconColor: 'text-blue-400',
      hoverGradient: 'from-blue-500/5',
    },
    {
      icon: Sparkles,
      title: t.contact.card3Title,
      description: t.contact.card3Desc,
      gradient: 'from-pink-900/20 to-pink-900/5',
      border: 'border-pink-500/20',
      iconBg: 'bg-pink-500/20',
      iconBorder: 'border-pink-500/40',
      iconColor: 'text-pink-400',
      hoverGradient: 'from-pink-500/5',
    },
  ];

  return (
    <section id="contacto" className="h-screen max-h-screen pt-20 md:pt-8 pb-24 md:pb-8 bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* iframe oculto para FormSubmit */}
      <iframe name="formsubmit-iframe" style={{ display: 'none' }} title="FormSubmit Response"></iframe>

      <motion.div
        className="max-w-5xl mx-auto px-4 z-10 w-full h-full flex flex-col justify-center max-h-full overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div className="text-center mb-4 md:mb-6" variants={itemVariants}>
          <h2 className="text-4xl md:text-6xl font-bold mb-2 md:mb-3 text-white">
            {t.contact.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {t.contact.subtitle}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 md:mb-0">
            {t.contact.desc}
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

              {/* Campo Asunto */}
              <div className="relative">
                <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  {t.contact.subjectLabel}
                </label>
                <div className="relative mt-1.5">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Desarrollo de aplicación web"
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-black/60 border-2 border-zinc-700/50 rounded-2xl p-2.5 pl-10 text-sm text-white placeholder:text-gray-500 focus:border-purple-500/80 outline-none transition-all focus:ring-4 focus:ring-purple-500/20 focus:bg-black/80 shadow-inner"
                  />
                  <Sparkles className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'subject' ? 'text-purple-400' : 'text-gray-500'}`} />
                </div>
              </div>

              {/* Campo Mensaje */}
              <div className="relative">
                <label className="text-xs font-bold text-purple-400 ml-1 uppercase tracking-wide flex items-center gap-2">
                  <Edit3 className="w-3 h-3" />
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
                      <Send className="w-8 h-8 text-purple-400 animate-[fly_2.5s_ease-in-out_infinite]" />
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
                <svg className="w-5 h-5 relative z-10 group-hover/wa:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="relative z-10">{t.contact.whatsapp}</span>
              </motion.a>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
