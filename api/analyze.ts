import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from 'octokit';

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const token = process.env.GITHUB_TOKEN;
    if (!token) return res.status(500).json({ error: 'GITHUB_TOKEN is not configured' });

    const { target } = (req.body ?? {}) as { target?: string };
    if (!target || typeof target !== 'string' || !target.includes('/')) {
      return res.status(400).json({ error: "Provide 'target' as 'owner/repo' (e.g., vercel/next.js)" });
    }

    const [owner, repo] = target.split('/').map(s => s.trim());
    const octokit = new Octokit({ auth: token });

    // Fetch core repo facts in parallel
    const [repoInfo, issues, languages, contributors] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      octokit.rest.issues.listForRepo({ owner, repo, state: 'open', per_page: 100 }),
      octokit.rest.repos.listLanguages({ owner, repo }),
      octokit.rest.repos.listContributors({ owner, repo, per_page: 100 }),
    ]);

    const r = repoInfo.data;
    const stars = r.stargazers_count ?? 0;
    const forks = r.forks_count ?? 0;
    const openIssues = (issues.data ?? []).length ?? 0;
    const langs = Object.keys(languages.data ?? {});
    const topLanguage = langs[0] ?? r.language ?? 'Unknown';
    const lastUpdated = r.updated_at;

    // Deterministic scores from real signals (no randomness)
    const securityScore = clamp(30 + Math.max(0, 20 - openIssues) + Math.min(stars, 200) * 0.15, 0, 100);
    const codeQuality   = clamp(40 + Math.min(contributors.data?.length ?? 0, 30) + Math.min(forks, 200) * 0.15, 0, 100);
    const documentation = clamp(30 + (r.has_wiki ? 10 : 0) + (r.description ? 10 : 0) + (r.has_pages ? 10 : 0), 0, 100);

    const improvements: string[] = [];
    if (!r.has_wiki) improvements.push('Add/expand Wiki');
    if (!r.has_downloads) improvements.push('Enable Releases/Downloads');
    if (openIssues > 25) improvements.push('Triage and label open issues');
    if ((contributors.data?.length ?? 0) < 3) improvements.push('Add CONTRIBUTING.md');
    if (!r.license?.spdx_id) improvements.push('Add a LICENSE file');

    return res.status(200).json({
      name: r.full_name,
      description: r.description ?? '',
      language: topLanguage,
      stars,
      forks,
      openIssues,
      lastUpdated,
      scores: {
        securityScore: Math.round(securityScore),
        codeQuality: Math.round(codeQuality),
        documentation: Math.round(documentation),
      },
      improvements,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
```0
