import Link from "next/link";
import { copy, type Locale } from "../content/site";
import { ui } from "../content/interface";
import { PaletteSelect, PreferencesProvider } from "./Preferences";

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = copy[locale];
  const labels = ui[locale];
  return (
    <PreferencesProvider>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <Link className="brand" href={`/${locale}/`}>
          <span className="brand-monogram" aria-hidden="true">
            PW
          </span>
          <span>
            Philip Warkentien II<small>{labels.role}</small>
          </span>
        </Link>
        <nav aria-label={t.home}>
          <Link href={`/${locale}/work/`}>{t.work}</Link>
          <Link href={`/${locale}/workbench/`}>{labels.workbench}</Link>
          <Link href={`/${locale}/about/`}>{t.about}</Link>
          <Link href={`/${locale}/journal/`}>{t.journal}</Link>
          <a href="#contact">{labels.contact}</a>
        </nav>
        <div className="header-tools">
          <nav aria-label={t.language}>
            <Link href="/en/" lang="en" hrefLang="en">
              English
            </Link>
            <Link href="/pt-BR/" lang="pt-BR" hrefLang="pt-BR">
              Português
            </Link>
          </nav>
          <PaletteSelect locale={locale} />
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <p className="technical">{labels.contact}</p>
        <div className="contact-grid">
          <h2 id="contact-heading">{labels.contactTitle}</h2>
          <div>
            <p>{labels.contactText}</p>
            <a className="contact-email" href="mailto:philip@warkentien2.com">
              philip@warkentien2.com ↗
            </a>
            <div className="contact-socials">
              <a href="https://github.com/warkentien2">GitHub ↗</a>
              <a href="https://dev.to/warkentien2/series/26904">Dev.to ↗</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="archive-links">
          <a href="/">{t.archive}</a>
          <a href="/projects/">{t.projects}</a>
        </div>
        <span>{labels.location}</span>
        <span>© 2026 Philip Warkentien II</span>
      </footer>
    </PreferencesProvider>
  );
}
