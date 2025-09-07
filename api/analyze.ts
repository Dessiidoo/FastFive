// api/analyze.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    const { target } = req.body as { target?: string };
    if (!target) return res.status(400).json({ error: 'Missing "target" (owner/repo or full URL)' });

    const ghToken = process.env.GITHUB_TOKEN;
    const octokit = new Octokit(ghToken ? { auth: ghToken } : {});

    const repoPath = extractRepo(target);
    if (!repoPath.includes('/')) return res.status(400).json({ error: 'Use format owner/repo' });
    const [owner, repo] = repoPath.split('/');

    const [repoInfo, issues, languages, contributors] = await Promise.all([
      octokit.repos.get({ owner, repo }),
      octokit.issues.listForRepo({ owner, repo, state: 'open', per_page: 100 }),
      octokit.repos.listLanguages({ owner, repo }),
      octokit.repos.listContributors({ owner, repo, per_page: 100 })
    ]);

    // Very simple, REAL derived signals (replace later with deeper analysis)
    const stars = repoInfo.data.stargazers_count ?? 0;
    const forks = repoInfo.data.forks_count ?? 0;
    const openIssues = (issues.data || []).length;
    const langs = Object.keys(languages.data || {});
    const updatedAt = repoInfo.data.updated_at;

    // crude scoring just to remove randomness
    const securityScore = clamp(30 + Math.max(0, 20 - openIssues) + Math.min(stars, 50) * 0.2, 0, 100);
    const codeQuality  = clamp(40 + Math.min(contributors.data.length, 20) + Math.min(forks, 50) * 0.3, 0, 100);
    const documentation = clamp(30 + (repoInfo.data.has_wiki ? 10 : 0) + (repoInfo.data.description ? 10 : 0), 0, 100);

    const improvements: string[] = [];
    if (!repoInfo.data.description) improvements.push('Add a clear project description');
    if (!repoInfo.data.has_issues) improvements.push('Enable GitHub Issues for tracking');
    if (!repoInfo.data.has_pages && langs.includes('JavaScript')) improvements.push('Publish docs site (GitHub Pages)');
    if (!repoInfo.data.has_projects) improvements.push('Enable Projects (task boards)');

    return res.json({
      mode: ghToken ? 'real' : 'unauthenticated', // still real, but lower rate limit
      repo: repoInfo.data.full_name,
      description: repoInfo.data.description,
      stars,
      forks,
      openIssues,
      languages: langs,
      lastUpdated: updatedAt,
      scores: { securityScore, codeQuality, documentation },
      improvements
    });
  } catch (e: any) {
    const msg = e?.message || String(e);
    return res.status(500).json({ error: msg });
  }
}

function extractRepo(input: string) {
  const m = input.match(/github\.com\/([^/#?]+\/[^/#?]+)/i);
  return m ? m[1] : input.trim();
}
function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }
