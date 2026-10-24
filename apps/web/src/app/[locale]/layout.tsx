import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { copy, isLocale, locales } from '../../content/site';
export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    metadataBase: new URL('https://warkentien2.com/2026/'),
    title: { default: 'Philip Warkentien II · Staff UI Engineer', template: '%s · Philip Warkentien II' },
    description: copy[locale].description,
  };
}
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return <html lang={locale}><body>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header><Link href={`/${locale}/`}>PW II</Link>
      <nav aria-label={t.home}>
        <Link href={`/${locale}/work/`}>{t.work}</Link>
        <Link href={`/${locale}/about/`}>{t.about}</Link>
        <Link href={`/${locale}/journal/`}>{t.journal}</Link>
      </nav>
      <nav aria-label={t.language}><Link href="/en/" lang="en" hrefLang="en">English</Link>
        <Link href="/pt-BR/" lang="pt-BR" hrefLang="pt-BR">Português</Link></nav>
    </header>
    <main id="main" tabIndex={-1}>{children}</main>
    <footer><a href="/">{t.archive}</a><a href="/projects/">{t.projects}</a></footer>
  </body></html>;
}
