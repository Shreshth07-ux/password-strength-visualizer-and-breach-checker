import { PasswordStrength, PasswordAnalysis } from '../types';

const COMMON_PATTERNS = [
  /^(.)\1+$/,  // All same characters
  /^(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i,  // Sequential
  /^(qwerty|asdf|zxcv|password|admin|login|welcome)/i,  // Common words
  /^\d+$/,  // All numbers
  /^[a-zA-Z]+$/,  // All letters
];

const COMMON_SUBSTITUTIONS = /[4@][sS5$][!1][7T][3E][0O]/g;

export function calculateEntropy(password: string): number {
  const length = password.length;
  let charsetSize = 0;
  
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/\d/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z\d]/.test(password)) charsetSize += 32;
  
  return Math.log2(Math.pow(charsetSize, length));
}

export function estimateTimeToBreak(entropy: number): string {
  // Assuming 1 billion attempts per second (modern GPU)
  const attempts = Math.pow(2, entropy) / 2; // Average case
  const seconds = attempts / 1000000000;
  
  if (seconds < 1) return 'Instantly';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000000000) return `${Math.round(seconds / 31536000000)} thousand years`;
  if (seconds < 31536000000000000) return `${Math.round(seconds / 31536000000000)} million years`;
  return `${Math.round(seconds / 31536000000000000)} billion years`;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'No Password',
      color: 'bg-gray-400',
      timeToBreak: 'N/A',
      entropy: 0
    };
  }

  const entropy = calculateEntropy(password);
  const timeToBreak = estimateTimeToBreak(entropy);
  
  let score = 0;
  
  // Length scoring
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Complexity scoring
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z\d]/.test(password)) score += 1;
  
  // Penalty for common patterns
  if (COMMON_PATTERNS.some(pattern => pattern.test(password))) score -= 2;
  if (password.toLowerCase().includes('password')) score -= 1;
  
  // Ensure score is within bounds
  score = Math.max(0, Math.min(4, score));
  
  const strengthLevels = [
    { label: 'Very Weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-blue-500' },
    { label: 'Strong', color: 'bg-green-500' }
  ];
  
  return {
    score,
    label: strengthLevels[score].label,
    color: strengthLevels[score].color,
    timeToBreak,
    entropy: Math.round(entropy)
  };
}

export function analyzePassword(password: string): PasswordAnalysis {
  const strength = getPasswordStrength(password);
  
  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[^a-zA-Z\d]/.test(password),
    commonPatterns: !COMMON_PATTERNS.some(pattern => pattern.test(password))
  };
  
  const suggestions: string[] = [];
  
  if (!checks.length) suggestions.push('Use at least 12 characters');
  if (!checks.uppercase) suggestions.push('Add uppercase letters');
  if (!checks.lowercase) suggestions.push('Add lowercase letters');
  if (!checks.numbers) suggestions.push('Include numbers');
  if (!checks.symbols) suggestions.push('Add special characters (!@#$%^&*)');
  if (!checks.commonPatterns) suggestions.push('Avoid common patterns and dictionary words');
  
  if (suggestions.length === 0) {
    suggestions.push('Great password! Consider using a password manager.');
  }
  
  return { strength, checks, suggestions };
}