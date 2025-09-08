import { AnalysisResult } from '../App';

export const applyRepositoryFixes = async (_repoFullName: string, _improvements: string[]): Promise<{
  success: boolean;
  appliedFixes: string[];
  errors: string[];
}> => {
  const appliedFixes: string[] = [];
  const errors: string[] = [];

  try {
    // Mark parameters as used to satisfy linting rules
    void _repoFullName;
    void _improvements;

    // Simulate applying fixes for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000));

    appliedFixes.push('Added comprehensive README file');
    appliedFixes.push('Added .gitignore file for security');
    appliedFixes.push('Added CI/CD pipeline with GitHub Actions');

    return {
      success: true,
      appliedFixes,
      errors
    };

  } catch (error) {
    errors.push(`Failed to apply fixes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return {
      success: false,
      appliedFixes,
      errors
    };
  }
};

export const analyzeRealRepositories = async (searchQuery: string): Promise<AnalysisResult[]> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: searchQuery })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json();

    const lastUpdated = data.lastUpdated
      ? `${Math.floor((Date.now() - new Date(data.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))} days ago`
      : 'Unknown';

    const basePrice = Math.max(50, (data.openIssues ?? 0) + (data.forks ?? 0));

    return [
      {
        id: data.repo,
        name: data.repo,
        description: data.description || 'No description available',
        category: 'repository',
        language: data.languages?.[0] || 'Unknown',
        stars: data.stars ?? 0,
        lastUpdated,
        issues: [],
        improvements: data.improvements || [],
        pricing: {
          basic: basePrice,
          premium: basePrice * 2,
          enterprise: basePrice * 4,
        },
        securityScore: data.scores?.securityScore ?? 0,
        codeQuality: data.scores?.codeQuality ?? 0,
        documentation: data.scores?.documentation ?? 0,
      },
    ];
  } catch (error) {
    console.error('Analysis API Error:', error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to connect to analysis API');
  }
};
