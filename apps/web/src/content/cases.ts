import type { Locale } from "./site";
import type { CaseSlug } from "./portfolio";
import type { ImageId } from "./assets";
export const caseSlugs: CaseSlug[] = [
  "design-systems",
  "frontend-performance",
  "data-visualization",
  "creative-engineering",
];
export function isCaseSlug(value: string): value is CaseSlug {
  return caseSlugs.some((slug) => slug === value);
}
export interface CaseStudyContent {
  title: string;
  organization: string;
  summary: string;
  image?: ImageId;
  metrics: { value: string; label: string }[];
  sections: { title: string; text: string }[];
}
export const cases: Record<Locale, Record<CaseSlug, CaseStudyContent>> = {
  en: {
    "design-systems": {
      title: "Systems That Scale",
      organization: "Pipefy / Design Systems",
      image: "systems",
      summary:
        "Modernizing an established SaaS Design System while a product finds a new visual identity.",
      metrics: [
        {
          value: "80%",
          label: "Reported reduction in custom component implementations",
        },
        {
          value: "45 days",
          label: "Initial rebrand prototype presented within this period",
        },
      ],
      sections: [
        {
          title: "A rebrand, and a foundation",
          text: "At Pipefy, I helped lead Design System engineering and modernization during an established SaaS product rebrand. The work connected a changing visual identity to the reusable components behind the product.",
        },
        {
          title: "APIs that support reuse",
          text: "The contribution included modernizing component APIs and reuse. Pipefy reported an 80% reduction in custom component implementations during this modernization.",
        },
        {
          title: "Make the idea tangible",
          text: "An initial rebrand prototype was presented within 45 days. A concrete interface gives design and engineering something shared to examine and refine.",
        },
        {
          title: "Explore the principles",
          text: "The workbench below is an original public demonstration of theme, density, and component-state choices.",
        },
      ],
    },
    "frontend-performance": {
      title: "0.8s Faster",
      organization: "Anywhere Real Estate / Frontend Performance",
      image: "performance",
      summary:
        "Frontend performance work that connects loading behavior, image payloads, and a more reliable interface.",
      metrics: [
        { value: "≈ 0.8s", label: "LCP reduction" },
        {
          value: "124 MB → ≈ 1 MB",
          label: "One image-payload optimization example",
        },
      ],
      sections: [
        {
          title: "Loading is part of the experience",
          text: "At Anywhere Real Estate, frontend performance improvements included an approximately 0.8-second LCP reduction and improvements to FCP and CLS.",
        },
        {
          title: "Pay attention to the images",
          text: "In one image-payload optimization example at Anywhere, 124 MB was reduced to approximately 1 MB.",
        },
        {
          title: "Reliability beyond a single metric",
          text: "The work also included frontend reliability, SEO, and image optimization tooling. These areas shape whether an interface is dependable and discoverable as well as fast.",
        },
        {
          title: "Keep the evidence honest",
          text: "The conceptual illustration introduces the topic. The reported LCP improvement and image-payload example come from my work at Anywhere Real Estate.",
        },
      ],
    },
    "data-visualization": {
      title: "Data, Beautifully Engineered",
      organization: "Anywhere Real Estate / SVG & Data Visualization",
      image: "visualization",
      summary:
        "Custom SVG gauges and lightweight charting components that give data a clear visual form.",
      metrics: [
        { value: "SVG", label: "Custom gauges" },
        { value: "UI", label: "Lightweight charting components" },
      ],
      sections: [
        {
          title: "The interface is the explanation",
          text: "At Anywhere, I built custom SVG gauges and lightweight charting components. The goal of this craft is to make data legible through shape, hierarchy, and interaction.",
        },
        {
          title: "A small, inspectable demonstration",
          text: "Move the control below to change an SVG gauge and chart. This original demonstration uses local illustrative values, accessible text, and ordinary React.",
        },
        {
          title: "Motion with a purpose",
          text: "The demonstration animates the transition between values and respects reduced-motion preferences. The numeric value and table remain readable without relying on color or motion.",
        },
      ],
    },
    "creative-engineering": {
      title: "Impossible? Challenge Accepted",
      organization: "Personal Experiments / Creative Engineering",
      image: "tarantula",
      summary:
        "Small experiments that ask a useful question: what else can the browser do?",
      metrics: [
        { value: "CSS", label: "Desert Racer & Curious Geckos" },
        { value: "2024", label: "Desert Racer featured at CSS Day" },
      ],
      sections: [
        {
          title: "Desert Racer",
          text: "A CSS-only interaction experiment exploring swipe input and collision detection, featured at CSS Day 2024. The playable experience and technical articles show the experiment and its reasoning.",
        },
        {
          title: "Curious Geckos",
          text: "A CSS-only position-awareness experiment. A playful interaction becomes a way to investigate what selectors and CSS state can express without JavaScript.",
        },
        {
          title: "A creature made of interfaces",
          text: "The original portfolio’s animated tarantula is built with HTML, CSS, and GSAP. Personal work also includes an interactive crossword, motion experiments, technical articles, and digital artwork.",
        },
        {
          title: "Creative work, together",
          text: "At ArcTouch / Grey, my work included creative engineering and animation for major agency clients, and leading a studio team of 14 people. The public archive preserves a selection of that animation work.",
        },
      ],
    },
  },
  "pt-BR": {
    "design-systems": {
      title: "Sistemas que Crescem",
      organization: "Pipefy / Design Systems",
      image: "systems",
      summary:
        "Modernizar um Design System de SaaS estabelecido enquanto o produto encontra uma nova identidade visual.",
      metrics: [
        {
          value: "80%",
          label:
            "Redução reportada nas implementações de componentes personalizados",
        },
        {
          value: "45 dias",
          label:
            "Protótipo inicial do rebranding apresentado dentro desse período",
        },
      ],
      sections: [
        {
          title: "Um rebranding e uma base",
          text: "Na Pipefy, ajudei a liderar a engenharia e modernização do Design System durante o rebranding de um produto SaaS estabelecido. O trabalho conectou a nova identidade visual aos componentes reutilizáveis do produto.",
        },
        {
          title: "APIs que apoiam a reutilização",
          text: "A contribuição incluiu modernização de APIs de componentes e reutilização. A Pipefy reportou redução de 80% nas implementações de componentes personalizados durante essa modernização.",
        },
        {
          title: "Tornar a ideia tangível",
          text: "Um protótipo inicial do rebranding foi apresentado em até 45 dias. Uma interface concreta oferece a design e engenharia algo compartilhado para avaliar e refinar.",
        },
        {
          title: "Explorar os princípios",
          text: "A bancada abaixo é uma demonstração pública original de temas, densidade e estados de componentes.",
        },
      ],
    },
    "frontend-performance": {
      title: "0,8s Mais Rápido",
      organization: "Anywhere Real Estate / Performance Frontend",
      image: "performance",
      summary:
        "Performance frontend que conecta carregamento, volume de imagens e uma interface mais confiável.",
      metrics: [
        { value: "≈ 0,8s", label: "Redução no LCP" },
        {
          value: "124 MB → ≈ 1 MB",
          label: "Um exemplo de otimização do volume de imagens",
        },
      ],
      sections: [
        {
          title: "Carregamento faz parte da experiência",
          text: "Na Anywhere Real Estate, as melhorias de performance frontend incluíram redução de aproximadamente 0,8 segundo no LCP e melhorias em FCP e CLS.",
        },
        {
          title: "Atenção às imagens",
          text: "Em um exemplo de otimização na Anywhere, o volume de imagens foi reduzido de 124 MB para aproximadamente 1 MB.",
        },
        {
          title: "Confiabilidade além de uma métrica",
          text: "O trabalho também incluiu confiabilidade frontend, SEO e ferramentas de otimização de imagens. Essas áreas ajudam a tornar a interface confiável, encontrável e rápida.",
        },
        {
          title: "Respeitar as evidências",
          text: "A ilustração conceitual apresenta o tema. A melhoria reportada no LCP e o exemplo de otimização de imagens vêm do meu trabalho na Anywhere Real Estate.",
        },
      ],
    },
    "data-visualization": {
      title: "Dados, Bem Desenhados",
      organization: "Anywhere Real Estate / SVG e Visualização de Dados",
      image: "visualization",
      summary:
        "Indicadores SVG e componentes leves de gráficos que dão uma forma visual clara aos dados.",
      metrics: [
        { value: "SVG", label: "Indicadores personalizados" },
        { value: "UI", label: "Componentes leves de gráficos" },
      ],
      sections: [
        {
          title: "A interface é a explicação",
          text: "Na Anywhere, construí indicadores SVG e componentes leves de gráficos. Esse cuidado busca tornar dados compreensíveis por meio de forma, hierarquia e interação.",
        },
        {
          title: "Uma demonstração pequena e inspecionável",
          text: "Mova o controle abaixo para alterar um indicador SVG e um gráfico. A demonstração original usa valores ilustrativos locais, texto acessível e React.",
        },
        {
          title: "Movimento com propósito",
          text: "A demonstração anima a transição entre valores e respeita a preferência por movimento reduzido. O valor numérico e a tabela continuam legíveis sem depender de cor ou movimento.",
        },
      ],
    },
    "creative-engineering": {
      title: "Impossível? Desafio Aceito",
      organization: "Experimentos Pessoais / Engenharia Criativa",
      image: "tarantula",
      summary:
        "Pequenos experimentos que fazem uma pergunta útil: o que mais o navegador pode fazer?",
      metrics: [
        { value: "CSS", label: "Desert Racer e Curious Geckos" },
        { value: "2024", label: "Desert Racer apresentado no CSS Day" },
      ],
      sections: [
        {
          title: "Desert Racer",
          text: "Experimento de interação apenas com CSS que explora gestos e detecção de colisões, apresentado no CSS Day 2024. A experiência jogável e os artigos técnicos mostram o experimento e seu raciocínio.",
        },
        {
          title: "Curious Geckos",
          text: "Experimento de percepção de posição apenas com CSS. Uma interação lúdica vira uma forma de investigar o que seletores e estados CSS conseguem expressar sem JavaScript.",
        },
        {
          title: "Uma criatura feita de interfaces",
          text: "A tarântula animada do portfólio original usa HTML, CSS e GSAP. O trabalho pessoal também inclui palavras cruzadas interativas, experimentos de movimento, artigos técnicos e arte digital.",
        },
        {
          title: "Criação em equipe",
          text: "Na ArcTouch / Grey, trabalhei com engenharia criativa e animação para grandes clientes de agência e liderei um estúdio de 14 pessoas. O arquivo público preserva uma seleção desse trabalho de animação.",
        },
      ],
    },
  },
};
