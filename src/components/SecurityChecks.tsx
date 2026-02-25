import React from 'react';
import { Check, X } from 'lucide-react';
import { PasswordAnalysis } from '../types';

interface SecurityChecksProps {
  analysis: PasswordAnalysis;
}

export const SecurityChecks: React.FC<SecurityChecksProps> = ({ analysis }) => {
  const checkItems = [
    { key: 'length', label: 'At least 12 characters', check: analysis.checks.length },
    { key: 'uppercase', label: 'Contains uppercase letters', check: analysis.checks.uppercase },
    { key: 'lowercase', label: 'Contains lowercase letters', check: analysis.checks.lowercase },
    { key: 'numbers', label: 'Contains numbers', check: analysis.checks.numbers },
    { key: 'symbols', label: 'Contains special characters', check: analysis.checks.symbols },
    { key: 'commonPatterns', label: 'Avoids common patterns', check: analysis.checks.commonPatterns },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Security Requirements</h3>
      
      <div className="grid gap-3">
        {checkItems.map((item) => (
          <div 
            key={item.key}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              item.check 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className={`flex-shrink-0 ${item.check ? 'text-green-600' : 'text-red-500'}`}>
              {item.check ? <Check size={16} /> : <X size={16} />}
            </div>
            <span className={`text-sm ${item.check ? 'text-green-800' : 'text-red-700'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      
      {analysis.suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-md font-medium text-gray-700">Suggestions:</h4>
          <ul className="space-y-1">
            {analysis.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};