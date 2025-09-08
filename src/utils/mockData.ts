import { AnalysisResult } from '../App';

const categories = ['web', 'mobile', 'backend', 'library', 'tool'];
const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'C++'];

const issueTemplates = [
  'Outdated dependencies detected (security risk)',
  'Missing error handling in critical functions',
  'Hardcoded credentials found in configuration files',
  'Inefficient database queries causing performance bottlenecks',
  'Missing unit tests (coverage below 60%)',
  'Deprecated API usage detected',
  'Memory leaks in long-running processes',
  'Missing input validation on user endpoints',
  'Insecure file upload implementation',
  'Cross-site scripting (XSS) vulnerabilities',
  'SQL injection vulnerabilities in database queries',
  'Missing rate limiting on API endpoints',
  'Unencrypted sensitive data storage',
  'Poor error logging and monitoring setup',
];

const improvementTemplates = [
  'Implement comprehensive error handling with proper logging',
  'Add automated testing suite with 80%+ coverage',
  'Upgrade to latest framework version for security patches',
  'Implement proper authentication and authorization',
  'Add API rate limiting and request validation',
  'Optimize database queries with indexing strategies',
  'Implement caching layer for improved performance',
  'Add comprehensive documentation and code comments',
  'Set up CI/CD pipeline for automated deployments',
  'Implement monitoring and alerting systems',
  'Add input sanitization and validation middleware',
  'Implement proper secret management system',
  'Add performance monitoring and optimization',
  'Create comprehensive API documentation',
  'Implement proper backup and disaster recovery',
  'Add security headers and HTTPS enforcement',
  'Optimize bundle size and lazy loading',
  'Implement proper state management patterns',
  'Add accessibility features and compliance',
  'Set up code quality gates and linting rules',
];

export const generateMockResults = (searchQuery: string): AnalysisResult[] => {
  const isUserSearch = !searchQuery.includes('/') && !searchQuery.includes('github.com');
  const repoCount = isUserSearch ? Math.floor(Math.random() * 8) + 5 : Math.floor(Math.random() * 3) + 1;
  
  const results: AnalysisResult[] = [];
  
  for (let i = 0; i < repoCount; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const language = languages[Math.floor(Math.random() * languages.length)];
    const securityScore = Math.floor(Math.random() * 40) + 40;
    const codeQuality = Math.floor(Math.random() * 50) + 30;
    const documentation = Math.floor(Math.random() * 60) + 20;
    
    const issueCount = Math.floor(Math.random() * 4) + 2;
    const improvementCount = Math.floor(Math.random() * 6) + 4;
    
    const issues = Array.from({ length: issueCount }, () => 
      issueTemplates[Math.floor(Math.random() * issueTemplates.length)]
    );
    
    const improvements = Array.from({ length: improvementCount }, () => 
      improvementTemplates[Math.floor(Math.random() * improvementTemplates.length)]
    );

    const avgScore = (securityScore + codeQuality + documentation) / 3;
    const basePricing = avgScore < 50 ? 150 : avgScore < 70 ? 100 : 75;
    
    results.push({
      id: `repo-${i}`,
      name: isUserSearch ? `${searchQuery}-${category}-${i + 1}` : `analyzed-repo-${i + 1}`,
      description: `A ${category} project built with ${language} that needs optimization and security improvements.`,
      category,
      language,
      stars: Math.floor(Math.random() * 1000) + 10,
      forks: Math.floor(Math.random() * 500),
      openIssues: Math.floor(Math.random() * 100),
      lastUpdated: `${Math.floor(Math.random() * 30) + 1} days ago`,
      issues: [...new Set(issues)],
      improvements: [...new Set(improvements)],
      pricing: {
        basic: basePricing,
        premium: basePricing * 2,
        enterprise: basePricing * 4,
      },
      securityScore,
      codeQuality,
      documentation,
    });
  }
  
  return results;
};