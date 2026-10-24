import Link from 'next/link';
import { notFound } from 'next/navigation';
import { copy, isLocale } from '../../content/site';
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return <><p className="eyebrow">{t.status}</p><p>{t.intro}</p><h1>{t.title}</h1><p>{t.description}</p>
    {(['work', 'about', 'journal'] as const).map((section) => <section key={section}>
      <h2><Link href={`/${locale}/${section}/`}>{t[section]} <span aria-hidden="true">↗</span></Link></h2>
      <p>{t[`${section}Text`]}</p>
    </section>)}
  </>;
}
