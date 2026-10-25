import { parseArgs } from 'node:util';
import { createRequire } from 'node:module';
import { spawnSync, execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { browserAddress, browserProjects } from './browser-settings.mjs';

export function evidenceOptions(args) {
  const mode = args[0];
  const { values } = parseArgs({ args: args.slice(1), options: {
    name: { type: 'string' }, phase: { type: 'string' }, route: { type: 'string' },
    project: { type: 'string', default: 'all' }, grep: { type: 'string' }, note: { type: 'string', default: '' },
  } });
  if (!['ui', 'ux'].includes(mode)) throw new Error('Choose ui or ux');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.name ?? '')) throw new Error('--name must be a descriptive lowercase slug');
  if (!['all', ...browserProjects.map((p) => p.name)].includes(values.project)) throw new Error('--project must be all, desktop, or mobile');
  if (mode === 'ui' && !['before', 'after'].includes(values.phase)) throw new Error('UI capture requires --phase before or after');
  if (mode === 'ux' && (values.phase || values.route)) throw new Error('UX evidence runs a story test: use --grep, not --phase or --route');
  if (mode === 'ui' && values.grep) throw new Error('Use --route for UI capture; --grep is for UX stories');
  const route = values.route ?? '/2026/en/';
  if (!route.startsWith('/') || new URL(route, 'http://127.0.0.1').origin !== 'http://127.0.0.1') throw new Error('--route must stay on the local preview server');
  return { mode, ...values, route, grep: values.grep ?? '@journey' };
}

export function reportTests(report) {
  const tests = [];
  function visit(suites) {
    for (const suite of suites ?? []) {
      for (const spec of suite.specs ?? []) {
        for (const test of spec.tests) {
          const result = test.results.at(-1);
          tests.push({ title: spec.title, project: test.projectName, status: result?.status ?? 'missing', attachments: result?.attachments ?? [] });
        }
      }
      visit(suite.suites);
    }
  }
  visit(report.suites);
  return tests;
}

export function validateCapture(before, after) {
  if (before.status !== 'passed') throw new Error('The before capture failed; create a fresh evidence name and capture a passing baseline');
  if (before.route !== after.route || JSON.stringify(before.projects) !== JSON.stringify(after.projects)) {
    throw new Error('Before/after must use the same route, projects, and viewports');
  }
}

export function evidencePassed(tests, exitCode, mode) {
  return exitCode === 0 && tests.length > 0 && tests.every((test) => test.status === 'passed' && test.attachments.some((a) =>
    mode === 'ui' ? a.name === 'ui-state' && a.contentType === 'image/png' : a.contentType === 'video/webm'));
}

const escape = (text) => String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const link = (file) => file.split(path.sep).map(encodeURIComponent).join('/');
async function readOptional(file) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

