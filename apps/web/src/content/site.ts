export const locales = ['en', 'pt-BR'] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
export const copy = {
  en: {
    title: 'UI engineering, thoughtfully crafted.',
    intro: 'Philip Warkentien II · Staff UI Engineer',
    description: 'Exploring the intersection of interaction, motion, and inclusive design.',
    work: 'Work', about: 'About', journal: 'Journal',
    workText: 'Selected projects and interactive experiments will live here.',
    aboutText: 'I bring together visual problem solving, engineering, and mentoring.',
    journalText: 'Essays on UI engineering will be published here.',
    home: 'Home', skip: 'Skip to content', archive: '2019 portfolio', projects: '2019 projects',
    status: 'New portfolio · Foundation preview', language: 'Language', empty: 'No articles published yet.',
  },
  'pt-BR': {
    title: 'Engenharia de interfaces, com cuidado.',
    intro: 'Philip Warkentien II · Staff UI Engineer',
    description: 'Explorando a interseção entre interação, movimento e design inclusivo.',
    work: 'Projetos', about: 'Sobre', journal: 'Artigos',
    workText: 'Projetos selecionados e experimentos interativos estarão aqui.',
    aboutText: 'Uno resolução de problemas visuais, engenharia e mentoria.',
    journalText: 'Artigos sobre engenharia de interfaces serão publicados aqui.',
    home: 'Início', skip: 'Pular para o conteúdo', archive: 'Portfólio de 2019', projects: 'Projetos de 2019',
    status: 'Novo portfólio · Prévia da estrutura', language: 'Idioma', empty: 'Nenhum artigo publicado ainda.',
  },
} satisfies Record<Locale, Record<string, string>>;
