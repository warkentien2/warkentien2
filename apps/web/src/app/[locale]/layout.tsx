import type { Metadata } from "next";
import { SiteShell } from "../../components/SiteShell";
import { notFound } from "next/navigation";
import { copy, isLocale, locales } from "../../content/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    metadataBase: new URL("https://warkentien2.com/2026/"),
    title: {
      default: "Philip Warkentien II · Staff UI Engineer",
      template: "%s · Philip Warkentien II",
    },
    description: copy[locale].description,
  };
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body>
        <SiteShell locale={locale}>{children}</SiteShell>
      </body>
    </html>
  );
}