export function evidenceReport(records) {
  let html = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PR evidence</title><style>body{font:16px system-ui;margin:2rem;line-height:1.5}img,video{max-width:100%;height:auto}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}pre{white-space:pre-wrap}a{color:#174b96}</style><h1>PR evidence</h1>';
  let markdown = '# PR evidence\n\n';
  const before = records.find((r) => r.phase === 'before');
  const after = records.find((r) => r.phase === 'after');
  if (before && after) {
    validateCapture(before, after);
    html += `<h2>Before / after: ${escape(before.route)}</h2><p>Same route and viewports; human visual comparison, not an automated pixel-diff assertion.</p>`;
    markdown += `## Before / after: ${before.route}\n\nHuman comparison; no automatic pixel-diff threshold.\n\n`;
    for (const project of before.projects) {
      html += `<h3>${escape(project.name)} (${project.viewport.width} × ${project.viewport.height})</h3><div class="pair">`;
      for (const record of [before, after]) {
        const image = record.tests.find((t) => t.project === project.name)?.attachments.find((a) => a.name === 'ui-state');
        html += `<section><h4>${record.phase}</h4>${image?.path ? `<img src="${link(image.path)}" alt="${record.phase} ${escape(project.name)}">` : '<p>Capture missing or failed.</p>'}</section>`;
        if (image?.path) markdown += `![${record.phase} ${project.name}](${link(image.path)})\n\n`;
      }
      html += '</div>';
    }
  }
  for (const record of records) {
    html += `<h2>${escape(record.phase)} — ${record.status}</h2><p>Commit ${escape(record.commit)}; uncommitted changes: ${record.dirty}. ${escape(record.note)}</p><p>${escape(record.createdAt)} · <a href="${record.phase}/playwright-report/index.html">Playwright report</a></p>`;
    markdown += `## ${record.phase} — ${record.status}\n\nCommit: ${record.commit}; uncommitted changes: ${record.dirty}. ${record.note}\n\n[Playwright report](${record.phase}/playwright-report/index.html)\n\n`;
    for (const test of record.tests) {
      html += `<h3>${escape(test.project)} · ${escape(test.title)} — ${escape(test.status)}</h3>`;
      markdown += `- ${test.project}: ${test.title} — ${test.status}\n`;
      for (const asset of test.attachments.filter((a) => a.path)) {
        const href = link(asset.path);
        html += `<p><a href="${href}">${escape(asset.name)}</a></p>`;
        if (asset.contentType === 'video/webm') html += `<video controls preload="metadata" src="${href}"></video>`;
        markdown += `  - [${asset.name}](${href})\n`;
      }
    }
    if (record.error) html += `<pre>${escape(record.error)}</pre>`;
  }
  return { html: html + '</html>', markdown };
}

export async function runEvidence(args) {
  const options = evidenceOptions(args);
  const root = path.resolve('artifacts/evidence', options.name);
  const phase = options.mode === 'ui' ? options.phase : 'ux';
  const output = path.join(root, phase);
  try { await access(output); throw new Error(`Evidence already exists at ${output}; use a new --name to keep prior evidence intact`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const projects = browserProjects.filter((p) => options.project === 'all' || p.name === options.project).map((p) => ({ name: p.name, viewport: p.use.viewport }));
  if (phase === 'after') {
    const before = await readOptional(path.join(root, 'before/manifest.json'));
    if (!before) throw new Error('Capture --phase before first; use the base revision/worktree if implementation is already underway');
    validateCapture(before, { route: options.route, projects });
  }
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const dirty = Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim());
  browserAddress(); // Validate the port before creating output or starting a browser.
  await mkdir(output, { recursive: true });
  const require = createRequire(import.meta.url);
  const command = [require.resolve('@playwright/test/cli'), 'test'];
  if (options.project !== 'all') command.push('--project', options.project);
  if (options.mode === 'ux') command.push('--grep', options.grep);
  const child = spawnSync(process.execPath, command, { stdio: 'inherit', env: {
    ...process.env, PORTFOLIO_EVIDENCE_MODE: options.mode, PORTFOLIO_EVIDENCE_DIR: output, PORTFOLIO_EVIDENCE_ROUTE: options.route,
  } });
  const result = await readOptional(path.join(output, 'results.json'));
  const tests = reportTests(result ?? {});
  for (const test of tests) {
    test.attachments = test.attachments.filter((a) => a.path).map((a) => ({ ...a, path: path.relative(root, a.path) }));
  }
  const passed = evidencePassed(tests, child.status, options.mode);
  const record = { ...options, phase, projects, commit, dirty, createdAt: new Date().toISOString(), status: passed ? 'passed' : 'failed', tests, error: child.error?.message ?? result?.errors?.map((e) => e.message).join('\n') };
  await writeFile(path.join(output, 'manifest.json'), JSON.stringify(record, null, 2) + '\n');
  const records = (await Promise.all(['before', 'after', 'ux'].map((p) => readOptional(path.join(root, p, 'manifest.json'))))).filter(Boolean);
  const report = evidenceReport(records);
  await writeFile(path.join(root, 'index.html'), report.html);
  await writeFile(path.join(root, 'report.md'), report.markdown);
  console.log(`Evidence ${record.status}: ${path.join(root, 'index.html')}`);
  if (!passed) throw new Error('Evidence run failed or produced no required media; inspect the report and fix the failure');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runEvidence(process.argv.slice(2)).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
