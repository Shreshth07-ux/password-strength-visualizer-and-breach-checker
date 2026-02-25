export interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
  timeToBreak: string;
  entropy: number;
}

export interface PasswordAnalysis {
  strength: PasswordStrength;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    commonPatterns: boolean;
  };
  suggestions: string[];
}

export interface BreachResult {
  isBreached: boolean;
  count?: number;
  loading: boolean;
  error?: string;
}