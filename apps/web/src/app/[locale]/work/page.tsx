import { notFound } from "next/navigation";
import { copy, isLocale } from "../../../content/site";
import { ui } from "../../../content/interface";
import { Gallery } from "../../../components/Gallery";
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
    "work/",
    copy[locale].work,
    ui[locale].workIntro,
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
    <>
      <div className="page-heading">
        <p className="technical">{ui[locale].exhibit}</p>
        <h1>{t.work}</h1>
        <p>{ui[locale].workIntro}</p>
      </div>
      <Gallery locale={locale} />
    </>
  );
}
