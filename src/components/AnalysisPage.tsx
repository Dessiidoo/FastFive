import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, Loader, Zap, Target, Shield } from 'lucide-react';
import { AnalysisResult } from '../App';
import { generateMockResults } from '../utils/mockData';

interface AnalysisPageProps {
  searchQuery: string;
  onAnalysisComplete: (results: AnalysisResult[]) => void;
  onBack: () => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ searchQuery, onAnalysisComplete, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const analysisSteps = [
    { icon: Search, text: 'Scanning repositories...', duration: 2000 },
    { icon: Target, text: 'Analyzing code patterns...', duration: 3000 },
    { icon: Shield, text: 'Security assessment...', duration: 2500 },
    { icon: Zap, text: 'Generating recommendations...', duration: 1500 },
  ];

  useEffect(() => {
    let totalDuration = 0;
    const stepDurations = analysisSteps.map(step => step.duration);
    const totalTime = stepDurations.reduce((acc, duration) => acc + duration, 0);

    const runAnalysis = async () => {
      for (let i = 0; i < analysisSteps.length; i++) {
        setCurrentStep(i);
        
        const stepDuration = stepDurations[i];
        const startTime = Date.now();
        
        while (Date.now() - startTime < stepDuration) {
          const elapsed = Date.now() - startTime;
          const stepProgress = (elapsed / stepDuration) * 100;
          const overallProgress = ((totalDuration + elapsed) / totalTime) * 100;
          setProgress(Math.min(overallProgress, 100));
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        totalDuration += stepDuration;
      }

      // Generate mock results and complete analysis
      const results = generateMockResults(searchQuery);
      onAnalysisComplete(results);
    };

    runAnalysis();
  }, [searchQuery, onAnalysisComplete]);

  const CurrentIcon = analysisSteps[currentStep]?.icon || Search;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Analysis Animation */}
        <div className="mb-12">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute inset-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <CurrentIcon className="w-12 h-12 text-black animate-pulse" />
            </div>
            <div className="absolute -inset-4 border-4 border-yellow-500/30 rounded-full animate-spin"></div>
          </div>

          <h1 className="text-4xl font-black text-white mb-4">
            ANALYZING REPOSITORIES
          </h1>
          
          <p className="text-xl text-gray-300 mb-2">
            Searching: <span className="text-yellow-400 font-bold">{searchQuery}</span>
          </p>
          
          <p className="text-lg text-yellow-400 font-medium mb-8">
            {analysisSteps[currentStep]?.text || 'Processing...'}
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-yellow-400 font-bold mt-2">{Math.round(progress)}% Complete</p>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-4">
            {analysisSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-center space-x-3 transition-all duration-500 ${
                    isActive ? 'text-yellow-400 scale-110' : 
                    isCompleted ? 'text-green-400' : 'text-gray-600'
                  }`}
                >
                  <StepIcon className="w-5 h-5" />
                  <span className="font-medium">{step.text}</span>
                  {isCompleted && <span className="text-green-400">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Processing Indicators */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-yellow-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">AI Detective Analysis</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between text-gray-300">
              <span>Pattern Recognition</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Security Scanning</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-400"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Quality Assessment</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-600"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-700"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;