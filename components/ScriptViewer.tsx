'use client';

import { useState } from 'react';
import { Script } from '@/lib/types';
import { CheckCircle, XCircle, AlertTriangle, Globe } from 'lucide-react';

interface ScriptViewerProps {
  script: Script;
  variant?: 'bilingual' | 'simple';
  onLanguageChange?: (language: 'en' | 'es') => void;
}

export function ScriptViewer({ script, variant = 'simple', onLanguageChange }: ScriptViewerProps) {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en');

  const handleLanguageChange = (language: 'en' | 'es') => {
    setCurrentLanguage(language);
    onLanguageChange?.(language);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">{script.title}</h2>
          <p className="text-sm text-gray-300 capitalize">{script.scenario} Scenario</p>
        </div>
        
        {variant === 'bilingual' && (
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <div className="flex bg-white bg-opacity-10 rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                  currentLanguage === 'en'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                  currentLanguage === 'es'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        )}
      </div>

      {/* What TO Say */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-medium text-white">What TO Say</h3>
        </div>
        <div className="space-y-2">
          {script.content.whatToSay.map((phrase, index) => (
            <div key={index} className="glass-surface p-3 rounded-md">
              <p className="text-sm text-gray-200">{phrase}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What NOT to Say */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <XCircle className="h-5 w-5 text-red-400" />
          <h3 className="text-lg font-medium text-white">What NOT to Say</h3>
        </div>
        <div className="space-y-2">
          {script.content.whatNotToSay.map((phrase, index) => (
            <div key={index} className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-20 p-3 rounded-md">
              <p className="text-sm text-red-200">{phrase}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-medium text-white">Key Points to Remember</h3>
        </div>
        <div className="space-y-2">
          {script.content.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-200">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Phrase */}
      {script.content.emergencyPhrase && (
        <div className="bg-orange-500 bg-opacity-10 border border-orange-500 border-opacity-20 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-medium text-white">Emergency Phrase</h3>
          </div>
          <p className="text-orange-200 font-medium">{script.content.emergencyPhrase}</p>
        </div>
      )}
    </div>
  );
}
