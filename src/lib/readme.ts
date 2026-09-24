import { marked } from 'marked';
import type { Project } from '../data/projects';

/**
 * README loading strategy (build time):
 *  1. Fetch the live README from GitHub (so the portfolio stays in sync with each repo).
 *  2. If that fails (private repo, no network, not pushed yet), use the local snapshot in src/readmes/<slug>.md.
 */
const snapshots = import.meta.glob('../readmes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export type ReadmeSource = 'github' | 'snapshot' | 'none';

export interface Readme {
  html: string;
  source: ReadmeSource;
}

async function fetchFromGitHub(p: Project): Promise<string | null> {
  if (!p.repo) return null;
  const url = `https://raw.githubusercontent.com/${p.repo}/${p.branch}/${p.readmePath ?? 'README.md'}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

const isAbsolute = (u: string) => /^(?:[a-z]+:|#|\/\/)/i.test(u);

/** Relative images -> raw.githubusercontent, relative links -> github.com blob view */
export function rewriteRelativeUrls(html: string, p: Project): string {
  if (!p.repo) return html;
  const raw = `https://raw.githubusercontent.com/${p.repo}/${p.branch}/`;
  const blob = `https://github.com/${p.repo}/blob/${p.branch}/`;
  const clean = (u: string) => u.replace(/^\.\//, '').replace(/^\//, '');
  return html
    .replace(/(<img[^>]*\ssrc=")([^"]+)"/g, (m, pre, u) => (isAbsolute(u) ? m : `${pre}${raw}${clean(u)}"`))
    .replace(/(<a[^>]*\shref=")([^"]+)"/g, (m, pre, u) => (isAbsolute(u) ? m : `${pre}${blob}${clean(u)}"`));
}

/** Drop the leading H1 — the page already shows the project name */
export const stripLeadingH1 = (md: string) => md.replace(/^\s*#\s+[^\n]*\n/, '');

export async function loadReadme(p: Project): Promise<Readme> {
  let md = await fetchFromGitHub(p);
  let source: ReadmeSource = 'github';
  if (!md) {
    md = snapshots[`../readmes/${p.slug}.md`] ?? null;
    source = md ? 'snapshot' : 'none';
  }
  if (!md) return { html: '', source };
  const html = await marked.parse(stripLeadingH1(md), { gfm: true });
  return { html: rewriteRelativeUrls(html, p), source };
}
