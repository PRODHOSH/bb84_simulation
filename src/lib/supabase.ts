import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our leaderboard
export interface LeaderboardEntry {
  id?: number;
  username: string;
  score: number;
  total_questions: number;
  time_taken: number;
  created_at?: string;
}

// Rate limiting check - prevent spam submissions
const SUBMISSION_COOLDOWN = 30000; // 30 seconds
let lastSubmission = 0;

export const canSubmitScore = (): boolean => {
  const now = Date.now();
  if (now - lastSubmission < SUBMISSION_COOLDOWN) {
    return false;
  }
  return true;
};

export const updateLastSubmission = () => {
  lastSubmission = Date.now();
};
