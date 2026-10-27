import type { Locale } from "./site";
import type { ImageId } from "./assets";

export type TileVariant =
  "typography" | "illustration" | "metric" | "interactive" | "featured";
export type Tone = "cobalt" | "paper" | "ink" | "orange" | "mist" | "violet";
export type Category = "architecture" | "case-study" | "visual";
export type CaseSlug =
  | "design-systems"
  | "frontend-performance"
  | "data-visualization"
  | "creative-engineering";
export type TileId =
  | "identity"
  | "systems"
  | "performance"
  | "product"
  | "data"
  | "architecture"
  | "enterprise"
  | "impossible"
  | "impact"
  | "details"
  | "leadership"
  | "exploration";
export interface TileDefinition {
  id: TileId;
  order: number;
  visible: boolean;
  variant: TileVariant;
  tone: Tone;
  category: Category;
  image?: ImageId;
  caseStudy?: CaseSlug;
  colors?: { background?: string; foreground?: string; accent?: string };
}

// Layout, imagery, order, and color are independent editing choices.
export const tiles: readonly TileDefinition[] = [
  {
    id: "identity",
    order: 1,
    visible: true,
    variant: "typography",
    tone: "cobalt",
    category: "architecture",
  },
  {
    id: "systems",
    order: 2,
    visible: true,
    variant: "featured",
    tone: "paper",
    category: "case-study",
    image: "systems",
    caseStudy: "design-systems",
  },
  {
    id: "performance",
    order: 3,
    visible: true,
    variant: "featured",
    tone: "ink",
    category: "case-study",
    image: "performance",
    caseStudy: "frontend-performance",
  },
  {
    id: "product",
    order: 4,
    visible: true,
    variant: "typography",
    tone: "paper",
    category: "architecture",
  },
  {
    id: "data",
    order: 5,
    visible: true,
    variant: "illustration",
    tone: "ink",
    category: "case-study",
    image: "visualization",
    caseStudy: "data-visualization",
  },
  {
    id: "architecture",
    order: 6,
    visible: true,
    variant: "typography",
    tone: "orange",
    category: "architecture",
  },
  {
    id: "enterprise",
    order: 7,
    visible: true,
    variant: "illustration",
    tone: "paper",
    category: "visual",
    image: "enterprise",
  },
  {
    id: "impossible",
    order: 8,
    visible: true,
    variant: "interactive",
    tone: "cobalt",
    category: "case-study",
    caseStudy: "creative-engineering",
  },
  {
    id: "impact",
    order: 9,
    visible: true,
    variant: "metric",
    tone: "mist",
    category: "architecture",
  },
  {
    id: "details",
    order: 10,
    visible: true,
    variant: "illustration",
    tone: "paper",
    category: "visual",
    image: "craft",
  },
  {
    id: "leadership",
    order: 11,
    visible: true,
    variant: "typography",
    tone: "violet",
    category: "architecture",
  },
  {
    id: "exploration",
    order: 12,
    visible: true,
    variant: "illustration",
    tone: "ink",
    category: "visual",
    image: "exploration",
  },
];

