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
): Promise<AnalysisResult> => {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ target: searchQuery }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || 'Failed to analyze repository');
  }

  return res.json();
};
