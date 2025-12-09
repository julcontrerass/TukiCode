import { Translations } from '@/app/types';

export const translations: Translations = {
  es: {
    hero: { tag: "Estudio de Desarrollo de Software", title: "TUKI", subtitle: "Transforma el futuro digital" },
    nav: { home: "Inicio", about: "Nosotros", services: "Servicios", projects: "Proyectos", process: "Workflow", contact: "Cotizar" },

    about: {
      title: "Sobre Nosotros",
      desc: "En TukiCode, creemos que la tecnología debe ser accesible para todos. Somos un equipo de desarrolladores y creativos apasionados por materializar ideas. No importa si eres un emprendedor soñador, un creador de contenido o alguien con una visión única; nosotros escribimos el código para que tú te enfoques en tu sueño.",
      missionTitle: "Nuestra Misión",
      missionDesc: "Derribar las barreras técnicas. Queremos que cualquier persona, sin importar su presupuesto o conocimientos técnicos, tenga acceso a un desarrollo de software de calidad profesional para lanzar su proyecto al mundo.",
      visionTitle: "Nuestra Visión",
      visionDesc: "Ser la fábrica de sueños digitales de referencia, construyendo un futuro donde ninguna buena idea se quede en el papel por falta de un equipo de desarrollo confiable.",
      teamTitle: "Equipo de Desarrollo"
    },

    services: {
      title: "Ecosistema de",
      subtitle: "Soluciones Digitales",
      intro: "Cubrimos todo el ciclo de vida del producto digital. Desde una Landing Page de alta conversión hasta arquitecturas de software complejas.",
      cards: [
        {
          title: "Desarrollo Web & Landings",
          desc: "Páginas diseñadas para vender. Velocidad extrema, SEO técnico optimizado y animaciones fluidas que retienen al usuario.",
          tags: ["Next.js", "Tailwind", "Framer Motion"]
        },
        {
          title: "E-Commerce Scalable",
          desc: "Tiendas online robustas. Integración de pagos (MercadoPago/Stripe), gestión de inventario y panel de administración a medida.",
          tags: ["React", "Angular", "Node.js"]
        },
        {
          title: "Software a Medida",
          desc: "Sistemas complejos para problemas únicos. CRMs, plataformas SaaS, automatización de procesos y APIs personalizadas.",
          tags: ["Node.js", "PostgreSQL", "AWS"]
        }
      ],
      techTitle: "Arsenal Tecnológico"
    },
    projects: {
      title: "Portafolio",
      subtitle: "Proyectos que hemos desarrollado para nuestros clientes",
      btn: "Ver GitHub",
      p1: {
        title: "Tuki Asistente de Salón",
        desc: "Sistema de gestión completo para locales de gastronomía. Administración de mesas, ventas, inventario y control de pedidos."
      },
      p2: {
        title: "JOUP LAB & STUDIO",
        desc: "Página web personalizada para barista emprendedor. Portfolio interactivo con diseño moderno y atractivo."
      },
      p3: {
        title: "Grito de Carnaval",
        desc: "Landing page dinámica para evento de carnaval. Diseño vibrante con HTML, CSS y JavaScript vanilla."
      }
    },
    process: {
      title: "Workflow de Desarrollo",
      subtitle: "Un camino claro y transparente desde tu idea hasta el lanzamiento.",
      steps: [
        { title: "Escucha & Estrategia", desc: "Nos sentamos contigo a entender tu idea a fondo. Definimos qué necesitas realmente para empezar y trazamos el plan.", deliverable: "Plan de Trabajo" },
        { title: "Diseño Visual", desc: "Creamos el aspecto visual de tu proyecto. Verás cómo lucirá todo antes de que escribamos una sola línea de código.", deliverable: "Diseño Interactivo" },
        { title: "Programación", desc: "Manos a la obra. Nuestro equipo desarrolla tu sitio o app con las mejores prácticas para que sea rápido y seguro.", deliverable: "Avances Semanales" },
        { title: "Lanzamiento", desc: "Hacemos las pruebas finales y ponemos tu proyecto en línea, listo para que todo el mundo lo vea.", deliverable: "Proyecto Online" }
      ],
      delivTitle: "Recibes"
    },
    contact: { title: "Hazlo Realidad", subtitle: "¿Tienes una idea rondando en tu cabeza? Cuéntanosla.", nameLabel: "Tu Nombre", ideaLabel: "Cuéntanos tu idea", btn: "Solicitar Presupuesto", whatsapp: "Chat Directo" }
  },
  en: {
    hero: { tag: "Software Development Studio", title: "TUKI", subtitle: "Transforming the digital future" },
    nav: { home: "Home", about: "About", services: "Services", projects: "Work", process: "Workflow", contact: "Quote" },

    about: {
      title: "About Us",
      desc: "At TukiCode, we believe technology is for everyone. We are a team of developers and creatives passionate about bringing ideas to life. Whether you are a dreamer, a creator, or someone with a unique vision, we write the code so you can focus on your dream.",
      missionTitle: "Our Mission",
      missionDesc: "Break down technical barriers. We want anyone, regardless of budget or tech skills, to have access to professional-quality software development to launch their project to the world.",
      visionTitle: "Our Vision",
      visionDesc: "To be the go-to digital dream factory, building a future where no good idea stays on paper due to a lack of a reliable dev team.",
      teamTitle: "Development Team"
    },

    services: {
      title: "Ecosystem of",
      subtitle: "Digital Solutions",
      intro: "We cover the entire digital product lifecycle. From high-conversion Landing Pages to complex software architectures.",
      cards: [
        {
          title: "Web Dev & Landings",
          desc: "Sites designed to sell. Extreme speed, optimized SEO, and fluid animations that retain users.",
          tags: ["Next.js", "Tailwind", "SEO"]
        },
        {
          title: "Scalable E-Commerce",
          desc: "Robust online stores. Payment integration (Stripe), inventory management, and custom admin panels.",
          tags: ["React", "Angular", "Node.js"]
        },
        {
          title: "Custom Software",
          desc: "Complex systems for unique problems. CRMs, SaaS platforms, process automation, and custom APIs.",
          tags: ["Node.js", "Database", "Cloud"]
        }
      ],
      techTitle: "Tech Arsenal"
    },
    projects: {
      title: "Portfolio",
      subtitle: "Projects we have developed for our clients",
      btn: "View GitHub",
      p1: {
        title: "Tuki Salon Assistant",
        desc: "Complete management system for gastronomy businesses. Table management, sales, inventory and order control."
      },
      p2: {
        title: "JOUP LAB & STUDIO",
        desc: "Custom website for barista entrepreneur. Interactive portfolio with modern and attractive design."
      },
      p3: {
        title: "Grito de Carnaval",
        desc: "Dynamic landing page for carnival event. Vibrant design with HTML, CSS and vanilla JavaScript."
      }
    },
    process: {
      title: "Development Workflow",
      subtitle: "A clear and transparent path from your idea to launch.",
      steps: [
        { title: "Listen & Strategy", desc: "We sit down to fully understand your idea. We define exactly what you need to start and map out the plan.", deliverable: "Work Plan" },
        { title: "Visual Design", desc: "We create the look and feel. You'll see exactly how it looks before we write a single line of code.", deliverable: "Interactive Design" },
        { title: "Coding", desc: "Let's get to work. Our team builds your site or app using best practices for speed and security.", deliverable: "Weekly Updates" },
        { title: "Launch", desc: "We run final tests and put your project online, ready for the world to see.", deliverable: "Live Project" }
      ],
      delivTitle: "You Get"
    },
    contact: { title: "Make it Real", subtitle: "Have an idea in mind? Tell us about it.", nameLabel: "Your Name", ideaLabel: "Tell us your idea", btn: "Request Quote", whatsapp: "Direct Chat" }
  }
};