export interface TileCopy {
  title: string;
  description: string;
  detail: string;
  label: string;
}
export const tileCopy: Record<Locale, Record<TileId, TileCopy>> = {
  en: {
    identity: {
      title: "Design × Engineering",
      description:
        "The space between an ambitious idea and an interface you can feel.",
      detail:
        "I bring visual problem-solving to frontend architecture. React, TypeScript, advanced CSS, and motion are tools for making complex interfaces intuitive and enjoyable.",
      label: "Core practice",
    },
    systems: {
      title: "Systems That Scale",
      description:
        "Pipefy · Design System modernization through a product rebrand.",
      detail:
        "Helped lead Design System engineering and modernization, with clearer component APIs and greater reuse. An initial rebrand prototype was presented within 45 days.",
      label: "Pipefy",
    },
    performance: {
      title: "0.8s Faster",
      description: "Anywhere · Approximately 0.8 seconds less LCP.",
      detail:
        "Frontend performance work at Anywhere included improvements to LCP, FCP, and CLS, alongside image optimization, reliability, and SEO tooling.",
      label: "Anywhere Real Estate",
    },
    product: {
      title: "Beyond the Mockup",
      description:
        "Think through the experience. Prototype the interaction. Make it real.",
      detail:
        "A working prototype makes an interaction tangible. My practice connects product thinking, direct UX prototyping, and the engineering decisions that carry an idea into a usable interface.",
      label: "Product × UX",
    },
    data: {
      title: "Data, Beautifully Engineered",
      description: "Custom SVG gauges and lightweight charting at Anywhere.",
      detail:
        "Purpose-built SVG gauges and charting components made data part of the interface. The interactive example here is an original demonstration, not a screenshot of an employer product.",
      label: "SVG / interaction",
    },
    architecture: {
      title: "Built to Last",
      description: "React. TypeScript. Reusable architecture.",
      detail:
        "Clear component boundaries and understandable APIs make visual craft easier to sustain. Reuse should support a product’s real needs, with room for accessible behavior, localization, and change.",
      label: "Shared foundations",
    },
    enterprise: {
      title: "Complexity, Simplified",
      description: "Enterprise interfaces with a clear path through the data.",
      detail:
        "My work includes data-intensive enterprise interfaces and senior UI consulting at Apple, as well as complex UI and localization on PayPal Checkout as a Staff Software Engineer.",
      label: "Enterprise UI",
    },
    impossible: {
      title: "Impossible? Challenge Accepted",
      description: "Desert Racer. Curious Geckos. HTML and CSS, taken further.",
      detail:
        "Desert Racer explores CSS-only swipe input and collision detection, and was featured at CSS Day 2024. Curious Geckos explores position awareness without JavaScript.",
      label: "Creative engineering",
    },
    impact: {
      title: "80% Fewer",
      description:
        "Reported reduction in custom component implementations at Pipefy.",
      detail:
        "At Pipefy, Design System modernization included clearer component APIs and improved reuse. The reported reduction in custom component implementations was 80%.",
      label: "Reported / Pipefy",
    },
    details: {
      title: "Details Matter",
      description:
        "Accessibility. Visual fidelity. Localization. The quality is in the interaction.",
      detail:
        "PayPal Checkout work included localization and complex UI engineering. At Medallia, I contributed to a mature Design System serving eight child companies and replaced three JavaScript functionalities with CSS.",
      label: "Interface craft",
    },
    leadership: {
      title: "Raise the Bar",
      description: "Mentorship. Documentation. Technical leadership.",
      detail:
        "At ArcTouch / Grey, I led a studio team of 14. At Udacity, I mentored more than 250 students and reviewed over 5,000 projects. Sharing knowledge is part of the engineering work.",
      label: "People & practice",
    },
    exploration: {
      title: "Made to Explore",
      description:
        "A CSS tarantula, an interactive crossword, motion, and digital artwork.",
      detail:
        "Personal experiments make room for curiosity. Explore the animated HTML/CSS/GSAP tarantula in the original portfolio, or follow the technical articles for the reasoning behind the CSS experiments.",
      label: "Open lab",
    },
  },
  "pt-BR": {
    identity: {
      title: "Design × Engenharia",
      description:
        "O espaço entre uma ideia ambiciosa e uma interface que você sente.",
      detail:
        "Uno resolução de problemas visuais e arquitetura frontend. React, TypeScript, CSS avançado e movimento são ferramentas para tornar interfaces complexas intuitivas e agradáveis.",
      label: "Minha prática",
    },
    systems: {
      title: "Sistemas que Crescem",
      description:
        "Pipefy · Modernização do Design System durante um rebranding.",
      detail:
        "Ajudei a liderar a engenharia e modernização do Design System, com APIs de componentes mais claras e maior reutilização. Um protótipo inicial do rebranding foi apresentado em até 45 dias.",
      label: "Pipefy",
    },
    performance: {
      title: "0,8s Mais Rápido",
      description: "Anywhere · Redução de aproximadamente 0,8 segundo no LCP.",
      detail:
        "O trabalho de performance frontend na Anywhere incluiu melhorias em LCP, FCP e CLS, além de otimização de imagens, confiabilidade e ferramentas de SEO.",
      label: "Anywhere Real Estate",
    },
    product: {
      title: "Além do Mockup",
      description:
        "Pensar na experiência. Prototipar a interação. Tornar a ideia real.",
      detail:
        "Um protótipo funcional torna uma interação tangível. Minha prática conecta visão de produto, prototipação direta de UX e as decisões de engenharia que transformam uma ideia em uma interface utilizável.",
      label: "Produto × UX",
    },
    data: {
      title: "Dados, Bem Desenhados",
      description:
        "Indicadores SVG e componentes leves de gráficos na Anywhere.",
      detail:
        "Indicadores SVG e gráficos personalizados fizeram dos dados parte da interface. O exemplo interativo aqui é uma demonstração original, não uma captura de um produto de empregador.",
      label: "SVG / interação",
    },
    architecture: {
      title: "Feito para Durar",
      description: "React. TypeScript. Arquitetura reutilizável.",
      detail:
        "Limites claros entre componentes e APIs compreensíveis ajudam a sustentar o cuidado visual. A reutilização deve apoiar as necessidades reais do produto, com espaço para acessibilidade, localização e mudanças.",
      label: "Bases compartilhadas",
    },
    enterprise: {
      title: "Complexidade, Simplificada",
      description:
        "Interfaces empresariais com um caminho claro entre os dados.",
      detail:
        "Meu trabalho inclui interfaces empresariais com muitos dados e consultoria sênior de UI na Apple, além de interfaces complexas e localização no PayPal Checkout como Staff Software Engineer.",
      label: "UI empresarial",
    },
    impossible: {
      title: "Impossível? Desafio Aceito",
      description: "Desert Racer. Curious Geckos. HTML e CSS levados além.",
      detail:
        "Desert Racer explora gestos e detecção de colisões apenas com CSS e foi apresentado no CSS Day 2024. Curious Geckos explora percepção de posição sem JavaScript.",
      label: "Engenharia criativa",
    },
    impact: {
      title: "80% Menos",
      description:
        "Redução reportada nas implementações de componentes personalizados na Pipefy.",
      detail:
        "Na Pipefy, a modernização do Design System incluiu APIs de componentes mais claras e maior reutilização. A redução reportada nas implementações de componentes personalizados foi de 80%.",
      label: "Reportado / Pipefy",
    },
    details: {
      title: "Detalhes Importam",
      description:
        "Acessibilidade. Fidelidade visual. Localização. A qualidade está na interação.",
      detail:
        "No PayPal Checkout, trabalhei com localização e engenharia de interfaces complexas. Na Medallia, contribuí para um Design System maduro usado por oito empresas do grupo e substituí três funcionalidades JavaScript por CSS.",
      label: "Cuidado com a UI",
    },
    leadership: {
      title: "Elevar o Padrão",
      description: "Mentoria. Documentação. Liderança técnica.",
      detail:
        "Na ArcTouch / Grey, liderei um estúdio de 14 pessoas. Na Udacity, mentorei mais de 250 estudantes e revisei mais de 5.000 projetos. Compartilhar conhecimento faz parte da engenharia.",
      label: "Pessoas & prática",
    },
    exploration: {
      title: "Feito para Explorar",
      description:
        "Uma tarântula em CSS, palavras cruzadas interativas, movimento e arte digital.",
      detail:
        "Experimentos pessoais abrem espaço para a curiosidade. Explore a tarântula animada em HTML/CSS/GSAP no portfólio original ou os artigos técnicos sobre o raciocínio por trás dos experimentos em CSS.",
      label: "Laboratório aberto",
    },
  },
};

export const palettes = ["swiss", "paper", "cobalt", "night"] as const;
export type Palette = (typeof palettes)[number];
export function isPalette(value: string): value is Palette {
  return palettes.some((palette) => palette === value);
}
export const experimentLinks = {
  racer:
    "https://000699350.deployed.codepen.website/pages/home/home.html#color-1",
  geckos: "https://codepen.io/warkentien2/pen/jOJJwEp",
  articles: "https://dev.to/warkentien2/series/26904",
};
