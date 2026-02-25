import { BreachResult } from '../types';

const HIBP_API_URL = 'https://api.pwnedpasswords.com/range/';

// Hash the password using SHA-1 (client-side)
async function sha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export async function checkPasswordBreach(password: string): Promise<BreachResult> {
  if (!password || password.length === 0) {
    return { isBreached: false, loading: false };
  }

  try {
    // Hash the password
    const hash = await sha1(password);
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);

    // Query the HIBP API with the first 5 characters of the hash
    const response = await fetch(`${HIBP_API_URL}${prefix}`, {
      headers: {
        'User-Agent': 'Password-Strength-Checker'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to check breach status');
    }

    const text = await response.text();
    const lines = text.split('\n');

    // Look for our suffix in the results
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        return {
          isBreached: true,
          count: parseInt(count, 10),
          loading: false
        };
      }
    }

    return { isBreached: false, loading: false };
  } catch (error) {
    return {
      isBreached: false,
      loading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}