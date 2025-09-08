import { AnalysisResult } from '../App';

const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
  company: string;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  size: number;
  default_branch: string;
}

export const applyRepositoryFixes = async (repoFullName: string, improvements: string[]): Promise<{
  success: boolean;
  appliedFixes: string[];
  errors: string[];
}> => {
  const appliedFixes: string[] = [];
  const errors: string[] = [];

  try {
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

export const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`GitHub user '${username}' not found`);
    }
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  
  return response.json();
};

export const analyzeRealRepositories = async (searchQuery: string): Promise<AnalysisResult[]> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: searchQuery }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to analyze repository');
    }

    const data = await response.json();

    const result: AnalysisResult = {
      id: data.repo,
      name: data.repo,
      description: data.description || 'No description available',
      category: 'repository',
      language: data.languages?.[0] || 'Unknown',
      stars: data.stars ?? 0,
      forks: data.forks ?? 0,
      openIssues: data.openIssues ?? 0,
      lastUpdated: `${Math.floor((Date.now() - new Date(data.lastUpdated).getTime()) / (1000 * 60 * 60 * 24))} days ago`,
      issues: [`Repository has ${data.openIssues ?? 0} open issues`],
      improvements: data.improvements || [],
      pricing: {
        basic: 75,
        premium: 150,
        enterprise: 300,
      },
      securityScore: data.scores?.securityScore ?? 0,
      codeQuality: data.scores?.codeQuality ?? 0,
      documentation: data.scores?.documentation ?? 0,
    };

    return [result];
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to analyze repository');
  }
};

export const fetchUserRepositories = async (username: string): Promise<GitHubRepo[]> => {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }
  
  return response.json();
};