import { notFound } from "next/navigation";
import { copy, isLocale } from "../../../content/site";
import { ui } from "../../../content/interface";
import { localizedMetadata } from "../../../content/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(
    locale,
    "journal/",
    copy[locale].journal,
    ui[locale].journalIntro,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return (
    <div className="page-heading journal-page">
      <p className="technical">
        CSS / {locale === "en" ? "Ideas in the open" : "Ideias em público"}
      </p>
      <h1>{t.journal}</h1>
      <p>{ui[locale].journalIntro}</p>
      <a
        className="article-feature"
        href="https://dev.to/warkentien2/series/26904"
      >
        <span className="technical">02 / Impossible CSS</span>
        <h2>Desert Racer × Curious Geckos</h2>
        <p>{ui[locale].readArticles} ↗</p>
      </a>
      <p className="technical">{t.empty}</p>
    </div>
  );
}
