import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { browserAddress } from '../scripts/browser-settings.mjs';
import { evidenceOptions, reportTests, evidencePassed, validateCapture, evidenceReport, runEvidence, persistAttachments } from '../scripts/evidence.mjs';

test('preview and browser tests can share an isolated worktree port', () => {
  assert.equal(browserAddress({}).baseURL, 'http://127.0.0.1:4173');
  assert.equal(browserAddress({ PORTFOLIO_PORT: '4175' }).baseURL, 'http://127.0.0.1:4175');
  for (const port of ['0', '1023', '65536', 'abc', '4173;echo bad', '']) {
    assert.throws(() => browserAddress({ PORTFOLIO_PORT: port }), /PORTFOLIO_PORT/);
  }
});

test('evidence labels cannot escape the generated artifact directory', () => {
  for (const name of ['../docs', '/tmp/example', '.', 'with spaces']) {
    assert.throws(() => evidenceOptions(['ui', '--name', name, '--phase', 'before']), /slug/);
  }
});

test('screenshots stay on the local server and recordings select real tests', () => {
  for (const route of ['https://example.com', '//example.com', '/\\example.com']) {
    assert.throws(() => evidenceOptions(['ui', '--name', 'hero', '--phase', 'before', '--route', route]), /local/);
  }
  assert.equal(evidenceOptions(['ux', '--name', 'keyboard']).grep, '@journey');
  assert.throws(() => evidenceOptions(['ui', '--name', 'hero']), /phase/);
  assert.throws(() => evidenceOptions(['ux', '--name', 'hero', '--route', '/']), /story/);
  assert.throws(() => evidenceOptions(['ux', '--name', 'hero', '--project', 'tablet']), /project/);
});

const projects = [{ name: 'desktop', viewport: { width: 1440, height: 900 } }];
const before = { phase: 'before', status: 'passed', route: '/2026/en/', projects };
test('comparison refuses different routes, viewports, or a failed baseline', () => {
  validateCapture(before, { ...before, phase: 'after' });
  assert.throws(() => validateCapture(before, { ...before, route: '/2026/pt-BR/' }), /same route/);
  assert.throws(() => validateCapture(before, { ...before, projects: [{ name: 'mobile', viewport: { width: 375, height: 812 } }] }), /viewports/);
  assert.throws(() => validateCapture({ ...before, status: 'failed' }, before), /before capture failed/);
});

test('after cannot manufacture a before capture from the changed app', async () => {
  await assert.rejects(runEvidence(['ui', '--name', `missing-${Date.now()}`, '--phase', 'after']), /Capture --phase before first/);
});

test('empty, skipped, failed, or media-less runs cannot claim passing evidence', () => {
  const png = { name: 'ui-state', contentType: 'image/png', path: 'state.png' };
  const video = { name: 'video', contentType: 'video/webm', path: 'story.webm' };
  assert.equal(evidencePassed([], 0, 'ui'), false);
  for (const status of ['failed', 'skipped', 'timedOut']) assert.equal(evidencePassed([{ status, attachments: [png] }], 0, 'ui'), false);
  assert.equal(evidencePassed([{ status: 'passed', attachments: [] }], 0, 'ux'), false);
  assert.equal(evidencePassed([{ status: 'passed', attachments: [png] }], 1, 'ui'), false);
  assert.equal(evidencePassed([{ status: 'passed', attachments: [png] }], 0, 'ui'), true);
  assert.equal(evidencePassed([{ status: 'passed', attachments: [video] }], 0, 'ux'), true);
});

test('nested Playwright suites retain final retry outcomes and attachment paths', () => {
  const report = { suites: [{ suites: [{ specs: [{ title: 'navigate', tests: [{ projectName: 'mobile', results: [
    { status: 'failed' }, { status: 'passed', attachments: [{ name: 'video', contentType: 'video/webm', path: '/tmp/story.webm' }] },
  ] }] }] }] }] };
  const tests = reportTests(report);
  assert.equal(tests.length, 1);
  assert.equal(tests[0].status, 'passed');
  assert.equal(tests[0].project, 'mobile');
  assert.equal(tests[0].attachments[0].path, '/tmp/story.webm');
});

test('inline Playwright screenshot bodies become reviewable files without losing video links', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'portfolio-attachments-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const image = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const tests = [{ attachments: [
    { name: 'Locale switched', contentType: 'image/png', body: image.toString('base64') },
    { name: 'video', contentType: 'video/webm', path: path.join(root, 'ux/story.webm') },
  ] }];
  await persistAttachments(tests, root, path.join(root, 'ux'));
  assert.equal(tests[0].attachments.length, 2);
  assert.deepEqual(await readFile(path.join(root, tests[0].attachments[0].path)), image);
  assert.equal(tests[0].attachments[1].path, path.join('ux', 'story.webm'));
  assert.equal(tests[0].attachments[0].body, undefined);
});

test('review report links both screenshot states and a playable story with provenance', () => {
  const capture = (phase) => ({ ...before, phase, commit: 'abc123', dirty: false, createdAt: '2026-10-24', note: '<script>bad()</script>', tests: [{
    title: 'capture', project: 'desktop', status: 'passed', attachments: [{ name: 'ui-state', contentType: 'image/png', path: `${phase}/state.png` }],
  }] });
  const ux = { ...capture('ux'), tests: [{ title: 'navigate', project: 'desktop', status: 'passed', attachments: [{ name: 'video', contentType: 'video/webm', path: 'ux/story.webm' }] }] };
  const { html, markdown } = evidenceReport([capture('before'), capture('after'), ux]);
  for (const file of ['before/state.png', 'after/state.png', 'ux/story.webm']) assert.ok(html.includes(file));
  assert.match(html, /<video controls/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /abc123/);
  assert.match(markdown, /before\/state.png/);
});
