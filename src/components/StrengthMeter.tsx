import React from 'react';
import { PasswordStrength } from '../types';

interface StrengthMeterProps {
  strength: PasswordStrength;
}

export const StrengthMeter: React.FC<StrengthMeterProps> = ({ strength }) => {
  const getWidthPercentage = () => {
    return (strength.score / 4) * 100;
  };

  const getTextColor = () => {
    const colorMap: Record<string, string> = {
      'bg-red-500': 'text-red-600',
      'bg-orange-500': 'text-orange-600',
      'bg-yellow-500': 'text-yellow-600',
      'bg-blue-500': 'text-blue-600',
      'bg-green-500': 'text-green-600',
      'bg-gray-400': 'text-gray-600'
    };
    return colorMap[strength.color] || 'text-gray-600';
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${getTextColor()}`}>
          {strength.label}
        </span>
        <span className="text-sm text-gray-500">
          {strength.entropy} bits entropy
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-full ${strength.color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${getWidthPercentage()}%` }}
        />
      </div>
      
      <div className="text-center">
        <span className="text-xs text-gray-500">
          Time to crack: <span className="font-medium text-gray-700">{strength.timeToBreak}</span>
        </span>
      </div>
    </div>
  );
};