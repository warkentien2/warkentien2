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
    workText: 'Selected engineering work and interactive experiments.',
    aboutText: 'I bring together visual problem solving, engineering, and mentoring.',
    journalText: 'Technical articles and the thinking behind the experiments.',
    home: 'Home', skip: 'Skip to content', archive: '2019 portfolio', projects: '2019 projects',
    status: 'Design × Engineering', language: 'Language', empty: 'Technical articles published on Dev.to.',
  },
  'pt-BR': {
    title: 'Engenharia de interfaces, com cuidado.',
    intro: 'Philip Warkentien II · Staff UI Engineer',
    description: 'Explorando a interseção entre interação, movimento e design inclusivo.',
    work: 'Projetos', about: 'Sobre', journal: 'Artigos',
    workText: 'Trabalhos selecionados de engenharia e experimentos interativos.',
    aboutText: 'Uno resolução de problemas visuais, engenharia e mentoria.',
    journalText: 'Artigos técnicos e o raciocínio por trás dos experimentos.',
    home: 'Início', skip: 'Pular para o conteúdo', archive: 'Portfólio de 2019', projects: 'Projetos de 2019',
    status: 'Design × Engenharia', language: 'Idioma', empty: 'Artigos técnicos publicados no Dev.to.',
  },
} satisfies Record<Locale, Record<string, string>>;
