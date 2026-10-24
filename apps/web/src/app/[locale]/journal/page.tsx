import { notFound } from 'next/navigation';
import { copy, isLocale } from '../../../content/site';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { title: copy[locale].journal };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return <><h1>{t.journal}</h1><p>{t.empty}</p></>;
}
