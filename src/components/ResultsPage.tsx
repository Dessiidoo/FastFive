import React, { useState } from 'react';
import { ArrowLeft, Star, AlertTriangle, CheckCircle, TrendingUp, Shield, Code, FileText, Filter, Settings, GitFork } from 'lucide-react';
import { AnalysisResult } from '../App';

interface ResultsPageProps {
  results: AnalysisResult[];
  searchQuery: string;
  onBack: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results, searchQuery, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRepo, setSelectedRepo] = useState<AnalysisResult | null>(null);

  const categories = ['all', 'web', 'mobile', 'backend', 'library', 'tool'];
  
  const filteredResults = selectedCategory === 'all' 
    ? results 
    : results.filter(repo => repo.category === selectedCategory);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/30';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  if (selectedRepo) {
    return (
      <div className="min-h-screen px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedRepo(null)}
              className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Results</span>
            </button>
            <div className="text-right">
              <h1 className="text-3xl font-bold text-white">{selectedRepo.name}</h1>
              <p className="text-gray-400">
                {selectedRepo.language} • {selectedRepo.stars} stars • {selectedRepo.forks} forks • {selectedRepo.openIssues} open issues
              </p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Scores */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-yellow-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Quality Scores</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Security</span>
                    <div className={`px-3 py-1 rounded-full border ${getScoreBg(selectedRepo.securityScore)}`}>
                      <span className={`font-bold ${getScoreColor(selectedRepo.securityScore)}`}>
                        {selectedRepo.securityScore}/100
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Code Quality</span>
                    <div className={`px-3 py-1 rounded-full border ${getScoreBg(selectedRepo.codeQuality)}`}>
                      <span className={`font-bold ${getScoreColor(selectedRepo.codeQuality)}`}>
                        {selectedRepo.codeQuality}/100
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Documentation</span>
                    <div className={`px-3 py-1 rounded-full border ${getScoreBg(selectedRepo.documentation)}`}>
                      <span className={`font-bold ${getScoreColor(selectedRepo.documentation)}`}>
                        {selectedRepo.documentation}/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Improvement Pricing</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Basic</span>
                    <span className="text-yellow-400 font-bold">${selectedRepo.pricing.basic}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Premium</span>
                    <span className="text-yellow-400 font-bold">${selectedRepo.pricing.premium}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Enterprise</span>
                    <span className="text-yellow-400 font-bold">${selectedRepo.pricing.enterprise}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues and Improvements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Issues */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                  Critical Issues ({selectedRepo.openIssues})
                </h3>
                <div className="space-y-3">
                  {selectedRepo.issues.map((issue, index) => (
                    <div key={index} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <p className="text-red-300">{issue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-green-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  Recommended Improvements
                </h3>
                <div className="space-y-3">
                  {selectedRepo.improvements.map((improvement, index) => (
                    <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-300">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-2">ANALYSIS RESULTS</h1>
            <p className="text-gray-400">Found {results.length} repositories for: <span className="text-yellow-400">{searchQuery}</span></p>
          </div>
          <button
            onClick={() => {
              const event = new CustomEvent('openAdmin', { detail: { results } });
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((repo) => (
            <div
              key={repo.id}
              onClick={() => setSelectedRepo(repo)}
              className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700 rounded-2xl p-6 hover:border-yellow-500/50 transition-all cursor-pointer group hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{repo.category} • {repo.language}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="w-4 h-4" />
                    <span className="font-medium">{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <GitFork className="w-4 h-4" />
                    <span className="font-medium">{repo.forks}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-medium">{repo.openIssues}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-6 line-clamp-2">{repo.description}</p>

              {/* Quick Scores */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(repo.securityScore)}`}>
                    {repo.securityScore}
                  </div>
                  <div className="text-xs text-gray-400">Security</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(repo.codeQuality)}`}>
                    {repo.codeQuality}
                  </div>
                  <div className="text-xs text-gray-400">Quality</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(repo.documentation)}`}>
                    {repo.documentation}
                  </div>
                  <div className="text-xs text-gray-400">Docs</div>
                </div>
              </div>

              {/* Issues Preview */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">{repo.openIssues} Issues</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">{repo.improvements.length} Improvements</span>
                </div>
              </div>

              {/* Pricing Preview */}
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Starting from</span>
                  <span className="text-yellow-400 font-bold">${repo.pricing.basic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Analysis Summary</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-yellow-400 mb-2">{results.length}</div>
              <div className="text-gray-300">Repositories Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-black text-red-400 mb-2">
                {results.reduce((acc, repo) => acc + repo.openIssues, 0)}
              </div>
              <div className="text-gray-300">Total Issues Found</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-400 mb-2">
                {results.reduce((acc, repo) => acc + repo.improvements.length, 0)}
              </div>
              <div className="text-gray-300">Improvements Suggested</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-400 mb-2">
                ${Math.min(...results.map(r => r.pricing.basic))} - ${Math.max(...results.map(r => r.pricing.enterprise))}
              </div>
              <div className="text-gray-300">Price Range</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;