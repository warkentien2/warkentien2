import { notFound } from "next/navigation";
import { copy, isLocale } from "../../../content/site";
import { ui } from "../../../content/interface";
import { career } from "../../../content/career";
import { tiles, tileCopy } from "../../../content/portfolio";
import { CreativeLinks } from "../../../components/CaseStudy";
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
    "about/",
    copy[locale].about,
    ui[locale].aboutIntro,
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
  const labels = ui[locale];
  return (
    <>
      <div className="page-heading">
        <p className="technical">Philip Warkentien II / {labels.location}</p>
        <h1>{t.about}</h1>
        <p className="case-summary">{labels.aboutIntro}</p>
      </div>
      <section className="career-section section-block">
        <div className="section-heading">
          <h2>{labels.career}</h2>
          <p>{labels.careerIntro}</p>
        </div>
        <ol className="career-list">
          {career[locale].map((item, index) => (
            <li key={item.company}>
              <span className="technical">0{index + 1}</span>
              <h3>{item.company}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="practice-notes section-block"
        aria-label={labels.principles}
      >
        {tiles
          .filter((tile) => !tile.caseStudy)
          .map((tile) => (
            <section className="case-section" id={tile.id} key={tile.id}>
              <h2>{tileCopy[locale][tile.id].title}</h2>
              <p>{tileCopy[locale][tile.id].detail}</p>
            </section>
          ))}
        <CreativeLinks locale={locale} />
      </section>
    </>
  );
}
