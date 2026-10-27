import { ui } from "../content/interface";
import type { Locale } from "../content/site";
import { imageAssets, type ImageId } from "../content/assets";
export function Artwork({
  name,
  locale,
  priority = false,
  caption = true,
}: {
  name: ImageId;
  locale: Locale;
  priority?: boolean;
  caption?: boolean;
}) {
  const asset = imageAssets[name];
  const original = name === "tarantula";
  return (
    <figure className="artwork">
      <img
        src={`/2026/images/${asset.src}-512.webp`}
        srcSet={`/2026/images/${asset.src}-256.webp 256w, /2026/images/${asset.src}-512.webp 512w`}
        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
        width={asset.width}
        height={asset.height}
        alt={original ? ui[locale].tarantula : ""}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {caption && (
        <figcaption>
          {original ? ui[locale].tarantula : ui[locale].conceptual}
        </figcaption>
      )}
    </figure>
  );
}
export function RaceArtwork({ locale }: { locale: Locale }) {
  return (
    <div
      className="race-art"
      role="img"
      aria-label={
        locale === "en"
          ? "Original CSS illustration of a car on a cobalt racetrack"
          : "Ilustração original em CSS de um carro em uma pista cobalto"
      }
    >
      <div className="race-sun" />
      <div className="race-road">
        <i />
        <i />
        <i />
      </div>
      <div className="race-car">
        <span />
        <span />
      </div>
      <span className="race-caption">HTML + CSS</span>
    </div>
  );
}
