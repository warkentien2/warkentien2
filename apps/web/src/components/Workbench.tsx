"use client";
import { useId, useState, type CSSProperties } from "react";
import type { Locale } from "../content/site";
import { ui } from "../content/interface";
import { PaletteSelect, usePreferences } from "./Preferences";

const densitySpace = {
  compact: "0.75rem",
  comfortable: "1.25rem",
  spacious: "2rem",
} as const;
export function Workbench({ locale, sectionId = "workbench" }: { locale: Locale; sectionId?: string }) {
  const t = ui[locale];
  const id = useId();
  const { palette } = usePreferences();
  const [density, setDensity] =
    useState<keyof typeof densitySpace>("comfortable");
  const [treatment, setTreatment] = useState<"solid" | "outline">("solid");
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <section
      className="workbench section-block"
      id={sectionId}
      aria-labelledby={`${id}-heading`}
    >
      <div className="section-heading">
        <div>
          <p className="technical">{t.originalDemo}</p>
          <h2 id={`${id}-heading`}>{t.workbench}</h2>
        </div>
        <p>{t.workbenchIntro}</p>
      </div>
      <div className="workbench-grid">
        <div className="workbench-controls">
          <PaletteSelect locale={locale} />
          <fieldset>
            <legend>{t.density}</legend>
            <div className="segmented">
              {(Object.keys(densitySpace) as (keyof typeof densitySpace)[]).map(
                (key) => (
                  <label key={key}>
                    <input
                      type="radio"
                      name={`${id}-density`}
                      checked={density === key}
                      onChange={() => setDensity(key)}
                    />
                    <span>{t[key]}</span>
                  </label>
                ),
              )}
            </div>
          </fieldset>
          <fieldset>
            <legend>{t.treatment}</legend>
            <div className="segmented">
              {(["solid", "outline"] as const).map((key) => (
                <label key={key}>
                  <input
                    type="radio"
                    name={`${id}-treatment`}
                    checked={treatment === key}
                    onChange={() => setTreatment(key)}
                  />
                  <span>{t[key]}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="check-control">
            <input
              type="checkbox"
              checked={focus}
              onChange={(event) => setFocus(event.target.checked)}
            />
            {t.focus}
          </label>
        </div>
        <div
          className="workbench-output"
          style={{ "--demo-space": densitySpace[density] } as CSSProperties}
        >
          <p className="technical">
            {t.preview} / {palette}
          </p>
          <div className={`demo-component ${focus ? "show-focus" : ""}`}>
            <span className="demo-mark" aria-hidden="true">
              ↗
            </span>
            <div>
              <h3>{t.previewTitle}</h3>
              <p>{t.previewText}</p>
            </div>
            <span className="status-label" role="status">
              {active ? t.active : t.inactive}
            </span>
            <button
              className={`action-button ${treatment}`}
              aria-pressed={active}
              onClick={() => setActive(!active)}
            >
              {t.action} <span aria-hidden="true">↗</span>
            </button>
          </div>
          <pre aria-label={t.tokens}>
            <code>{`/* ${t.tokens} */\n[data-palette="${palette}"] {\n  --demo-space: ${densitySpace[density]};\n}\n.action-button {\n  background: ${treatment === "solid" ? "var(--cobalt)" : "transparent"};\n}\n/* ${t.focus}: ${focus ? "on" : "off"} */`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
