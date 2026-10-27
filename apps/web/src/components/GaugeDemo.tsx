"use client";
import { useId, useState } from "react";
import { ui } from "../content/interface";
import type { Locale } from "../content/site";

export function GaugeDemo({ locale }: { locale: Locale }) {
  const [value, setValue] = useState(64);
  const id = useId();
  const t = ui[locale];
  const samples = [28, 42, 34, 58, 46, value];
  return (
    <section className="gauge-demo" aria-labelledby={`${id}-title`}>
      <div className="section-caption">
        <h3 id={`${id}-title`}>{t.gauge}</h3>
        <span>{t.sample}</span>
      </div>
      <div className="gauge-display">
        <svg
          className="gauge"
          viewBox="0 0 200 200"
          role="img"
          aria-labelledby={`${id}-gauge`}
        >
          <title id={`${id}-gauge`}>{`${t.value}: ${value}%`}</title>
          <circle cx="100" cy="100" r="76" className="gauge-track" />
          <circle
            cx="100"
            cy="100"
            r="76"
            className="gauge-value"
            pathLength="100"
            strokeDasharray={`${value} 100`}
          />
          <text x="100" y="106" textAnchor="middle">{`${value}%`}</text>
          <text x="100" y="129" className="gauge-label" textAnchor="middle">
            SVG
          </text>
        </svg>
        <svg
          viewBox="0 0 360 200"
          className="sample-chart"
          role="img"
          aria-labelledby={`${id}-chart`}
        >
          <title
            id={`${id}-chart`}
          >{`${t.sample}: ${samples.join(", ")}`}</title>
          {[40, 80, 120, 160].map((y) => (
            <path key={y} d={`M0 ${y} H360`} className="chart-grid" />
          ))}
          <polyline
            points={samples
              .map((v, i) => `${i * 68 + 10},${180 - v * 1.5}`)
              .join(" ")}
          />
          {samples.map((v, i) => (
            <circle key={i} cx={i * 68 + 10} cy={180 - v * 1.5} r="4" />
          ))}
        </svg>
      </div>
      <label className="range-control" htmlFor={`${id}-range`}>
        {t.value} <output>{value}%</output>
        <input
          id={`${id}-range`}
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </label>
      <details className="data-table">
        <summary>{t.sample}</summary>
        <table>
          <caption>{t.sample}</caption>
          <thead>
            <tr>
              <th scope="col">{t.period}</th>
              <th scope="col">{t.reading}</th>
            </tr>
          </thead>
          <tbody>
            {samples.map((v, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{v}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p className="technical">{t.noData}</p>
    </section>
  );
}
