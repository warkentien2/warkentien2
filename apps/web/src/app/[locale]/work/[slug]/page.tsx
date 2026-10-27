import { notFound } from "next/navigation";
import { caseSlugs, cases, isCaseSlug } from "../../../../content/cases";
import { isLocale, locales } from "../../../../content/site";
import { CaseStudy } from "../../../../components/CaseStudy";
import { localizedMetadata } from "../../../../content/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseSlugs.map((slug) => ({ locale, slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCaseSlug(slug)) notFound();
  return localizedMetadata(
    locale,
    `work/${slug}/`,
    cases[locale][slug].title,
    cases[locale][slug].summary,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isCaseSlug(slug)) notFound();
  return <CaseStudy locale={locale} slug={slug} />;
}
