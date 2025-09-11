import { AnalysisResult } from '../App';

// Stubbed out — no fake fixes anymore
export const applyRepositoryFixes = async (
  _repoFullName: string,
  _improvements: string[]
): Promise<{
  success: boolean;
  appliedFixes: string[];
  errors: string[];
}> => {
  return {
    success: false,
    appliedFixes: [],
    errors: ['Fix functionality not implemented'],
  };
};

// Calls our backend API to analyze real repositories
export const analyzeRealRepositories = async (
  searchQuery: string
): Promise<AnalysisResult[]> => {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target: searchQuery }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || 'Failed to analyze repository');
  }

  const data = await res.json();

  const mappedResult: AnalysisResult = {
    id: data.id ?? searchQuery,
    name: data.name ?? '',
    description: data.description ?? '',
    category: data.category ?? 'General',
    language: data.language ?? '',
    stars: data.stars ?? 0,
    forks: data.forks ?? 0,
    openIssues: data.openIssues ?? 0,
    lastUpdated: data.lastUpdated ?? new Date().toISOString(),
    issues: data.issues ?? [],
    improvements: data.improvements ?? [],
    pricing: data.pricing ?? { basic: 0, premium: 0, enterprise: 0 },
    securityScore: data.scores?.securityScore ?? data.securityScore ?? 0,
    codeQuality: data.scores?.codeQuality ?? data.codeQuality ?? 0,
    documentation: data.scores?.documentation ?? data.documentation ?? 0,
  };

  return [mappedResult];
};
