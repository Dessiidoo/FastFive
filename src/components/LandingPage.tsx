import React, { useState } from 'react';
import { Search, Target, Zap, Shield, TrendingUp, Star, Github, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: (query: string) => void;
  onAdminLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartAnalysis, onAdminLogin }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onStartAnalysis(searchInput.trim());
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-yellow-500/10 via-transparent to-transparent rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
              <Github className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              RepoDetective
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Contact</a>
            <button
              onClick={onAdminLogin}
              className="text-gray-500 hover:text-yellow-400 transition-colors font-medium text-sm"
            >
              Admin
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                AI-POWERED
              </span>
              <br />
              <span className="text-white">
                REPO ANALYSIS
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Unlock the hidden potential of GitHub repositories with our detective-grade analysis. 
              Get actionable insights, security assessments, and improvement roadmaps for any codebase.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-2 flex items-center">
                <Search className="w-6 h-6 text-yellow-400 ml-4" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter GitHub username or repository URL..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-4 focus:outline-none text-lg"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Analyze</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Feature Cards */}
          <div id="features" className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/40 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Precision Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced AI algorithms scan code quality, security vulnerabilities, and architectural patterns with detective-level precision.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/40 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Security Audit</h3>
              <p className="text-gray-300 leading-relaxed">
                Comprehensive security assessment identifying vulnerabilities, outdated dependencies, and potential threats.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 hover:border-yellow-500/40 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Growth Strategy</h3>
              <p className="text-gray-300 leading-relaxed">
                Actionable roadmaps for modernization, performance optimization, and feature enhancement.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 px-6 py-20 bg-gradient-to-r from-black/50 to-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                PRICING
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect analysis package for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Basic Scan</h3>
                <div className="text-4xl font-black text-yellow-400 mb-2">$29</div>
                <p className="text-gray-400">per repository</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Code quality assessment
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Basic security scan
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  5 improvement suggestions
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 rounded-xl font-bold hover:from-gray-600 hover:to-gray-700 transition-all">
                Get Started
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-2xl p-8 transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full font-bold text-sm">
                MOST POPULAR
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Premium Analysis</h3>
                <div className="text-4xl font-black text-yellow-400 mb-2">$99</div>
                <p className="text-gray-400">per repository</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Deep code analysis
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Advanced security audit
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  20+ improvement strategies
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Performance optimization
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Architecture recommendations
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all transform hover:scale-105">
                Start Premium Analysis
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-black text-yellow-400 mb-2">$299</div>
                <p className="text-gray-400">comprehensive suite</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Full organization scan
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Custom improvement roadmap
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  Detailed reports
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 rounded-xl font-bold hover:from-gray-600 hover:to-gray-700 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              <span className="text-white">WHY CHOOSE </span>
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                REPODETECTIVE?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Analyze hundreds of repositories in minutes with our optimized AI engine.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Precise Detection</h3>
              <p className="text-gray-400">Advanced pattern recognition identifies issues other tools miss.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Security First</h3>
              <p className="text-gray-400">Comprehensive security audits with enterprise-grade vulnerability detection.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Growth Focused</h3>
              <p className="text-gray-400">Actionable recommendations that drive real improvements and results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-3xl p-12">
            <h2 className="text-4xl font-black text-white mb-6">
              Ready to Transform Your Repositories?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who've improved their code quality with RepoDetective.
            </p>
            <button
              onClick={() => document.querySelector('input')?.focus()}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-12 py-4 rounded-2xl font-bold text-xl hover:from-yellow-300 hover:to-yellow-500 transition-all transform hover:scale-105 inline-flex items-center space-x-3"
            >
              <span>Start Free Analysis</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;