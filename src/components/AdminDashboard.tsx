import React, { useState, useEffect } from 'react';
import { LogOut, Users, GitBranch, DollarSign, Settings, Play, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { AnalysisResult } from '../App';
import { applyRepositoryFixes } from '../services/githubApi';

interface AdminDashboardProps {
  onLogout: () => void;
  analysisResults: AnalysisResult[];
}

interface FixJob {
  id: string;
  repoName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startedAt: string;
  completedAt?: string;
  appliedFixes: string[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, analysisResults }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'repositories' | 'fixes' | 'settings'>('overview');
  const [fixJobs, setFixJobs] = useState<FixJob[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<AnalysisResult | null>(null);

  const handleApplyFixes = async (repo: AnalysisResult) => {
    const newJob: FixJob = {
      id: `fix-${Date.now()}`,
      repoName: repo.name,
      status: 'pending',
      progress: 0,
      startedAt: new Date().toISOString(),
      appliedFixes: []
    };

    setFixJobs(prev => [newJob, ...prev]);

    // Simulate fix application
    try {
      setFixJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'running' } : job
      ));

      const result = await applyRepositoryFixes(repo.name, repo.improvements.slice(0, 5));
      
      // Simulate progress updates
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setFixJobs(prev => prev.map(job => 
          job.id === newJob.id ? { ...job, progress: i } : job
        ));
      }

      setFixJobs(prev => prev.map(job => 
        job.id === newJob.id ? { 
          ...job, 
          status: 'completed',
          progress: 100,
          completedAt: new Date().toISOString(),
          appliedFixes: result.appliedFixes
        } : job
      ));
    } catch (error) {
      setFixJobs(prev => prev.map(job => 
        job.id === newJob.id ? { ...job, status: 'failed' } : job
      ));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'running': return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'running': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm border-b border-yellow-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">RepoDetective Control Panel</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-600/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-gray-900/90 to-black/90 border-r border-yellow-500/20 min-h-screen p-6">
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'repositories', label: 'Repositories', icon: GitBranch },
              { id: 'fixes', label: 'Fix Jobs', icon: Play },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-yellow-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <GitBranch className="w-8 h-8 text-yellow-400" />
                    <span className="text-2xl font-bold text-white">{analysisResults.length}</span>
                  </div>
                  <p className="text-gray-300">Analyzed Repos</p>
                </div>

                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-green-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <span className="text-2xl font-bold text-white">{fixJobs.filter(j => j.status === 'completed').length}</span>
                  </div>
                  <p className="text-gray-300">Fixes Applied</p>
                </div>

                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-blue-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Play className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold text-white">{fixJobs.filter(j => j.status === 'running').length}</span>
                  </div>
                  <p className="text-gray-300">Active Jobs</p>
                </div>

                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-purple-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-purple-400" />
                    <span className="text-2xl font-bold text-white">
                      ${analysisResults.reduce((acc, repo) => acc + repo.pricing.basic, 0)}
                    </span>
                  </div>
                  <p className="text-gray-300">Total Revenue</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-yellow-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Recent Fix Jobs</h3>
                <div className="space-y-4">
                  {fixJobs.slice(0, 5).map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <p className="text-white font-medium">{job.repoName}</p>
                          <p className="text-gray-400 text-sm">
                            Started {new Date(job.startedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getStatusColor(job.status)}`}>
                          {job.status.toUpperCase()}
                        </p>
                        {job.status === 'running' && (
                          <p className="text-gray-400 text-sm">{job.progress}%</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {fixJobs.length === 0 && (
                    <p className="text-gray-400 text-center py-8">No fix jobs yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'repositories' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Repository Management</h2>
              
              <div className="grid gap-6">
                {analysisResults.map(repo => (
                  <div key={repo.id} className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700 rounded-2xl p-6 hover:border-yellow-500/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{repo.name}</h3>
                        <p className="text-gray-400">{repo.language} • {repo.stars} stars • {repo.lastUpdated}</p>
                      </div>
                      <button
                        onClick={() => handleApplyFixes(repo)}
                        className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center space-x-2 ${
                          repo.name.includes('/') && !repo.name.includes('-')
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-300 hover:to-yellow-500' 
                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        }`}
                        disabled={!repo.name.includes('/') || repo.name.includes('-')}
                      >
                        <Play className="w-4 h-4" />
                        <span>{repo.name.includes('/') && !repo.name.includes('-') ? 'Apply Real Fixes' : 'Mock Data Only'}</span>
                      </button>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{repo.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-lg font-bold text-red-400">{repo.securityScore}</div>
                        <div className="text-xs text-gray-400">Security</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-lg font-bold text-yellow-400">{repo.codeQuality}</div>
                        <div className="text-xs text-gray-400">Quality</div>
                      </div>
                      <div className="text-center p-3 bg-black/30 rounded-lg">
                        <div className="text-lg font-bold text-blue-400">{repo.documentation}</div>
                        <div className="text-xs text-gray-400">Docs</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-red-300">{repo.issues.length} issues</span>
                      <span className="text-green-300">{repo.improvements.length} improvements</span>
                      <span className="text-yellow-400 font-bold">${repo.pricing.basic}+</span>
                    </div>
                  </div>
                ))}
                {analysisResults.length === 0 && (
                  <div className="text-center py-12">
                    <GitBranch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No repositories analyzed yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'fixes' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Fix Job Management</h2>
              
              {/* Applied Fixes Log */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-green-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Applied Fixes Log</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {fixJobs.filter(job => job.status === 'completed' && job.appliedFixes.length > 0).map(job => (
                    <div key={`log-${job.id}`} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-300 font-medium">{job.repoName}</span>
                        <span className="text-gray-400 text-sm">
                          {job.completedAt ? new Date(job.completedAt).toLocaleString() : ''}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {job.appliedFixes.map((fix, index) => (
                          <div key={index} className="text-green-200 text-sm pl-4 border-l-2 border-green-500/30">
                            ✓ {fix}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {fixJobs.filter(job => job.status === 'completed').length === 0 && (
                    <p className="text-gray-400 text-center py-4">No fixes applied yet</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {fixJobs.map(job => (
                  <div key={job.id} className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h3 className="text-lg font-bold text-white">{job.repoName}</h3>
                          <p className="text-gray-400 text-sm">
                            Started: {new Date(job.startedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getStatusColor(job.status)}`}>
                          {job.status.toUpperCase()}
                        </p>
                        {job.status === 'running' && (
                          <p className="text-gray-400 text-sm">{job.progress}%</p>
                        )}
                      </div>
                    </div>

                    {job.status === 'running' && (
                      <div className="mb-4">
                        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full transition-all duration-500"
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {job.appliedFixes.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-white font-medium mb-2">Applied Fixes:</h4>
                        <div className="space-y-2">
                          {job.appliedFixes.map((fix, index) => (
                            <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                              <p className="text-green-300 text-sm">{fix}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {fixJobs.length === 0 && (
                  <div className="text-center py-12">
                    <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No fix jobs yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">System Settings</h2>
              
              <div className="grid gap-6">
                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-yellow-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">API Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">GitHub Token Status</label>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-green-400">Connected</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">Stripe Integration</label>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-yellow-400">Configured</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-red-500/20 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Admin Access Logging</span>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Two-Factor Authentication</span>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">API Rate Limiting</span>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;