import Link from "next/link";
import type { Locale } from "../content/site";
import { cases } from "../content/cases";
import { experimentLinks, type CaseSlug } from "../content/portfolio";
import { ui } from "../content/interface";
import { Artwork, RaceArtwork } from "./Artwork";
import { GaugeDemo } from "./GaugeDemo";
import { Workbench } from "./Workbench";

export function CreativeLinks({ locale }: { locale: Locale }) {
  return (
    <div className="experiment-links">
      <a href={experimentLinks.racer}>Desert Racer ↗</a>
      <a href={experimentLinks.geckos}>Curious Geckos ↗</a>
      <a href="/">{ui[locale].tarantula} ↗</a>
      <a href="/projects/">{ui[locale].archive} ↗</a>
      <a href={experimentLinks.articles}>{ui[locale].readArticles} ↗</a>
    </div>
  );
}
export function CaseStudy({
  slug,
  locale,
  expanded = false,
}: {
  slug: CaseSlug;
  locale: Locale;
  expanded?: boolean;
}) {
  const content = cases[locale][slug];
  const Heading = expanded ? "h2" : "h1";
  return (
    <article className="case-study">
      <div className="case-intro">
        <p className="technical">{content.organization}</p>
        <Heading>{content.title}</Heading>
        <p className="case-summary">{content.summary}</p>
      </div>
      <dl className="case-metrics">
        {content.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      {content.image ? (
        <Artwork name={content.image} locale={locale} priority />
      ) : (
        <RaceArtwork locale={locale} />
      )}
      {content.sections.map((section, index) => (
        <section className="case-section" key={section.title}>
          <div>
            <span className="technical">0{index + 1} /</span>
            <h3>{section.title}</h3>
          </div>
          <p>{section.text}</p>
        </section>
      ))}
      {slug === "data-visualization" && <GaugeDemo locale={locale} />}
      {slug === "design-systems" && <Workbench locale={locale} sectionId="case-workbench" />}
      {slug === "creative-engineering" && (
        <>
          <h3>{ui[locale].creativeLinks}</h3>
          <CreativeLinks locale={locale} />
        </>
      )}
      {!expanded && (
        <nav className="case-navigation" aria-label={ui[locale].cases}>
          <Link href={`/${locale}/work/`}>← {ui[locale].back}</Link>
          <Link
            href={`/${locale}/work/${slug === "creative-engineering" ? "design-systems" : slug === "design-systems" ? "frontend-performance" : slug === "frontend-performance" ? "data-visualization" : "creative-engineering"}/`}
          >
            {ui[locale].cases} →
          </Link>
        </nav>
      )}
    </article>
  );
}
