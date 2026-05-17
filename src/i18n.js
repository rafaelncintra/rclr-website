import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  pt: {
    translation: {
      nav: {
        about: 'Sobre',
        speaking: 'Palestras',
        writing: 'Publicações',
        contact: 'Contato',
      },
      lang: {
        toggle: 'EN',
        current: 'PT',
      },
      hero: {
        eyebrow: 'Liderança · Qualidade · Transformação',
        headline: 'Pensamento e prática em software de alta performance',
        subheadline:
          'Rafael Navarro Cintra e Larissa Rosochansky compartilham mais de duas décadas de experiência transformando equipes e culturas de engenharia — em palcos internacionais e nas páginas onde o debate técnico acontece.',
        cta: 'Conheça nosso trabalho',
      },
      about: {
        sectionLabel: 'Sobre nós',
        sectionTitle: 'Duas perspectivas, um propósito',
        sectionIntro:
          'Fundamos a RCLR como um espaço de pensamento independente — para publicar, debater e contribuir com a evolução da engenharia de software.',
        rafael: {
          name: 'Rafael Navarro Cintra',
          role: 'Principal Solutions Engineer, AppDev · Broadcom Software',
          location: 'São Paulo, Brasil',
          bio: 'Com trajetória que vai de QA Lead e Arquiteto de Automação na Santander Tecnologia a Principal Solutions Engineer na Broadcom, Rafael construiu sua expertise na industrialização do SDLC e na formação de times de engenharia de alta performance. Apaixonado por DevOps, qualidade intrínseca e transformação ágil — temas que leva a palcos do Brasil e do mundo.',
          tags: ['DevOps', 'Qualidade de Software', 'Automação', 'SDLC', 'Agile'],
          linkedin: 'https://linkedin.com/in/rafaelncintra',
          medium: 'https://medium.com/@rafaelnc',
        },
        larissa: {
          name: 'Larissa Rosochansky',
          role: 'Senior Global IT Leader · Mars',
          location: 'São Paulo, Brasil',
          bio: 'Liderança global em tecnologia com passagem por IBM, Avanade, CI&T (18 anos) e Thoughtworks como Delivery Principal. Larissa é referência internacional em transformação digital lean, engenharia ágil e automação cognitiva. Embaixadora Global para o Brasil da Women in Tech Network e indicada ao prêmio Globant "Women that Build" — uma das vozes mais relevantes da indústria.',
          tags: ['Lean Digital', 'Qualidade de Software', 'RPA / Cognitivo', 'Women in Tech', 'DevOps'],
          linkedin: 'https://linkedin.com/in/lrosocha',
        },
      },
      speaking: {
        sectionLabel: 'Palestras',
        sectionTitle: 'Onde levamos as ideias',
        sectionIntro:
          'Do Brasil à Europa e América do Norte, participamos das principais conferências de engenharia de software, qualidade e agilidade.',
        international: 'Internacional',
        columns: {
          event: 'Evento',
          topic: 'Tema',
          location: 'Local',
          year: 'Ano',
        },
      },
      writing: {
        sectionLabel: 'Publicações',
        sectionTitle: 'Onde escrevemos',
        sectionIntro:
          'Artigos, ensaios e reflexões sobre engenharia de software, qualidade e liderança técnica.',
        readMore: 'Ler artigo',
        noPosts: 'Em breve.',
        noPostsDetail: 'Acompanhe nosso trabalho no Medium e LinkedIn.',
        mediumCta: 'Medium · Rafael',
        mediumUrl: 'https://medium.com/@rafaelnc',
      },
      contact: {
        sectionLabel: 'Contato',
        sectionTitle: 'Convide-nos para o seu evento',
        body: 'Estamos disponíveis para palestras em conferências, painéis e eventos de tecnologia, engenharia de software e liderança. Se você organiza um evento e acredita que nossas perspectivas agregam valor ao seu público, adoraríamos conversar.',
        email: 'rafael@rclr.com.br',
        emailSubject: 'Convite para palestra',
        cta: 'Enviar convite',
        linkedin: 'LinkedIn de Rafael',
        linkedinLarissa: 'LinkedIn de Larissa',
      },
      footer: {
        tagline: 'Pensamento independente em engenharia de software.',
        founded: 'RCLR Serviços de TI Ltda · Fundada em 2022',
        rights: 'Todos os direitos reservados.',
      },
    },
  },
  en: {
    translation: {
      nav: {
        about: 'About',
        speaking: 'Speaking',
        writing: 'Writing',
        contact: 'Contact',
      },
      lang: {
        toggle: 'PT',
        current: 'EN',
      },
      hero: {
        eyebrow: 'Leadership · Quality · Transformation',
        headline: 'Thinking and practice in high-performance software',
        subheadline:
          'Rafael Navarro Cintra and Larissa Rosochansky bring over two decades of experience transforming engineering teams and cultures — on international stages and in the publications where technical debate unfolds.',
        cta: 'Explore our work',
      },
      about: {
        sectionLabel: 'About us',
        sectionTitle: 'Two perspectives, one purpose',
        sectionIntro:
          'We founded RCLR as an independent thought hub — a place to publish, debate, and contribute to the evolution of software engineering.',
        rafael: {
          name: 'Rafael Navarro Cintra',
          role: 'Principal Solutions Engineer, AppDev · Broadcom Software',
          location: 'São Paulo, Brazil',
          bio: 'From QA Lead and Automation Architect at Santander Tecnologia to Principal Solutions Engineer at Broadcom, Rafael built his expertise in SDLC industrialization and building high-performance engineering teams. He is passionate about DevOps, built-in quality, and agile transformation — topics he brings to stages across Brazil and internationally.',
          tags: ['DevOps', 'Software Quality', 'Automation', 'SDLC', 'Agile'],
          linkedin: 'https://linkedin.com/in/rafaelncintra',
          medium: 'https://medium.com/@rafaelnc',
        },
        larissa: {
          name: 'Larissa Rosochansky',
          role: 'Senior Global IT Leader · Mars',
          location: 'São Paulo, Brazil',
          bio: 'A global technology leader with tenures at IBM, Avanade, CI&T (18 years), and Thoughtworks as Delivery Principal, Larissa is an international authority on lean digital transformation, agile engineering, and cognitive automation. Global Ambassador for Brazil at the Women in Tech Network and a Globant "Women that Build" nominee — one of the most significant voices in the industry.',
          tags: ['Lean Digital', 'Software Quality', 'RPA / Cognitive', 'Women in Tech', 'DevOps'],
          linkedin: 'https://linkedin.com/in/lrosocha',
        },
      },
      speaking: {
        sectionLabel: 'Speaking',
        sectionTitle: 'Where we take ideas',
        sectionIntro:
          'From Brazil to Europe and North America, we speak at the leading conferences on software engineering, quality, and agility.',
        international: 'International',
        columns: {
          event: 'Event',
          topic: 'Topic',
          location: 'Location',
          year: 'Year',
        },
      },
      writing: {
        sectionLabel: 'Writing',
        sectionTitle: 'Where we publish',
        sectionIntro:
          'Articles, essays, and reflections on software engineering, quality, and technical leadership.',
        readMore: 'Read article',
        noPosts: 'Coming soon.',
        noPostsDetail: 'Follow our work on Medium and LinkedIn.',
        mediumCta: 'Medium · Rafael',
        mediumUrl: 'https://medium.com/@rafaelnc',
      },
      contact: {
        sectionLabel: 'Contact',
        sectionTitle: 'Invite us to your event',
        body: 'We are available for talks at conferences, panels, and events focused on technology, software engineering, and technical leadership. If you organise an event and believe our perspectives would add value to your audience, we would love to hear from you.',
        email: 'rafael@rclr.com.br',
        emailSubject: 'Speaking invitation',
        cta: 'Send an invitation',
        linkedin: "Rafael's LinkedIn",
        linkedinLarissa: "Larissa's LinkedIn",
      },
      footer: {
        tagline: 'Independent thinking in software engineering.',
        founded: 'RCLR Serviços de TI Ltda · Founded in 2022',
        rights: 'All rights reserved.',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    defaultNS: 'translation',
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
