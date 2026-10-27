import { notFound } from "next/navigation";
import { copy, isLocale } from "../../content/site";
import { ui } from "../../content/interface";
import { Gallery } from "../../components/Gallery";
import { Workbench } from "../../components/Workbench";
import Link from "next/link";
import { localizedMetadata } from "../../content/metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(
    locale,
    "",
    "Philip Warkentien II · Staff UI Engineer",
    copy[locale].description,
  );
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  const labels = ui[locale];
  return (
    <>
      <section className="hero">
        <div className="hero-meta technical">
          <span>{labels.role}</span>
          <span>{labels.location}</span>
        </div>
        <h1>
          <span className="sr-only">
            {locale === "en"
              ? "UI engineering. "
              : "Engenharia de interfaces. "}
          </span>
          {labels.hero}
          <em>{labels.heroAccent}</em>
          {labels.heroEnd}
        </h1>
        <div className="hero-bottom">
          <p>{labels.introduction}</p>
          <span className="technical">{labels.exhibit} / 01—12</span>
        </div>
      </section>
      <Gallery locale={locale} />
      <Workbench locale={locale} />
      <section className="practice-section section-block">
        <div>
          <p className="technical">{labels.career}</p>
          <h2>{labels.principles}</h2>
          <Link className="text-link" href={`/${locale}/about/`}>
            {t.about} ↗
          </Link>
        </div>
        <div className="principle-list">
          {[
            labels.principleOne,
            labels.principleTwo,
            labels.principleThree,
          ].map((text, index) => (
            <p key={text}>
              <span className="technical">0{index + 1} /</span> {text}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
