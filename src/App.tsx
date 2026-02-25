import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Activity, Database } from 'lucide-react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthMeter } from './components/StrengthMeter';
import { SecurityChecks } from './components/SecurityChecks';
import { BreachStatus } from './components/BreachStatus';
import { SecurityTips } from './components/SecurityTips';
import { analyzePassword } from './utils/passwordAnalyzer';
import { checkPasswordBreach } from './utils/breachChecker';
import { BreachResult } from './types';

function App() {
  const [password, setPassword] = useState('');
  const [breachResult, setBreachResult] = useState<BreachResult>({ 
    isBreached: false, 
    loading: false 
  });

  const analysis = useMemo(() => analyzePassword(password), [password]);

  useEffect(() => {
    const checkBreach = async () => {
      if (password.length === 0) {
        setBreachResult({ isBreached: false, loading: false });
        return;
      }

      setBreachResult(prev => ({ ...prev, loading: true }));
      
      // Debounce the API call
      const timeoutId = setTimeout(async () => {
        const result = await checkPasswordBreach(password);
        setBreachResult(result);
      }, 500);

      return () => clearTimeout(timeoutId);
    };

    checkBreach();
  }, [password]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Password Security Analyzer</h1>
              <p className="text-gray-600">Check password strength and breach exposure</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Password Input Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Enter Password to Analyze</h2>
            <p className="text-gray-600 text-sm mb-4">
              Your password is processed locally and never stored or transmitted in plain text.
            </p>
          </div>
          
          <PasswordInput 
            value={password} 
            onChange={setPassword} 
          />

          {password && (
            <div className="mt-6">
              <StrengthMeter strength={analysis.strength} />
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Analysis */}
          <div className="space-y-8">
            {/* Security Checks */}
            {password && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="text-blue-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Security Analysis</h3>
                </div>
                <SecurityChecks analysis={analysis} />
              </div>
            )}

            {/* Breach Status */}
            {password && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Database className="text-purple-500" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">Breach Check</h3>
                </div>
                <BreachStatus breachResult={breachResult} />
              </div>
            )}
          </div>

          {/* Right Column - Tips */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <SecurityTips />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm">
              <strong>Privacy Notice:</strong> This tool processes passwords entirely in your browser. 
              For breach checking, only a hashed prefix is sent to the Have I Been Pwned API - your actual password never leaves your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;