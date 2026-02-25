import React from 'react';
import { Shield, ShieldAlert, Loader } from 'lucide-react';
import { BreachResult } from '../types';

interface BreachStatusProps {
  breachResult: BreachResult;
}

export const BreachStatus: React.FC<BreachStatusProps> = ({ breachResult }) => {
  if (breachResult.loading) {
    return (
      <div className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <Loader className="animate-spin text-blue-500" size={20} />
        <span className="text-gray-600">Checking breach databases...</span>
      </div>
    );
  }

  if (breachResult.error) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <ShieldAlert className="text-yellow-600" size={20} />
        <div className="flex-1">
          <p className="text-yellow-800 font-medium">Unable to check breach status</p>
          <p className="text-yellow-600 text-sm">{breachResult.error}</p>
        </div>
      </div>
    );
  }

  if (breachResult.isBreached) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
        <ShieldAlert className="text-red-500" size={20} />
        <div className="flex-1">
          <p className="text-red-800 font-medium">Password Found in Data Breach!</p>
          <p className="text-red-600 text-sm">
            This password has been seen {breachResult.count?.toLocaleString()} times in data breaches. 
            Choose a different password immediately.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
      <Shield className="text-green-500" size={20} />
      <div className="flex-1">
        <p className="text-green-800 font-medium">No Breaches Found</p>
        <p className="text-green-600 text-sm">
          This password hasn't been found in known data breaches.
        </p>
      </div>
    </div>
  );
};