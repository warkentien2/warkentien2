"use client";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import {
  tiles,
  tileCopy,
  type TileDefinition,
  type Category,
} from "../content/portfolio";
import type { Locale } from "../content/site";
import { ui } from "../content/interface";
import { Artwork, RaceArtwork } from "./Artwork";
import { CaseStudy, CreativeLinks } from "./CaseStudy";

function destination(tile: TileDefinition, locale: Locale) {
  return tile.caseStudy
    ? `/${locale}/work/${tile.caseStudy}/`
    : `/${locale}/about/#${tile.id}`;
}
function tileStyle(tile: TileDefinition): CSSProperties {
  return {
    "--tile-bg": tile.colors?.background,
    "--tile-fg": tile.colors?.foreground,
    "--tile-accent": tile.colors?.accent,
  } as CSSProperties;
}
export function Gallery({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<TileDefinition | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  const visible = tiles
    .filter((tile) => tile.visible)
    .toSorted((a, b) => a.order - b.order);
  const displayed = visible.filter(
    (tile) => filter === "all" || tile.category === filter,
  );
  useEffect(() => {
    if (!selected || !dialog.current) return;
    const element = dialog.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = previous;
      trigger.current?.focus();
    };
  }, [selected]);
  function expand(event: MouseEvent<HTMLAnchorElement>, tile: TileDefinition) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    trigger.current = event.currentTarget;
    setSelected(tile);
  }
  return (
    <section className="gallery" id="selected-work" aria-label={t.selected}>
      <div className="gallery-toolbar">
        <div className="filter-group" role="group" aria-label={t.selected}>
          {(["all", "case-study", "visual", "architecture"] as const).map(
            (category) => (
              <button
                key={category}
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {t[category]}{" "}
                <span>
                  (
                  {
                    visible.filter(
                      (tile) =>
                        category === "all" || tile.category === category,
                    ).length
                  }
                  )
                </span>
              </button>
            ),
          )}
        </div>
        <p className="technical" role="status">
          {displayed.length} / {visible.length} · {t.explore}
        </p>
      </div>
      <div className="tile-grid">
        {displayed.map((tile) => {
          const content = tileCopy[locale][tile.id];
          return (
            <article
              className={`tile tile--${tile.variant}`}
              data-tone={tile.tone}
              data-tile={tile.id}
              style={tileStyle(tile)}
              key={tile.id}
            >
              <div className="tile-meta">
                <span>
                  {String(tile.order).padStart(2, "0")} / {t[tile.category]}
                </span>
                <span>{content.label}</span>
              </div>
              {tile.image && (
                <Artwork name={tile.image} locale={locale} caption={false} />
              )}
              {tile.variant === "interactive" && (
                <RaceArtwork locale={locale} />
              )}
              <div className="tile-copy">
                <h2>
                  <Link
                    className="tile-link"
                    href={destination(tile, locale)}
                    onClick={(event) => expand(event, tile)}
                  >
                    {content.title}
                  </Link>
                </h2>
                <p>{content.description}</p>
              </div>
              <div className="tile-footer">
                <span>
                  {tile.image
                    ? locale === "en"
                      ? "Conceptual artwork"
                      : "Arte conceitual"
                    : content.label}
                </span>
                <span aria-hidden="true">↗</span>
              </div>
            </article>
          );
        })}
      </div>
      <dialog
        className="card-dialog"
        ref={dialog}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        aria-labelledby="expanded-card-title"
      >
        {selected && (
          <>
            <div className="dialog-toolbar">
              <span id="expanded-card-title" className="technical">
                Philip Warkentien II / {tileCopy[locale][selected.id].title}
              </span>
              <button
                autoFocus
                onClick={() => dialog.current?.close()}
                aria-label={t.close}
              >
                {t.close} <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="dialog-content">
              {selected.caseStudy ? (
                <>
                  <CaseStudy
                    slug={selected.caseStudy}
                    locale={locale}
                    expanded
                  />
                  <Link
                    className="action-button"
                    href={destination(selected, locale)}
                  >
                    {t.fullCase} ↗
                  </Link>
                </>
              ) : (
                <article className="insight">
                  <p className="technical">
                    {tileCopy[locale][selected.id].label}
                  </p>
                  <h2>{tileCopy[locale][selected.id].title}</h2>
                  <p>{tileCopy[locale][selected.id].detail}</p>
                  {selected.image && (
                    <Artwork name={selected.image} locale={locale} />
                  )}
                  {selected.id === "exploration" && (
                    <CreativeLinks locale={locale} />
                  )}
                  <Link
                    className="text-link"
                    href={`/${locale}/about/#${selected.id}`}
                  >
                    {t.career} ↗
                  </Link>
                </article>
              )}
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
