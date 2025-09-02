import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AnalysisPage from './components/AnalysisPage';
import ResultsPage from './components/ResultsPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export type AnalysisResult = {
  id: string;
  name: string;
  description: string;
  category: string;
  language: string;
  stars: number;
  lastUpdated: string;
  issues: string[];
  improvements: string[];
  pricing: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  securityScore: number;
  codeQuality: number;
  documentation: number;
};

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'analysis' | 'results'>('landing');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartAnalysis = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('analysis');
  };

  const handleAnalysisComplete = (results: AnalysisResult[]) => {
    setAnalysisResults(results);
    setCurrentPage('results');
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
    setAnalysisResults([]);
    setSearchQuery('');
    setShowAdminLogin(false);
  };

  const handleAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const handleAdminAuthenticated = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('landing');
  };

  React.useEffect(() => {
    const handleOpenAdmin = (event: CustomEvent) => {
      setAnalysisResults(event.detail.results);
      setIsAdminAuthenticated(true);
    };

    window.addEventListener('openAdmin', handleOpenAdmin as EventListener);
    return () => window.removeEventListener('openAdmin', handleOpenAdmin as EventListener);
  }, []);

  // Admin Dashboard
  if (isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <AdminDashboard 
          onLogout={handleAdminLogout}
          analysisResults={analysisResults}
        />
      </div>
    );
  }

  // Admin Login
  if (showAdminLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <AdminLogin 
          onAuthenticated={handleAdminAuthenticated}
          onBack={handleBackToHome}
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {currentPage === 'landing' && (
        <LandingPage 
          onStartAnalysis={handleStartAnalysis} 
          onAdminLogin={handleAdminLogin}
        />
      )}
      {currentPage === 'analysis' && (
        <AnalysisPage
          searchQuery={searchQuery}
          onAnalysisComplete={handleAnalysisComplete}
          onBack={handleBackToHome}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage
          results={analysisResults}
          searchQuery={searchQuery}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;