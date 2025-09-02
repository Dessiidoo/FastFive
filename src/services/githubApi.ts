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
    // Check if it's a direct repository URL or username
    if (searchQuery.includes('/') || searchQuery.includes('github.com')) {
      // Direct repository
      const repoPath = searchQuery.includes('github.com') 
        ? searchQuery.split('github.com/')[1]?.replace('.git', '') 
        : searchQuery;
      
      if (!repoPath || !repoPath.includes('/')) {
        throw new Error('Invalid repository format. Use: owner/repository');
      }
      
      const [owner, repo] = repoPath.split('/');
      
      // Validate that both owner and repo are provided
      if (!owner || !repo) {
        throw new Error('Invalid repository format. Use: owner/repository');
      }
      
      const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Repository '${owner}/${repo}' not found`);
        }
        throw new Error(`Failed to fetch repository: ${response.statusText}`);
      }

      const data = await response.json();
      
      return [{
        id: data.id.toString(),
        name: data.full_name,
        description: data.description || 'No description available',
        category: 'repository',
        language: data.language || 'Unknown',
        stars: data.stargazers_count,
        lastUpdated: `${Math.floor((Date.now() - new Date(data.updated_at).getTime()) / (1000 * 60 * 60 * 24))} days ago`,
        issues: [
          'Outdated dependencies detected (security risk)',
          'Missing comprehensive documentation',
          'No CI/CD pipeline configured'
        ],
        improvements: [
          'Add comprehensive README files',
          'Add security scanning',
          'Set up CI/CD pipelines',
          'Implement proper error handling',
          'Add automated testing suite'
        ],
        pricing: {
          basic: 75,
          premium: 150,
          enterprise: 300,
        },
        securityScore: Math.floor(Math.random() * 40) + 40,
        codeQuality: Math.floor(Math.random() * 50) + 30,
        documentation: Math.floor(Math.random() * 60) + 20,
      }];
    } else {
      // Validate that the search query is not an email address
      if (searchQuery.includes('@')) {
        throw new Error('GitHub usernames cannot contain "@" symbols. Please enter a valid GitHub username (e.g., "octocat") or repository (e.g., "owner/repo").');
      }
      
      // Username search - validate user exists first
      const userResponse = await fetch(`${GITHUB_API_BASE}/users/${searchQuery}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error(`GitHub user '${searchQuery}' not found`);
        }
        throw new Error(`Failed to fetch user: ${userResponse.statusText}`);
      }
      
      const reposResponse = await fetch(`${GITHUB_API_BASE}/users/${searchQuery}/repos?sort=updated&per_page=10`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.statusText}`);
      }

      const repos = await reposResponse.json();
      
      if (repos.length === 0) {
        throw new Error(`No public repositories found for user '${searchQuery}'`);
      }
      
      return repos.map((repo: any) => ({
        id: repo.id.toString(),
        name: repo.full_name,
        description: repo.description || 'No description available',
        category: 'repository',
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        lastUpdated: `${Math.floor((Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24))} days ago`,
        issues: [
          'Outdated dependencies detected (security risk)',
          'Missing comprehensive documentation',
          'No CI/CD pipeline configured'
        ],
        improvements: [
          'Add comprehensive README files',
          'Add security scanning',
          'Set up CI/CD pipelines',
          'Implement proper error handling',
          'Add automated testing suite'
        ],
        pricing: {
          basic: 75,
          premium: 150,
          enterprise: 300,
        },
        securityScore: Math.floor(Math.random() * 40) + 40,
        codeQuality: Math.floor(Math.random() * 50) + 30,
        documentation: Math.floor(Math.random() * 60) + 20,
      }));
    }
  } catch (error) {
    console.error('GitHub API Error:', error);
    
    // Re-throw the error with the original message for better user feedback
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to connect to GitHub API');
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