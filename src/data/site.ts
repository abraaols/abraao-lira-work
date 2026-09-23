export const site = {
  name: 'Abraão Lira',
  availability: 'Aceitando 5 projetos · set/2026',
  domain: 'abraaolira.work',
  domainAscii: 'abraaolira.work',
  url: 'https://abraaolira.work',
  description:
    'Desenvolvimento de sites, landing pages e web design sob medida para profissionais liberais e escritórios — Camboriú/SC.',
  location: 'Camboriú · SC · Brasil',
  whatsapp: '5515981194064',
  whatsappLabel: '+55 15 98119-4064',
  email: 'abralirasilva@gmail.com', // troque quando o Zoho estiver configurado
  github: 'https://github.com/abraaols',
  linkedin: '',
  // Foto da seção "Sobre". Coloque o arquivo em /public e aponte aqui
  // (ex.: '/portrait.jpg'). Deixe '' para exibir o placeholder com monograma.
  portrait: '',
};

export const services = [
  {
    num: '01',
    title: 'Site institucional',
    description:
      'Presença profissional sólida para escritórios e consultórios. Construído pra converter visita em consulta.',
    deliverables: ['Design sob medida', 'Página responsiva', 'SEO básico', 'Painel de edição'],
    priceFrom: 'R$ 497',
  },
  {
    num: '02',
    title: 'Landing page',
    description:
      'Página única focada em uma única ação. Tráfego pago, captura de leads e mensuração de resultado.',
    deliverables: ['Copy de conversão', 'Captura de leads', 'Integração com WhatsApp', 'Velocidade A+'],
    priceFrom: 'R$ 297',
  },
  {
    num: '03',
    title: 'Web Design',
    description:
      'Design visual completo para sua marca digital — identidade, paleta, tipografia e componentes prontos pra usar em qualquer plataforma.',
    deliverables: ['Identidade visual', 'Paleta e tipografia', 'Componentes UI', 'Guia de marca'],
    priceFrom: 'sob orçamento',
  },
  {
    num: '04',
    title: 'Automação & IA',
    description:
      'Integrações com WhatsApp Business API, IA generativa, fluxos no-code. Menos tarefa repetitiva, mais tempo pro que importa.',
    deliverables: ['WhatsApp Business API', 'Integrações Pix/Pagamento', 'Workflows no-code', 'Bots com IA'],
    priceFrom: 'sob orçamento',
  },
];

export interface ProjectPreviewCard {
  tag: string;
  title: string;
  meta: string;
}

export interface ProjectPreview {
  /** Cores do mock (cada projeto pode ter sua paleta). */
  theme: {
    paper: string;
    ink: string;
    accent: string;
    heroFrom: string;
    heroTo: string;
    card: string;
  };
  logo: string;
  nav: string[];
  cta: string;
  eyebrow: string;
  titleBefore: string;
  titleEm: string;
  titleAfter?: string;
  sub: string;
  primary: string;
  ghost: string;
  /** O primeiro card é renderizado em destaque. */
  cards: ProjectPreviewCard[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  accent: string;
  featured?: boolean;
  url?: string;
  category: string;
  deliverables: string[];
  preview: ProjectPreview;
  results?: { value: string; label: string }[];
  testimonial?: { quote: string; author: string };
}

export const projects: Project[] = [
  {
    slug: 'bela-psicologia',
    title: 'Bela Psicologia',
    tagline: 'Psicologia · 2025',
    description:
      'Site completo para Gabriela Bela, estudante de Psicologia. Blog com artigos por categoria, widget interativo de emoções, lista de espera para newsletter e seção de projetos futuros. Design acolhedor e editorial.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
    accent: 'var(--accent)',
    featured: true,
    url: 'https://belapsi.com.br',
    category: 'Site institucional · Blog',
    deliverables: [
      'Site completo com blog',
      'Widget interativo de emoções',
      'Lista de espera para newsletter',
      'SEO e Open Graph configurados',
      'Deploy na Vercel com domínio próprio',
    ],
    results: [
      { value: '95+', label: 'PageSpeed' },
      { value: '3', label: 'categorias de blog' },
      { value: '100%', label: 'responsivo' },
    ],
    preview: {
      theme: {
        paper: '#f7f3ee',
        ink: '#3d2c1e',
        accent: '#8b5e3c',
        heroFrom: '#f7f3ee',
        heroTo: '#ede8e0',
        card: '#ffffff',
      },
      logo: 'BelaPsicologia',
      nav: ['Início', 'Quem sou', 'Diário', 'Projetos'],
      cta: 'Receber reflexões',
      eyebrow: 'Espaço de psicologia & emoções',
      titleBefore: 'Um espaço para',
      titleEm: 'entender',
      titleAfter: 'emoções, relações e a si mesma.',
      sub: 'Sou Gabriela — estudante de Psicologia que acredita que entender a si mesma é um dos atos mais corajosos que existem.',
      primary: 'Ler reflexões',
      ghost: 'Quem sou eu',
      cards: [
        { tag: 'Destaque · Ansiedade', title: 'O que a ansiedade está tentando te dizer?', meta: '5 min · Mai 2025' },
        { tag: 'Relacionamentos', title: 'Por que a gente se apega a quem não quer a gente', meta: '7 min · Abr 2025' },
        { tag: 'Autoconhecimento', title: 'A arte de se conhecer sem se julgar', meta: '6 min · Abr 2025' },
      ],
    },
  },
];

export const principles = [
  {
    num: '/01',
    title: 'Código de gente, pra gente',
    body: 'Você não vai herdar um site travado. Tudo entregue documentado, versionado no GitHub, com painel pra você editar texto e imagem sem me chamar.',
  },
  {
    num: '/02',
    title: 'Conversão acima de enfeite',
    body: 'Animação bonita não paga conta. Cada elemento do site existe pra levar visitante até o WhatsApp, agendamento ou formulário.',
  },
  {
    num: '/03',
    title: 'Performance é design',
    body: 'Sites rápidos rankeiam melhor no Google e perdem menos visitas. Stack moderna, imagens otimizadas, nota 95+ no PageSpeed.',
  },
  {
    num: '/04',
    title: 'Direto, sem firula',
    body: 'Resposta no WhatsApp em horas, não dias. Reunião por vídeo só quando precisa. Preço claro, prazo escrito, escopo combinado.',
  },
];

export const faqs = [
  {
    q: 'Quanto tempo leva pra ficar pronto?',
    a: 'Landing page entre 5 e 10 dias úteis. Site institucional, 1 a 2 semanas. Web design depende do escopo, mas a entrega inicial costuma sair em 1 a 2 semanas.',
  },
  {
    q: 'Você atende fora de Santa Catarina?',
    a: 'Sim, 100% remoto. Reuniões por Google Meet, e suporte por WhatsApp.',
  },
  {
    q: 'O site fica com você ou comigo?',
    a: 'É 100% seu. Domínio no seu nome, código no seu GitHub, hospedagem na sua conta. Posso configurar tudo, mas a propriedade é sempre sua.',
  },
  {
    q: 'Posso editar o site depois que ficar pronto?',
    a: 'Sim. Através do GitHub onde você terá a possivilidade de troca de textos, imagens e adiciona novas páginas.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: '50% pra começar, 50% na entrega. Pix, cartão (via MercadoPago) ou transferência.',
  },
];
