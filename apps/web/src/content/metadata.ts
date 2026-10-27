import type { Metadata } from "next";
import type { Locale } from "./site";
export function localizedMetadata(
  locale: Locale,
  route: string,
  title: string,
  description?: string,
): Metadata {
  const url = (language: Locale) =>
    `https://warkentien2.com/2026/${language}/${route}`;
  return {
    title,
    description,
    alternates: {
      canonical: url(locale),
      languages: { en: url("en"), "pt-BR": url("pt-BR") },
    },
  };
}
