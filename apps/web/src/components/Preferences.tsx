"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { isPalette, palettes, type Palette } from "../content/portfolio";
import { ui } from "../content/interface";
import type { Locale } from "../content/site";

const Preferences = createContext<{
  palette: Palette;
  setPalette: (palette: Palette) => void;
}>({ palette: "swiss", setPalette: () => {} });
export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [palette, updatePalette] = useState<Palette>("swiss");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-palette");
      if (saved && isPalette(saved)) updatePalette(saved);
    } catch {
      /* Private browsing still gets the default. */
    }
  }, []);
  function setPalette(next: Palette) {
    updatePalette(next);
    try {
      localStorage.setItem("portfolio-palette", next);
    } catch {
      /* Persistence is optional. */
    }
  }
  return (
    <Preferences.Provider value={{ palette, setPalette }}>
      <div className="portfolio-app" data-palette={palette}>
        {children}
      </div>
    </Preferences.Provider>
  );
}
export function usePreferences() {
  return useContext(Preferences);
}
export function PaletteSelect({ locale }: { locale: Locale }) {
  const { palette, setPalette } = usePreferences();
  return (
    <label className="palette-select">
      <span>{ui[locale].palette}</span>
      <select
        aria-label={ui[locale].palette}
        value={palette}
        onChange={(event) => {
          if (isPalette(event.target.value)) setPalette(event.target.value);
        }}
      >
        {palettes.map((id) => (
          <option key={id} value={id}>
            {ui[locale][id]}
          </option>
        ))}
      </select>
    </label>
  );
}
