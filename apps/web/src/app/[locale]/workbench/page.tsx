import { notFound } from "next/navigation";
import { isLocale } from "../../../content/site";
import { ui } from "../../../content/interface";
import { Workbench } from "../../../components/Workbench";
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
    "workbench/",
    ui[locale].workbench,
    ui[locale].workbenchIntro,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <div className="page-heading">
        <p className="technical">React / CSS / TypeScript</p>
        <h1>{ui[locale].workbench}</h1>
      </div>
      <Workbench locale={locale} />
    </>
  );
}
